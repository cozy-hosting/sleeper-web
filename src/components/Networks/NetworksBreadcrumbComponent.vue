<template>
    <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>Networks</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";


@Component({"name": "networks-breadcrumb-component"})

export default class NetworksBreadcrumbComponent extends Vue
{
}

</script>