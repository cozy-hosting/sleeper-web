import axios, {AxiosInstance} from "axios";

// API Client for External MicroServices [Glances, User]
export default class ExtApiClient {

  public static create(baseUrl = "", forwardAuth = false): AxiosInstance {
    let headers = {};
    if (forwardAuth) {
      headers = {"X-Forwarded-Authorization": "Bearer " + localStorage.getItem("authToken")};
    }

    return axios.create({
      baseURL: baseUrl,
      headers: headers,
    });
  }

}
