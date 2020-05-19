<template>
<a-drawer
      title="Create a new Deployment"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onCl"
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
        <a-button :style="{ marginRight: '8px' }" @click="onCl">
          Cancel
        </a-button>
        <a-button type="primary" @click="onSubmit">
          Submit
        </a-button>
      </div>
    </a-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Prop from "vue-property-decorator";

const alertProps = Vue.extend({
   props: {
    visible:
    {
        type: Boolean
    },
    onCl:
    {
        type: Function
    },
    form:
    {
        type: Object
    },
    currentImages:
    {
        type: Array
    },
    select:
    {
        type: Function
    },
    imgChange:
    {
        type: Function
    },
    addMount:
    {
        type: Function
    },
    addPort:
    {
        type: Function
    },
    addEnv:
    {
        type: Function
    },
    addLabel:
    {
        type: Function
    },
    onSubmit:
    {
        type: Function
    }
  }
})


@Component({
    name: "deployments-create-component"
    })
export default class DeploymentsCreateComponent extends alertProps
{

}

</script>