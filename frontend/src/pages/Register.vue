<template>
  <div class="form">
    <label class="field3D">
      User Login
    </label>
    <InputLabel fieldName="username"></InputLabel>
    <InputLabel fieldName="e-mail"></InputLabel>
    <InputLabel fieldName="password"></InputLabel>
    <InputLabel fieldName="repeat password"></InputLabel>
    <div class="buttonsContainer">
      <router-link to="/login" class="field3D button" tag="button">Sign up</router-link>
    </div>
  </div>
</template>

<script>
import InputLabel from "@/components/loggedOutComponents/InputLabel";
export default {
  name: "Register",
  components: {InputLabel}
}
</script>

<style scoped>
@import "./../assets/Form.less";

</style>