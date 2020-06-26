<template>
  <div>
    <a-page-header title="Container" style="padding: 0 0 20px 0">
      <a-button @click="$router.push('/container/create')" slot="extra">
        Create new
      </a-button>
    </a-page-header>
    <section class="card-grid">
      <container-card
        v-for="c in container"
        :container="c"
        :key="c.id"
      ></container-card>
    </section>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ContainerModule } from "@/store";
import ContainerCard from "@/components/container/ContainerCard.vue";

@Component({
  components: { ContainerCard }
})
export default class ContainerMain extends Vue {
  get container() {
    return ContainerModule.container;
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
