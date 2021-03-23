<template>
  <label class="Heading">
    {{ fieldName }}
  </label>
</template>

<script>
export default {
  name: "Heading",
  props: {
    fieldName: String
  }
}
</script>

<style scoped>

label{
  /*box-shadow:*/
  /*     0 11px 40px -15px black,*/
  /*     0 -11px 40px -15px black;*/
  padding: 1vh 5vh;
  margin: 10px 10px 50px;
  font-size: 7vh;
  background: linear-gradient(to right, #262626, #353535 50%, #262626 );
  color: floralwhite;
  border-width: 1px;
  border-style: solid;
  border-image:
      linear-gradient(
          to right,
          #262626,
          #262626 30%,
          #515151 50%,
          #262626 70%,
          rgba(0, 0, 0, 0)
      ) 90 10%;
}

</style>