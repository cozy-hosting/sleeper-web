<template>
    <a-alert
        v-if="alertMessage.length > 0"
        message="Error"
        type="error"
        closable
        ><div slot="description" v-for="alert in alertMessage" :key="alert">
        {{ alert }}
        </div></a-alert
    >
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import Prop from "vue-property-decorator";

const alertProps = Vue.extend({
  props: {
    alertMessage:
    {
        type: Array
    }
  }
})


@Component({"name": "deployments-alert-component"})

export default class DeploymentsAlertComponent extends alertProps
{

}

</script>