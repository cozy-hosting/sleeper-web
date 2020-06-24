import ApiClient from "./ApiClient";
import { ContainerInterface } from "@/interfaces/ContainerInterface";

export default class ContainerService {
  public getAll(skip: number, take: number) {
    return ApiClient.get(`container?skip=${skip}&take=${take}`);
  }

  public getById(id: string) {
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
