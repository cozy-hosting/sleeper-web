export interface Network {
  id: string;
  name: string;
  description: string;
  subnet: string;
  gateway: string;
  containers: string[];
}

export interface NetworkGetAll {
  data: Network[];
  count: number;
}

export interface NetWorkGetById {
  data: Network;
}

export interface NetWorkCreate {
  name: string;
  description: string;
  subnet: string;
}

export interface NetworkConnection {
  container: string;
}
