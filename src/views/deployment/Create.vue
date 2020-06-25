<template>
  <div>
    <a-page-header
      title="Create a new deployment"
      @back="goBack"
      style="padding: 0 0 40px 0"
    ></a-page-header>
    <a-steps :current="step" @change="onChange">
      <a-step title="Metadata" />
      <a-step title="Ports Mounts" />
      <a-step title="Environment Labels" />
    </a-steps>
    <a-divider></a-divider>
    <a-form-model :model="form" ref="myForm">
      <!-- Step 1 -->
      <template v-if="step === 0">
        <a-form-model-item
          label="Name"
          prop="name"
          :rules="[
            {
              required: true,
              message: 'Please input a name',
              trigger: 'blur'
            },
            {
              min: 4,
              message: 'Name is too short (minimum is 4 characters)',
              trigger: 'blur'
            }
          ]"
        >
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item
          label="Description"
          prop="description"
          :rules="{
            required: true,
            message: 'Please input a description',
            trigger: 'blur'
          }"
        >
          <a-textarea v-model="form.description" :rows="4" />
        </a-form-model-item>
        <a-form-model-item
          label="Image"
          prop="image"
          :rules="{
            required: true,
            message: 'Please select an image',
            trigger: 'blur'
          }"
        >
          <a-select v-model="form.image">
            <a-select-option
              v-for="image in images"
              :key="image.id"
              :value="image.name"
            >
              {{ image.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </template>

      <!-- Step 2 -->
      <template v-if="step === 1">
        <!-- Ports -->
        <a-form-model-item :colon="false">
          <span slot="label" class="sub-heading">Ports</span>
          <a-form-model-item
            v-for="(port, index) in form.ports"
            :key="index"
            label="Port"
            :prop="`ports[${index}]`"
            :rules="{
              required: true,
              message: 'Please input a port',
              trigger: 'blur'
            }"
          >
            <a-input
              v-model="form.ports[index]"
              placeholder="xxxx : xxxx"
            ></a-input>
            <a-icon
              class="remove-icon"
              type="minus-circle"
              @click="removePort(index)"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="dashed" style="width: 100%" @click="addPort">
              Add port
            </a-button>
          </a-form-model-item>
        </a-form-model-item>
        <!-- Mounts -->
        <a-form-model-item :colon="false">
          <span slot="label" class="sub-heading">Mounts</span>
          <a-form-model-item
            v-for="(mount, index) in form.mounts"
            :key="index"
            label="Mount"
            :prop="`mounts[${index}]`"
            :rules="{
              required: true,
              message: 'Please input a mount',
              trigger: 'blur'
            }"
          >
            <a-input v-model="form.mounts[index]"></a-input>
            <a-icon
              class="remove-icon"
              type="minus-circle"
              @click="removeMount(index)"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="dashed" style="width: 100%" @click="addMount">
              Add Mount
            </a-button>
          </a-form-model-item>
        </a-form-model-item>
      </template>

      <!-- Step 3 -->
      <template v-if="step === 2">
        <!-- Environment variables -->
        <a-form-model-item :colon="false">
          <span slot="label" class="sub-heading">Environment variables</span>
          <a-input-group v-for="(o, index) in form.environment" :key="index">
            <a-row :gutter="10">
              <a-col :span="12">
                <a-form-model-item
                  label="Key"
                  :prop="`environment[${index}].key`"
                  :rules="{
                    required: true,
                    message: 'Please input a key',
                    trigger: 'blur'
                  }"
                >
                  <a-input v-model="o.key"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  label="Value"
                  :prop="`environment[${index}].value`"
                  :rules="{
                    required: true,
                    message: 'Please input a value',
                    trigger: 'blur'
                  }"
                >
                  <a-input v-model="o.value"></a-input>
                  <a-icon
                    style="top: 2px"
                    class="remove-icon"
                    type="minus-circle"
                    @click="removeEnvVar(index)"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-input-group>
          <a-form-model-item>
            <a-button type="dashed" style="width: 100%" @click="addEnvVar">
              Add environment variable
            </a-button>
          </a-form-model-item>
        </a-form-model-item>

        <!-- Labels -->
        <a-form-model-item :colon="false">
          <span slot="label" class="sub-heading">Labels</span>
          <a-input-group v-for="(o, index) in form.labels" :key="index">
            <a-row :gutter="10">
              <a-col :span="12">
                <a-form-model-item
                  label="Key"
                  :prop="`labels[${index}].key`"
                  :rules="{
                    required: true,
                    message: 'Please input a key',
                    trigger: 'blur'
                  }"
                >
                  <a-input v-model="o.key"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item
                  label="Value"
                  :prop="`labels[${index}].value`"
                  :rules="{
                    required: true,
                    message: 'Please input a value',
                    trigger: 'blur'
                  }"
                >
                  <a-input v-model="o.value"></a-input>
                  <a-icon
                    style="top: 2px"
                    class="remove-icon"
                    type="minus-circle"
                    @click="removeLabel(index)"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-input-group>
          <a-form-model-item>
            <a-button type="dashed" style="width: 100%" @click="addLabel">
              Add label
            </a-button>
          </a-form-model-item>
        </a-form-model-item>
      </template>

      <!-- Navigation buttons -->
      <a-form-model-item label=" " :colon="false">
        <a-button
          type="primary"
          @click="onChange(step + 1)"
          style="width: 100%"
          v-if="step === 0"
        >
          Next <a-icon type="arrow-right" />
        </a-button>
        <a-row :gutter="10" v-else>
          <a-col :span="12">
            <a-button @click="step--" style="width: 100%">
              <a-icon type="arrow-left" /> Back
            </a-button>
          </a-col>
          <a-col :span="12">
            <a-button
              type="primary"
              @click="onSubmit"
              style="width: 100%"
              v-if="step === 2"
              :loading="submitting"
            >
              Deploy
            </a-button>
            <a-button
              type="primary"
              @click="onChange(step + 1)"
              style="width: 100%"
              v-else
            >
              Next <a-icon type="arrow-right" />
            </a-button>
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Mixins } from "vue-property-decorator";
import { imageModule, deploymentModule } from "@/store";
import { FormModel } from "ant-design-vue";
import { DeploymentCreateForm } from "@/interfaces/deploymentInterfaces";
import { SubmitMixin } from "@/mixins/SubmitMixin";

