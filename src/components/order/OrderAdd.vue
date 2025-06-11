 <template>
 <!-- 添加订单的 dialog -->
  <el-dialog v-model="dialogOrderAddVisible" title="新增" width="500">
    <el-form>
      <el-form-item label="PDD订单号" :label-width="formLabelWidth">
        <el-input v-model="pddOrderId" placeholder="PDD订单号"/>
      </el-form-item>
      <el-form-item label="购买时间" :label-width="formLabelWidth">
        <el-input v-model="pddOrderTime" placeholder="购买时间 2025-0X-0X 00:00" /> 
      </el-form-item>
      <el-form-item label="购买价格(实收)" :label-width="formLabelWidth">
        <!-- precision 表示精确到小数点后多少位 -->
        <el-input-number v-model="pddOrderPrice" :precision="2" :step="0.1"  :max="1000" />
      </el-form-item>
      <el-form-item label="产品类型" :label-width="formLabelWidth">
        <el-select v-model="pddProductType" clearable placeholder="产品类型" >
          <el-option 
            v-for="item in pddProductTypeOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="颜色" :label-width="formLabelWidth">
        <el-select v-model="pddProductColor" clearable placeholder="颜色">
          <el-option 
            v-for="item in pddProductColorOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-select v-model="pddOrderStatus" clearable placeholder="订单状态">
          <el-option
            v-for="item in pddOrderStatusOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="买家信息" :label-width="formLabelWidth">
        <el-input v-model="pddBuyerInfo" placeholder="买家信息"/>
      </el-form-item>
      <el-form-item label="快递公司" :label-width="formLabelWidth">
        <el-select v-model="pddExpressCompany" clearable placeholder="快递公司" >
          <el-option
            v-for="item in pddExpressCompanyOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="物流编号" :label-width="formLabelWidth">
        <el-input v-model="pddExpressId" placeholder="物流编号"/>
      </el-form-item>
      <el-form-item label="买家拉黑" :label-width="formLabelWidth">
        <el-select v-model="pddIsBlackList" clearable placeholder="买家拉黑">
          <el-option
            v-for="item in pddIsBlackListOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="pdd备注" :label-width="formLabelWidth">
        <el-input v-model="pddRemark" placeholder="pdd备注"/>
      </el-form-item>
      <!-- 待发相关 -->
      <el-form-item label="代发平台" :label-width="formLabelWidth">
        <el-select v-model="dropShippingPlatform" placeholder="代发平台">
          <el-option 
            v-for="item in dropShippingPlatformOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代发订单号" :label-width="formLabelWidth">
        <el-input v-model="dropShippingOrderId" placeholder="代发订单号"/>
      </el-form-item>
      <el-form-item label="代发购买时间" :label-width="formLabelWidth">
        <el-input v-model="dropShippingOrderTime" placeholder="代发购买时间 2025-0X-0X 00:00"/>
      </el-form-item>
      <el-form-item label="代发厂家名" :label-width="formLabelWidth">
        <el-input v-model="dropShippingFactoryName" placeholder="代发厂家名"/>
      </el-form-item>
      <el-form-item label="代发实际价" :label-width="formLabelWidth">
        <el-input-number v-model="dropShippingRealPrice" :precision="2" :step="0.1" :max="1000" />
      </el-form-item>
      <el-form-item label="购买价格" :label-width="formLabelWidth">
        <el-input-number v-model="dropShippingPrice" :precision="2" :step="0.1" :max="1000" />
      </el-form-item>
      <el-form-item label="优惠" :label-width="formLabelWidth">
        <el-input-number v-model="dropShippingDiscountPrice" :precision="2" :step="0.1" :max="1000" />
      </el-form-item>
      <el-form-item label="代发备注" :label-width="formLabelWidth">
        <el-input v-model="dropShippingRemark" placeholder="代发备注"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrder">新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script lang="ts" setup>
// 导入三方
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 导入其它组件变量

// 导入共享变量
import { dialogOrderAddVisible } from '@/js/order/shared';
import { getOrders } from '@/js/order/shared'
import { pddProductTypeOptions, pddProductColorOptions, pddOrderStatusOptions, pddExpressCompanyOptions, pddIsBlackListOptions, dropShippingPlatformOptions } from '@/js/order/shared';
import { formLabelWidth } from '@/js/order/shared';  // 表单label宽度

console.log("111111111111111= 加载父组件就加载了 子组件 OrderAdd")

// 定义变量
const pddOrderId = ref('')
const pddOrderTime = ref('')
const pddOrderPrice = ref(21.9)
const pddProductType = ref('')
const pddProductColor = ref('')
const pddOrderStatus = ref('')
const pddBuyerInfo = ref('')
const pddExpressCompany = ref('')
const pddExpressId = ref('')
const pddIsBlackList = ref(false)
const pddRemark = ref('')

const dropShippingPlatform = ref('')
const dropShippingOrderId = ref('')
const dropShippingOrderTime = ref('')
const dropShippingFactoryName = ref('')
const dropShippingRealPrice = ref(16.2)
const dropShippingPrice = ref(17)
const dropShippingDiscountPrice = ref(0.8)
const dropShippingRemark = ref('')


// 新增订单方法
const addOrder = async () => {
  try {
    var jsonData = {
      pddOrderId: pddOrderId.value,
      pddOrderTime: pddOrderTime.value,
      pddOrderPrice: pddOrderPrice.value,
      pddProductType: pddProductType.value,
      pddProductColor: pddProductColor.value,
      pddOrderStatus: pddOrderStatus.value,
      pddBuyerInfo: pddBuyerInfo.value,
      pddExpressCompany: pddExpressCompany.value,
      pddExpressId: pddExpressId.value,
      pddIsBlackList: pddIsBlackList.value,
      pddRemark: pddRemark.value,
      // 代发相关
      dropShippingPlatform: dropShippingPlatform.value,
      dropShippingOrderId: dropShippingOrderId.value,
      dropShippingOrderTime: dropShippingOrderTime.value,
      dropShippingFactoryName: dropShippingFactoryName.value,
      dropShippingRealPrice: dropShippingRealPrice.value,
      dropShippingPrice: dropShippingPrice.value,
      dropShippingDiscountPrice: dropShippingDiscountPrice.value,
      dropShippingRemark: dropShippingRemark.value
    }
    const response = await axios.post('api/orders', jsonData); // 替换为实际的 API 地址
    console.log('请求: api/orders, 数据: ', jsonData)
    ElMessage('新增成功')
    dialogOrderAddVisible.value = false; // 关闭对话框
    resetForm()  // 重置变量
    await getOrders() // 刷新数据
  } catch (error) {
    console.error('新增失败: ', error);
    ElMessage('新增失败')
  }
};

// 重置变量方法
const resetForm = () => {
  pddOrderId.value = '';
  pddOrderTime.value = '';
  pddOrderPrice.value = 21.9;
  pddProductType.value = '';
  pddProductColor.value = '';
  pddOrderStatus.value = '';
  pddBuyerInfo.value = '';
  pddExpressCompany.value = '';
  pddExpressId.value = '';
  pddIsBlackList.value = false;
  pddRemark.value = '';
  
  // 代发相关字段
  dropShippingPlatform.value = '';
  dropShippingOrderId.value = '';
  dropShippingOrderTime.value = '';
  dropShippingFactoryName.value = '';
  dropShippingRealPrice.value = 16.2;
  dropShippingPrice.value = 17;
  dropShippingDiscountPrice.value = 0.8;
  dropShippingRemark.value = '';
}
</script>
