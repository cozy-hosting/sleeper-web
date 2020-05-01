export default interface DeploymentInterface
{
    name: string;
    description: string;
    image: string;
    ports: string[];
    mounts: string[];
    environment: any[];
    labels: any[];
    links: any[];
}
