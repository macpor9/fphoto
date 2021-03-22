<template>
  <div class="leftBar">
    <button class="button">1st</button>
    <button class="button">2nd</button>
    <button class="button">3rd</button>
    <button class="button">4th</button>
    <button class="button">5th</button>
    <button class="button">6th</button>
<!--    <Zondicon icon="ArrowLeft" class="fill-current text-red"></Zondicon>-->
    <span class="mdi mdi-log-out"></span>
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

.fill-current{
  background-color: red;
}


.button{
  background: #151515;
  color: floralwhite;
  border: none;
  min-height: 4vw;
}
.button:hover{background-color: #262626}

</style>