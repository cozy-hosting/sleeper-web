import axios, { AxiosInstance } from "axios";
import DeploymentInterface from "../interfaces/deployment.interface";

export default class DeployService {
  header = { Authorization: "Bearer " + process.env.VUE_APP_API_JWT_TOKEN };
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: this.header
    });
  }

  async getAll(skip: number, take: number) {
    const url = "/Deployment?skip=" + skip + "&take=" + take;
    return await this.httpClient.get(url);
  }

  async createDeployment(dep: DeploymentInterface) {
    const url = "/Deployment";
    return await this.httpClient.post(url, dep);
  }

  async getById(id: string) {
    const url = "/Deployment/" + id;
    return await this.httpClient.get(url);
  }

  async updateById(id: string, dep: DeploymentInterface) {
    const url = "/Deployment/" + id;
    return await this.httpClient.put(url, dep);
  }

  async deleteById(id: string) {
    const url = "/Deployment/" + id;
    return await this.httpClient.delete(url);
  }
}
