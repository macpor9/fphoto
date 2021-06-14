<template>
<div class="adjustContainer editBar">
  <div class="sliderContainer">
    <div class="singleSetting">
      <span class="settingTitle">brightness</span>
      <div class="bContainer">
        <span class="mdi mdi-plus-box" @click="changeBrightness(10)"></span>
        <span class="mdi mdi-minus-box" @click="changeBrightness(-10)"></span>
      </div>
<!--        <input type="number" class="slider" min="-100" max="100" ref="brightness">-->
    </div>
    <div class="singleSetting">
      <span class="settingTitle">contrast</span>
      <div class="bContainer">
        <span class="mdi mdi-plus-box" @click="changeContrast(10)"></span>
        <span class="mdi mdi-minus-box" @click="changeContrast(-10)"></span>
      </div>
<!--      <input type="number" class="slider" min="-100" max="100" ref="contrast">-->
    </div>
    <div class="singleSetting">
      <span class="settingTitle">gamma</span>
      <div class="bContainer">
        <span class="mdi mdi-plus-box" @click="changeGamma(1.1)"></span>
        <span class="mdi mdi-minus-box" @click="changeGamma(0.91)"></span>
      </div>
<!--      <input type="number" class="slider" min="0.01" max="2" step="0.01" ref="gamma">-->
    </div>
  </div>
  <div class="editButton" @click="saveChanges" >
    SAVE
  </div>
  <div class="sliderContainer">
    <div class="singleSetting">
      <div class="editButton" @click="invertColors">invert colors</div>
    </div>
    <div class="singleSetting">
      <div class="editButton" @click="greyScale">grey scale</div>
    </div>
  </div>


</div>
</template>

<script>
import SettingsMenu from "@/components/EditComponents/SettingsMenu";


export default {
  name: "Adjust",
  components: {SettingsMenu},
  methods: {
    setColor(){
      this.$store.state.editor.imageEditor.brushSettings.color = this.$refs.colorInput.value;
    },
    updateSlider(){
      this.setSize(this.$refs.sizeInput.value)
      this.$refs.sizeSlider.value = this.$refs.sizeInput.value;
    },
    updateInput(){
      this.setSize(this.$refs.sizeSlider.value)
      this.$refs.sizeInput.value = this.$refs.sizeSlider.value;
    },
    setSize(val){
      this.$store.state.editor.imageEditor.brushSettings.size = val;
    },
    saveChanges(){
      this.$store.state.editor.imageEditor.adjustBrightness(10)
      console.log(this.$refs.brightness.value)
      // this.$store.state.editor.imageEditor.adjustContrast(this.$refs.contrast)
      // this.$store.state.editor.imageEditor.adjustGamma(this.$refs.gamma)
    },
    invertColors(){
      this.$store.state.editor.imageEditor.invertColors()
    },
    greyScale(){
      this.$store.state.editor.imageEditor.greyScale()
    },
    changeBrightness(val){
      this.$store.state.editor.imageEditor.adjustBrightness(val)
    },
    changeContrast(val){
      this.$store.state.editor.imageEditor.adjustContrast(val)
    },
    changeGamma(val){
      this.$store.state.editor.imageEditor.adjustGamma(val)
    }

  }
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";
@import "./../../assets/Form.less";


.mdi{
  margin-top: 0.7em;
}

.sizeInput {
  margin: 0.7em;
  width: 40%;
  text-align: center;
}
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .sliderContainer{
    display: flex;
    flex-direction: column;
    margin: 1em;

    .singleSetting{
      display: flex;
      flex-direction: column;
      margin: 1em;

      .bContainer{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .mdi{
          color: floralwhite;
          font-size: 3vh;
        }

        .mdi:hover{
          color: @hover-color;
          background-color: @middle-color;
        }
      }

      .settingTitle{
        margin-top: 0.9em;
        margin-bottom: 0.5em;
      }
    }

  }

.editButton{
  background: lighten(@light-color,10%);
  font-size: 1.7em;
  border-radius: 7px;
  padding: 0.3em;
  color: @text-color;
  cursor: pointer;
  transition: 0.5s;
}

.editButton:hover {color: burlywood;}






</style>