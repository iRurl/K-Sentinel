<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getTableList" :init-param="initParam" :data-callback="dataCallback">
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary" plain @click="toDetail">查看告警详情页面</el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">
          批量删除告警
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- filename -->
      <template #filename="scope">
        <el-button type="primary" link @click="ElMessage.success(scope.row.filename)">
          {{ scope.row.filename }}
        </el-button>
      </template>
      <!-- alarmtime -->
      <template #alarmtime="scope">
        <el-button type="primary" link @click="ElMessage.success(scope.row.alarmtime)">
          {{ scope.row.alarmtime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #do="scope">
        <el-button type="primary" link :icon="Delete" @click="deleteAlarmInfo(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useHandleData } from "@/hooks/useHandleData";
import { ElMessage } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/alarmlist/UserDrawer.vue";
import { ProTableInstance, ColumnProps, HeaderRenderScope } from "@/components/ProTable/interface";
import { Delete } from "@element-plus/icons-vue";
import { getAlarmList, getAlarmTypes, deleteAlarm } from "@/api/modules/alarm";
import { Alarm } from "@/api/interface";

const router = useRouter();

// 跳转详情页
const toDetail = () => {
  router.push(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getAlarmList(newParams);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
// 自定义渲染表头（使用tsx语法）
const headerRender = (scope: HeaderRenderScope<Alarm.ResAlarmList>) => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success(scope.column.label)}>
      {scope.column.label}
    </el-button>
  );
};

// 表格配置项
const columns = reactive<ColumnProps<Alarm.ResAlarmList>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "expand", label: "Expand", width: 85 },
  {
    prop: "operation",
    label: "告警类型",
    headerRender,
    // 字典请求不带参数
    enum: getAlarmTypes,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "typeLabel", value: "typeValue" }
  },
  {
    prop: "filename",
    label: "文件名",
    search: { el: "input", tooltip: "告警文件名" }
  },
  {
    // 多级 prop
    prop: "processname",
    label: "进程名",
    search: { el: "input", tooltip: "告警进程名" }
  },
  {
    prop: "alarmtime",
    label: "告警时间",
    headerRender,
    width: 180,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2024-12-12 11:35:00"]
    }
  },
  { prop: "do", label: "操作", fixed: "right", width: 330 }
]);

// 删除用户信息
const deleteAlarmInfo = async (params: Alarm.ResAlarmList) => {
  await useHandleData(deleteAlarm, { id: [params.id] }, `删除【${params.id}】`);
  proTable.value?.getTableList();
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteAlarm, { id }, "删除所选告警信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};
</script>
