<template>
  <el-button type="primary" @click="getOrders(currentPage, pageSize)">获取订单数据</el-button>
  <el-button type="primary" @click="dialogOrderAddVisible = true">新增</el-button>
  <OrderAdd />
  <OrderUpdate :order="orderRow" />
  <!-- 表格 -->
  <el-table 
    :data="tableData" 
    stripe 
    height="800" 
    style="width: 100%" 
    v-loading="loading"
  >
    <!-- 拼多多相关信息  -->
    <el-table-column fixed type="selection"/>
    <el-table-column prop="id" label="Id"  /> 
    <el-table-column prop="pddOrderId" label="PDD订单号"  fixed width="200"/> 
    <el-table-column prop="pddOrderTime" label="购买时间" sortable width="150"/>
    <el-table-column prop="pddOrderPrice" label="购买价格" />
    <el-table-column prop="pddProductType" label="产品类型" />
    <el-table-column prop="pddProductColor" label="颜色" />
    <el-table-column prop="pddOrderStatus" label="订单状态" />
    <el-table-column prop="pddBuyerInfo" label="买家信息" width="300" />
    <el-table-column prop="pddExpressCompany" label="快递公司" />
    <el-table-column prop="pddExpressId" label="物流编号" width="150" />
    <el-table-column prop="pddIsBlackList" label="买家拉黑" />
    <el-table-column prop="pddRemark" label="pdd备注" width="300" />
    <!-- 代发平台相关信息 -->
    <el-table-column prop="dropShippingPlatform" label="代发平台" />
    <el-table-column prop="dropShippingOrderId" label="代发订单号" width="200" />
    <el-table-column prop="dropShippingOrderTime" label="代发购买时间" width="150" />
    <el-table-column prop="dropShippingFactoryName" label="代发厂家名" width="150" />
    <el-table-column prop="dropShippingRealPrice" label="代发实际价" />
    <el-table-column prop="dropShippingPrice" label="购买价格" />
    <el-table-column prop="dropShippingDiscountPrice" label="优惠" />
    <el-table-column prop="dropShippingRemark" label="代发备注" />
    <el-table-column  label="操作" fixed="right" width="150">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 新增分页组件 -->
  <!-- layout写的顺序，和显示的前后顺序有关 -->
  <el-pagination
    background
    :current-page="currentPage"
    :page-sizes="[10, 20, 30]"
    :page-size="pageSize"
    layout="prev, pager, next, jumper, sizes, total"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';


// 导入自己写的组件
import OrderAdd from './OrderAdd.vue';
import OrderUpdate from './OrderUpdate.vue';

// 导入共享变量
import { dialogOrderAddVisible } from '@/js/order/shared'; // 引入共享变量 为啥用@/js
import { dialogOrderUpdateVisible } from '@/js/order/shared';
import { getOrders } from '@/js/order/shared'
import { tableData } from '@/js/order/shared';
import { loading } from '@/js/order/shared'
// 共享-分页相关
import { currentPage } from '@/js/order/shared'; // 当前页码
import { pageSize } from '@/js/order/shared'; // 每页显示条数
import { total } from '@/js/order/shared'; // 总数
// import { handleSizeChange } from '@/js/order/shared' // 分页事件处理-大小变化
// import { handleCurrentChange } from '@/js/order/shared' // 分页事件处理-页码变化

// 新建变量
const orderRow = ref({}); // 对象变量

// ---- 一会放共享里
// 新增分页事件处理-大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  getOrders(currentPage.value, size)
}

// 新增分页事件处理-页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getOrders(page, pageSize.value)
}


// 修改onMounted初始化调用，添加分页参数
onMounted(() => {
  console.log("onMounted,分页:", currentPage.value, pageSize.value);
  getOrders(currentPage.value, pageSize.value); // 传递当前页和每页大小
})

// 处理行点击事件
const handleRowClick = (row) => {
  ElMessage(JSON.stringify(row, null, 2))  // 显示row所有内容。显示单个内容，就直接row.pddOrderId
}

// 处理修改按钮点击事件
const handleEdit = (row) => {
  dialogOrderUpdateVisible.value = true  // 对话框显示
  orderRow.value = row  // row类型==object
  console.log("传递给子组件 orderRow.value= ", orderRow.value)
  console.log("传递给子组件 orderRow= ", orderRow)
  // ElMessage(`修改订单：${row.id}`);
  // 这里可以添加修改订单的逻辑
};

// 处理删除按钮点击事件
const handleDelete = async(row) => {
  // 这里可以添加删除订单的逻辑
  try {
    const response = await axios.delete('/api/orders/' + row.id); // 替换为实际的 API 地址，这样写不行，未定位原因
    // const response = await axios.get('http://localhost:8888/orders'); // 替换为实际的 API 地址
    ElMessage(`删除订单：${row.id} 成功`)
    // 删除后刷新数据
    await getOrders();
  } catch (error) {
    console.error('删除订单失败:', error);
    ElMessage('删除订单失败')
  }
};
</script>