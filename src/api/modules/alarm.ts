import { Alarm, ResPage } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 告警管理模块
 */
// 获取规则列表
export const getAlarmList = (params: Alarm.ReqAlarmParams) => {
  return http.post<ResPage<Alarm.ResAlarmList>>(PORT1 + `/alarm/list`, params);
};

// 获取告警类型字典
export const getAlarmTypes = () => {
  return http.get<Alarm.ResTypes[]>(PORT1 + `/alarm/types`);
};

// 删除告警
export const deleteAlarm = (params: { id: string[] }) => {
  return http.post(PORT1 + `/alarm/delete`, params);
};
