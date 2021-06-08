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

        this.width = image.width;
        this.height = image.height;
        this._image = image;
        this._b.drawImage(image, 0, 0, this.width, this.height);
    }

    /**
     * @param {number} mode one of {@link ImageEditorModes}
     */
    selectMode(mode) {
        if(this.mode !== mode)
            this._brushDown = false;

        this._mode = mode;
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

    // ========= inner functionalities

    _updateImage() {
        this._image = new Image(this.width, this.height);
        this._image.src = this._canvas.toDataURL();
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