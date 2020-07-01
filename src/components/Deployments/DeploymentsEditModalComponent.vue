<template>
    <a-modal :visible="editMode" v-if="toEditJSONMorph" title="Edit your Deployment" @ok="handleOk(toEditJSONMorph)" @cancel="closeEdit()">
      <a-textarea v-model="toEditJSONMorph" auto-size>
        {{ toEditJSONMorph }}
      </a-textarea>
    </a-modal>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const editProps = Vue.extend({
  props: {
    toEditJSON:
    {
        type: String
    },
    handleOk:
    {
        type: Function
    },
    closeEdit:
    {
        type: Function
    },
    handelDelClose:
    {
      type: Function
    },
    editMode:
    {
        type: Boolean
    }
  }
});

@Component({
    name: "deployments-editModal-component"
    })
export default class DeploymentsEditModalComponent extends editProps
{
    toEditJSONMorph: any = "";
    mounted()
    {
        this.toEditJSONMorph = this.toEditJSON;
    }
}
</script>