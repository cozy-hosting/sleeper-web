<template>
  <div class="deployment">
        <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Deployments</a-breadcrumb-item>
    </a-breadcrumb>
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

    <a-card class="depContainer" title="All Deployments">
      <a-row :gutter="6">
        <a-col :span="2">
          <label><b>#</b> to Skip:</label>
          <a-input-number
            placeholder="Skip"
            v-on:change="getAllDeployments(skip, take)"
            v-model="skip"
          ></a-input-number>
        </a-col>
        <a-col :span="2">
          <label><b>#</b> to Take:</label>
          <a-input-number
            placeholder="Take"
            value="20"
            v-on:change="getAllDeployments(skip, take)"
            v-model="take"
          ></a-input-number>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-divider></a-divider>
          <a-list
            v-if="allDeployments.length > 0"
            size="small"
            item-layout="horizontal"
            :data-source="allDeployments"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-avatar>{{ index }}</a-avatar>
              <a slot="actions" v-on:click="edit(item)">edit</a>
              <a slot="actions" v-on:click="del(item)">delete</a>
              <a-list-item-meta
                ><div slot="description">
                  {{ item.description }}
                </div></a-list-item-meta
              >
              <div>{{ item.name }} on Port {{ item.ports[0] }}</div>
            </a-list-item>
            <a-divider></a-divider>
          </a-list>
        </a-col>
      </a-row>
    </a-card>

    <a-button type="primary" @click="showDrawer" style="margin-top: 15px">
      <a-icon type="plus" /> Deploy
    </a-button>
    <a-drawer
      title="Create a new Deployment"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form-model :model="form" layout="vertical" hide-required-mark>
        <a-form-model-item label="Deployment name">
          <a-input
            v-model="form.name"
            placeholder="Name for your new Deployment"
          />
        </a-form-model-item>

        <a-form-model-item label="Description">
          <a-textarea
            v-model="form.description"
            placeholder="Describe your new Deployment"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-model-item>
        <a-divider>Image</a-divider>

        <a-form-model-item>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-list
                size="small"
                item-layout="horizontal"
                :data-source="currentImages"
              >
                <a-list-item
                  slot="renderItem"
                  slot-scope="item, index"
                  v-if="index < 3"
                >
                  <a-button v-on:click="select(item)">{{ item.name }}</a-button>
                </a-list-item>
              </a-list>
            </a-col>

            <a-col :span="12" style="margin-top: 35px">
              <label for="imgLabel">Your Image</label>
              <a-input
                name="imgLabel"
                placeholder="Search your Image or paste Image URL"
                v-on:change="imgChange()"
                v-model="form.image"
              ></a-input>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item>
          <a-divider>Mounts</a-divider>
          <a-list
            size="small"
            item-layout="horizontal"
            :data-source="form.mounts"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-input
                v-model="form.mounts[index]"
                placeholder="Enter your data mounts"
              >
              </a-input>
            </a-list-item>
          </a-list>
          <a-button type="primary" @click="addMount">
            <a-icon type="plus" /> Add
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-divider>Ports</a-divider>
          <a-list
            size="small"
            item-layout="horizontal"
            :data-source="form.ports"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-input
                v-model="form.ports[index]"
                placeholder="Pass your port (PORT-TO:PORT-FROM)"
              >
              </a-input>
            </a-list-item>
          </a-list>
          <a-button type="primary" @click="addPort">
            <a-icon type="plus" /> Add
          </a-button>
        </a-form-model-item>

        <a-form-model-item>
          <a-divider>Environment</a-divider>
          <a-list
            size="small"
            item-layout="horizontal"
            :data-source="form.environment"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-input
                type="text"
                v-model="form.environment[index].k"
                style="margin-right: 10px"
                placeholder="Key"
              >
              </a-input>
              <a-input
                type="text"
                v-model="form.environment[index].val"
                style="margin-left: 10px"
                placeholder="Value"
              >
              </a-input>
            </a-list-item>
          </a-list>
          <a-button
            type="primary"
            @click="addEnv"
          >
            <a-icon type="plus" /> Add
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-divider>Labels</a-divider>
          <a-list
            size="small"
            item-layout="horizontal"
            :data-source="form.labels"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-input
                type="text"
                v-model="form.labels[index].k"
                style="margin-right: 10px"
                placeholder="Key"
              >
              </a-input>
              <a-input
                type="text"
                v-model="form.labels[index].val"
                style="margin-left: 10px"
                placeholder="Value"
              >
              </a-input>
            </a-list-item>
          </a-list>
          <a-button
            type="primary"
            @click="addLabel"
          >
            <a-icon type="plus" /> Add
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" @click="onSubmit">
          Submit
        </a-button>
      </div>
    </a-drawer>

    <a-timeline
      mode="right"
      style="margin-right: 50%; margin-top: 25px"
      v-if="deployState != 0"
    >
      <a-timeline-item>
        <a-icon
          slot="dot"
          type="clock-circle-o"
          style="font-size: 16px;"
          v-if="deployState == 1"
        />
        Create your Deployment</a-timeline-item
      >
      <a-timeline-item>
        <a-icon
          slot="dot"
          type="clock-circle-o"
          style="font-size: 16px;"
          v-if="deployState == 2"
        />
        Pull your image from the repository</a-timeline-item
      >
      <a-timeline-item>
        <a-icon
          slot="dot"
          type="clock-circle-o"
          style="font-size: 16px;"
          v-if="deployState == 3"
        />
        Create your container
      </a-timeline-item>
      <a-timeline-item>
        <a-icon
          slot="dot"
          type="clock-circle-o"
          style="font-size: 16px;"
          v-if="deployState == 4"
        />
        Start your Container</a-timeline-item
      >
      <a-timeline-item>
        <a-icon
          slot="dot"
          type="check-circle-o"
          style="font-size: 16px;"
          v-if="deployState == 5"
        />
        Finished!</a-timeline-item
      >
    </a-timeline>

    <a-modal v-model="editMode" title="Edit your Deployment" @ok="handleOk">
      <a-textarea v-model="toEditJSON" auto-size>
        {{ toEditJSON }}
      </a-textarea>
    </a-modal>

    <a-modal
      v-model="deleteMode"
      title="Delete your deployment"
      @ok="handleDelete"
    >
      <a-checkbox v-model="deleteContainer"
        >Delete connected Container?</a-checkbox
      >
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DeploymentService from "@/services/DeploymentService";
import ImageService from "@/services/ImageService";
import ContainerService from "@/services/ContainerService";
import {DeploymentInterface} from "@/interfaces/DeploymentInterface";
import { ContainerInterface } from "@/interfaces/ContainerInterface";

