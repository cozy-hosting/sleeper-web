<template>
  <div>
    <networks-sidenav-component v-bind:info="sideInfo"></networks-sidenav-component>
    <networks-breadcrumb-component></networks-breadcrumb-component>

    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0 }"
    >

    <networks-alert-component @close="onCloseAlert" v-bind:alertMessage="alertMessage"></networks-alert-component>

      <a-button type="primary" block v-on:click="showCreateModal()" :loading="creationPending">
      <a-icon type="plus" />Create a new Network
      </a-button>
      <a-divider>Your Networks <a-icon type="branches"/></a-divider>
      <a-row :gutter=24>
      <div v-for="(nets,index) in allNetworks" :key="index" >
        <networks-element-component v-bind:dNet="delNet" v-bind:conCont="connectCont" v-bind:dcContainer="dcContainer" v-bind:GetContInfo="getContainerInfo" v-bind:nets="nets"></networks-element-component>
      </div>
    </a-row>

    <networks-createModal-component v-bind:creationModalVisible="creationModalVisible" v-bind:handleCreateNetwork="handleCreateNetwork"
                                    v-bind:creationForm="creationForm" v-bind:subnetForm="subnetForm" v-bind:closeCreate="closeCreate">     
    </networks-createModal-component>

    <networks-attachModal-component v-bind:allContainerDisplay="allContainerDisplay" v-bind:filterOptions="filterOption" v-bind:selectedContainer="selectedContainer"
                                    v-bind:handleAttach="handleAttach" v-bind:connectNetworkModal="connectNetworkModal" v-bind:closeConnect="closeConnect">
    </networks-attachModal-component>
    
    </a-layout-content>
  </div>
</template>

<script src="@/components/Networks/ts/Network.ts" lang="ts">
</script>

<style ></style>
