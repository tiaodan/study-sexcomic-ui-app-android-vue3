<!-- 注册界面 -->
<!-- 注册界面
- 第一行 返回按钮 + 注册文字
- 第1.5行：错误提示文字
- 第二行：用户名 输入框
- 第三行：密码框 输入框 + 显示密码按钮
- 第4行：密码再确认输入框 + 显示密码按钮
- 第5行：接受协议按钮
- 第6行：注册按钮 （磨角） 
-->

<template>
  <!--  第一行 返回按钮 + 登录文字 -->
  <van-nav-bar
    title="注册"
    left-text="返回"
    left-arrow
    @click-left="goBack"
  > 
  </van-nav-bar>

  <!-- form表格 -->
  <van-form @submit="onRegister"> 
    <!-- title="注册" 加上这个,做上角会显示文字 -->
    <van-cell-group  inset>
      <!-- 用户名 -->
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
      </van-field>
      <!-- 密码 -->
      <van-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        name="password"
        label="密码"
        placeholder="密码"
        :right-icon="showPassword ? 'eye-o' : 'closed-eye' "
        :rules="[{ required: true, message: '请填写密码' }]"
        @click-right-icon="togglePassword"
      >
      </van-field>
      <!-- 确认密码 -->
      <van-field
        v-model="rePassword"
        :type="showRePassword ? 'text' : 'password'"
        name="rePassword"
        label="确认密码"
        placeholder="再次输入密码"
        :right-icon="showRePassword ? 'eye-o' : 'closed-eye' "
        :rules="[
          { required: true, message: '请填写密码' },
          { validator: validateRePassword, message: '两次密码输入不一致' }
        ]"
        @click-right-icon="toggleRePassword"
      >
      </van-field>

      <!-- 同意协议 -->
      <van-field name="agree" >
        <template #input>
          <van-checkbox v-model="checked" shape="square">
            我已阅读并同意
            <span @click="goAgreement" style="color: #1989fa">《用户协议》</span>
          </van-checkbox>
        </template>
      </van-field>

      <!-- 注册按钮 -->
      <van-button round block type="primary" native-type="submit" :disabled="!checked">注册</van-button>
    </van-cell-group>

  </van-form>
</template>


<script setup>
// 导入三方
// 导入ref
import {ref} from 'vue'
import {showToast} from 'vant'
import axios from 'axios'  // 发请求用, axios 不能带中括号

// 导入router对象
import {useRouter} from 'vue-router'
const router = useRouter()

// 导入自己的
import { API_IP } from '@/js/order/shared'  // 共享的全局变量

// 变量
const username = ref('')
const password = ref('')
const rePassword = ref('')  // 再次确认
const token = ref('')  // token
const showPassword = ref(false)  // 是否显示密码-第1个密码框, 默认false
const showRePassword = ref(false)  // 是否显示密码-再次确认密码框, 默认false
const checked = ref(true)  // 是否同意协议, 默认false -> true,省的用户勾选
const errorMsg = ref('错误消息')

// 方法
// 方法：返回上一级
const goBack = () => {
  router.back();  // 等价于 history.go(-1)
}

// 方法：显示密码
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 方法：显示密码 - 再次确认密码框
const toggleRePassword = () => {
  showRePassword.value = !showRePassword.value
}

// 方法：登录
/**
 * 思路：
 * 1 获取用户名、密码
 * 2 请求后台，判断用户名、密码是否正确
 * 3 如果正确，缓存数据，跳转到首页
 */
const onRegister = async() => {
  // 1 获取用户名、密码
  console.log('注册, 输入的用户名：', username.value, '密码：', password.value)

  try {
    // 2 请求后台，判断用户名、密码是否正确。
    // 测试时，response 返回数组
    var jsonData = {
      username: username.value,
      password: password.value
    }
    const response = await axios.post(API_IP+'/users', jsonData);
  
    // 3 如果正确，缓存数据，跳转到首页
    // 多判断一次：response.data。为了防止返回异常数据，空指针错误
    // console.debug('response: ', JSON.stringify(response))  // debug打印
    // console.debug('response.status == 200: ', response.status == 200)  // debug打印
    // console.debug('response.data: ', response.data) // debug打印
    // console.debug('response.data.length: ', response.data.length) // debug打印
    // 返回 { "id": 3, "username": "wangwu", "password": "123456"}
    if (response.status == 201 && response.data && response.data.id ) {
      showToast('注册成功, 请登录')

      goBack()  // 跳转 上一层页面,还可以用 router.push('/xxx')方式
    } else {
      showToast('注册失败, 用户名或密码错误')
    }
  } catch(error) {
    console.error('注册, 出现异常: ', error);
    showToast('注册失败，请稍后重试')
  }
}

// 方法：验证确认密码
const validateRePassword = (value) => {
  return value === password.value
}
</script>