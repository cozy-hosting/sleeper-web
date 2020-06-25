import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import _NavigationModule from "./modules/navigationModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    navigationModule: _NavigationModule
  }
});

export default store;
export const navigationModule = getModule(_NavigationModule, store);
