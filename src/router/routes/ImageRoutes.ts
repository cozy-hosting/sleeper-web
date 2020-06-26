import { RouteConfig } from "vue-router";
import Image from "@/views/image/Image.vue";
import Create from "@/views/image/Create.vue";
import { ImageModule } from "@/store";

export const imageRoutes: RouteConfig[] = [
  {
    path: "/image",
    name: "image",
    component: Image,
    beforeEnter: async (to, form, next) => {
      await ImageModule.fetchImages();
      next();
    },
    children: [
      {
        path: "/image/create",
        component: Create
      }
    ]
  }
];
