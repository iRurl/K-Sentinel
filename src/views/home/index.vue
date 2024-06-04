<template>
  <div class="dashboard-container">
    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="16" :xs="18" class="centered-content">
          <Avatar />
          <p class="bold-text">{{ greetings }}</p>
        </el-col>
        <el-col :span="6" :xs="24" class="statistics-col">
          <div class="statistic-container">
            <el-statistic v-for="item in statisticData" :key="item.key" :value="item.value" class="statistic-item">
              <template #title>
                <div class="statistic-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="statistic-value-suffix">
                  <span class="statistic-suffix" v-if="item.suffix">{{ item.suffix }}</span>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- Echarts 图表 -->
    <el-card class="mt-3">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="8" class="mb-2" v-for="item in chartData" :key="item">
          <component :is="chartComponent(item)" :id="item" height="400px" width="100%" class="bg-[var(--el-bg-color-overlay)]" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Home",
  inheritAttrs: false
});

import { useUserStore } from "@/stores/modules/user";
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import Avatar from "@/layouts/components/Header/components/Avatar.vue";
import { reqsysinfo } from "@/api/modules/home";
import { HomeInfo } from "@/stores/interface";
import { useHomeStore } from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const homeStore = useHomeStore();
const date: Date = new Date();

const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，" + userStore.userInfo.name + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userStore.userInfo.name + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userStore.userInfo.name + "！";
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

const homeInfo = storeToRefs(homeStore);
// 右上角数量
const statisticData = ref([
  {
    value: homeInfo.home.value.rulenum,
    title: "规则数量",
    key: "message"
  },
  {
    value: homeInfo.home.value.nowdevice,
    title: "在线设备数",
    suffix: "/" + homeInfo.home.value.alldevice,
    key: "upcoming"
  }
]);
// 图表数据
const chartData = ref(["StorageChart", "CpuuseChart", "PieChart"]);
const chartComponent = (item: string) => {
  return defineAsyncComponent(() => import(`./components/${item}.vue`));
};

const getHomeInfo = async () => {
  let ReqHomeinfo = await reqsysinfo();
  let Homeinfo: HomeInfo = ReqHomeinfo.data;
  homeStore.setHomeInfo(Homeinfo);
};

onMounted(() => {
  setInterval(() => {
    getHomeInfo();
  }, 10000);
});

watch(homeInfo.home.value, newValue => {
  // 这里可以执行一些操作，例如发送请求
  console.log("count 发生了变化，新值为：", newValue);
});

//循环请求接口
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 12px;
  padding-top: 15px;

  .mt-3 {
    margin-top: 25px;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }
}
.container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 20px;
}

.bold-text {
  font-weight: bold;
  margin-top: 10px;
}

.statistics-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.statistic-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.statistic-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  margin-right: 20px;
}

.statistic-title {
  font-weight: bold;
  color: #333;
  font-size: 1.7em;
  margin-right: 80px;
  margin-bottom: 5px;
}

.statistic-value-suffix {
  position: absolute;
  align-items: center;
  font-size: 1.2em;
  margin-top: 8px;
  margin-left: 25px;
}

.statistic-value {
  font-size: 1.8em;
  color: #000;
}

.statistic-suffix {
  margin-left: 5px;
  font-size: 1.3em;
  color: #666;
}
</style>
