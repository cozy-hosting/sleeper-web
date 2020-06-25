export interface Container {
  id: string;
  deployment: string;
  image: string;
  state: string;
  labels: { [key: string]: string };
  addresses: string[];
  ports: string[];
  mounts: string[];
}

export interface ContainerGetAll {
  data: Container[];
  count: number;
}

export interface ContainerGetById {
  data: Container;
}

export interface ContainerCreate {
  deployment: string;
}
