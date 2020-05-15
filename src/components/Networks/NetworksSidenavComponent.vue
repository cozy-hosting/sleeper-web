<template>
    <portal to="sidebar">
        <div v-if="info != {}" style="max-width: 100%; word-wrap: break-word; padding: 10px">
            <div v-if="info.deploymentInfo">
            <a-divider>Deployment Info</a-divider>
            <div class="title">Name: </div> <p>{{info.deploymentInfo.name}}    </p>        
            <div class="title">Description: </div> <p>{{info.deploymentInfo.description}}</p>
            <div class="title">Ports:</div>
            <div v-for="(port,index) in info.deploymentInfo.ports" :key="index">{{port}}</div>
            </div>

            <div v-if="info.containerInfo">
            <a-divider>Container Info</a-divider>
            <p style="font-size: 75%">{{info.containerInfo.id}}</p>
            <div class="title" type="primary">State: </div><p>{{info.containerInfo.state}}</p>
            <div class="title">Image: </div><p>{{info.containerInfo.image}}</p>
            <div class="title">Addresses:</div>
            <div v-for="(adr,index) in info.containerInfo.addresses" :key="index">{{adr}}</div>
            <a-divider>Image Info</a-divider>
            <div class="title">Maintainer: </div><p>{{info.containerInfo.labels.maintainer}}</p>
            </div>
        </div>
    </portal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Prop from "vue-property-decorator";

const navbarProps = Vue.extend({
  props: {
    info:
    {
        type: Object
    }
  }
})


@Component({"name": "network-sidenav-component"})

export default class NetworkSideNavComponent extends navbarProps
{
}
</script>

<style lang="scss">
    .title
    {
        font-weight: bolder;
    }
</style>
