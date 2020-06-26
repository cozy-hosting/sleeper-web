import { RouteConfig } from "vue-router";
import Home from "@/views/home/Home.vue";

export const homeRoutes: RouteConfig[] = [
  {
    path: "/",
    component: Home
  }
];
