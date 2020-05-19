<template>
           <a-col :span=8 style="margin-bottom: 15px;">
        <a-card style="height: 462px; max-height: 100%">
          <h3 slot="title" style="float: right"><b>{{nets.name}}</b></h3>
          <p style=" word-wrap: break-word; max-width: 100%; height: 80px; max-height: 80px; overflow:auto" >{{nets.description}}<sub><b> @[ {{nets.subnet}} ]</b></sub></p>
          <a-divider>Connected <a-icon type="codepen" /></a-divider>

          <a-list item-layout="horizontal" :data-source="nets.containers" style="max-height: 150px; height: 150px; overflow: auto">
        <a-list-item a-list-item slot="renderItem" slot-scope="item, index" >
           <a-list-item-meta><a slot="title" v-on:click="GetContInfo(item)">#{{index +1}}</a></a-list-item-meta> 
          <a slot="actions"><a-icon type="disconnect" v-on:click="dcContainer(item, nets.id)"/></a>
        </a-list-item>
        </a-list>

          <template slot="actions">
            <a-button type="primary" v-on:click="conCont(nets.id)">
            <a-icon type="cluster" />
            </a-button> 
            <a-button type="danger" v-on:click="dNet(nets.id)">
              <a-icon type="delete" />
            </a-button>

          </template>
        </a-card>
        </a-col> 
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Prop from "vue-property-decorator";

const elemProps = Vue.extend({
  props: {
    nets:
    {
        type: Object
    },
    GetContInfo:
    {
        type: Function
    },
    dcContainer:
    {
        type: Function
    },
    conCont:
    {
        type: Function
    },
    dNet:
    {
        type: Function
    }
  }
})


@Component({"name": "networks-element-component"})

export default class NetworksElementComponent extends elemProps
{

}
</script>