import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ContainerService from "@/services/ContainerService";
import { Container, ContainerCreate } from "@/interfaces/ContainerInterface";

const containerService = new ContainerService();

@Module({ namespaced: true, name: "containerModule" })
class ContainerModule extends VuexModule {
  container: Container[] = [];

  @Mutation
  SET_CONTAINER(container: Container[]) {
    this.container = container;
  }

  @Action
  async fetchContainer() {
    const { data } = await containerService.getAll(0, 20);
    this.SET_CONTAINER(data.data);
  }

  @Action
  async createContainer(deployment: ContainerCreate) {
    await containerService.create(deployment);
    this.fetchContainer();
  }

  @Action
  async startContainer(id: string) {
    await containerService.start(id);
    this.fetchContainer();
  }

  @Action
  async stopContainer(id: string) {
    await containerService.stop(id);
    this.fetchContainer();
  }

  @Action
  async deleteContainer(id: string) {
    await containerService.delete(id);
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
