import ApiClient from "./ApiConfig";

interface Deployment {
  name: string;
  description: string;
  image: string;
  ports: string[];
  mounts: string[];
  enviroment: {
    [key: string]: string;
  };
  labels: {
    [key: string]: string;
  };
}

class DeploymentService {
  getAll(skip: number, take: number) {
    return ApiClient.get(`deplyoment?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiClient.get(`deployment/${id}`);
  }

  create(deployment: Deployment) {
    return ApiClient.post("deployment", deployment);
  }

  update(id: number, deployment: Deployment) {
    return ApiClient.put(`deployment/${id}`, deployment);
  }

  delete(id: number) {
    return ApiClient.delete(`deployment/${id}`);
  }
}

export default new DeploymentService();
