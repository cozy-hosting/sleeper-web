<template>
  <a-modal
    title="Create a new Container"
    okText="Create"
    :visible="true"
    :confirmLoading="submitting"
    @ok="onSubmit"
    @cancel="goBack"
  >
    <a-form-model ref="myForm" :model="form">
      <a-form-model-item
        label="Deployment"
        prop="deployment"
        :rules="{
          required: true,
          message: 'Please select a deployment',
          trigger: 'blur'
        }"
      >
        <a-select v-model="form.deployment">
          <a-select-option
            v-for="deployment in deployments"
            :key="deployment.id"
            :value="deployment.id"
          >
            {{ deployment.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from "vue-property-decorator";
import DeploymentService from "@/services/DeploymentService";
import ContainerService from "@/services/ContainerService";
import { Deployment } from "@/interfaces/DeploymentInterface";
import { SubmitMixin } from "@/mixins/SubmitMixin";
import { FormModel } from "ant-design-vue";

const deploymentService = new DeploymentService();
const containerService = new ContainerService();

@Component
export default class ContainerCreate extends Mixins(SubmitMixin) {
  @Ref()
  readonly myForm!: FormModel;

  form = { deployment: "" };
  deployments: Deployment[] = [];

  async created() {
    const { data } = await deploymentService.getAll(0, 20);
    this.deployments = data.data;
  }

  onSubmit() {
    this.mixinSubmit(
      this.myForm,
      () => containerService.create(this.form),
      this.goBack
    );
  }

  goBack() {
    this.$router.push({ name: "Containers" });
  }
}
</script>

<style></style>
