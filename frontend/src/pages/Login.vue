<template>
    <div class="form">
      <label class="field3D">
        User Login
      </label>
      <InputLabel fieldName="username"></InputLabel>
      <InputLabel fieldName="password"></InputLabel>
      <div class="buttonsContainer">
        <router-link to="/editing" class="field3D button" tag="button">
          login
        </router-link>
        <router-link to="/register" class="field3D button" tag="button">
          Sign up
        </router-link>
      </div>
    </div>
</template>

<script>
import InputLabel from "@/components/loggedOutComponents/InputLabel";
export default {
  name: "login",
  components: {InputLabel}
}


</script>

<style scoped>
@import "./../assets/Form.less";

</style>