@Component
export default class DeploymentCreateComp extends Mixins(SubmitMixin) {
  @Ref()
  myForm!: FormModel;

  form: DeploymentCreateForm = {
    name: "",
    description: "",
    image: "",
    ports: [],
    mounts: [],
    environment: [],
    labels: []
  };
  step = 0;

  get images() {
    return imageModule.images;
  }

  created() {
    imageModule.fetchImages();
  }

  goBack() {
    this.$router.push("/deployment");
  }

  onChange(current: number) {
    this.myForm.validate(valid => {
      if (valid) this.step = current;
    });
  }

  onSubmit() {
    this.mixinSubmit(
      this.myForm,
      () => deploymentModule.createDeployment(this.form),
      this.goBack
    );
  }

  addPort() {
    this.form.ports.push("");
  }
  removePort(index: number) {
    this.form.ports.splice(index, 1);
  }

  addMount() {
    this.form.mounts.push("");
  }
  removeMount(index: number) {
    this.form.mounts.splice(index, 1);
  }

  addEnvVar() {
    this.form.environment.push({ key: "", value: "" });
  }
  removeEnvVar(index: number) {
    this.form.environment.splice(index, 1);
  }

  addLabel() {
    this.form.labels.push({ key: "", value: "" });
  }
  removeLabel(index: number) {
    this.form.labels.splice(index, 1);
  }
}
</script>

<style lang="scss" scoped>
.sub-heading {
  font-weight: 600;
}

.remove-icon {
  top: -2px;
  right: -40px;
  font-size: 24px;
  position: absolute;
  cursor: pointer;

  :hover {
    color: #1890ff;
  }
}
</style>
