<template>
<div class="adjustContainer editBar">

  <AdjustSlider></AdjustSlider>
  <AdjustSlider></AdjustSlider>
  <AdjustSlider></AdjustSlider>
  <AdjustSlider></AdjustSlider>
  <AdjustSlider></AdjustSlider>
  <AdjustSlider></AdjustSlider>


</div>
</template>

<script>
import AdjustSlider from "@/components/EditComponents/AdjustSlider";
export default {
  name: "Adjust",
  components: {AdjustSlider}
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";
@import "./../../assets/Form.less";





</style>