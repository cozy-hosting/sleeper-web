import ApiClient from "./ApiConfig";

interface TokenInterface {
  name: string;
  description: string;
}

class TokenService {
  create(token: TokenInterface) {
    return ApiClient.post("token", token);
  }
}

export default new TokenService();
