<template>
  <div class="main">
    <TopBar></TopBar>
    <div class="photosList">
      <li v-if="ready" v-for="file in $store.getters['photo/userFilesList']" :key='file.id'>
        <Photo v-bind:path='"http://localhost:8080/api/responseFile/userFiles/"+file.id' v-bind:id="file.id"></Photo>
      </li>
    </div>
    <upload-photo-popup v-if="this.$store.getters['photo/popupState'] === true"></upload-photo-popup>
  </div>
</template>

<script>
import Photo from "@/components/Photo";
import TopBar from "@/components/TopBar";
import UploadPhotoPopup from "@/components/popups/uploadPhotoPopup"
import PhotoService from "@/services/photo.service";
export default {
  name: "Photos",
  components: {TopBar, Photo, UploadPhotoPopup},
  data(){
    return {
      ready: false
    }
  },
  methods: {
    onLoad() {
      PhotoService.getUserFiles().then((x)=> {
        if(typeof (x.data) !== "object")
          this.$store.commit('photo/setFileList', [])
        else
          this.$store.commit('photo/setFileList',x.data)
        this.ready = true;
      });
      console.log(this.$store.getters['photo/userFilesList'])
    },
  },
  beforeMount() {
    this.ready = false;
    this.onLoad()
  }
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
    width: 100vw;
    overflow-x: hidden;
    max-height: 90vh;
    flex-wrap: wrap;
    display: flex;
    padding-top: 10vh;
    height: 90vh;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    list-style-type: none;

  }
}

</style>