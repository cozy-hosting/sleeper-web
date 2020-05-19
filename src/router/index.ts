import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Deployments from "@/views/Deployments.vue";
import Containers from "@/views/Containers.vue";
import Images from "@/views/Images.vue";
import Authentication from "@/views/Authentication.vue";
import store from "@/store";
import AuthenticationService from "@/services/AuthenticationService";
import Networks from "@/views/Networks.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/deployments",
    name: "Deployments",
    component: Deployments
  },
  {
    path: "/containers",
    name: "Containers",
    component: Containers
  },
  {
    path: "/images",
    name: "Images",
    component: Images
  },
  {
    path: "/login",
    name: "Authentication",
    component: Authentication
  },
  {
    path: "/networks",
    name: "Networks",
    component: Networks
  },
  {
    path: "*",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>
{
  const authService = new AuthenticationService();
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = authService.isValidToken();

  store.commit("SET_LAYOUT", "application-layout");

  // change layout if it's a public page
  if (!authRequired) 
  {
    store.commit("SET_LAYOUT", "public-page-layout");
  }

  if (authRequired && !loggedIn)
  {
    return next("/login");
  }

  next();
});

export default router;
