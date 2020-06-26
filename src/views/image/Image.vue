<template>
  <div>
    <a-page-header title="Images" style="padding: 0 0 20px 0">
      <a-button @click="$router.push('/image/create')" slot="extra">
        Create new
      </a-button>
    </a-page-header>
    <section class="card-grid">
      <image-card
        v-for="image in images"
        :image="image"
        :key="image.id"
      ></image-card>
    </section>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ImageModule } from "@/store";
import ImageCard from "@/components/image/ImageCard.vue";

@Component({
  components: { ImageCard }
})
export default class Deployment extends Vue {
  get images() {
    return ImageModule.images;
  }

  created() {
    ImageModule.fetchImages();
  }
}
</script>

<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2em;
}
</style>
