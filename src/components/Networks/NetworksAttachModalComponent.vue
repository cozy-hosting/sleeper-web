<template>
    <a-modal v-model="connectNetworkModal" title="Attach Container to Network" @ok="handleAttach()">
        <label>Select Container</label>
<a-auto-complete style="width: 100%" v-if="connectNetworkModal"
            placeholder="Available Containers"
            v-model="selectedContainer.name"
            :filter-option="filterOption"
            >
    <template slot="dataSource">
    <a-select-option v-for="cont in allContainerDisplay" :key="cont.name" >
            {{ cont.name }}
    </a-select-option>
    </template>
    </a-auto-complete>
    </a-modal>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Prop from "vue-property-decorator";

const attachProps = Vue.extend({
    props: {
    connectNetworkModal:
    {
        type: Boolean
    },
    handleAttach:
    {
        type: Function
    },
    selectedContainer:
    {
        type: Object
    },
    filterOption:
    {
        type: Function
    },
    allContainerDisplay:
    {
        type: Array
    }
    }
})


@Component({"name": "networks-attachModal-component"})

export default class NetworksAttachModalComponent extends attachProps
{

}
</script>