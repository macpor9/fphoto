<template>
  <div class="brushContainer editBar">
    <settings-menu></settings-menu>
  </div>
</template>

<script>
import SettingsMenu from "@/components/EditComponents/SettingsMenu";
import {ImageEditorModes} from "@/functionalities/ImageEditor";
export default {
  name: "BrushBar",
  components: {SettingsMenu},
  mounted() {
    this.$store.state.editor.imageEditor.selectMode(ImageEditorModes.paintBrush)
  }
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";
@import "./../../assets/Form.less";




</style>