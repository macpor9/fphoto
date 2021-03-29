<template>
  <div id="app">
  <router-view></router-view>

  </div>
</template>

<script>
// import LoggedOut from "@/pages/LoggedOut";
// import TopBar from "@/components/TopBar";
// import Editing from "@/pages/Editing";



export default {
  name: 'App',
  components: {
    // Editing
    // LoggedOut
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #262626;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
body{
  margin: 0;
}

</style>
