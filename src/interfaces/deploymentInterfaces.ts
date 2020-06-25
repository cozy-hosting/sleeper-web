export interface Deployment {
  id: string;
  name: string;
  description: string;
  image: string;
  ports: string[];
  mounts: string[];
  environment: { [key: string]: string };
  labels: { [key: string]: string };
}

export interface DeploymentGetAll {
  data: Deployment[];
  count: number;
}

export interface DeploymentGetById {
  data: Deployment;
}

export interface DeploymentCreate {
  name: string;
  description: string;
  image: string;
  ports: string[];
  mounts: string[];
  environment: { [key: string]: string };
  labels: { [key: string]: string };
}

export interface DeploymentCreateForm {
  name: string;
  description: string;
  image: string;
  ports: string[];
  mounts: string[];
  environment: { key: string; value: string }[];
  labels: { key: string; value: string }[];
}
