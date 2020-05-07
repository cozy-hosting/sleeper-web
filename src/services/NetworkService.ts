import ApiClient from "./ApiConfig";

interface NetworkCreate {
  name: string;
  description: string;
  subnet: string;
}

interface NetworkConnect {
  container: string;
}

class NetworkService {
  getAll(skip: number, take: number) {
    return ApiClient.get(`network?skip=${skip}&take=${take}`);
  }

  getById(id: number) {
    return ApiClient.get(`network/${id}`);
  }

  create(network: NetworkCreate) {
    return ApiClient.post("network", network);
  }

  connect(id: number, network: NetworkConnect) {
    return ApiClient.post(`network/${id}/connect`, network);
  }

  disconnect(id: number, network: NetworkConnect) {
    return ApiClient.post(`network/${id}/disconnect`, network);
  }

  delete(id: number) {
    return ApiClient.delete(`network/${id}`);
  }
}

export default new NetworkService();
