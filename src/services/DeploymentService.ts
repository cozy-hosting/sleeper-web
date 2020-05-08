import ApiClient from "./ApiConfig";

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
  getAll(skip: number, take: number) {
    return ApiClient.get(`deployment?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiClient.get(`deployment/${id}`);
  }

  create(deployment: DeploymentInterface) {
    return ApiClient.post("deployment", deployment);
  }

  update(id: number, deployment: DeploymentInterface) {
    return ApiClient.put(`deployment/${id}`, deployment);
  }

  delete(id: number) {
    return ApiClient.delete(`deployment/${id}`);
  }
}

export default new DeploymentService();
