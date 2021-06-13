<template>
  <div class="leftBar">
    <span class="mdi mdi-tune" @click="setMenuType('Adjust')"></span>
    <span class="mdi mdi-format-title" @click="setMenuType('TextField')"></span>
    <span class="mdi mdi-lead-pencil" @click="setMenuType('PenBar')"></span>
    <span class="mdi mdi-selection" @click="setMenuType('SelectBar')"></span>
    <span class="mdi mdi-brush" @click="setMenuType('BrushBar')"></span>

    
  </div>
</template>

<script>

export default {
  name: "LeftBar",
  components: {
  },
  methods: {
    setMenuType(type){
      this.$store.commit('setMenuType',type)
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
  width: 5em;
}

.mdi{
  padding-top: 10px;
  padding-bottom: 10px;
}


.mdi:hover{
  background-color: @middle-color;
}


</style>