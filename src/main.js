import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import socketP from "./plugins/socketPlugin";

Vue.config.productionTip = false;
Vue.use(socketP)
// Vue.$cookies.config("7d");

new Vue({

  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
