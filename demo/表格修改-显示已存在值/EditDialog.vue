<!-- EditDialog.vue -->
<template>
    <el-dialog
      v-model="dialogVisible"
      title="编辑数据"
      @closed="handleClose"
    >
      <el-form 
        :model="form" 
        :rules="rules"
        ref="formRef"
        label-width="80px"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
  
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
    formData: Object
  })
  
  const emit = defineEmits(['update:modelValue', 'submit'])
  
  // 弹窗显示控制
  const dialogVisible = ref(false)
  watch(
    () => props.modelValue,
    (val) => (dialogVisible.value = val)
  )
  watch(dialogVisible, (val) => emit('update:modelValue', val))
  
  // 表单相关
  const form = ref({})
  const formRef = ref(null)
  watch(
    () => props.formData,
    (val) => (form.value = val || {}),
    { immediate: true }
  )
  
  // 验证规则
  const rules = {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
  }
  
  // 提交处理
  const handleSubmit = async () => {
    try {
      await formRef.value.validate()
      emit('submit', form.value)
      dialogVisible.value = false
    } catch (err) {
      console.log('表单验证失败')
    }
  }
  
  // 关闭时重置表单
  const handleClose = () => {
    formRef.value?.resetFields()
  }
  </script>