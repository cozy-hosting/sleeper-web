<template>
  <header>
    <div id="logo">
      <a-icon @click="toggleHidden" type="menu" class="nav-icon" />
      Cozy
    </div>
    <div>
      <router-link to="/login" v-if="!loggedIn">Login</router-link>
      <template v-else>
        <a-icon type="user" class="user-icon" />{{ user.name }}
      </template>
    </div>
  </header>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { NavigationModule, UserModule } from "@/store";

@Component
export default class TheHeader extends Vue {
  get loggedIn() {
    return UserModule.loggedIn;
  }

  get user() {
    return UserModule.user;
  }

  toggleHidden() {
    NavigationModule.toggleHidden();
  }
}
</script>

<style lang="scss" scoped>
header {
  grid-area: header;
  box-shadow: 0 0 8px #f0f1f2;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-icon {
  margin-right: 5px;
}

#logo {
  font-weight: 600;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
}

.nav-icon {
  font-size: 16px;
  margin-right: 30px;
  z-index: 1000;
}

@media only screen and (min-width: 1000px) {
  .nav-icon {
    display: none;
  }

  header {
    padding: 20px 80px;
  }
}

@media only screen and (min-width: 1600px) {
  header {
    padding: 20px 160px;
  }
}
</style>
