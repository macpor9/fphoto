<template>
  <ValidationProvider class="InputLabel" :name=fieldName rules="required" v-slot="{errors}">
    <div class="nameInput">
      <label :for="fieldName">{{ fieldName }}</label>
      <input :type=fieldType v-model=fieldModel>
    </div>
      <span>{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>


export default {
  name: "InputLabel",
  props: {
    fieldName: String,
    fieldType: String,
    fieldValidate: String,
    fieldRules: String,
    fieldModel: String
  }
}



</script>

<style scoped>

.InputLabel{
  display: flex;
  flex-direction: column;
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

.nameInput{
  display: flex;
  flex-direction: row;
}

</style>