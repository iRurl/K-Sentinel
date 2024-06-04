import { ResPage, Rule } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 规则管理模块
 */
// 获取规则列表
export const getRuleList = (params: Rule.ReqRuleParams) => {
  return http.post<ResPage<Rule.ResRuleList>>(PORT1 + `/rule/list`, params);
};

// 新增规则
export const addRule = (params: Rule.ReqRuleParams) => {
  return http.post(PORT1 + `/rule/add`, params);
};

// 编辑规则
export const editRule = (params: { id: string }) => {
  return http.post(PORT1 + `/rule/edit`, params);
};

// 删除规则
export const deleteRule = (params: { id: string[] }) => {
  return http.post(PORT1 + `/rule/delete`, params);
};

// 获取规则类型字典
export const getRuleTypes = () => {
  return http.get<Rule.ResTypes[]>(PORT1 + `/rule/types`);
};
