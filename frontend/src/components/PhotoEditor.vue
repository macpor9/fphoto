<template>
  <div class="element-container">
    <div class="editor-container" ref="canvasParent">
      <canvas class="editor-canvas" ref="canvas"></canvas>
    </div>
  </div>

</template>

<script>
import {ImageEditor} from "@/functionalities/ImageEditor"

export default {
  name: "PhotoEditor",
  data() {
    return {
      imageEditor: null
    }
  },
  mounted() {
    this.imageEditor = new ImageEditor(this.$refs.canvas, this.$refs.canvasParent);
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
  background-color: red;
}

.editor-canvas {
  background-color: blue;
}

</style>