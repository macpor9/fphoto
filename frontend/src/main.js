import Vue from 'vue'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.min.css"
import './main.css'
import router from "@/router";

Vue.config.productionTip = false



new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

