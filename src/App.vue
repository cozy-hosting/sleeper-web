<template>
  <div class="app">
    <header>
      <router-link :to="{ name: 'Home' }">Cozy</router-link>
    </header>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component({})
export default class App extends Vue {
  private currentPage: string[] = [];

  onMenuItemSelected(e: any) {
    this.$router.push(e.key);
  }

  get selectedKeys() {
    return [this.$route.path];
  }
}
</script>

<style lang="scss">
.logo {
  width: 120px;
  font-size: 36px;
  color: white;
  float: left;
  line-height: 1.55;
}
</style>
