import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import _navigationModule from "./modules/NavigationModule";
import _imageModule from "./modules/ImageModule";
import _deploymentModule from "./modules/DeploymentModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    navigationModule: _navigationModule,
    imageModule: _imageModule,
    deploymentModule: _deploymentModule
  }
});

export default store;
export const navigationModule = getModule(_navigationModule, store);
export const imageModule = getModule(_imageModule, store);
export const deploymentModule = getModule(_deploymentModule, store);
