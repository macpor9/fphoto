<template>
<!--  <div class="photoContainer">-->
<!--  <div class="photoContainer" :style="'background: url('+{path}+')'">-->
<!--  <div class="photoContainer" :style="'background: red'">-->
  <div class="photoContainer" :style="{background: 'url(' + path + ') center', 'background-size': 'cover'}">
    <div class="opacity">

      <div class="buttonsContainer">
        <div class="editButton" @click="editPhoto" >
          EDIT
        </div>
<!--        <div class="editButton" id="downlaod" @click="downloadPhoto">-->
<!--          DOWNLOAD-->
<!--        </div>-->
        <a class="editButton" :href="path"
        v-text="'dwnl'"
        @click="downloadItem()"
        target="_blank"></a>
      </div>

    </div>
  </div>
</template>
<!--v-bind:style="{background: 'red'}"-->
<script>

import Vue from "vue";

export default {
  name: "Photo",
  props: {
    path: String,
    id: Number
  },
  methods: {
    editPhoto(){
      this.$store.commit('photo/setActualPhoto', this.$props.path)
      this.$store.commit('photo/setPhotoId', this.$props.id)
      console.log("id = " + this.$store.state.photo.photoId)
      this.$router.push("/editing")
    },
    download(data, filename, type) {
      var file = new Blob([data], {type: type});
      if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
    downloadItem () {
      Vue.axios.get(this.$props.path, { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'image/png' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = this.$props.id
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
    },
    downloadPhoto(){
      return
    },
    getImgUrl(path) {
      var images = require.context('../tmp/', false, /\.jpg$/)
      return images('./' + path + ".jpg")
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
    .buttonsContainer{
      display: flex;
      flex-direction: column;

      .editButton{
        margin: 0.5em;
        opacity: 0%;
        background: lighten(@light-color,10%);
        font-size: 1.7em;
        border-radius: 7px;
        padding: 0.3em;
        color: @text-color;
        cursor: pointer;
        transition: 0.5s;
      }

      #downlaod{
        font-size: 1em;
      }
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