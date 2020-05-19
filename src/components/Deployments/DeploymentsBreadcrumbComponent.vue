<template>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>Deployments</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";


@Component({"name": "deployments-breadcrumb-component"})

export default class DeploymentsBreadcrumbComponent extends Vue
{
}

</script>