import { RouteConfig } from "vue-router";
import Network from "@/views/network/Network.vue";
import Create from "@/views/network/Create.vue";
import { NetworkModule } from "@/store";

export const networkRoutes: RouteConfig[] = [
  {
    path: "/network",
    component: Network,
    beforeEnter: async (to, form, next) => {
      await NetworkModule.fetchNetworks();
      next();
    },
    children: [
      {
        path: "/network/create",
        component: Create
      }
    ]
  }
];
