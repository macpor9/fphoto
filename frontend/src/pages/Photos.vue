<template>
  <div class="main">
    <TopBar></TopBar>
    <div class="photosList">
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>
      <Photo v-bind:path='String("../tmp/CYRK.jpg")'></Photo>






    </div>
  </div>
</template>

<script>
import Photo from "@/components/Photo";
import TopBar from "@/components/TopBar";
export default {
  name: "Photos",
  components: {TopBar, Photo}
}
</script>

<style scoped lang="less">
@import "./../assets/variables.less";

.main{
  background-color: @light-color;

  *::-webkit-scrollbar {
    width: 11px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: @middle-color;
    border-radius: 20px;
    border: 4px solid @dark-color;
  }

  .photosList{
    background-color: @light-color;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 90vh;
    flex-wrap: wrap;
    display: flex;
    padding-top: 10vh;
    height: 90vh;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: start;

  }
}

</style>