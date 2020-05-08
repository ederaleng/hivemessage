import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./modules/store";
import Notifications from 'vue-notification'

import "./assets/styles/index.css";

Vue.use(Notifications)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
