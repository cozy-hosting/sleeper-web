import ApiClient from "./ApiConfig";

export interface ContainerInterface {
  deployment: string;
}

class ContainerService {
  getAll(skip: number, take: number) {
    return ApiClient.get(`container?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiClient.get(`container/${id}`);
  }

  create(container: ContainerInterface) {
    return ApiClient.post("container", container);
  }

  start(id: number) {
    return ApiClient.post(`container/${id}/start`);
  }

  stop(id: number) {
    return ApiClient.post(`container/${id}/stop`);
  }

  delete(id: number) {
    return ApiClient.delete(`container/${id}`);
  }
}

export default new ContainerService();
