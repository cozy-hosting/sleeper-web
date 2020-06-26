import { RouteConfig } from "vue-router";
import Login from "@/components/base/TheLogin.vue";

export const loginRoutes: RouteConfig[] = [
  {
    path: "/login",
    component: Login
  }
];
