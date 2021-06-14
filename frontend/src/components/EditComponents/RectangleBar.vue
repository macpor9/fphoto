<template>
  <div class="selectContainer editBar">
    <settings-menu></settings-menu>
  </div>
</template>

<script>
import SettingsMenu from "@/components/EditComponents/SettingsMenu";
import {ImageEditorModes} from "@/functionalities/ImageEditor";
export default {
  name: "RectangleBar",
  components: {SettingsMenu},
  mounted() {
    this.$store.state.editor.imageEditor.selectMode(ImageEditorModes.paintRectangle)
  }
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";
@import "./../../assets/Form.less";



</style>