<template>
  <a-modal
    title="Login"
    okText="Login"
    :visible="true"
    :confirmLoading="submitting"
    @ok="onSubmit"
    @cancel="goBack"
  >
    <a-form-model ref="myForm" :model="form">
      <a-form-model-item
        label="Name"
        prop="name"
        :rules="{
          required: true,
          message: 'Please input a name',
          trigger: 'blur'
        }"
      >
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item
        label="Token"
        prop="token"
        :rules="{
          required: true,
          message: 'Please input a token',
          trigger: 'blur'
        }"
      >
        <a-input-password v-model="form.token" />
      </a-form-model-item>
      <a-form-model-item>
        <a-checkbox v-model="form.rememberMe">
          Remember me
        </a-checkbox>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from "vue-property-decorator";
import { SubmitMixin } from "@/mixins/SubmitMixin";
import { FormModel } from "ant-design-vue";
import { User } from "../../interfaces/userInterfaces";
import { UserModule } from "../../store";

@Component
export default class Login extends Mixins(SubmitMixin) {
  @Ref()
  readonly myForm!: FormModel;

  form: User = {
    name: "",
    token: "",
    rememberMe: false
  };

  onSubmit() {
    this.mixinSubmit(
      this.myForm,
      () => UserModule.login(this.form),
      this.goBack
    );
  }

  goBack() {
    this.$router.push("/");
  }
}
</script>
