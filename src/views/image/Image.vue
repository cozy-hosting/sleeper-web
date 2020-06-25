<template>
  <div>
    <a-page-header title="Images" style="padding: 0 0 20px 0"></a-page-header>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { imageModule } from "@/store";

@Component
export default class Deployment extends Vue {
  get images() {
    return imageModule.images;
  }

  created() {
    imageModule.fetchImages();
  }
}
</script>

<style></style>
