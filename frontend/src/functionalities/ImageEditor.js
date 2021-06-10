/**
 * @typedef {object} Vector
 * @property {number} x
 * @property {number} y
 */

/**
 *
 */
export const ImageEditorModes = Object.freeze({
    preview:        0b000000,

    //paint           V
    paintBrush:     0b100001,
    paintRectangle: 0b100010,
    paintCircle:    0b100011,
    paintLine:      0b100100,
    //                |
    paintFlag:      0b100000,


    isPaintMode(val){
        return (val & ImageEditorModes.paintFlag) !== 0;
    }
})

export class BrushSettings {
    _color;
    _size;

    constructor() {
        this.color = "#000000";
        this.size = 10;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }
}

export class ImageEditor {

    /** @type {HTMLElement}*/
    _canvasContainer
    /** @type {HTMLCanvasElement}*/
    _canvas;
    /** @type {CanvasRenderingContext2D} */
    _b;
    /** @type {HTMLImageElement} */
    _image;

    /** @type {number} */
    _mode;

    // drawing
    /** @type {BrushSettings} */
    _brushSettings;

    _brushDown;
    _brushPositionStart;
    _brushPositionEnd;
    _brushPositionLast;

    _brushDrawHistory = []

    /** The most inefficient CTRL+Z history
     * @type {array<HTMLImageElement>} */
    _imageHistory = []
    _currentHistoryElement = 1;
    _imageHistorySize = 10;

    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {HTMLElement} canvasContainer
     */
    constructor(canvas, canvasContainer) {
        this._canvasContainer = canvasContainer;
        if(!hasChild(canvasContainer, canvas))
            console.warn("'canvas' is not a child of 'canvasContainer'", "\n\ncanvas: ", canvas, "\n\ncanvasContainer:", canvasContainer);

        this._canvas = canvas;
        this._canvasContainer = canvasContainer;
        this._b = this._canvas.getContext("2d");

        this._mode = ImageEditorModes.preview;
        this._brushSettings = new BrushSettings();
        this._image = null;

        this._brushDown = false;

        this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas.addEventListener("mouseup", this._onMouseUp.bind(this));
        this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this));
        this._canvas.addEventListener("mouseleave", this._onMouseLeave.bind(this));
    }

    /**
     * @param {HTMLImageElement} image image to fill canvas
     * @param {boolean} resizeDOMElem if true then changes HTMLCanvasElement width to match aspect ratio
     */
    begin(image, resizeDOMElem = true) {
        let imgWidth = image.width;
        let imgHeight = image.height;
        let areaWidth = this._canvasContainer.clientWidth;
        let areaHeight = this._canvasContainer.clientHeight;

        if(resizeDOMElem){
            let newDomSize = contain(imgWidth, imgHeight, areaWidth, areaHeight)

            this._canvas.style.width = newDomSize.width + "px";
            this._canvas.style.height = newDomSize.height + "px";
        }

        this._mode = ImageEditorModes.preview;
        this._brushDown = false;
        this._brushPositionLast = toVec(0, 0);
        this._brushPositionStart = toVec(0, 0)
        this._brushPositionEnd = toVec(0, 0)
        this._currentHistoryElement = 1;
        this._imageHistory = [];
        this._brushDrawHistory = [];

        this.width = image.width;
        this.height = image.height;
        this._image = image;
        this._historyAdd(this._image);
        this._repaintImage();
    }

    /**
     * @param {number} mode one of {@link ImageEditorModes}
     */
    selectMode(mode) {
        if(this.mode !== mode)
            this._brushDown = false;

        this._mode = mode;
    }

    undo(){
        let img = this._historyUndo();
        if(img === this._image)
            return false;

        this._image = img;
        this._repaintImage()

        return true;
    }

    redo(){
        let img= this._historyRedo();
        if(img === this._image)
            return false;

        this._image = img;
        this._repaintImage()

        return true;
    }

    adjustGamma(gamma){
        this._adjustGamma(gamma);
    }

    adjustContrast(contrast) {
        this._adjustContrast(contrast)
    }

    adjustBrightness(brightness) {
        this._adjustBrightness(brightness);
    }

    grayScale(){
        this._grayScale();
    }

    invertColors(){
        this._invertColors();
    }

    get mode(){
        return this._mode;
    }

    set width(width) {
        this._canvas.width = width;
    }

    set height(height) {
        this._canvas.height = height;
    }

    get width() {
        return this._canvas.width;
    }

    get height() {
        return this._canvas.height;
    }

    get brushSettings() {
        return this._brushSettings;
    }

    get imageHistorySize() {
        return this._imageHistorySize;
    }

    set imageHistorySize(historySize) {
        this._imageHistorySize = historySize;
        if(this._imageHistory.length > historySize){
            let diff = this._imageHistory.length - historySize;
            this._imageHistory.slice(diff);
        }
    }

