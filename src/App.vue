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
      <router-view class="content"></router-view>
      <footer class="footer">Cozy 2020</footer>
    </main>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
.app {
  overflow: hidden;
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(230px, 15vw) 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
    "header header"
    "sider main";
}

.header {
  grid-area: header;
  background: #001529;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 45px;

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
      padding: 0 45px;
    }
  }
}

.main {
  grid-area: main;
  overflow-y: auto;
  display: grid;
  grid-template-rows: auto 70px;

  .content {
    padding: 4em;
  }

  .footer {
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e8e8e8;
    padding: 0 4em;
  }
}
</style>
