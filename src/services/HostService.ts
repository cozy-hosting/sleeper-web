import ExtApiClient from "@/services/ExtApiClient";

export default class HostService {
    private client = ExtApiClient.create(process.env.VUE_APP_GLANCES_URL, true);

    public async getAllInfo(): Promise<object> {
        return (await this.client.get('all')).data;
    }

    public async getUptime(): Promise<string> {
        return (await this.client.get('uptime')).data;
    }

    public async getMemoryInfo(): Promise<object> {
        return (await this.client.get('mem')).data;
    }

    public async getFilesystemInfo(): Promise<object> {
        return (await this.client.get('fs')).data;
    }

    public async getCoreInfo(): Promise<object> {
        return (await this.client.get('core')).data;
    }

    public async getCpuInfo(): Promise<object> {
        return (await this.client.get('cpu')).data;
    }

    public async getNetworkInfo(): Promise<object> {
        return (await this.client.get('network')).data;
    }

    public async getDockerInfo(): Promise<object> {
        return (await this.client.get('docker')).data;
    }

    public async getSystemInfo(): Promise<object> {
        return (await this.client.get('system')).data;
    }
}