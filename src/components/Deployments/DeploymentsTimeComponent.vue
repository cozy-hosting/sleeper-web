<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Prop from "vue-property-decorator";

const timeProps = Vue.extend({
  props: {
    deployState:
    {
        type: Number
    }
  }
})

@Component({
    name: "deployments-time-component"
    })
export default class DeploymentsTimeComponent extends timeProps
{

}
</script>