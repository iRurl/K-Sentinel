<template>
  <el-card>
    <template #header>
      <div class="title">CPU利用率</div>
    </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts" name="waterChart">
import echarts, { ECOption } from "@/components/ECharts/config";
import { markRaw, onActivated, onMounted, ref } from "vue";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const cpuData = storeToRefs(homeStore);
const props = defineProps({
  id: {
    type: String,
    default: "funnelChart"
  },
  className: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: "200px",
    required: true
  },
  height: {
    type: String,
    default: "200px",
    required: true
  }
});

const options = {
  title: [
    {
      text: "",
      x: "50%",
      y: 30,
      textAlign: "center",
      textStyle: {
        color: "#a1a1a1",
        fontSize: 16,
        fontFamily: "Microsoft Yahei",
        fontWeight: "100",
        textAlign: "center"
      }
    },
    {
      text: cpuData.cpu.value + "%",
      left: "50%",
      top: "38%",
      textAlign: "center",
      textStyle: {
        fontSize: "50",
        fontWeight: "300",
        color: "#02456d",
        textAlign: "center",
        textBorderColor: "rgba(0, 0, 0, 0)",
        textShadowColor: "#fff",
        textShadowBlur: "0",
        textShadowOffsetX: 0,
        textShadowOffsetY: 1
      }
    }
  ],
  series: [
    {
      type: "liquidFill",
      radius: "50%",
      z: 6,
      center: ["50%", "50%"],
      color: ["#c1dce7", "#90d3f0", "#009bdb"],
      data: [0.6, { value: 0.5, direction: "left" }, 0.4, 0.3],
      backgroundStyle: {
        borderWidth: 1,
        color: "transparent"
      },
      label: {
        normal: {
          formatter: ""
        }
      },
      outline: {
        show: true,
        itemStyle: {
          borderWidth: 0
        },
        borderDistance: 0
      }
    },
    {
      name: "第二层白边",
      type: "pie",
      z: 3,
      radius: ["0%", "55%"],
      center: ["50%", "50%"],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: false
          }
        }
      },
      data: [
        {
          value: 100,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fefefe"
                },
                {
                  offset: 1,
                  color: "#e7e8ea"
                }
              ])
            }
          }
        },
        {
          value: 0,
          itemStyle: {
            normal: {
              color: "transparent"
            }
          }
        }
      ]
    },
    {
      name: "最外蓝边",
      type: "pie",
      z: 1,
      radius: ["0%", "58%"],
      center: ["50%", "50%"],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: false
          }
        }
      },
      data: [
        {
          value: 100,
          itemStyle: {
            color: "#07a2e3"
          }
        },
        {
          value: 0,
          itemStyle: {
            normal: {
              color: "transparent"
            }
          }
        }
      ]
    }
  ]
} as ECOption;

const chart = ref<any>("");

onMounted(() => {
  chart.value = markRaw(echarts.init(document.getElementById(props.id) as HTMLDivElement));

  chart.value.setOption(options);

  window.addEventListener("resize", () => {
    chart.value.resize();
  });
});

setInterval(() => {
  options.title![1].text = cpuData.cpu.value + "%";
  chart.value.setOption(options, true);
}, 10000);

onActivated(() => {
  if (chart.value) {
    chart.value.resize();
  }
});
</script>

<style scoped lang="scss"></style>
