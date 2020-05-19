import { Component, Vue } from "vue-property-decorator";
import DeploymentService from "@/services/DeploymentService";
import ImageService from "@/services/ImageService";
import ContainerService from "@/services/ContainerService";
import {DeploymentInterface} from "@/interfaces/DeploymentInterface";
import { ContainerInterface } from "@/interfaces/ContainerInterface";

import DeploymentsBreadcrumbComponent from "@/components/Deployments/DeploymentsBreadcrumbComponent.vue";
import DeploymentsAlertComponent from "@/components/Deployments/DeploymentsAlertComponent.vue";
import DeploymentsTimeComponent from "@/components/Deployments/DeploymentsTimeComponent.vue";
import DeploymentsCreateComponent from "@/components/Deployments/DeploymentsCreateComponent.vue";
import DeploymentsDeleteModalComponent from "@/components/Deployments/DeploymentsDeleteModalComponent.vue";
import DeploymentsListComponent from "@/components/Deployments/DeploymentsListComponent.vue";
import DeploymentsEditModalComponent from "@/components/Deployments/DeploymentsEditModalComponent.vue";

enum DeployState {
  NOTHING,
  CREATE,
  PULL,
  CCONTAINER,
  RCONTAINER,
  READY
}

@Component({components: 
{
    DeploymentsBreadcrumbComponent, DeploymentsAlertComponent, DeploymentsCreateComponent, 
    DeploymentsTimeComponent, DeploymentsDeleteModalComponent, DeploymentsListComponent, DeploymentsEditModalComponent
}})
export default class Deployment extends Vue {
  deployService: DeploymentService = new DeploymentService();
  imageService: ImageService = new ImageService();
  currentImages: any[] = [];
  allImages: any[] = [];
  containerService: ContainerService = new ContainerService();
  visible = false;
  editMode = false;
  deleteMode = false;
  deleteContainer = false;
  form: DeploymentInterface = {
    name: "",
    description: "",
    image: "",
    mounts: [""],
    ports: [""],
    environment: [{ k: "", val: "" }],
    labels: [{ k: "", val: "" }],
  };
  alertMessage: string[] = [];
  deployState: DeployState = DeployState.NOTHING;
  allDeployments: any = [];
  skip = 0;
  take = 20;
  toEditJSON = "";

  selectedItem: any;

  constructor() {
    super();
  }

  handelDelClose()
  {
    this.deleteMode = false;
  }

  async mounted() {
    await this.getAllDeployments(0, 20);
  }

  closeEdit()
  {
    this.editMode = false;
  }

  async getAllDeployments(skip: number, take: number) {

    this.allDeployments = (
      await this.deployService.getAll(skip, take)
    ).data.data;
  }

  async showDrawer() {
    this.alertMessage = [];
    this.visible = true;
    this.currentImages = (await this.imageService.getAll(0, 20)).data.data;
    this.allImages = this.currentImages;

    for(let i =0; i<this.allImages.length; i++)
    {
      if(this.allImages[i].name == undefined)
      {
        this.allImages.splice(i, 1);
      }
    }
  }

  onClose() {
    this.visible = false;
  }

  async onSubmit() {
    this.deployState = DeployState.NOTHING;
    this.visible = false;

    this.parseForm();

    if (!this.validate()) return;

    try {
      this.deployState = DeployState.CREATE;
      const deploy = await this.deployService.create(this.form);

      this.deployState = DeployState.PULL;
      await this.imageService.pull(deploy.data.data);

      this.deployState = DeployState.CCONTAINER;
      const dep : ContainerInterface = {deployment: deploy.data.data};
      const cont = await this.containerService.create(dep);

      this.deployState = DeployState.RCONTAINER;
      await this.containerService.start(cont.data.data);
      this.deployState = DeployState.READY;
      this.getAllDeployments(0, this.allDeployments.length + 1);
      this.form = {
        name: "",
        description: "",
        image: "",
        mounts: [""],
        ports: [""],
        environment: [{ k: "", val: "" }],
        labels: [{ k: "", val: "" }]
      };
    } catch (e) {
      this.alertMessage.push(e);
      // this.deployState = DeployState.NOTHING;
    }
  }

