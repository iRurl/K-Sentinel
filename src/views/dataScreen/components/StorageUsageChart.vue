<template>
  <div :id="id" :class="className" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
// import ECharts from "@/components/ECharts/index.vue";
import * as echarts from "echarts";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { markRaw, onMounted, ref, watch } from "vue";
const HomeStore = useHomeStore();
const homeinfo = storeToRefs(HomeStore);

let storage = ref(homeinfo.storage.value);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  id: {
    type: String,
    default: "storage"
  },
  className: {
    type: String,
    default: "echarts"
  },
  width: {
    type: String,
    default: "300px",
    required: false
  },
  height: {
    type: String,
    default: "250px",
    required: false
  }
});
let option = {
  title: [
    {
      text: "存储利用率",
      left: "center",
      top: "82%",
      textStyle: {
        color: "#3488db",
        fontSize: 22,
        fontFamily: "cuhei",
        fontWeight: 600
      }
    }
  ],
  series: [
    {
      type: "gauge",
      axisLine: {
        lineStyle: {
          width: 13,
          color: [
            [0.2, "#42e4fb"],
            [0.8, "#3488db"],
            [1, "#f9387f"]
          ]
        }
      },
      radius: "90%",
      markPoint: {
        // 仪表盘指针圆
        animation: false,
        silent: true,
        data: [
          {
            x: "50%",
            y: "50%",
            symbol: "circle",
            symbolSize: 20,
            itemStyle: {
              color: "auto"
            }
          },
          {
            x: "50%",
            y: "50%",
            symbol: "circle",
            symbolSize: 20,
            itemStyle: {
              color: "#fff"
            }
          }
        ]
      },
      pointer: {
        // 仪表盘指针
        //icon:'none',
        width: 10,
        length: "60%",
        itemStyle: {
          color: "auto"
        }
      },
      axisTick: {
        distance: 0,
        length: 5,
        lineStyle: {
          color: "auto",
          width: 2
        }
      },
      splitLine: {
        distance: 0,
        length: 15,
        lineStyle: {
          color: "auto",
          width: 4
        }
      },
      axisLabel: {
        color: "#3488db",
        distance: 16,
        fontSize: 16
      },
      detail: {
        //valueAnimation: true,
        formatter: "{value} %",
        color: "white",
        fontSize: 23
      },
      data: [
        {
          value: storage.value
        }
      ]
    }
  ]
};
const chart = ref<any>("");

onMounted(() => {
  chart.value = markRaw(echarts.init(document.getElementById(props.id) as HTMLDivElement));
  chart.value.setOption(option, true);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(homeinfo.storage, (newValue, oldValue) => {
  option.series[0].data[0].value = newValue;
  chart.value.setOption(option, true);
});
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  padding-left: 50px;
}
</style>
