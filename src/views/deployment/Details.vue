<template>
  <div>
    <a-page-header
      :title="`Details for deployment ${deployment.name}`"
      @back="$router.back()"
      style="padding: 0 0 40px 0"
    ></a-page-header>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Deployment } from "@/interfaces/deploymentInterfaces";

@Component
export default class Details extends Vue {
  @Prop({ required: true }) deployment!: Deployment;
}
</script>
