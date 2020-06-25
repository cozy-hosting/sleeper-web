<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
main {
  grid-area: main;
  padding: 0 40px 40px 40px;
}

@media only screen and (min-width: 1000px) {
  main {
    padding: 0 80px 80px 80px;
  }
}

@media only screen and (min-width: 1600px) {
  main {
    padding: 0 160px 160px 160px;
  }
}
</style>
