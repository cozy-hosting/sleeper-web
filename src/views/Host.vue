<template>
  <div>
    <portal to="sidebar"></portal>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Host</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0 }"
    >
      <div v-if="this.hostInfo.system !== undefined">
        <h3>System</h3>
        <div>
          <a-descriptions bordered>
            <a-descriptions-item label="Hostname">
              {{ hostInfo.system.hostname }}
            </a-descriptions-item>
            <a-descriptions-item label="OS">
              {{ hostInfo.system.os_name }}
            </a-descriptions-item>
            <a-descriptions-item label="Linux Distribution">
              {{ hostInfo.system.linux_distro }}
            </a-descriptions-item>
            <a-descriptions-item label="Platform">
              {{ hostInfo.system.platform }}
            </a-descriptions-item>
            <a-descriptions-item label="CPU Kerne">
              {{ hostInfo.core.phys }} physisch, {{ hostInfo.core.log }} logisch
            </a-descriptions-item>
            <a-descriptions-item label="Uptime">
              {{ hostInfo.uptime }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <h3>Memory</h3>
        <div>
          <apexchart
            width="100%"
            height="200px"
            type="line"
            :options="memoryChartOptions"
            :series="memoryChartSeries"
          ></apexchart>
        </div>
        <h3>CPU</h3>
        <div>
          <apexchart
            width="100%"
            height="200px"
            type="line"
            :options="cpuChartOptions"
            :series="cpuChartSeries"
          ></apexchart>
        </div>
        <h3>Filesystem</h3>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap">
          <a-card
            v-for="fs in this.hostInfo.fs"
            v-bind:key="fs.device_name + fs.mnt_point"
            style="width: 300px; word-break: break-word; margin: 10px"
          >
            <apexchart
              type="radialBar"
              height="200"
              :options="{ ...filesystemChartOptions, labels: [fs.device_name] }"
              :series="filesystemChartSeries[fs.device_name]"
            ></apexchart>
            <p><b>Type:</b> {{ fs.fs_type }}</p>
            <p><b>Mountpoint:</b> {{ fs.mnt_point }}</p>
          </a-card>
        </div>
      </div>
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HostService from "@/services/HostService";
import VueApexCharts from "vue-apexcharts";

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class Host extends Vue {
  private hostService: HostService = new HostService();
  private hostInfo: any = {};
  private updateSpeed = 5000; // update interval in seconds
  private graphRange = 1000 * 60; // time in milliseconds

  private memoryChartOptions: object = {
    stroke: {
      curve: "smooth"
    },
    chart: {
      id: "memchart",
      group: "hostinfo",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: this.updateSpeed
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function(value: any, timestamp: any) {
          const date = new Date(timestamp);
          return (
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
          );
        }
      },
      range: this.graphRange
    },
    yaxis: {
      max: 100,
      labels: {
        minWidth: 10
      }
    }
  };

  private cpuChartOptions: object = {
    stroke: {
      curve: "smooth"
    },
    chart: {
      id: "cpuchart",
      group: "hostinfo",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: this.updateSpeed
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function(value: any, timestamp: any) {
          const date = new Date(timestamp);
          return (
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
          );
        }
      },
      range: this.graphRange
    },
    yaxis: {
      max: 100,
      labels: {
        minWidth: 10
      }
    }
  };

  private filesystemChartOptions: object = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%"
        }
      }
    }
  };

  private memoryChartSeries: any[] = [
    {
      data: []
    }
  ];

  private cpuChartSeries: any[] = [
    {
      data: []
    }
  ];

  private filesystemChartSeries: any[] = [];

  mounted() {
    this.updateTick();
    setInterval(this.updateTick, this.updateSpeed);
  }

  async fetchHostInfo() {
    this.hostInfo = await this.hostService.getAllInfo();
  }

  updateGraphs() {
    const timestamp = Date.now();
    this.memoryChartSeries = [
      {
        data: Array.prototype.concat(this.memoryChartSeries[0].data, [
          [timestamp, this.hostInfo.mem.percent]
        ])
      }
    ];
    this.cpuChartSeries = [
      {
        data: Array.prototype.concat(this.cpuChartSeries[0].data, [
          [timestamp, this.hostInfo.cpu.total]
        ])
      }
    ];
    for (const fs of this.hostInfo.fs) {
      this.filesystemChartSeries[fs.device_name] = [fs.percent];
    }
  }

  private async updateTick() {
    if (this.$route.name === "Host") {
      await this.fetchHostInfo();
      await this.updateGraphs();
    }
  }
}
</script>

<style lang="scss"></style>
