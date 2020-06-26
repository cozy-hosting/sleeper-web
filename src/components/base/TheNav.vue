<template>
  <nav>
    <template v-if="window.width > 1000">
      <a-menu
        class="menu"
        mode="inline"
        :inlineIndent="menuIndent"
        v-model="selectedKeys"
        @click="handleClick"
      >
        <a-menu-item key="/">Home</a-menu-item>
        <template v-if="loggedIn">
          <a-menu-item key="/deployment">Deployments</a-menu-item>
          <a-menu-item key="/image">Images</a-menu-item>
          <a-menu-item key="/container">Container</a-menu-item>
          <a-menu-item key="/network">Network</a-menu-item>
        </template>
      </a-menu>
    </template>
    <template v-else>
      <transition name="fade">
        <div class="background" v-if="!hidden" @click="toggleHidden"></div>
      </transition>
      <transition name="slide">
        <a-menu
          v-if="!hidden"
          class="menu"
          mode="inline"
          :inlineIndent="menuIndent"
          v-model="selectedKeys"
          @select="toggleHidden"
          @click="handleClick"
        >
          <a-menu-item key="/">Home</a-menu-item>
          <template v-if="loggedIn">
            <a-menu-item key="/deployment">Deployments</a-menu-item>
            <a-menu-item key="/image">Images</a-menu-item>
            <a-menu-item key="/container">Container</a-menu-item>
            <a-menu-item key="/network">Network</a-menu-item>
          </template>
        </a-menu>
      </transition>
    </template>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NavigationModule, UserModule } from "@/store";

interface MenuClick {
  item: object;
  key: string;
  keyPath: string[];
}

@Component({})
export default class TheNav extends Vue {
  window = { width: window.innerWidth };
  selectedKeys: string[] = ["/"];

  // Computed
  get hidden() {
    return NavigationModule.hidden;
  }

  get loggedIn() {
    return UserModule.loggedIn;
  }

  get menuIndent() {
    if (this.window.width > 1600) return 160;
    if (this.window.width > 1000) return 80;
    return 40;
  }

  get subMenuIndent() {
    return this.menuIndent + 40;
  }

  // Life cicle
  created() {
    window.addEventListener("resize", this.handleResize);
  }

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }

  // Methods
  handleResize() {
    this.window.width = window.innerWidth;
  }

  handleClick({ key }: MenuClick) {
    this.$router.push(key).catch(() => {
      return; // Ignore
    });
  }

  toggleHidden() {
    NavigationModule.toggleHidden();
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 500;
}

.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  z-index: 600;
  padding-top: 30px;
  border-color: #ffffff;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15) !important;
}

.fade-enter-active {
  animation: fade-in 0.3s;
}
.fade-leave-active {
  animation: fade-in 0.3s reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.slide-enter-active {
  animation: slide-in 0.3s;
}
.slide-leave-active {
  animation: slide-in 0.3s reverse;
}
@keyframes slide-in {
  0% {
    width: 0;
    overflow-x: hidden;
  }
  100% {
    width: 300px;
  }
}

@media only screen and (min-width: 1000px) {
  nav {
    grid-area: nav;
    width: 300px;
    border-right: 1.11px solid #e8e8e8;
  }

  .menu {
    width: unset;
    overflow-x: unset;
    box-shadow: unset !important;
    position: sticky;
    top: 30px;
    padding-top: 0;
    border: none;

    & > li:first-child {
      margin-top: 0;
    }
  }
}

@media only screen and (min-width: 1600px) {
  nav {
    width: 400px;
  }
}
</style>
