<template>
  <div class="uploadPhotoPopup" id="add-group-popup">
    <div class="inner">
      <div id="exitButtonContainer">
        <span class="mdi mdi-close" @click="closePopup"></span>
      </div>
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                 accept="image/*" class="input-file">
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
        </div>
      </form>
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" v-bind:key="item">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
// import PhotoService from './../../services/photo.service'
import { upload } from '@/services/fake'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'app',
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    closePopup() {
      this.$store.commit('photo/setPopupVisibility',false)
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      this.currentStatus = STATUS_SAVING;

      upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;


      Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  },
}
</script>

<style scoped lang="less">
@import "src/assets/variables.less";


.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: @light-color;
  color: @text-color;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  width: 20vw;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  width: 100%;
  //left: -300px;
  height: 200px;
  left: 0vw;
  //left: -3vw;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: @lighter-color;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

#exitButtonContainer {

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;

}

.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .button {
    height: 5vh;
  }
}


</style>