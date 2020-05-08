import axios, { AxiosInstance } from "axios";

export default class ImageService {
  header = { Authorization: "Bearer " + process.env.VUE_APP_API_JWT_TOKEN };
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: this.header
    });
  }

  async getAll(skip: number, take: number) {
    const url = "/Image?skip=" + skip + "&take=" + take;
    return await this.httpClient.get(url);
  }

  async pull(depID: string) {
    const url = "/Image";
    return await this.httpClient.post(url, { deployment: depID });
  }
}
