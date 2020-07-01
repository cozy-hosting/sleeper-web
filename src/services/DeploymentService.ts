import ApiClient from "./ApiClient";
import { Deployment, DeploymentGetAll } from "@/interfaces/DeploymentInterface";
import { AxiosResponse } from "axios";

export default class DeploymentService {
  public getAll(
    skip: number,
    take: number
  ): Promise<AxiosResponse<DeploymentGetAll>> {
    return ApiClient.get(`deployment?skip=${skip}&take=${take}`);
  }

  public getById(id: number) {
    return ApiClient.get(`deployment/${id}`);
  }

  public create(deployment: Deployment) {
    return ApiClient.post("deployment", deployment);
  }

  public update(id: number, deployment: Deployment) {
    return ApiClient.put(`deployment/${id}`, deployment);
  }

  public delete(id: number) {
    return ApiClient.delete(`deployment/${id}`);
  }
}