// ========= inner functionalities

    _historyAdd(img) {
        if(this._currentHistoryElement > 1){
            this._imageHistory.length = this._imageHistory.length - this._currentHistoryElement + 1;
            this._currentHistoryElement = 1;
        }

        this._imageHistory.push(img)
        if(this._imageHistory.length > this._imageHistorySize)
            this._imageHistory = this._imageHistory.slice(1);
    }

    _historyUndo(){
        this._currentHistoryElement++;
        if(this._currentHistoryElement > this._imageHistory.length ){
            this._currentHistoryElement = this._imageHistory.length;
        }

        return this._imageHistory[ this._imageHistory.length - this._currentHistoryElement];
    }

    _historyRedo(){
        this._currentHistoryElement--;
        if(this._currentHistoryElement < 1){
            this._currentHistoryElement = 1
        }

        return this._imageHistory[ this._imageHistory.length - this._currentHistoryElement];
    }

    _updateImage() {
        this._image = new Image(this.width, this.height);
        this._image.src = this._canvas.toDataURL();
        this._historyAdd(this._image);

        this._repaintImage();
    }

    _repaintImage() {
        this._b.drawImage(this._image, 0, 0, this.width, this.height);
    }

    // ========= brush actions



    /**
     *
     * @param {Vector} start
     * @param {Vector} end
     * @param {boolean} apply
     */
    _drawLine(start, end, apply) {
        if (!apply)
            this._repaintImage()

        this._b.strokeStyle = this._brushSettings.color;
        this._b.lineWidth = this._brushSettings.size;
        this._b.beginPath()
        this._b.moveTo(start.x, start.y);
        this._b.lineTo(end.x, end.y);
        this._b.stroke();

        if(apply)
            this._updateImage();
    }

    _drawRectangle(start, end, apply) {
        if (!apply)
            this._repaintImage()

        this._b.fillStyle = this._brushSettings.color;

        this._b.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);

        if(apply)
            this._updateImage();
    }

    _drawCircle(start, end, apply) {
        if (!apply)
            this._repaintImage()

        let center = toVec((start.x + end.x) * 0.5, (start.y + end.y) * 0.5 );
        let r = toVec(Math.abs(start.x - center.x), Math.abs(start.y - center.y));
        this._b.fillStyle = this._brushSettings.color;

        this._b.beginPath()
        this._b.ellipse(center.x, center.y, r.x, r.y, 0, 0, 2 * Math.PI);
        this._b.fill();

        if(apply)
            this._updateImage();
    }

    /**
     * @param {Vector} position
     * @param {boolean} isEnd
     * @private
     */
    _drawBrush(position, isEnd){
        this._brushDrawHistory.push(position);

        if(!isEnd)
            this._repaintImage();

        this._b.strokeStyle = this._brushSettings.color;
        this._b.lineWidth = this._brushSettings.size;

        this._b.beginPath()

        this._b.moveTo(this._brushDrawHistory[0].x, this._brushDrawHistory[0].y);

        for(let i = 1 ; i < this._brushDrawHistory.length ; i++) {
            let pos = this._brushDrawHistory[i];
            this._b.lineTo(pos.x, pos.y);
        }

        this._b.stroke();

        if(isEnd)
            this._updateImage();
    }


    // ========= global actions

    _invertColors(){
        this._b.globalCompositeOperation = "difference";
        this._b.fillStyle = "#FFFFFF";
        this._b.fillRect(0, 0, this.width, this.height);
        this._updateImage();
        this._b.globalCompositeOperation = "source-over";
    }

    _adjustGamma(gamma){
        let gammaCorrection = 1 / gamma;
        let imgData = this._b.getImageData(0, 0, this.width, this.height);
        let data = imgData.data;
        for(let y = 0 ; y < imgData.height ; y++){
            for(let x = 0 ; x < imgData.width ; x++){
                let index = (y * imgData.width + x) * 4;

                data[index + 0] = 255 * Math.pow(data[index + 0] / 255, gammaCorrection); // r
                data[index + 1] = 255 * Math.pow(data[index + 1] / 255, gammaCorrection); // g
                data[index + 2] = 255 * Math.pow(data[index + 2] / 255, gammaCorrection); // b
            }
        }

        this._b.putImageData(imgData, 0, 0);
        this._updateImage();
    }

    _adjustContrast(contrast){
        let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        let imgData = this._b.getImageData(0, 0, this.width, this.height);
        let data = imgData.data;
        for(let y = 0 ; y < imgData.height ; y++){
            for(let x = 0 ; x < imgData.width ; x++){
                let index = (y * imgData.width + x) * 4;

                data[index + 0] = clamp(factor * (data[index + 0] - 127) + 127, 0, 255) // r
                data[index + 1] = clamp(factor * (data[index + 1] - 127) + 127, 0, 255) // g
                data[index + 2] = clamp(factor * (data[index + 2] - 127) + 127, 0, 255) // b
            }
        }

        this._b.putImageData(imgData, 0, 0);
        this._updateImage();
    }

    _adjustBrightness(brightness){
        let imgData = this._b.getImageData(0, 0, this.width, this.height);
        let data = imgData.data;
        for(let y = 0 ; y < imgData.height ; y++){
            for(let x = 0 ; x < imgData.width ; x++){
                let index = (y * imgData.width + x) * 4;

                data[index + 0] = clamp(data[index + 0] + brightness, 0, 255); // r
                data[index + 1] = clamp(data[index + 1] + brightness, 0, 255); // g
                data[index + 2] = clamp(data[index + 2] + brightness, 0, 255); // b
            }
        }

        this._b.putImageData(imgData, 0, 0);
        this._updateImage();
    }

    _grayScale() {
        let imgData = this._b.getImageData(0, 0, this.width, this.height);
        let data = imgData.data;
        for(let y = 0 ; y < imgData.height ; y++){
            for(let x = 0 ; x < imgData.width ; x++){
                let index = (y * imgData.width + x) * 4;
                let r = data[index + 0] / 255;
                let g = data[index + 1] / 255;
                let b = data[index + 2] / 255;

                let cLinear = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                let cSrgb;
                if(cLinear <= 0.0031308)
                    cSrgb = 12.92 * cLinear;
                else
                    cSrgb = 1.055 * Math.pow(cLinear, 1/2.4) - 0.055

                cSrgb *= 255;
                data[index + 0] = cSrgb;
                data[index + 1] = cSrgb;
                data[index + 2] = cSrgb;
            }
        }

        this._b.putImageData(imgData, 0, 0);
        this._updateImage();
    }


    // ========= mouse handlers

    _processMouseEvent(type, offsetX, offsetY){
        let pos = mapPosition(
            toVec(offsetX, offsetY),
            toVec( this._canvas.clientWidth, this._canvas.clientHeight),
            toVec(this.width, this.height));

        if(type === "move")
            this._processMouseMove(pos);
        else if(type === "up")
            this._processMouseUp(pos);
        else if(type === "down")
            this._processMouseDown(pos);

    }

    /**
     * @param {Vector} pos
     * @private
     */
    _processMouseUp(pos) {
        if(!this._brushDown)
            return;
        this._brushDown = false;
        this._brushPositionEnd = pos;

        if(this._mode === ImageEditorModes.paintLine)
            this._drawLine(this._brushPositionStart, this._brushPositionEnd, true);

        else if(this._mode === ImageEditorModes.paintRectangle)
            this._drawRectangle(this._brushPositionStart, this._brushPositionEnd, true);

        else if(this._mode === ImageEditorModes.paintCircle)
            this._drawCircle(this._brushPositionStart, this._brushPositionEnd, true);

        else if(this._mode === ImageEditorModes.paintBrush)
            this._drawBrush(pos, true);

    }

    /**
     * @param {Vector} pos
     * @private
     */
    _processMouseDown(pos) {
        if(this._brushDown)
            return;

        this._brushDown = true;
        this._brushPositionStart = pos;
        this._brushPositionLast = pos;

        if(this._mode === ImageEditorModes.paintBrush)
            this._brushDrawHistory = [];
    }

    /**
     * @param {Vector} pos
     * @private
     */
    _processMouseMove(pos) {
        if (!this._brushDown)
            return;

        if(this._mode === ImageEditorModes.paintLine)
            this._drawLine(this._brushPositionStart, pos, false);

        if(this._mode === ImageEditorModes.paintRectangle)
            this._drawRectangle(this._brushPositionStart, pos, false);

        if(this._mode === ImageEditorModes.paintCircle)
            this._drawCircle(this._brushPositionStart, pos, false);

        else if(this._mode === ImageEditorModes.paintBrush)
            this._drawBrush(pos, false);


        this._brushPositionLast = pos;
    }

    // ================ events
    /** @param {MouseEvent} e */
    _onMouseDown(e) {
        if(this._image == null || !ImageEditorModes.isPaintMode(this._mode))
            return;

        this._processMouseEvent("down", e.offsetX, e.offsetY);


        console.log(this, ` down  ${e.offsetX}, ${e.offsetY}`);
    }

    /** @param {MouseEvent} e */
    _onMouseUp(e) {
        if(this._image == null || !ImageEditorModes.isPaintMode(this._mode))
            return;

        this._processMouseEvent("up", e.offsetX, e.offsetY);

        console.log(this, ` up  ${e.offsetX}, ${e.offsetY}`);
    }

    /** @param {MouseEvent} e */
    _onMouseMove(e) {
        if(this._image == null || !ImageEditorModes.isPaintMode(this._mode))
            return;

        this._processMouseEvent("move", e.offsetX, e.offsetY);
    }

    /** @param {MouseEvent} e */
    _onMouseLeave(e){
        if(this._image == null || !ImageEditorModes.isPaintMode(this._mode))
            return;

        let x = clamp(e.offsetX, 0, this._canvas.clientWidth);
        let y = clamp(e.offsetY, 0, this._canvas.clientHeight)

        this._processMouseEvent("up", x, y);
    }
}

