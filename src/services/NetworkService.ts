import { apiClient } from "./ApiClient";
import { AxiosResponse } from "axios";
import {
  NetworkGetAll,
  NetWorkGetById,
  NetWorkCreate,
  NetworkConnection
} from "@/interfaces/networkInterfaces";

class NetworkService {
  getAll(skip: number, take: number): Promise<AxiosResponse<NetworkGetAll>> {
    return apiClient.get(`network?skip=${skip}&take=${take}`);
  }

  getById(id: string): Promise<AxiosResponse<NetWorkGetById>> {
    return apiClient.get(`network/${id}`);
  }

  create(network: NetWorkCreate) {
    return apiClient.post("network", network);
  }

  connect(id: string, network: NetworkConnection) {
    return apiClient.post(`network/${id}/connect`, network);
  }

  disconnect(id: string, network: NetworkConnection) {
    return apiClient.post(`network/${id}/disconnect`, network);
  }

  delete(id: string) {
    return apiClient.delete(`network/${id}`);
  }
}

export default new NetworkService();
