<template>
  <a-card id="auth-form-card">
    <a-form-model
      id="auth-form"
      :form="form"
      :rules="rules"
      class="login-form"
      @submit="handleSubmit"
    >
      <div>
        <a-alert
          ref="errorBanner"
          v-if="errorMessage.length > 0"
          :message="errorMessage"
          type="error"
          banner
        />
      </div>
      <a-form-model-item>
        <a-input
          v-model="form.authToken"
          placeholder="Auth Token"
          prop="authToken"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-checkbox v-model="form.rememberMe" placeholder="Auth Token">
          Remember me
        </a-checkbox>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AuthenticationService from "@/services/AuthenticationService";

@Component({})
export default class Authentication extends Vue {
  form: any = {
    authToken: "",
    rememberMe: false
  };
  rules: any = {
    authToken: [
      { required: true, message: "Please provide a token", trigger: "change" }
    ]
  };
  errorMessage = "";
  authenticationService = new AuthenticationService();
  handleSubmit(e: Event) {
    e.preventDefault();
    this.authenticationService.setToken(this.form.authToken);
    this.authenticationService
      .getNewToken()
      .then(response => {
        this.authenticationService.setToken(response.data.data);
        this.$router.push("home");
      })
      .catch(error => {
        if (error.response.status == 404) {
          this.errorMessage = "The Backend is not reachable";
        }
        if (error.response.status == 401) {
          this.errorMessage = "The token is not valid";
        }
        if (error.response.status == 500) {
          this.errorMessage = "Backend failure";
        }
      });
  }
}
</script>

<style lang="scss">
#auth-form-card {
  width: 700px;
  margin: auto;
  padding: 30px;
}
#auth-form .login-form {
  max-width: 300px;
}

#auth-form .login-form-button {
  width: 100%;
}
</style>
