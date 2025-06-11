// 导入库
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from 'element-plus';

// 全局变量
export const dialogOrderAddVisible = ref(false);
export const dialogOrderUpdateVisible = ref(false);
export const tableData = ref([]);  // 表格数据
export const formLabelWidth = '140px' // 表单标签(label)宽度
export const loading = ref(false);
export const total = ref(0);  // 新增总数量
export const currentPage = ref(1);  // 新增分页页码
export const pageSize = ref(10);    // 新增每页数量

// -------------------- 下拉框常用变量 start --------------------
// 产品类型: 鼠标：单模、双模、有线等
export const pddProductTypeOptions = [
  { label: '无线单模', value: '无线单模' },
  { label: '无线双模', value: '无线双模' },
  { label: '有线', value: '有线' },
]

// 产品颜色
export const pddProductColorOptions = [
  { label: '黑色', value: '黑色' },
  { label: '白色', value: '白色' },
  { label: '粉色', value: '粉色' },
]

// 订单状态
export const pddOrderStatusOptions = [
  { label: '已取消', value: '已取消' },
  { label: '待付款', value: '待付款' },
  { label: '待发货', value: '待发货' },
  { label: '已发货，待收货', value: '已发货，待收货' },  // 中文逗号
  { label: '已收货', value: '已收货' },
  { label: '无售后/取消售后', value: '无售后/取消售后' },
  { label: '售后处理中', value:'售后处理中' },
  { label: '退款中', value:'退款中' },
  { label: '退款成功', value:'退款成功' },
  { label: '无售后/售后处理中', value:'无售后/售后处理中' },
  { label: '已发货，退款成功', value:'已发货，退款成功' },
  { label: '未发货，退款成功', value:'未发货，退款成功' },
  { label: '已收货，退款成功', value:'已收货，退款成功' },
]

// 是否加入黑名单
export const pddIsBlackListOptions = [
  { label: '否', value: false },
  { label: '是', value: true },
]

// 快递公司
export const pddExpressCompanyOptions = [
  { label: '韵达快递', value: '韵达快递' },
  { label: '极兔快递', value: '极兔快递' },
  { label: '顺丰快递', value: '顺丰快递' },
  { label: '申通快递', value: '申通快递' },
  { label: '圆通快递', value: '圆通快递' },
  { label: '中通快递', value: '中通快递' },
]

// 代发平台
export const dropShippingPlatformOptions = [
  { label: '拼多多', value: '拼多多' },
  { label: '京东', value: '京东' },
  { label: '淘宝', value: '淘宝' },
  { label: '1688', value: '1688' },
  { label: '其他', value: '其他' },
]


// -------------------- 下拉框常用变量 end --------------------

// -------------------- 方法相关: 公用方法 start --------------------
// 非分页获取方法
export const getOrdersNotPage = async () => {
  loading.value = true; // 开始加载
  try {
    const response = await axios.get('/api/orders', {
      params: {
        page: currentPage.value,
        size: pageSize.value
      }
    });
    ElMessage('获取成功');
    console.log('获取成功 response.data:', response.data.data);
    console.log('获取成功 response.total:', response.data.total);
    tableData.value = Array.isArray(response.data.data) ? response.data.data : []; // tableData.value = response.data; // 报错？
  } catch (error) {
    console.error('获取失败:', error);
    ElMessage('获取失败，请稍后重试');
  } finally {
    loading.value = false; // 结束加载
  }
  
};


// 分页获取方法
// 修改数据获取方法
export const getOrders = async (page = currentPage.value, size = pageSize.value) => {
  loading.value = true; // 开始加载
  try {
    // const response = await axios.get('/api/orders', {
    // const response = await axios.get('http://www.j88d.com:8888/orders', {
    const response = await axios.get('https://www.j88d.com/api/orders', {
      params: { page, size }
    })
    // tableData.value = response.data.list
    tableData.value = Array.isArray(response.data.data) ? response.data.data : []; // tableData.value = response.data; // 报错？
    total.value = response.data.total
  } catch (error) {
    ElMessage.error('获取订单数据失败')
  } finally {
    loading.value = false; // 结束加载
  }
}


// 拦截器方式，请求。拦截请求，查看具体请求 - 测试用-delte
/*
export const getOrders = async (page = currentPage.value, size = pageSize.value) => {
  loading.value = true // 开始加载

  const params = { page, size }

  // 👉 拼接完整请求 URL（最简单）
  const queryString = new URLSearchParams(params).toString()
  const fullUrl = axios.defaults.baseURL
    ? axios.defaults.baseURL.replace(/\/$/, '') + '/api/orders?' + queryString
    : '/api/orders?' + queryString

  console.log('请求 URL =', fullUrl)
  ElMessage.info(`请求 URL = ${fullUrl}`)

  try {
    const response = await axios.get('/api/orders', { params })
    // const response = await axios.get('http://www.j88d.com:8888/orders', { params })

    // 数据处理
    tableData.value = Array.isArray(response.data.data) ? response.data.data : []
    total.value = response.data.total
  } catch (error) {
    ElMessage.error('获取订单数据失败')
  } finally {
    loading.value = false // 结束加载
  }
}
*/

// -------------------- 方法相关: 公用方法 end --------------------
