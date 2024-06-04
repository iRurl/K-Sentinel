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
  console.log(drawerProps.value.api);
  if (drawerProps.value.row.ruletype == 1) {
    visiable_mgwj.value = true;
  }
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

defineExpose({
  acceptParams
});
</script>
