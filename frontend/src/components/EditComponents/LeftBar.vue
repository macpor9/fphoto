<template>
  <div class="leftBar">
    <span class="mdi mdi-tune" @click="setMenuType('Adjust')"></span>
    <span class="mdi mdi-brush" @click="setMenuType('BrushBar')"></span>
    <span class="mdi mdi-chart-line-variant" @click="setMenuType('LineBar')"></span>
    <span class="mdi mdi-checkbox-blank-circle" @click="setMenuType('CircleBar')"></span>
    <span class="mdi mdi-checkbox-blank" @click="setMenuType('RectangleBar')"></span>
    <span class="mdi mdi-undo" @click="undo"></span>
    <span class="mdi mdi-redo" @click="redo"></span>
    <span class="mdi mdi-cloud-upload" @click="updatePhoto"></span>

    
  </div>
</template>

<script>

import PhotoService from "@/services/photo.service";

export default {
  name: "LeftBar",
  components: {
  },
  methods: {
    setMenuType(type){
      this.$store.commit('setMenuType',type)
    },
    undo(){
      this.$store.commit('editor/undo')
    },
    redo(){
      this.$store.commit('editor/redo')
    },
    updatePhoto(){
      this.$store.state.editor.imageEditor.imageBlob((blob)=> {
        let data = new FormData()
          let file = new File([blob],"name")
          data.append("file",file)
          data.append("name",file.name)
          console.log(this.$store.state.photo.photoId)
          PhotoService.updatePhoto(data,this.$store.state.photo.photoId).then(x =>{
            console.log(x)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";


.leftBar{
  display: flex;
  flex-direction: column;
  background-color: @dark-color;
}

.mdi{
  padding-top: 10px;
  padding-bottom: 10px;
  color: floralwhite;
  font-size: 7vh;
}

.mdi:hover{
  color: @hover-color;
  background-color: @middle-color;
}


</style>