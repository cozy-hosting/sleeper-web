import ApiClient from './ApiClient';
import { DeploymentInterface } from "@/interfaces/DeploymentInterface";


export default class DeploymentService {
  public getAll(skip: number, take: number) {
    return ApiClient.get(`deployment?skip=${skip}&take=${take}`);
  }

  public getById(id: number) {
    return ApiClient.get(`deployment/${id}`);
  }

  public create(deployment: DeploymentInterface) {
    return ApiClient.post('deployment', deployment);
  }

  public update(id: number, deployment: DeploymentInterface) {
    return ApiClient.put(`deployment/${id}`, deployment);
  }

  public delete(id: number) {
    return ApiClient.delete(`deployment/${id}`);
  }
}
