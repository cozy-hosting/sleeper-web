<template>
  <div>
    <network-sidenav-component v-bind:info="sideInfo"></network-sidenav-component>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Networks</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0 }"
    >
    <a-alert
      v-if="alertMessage.length > 0"
      message="Error"
      type="error"
      closable
      @close="onCloseAlert"
      ><div slot="description" v-for="alert in alertMessage" :key="alert">
        {{ alert }}
      </div></a-alert
    >
      <a-button type="primary" block v-on:click="showCreateModal()" :loading="creationPending">
      <a-icon type="plus" />Create a new Network
      </a-button>
      <a-divider>Your Networks <a-icon type="branches"/></a-divider>
      <a-row :gutter=24>
      <div v-for="(nets,index) in allNetworks" :key="index" >
        <a-col :span=8 style="margin-bottom: 15px;">
        <a-card style="height: 462px; max-height: 100%">
          <h3 slot="title" style="float: right"><b>{{nets.name}}</b></h3>
          <p style=" word-wrap: break-word; max-width: 100%; height: 80px; max-height: 80px; overflow:auto" >{{nets.description}}<sub><b> @[ {{nets.subnet}} ]</b></sub></p>
          <a-divider>Connected <a-icon type="codepen" /></a-divider>

          <a-list item-layout="horizontal" :data-source="nets.containers" style="max-height: 150px; height: 150px; overflow: auto">
        <a-list-item a-list-item slot="renderItem" slot-scope="item, index" >
           <a-list-item-meta><a slot="title" v-on:click="getContainerInfo(item)">#{{index +1}}</a></a-list-item-meta> 
          <a slot="actions"><a-icon type="disconnect" v-on:click="dcContainer(item, nets.id)"/></a>
        </a-list-item>
        </a-list>

          <template slot="actions">
            <a-button type="primary" v-on:click="connectCont(nets.id)">
            <a-icon type="cluster" />
            </a-button> 
            <a-button type="danger" v-on:click="delNet(nets.id)">
              <a-icon type="delete" />
            </a-button>

          </template>
        </a-card>
        </a-col> 
      </div>
    </a-row>
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
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import NetworkSidenavComponent from "@/components/Networks/NetworksSidenavComponent.vue";

import NetworkService from "@/services/NetworkService";
import ContainerService from "@/services/ContainerService";
import { NetworkCreateInterface } from "@/interfaces/Network/NetworkCreateInterface";
import { NetworkConnectInterface } from "@/interfaces/Network/NetworkConnectInterface";
import { NetworkInterface } from "@/interfaces/Network/NetworkInterface";
import { SubnetInterface } from "@/interfaces/Network/SubnetInterface";
import DeploymentService from '../services/DeploymentService';

interface ContainerDisplayInterface
{
  name: string;
  id: string;
}

@Component({components: {NetworkSidenavComponent}})
export default class Networks extends Vue 
{
  netService: NetworkService = new NetworkService();
  containerService: ContainerService = new ContainerService();
  deployService: DeploymentService = new DeploymentService();

  creationModalVisible = false;
  connectNetworkModal = false;
  creationPending = false;

  alertMessage: string[] = [];
  subnetForm: SubnetInterface = {gate: "", range: ""};
  creationForm: NetworkCreateInterface = { name: "", description: "", subnet: ""};
  allNetworks: NetworkInterface[] = [];

  selectedNetwork: string | undefined;
  allContainer: any | undefined;
  selectedContainer: ContainerDisplayInterface  = {name: "", id:""};
  allContainerDisplay: ContainerDisplayInterface[] = [];

  sideInfo: any | undefined = {};

  showCreateModal()
  {
    if(!this.creationModalVisible)
      this.creationModalVisible = true;
  }

  filterOption(input: any, option: any) {
      return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    }

