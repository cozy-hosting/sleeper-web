<template>
  <a-layout style="position: relative; height: 100%">
    <component v-bind:is="layout()"></component>
  </a-layout>
</template>

<script>
import Component from 'vue-class-component';
import Vue from 'vue';
import ApplicationLayout from './layouts/ApplicationLayout';
import PublicPageLayout from './layouts/PublicPageLayout';

@Component({})
export default class App extends Vue {
  constructor() {
    super();
    Vue.component('application-layout', ApplicationLayout);
    Vue.component('public-page-layout', PublicPageLayout);
  }

  layout() {
    return this.$store.getters.layout;
  }
}
</script>
