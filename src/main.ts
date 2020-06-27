import "./plugins/ant-design-vue.ts";
import "./plugins/class-component-hooks";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store, { UserModule } from "./store";

Vue.config.productionTip = false;

Vue.filter("capitalize", (value: string) => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      UserModule.login(user);
    }
  },
  render: h => h(App)
}).$mount("#app");
