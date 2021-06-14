<template>
  <div class="settinsContainer">
    <div class="singleSetting">
      <span class="settingTitle">color</span>
      <input v-bind:value="this.$store.state.editor.imageEditor.brushSettings.color" type="color" class="mdi colorInput" ref="colorInput" v-on:input="setColor">
    </div>
    <div class="singleSetting">
      <span class="settingTitle">size</span>
      <input v-bind:value="this.$store.state.editor.imageEditor.brushSettings.size" type="range" class="sizeSlider" min="1" max="50" ref="sizeSlider" v-on:input="updateInput">
      <input v-bind:value="this.$store.state.editor.imageEditor.brushSettings.size" type="number" class="sizeInput" value="0" min="0" ref="sizeInput" v-on:input="updateSlider">
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsMenu",
  methods: {
    setColor() {
      this.$store.state.editor.imageEditor.brushSettings.color = this.$refs.colorInput.value;
    },
    updateSlider() {
      this.setSize(this.$refs.sizeInput.value)
      this.$refs.sizeSlider.value = this.$refs.sizeInput.value;
    },
    updateInput() {
      this.setSize(this.$refs.sizeSlider.value)
      this.$refs.sizeInput.value = this.$refs.sizeSlider.value;
    },
    setSize(val) {
      this.$store.state.editor.imageEditor.brushSettings.size = val;
    }
  }
}
</script>

<style scoped lang="less">

.settinsContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .singleSetting{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.3em;

    .settingTitle{
      margin-top: 0.9em;
      margin-bottom: 0.5em;
    }

    .colorInput {
      width: 5em;
      height: 5em;
    }


    .sizeInput {
      margin: 0.5em;
      width: 40%;
      text-align: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

</style>