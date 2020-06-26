import Vue from "vue";
import Vuex from "vuex";
import { getModule } from "vuex-module-decorators";
import _navigationModule from "./modules/NavigationModule";
import _imageModule from "./modules/ImageModule";
import _deploymentModule from "./modules/DeploymentModule";
import _containerModule from "./modules/ContainerModule";
import _networkModule from "./modules/NetworkModule";
import _userModule from "./modules/UserModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    navigationModule: _navigationModule,
    imageModule: _imageModule,
    deploymentModule: _deploymentModule,
    containerModule: _containerModule,
    networkModule: _networkModule,
    userModule: _userModule
  }
});

export default store;
export const NavigationModule = getModule(_navigationModule, store);
export const ImageModule = getModule(_imageModule, store);
export const DeploymentModule = getModule(_deploymentModule, store);
export const ContainerModule = getModule(_containerModule, store);
export const NetworkModule = getModule(_networkModule, store);
export const UserModule = getModule(_userModule, store);
