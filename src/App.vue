<template>
<<<<<<< HEAD
  <div class="app">
    <header class="header">
      <router-link :to="{ name: 'Home' }" class="logo">Cozy</router-link>
    </header>
    <nav class="sider">
      <a-menu>
        <a-menu-item>
          <router-link :to="{ name: 'Deployments' }">Deployments</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link :to="{ name: 'Containers' }">Container</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link :to="{ name: 'Images' }">Images</router-link>
        </a-menu-item>
      </a-menu>
    </nav>
    <main class="main">
      <router-view></router-view>
    </main>
    <footer class="footer">Cozy 2020</footer>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.app {
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(230px, 15vw) 1fr;
  grid-template-rows: 80px 1fr 70px;
  grid-template-areas:
    "header header"
    "sider main"
    "sider footer";
}

.header {
  grid-area: header;
  background: #001529;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4em;

  .logo {
    display: block;
    font-size: 32px;
    color: white;
  }
}

.sider {
  grid-area: sider;

  .ant-menu {
    height: 100%;
    padding: 30px 0;

    .ant-menu-item {
      padding: 0 32px;
    }
  }
}

.main {
  grid-area: main;
  padding: 4em;
}

.footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4em;
  border-top: 1px solid #e8e8e8;
=======
  <a-layout style="position: relative; height: 100%">
    <a-layout-header class="header">
      <router-link to="/">
        <div class="logo">Cozy</div>
      </router-link>
      <a-menu
        theme="dark"
        mode="horizontal"
        @select="onMenuItemSelected"
        :selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/deployments">Deployments</a-menu-item>
        <a-menu-item key="/containers">Containers</a-menu-item>
        <a-menu-item key="/images">Images</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <portal-target name="sidebar"></portal-target>
      </a-layout-sider>
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
>>>>>>> staging
}
</style>
