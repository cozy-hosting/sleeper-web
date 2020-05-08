import ApiClient from "./ApiConfig";

interface NetworkCreateInterface {
  name: string;
  description: string;
  subnet: string;
}

interface NetworkConnectInterface {
  container: string;
}

class NetworkService {
  getAll(skip: number, take: number) {
    return ApiClient.get(`network?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiClient.get(`network/${id}`);
  }

  create(network: NetworkCreateInterface) {
    return ApiClient.post("network", network);
  }

  connect(id: number, network: NetworkConnectInterface) {
    return ApiClient.post(`network/${id}/connect`, network);
  }

  disconnect(id: number, network: NetworkConnectInterface) {
    return ApiClient.post(`network/${id}/disconnect`, network);
  }

  delete(id: number) {
    return ApiClient.delete(`network/${id}`);
  }
}

export default new NetworkService();
