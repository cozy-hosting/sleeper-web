import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Deployments from "@/views/Deployments.vue";
import Containers from "@/views/Containers.vue";
import Images from "@/views/Images.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/deployments",
    name: "Deployments",
    component: Deployments,
  },
  {
    path: "/containers",
    name: "Containers",
    component: Containers,
  },
  {
    path: "/images",
    name: "Images",
    component: Images,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
