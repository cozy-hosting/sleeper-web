<template>
    <a-modal v-model="creationModalVisible" title="Network Creation" @ok="handleCreateNetwork()">
        <label>Network Name</label>
        <a-input placeholder="Name of the Network" v-model="creationForm.name"/>
        <a-divider></a-divider>
        <label>Network Description</label>
        <a-textarea
            placeholder="Description of the Network"
            :auto-size="{ minRows: 3, maxRows: 5 }" v-model="creationForm.description"
        />
        <a-divider></a-divider>
                <label>Networks Subnet</label>
        <a-row>

        <a-col :span=14>
                <a-input placeholder="Gateway" v-model="subnetForm.gate"/>
        </a-col >         
        <a-col :span=5 style="float: right">
            <a-input-number placeholder="Range" v-model="subnetForm.range"></a-input-number>
        </a-col>
                </a-row>
    </a-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Prop from "vue-property-decorator";

const createProps = Vue.extend({
  props: {
    creationModalVisible:
    {
        type: Boolean
    },
    handleCreateNetwork:
    {
        type: Function
    },
    creationForm:
    {
        type: Object
    },
    subnetForm:
    {
        type: Object
    }
  }
})


@Component({"name": "networks-createModal-component"})

export default class NetworksCreateModalComponent extends createProps
{

}
</script>