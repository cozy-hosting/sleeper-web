<template>
  <a-layout style="position: relative; height: 100%">
    <a-layout-header class="header">
      <router-link to="/">
        <div class="logo">Cozy</div>
      </router-link>

    </a-layout-header>
    <a-layout>
      <a-layout style="padding: 0 24px 24px">
        <router-view></router-view>
        <a-layout-footer style="text-align: center">
          Cozy ©2020
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
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
