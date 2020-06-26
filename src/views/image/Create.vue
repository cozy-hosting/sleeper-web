<template>
  <a-modal
    title="Create a new image"
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
import { SubmitMixin } from "@/mixins/SubmitMixin";
import { FormModel } from "ant-design-vue";
import { DeploymentModule } from "@/store";
import { ImageModule } from "@/store";
import { ImageCreate } from "@/interfaces/imageInterfaces";

@Component
export default class Create extends Mixins(SubmitMixin) {
  @Ref()
  readonly myForm!: FormModel;
  form: ImageCreate = { deployment: "" };

  get deployments() {
    return DeploymentModule.deployments;
  }

  async created() {
    await DeploymentModule.fetchDeployments();
  }

  onSubmit() {
    this.mixinSubmit(
      this.myForm,
      () => ImageModule.createImage(this.form),
      this.goBack
    );
  }

  goBack() {
    this.$router.push("/image");
  }
}
</script>
