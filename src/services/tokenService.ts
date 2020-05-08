import ApiClient from "./apiConfig";

export interface TokenInterface {
  name: string;
  description: string;
}

class TokenService {
  public create(token: TokenInterface) {
    return ApiClient.post("token", token);
  }
}

export default new TokenService();
