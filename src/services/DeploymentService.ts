import ApiClient from './ApiClient';

export interface DeploymentInterface {
  name: string;
  description: string;
  image: string;
  ports: string[];
  mounts: string[];
  environment: {
    [key: string]: string;
  };
  labels: {
    [key: string]: string;
  };
}

class DeploymentService {
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

export default new DeploymentService();
