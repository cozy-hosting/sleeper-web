<template>
  <a-layout style="position: relative; height: 100%">
    <a-layout-header class="header">
      <router-link to="/">
        <div class="logo">cozy</div>
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
        <a-menu-item key="/networks">Networks</a-menu-item>
        <a-menu-item key="/host">Host</a-menu-item>
        <a-popover
          v-model="accountPopupVisible"
          trigger="click"
          style="position: absolute; right: 20px"
        >
          <div id="user-popover-wrapper" slot="content">
            <p><strong>ID:</strong> {{ currentUser.id }}</p>
            <p><strong>Name:</strong> {{ currentUser.name }}</p>
            <p><strong>E-Mail:</strong> {{ currentUser.email }}</p>
            <a-button id="logout-btn" type="primary" @click="logout">
              Logout
            </a-button>
          </div>
          <a id="user-popover-link" type="primary">
            <a-icon type="user" />
          </a>
        </a-popover>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <portal-target name="sidebar"></portal-target>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <router-view></router-view>
        <a-layout-footer style="text-align: center">
          cozy ©2020
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
  accountPopupVisible = false;
  currentUser = this.$store.getters.user;
  onMenuItemSelected(e: any) {
    this.$router.push(e.key);
  }

  logout() {
    localStorage.clear();
    this.$router.push("/login");
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
#user-infos {
  float: right;
  margin-right: 50px;
}
#user-popover-wrapper {
  p {
    margin-bottom: 5px;
  }
  #logout-btn {
    margin-top: 10px;
    width: 100%;
  }
}
#user-popover-link {
  i {
    margin: 0;
    font-size: 20px;
  }
}
</style>
