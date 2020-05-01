<template>
    <div>
        <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0 }">
            <p>Home</p>
        </a-layout-content>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({})
    export default class Home extends Vue {

    }
</script>

<style lang="scss">

</style>