  async handleAttach()
  {

    try
    {
    this.selectedContainer = this.allContainerDisplay.find((x: any) => x.name == this.selectedContainer.name) as any;
    }
    catch(e)
    {
         this.connectNetworkModal = false;
    this.selectedContainer = {name: "", id:""};
    this.selectedNetwork = undefined;
      this.alertMessage.push("Search for an existing container.");
      return;
    }

    if(!this.allContainerDisplay.includes(this.selectedContainer as ContainerDisplayInterface) || this.selectedContainer == undefined)
    {
      this.alertMessage.push("Search for an existing container.");
         this.connectNetworkModal = false;
    this.selectedContainer = {name: "", id:""};
    this.selectedNetwork = undefined;
      return;
    }

    const container = this.allContainer.find((x: any)=>x.id==(this.selectedContainer as ContainerDisplayInterface).id);
    const conInt : NetworkConnectInterface = { container: container.id};
    try
    {
    await this.netService.connect(this.selectedNetwork as string, conInt);

    await this.getNets();
    }
    catch(e)
    {
      this.alertMessage.push(e);
    }

    this.connectNetworkModal = false;
    this.selectedContainer = {name: "", id:""};
    this.selectedNetwork = undefined;
  }


  async getContainerInfo(id: string)
  {
    const containerInfo = (await this.containerService.getById(id)).data.data;
    const deploymentInfo = (await this.deployService.getById(containerInfo.deployment)).data.data;
    this.sideInfo = {containerInfo, deploymentInfo};
    
  }
  async getNets()
  {
    this.allNetworks = (await this.netService.getAll(0, 20)).data.data;
  }

  async mounted()
  {
    await this.getNets();
  }

  async handleCreateNetwork()
  {
    if(!this.validateForm())
      return;
    this.creationForm.subnet = this.subnetForm.gate+"/"+this.subnetForm.range;
    this.creationModalVisible = false;
    this.creationPending = true;
    await this.create();
  }

  async create()
  {
    try
    {
    await this.netService.create(this.creationForm);
        const notOption: any= {message: "Nice!", description: "Your Network "+this.creationForm.name+" has been created!"};
    this.creationPending = false;
        await this.getNets();
    //this.$notification.open(notOption); TODO:

    }
    catch(e)
    {
      this.alertMessage.push(e);
    }

  }

  validateForm()
  {
    if(this.subnetForm.gate == "")
    {
      this.alertMessage.push("You haven't enterred a gateway.");
    }
    if(this.subnetForm.range == "")
    {
        this.alertMessage.push("You haven't enterred a range.");
    }

    if(this.creationForm.name == "")
    {
      this.alertMessage.push("Give the network a name.");
    }
    if(this.creationForm.description == "")
    {
      this.alertMessage.push("Describe your network.");
    }

    if(this.alertMessage.length > 0)
    {
      return false;
    }
    return true;
  }

  onCloseAlert() {
    this.alertMessage = [];
  }

  async delNet(id: string)
  {
    try
    {
    await this.netService.delete(id);
    const notOption: any= {message: "Success!", description: "Your Network "+this.creationForm.name+" has been deleted!"};
    //this.$notification.open(notOption); TODO:
    await this.getNets();
    }
    catch(e)
    {
      this.alertMessage.push(e);
    }

  }

  async getContainer()
  {
    this.allContainer = (await this.containerService.getAll(0, 100)).data.data;
    this.allContainerDisplay = [];
    for(let i =0; i<this.allContainer.length; i++)
    {
      const deplName = (await this.deployService.getById(this.allContainer[i].deployment)).data.data.name;
      this.allContainerDisplay[i] = { id: this.allContainer[i].id, name: deplName};
    }
  }

  //selContName = "";

  async connectCont(id: string)
  {
    await this.getContainer();
    this.selectedNetwork = id;
    this.connectNetworkModal = true;
  }

  async dcContainer(containerId: string, networkId: string)
  {
    this.creationPending = true;
    try
    {
    await this.netService.disconnect(networkId, { container: containerId});
    await this.getNets();
          this.creationPending = false;
    }
    catch(e)
    {
      this.alertMessage.push(e);
      this.creationPending = false;
    }
  }
}
</script>

<style lang="scss"></style>
