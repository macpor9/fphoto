import Vue from 'vue'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.min.css"
import './assets/main.less'
import router from "@/router";
import Vuex from "vuex";
import Store from "@/store/store";

import {ValidationProvider} from 'vee-validate/dist/vee-validate.full.esm';
import {ValidationObserver} from 'vee-validate'
Vue.component('ValidationProvider',ValidationProvider);
Vue.component('ValidationObserver',ValidationObserver);


// Vue.config.productionTip = false

Vue.use(Vuex)



window.apps = new Vue({
  router: router,
  store: Store,
  render: h => h(App),
}).$mount('#app')