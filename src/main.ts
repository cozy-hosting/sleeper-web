import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/ant-design-vue.js";
import PortalVue from "portal-vue";

Vue.config.productionTip = false;

Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
