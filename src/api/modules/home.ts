import { HomeInfo } from "@/stores/interface";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 主页数据模块
 */
// 获取首页信息
export const reqsysinfo = () => {
  return http.get<HomeInfo>(PORT1 + `/home/sysinfo`);
};
