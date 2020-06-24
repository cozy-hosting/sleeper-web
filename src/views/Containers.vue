<template>
  <div>
    <portal to="sidebar"></portal>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Containers</a-breadcrumb-item>
    </a-breadcrumb>
    <section :style="{ background: '#fff', padding: '4em' }">
      <a-page-header title="Containers">
        <a-button slot="extra" @click="showCreate">Create new</a-button>
      </a-page-header>
    </section>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ContainerService from "@/services/ContainerService";
import { Container } from "@/interfaces/ContainerInterface";
const containerService = new ContainerService();

@Component({})
export default class Containers extends Vue {
  container: Container[] = [];

  async created() {
    const { data } = await containerService.getAll(0, 20);
    this.container = data.data;
  }

  showCreate() {
    this.$router.push({ name: "CreateContainer" });
  }
}
</script>

<style lang="scss"></style>
