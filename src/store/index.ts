import Vue from "vue";
import Vuex from "vuex";
import {userModule} from "@/store/modules/UserModule";
import {layoutModule} from "@/store/modules/LayoutModule";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    layoutModule: layoutModule,
    userModule: userModule
  }
});
