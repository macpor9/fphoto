<template>
  <div class="mainContainer">
    <TopBar></TopBar>
    <div class="content">
      <div class="profileContainer">
        <div class="fieldContainer">
          <span class="fieldName">ID</span>
          <span class="fieldValue">{{ this.$store.getters["auth/userId"] }}</span>
        </div>
        <div class="fieldContainer">
          <span class="fieldName">username</span>
          <span class="fieldValue">{{this.$store.getters["auth/userName"]}}</span>
        </div>
        <div class="fieldContainer">
          <span class="fieldName">email</span>
          <span class="fieldValue">{{this.$store.getters["auth/userEmail"]}}</span>
        </div>



      </div>

    </div>
    <upload-photo-popup v-if="this.$store.getters['photo/popupState'] === true"></upload-photo-popup>

  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import UploadPhotoPopup from "@/components/popups/uploadPhotoPopup";
export default {
  name: "Profile",
  components: {UploadPhotoPopup, TopBar}
}
</script>

<style scoped lang="less">
@import "./../assets/variables.less";

.content{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  width: 90vw;
}

.profileContainer{
  color: @text-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fieldContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.fieldName {
  font-size: 5vh;
  margin: 3vh;
}

.fieldValue{
  color: #42b983;
  font-size: 5vh;
}

</style>