import Config from '@/interfaces/config';
import axios, { AxiosInstance } from 'axios';

export default class ContainerService {
    config: Config = require("../api_config.json");
    header = { Authorization: "Bearer " + this.config.authToken };
    httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: this.config.apiUrl,
            headers: this.header
        })
    }

    async create(depID: string)
    {
        const url = "/Container";
        return await this.httpClient.post(url, { deployment: depID });
    }

    async start(contID: string)
    {
        const url = "/Container/" + contID + "/start";
        return await this.httpClient.post(url);
    }
}