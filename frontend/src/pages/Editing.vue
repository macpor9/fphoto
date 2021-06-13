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
import TextField from "@/components/EditComponents/TextField";
import BrushBar from "@/components/EditComponents/BrushBar";
import PenBar from "@/components/EditComponents/PenBar";
import SelectBar from "@/components/EditComponents/SelectBar";

import PhotoEditor from "@/components/PhotoEditor";
import UploadPhotoPopup from "@/components/popups/uploadPhotoPopup";

export default {
  name: "Editing",
  components: {UploadPhotoPopup, PhotoEditor, TextField, Adjust, LeftBar, TopBar,BrushBar, PenBar,SelectBar},
  computed: {
    getMenuType(){
      return 'Adjust'
    }
  },
  methods: {
    handleFocusOut() {
      this.$store.commit('photo/setPopupVisibility',false)
    }
  }

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
  display: grid;
  grid-template-columns: minmax(4em, 10vw) auto;
  min-height: 90vh;
  margin-top: 10vh;
  width: 100vw;
  .menu-bar {
    display: flex;
    flex-direction: row;
    //grid-column: 1 / 2;
    //width: 100em;

  }
  .menu-bar > div {
    height: 100%;
  }
  .editing-container {
    grid-column: 2 / 3;
    //background-color: aqua;
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