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

  @Action
  async createContainer(deployment: ContainerCreate) {
    await ContainerService.create(deployment);
    this.fetchContainer();
  }

  @Action
  async startContainer(id: string) {
    await ContainerService.start(id);
    this.fetchContainer();
  }

  @Action
  async stopContainer(id: string) {
    await ContainerService.stop(id);
    this.fetchContainer();
  }

  @Action
  async deleteContainer(id: string) {
    await ContainerService.delete(id);
    this.fetchContainer();
  }

  get sortedContainer() {
    const state: Record<string, number> = {
      running: 10,
      created: 5,
      exited: 0
    };

    return this.container.sort((a, b) => state[b.state] - state[a.state]);
  }
}

export default ContainerModule;
