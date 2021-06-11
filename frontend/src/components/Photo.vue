<template>
  <div class="photoContainer">
<!--  <div class="photoContainer" :style="'background: url('+{path}+')'">-->
<!--  <div class="photoContainer" :style="'background: red'">-->
<!--  <div class="photoContainer" :style="'background: url(' + getImgUrl('CYRK.jpg') + ')'">-->
    <div class="editButton" @click="editPhoto" >
      EDIT
    </div>

  </div>
</template>
<!--v-bind:style="{background: 'red'}"-->
<script>
export default {
  name: "Photo",
  props: {
    path: String
  },
  methods: {
    editPhoto(){
      console.log(this.path)
    },
    getImgUrl(pet) {
      var images = require.context('../tmp/', false, /\.jpg$/)
      return images('./' + pet + ".jpg")
    }
  }
}
</script>

<style scoped lang="less">
@import "./../assets/variables.less";


.photoContainer {
  margin: 2em;
  display: flex;
  flex-direction: row;
  width: 15em;
  height: 11em;
  background: url("../tmp/CYRK.jpg") center;
  background-size: cover;
  justify-content: center;
  align-items: center;
  border: darken(@light-color,90%) solid 1px;
  box-shadow:
      0 11px 40px -10px black,
      0 -11px 40px -10px black;
  border-radius: 20px;

  .editButton{
    opacity: 0%;
    background: lighten(@light-color,10%);
    font-size: 1.7em;
    border-radius: 7px;
    padding: 0.3em;
    color: @text-color;
    cursor: pointer;
  }
}
  .photoContainer:hover{
    background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('../tmp/CYRK.jpg') center;
    background-size: cover;
    transition: 0.5s;
    .editButton {
      transition: 0.5s;
      opacity: 100%;
    }
  }



</style>