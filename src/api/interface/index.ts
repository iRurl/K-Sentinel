// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 规则管理模块
export namespace Rule {
  export interface ReqRuleParams extends ReqPage {
    id: string;
    rulename: string;
    type: number;
    createtime: string[];
  }
  export interface ResRuleList {
    id: string;
    rulename: string;
    ruletype: number;
    createTime: string;
    rule: any[];
    children?: ResRuleList[];
  }
  export interface ResTypes {
    typeLabel: string;
    typeValue: number;
  }
}

export namespace Alarm {
  export interface ReqAlarmParams extends ReqPage {
    id: string;
    filename: string;
    operation: number;
    alarmtime: string;
    processname: string;
  }
  export interface ResAlarmList {
    id: string;
    filename: string;
    operation: number;
    alarmtime: string;
    processname: string;
    extradata: {};
    children?: ResAlarmList[];
  }
  export interface ResTypes {
    typeLabel: string;
    typeValue: number;
  }
}
