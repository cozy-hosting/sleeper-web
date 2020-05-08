<template>
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
}
</style>
