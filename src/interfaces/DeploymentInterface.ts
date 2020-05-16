export interface DeploymentInterface {
    name: string;
    description: string;
    image: string;
    ports: string[];
    mounts: string[];
    environment: [{
      [key: string]: string;
    }];
    labels: [{
      [key: string]: string;
    }];
  }