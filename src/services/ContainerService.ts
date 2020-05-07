import ApiClient from "./ApiConfig";

interface Container {
  deployment: string;
}

class ContainerService {
  getAll(skip: number, take: number) {
    return ApiClient.get(`container?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiClient.get(`container/${id}`);
  }

  create(container: Container) {
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
