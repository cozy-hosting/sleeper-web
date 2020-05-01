import Config from '@/interfaces/config';
import axios, { AxiosInstance } from 'axios';

export default class ImageService {
    config: Config = require("../api_config.json");
    header = { Authorization: "Bearer " + this.config.authToken };
    httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: this.config.apiUrl,
            headers: this.header
        })
    }

    async getAll(skip: number, take: number)
    {
        const url = "/Image?skip=" + skip + "&take=" + take;
        return await this.httpClient.get(url);
    }

    async pull(depID: string)
    {
        const url = "/Image";
        return await this.httpClient.post(url, { deployment: depID });
    }

}