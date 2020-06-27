<template>
  <div>
    <a-page-header title="Deployment" style="padding: 0 0 20px 0">
      <a-button @click="showCreate()" slot="extra">Create new</a-button>
    </a-page-header>
    <a-table
      :data-source="deployments"
      :row-key="record => record.id"
      :columns="columns"
      :bordered="true"
    >
      <span
        slot="name"
        slot-scope="text, record"
        :class="{ delete: record.isDelete }"
      >
        {{ text }}
      </span>
      <span
        slot="ports"
        slot-scope="text, record"
        :class="{ delete: record.isDelete }"
      >
        {{ text | fromPort }}
        <a-icon type="arrow-right" v-if="text" />
        {{ text | toPort }}
      </span>
      <template slot="actions" slot-scope="_, record">
        <template v-if="record.isDelete">
          <a @click="handleDelete(record)">Confirm</a>
          <a-divider type="vertical" />
          <a @click="cancelDelete(record)">Cancel</a>
        </template>
        <template v-else>
          <a @click="showEdit(record)" :disabled="isDelete">Edit</a>
          <a-divider type="vertical" />
          <a @click="showDetails(record)" :disabled="isDelete">Details</a>
          <a-divider type="vertical" />
          <a @click="showDelete(record)" :disabled="isDelete">Delete</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DeploymentModule } from "@/store";
import { Deployment } from "@/interfaces/deploymentInterfaces";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "40%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Ports",
    dataIndex: "ports[0]",
    width: "30%",
    scopedSlots: { customRender: "ports" }
  },
  {
    title: "Actions",
    width: "30%",
    scopedSlots: { customRender: "actions" }
  }
];

@Component({
  filters: {
    fromPort: (port?: string) => port?.split(":")[0],
    toPort: (port?: string) => port?.split(":")[1]
  }
})
export default class DeploymentMain extends Vue {
  columns = columns;
  isDelete = false;

  get deployments() {
    return DeploymentModule.deployments;
  }

  created() {
    DeploymentModule.fetchDeployments();
  }

  showDelete(record: Deployment) {
    Vue.set(record, "isDelete", true);
    this.isDelete = true;
  }

  cancelDelete(record: Deployment) {
    Vue.delete(record, "isDelete");
    this.isDelete = false;
  }

  async handleDelete(record: Deployment) {
    await DeploymentModule.deleteDeployment(record.id);
    this.isDelete = false;
  }

  showCreate() {
    this.$router.push("/deployment/create");
  }

  showDetails(record: Deployment) {
    this.$router.push(`/deployment/detail/${record.id}`);
  }
}
</script>

<style lang="scss" scoped>
.delete {
  color: #ff4d4f;
}
</style>
