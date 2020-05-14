import ApiClient from './ApiClient';

export interface NetworkCreateInterface {
  name: string;
  description: string;
  subnet: string;
}

export interface NetworkConnectInterface {
  container: string;
}

class NetworkService {
  public getAll(skip: number, take: number) {
    return ApiClient.get(`network?skip=${skip}&take=${take}`);
  }

  public getById(id: number) {
    return ApiClient.get(`network/${id}`);
  }

  public create(network: NetworkCreateInterface) {
    return ApiClient.post('network', network);
  }

  public connect(id: number, network: NetworkConnectInterface) {
    return ApiClient.post(`network/${id}/connect`, network);
  }

  public disconnect(id: number, network: NetworkConnectInterface) {
    return ApiClient.post(`network/${id}/disconnect`, network);
  }

  public delete(id: number) {
    return ApiClient.delete(`network/${id}`);
  }
}

export default new NetworkService();
