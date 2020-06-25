export interface Deployment {
  name: string;
  description: string;
  image: string;
  ports: string[];
  mounts: string[];
  environment: [
    {
      [key: string]: string;
    }
  ];
  labels: [
    {
      [key: string]: string;
    }
  ];
}

export interface DeploymentGetAll {
  data: Deployment[];
  count: number;
}

export interface DeploymentGetById {
  data: Deployment;
}
