import ApiClient from "./ApiClient";
import {
  ContainerCreate,
  ContainerGetAll
} from "@/interfaces/ContainerInterface";
import { AxiosResponse } from "axios";

export default class ContainerService {
  public getAll(
    skip: number,
    take: number
  ): Promise<AxiosResponse<ContainerGetAll>> {
    return ApiClient.get(`container?skip=${skip}&take=${take}`);
  }

  public getById(id: string) {
    return ApiClient.get(`container/${id}`);
  }

  public create(container: ContainerCreate) {
    return ApiClient.post("container", container);
  }

  public start(id: string) {
    return ApiClient.post(`container/${id}/start`);
  }

  public stop(id: string) {
    return ApiClient.post(`container/${id}/stop`);
  }

  public delete(id: string) {
    return ApiClient.delete(`container/${id}`);
  }
}
