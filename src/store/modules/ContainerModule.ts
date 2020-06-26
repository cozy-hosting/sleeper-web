import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ContainerService from "@/services/ContainerService";
import { Container, ContainerCreate } from "@/interfaces/containerInterfaces";

@Module({ namespaced: true, name: "containerModule" })
class ContainerModule extends VuexModule {
  container: Container[] = [];

  @Mutation
  SET_CONTAINER(container: Container[]) {
    this.container = container;
  }

  @Action
  async fetchContainer() {
    const { data } = await ContainerService.getAll(0, 20);
    this.SET_CONTAINER(data.data);
  }

  async createContainer(deployment: ContainerCreate) {
    await ContainerService.create(deployment);
    this.fetchContainer();
  }
}

export default ContainerModule;
