import { RouteConfig } from "vue-router";
import Deployment from "@/views/deployment/Deployment.vue";

export const deploymentRoutes: RouteConfig[] = [
  {
    path: "/deployment",
    name: "deployment",
    component: Deployment
  }
];
