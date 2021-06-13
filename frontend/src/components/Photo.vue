<template>
<!--  <div class="photoContainer">-->
<!--  <div class="photoContainer" :style="'background: url('+{path}+')'">-->
<!--  <div class="photoContainer" :style="'background: red'">-->
  <div class="photoContainer" :style="'background: url(' + getImgUrl(path) + ') center; background-size: cover'">
    <div class="opacity">

      <div class="editButton" @click="editPhoto" >
        EDIT
      </div>

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
  width: 15em;
  height: 11em;
  //background: url("../tmp/cyrk.jpg") center;
  align-items: center;
  border: darken(@light-color,90%) solid 1px;
  box-shadow:
      0 11px 40px -10px black,
      0 -11px 40px -10px black;
  border-radius: 20px;
  position: relative;
  background-size: cover;

  .opacity{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: rgba(0,0,0,0);
    transition: 0.5s;

    .editButton{
      opacity: 0%;
      background: lighten(@light-color,10%);
      font-size: 1.7em;
      border-radius: 7px;
      padding: 0.3em;
      color: @text-color;
      cursor: pointer;
      transition: 0.5s;
    }
  }

}
  .photoContainer:hover{
    background-size: cover;
    .opacity{
      transition: 0.5s;
      background: rgba(0,0,0,0.6);
      .editButton {
        transition: 0.5s;
        opacity: 100%;
      }
    }
  }



</style>