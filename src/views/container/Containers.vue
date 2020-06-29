<template>
  <div>
    <portal to="sidebar"></portal>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Containers</a-breadcrumb-item>
    </a-breadcrumb>
    <a-page-header title="Container" style="padding: 0 0 20px 0">
      <a-button @click="$router.push('/container/create')" slot="extra">
        Create new
      </a-button>
    </a-page-header>
    <a-layout-content
      :style="{ background: '#fff', padding: '4em', margin: 0 }"
    >
      <section class="card-grid">
        <container-card
          v-for="c in container"
          :key="c.id"
          :container="c"
        ></container-card>
      </section>
    </a-layout-content>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContainerCard from "@/components/Containers/ContainerCard.vue";
import { containerModule } from "@/store";

@Component({
  components: { ContainerCard }
})
export default class Containers extends Vue {
  async created() {
    containerModule.fetchContainer();
  }

  get container() {
    return containerModule.sortedContainer;
  }

  showCreate() {
    this.$router.push({ name: "CreateContainer" });
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
