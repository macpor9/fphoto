<template>
  <ValidationObserver v-slot="{invalid}" tag="form" name="form" @submit.prevent="handleLogin">
    <div class="form" >
      <label class="field3D formLabel heading">
        Login
      </label>
      <div class="InputLabel">
        <ValidationProvider class="InputLabel" name="login" rules="required|min:5" v-slot="{ errors }">
          <div class="nameInput">
            <label class="formLabel" >login</label>
            <input class="formInput" v-model="user.username" type="text">
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

      <div class="buttonsContainer">
        <button :disabled="invalid" class="field3D button" type="submit" value="user">login</button>
      </div>
      <router-link to="/register" class="redirectButton" tag="span">Dont have an account?</router-link>
      <div
          v-if="message"
          class="alertDanger"
      >{{ message }}
      </div>

    </div>
  </ValidationObserver>
</template>

<script>
import User from "@/models/User";
export default {
  name: "login",

  data(){
    return {
      user: new User('',''),
      loading: false,
      message: ''
    }
  },
  methods: {
    handleLogin(){
      this.loading=true;
      this.$store.dispatch('auth/login', this.user).then(
          ()=>{
            this.$router.push('/profile');
          },
          error => {
            this.loading = false;
            this.message = (error.response && error.response.data.message) ||
                error.message || error.toString;
          }
      );


    }
  }
}


</script>

<style scoped>
@import "./../assets/Form.less";
@import "./../assets/main.less";

.alertDanger {
  color: red;
}


</style>
