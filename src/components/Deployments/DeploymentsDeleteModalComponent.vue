<template>
    <a-modal
      :visible="deleteMode"
      title="Delete your deployment"
      @ok="handleDelete"
      @cancel="handelDelClose()"
    >
      <a-checkbox v-model="deleteContainer" @change="checkChanged(deleteContainer)"
        >Delete connected Container?</a-checkbox
      >
    </a-modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

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
    handelDelClose:
    {
      type: Function
    },
    checkChanged:
    {
      type: Function
    }
  }
});

@Component({
    name: "deployments-deleteModal-component"
    })
export default class DeploymentsDeleteModalComponent extends delProps
{
    deleteContainer = false;
}
</script>