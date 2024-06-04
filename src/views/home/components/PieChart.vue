<!-- 饼图 -->
<template>
  <el-card>
    <template #header> 设备分类饼图 </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { markRaw, onActivated, onMounted, ref } from "vue";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const devicetype = storeToRefs(homeStore);
const props = defineProps({
  id: {
    type: String,
    default: "pieChart"
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
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)"
  },
  grid: {
    left: "2%",
    right: "2%",
    bottom: "10%",
    containLabel: true
  },
  legend: {
    top: "bottom",
    textStyle: {
      color: "#999"
    }
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: [50, 130],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 1,
        color: function (params: any) {
          //自定义颜色
          const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
          return colorList[params.dataIndex];
        }
      },
      data: devicetype.device.value
    }
  ]
};

const chart = ref<any>("");

onMounted(() => {
  chart.value = markRaw(echarts.init(document.getElementById(props.id) as HTMLDivElement));

  chart.value.setOption(options);

  window.addEventListener("resize", () => {
    chart.value.resize();
  });
});
setInterval(() => {
  options.series[0].data = devicetype.device.value;
  chart.value.setOption(options, true);
}, 10000);
onActivated(() => {
  if (chart.value) {
    chart.value.resize();
  }
});
</script>
