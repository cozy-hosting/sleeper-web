import { RouteConfig } from "vue-router";
import Deployment from "@/views/deployment/Deployment.vue";
import DeploymentCreate from "@/views/deployment/Create.vue";

export const deploymentRoutes: RouteConfig[] = [
  {
    path: "/deployment",
    component: Deployment
  },
  {
    path: "/deployment/create",
    component: DeploymentCreate
  }
];
