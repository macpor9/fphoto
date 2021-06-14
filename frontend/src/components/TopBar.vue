<template>
  <div class="bar">
    <div class="logoContainer divBar">
      <img src="/res/logo2.png" alt="photo">
    </div>
    <div class="optionsContainer divBar">
<!--      <button class="barButton">PHOTOS</button>-->
      <router-link to="/photos" tag="button" class="barButton">PHOTOS</router-link>
      <router-link to="/editing" tag="button" class="barButton">EDIT</router-link>
      <button class="barButton" @click="openUploadPopup">OPEN</button>
      <button class="barButton">EXPORT</button>


    </div>
    <div class="profileOptionsContainer divBar">
      <router-link to="/profile" tag="button" class="barButton">{{ this.$store.getters["auth/userName"] }}</router-link>
<!--      <router-link to="/login" class="barButton" tag="button">-->
<!--        logout-->
<!--      </router-link>-->
      <button class="barButton" @click="handleLogout">logout</button>
    </div>

  </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
  name: "TopBar",
  openPhotoPopup: false,
  methods: {
    handleLogout() {
      this.$store.state.photo.userFilesList = []
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    openUploadPopup() {
      this.$store.commit('photo/setPopupVisibility',true)
    },
    getUser(){
      console.log("sdadsdasasd")
      AuthService.getUser().then(
          console.log
      )
    },

  }
}
</script>

<style scoped>

.bar{
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  background: #151515;

  width: 100%;
  height: 10vh;
}

img{
  height: 10vh;
  /*max-height: 10vh;*/
  color: floralwhite
}

.divBar{
  min-width: 33%;
}

.logoContainer{
  display: flex;
  justify-content: flex-start;
}
.optionsContainer{
  display: flex;
  justify-content: center;
}
.profileOptionsContainer{
  display: flex;
  justify-content: flex-end;
}

.barButton{
  background: #151515 ;
  color: floralwhite;
  margin: 15px;
  height: 7vh;
  font-size: 4vh;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}
.barButton:hover {color: burlywood;}


</style>