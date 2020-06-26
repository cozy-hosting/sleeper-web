<template>
  <div>
    <a-page-header title="Networks" style="padding: 0 0 20px 0">
      <a-button @click="$router.push('/network/create')" slot="extra">
        Create new
      </a-button>
    </a-page-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NetworkModule } from "@/store";

@Component
export default class ImageMain extends Vue {
  get networks() {
    return NetworkModule.networks;
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
