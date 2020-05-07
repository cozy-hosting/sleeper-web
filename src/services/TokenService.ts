import ApiClient from "./ApiConfig";

interface Token {
  name: string;
  description: string;
}

class TokenService {
  create(token: Token) {
    return ApiClient.post("token", token);
  }
}

export default new TokenService();
