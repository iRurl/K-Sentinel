<template>
  <div class="echarts">
    <div :id="id" :class="className" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { markRaw, onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
const HomeInfo = useHomeStore();
const Homeinfo = storeToRefs(HomeInfo);

let data = Homeinfo.device.value;

const colors = ["#F6C95C", "#EF7D33", "#1F9393", "#184EA1", "#81C8EF", "#9270CA"];
const props = defineProps({
  id: {
    type: String,
    default: "device"
  },
  className: {
    type: String,
    default: "echarts"
  },
  width: {
    type: String,
    default: "400px",
    required: false
  },
  height: {
    type: String,
    default: "220px",
    required: false
  }
});
const option = {
  color: colors,
  tooltip: {
    show: true,
    trigger: "item",
    formatter: "{b} <br/>占比：{d}%"
  },
  legend: {
    orient: "vertical",
    right: "20px",
    top: "15px",
    itemGap: 15,
    itemWidth: 14,
    formatter: function (name: string) {
      let text = "";
      data.forEach(val => {
        if (val.name === name) text = " " + name + "　 " + val.value;
      });
      return text;
    },
    textStyle: { color: "#fff" }
  },
  grid: { top: "bottom", left: 10, bottom: 10 },
  series: [
    {
      zlevel: 1,
      name: "机型比例",
      type: "pie",
      selectedMode: "single",
      radius: [50, 90],
      center: ["35%", "50%"],
      startAngle: 60,
      label: {
        position: "inside",
        show: true,
        color: "#fff",
        formatter: function (params) {
          return params.name;
        },
        rich: {
          b: {
            fontSize: 16,
            lineHeight: 30,
            color: "#fff"
          }
        }
      },
      itemStyle: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowBlur: 10
      },
      data: data.map((val, index: number) => {
        return {
          value: val.value,
          name: val.name,
          itemStyle: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: colors[index],
            borderRadius: 10
          }
        };
      })
    },
    {
      name: "",
      type: "pie",
      selectedMode: "single",
      radius: [50, 90],
      center: ["35%", "50%"],
      startAngle: 60,
      data: [
        {
          value: 0,
          name: "",
          label: {
            show: true,
            formatter: "{a|本日总数}",
            rich: {
              a: {
                align: "center",
                color: "rgb(98,137,169)",
                fontSize: 14
              }
            },
            position: "center"
          }
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
watch(Homeinfo.device, (newValue, oldValue) => {
  option.legend.formatter = function (name: string) {
    let text = "";
    newValue.forEach(val => {
      if (val.name === name) text = " " + name + "　 " + val.value;
    });
    return text;
  };
  option.series[0].data = newValue.map((val, index: number) => {
    return {
      value: val.value,
      name: val.name,
      itemStyle: {
        borderWidth: 10,
        shadowBlur: 20,
        borderColor: colors[index],
        borderRadius: 10
      }
    };
  });

  chart.value.setOption(option, true);
});
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
