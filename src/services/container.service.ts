import axios, { AxiosInstance } from 'axios';

export default class ContainerService {
    header = { Authorization: "Bearer " + process.env.VUE_APP_API_JWT_TOKEN };
    httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers: this.header
        })
    }

    async getAll(skip: number, take: number)
    {
        const url = "/Container?skip=" + skip + "&take=" + take;
        return await this.httpClient.get(url);
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

    async delete(contID: string)
    {
        const url = "/Container/" + contID;
        return await this.httpClient.delete(url);
    }
}