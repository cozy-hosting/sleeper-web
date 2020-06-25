import { apiClient } from "./apiClient";
import { AxiosResponse } from "axios";
import {
  DeploymentGetAll,
  Deployment,
  DeploymentGetById
} from "@/interfaces/deploymentInterfaces";

export class DeploymentService {
  getAll(skip: number, take: number): Promise<AxiosResponse<DeploymentGetAll>> {
    return apiClient.get(`deployment?skip=${skip}&take=${take}`);
  }

  public getById(id: string): Promise<AxiosResponse<DeploymentGetById>> {
    return apiClient.get(`deployment/${id}`);
  }

  public create(deployment: Deployment) {
    return apiClient.post("deployment", deployment);
  }

  public update(id: string, deployment: Deployment) {
    return apiClient.put(`deployment/${id}`, deployment);
  }

  public delete(id: string) {
    return apiClient.delete(`deployment/${id}`);
  }
}

export default new DeploymentService();
