<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}规则`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="规则名称" prop="rulename">
        <el-input v-model="drawerProps.row!.rulename" placeholder="请填写规则名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="规则类别" prop="type">
        <el-select v-model="drawerProps.row!.ruletype" placeholder="请选择规则类型" clearable @change="type_select">
          <el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- 特殊表单 -->
      <template v-if="visiable_mgwj">
        <div v-for="(item, index) in drawerProps.row!.rule" :key="item.key">
          <el-form-item
            :label="'敏感地址' + item.key"
            class="form-style"
            :prop="'rule.' + index + '.detail'"
            :rules="{
              required: true,
              message: '规则内容不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="item.detail" size="small" clearable class="special-style" />
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="index + 1 == drawerProps.row.rule!.length"
              type="primary"
              size="small"
              @click="addItem(drawerProps.row.rule!.length)"
            >
              +
            </el-button>
            <el-button v-if="index !== 0" type="danger" size="small" @click="deleteItem(item, index)">-</el-button>
          </el-form-item>
        </div>
      </template>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/dict";
import { ElMessage, FormInstance } from "element-plus";
import { Rule } from "@/api/interface";

const rules = reactive({
  rulename: [{ required: true, message: "请填写规则名" }],
  type: [{ required: true, message: "请选择规则类型" }]
});

let visiable_mgwj = ref(false);

const type_select = selectparam => {
  if (selectparam == 1) {
    visiable_mgwj.value = true;
  } else {
    visiable_mgwj.value = false;
  }
};
interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<Rule.ResRuleList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
  if (drawerProps.value.title == "新建") {
    visiable_mgwj.value = true;
    drawerProps.value.row = {
      id: "",
      rulename: "",
      ruletype: 1,
      createTime: getDate(),
      rule: [
        {
          key: 1,
          detail: ""
        }
      ]
    };
  }
  if (drawerProps.value.row.ruletype == 1 || drawerProps.value.title == "新建") {
    visiable_mgwj.value = true;
  }
};

const addItem = length => {
  if (length >= 10) {
    ElMessage.warning({ message: `最多可新增10条` });
  } else {
    drawerProps.value.row.rule!.push({
      key: length + 1,
      detail: ""
    });
    console.log(length);
  }
};
const deleteItem = (item, index) => {
  drawerProps.value.row.rule!.splice(index, 1);
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}规则成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const getDate = () => {
  // 获取当前时间
  let currentDate = new Date();

  // 获取当前年份
  let year = currentDate.getFullYear();

  // 获取当前月份
  let month = currentDate.getMonth() + 1;

  // 获取当前日期
  let date = currentDate.getDate();

  // 获取当前小时
  let hours = currentDate.getHours();

  // 获取当前分钟
  let minutes = currentDate.getMinutes();

  // 获取当前秒数
  let seconds = currentDate.getSeconds();

  // 使用模板字符串拼接日期字符串
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

defineExpose({
  acceptParams
});
</script>
<style>
.form-style {
  margin-bottom: 10px;
  .special-style {
    width: 200px;
  }
}
</style>
