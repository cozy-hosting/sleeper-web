<template>
  <div id="app">
    <the-header></the-header>
    <the-nav></the-nav>
    <the-main-content></the-main-content>
  </div>
</template>

<script>
import TheHeader from "@/components/base/TheHeader";
import TheNav from "@/components/base/TheNav";
import TheMainContent from "@/components/base/TheMainContent";

export default {
  components: {
    TheHeader,
    TheNav,
    TheMainContent
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  display: grid;
  row-gap: 50px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "main";
}

@media only screen and (min-width: 1000px) {
  #app {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "header header"
      "nav main";
  }
}
</style>
