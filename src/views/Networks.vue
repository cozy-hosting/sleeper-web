<template>
  <div>
    <portal to="sidebar"></portal>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Networks</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0 }"
    >
      <p>Networks</p>
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Networks extends Vue {}
</script>

<style lang="scss"></style>
