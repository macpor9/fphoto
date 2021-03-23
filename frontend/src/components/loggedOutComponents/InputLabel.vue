<template>
  <div class="InputLabel">
    <label>{{fieldName}}</label>
    <input type="text">
  </div>
</template>

<script>
export default {
  name: "InputLabel",
  props: {
    fieldName: String
  }
}



</script>

<style scoped>

.InputLabel{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
label{
  color: floralwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
      0 11px 15px -10px black,
      0 -11px 15px -10px black;

  margin: 15px;
  padding: 10px;
  width: 30vh;
  border-style: solid;
  border-width: 1px;
  border-color: #515151;
  font-size: 3vh;
  height: 3vh;

  background: linear-gradient(to right, #262626, #353535 50%, #262626 );
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

input{
  border-width: 0;
  width: 50%;
  margin: 15px;
  border-radius: 5px;
  font-size: 5vh;
}

</style>