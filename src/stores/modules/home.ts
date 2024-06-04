import { defineStore } from "pinia";
import { HomeInfo } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";

export const useHomeStore = defineStore({
  id: "K-Sentinel-home",
  state: (): HomeInfo => ({
    home: {
      rulenum: 0,
      nowdevice: 0,
      alldevice: 0
    },
    cpu: 0,
    storage: 0,
    device: [{ value: 0, name: "" }]
  }),
  getters: {},
  actions: {
    // Set setHomeInfo
    setHomeInfo(homeinfo: HomeInfo) {
      this.home = homeinfo.home;
      this.cpu = homeinfo.cpu;
      this.storage = homeinfo.storage;
      this.device = homeinfo.device;
    }
  },
  persist: piniaPersistConfig("K-Sentinel-home")
});
