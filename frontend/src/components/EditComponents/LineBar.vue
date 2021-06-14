<template>
  <div class="textContainer editBar">

    <settings-menu></settings-menu>

  </div>
</template>

<script>
import SettingsMenu from "@/components/EditComponents/SettingsMenu";
import {ImageEditorModes} from "@/functionalities/ImageEditor";
export default {
  name: "LineBar",
  components: {SettingsMenu},
  mounted() {
    this.$store.state.editor.imageEditor.selectMode(ImageEditorModes.paintLine)
  }
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";
@import "./../../assets/Form.less";





</style>