function contain(imageWidth, imageHeight, areaWidth, areaHeight) {
    const imageRatio = imageWidth / imageHeight;

    if (imageRatio >= areaWidth / areaHeight) {
        // longest edge is horizontal
        return {width: areaWidth, height: areaWidth / imageRatio};
    } else {
        // longest edge is vertical
        return {width: areaHeight * imageRatio, height: areaHeight};
    }
}

/**
 *
 * @param {HTMLElement} elem
 * @param {HTMLElement} child
 */
function hasChild(elem, child){
    for(let i = 0 ; i < elem.children.length ; i++){
        if(elem.children[i] === child)
            return true;
    }
    return false;
}

function getPos(mouseEvent){
    return toVec(mouseEvent.offsetX, mouseEvent.offsetY);
}

/**
 * @param {Vector} offsetXY
 * @param {Vector} from
 * @param {Vector} to
 */
function mapPosition(offsetXY, from, to) {
    let normalizedX = offsetXY.x / from.x;
    let normalizedY = offsetXY.y / from.y;

    return toVec(normalizedX * to.x, normalizedY * to.y);
}

function clamp(value, min, max){
    return (value < min ? min : (value > max ? max : value));
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {Vector}
 */
function toVec(x, y){
    return {
        x: x,
        y: y
    }
}