<template>
    <a-modal
      :visible="deleteMode"
      title="Delete your deployment"
      @ok="handleDelete"
      @cancel="handelDelClose()"
    >
      <a-checkbox v-model="deleteContainer"
        >Delete connected Container?</a-checkbox
      >
    </a-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Prop from "vue-property-decorator";

const delProps = Vue.extend({
  props: {
    deleteMode:
    {
        type: Boolean
    },
    handleDelete:
    {
        type: Function
    },
    deleteContainer:
    {
        type: Boolean
    },
    handelDelClose:
    {
      type: Function
    }
  }
})

@Component({
    name: "deployments-deleteModal-component"
    })
export default class DeploymentsDeleteModalComponent extends delProps
{

}
</script>