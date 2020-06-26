<template>
  <a-card :title="container.image">
    <a-tag slot="extra" :color="states[`${container.state}`]">
      {{ container.state }}
    </a-tag>
    <a-descriptions title="User Info">
      <a-descriptions-item label="Hallo">
        Zhou Maomao
      </a-descriptions-item>
    </a-descriptions>
    <template slot="actions">
      <a>Start</a>
      <a>Stop</a>
    </template>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Container } from "@/interfaces/containerInterfaces";

@Component
export default class ContainerCard extends Vue {
  @Prop({ required: true }) readonly container!: Container;

  loading = false;
  states = {
    running: "green",
    created: "blue",
    exited: "red"
  };
}
</script>
