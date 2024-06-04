<template>
  <div :id="id" :class="className" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import echarts from "@/components/ECharts/config";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { markRaw, onMounted, ref, watch } from "vue";
const HomeStore = useHomeStore();
const homeinfo = storeToRefs(HomeStore);

let dataV = homeinfo.cpu.value;
let heart = "❤❤❤❤❤❤";
for (let i = 0; i < dataV / 20; i++) {
  heart = heart.replace("❤", "");
}
const props = defineProps({
  id: {
    type: String,
    default: "cpuusage"
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
    default: "325px",
    required: false
  }
});
let option = {
  title: [
    {
      text: dataV,
      left: "48%",
      top: "44%",
      textAlign: "center",
      textStyle: {
        fontSize: "40",
        fontWeight: "bold",
        color: "rgba(191,140,61)",
        textShadowColor: "rgba(191,140,61)",
        textShadowBlur: 2,
        textShadowOffsetX: 2,
        textShadowOffsetY: 2,
        textAlign: "center",
        fontStyle: "italic"
      }
    },
    {
      text: "CPU使用",
      left: "50%",
      top: "74%",
      textAlign: "center",
      textStyle: {
        fontSize: "22",
        fontWeight: "400",
        color: "rgba(191,140,61)",
        textAlign: "center"
      }
    },
    {
      text: heart,
      left: "50%",
      top: "67%",
      textAlign: "center",
      textStyle: {
        fontSize: "16",
        fontWeight: "400",
        color: "rgba(191,140,61)",
        textAlign: "center"
      }
    }
  ],
  series: [
    {
      name: "由内而外第五个",
      type: "pie",
      radius: ["80%", "82%"],
      hoverAnimation: false,
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      itemStyle: {
        color: "rgba(141,199,218,0.15)",
        shadowColor: "rgba(141,199,218,1)",
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5
      },
      labelLine: {
        show: false
      },
      pointer: {
        show: false //指针
      },
      axisLine: {
        //整体颜色
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        //隐藏0和100旁边的白色刻度
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        //隐藏数据值
        show: false
      },
      data: [{ value: dataV }]
    },
    {
      name: "由内而外第四个",
      type: "pie",
      radius: ["0%", "70%"],
      hoverAnimation: false,
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      itemStyle: {
        color: "rgba(10,60,95,0.3)"
      },
      labelLine: {
        show: false
      },
      pointer: {
        show: false //指针
      },
      axisLine: {
        //整体颜色
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        //隐藏0和100旁边的白色刻度
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        //隐藏数据值
        show: false
      },
      data: [{ value: dataV }],
      z: 0
    },
    {
      name: "由内而外第三个",
      type: "gauge",
      radius: "75%",
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      pointer: {
        show: false //指针
      },
      axisLine: {
        //整体颜色
        show: true,
        lineStyle: {
          color: [[1, "rgba(0,0,0,0)"]]
        }
      },
      axisTick: {
        show: true,
        //length:-10,
        lineStyle: {
          color: "rgba(141,199,218,1)"
        }
      },
      splitLine: {
        //隐藏0和100旁边的白色刻度
        show: true,
        length: -10,
        lineStyle: {
          color: "rgba(141,199,218,1)"
        }
      },
      axisLabel: {
        show: false
      },
      detail: {
        //隐藏数据值
        show: false
      },
      data: [{ value: 60 }]
    },
    {
      name: "内圆2",
      type: "pie",
      radius: ["0%", "30%"],
      hoverAnimation: false,
      label: {
        show: true,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold"
        }
      },
      itemStyle: {
        color: "rgba(10,60,95,1)"
      },
      data: [{ value: dataV }]
    },
    {
      name: "内仪表盘",
      type: "gauge",
      radius: "50%",
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      splitNumber: 1,
      pointer: {
        show: false //指针
      },
      axisLine: {
        //大刻度
        show: true,
        lineStyle: {
          color: [
            [
              dataV / 100,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "rgba(141,199,218,1)"
                },
                {
                  offset: 1,
                  color: "rgba(234,98,40,1)"
                }
              ])
            ],
            [1, "rgba(10,60,95,0.9)"]
          ]
        }
      },
      axisTick: {
        show: false //小刻度
      },
      splitLine: {
        //隐藏0和100旁边的白色刻度
        show: false
      },
      axisLabel: {
        show: true,
        distance: -15, //距离刻度的距离
        lineHeight: -25,
        color: "rgba(128,206,242)",
        formatter: function (v) {
          if (v == "") {
            return "\xa0" + v;
          }
          return v;
        }
      },
      detail: {
        //隐藏数据值
        show: false
      },
      animationDuration: 2000,
      animationDurationUpdate: 1000,
      data: [{ value: dataV }]
    }
  ]
};
const chart = ref<any>("");

onMounted(() => {
  chart.value = markRaw(echarts.init(document.getElementById(props.id) as HTMLDivElement));
  chart.value.setOption(option, true);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(homeinfo.cpu, (newValue, oldValue) => {
  let data = newValue;
  let heart = "❤❤❤❤❤❤";
  for (let i = 0; i < dataV / 20; i++) {
    heart = heart.replace("❤", "");
  }
  option.title[0].text = data;
  option.title[2].text = heart;
  chart.value.setOption(option, true);
});

// setInterval(function () {
//   let myChart = echarts.init(document.getElementById("Cpuusage"));
//   console.log(dataV);
//   option.title[0].text = dataV;
//   let nLove = dataV / 20;
//   let nm = "❤❤❤❤❤❤";
//   for (let i = 0; i < nLove; i++) {
//     nm = nm.replace("❤", "");
//   }
//   option.title[2].text = nm;
//   option.series[4].axisLine.lineStyle.color[0][0] = dataV / 100;
//   myChart.setOption(option, true);
//   console.log(option);
// }, 3000);
</script>
<style lang="scss" scoped></style>
