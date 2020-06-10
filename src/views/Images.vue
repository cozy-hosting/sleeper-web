<template>
  <div>
    <portal to="sidebar"></portal>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Images</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '4em', margin: 0 }"
    >
      <section class="card-grid">
        <image-card
          v-for="image in images"
          :image="image"
          :key="image.id"
          @delete="onDelete"
        ></image-card>
      </section>
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Image } from "@/interfaces/Image/ImageInterface";
import ImageService from "@/services/ImageService";
import ImageCard from "@/components/Image/ImageCard.vue";
const imageService = new ImageService();

@Component({
  components: {
    ImageCard
  }
})
export default class Images extends Vue {
  images: Image[] = [];

  async created() {
    const { data } = await imageService.getAll(0, 20);
    this.images = data.data;
  }

  // Fetch images again after successful delete
  async onDelete() {
    const { data } = await imageService.getAll(0, 20);
    this.images = data.data;
  }
}
</script>

<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2em;
}
</style>