enum DeployState {
  NOTHING,
  CREATE,
  PULL,
  CCONTAINER,
  RCONTAINER,
  READY
}

@Component
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

  async mounted() {
    await this.getAllDeployments(0, 20);
  }

  async getAllDeployments(skip: number, take: number) {
    this.allDeployments = (
      await this.deployService.getAll(skip, take)
    ).data.data;
  }

  async showDrawer() {
    this.visible = true;
    this.currentImages = (await this.imageService.getAll(0, 20)).data.data;
    this.allImages = this.currentImages;
  }

  onClose() {
    this.visible = false;
  }
  bFunc() {
  return 0;
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
      const pull = await this.imageService.pull(deploy.data.data);

      this.deployState = DeployState.CCONTAINER;
      const dep : ContainerInterface = {deployment: deploy.data.data};
      const cont = await this.containerService.create(dep);

      this.deployState = DeployState.RCONTAINER;
      const contStart = await this.containerService.start(cont.data.data);
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
    if (this.form.ports.length == 0) {
      this.alertMessage.push(
        "You haven't provided any ports for the deployment."
      );
    }
    if (this.alertMessage.length > 0) return false;
    else return true;
  }

  onCloseAlert() {
    this.alertMessage = [];
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

  async handleOk() {
    const json: any = JSON.parse(this.toEditJSON);
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
</script>

<style>
.depContainer {
  margin: 0 auto;
  width: 95%;
}
</style>
