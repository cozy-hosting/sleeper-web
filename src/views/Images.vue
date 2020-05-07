<template>
  <div class="images">
    <h1>Images</h1>
  </div>
</template>

<script lang="ts">
import ImageService from "@/services/ImageService";

export default {
  created() {
    ImageService.getAll(0, 20).then(res => console.log(res));
  }
};
</script>

<style lang="scss" scoped></style>
