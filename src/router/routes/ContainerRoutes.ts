import { RouteConfig } from "vue-router";
import Container from "@/views/container/Container.vue";
import Create from "@/views/container/Create.vue";

export const containerRoutes: RouteConfig[] = [
  {
    path: "/container",
    component: Container,
    children: [
      {
        path: "/image/create",
        component: Create
      }
    ]
  }
];
