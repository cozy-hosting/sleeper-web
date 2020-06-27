import Vue from "vue";
import VueRouter, { RouteConfig, Route, RawLocation } from "vue-router";
import { deploymentRoutes } from "./routes/DeploymentRoutes";
import { imageRoutes } from "./routes/ImageRoutes";
import { containerRoutes } from "./routes/ContainerRoutes";
import { networkRoutes } from "./routes/NetworkRoutes";
import { homeRoutes } from "./routes/HomeRoutes";
import { loginRoutes } from "./routes/LoginRoutes";

Vue.use(VueRouter);

declare module "vue/types/vue" {
  // Augment component instance type
  interface Vue {
    beforeRouteEnter?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void;

    beforeRouteLeave?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void;

    beforeRouteUpdate?(
      to: Route,
      from: Route,
      next: (to?: RawLocation | false | ((vm: Vue) => void)) => void
    ): void;
  }
}

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
