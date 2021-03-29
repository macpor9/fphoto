<template>
  <ValidationObserver v-slot="{invalid}" tag="form" name="form" @submit.prevent="handleRegister">
      <div class="form">
        <label class="field3D heading">
          Registration
        </label>
        <div class="InputLabel">
          <ValidationProvider class="InputLabel" name="login" rules="required|min:5" v-slot="{ errors }">
            <div class="nameInput">
              <label class="formLabel">login</label>
              <input class="formInput" v-model="user.login" type="text">
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="InputLabel">
          <ValidationProvider class="InputLabel" name="email" rules="required" v-slot="{errors}">
            <div class="nameInput">
              <label class="formLabel">email</label>
              <input class="formInput" v-model="user.email" type=email>
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="InputLabel">
          <ValidationProvider class="InputLabel" name="password" rules="required|min:5" v-slot="{errors}">
            <div class="nameInput">
              <label class="formLabel" >password</label>
              <input class="formInput" v-model="user.password" type="password" >
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="InputLabel">
          <ValidationProvider class="InputLabel" name=repeatPassword rules="required|min:5" v-slot="{errors}">
            <div class="nameInput">
              <label class="formLabel">repeat password</label>
              <input class="formInput" v-model="user.repeatPassword" type="password">
            </div>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="buttonsContainer">
            <button :disabled="invalid" class="field3D button" type="submit" value="newUser">Sign Up</button>
        </div>
        <router-link to="/login" class="redirectButton" tag="span">
          Already have an account?
        </router-link>
      </div>
    <div
        v-if="message"
        :class="successful ? 'alert-success' : 'alert-danger'"
    >{{ message }}
    </div>
  </ValidationObserver>
</template>

<script>
// import InputLabel from "@/components/loggedOutComponents/InputLabel";
import User from "@/models/User";

export default {
  name: "Register",
  // components: {InputLabel},
  data(){
    return {
      user: new User(1,'','',''),
      submitted: false,
      successful: false,
      message: ''

    }
  },
  methods: {
    handleRegister(){
      this.submitted = true;
      this.message = 'sadsda';
      this.$store.dispatch('auth/register',this.user);
      this.successful=true;

    }
  }
}
</script>

<style scoped lang="less">
@import "./../assets/Form.less";
@import "./../assets/main.less";




</style>