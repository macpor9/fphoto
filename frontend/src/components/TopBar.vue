<template>
  <div class="bar">
    <div class="logoContainer divBar">
      <img src="/public/res/logo%20%23151515.png">

    </div>
    <div class="optionsContainer divBar">
      <button class="barButton">first</button>
      <button class="barButton">second</button>
      <button class="barButton">third</button>
      <button class="barButton">forth</button>

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