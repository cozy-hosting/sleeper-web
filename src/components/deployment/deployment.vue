<template>
    <div class="deployment">
        <p>{{msg}}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DeployService from "../../services/deploy.service";

@Component
export default class Deployment extends Vue {

    deployService : DeployService = new DeployService();
    msg: string = this.deployService.callHello();
    
    callHello()
    {
        this.msg = this.deployService.callHello();
    }
}

</script>