<template>
  <div class="mainContainer">
    <TopBar></TopBar>
    <div class="editContent">
      <LeftBar></LeftBar>
      <component v-bind:is="this.$store.getters.menuType"></component>
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
import UploadPhotoPopup from "@/components/popups/uploadPhotoPopup";

export default {
  name: "Editing",
  components: {UploadPhotoPopup, TextField, Adjust, LeftBar, TopBar,BrushBar, PenBar,SelectBar},
  computed: {
    getMenuType(){
      return 'Adjust'
    }
  },
  methods: {
    // handleFocusOut() {
    //   this.$store.commit('photo/setPopupVisibility',false)
    // }
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
  align-items: flex-start;
}

.editContent{
  display: flex;
  flex-direction: row;
  min-height: 90vh;
}

</style>