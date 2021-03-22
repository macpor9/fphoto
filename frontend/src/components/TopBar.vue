<template>
  <div class="bar">
    <div class="logoContainer divBar">
      <img src="/res/logo2.png" alt="photo">
    </div>
    <div class="optionsContainer divBar">
      <button class="barButton">SAVE</button>
      <button class="barButton">EDIT</button>
      <button class="barButton">OPEN</button>
      <button class="barButton">EXPORT</button>

    </div>
    <div class="profileOptionsContainer divBar">
      <button class="barButton">nickname</button>
      <button class="barButton">logout</button>

    </div>

  </div>
</template>

<script>
export default {
  name: "TopBar"
}
</script>

<style scoped>

.bar{
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  background: #151515;

  width: 100vw;
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