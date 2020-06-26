import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import {
  Deployment,
  DeploymentCreateForm,
  DeploymentCreate
} from "@/interfaces/deploymentInterfaces";
import DeploymentService from "@/services/DeploymentService";

@Module({ namespaced: true, name: "deploymentModule" })
class DeploymentModule extends VuexModule {
  deployments: Deployment[] = [];

  @Mutation
  SET_DEPLOYMENTS(deployments: Deployment[]) {
    this.deployments = deployments;
  }

  @Action
  async fetchDeployments() {
    const { data } = await DeploymentService.getAll(0, 20);
    this.SET_DEPLOYMENTS(data.data);
  }

  @Action
  async deleteDeployment(id: string) {
    await DeploymentService.delete(id);
    this.fetchDeployments();
  }

  @Action
  async createDeployment(deployment: DeploymentCreateForm) {
    const parsed: DeploymentCreate = {
      ...deployment,
      environment: {},
      labels: {}
    };
    deployment.environment.forEach(x => (parsed.environment[x.key] = x.value));
    deployment.labels.forEach(x => (parsed.labels[x.key] = x.value));
    await DeploymentService.create(parsed);
  }
}

export default DeploymentModule;
