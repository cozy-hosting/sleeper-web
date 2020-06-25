<template>
  <div>
    <a-page-header title="Deployment" style="padding: 0 0 20px 0">
      <a-button @click="showCreate()" slot="extra">Create new</a-button>
    </a-page-header>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Deployment extends Vue {}
</script>

<style></style>
