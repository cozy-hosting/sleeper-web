import { apiClient } from "./apiClient";
import { AxiosResponse } from "axios";
import {
  ContainerGetAll,
  ContainerCreate,
  ContainerGetById
} from "@/interfaces/containerInterfaces";

class ContainerService {
  getAll(skip: number, take: number): Promise<AxiosResponse<ContainerGetAll>> {
    return apiClient.get(`container?skip=${skip}&take=${take}`);
  }

  getById(id: string): Promise<AxiosResponse<ContainerGetById>> {
    return apiClient.get(`container/${id}`);
  }

  create(container: ContainerCreate) {
    return apiClient.post("container", container);
  }

  start(id: string) {
    return apiClient.post(`container/${id}/start`);
  }

  stop(id: string) {
    return apiClient.post(`container/${id}/stop`);
  }

  delete(id: string) {
    return apiClient.delete(`container/${id}`);
  }
}

export default new ContainerService();
