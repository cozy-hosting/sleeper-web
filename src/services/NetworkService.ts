import ApiClient from "./ApiClient";
import { NetworkConnectInterface } from "@/interfaces/Network/NetworkConnectInterface";
import { NetworkCreateInterface } from "@/interfaces/Network/NetworkCreateInterface";

export default class NetworkService {
  public getAll(skip: number, take: number) {
    return ApiClient.get(`network?skip=${skip}&take=${take}`);
  }

  public getById(id: string) {
    return ApiClient.get(`network/${id}`);
  }

  public create(network: NetworkCreateInterface) {
    return ApiClient.post("network", network);
  }

  public connect(id: string, network: NetworkConnectInterface) {
    return ApiClient.post(`network/${id}/connect`, network);
  }

  public disconnect(id: string, network: NetworkConnectInterface) {
    return ApiClient.post(`network/${id}/disconnect`, network);
  }

  public delete(id: string) {
    return ApiClient.delete(`network/${id}`);
  }
}
