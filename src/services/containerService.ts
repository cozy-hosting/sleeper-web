import ApiClient from "./apiConfig";

export interface ContainerInterface {
  deployment: string;
}

class ContainerService {
  public getAll(skip: number, take: number) {
    return ApiClient.get(`container?skip=${skip}&take=${take}`);
  }

  public getById(id: number) {
    return ApiClient.get(`container/${id}`);
  }

  public create(container: ContainerInterface) {
    return ApiClient.post("container", container);
  }

  public start(id: number) {
    return ApiClient.post(`container/${id}/start`);
  }

  public stop(id: number) {
    return ApiClient.post(`container/${id}/stop`);
  }

  public delete(id: number) {
    return ApiClient.delete(`container/${id}`);
  }
}

export default new ContainerService();
