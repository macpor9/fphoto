<template>
  <div class="element-container">
    <div class="editor-container" ref="canvasParent">
      <canvas class="editor-canvas" ref="canvas"></canvas>
    </div>
  </div>

</template>

<script>
import {ImageEditor} from "@/functionalities/ImageEditor"
import PhotoService from "@/services/photo.service";

export default {
  name: "PhotoEditor",
  data() {
    return {
      imageEditor: null
    }
  },
  mounted() {
    this.imageEditor = new ImageEditor(this.$refs.canvas, this.$refs.canvasParent);
    this.$store.commit("editor/setImageEditor",this.imageEditor);
    console.log(this.$store.state.photo.actualPhoto)
    PhotoService.getImageFromUrl(this.$store.state.photo.actualPhoto).then((response) => {
      console.log("1")
      let fr = new FileReader()
      fr.onloadend = () => {
        console.log("2")
        let img = new Image();
        img.onload = () => {
        this.imageEditor.begin(img)
        }
        img.src = fr.result;
      };
      fr.readAsDataURL(response.data)
    }).catch(console.warn)
    console.log(this.imageEditor);
  }
}
</script>

<style scoped>
.element-container {
}

.editor-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /*background-color: red;*/
}

.editor-canvas {
  /*background-color: blue;*/
}

</style>