<template>
    <a-layout style="position: relative; height: 100%">
        <a-layout-header class="header">
            <router-link to="/"><div class="logo">Cozy</div></router-link>
            <a-menu theme="dark" mode="horizontal" @select="onMenuItemSelected"
                    :selectedKeys="selectedKeys"
                    :style="{ lineHeight: '64px' }">
                <a-menu-item key="/deployments">Deployments</a-menu-item>
                <a-menu-item key="/containers">Containers</a-menu-item>
                <a-menu-item key="/images">Images</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu mode="inline" :selectedKeys="selectedKeys" :style="{ height: '100%', borderRight: 0 }"
                        @select="onMenuItemSelected">
                    <a-menu-item key="/deployments">Deployments</a-menu-item>
                    <a-menu-item key="/containers">Containers</a-menu-item>
                    <a-menu-item key="/images">Images</a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding: 0 24px 24px">
                <router-view></router-view>
            </a-layout>
        </a-layout>
        <a-layout-footer style="text-align: center">
            Cozy ©2020
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";

    @Component({})
    export default class App extends Vue {

        private currentPage: string[] = [];

        onMenuItemSelected(e: any) {
            this.$router.push(e.key);
        }

        get selectedKeys() {
            return [this.$route.path];
        }
    };
</script>

<style lang="scss">
    .logo {
        width: 120px;
        font-size: 36px;
        color: white;
        float: left;
        line-height: 1.55;
    }
</style>
