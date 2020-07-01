import Vue from "vue";
import Vuex from "vuex";
import { userModule } from "@/store/modules/UserModule";
import { layoutModule } from "@/store/modules/LayoutModule";
import _containerMoudle from "./modules/ContainerModule";
import { getModule } from "vuex-module-decorators";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    layoutModule: layoutModule,
    userModule: userModule,
    containerModule: _containerMoudle
  }
});

export default store;
export const containerModule = getModule(_containerMoudle, store);
