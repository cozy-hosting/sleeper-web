import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { deploymentRoutes } from "./routes/deploymentRoutes";
import { imageRoutes } from "./routes/imageRoutes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [...deploymentRoutes, ...imageRoutes];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
