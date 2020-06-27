import { RouteConfig } from "vue-router";
import Deployment from "@/views/deployment/Deployment.vue";
import Create from "@/views/deployment/Create.vue";
import Details from "@/views/deployment/Details.vue";
import { DeploymentModule } from "@/store";

export const deploymentRoutes: RouteConfig[] = [
  {
    path: "/deployment",
    component: Deployment
  },
  {
    path: "/deployment/create",
    component: Create
  },
  {
    path: "/deployment/detail/:id",
    component: Details,
    props: route => {
      const { id } = route.params;
      const deployment = DeploymentModule.getDeploymentById(id);
      return { deployment };
    }
  }
];
