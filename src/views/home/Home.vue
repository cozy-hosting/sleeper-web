<template>
  <div>
    <a-page-header title="Home" style="padding: 0 0 40px 0"> </a-page-header>
    <section v-for="x in arr" :key="x">
      Long content
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }
};
</script>

<style lang="scss" scoped>
section {
  height: 50vh;
}
</style>
