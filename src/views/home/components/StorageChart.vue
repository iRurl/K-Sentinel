<template>
  <el-card>
    <template #header>
      <div class="title">存储利用率</div>
    </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import echarts, { ECOption } from "@/components/ECharts/config";
import { markRaw, onActivated, onMounted, ref } from "vue";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
let storageData = storeToRefs(homeStore);
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
      text: storageData.storage.value + "%",
      left: "50%",
      top: "38%",
      textAlign: "center",
      textStyle: {
        fontSize: "50",
        fontWeight: "300",
        color: "#a06a0a",
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
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: "rgba(251, 173, 23, 0)"
            },
            {
              offset: 0.5,
              color: "rgba(251, 173, 23, .2)"
            },
            {
              offset: 0,
              color: "rgba(251, 173, 23, 1)"
            }
          ],
          globalCoord: false
        }
      ],
      data: [0.5, 0.5, 0.5],
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
      name: "最外绿边",
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
            color: "#fdc56e"
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
  chart.value.setOption(options, true);
});
setInterval(() => {
  options.title![1].text = storageData.storage.value + "%";
  chart.value.setOption(options, true);
}, 10000);
onActivated(() => {
  if (chart.value) {
    chart.value.resize();
  }
});
</script>

<style scoped lang="scss"></style>
