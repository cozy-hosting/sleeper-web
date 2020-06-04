<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const listProps = Vue.extend({
    props: {
    allDeployments:
    {
        type: Array
    },
    edit:
    {
        type: Function
    },
    del:
    {
        type: Function
    }
    }
});

@Component({
    name: "deployments-list-component"
    })
export default class DeploymentsListComponent extends listProps
{

}
</script>