<!-- ParentComponent.vue -->
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <EditDialog
      v-model="dialogVisible"
      :form-data="currentRow"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EditDialog from './EditDialog.vue'

// 原始数据（应来自API）
const tableData = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

// 弹窗控制
const dialogVisible = ref(false)
const currentRow = ref(null)

// 编辑处理
const handleEdit = (row) => {
  currentRow.value = JSON.parse(JSON.stringify(row)) // 深拷贝
  dialogVisible.value = true
}

// 提交修改
const handleSubmit = (formData) => {
  const index = tableData.value.findIndex(item => item.id === formData.id)
  if (index > -1) {
    tableData.value.splice(index, 1, formData)
  }
  dialogVisible.value = false
}
</script>