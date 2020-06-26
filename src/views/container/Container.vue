<template>
  <div>
    <a-page-header title="Container" style="padding: 0 0 20px 0">
      <a-button @click="$router.push('/container/create')" slot="extra">
        Create new
      </a-button>
    </a-page-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ContainerModule } from "@/store";

@Component
export default class ContainerMain extends Vue {
  get container() {
    return ContainerModule.container;
  }

  created() {
    ContainerModule.fetchContainer();
  }
}
</script>

<style lang="scss" scoped></style>
