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
        ></image-card>
      </section>
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ImageService, { Image } from '@/services/ImageService';
import ImageCard from '@/components/ImageCard.vue';

@Component({
  components: {
    ImageCard
  }
})
export default class Images extends Vue {
  images: Image[] = [];

  created() {
    // prettier-ignore
    ImageService.getAll(0, 20)
      .then(res => this.images = res.data.data);
  }
}
</script>

<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 2em;
}
</style>
