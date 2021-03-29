<template>
  <div class="form">
    <label class="field3D">
      User Login
    </label>
    <InputLabel fieldName="username" fieldType="text" fieldValidate="'required|min:5|max:5'"></InputLabel>
    <InputLabel fieldName="e-mail" fieldType="text" fieldValidate="'require|email|max:50'"></InputLabel>
    <InputLabel fieldName="password" fieldType="password" fieldValidate="'required|min:5|max:5'"></InputLabel>
    <InputLabel fieldName="repeat password" fieldType="password" fieldValidate="'required|min:5|max:5'"></InputLabel>
    <div class="buttonsContainer">
      <router-link to="/login" class="field3D button" tag="button">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import InputLabel from "@/components/loggedOutComponents/InputLabel";
import User from "@/models/User";
export default {
  name: "Register",
  components: {InputLabel},
  data(){
    return {
      user: new User(1,'','','')
    }
  }
}
</script>

<style scoped>
@import "./../../assets/Form.less";

</style>