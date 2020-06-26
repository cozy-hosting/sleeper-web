<template>
  <a-card
    :title="container.image"
    class="card"
    :class="{ 'card-delete': isDelete }"
  >
    <span slot="customRender" slot-scope="item">
      {{ item.key }}
    </span>
    <a-tag slot="extra" :color="states[`${container.state}`]">
      <a-badge status="processing" v-if="isRunning && !stoping" />
      <template v-if="starting">
        <a-spin>
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 12px"
            spin
          />
        </a-spin>
        starting
      </template>
      <template v-else-if="stoping">
        <a-spin>
          <a-icon
            slot="indicator"
            type="loading"
            style="font-size: 12px"
            spin
          />
        </a-spin>
        stoping
      </template>
      <template v-else>{{ container.state }}</template>
    </a-tag>
    <a-descriptions layout="vertical" :column="1">
      <a-descriptions-item label="Deployment">
        <a>{{ container.deployment }}</a>
      </a-descriptions-item>
      <a-descriptions-item label="Ports" v-if="isEmpty(container.ports)">
        {{ container.ports | joinComma | joinPort }}
      </a-descriptions-item>
      <a-descriptions-item
        label="Addresses"
        v-if="isEmpty(container.addresses)"
      >
        {{ container.addresses | joinComma }}
      </a-descriptions-item>
      <a-descriptions-item label="Labels" v-if="isEmpty(container.labels)">
        <div
          style="width: 100%"
          v-for="[key, value] in Object.entries(container.labels)"
          :key="key"
        >
          {{ key }}: {{ value }}
        </div>
      </a-descriptions-item>
    </a-descriptions>
    <template slot="actions">
      <template v-if="isDelete">
        <a @click="confirmDelete" :disabled="deleting">Confirm</a>
        <a @click="isDelete = false" :disabled="deleting">Cancel</a>
      </template>
      <template v-else>
        <a @click="onStop" :disabled="stoping" v-if="isRunning">Stop</a>
        <a @click="onStart" :disabled="starting" v-else>Start</a>
        <a @click="onDelete">Delete</a>
      </template>
    </template>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Container } from "@/interfaces/containerInterfaces";
import { ContainerModule } from "@/store";

@Component({
  filters: {
    joinComma: (x: string[]) => x.join(", "),
    joinPort: (x: string) => x.replace(":", " --> ")
  }
})
export default class ContainerCard extends Vue {
  @Prop({ required: true }) readonly container!: Container;

  starting = false;
  stoping = false;
  isDelete = false;
  deleting = false;
  states = {
    running: "green",
    created: "blue",
    exited: "red"
  };

  get isRunning() {
    return this.container.state === "running";
  }

  async onStart() {
    this.starting = true;
    await ContainerModule.startContainer(this.container.id);
    this.starting = false;
  }

  async onStop() {
    this.stoping = true;
    await ContainerModule.stopContainer(this.container.id);
    this.stoping = false;
  }

  onDelete() {
    this.isDelete = true;
  }

  async confirmDelete() {
    this.deleting = true;
    await ContainerModule.deleteContainer(this.container.id);
    this.isDelete = false;
    this.deleting = false;
  }

  isEmpty(x: Record<string, any> | any[]) {
    return Array.isArray(x) ? x.length : Object.keys(x).length;
  }
}
</script>

<style lang="scss" scoped>
.card {
  align-self: start;
}

.card-delete {
  border: 1px solid #ff4d4f;
}
</style>
