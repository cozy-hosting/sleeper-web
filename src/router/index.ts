import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { deploymentRoutes } from "./routes/DeploymentRoutes";
import { imageRoutes } from "./routes/ImageRoutes";
import { containerRoutes } from "./routes/ContainerRoutes";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  ...deploymentRoutes,
  ...imageRoutes,
  ...containerRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
