<template>
  <div class="mainContainer">
    <TopBar></TopBar>
    <div class="editContent">
      <div class="menu-bar">
        <LeftBar></LeftBar>
        <component v-bind:is="this.$store.getters.menuType" class="secondMenu"></component>
      </div>
      <div class="editing-container">
        <PhotoEditor class="editor"/>
      </div>
    </div>
    <upload-photo-popup v-if="this.$store.getters['photo/popupState'] === true"></upload-photo-popup>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import LeftBar from "@/components/EditComponents/LeftBar";
import Adjust from "@/components/EditComponents/Adjust";
import LineBar from "@/components/EditComponents/LineBar";
import BrushBar from "@/components/EditComponents/BrushBar";
import CircleBar from "@/components/EditComponents/CircleBar";
import RectangleBar from "@/components/EditComponents/RectangleBar";

import PhotoEditor from "@/components/PhotoEditor";
import UploadPhotoPopup from "@/components/popups/uploadPhotoPopup";

export default {
  name: "Editing",
  components: {UploadPhotoPopup, PhotoEditor, LineBar, Adjust, LeftBar, TopBar,BrushBar, CircleBar,RectangleBar}
}
</script>

<style scoped lang="less">
@import "./../assets/variables.less";

.mainContainer{
  display: flex;
  background-color: @light-color;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.editContent{
  //display: grid;
  //grid-template-columns: minmax(4em, 10vw) auto;
  display: flex;
  flex-direction: row;
  min-height: 90vh;
  margin-top: 10vh;
  width: 100vw;
  .menu-bar {
    display: flex;
    flex-direction: row;
    //grid-column: 1 / 2;
    width: 15vw;

  }
  .menu-bar > div {
    height: 100%;
  }
  .editing-container {
    width: 85vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .editing-container > .editor {
    width: 90%;
    height: 90%;
  }
}

</style>