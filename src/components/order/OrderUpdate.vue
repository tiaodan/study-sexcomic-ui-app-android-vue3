 <template>
 <!-- 添加订单的 dialog -->
  <el-dialog v-model="dialogOrderUpdateVisible" title="修改" width="500">
    <el-form>
      <el-form-item label="PDD订单号" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.pddOrderId" placeholder="PDD订单号"/>
      </el-form-item>
      <el-form-item label="购买时间" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.pddOrderTime" placeholder="购买时间 2025-0X-0X 00:00" /> 
      </el-form-item>
      <el-form-item label="购买价格" :label-width="formLabelWidth">
        <!-- precision 表示精确到小数点后多少位 -->
        <el-input-number v-model="deepCloneOrder.pddOrderPrice" :precision="2" :step="0.1"  :max="1000" />
      </el-form-item>
      <el-form-item label="产品类型" :label-width="formLabelWidth">
        <el-select v-model="deepCloneOrder.pddProductType" clearable placeholder="产品类型" >
          <el-option 
            v-for="item in pddProductTypeOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="颜色" :label-width="formLabelWidth">
        <el-select v-model="deepCloneOrder.pddProductColor" clearable placeholder="颜色">
          <el-option 
            v-for="item in pddProductColorOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-select v-model="deepCloneOrder.pddOrderStatus" clearable placeholder="订单状态">
          <el-option
            v-for="item in pddOrderStatusOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="买家信息" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.pddBuyerInfo" placeholder="买家信息"/>
      </el-form-item>
      <el-form-item label="快递公司" :label-width="formLabelWidth">
        <el-select v-model="deepCloneOrder.pddExpressCompany" clearable placeholder="快递公司">
          <el-option
            v-for="item in pddExpressCompanyOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="物流编号" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.pddExpressId" placeholder="物流编号"/>
      </el-form-item>
      <el-form-item label="买家拉黑" :label-width="formLabelWidth">
        <el-select v-model="deepCloneOrder.pddIsBlackList" clearable placeholder="买家拉黑">
          <el-option
            v-for="item in pddIsBlackListOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="pdd备注" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.pddRemark" placeholder="pdd备注"/>
      </el-form-item>
      <!-- 待发相关 -->
      <el-form-item label="代发平台" :label-width="formLabelWidth">
        <el-select v-model="deepCloneOrder.dropShippingPlatform" placeholder="代发平台">
          <el-option 
            v-for="item in dropShippingPlatformOptions" :key="item.value" :label="item.label" :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="代发订单号" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.dropShippingOrderId" placeholder="代发订单号"/>
      </el-form-item>
      <el-form-item label="代发购买时间" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.dropShippingOrderTime" placeholder="代发购买时间 2025-0X-0X 00:00"/>
      </el-form-item>
      <el-form-item label="代发厂家名" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.dropShippingFactoryName" placeholder="代发厂家名"/>
      </el-form-item>
      <el-form-item label="代发实际价" :label-width="formLabelWidth">
        <el-input-number v-model="deepCloneOrder.dropShippingRealPrice" :precision="2" :step="0.1" :max="1000" />
      </el-form-item>
      <el-form-item label="购买价格" :label-width="formLabelWidth">
        <el-input-number v-model="deepCloneOrder.dropShippingPrice" :precision="2" :step="0.1" :max="1000" />
      </el-form-item>
      <el-form-item label="优惠" :label-width="formLabelWidth">
        <el-input-number v-model="deepCloneOrder.dropShippingDiscountPrice" :precision="2" :step="0.1" :max="1000" />
      </el-form-item>
      <el-form-item label="代发备注" :label-width="formLabelWidth">
        <el-input v-model="deepCloneOrder.dropShippingRemark" placeholder="代发备注"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateOrder">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script lang="ts" setup>
// 导入三方
import { onUpdated, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import _ from 'lodash' // 显式导入 Lodash

// 导入共享变量
import { dialogOrderUpdateVisible } from '@/js/order/shared';
import { getOrders } from '@/js/order/shared';
import { pddProductTypeOptions, pddProductColorOptions, pddOrderStatusOptions, pddExpressCompanyOptions, pddIsBlackListOptions, dropShippingPlatformOptions } from '@/js/order/shared';
import { formLabelWidth } from '@/js/order/shared'; 

// 整理父组件, 传来的数据
const props = defineProps({
  order: Object,
});

console.log("111111111111111= 加载父组件就加载 子组件了")
const deepCloneOrder = ref(_.cloneDeep(props.order));

// 定义变量


// 界面更新时候执行
onUpdated(() => {
  if (dialogOrderUpdateVisible.value) {
    console.log("子组件, 界面时执行。。。。。。。。。")
    // 进行父组件，传递参数, 深拷贝
    deepCloneOrder.value = _.cloneDeep(props.order)  //可用，但报错：“_”指 UMD 全局，但当前文件是模块。请考虑改为添加导入。 ts-plugin(2686)
    // const deepCloneOrder = reactive(_.cloneDeep(props.order))  // 实际用途同上。可用，但报错：“_”指 UMD 全局，但当前文件是模块。请考虑改为添加导入
    
    console.log("父组件传递 Order:", props.order);
    console.log("深拷贝 Order:", deepCloneOrder.value);
  }
})


// 修改订单方法
const updateOrder = async () => {
  try {
    var jsonData = {
      pddOrderId: deepCloneOrder.value.pddOrderId,
      pddOrderTime: deepCloneOrder.value.pddOrderTime,
      pddOrderPrice: deepCloneOrder.value.pddOrderPrice,
      pddProductType: deepCloneOrder.value.pddProductType,
      pddProductColor: deepCloneOrder.value.pddProductColor,
      pddOrderStatus: deepCloneOrder.value.pddOrderStatus,
      pddBuyerInfo: deepCloneOrder.value.pddBuyerInfo,
      pddExpressCompany: deepCloneOrder.value.pddExpressCompany,
      pddExpressId: deepCloneOrder.value.pddExpressId,
      pddIsBlackList: deepCloneOrder.value.pddIsBlackList,
      pddRemark: deepCloneOrder.value.pddRemark,
      // 代发相关
      dropShippingPlatform: deepCloneOrder.value.dropShippingPlatform,
      dropShippingOrderId: deepCloneOrder.value.dropShippingOrderId,
      dropShippingOrderTime: deepCloneOrder.value.dropShippingOrderTime,
      dropShippingFactoryName: deepCloneOrder.value.dropShippingFactoryName,
      dropShippingRealPrice: deepCloneOrder.value.dropShippingRealPrice,
      dropShippingPrice: deepCloneOrder.value.dropShippingPrice,
      dropShippingDiscountPrice: deepCloneOrder.value.dropShippingDiscountPrice,
      dropShippingRemark: deepCloneOrder.value.dropShippingRemark,
    }
    const response = await axios.put('api/orders', jsonData); // 替换为实际的 API 地址
    console.log('请求: api/orders, 数据: ', jsonData);
    ElMessage('修改成功');
    dialogOrderUpdateVisible.value = false; // 关闭窗口
    await getOrders(); // 刷新数据
  } catch (error) {
    console.error('修改失败: ', error);
    ElMessage('修改失败')
  }
};

</script>
