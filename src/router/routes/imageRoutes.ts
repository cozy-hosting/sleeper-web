import { RouteConfig } from "vue-router";
import Image from "@/views/image/Image.vue";

export const imageRoutes: RouteConfig[] = [
  {
    path: "/image",
    name: "image",
    component: Image
  }
];
