import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import {
  Deployment,
  DeploymentCreateForm,
  DeploymentCreate
} from "@/interfaces/deploymentInterfaces";
import DeploymentService from "@/services/DeploymentService";
import { ContainerModule } from "@/store";

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
    // Map environment and labels attributes to correct form
    deployment.environment.forEach(x => (parsed.environment[x.key] = x.value));
    deployment.labels.forEach(x => (parsed.labels[x.key] = x.value));
    // Create deployment
    const { data } = await DeploymentService.create(parsed);
    // Create container for deployment
    await ContainerModule.createContainer({ deployment: data.data });
  }

  get getDeploymentById() {
    return (id: string) => this.deployments.find(d => d.id === id);
  }
}

export default DeploymentModule;
