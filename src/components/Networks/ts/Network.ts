import Vue from "vue";
import Component from "vue-class-component";

import NetworksSidenavComponent from "@/components/Networks/NetworksSidenavComponent.vue";
import NetworksBreadcrumbComponent from "@/components/Networks/NetworksBreadcrumbComponent.vue";
import NetworksAlertComponent from "@/components/Networks/NetworksAlertCompoent.vue";
import NetworksElementComponent from "@/components/Networks/NetworksElementComponent.vue";
import NetworksCreateModalComponent from "@/components/Networks/NetworksCreateModalComponent.vue";
import NetworksAttachModalComponent from "@/components/Networks/NetworksAttachModalComponent.vue";

import NetworkService from "@/services/NetworkService";
import ContainerService from "@/services/ContainerService";
import { NetworkCreateInterface } from "@/interfaces/Network/NetworkCreateInterface";
import { NetworkConnectInterface } from "@/interfaces/Network/NetworkConnectInterface";
import { NetworkInterface } from "@/interfaces/Network/NetworkInterface";
import { SubnetInterface } from "@/interfaces/Network/SubnetInterface";
import DeploymentService from "@/services/DeploymentService";

interface ContainerDisplayInterface
{
    name: string;
    id: string;
}

@Component({components: 
{
    NetworksSidenavComponent, NetworksBreadcrumbComponent, NetworksAlertComponent, NetworksElementComponent,
    NetworksCreateModalComponent, NetworksAttachModalComponent
}})
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
    this.alertMessage = [];
    if(!this.creationModalVisible)
        this.creationModalVisible = true;
    }

    filterOption(input: any, option: any) {
        return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        );
    }

    closeConnect()
    {
        this.connectNetworkModal = false;
    }

    closeCreate()
    {
        this.creationModalVisible = false;
    }

    onCloseAlert() {
        this.alertMessage = [];
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
        //const notOption: any= {message: "Nice!", description: "Your Network "+this.creationForm.name+" has been created!"};
    this.creationPending = false;
        await this.getNets();
    //this.$notification.open(notOption); TODO:

    }
    catch(e)
    {
        this.alertMessage.push(e);
        this.creationPending = false;
        this.creationModalVisible = false;
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



    async delNet(id: string)
    {
    try
    {
    await this.netService.delete(id);
    // const notOption: any= {message: "Success!", description: "Your Network "+this.creationForm.name+" has been deleted!"};
    // this.$notification.open(notOption); TODO:
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