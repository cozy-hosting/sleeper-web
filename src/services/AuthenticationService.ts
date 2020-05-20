import ApiClient from "./ApiClient";
import store from "@/store";

export default class AuthenticationService
{
  token: string | null | undefined;

  getNewToken()
  {
    const url = "/Token";
    return ApiClient.post(url);
  }

  setToken(token: string)
  {
    localStorage.setItem("authToken", token);
    ApiClient.defaults.headers = { Authorization: "Bearer " + token };
  }

    public isValidToken(){
        this.token = localStorage.getItem("authToken");
        try {
            const parsedToken = this.parseJwt(this.token || "");
            if(parsedToken.exp*1000 > Date.now()){
                store.commit("SET_USER", parsedToken);
                return true;
            }
        }catch (e) {
            return false;
        }
        return false;
    }

    parseJwt(token: string ): any
  {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c)
        {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}
