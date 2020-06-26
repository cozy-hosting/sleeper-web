import { RouteConfig } from "vue-router";
import Container from "@/views/container/Container.vue";
import Create from "@/views/container/Create.vue";
import { ContainerModule } from "@/store";

export const containerRoutes: RouteConfig[] = [
  {
    path: "/container",
    component: Container,
    beforeEnter: async (to, from, next) => {
      await ContainerModule.fetchContainer();
      next();
    },
    children: [
      {
        path: "/container/create",
        component: Create
      }
    ]
  }
];