  parseForm() {
    for (let i = 0; i < this.form.mounts.length; i++) {
      if (this.form.mounts[i].length === 0) {
        this.form.mounts.splice(i, 1);
        i = 0;
      }
    }
    if (this.form.mounts.length == 1) {
      if (this.form.mounts[0].length === 0) this.form.mounts = [];
    }

    for (let i = 0; i < this.form.ports.length; i++) {
      if (this.form.ports[i].length === 0) {
        this.form.ports.splice(i, 1);
        i = 0;
      }
    }

    if (this.form.ports.length == 1) {
      if (this.form.ports[0].length === 0) this.form.ports = [];
    }

    const realEnv: any = {};
    for (let i = 0; i < this.form.environment.length; i++) {
      const k = this.form.environment[i].k;
      if (k == "" || this.form.environment[i].val == "") {
        this.form.environment.splice(i, 1);
        i = 0;
        continue;
      }

      realEnv[k] = this.form.environment[i].val;
    }
    this.form.environment = realEnv;

    const realLabel: any = {};
    for (let i = 0; i < this.form.labels.length; i++) {
      const k = this.form.labels[i].k;
      if (k == "" || this.form.labels[i].val == "") {
        this.form.labels.splice(i, 1);
        i = 0;
        continue;
      }
      realLabel[k] = this.form.labels[i].val;
    }
    this.form.labels = realLabel;
  }

  validate() {
    this.alertMessage = [];
    if (!this.form.name) {
      this.alertMessage.push("You haven't entered a name for the deployment.");
    }
    if (!this.form.description) {
      this.alertMessage.push(
        "You haven't entered a description for the deployment."
      );
    }
    if (!this.form.image) {
      this.alertMessage.push(
        "You haven't provided an image for the deployment."
      );
    }
  /*  if (this.form.ports.length == 0) {
      this.alertMessage.push(
        "You haven't provided any ports for the deployment."
      );
    }*/
    if (this.alertMessage.length > 0) return false;
    else return true;
  }

  onCloseAlert() {
    this.alertMessage = [];
  }
    
    checkChanged(val: any)
    {
        this.deleteContainer = val;
    }

  select(item: any) {
    this.form.image = item.name;
    this.imgChange();
  }

  imgChange() {
    this.currentImages = [];
    for (let i = 0; i < this.allImages.length; i++) {
      if (this.allImages[i].name.includes(this.form.image)) {
        this.currentImages.push(this.allImages[i]);
      }
    }
  }

  addMount() {
    this.form.mounts.push("");
  }
  addPort() {
    this.form.ports.push("");
  }
  addEnv() {
    this.form.environment.push({ k: "", val: "" });
  }

  addLabel() {
    this.form.labels.push({ k: "", val: "" });
  }

  async del(item: any) {
    this.selectedItem = item;
    this.deleteMode = true;
  }

  async edit(item: any) {
    this.editMode = true;
    this.toEditJSON = JSON.stringify(item, null, 2);
  }

  async handleOk(toEdit: any) {
    const json: any = JSON.parse(toEdit);
    const edit = await this.deployService.update(json.id, json);
    this.editMode = false;
    this.getAllDeployments(this.skip, this.take);
  }

  async handleDelete() {
    if (this.deleteContainer) {
      const all: any[] = (await this.containerService.getAll(0, 50)).data.data;
      const el = all.find((x: any) => x.deployment == this.selectedItem.id);
      await this.containerService.delete(el.id);
    }

    await this.deployService.delete(this.selectedItem.id);
    this.getAllDeployments(this.skip, this.take);

    this.selectedItem = null;
    this.deleteContainer = false;
    this.deleteMode = false;
  }
}