<template>
  <div class="adjustSlider">
    <label>
      slider
    </label>

  </div>
</template>

<script>
export default {
  name: "AdjustSlider"
}
</script>

<style scoped lang="less">
@import "./../../assets/variables.less";

.adjustSlider{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: @text-color;
}


</style>