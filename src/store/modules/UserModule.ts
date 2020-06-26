import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/interfaces/userInterfaces";
import TokenService from "@/services/TokenService";
import { apiClient } from "@/services/ApiClient";

@Module({ namespaced: true, name: "userModule" })
class UserModule extends VuexModule {
  user: User = { name: "", token: "", rememberMe: false };
  loggedIn = false;

  @Mutation
  SET_USER(user: User) {
    this.user = user;
    if (user.rememberMe) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  @Mutation
  LOGIN() {
    this.loggedIn = true;
  }

  @Mutation
  LOGOUT() {
    this.loggedIn = false;
  }

  @Action
  async login(user: User) {
    this.SET_USER(user);
    try {
      await TokenService.verifyToken();
      this.LOGIN();
    } catch (error) {
      console.log(error);
    }
  }

  @Action
  logout() {
    this.LOGOUT();
    localStorage.removeItem("user");
  }
}

export default UserModule;
