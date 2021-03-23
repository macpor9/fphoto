import Vue from 'vue'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.min.css"
import './main.css'
import router from "@/router";
import Vuex from "vuex";
import Store from "@/store/store";



Vue.config.productionTip = false

Vue.use(Vuex)

window.apps = new Vue({
  router: router,
  store: Store,
  render: h => h(App),
}).$mount('#app')