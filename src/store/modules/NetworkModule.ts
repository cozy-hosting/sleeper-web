import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Network } from "@/interfaces/networkInterfaces";
import NetworkService from "@/services/NetworkService";

@Module({ namespaced: true, name: "networkModule" })
class NetworkModule extends VuexModule {
  networks: Network[] = [];

  @Mutation
  SET_NETWORKS(networks: Network[]) {
    this.networks = networks;
  }

  @Action
  async fetchNetworks() {
    const { data } = await NetworkService.getAll(0, 20);
    this.SET_NETWORKS(data.data);
  }
}

export default NetworkModule;
