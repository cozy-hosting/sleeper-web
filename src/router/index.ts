import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { deploymentRoutes } from "./routes/DeploymentRoutes";
import { imageRoutes } from "./routes/ImageRoutes";
import { containerRoutes } from "./routes/ContainerRoutes";
import { networkRoutes } from "./routes/NetworkRoutes";
import { homeRoutes } from "./routes/HomeRoutes";
import { loginRoutes } from "./routes/LoginRoutes";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  ...deploymentRoutes,
  ...imageRoutes,
  ...containerRoutes,
  ...networkRoutes,
  ...homeRoutes,
  ...loginRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.replace("/");

export default router;
