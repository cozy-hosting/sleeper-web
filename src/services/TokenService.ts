import { apiClient } from "./ApiClient";
import { AxiosResponse } from "axios";
import { TokenUpdate } from "@/interfaces/tokenInterfaces";

class TokenService {
  updateToken(): Promise<AxiosResponse<TokenUpdate>> {
    return apiClient.post("token");
  }

  verifyToken() {
    return apiClient.get("token");
  }
}

export default new TokenService();
