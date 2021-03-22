<template>
  <div class="mainContainer">
    <TopBar></TopBar>
    <div class="editContent">
      <LeftBar></LeftBar>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import LeftBar from "@/components/EditComponents/LeftBar";
export default {
  name: "Editing",
  components: {LeftBar, TopBar}
}
</script>

<style scoped>
.mainContainer{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.editContent{
  display: flex;
  flex-direction: row;
  min-height: 90vh;
}

</style>