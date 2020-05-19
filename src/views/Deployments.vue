<template>
  <div class="deployment">

      <portal to="sidebar"></portal>
      <deployments-breadcrumb-component></deployments-breadcrumb-component>
      <deployments-alert-component v-bind:alertMessage="alertMessage"></deployments-alert-component>


    <a-card class="depContainer" title="All Deployments">
      <deployments-list-component v-bind:allDeployments="allDeployments" v-bind:edit="edit" v-bind:del="del"></deployments-list-component>
    </a-card>

    <a-button type="primary" @click="showDrawer" style="margin-top: 15px">
      <a-icon type="plus" /> Deploy
    </a-button>

    <deployments-create-component v-bind:onSubmit="onSubmit" v-bind:onClose="onClose" v-bind:addLabel="addLabel" v-bind:addEnv="addEnv"
              v-bind:addPort="addPort" v-bind:addMount="addMount" v-bind:imgChange="imgChange" v-bind:select="select" v-bind:currentImages="currentImages"
              v-bind:form="form" v-bind:onCl="onClose" v-bind:visible="visible">
    </deployments-create-component>
    
    <deployments-time-component v-bind:deployState="deployState"></deployments-time-component>

    <deployments-editModal-component v-if="toEditJSON" v-bind:toEditJSON="toEditJSON" v-bind:editMode="editMode" v-bind:closeEdit="closeEdit" v-bind:handleOk="handleOk">
    </deployments-editModal-component>

    <deployments-deleteModal-component v-bind:deleteMode="deleteMode" v-bind:handelDelClose="handelDelClose" v-bind:deleteContainer="deleteContainer" v-bind:handleDelete="handleDelete">
    </deployments-deleteModal-component>
    
  </div>
</template>

<script src="@/components/Deployments/ts/Deployments.ts" lang="ts">

</script>

<style>
.depContainer {
  margin: 0 auto;
  width: 95%;
}
</style>
