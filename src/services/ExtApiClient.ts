import axios, {AxiosInstance} from "axios";

// API Client for External MicroServices [Glances, User]
export default class ExtApiClient {

  public static create(baseUrl = ""): AxiosInstance {
    return axios.create({
      baseURL: baseUrl,
      /*headers: {
        "X-Forwarded-Authorization": "Bearer " + localStorage.getItem("authToken")
      }*/
    });
  }

}
