<template>
  <div>
    <h1>Container</h1>
  </div>
</template>

<script lang="ts">
import ContainerService from "@/services/ContainerService";
export default {
  created() {
    ContainerService.getAll(0, 20).then(res => console.log(res));
  }
};
</script>
<style lang="scss" scoped></style>
