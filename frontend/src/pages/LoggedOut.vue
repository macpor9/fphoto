<template>
    <div class="form">
      <label class="field3D">
        User Login
      </label>
      <InputLabel fieldName="username"></InputLabel>
      <InputLabel fieldName="password"></InputLabel>
      <div class="buttonsContainer">
        <button class="field3D">login</button>
        <button class="field3D">sign up</button>
      </div>

    </div>
</template>

<script>
import InputLabel from "@/components/loggedOutComponents/InputLabel";
export default {
  name: "loggedOut",
  components: {InputLabel}
}


</script>

<style scoped>



.form{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: floralwhite;
  width: 30vw;
  height: 70vh;
  border: 2px solid #515151;
  border-radius: 20px;
  background-color: #262626;
}

.buttonsContainer{
  margin: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}



.field3D{
  box-shadow:
      0 11px 40px -15px black,
      0 -11px 40px -15px black;
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
button{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vh 5vh;

  line-height: 7vh;
  font-size: 5vh;
  background: linear-gradient(to right, #262626, #353535 50%, #262626 );
  color: floralwhite;
  width: 10vw;
  white-space: nowrap;
  box-shadow:
      0 11px 20px -10px black,
      0 -11px 20px -10px black;
}

</style>
