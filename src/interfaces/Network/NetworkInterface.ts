export interface NetworkInterface {
    id: string;
    name: string;
    description: string;
    subnet: string;
    gateway: string;
    containers: any[];
}