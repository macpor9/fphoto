<template>
  <div class="leftBar">
    <span class="mdi mdi-tune"></span>
    <span class="mdi mdi-format-title"></span>
    <span class="mdi mdi-lead-pencil"></span>
    <span class="mdi mdi-selection"></span>
    <span class="mdi mdi-brush"></span>







    
  </div>
</template>

<script>


export default {
  name: "LeftBar",
  components: {
  }
}
</script>

<style scoped>

.leftBar{
  display: flex;
  flex-direction: column;
  background-color: #151515;
  width: 4vw;
}

.mdi{
  padding-top: 10px;
  padding-bottom: 10px;
}


.mdi:hover{
  background-color: #262626;
}


</style>