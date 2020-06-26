import { RouteConfig } from "vue-router";
import Image from "@/views/image/Image.vue";
import Create from "@/views/image/Create.vue";

export const imageRoutes: RouteConfig[] = [
  {
    path: "/image",
    name: "image",
    component: Image,
    children: [
      {
        path: "/image/create",
        component: Create
      }
    ]
  }
];
