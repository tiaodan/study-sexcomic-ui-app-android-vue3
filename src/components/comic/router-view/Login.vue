<!-- 登录页面 -->
<!-- 登录界面
- 第一行 返回按钮 + 登录文字
- 第1.5行：错误提示文字
- 第二行：用户名 输入框
- 第三行：密码框 输入框 + 显示密码按钮
- 第4行：接受协议按钮
- 第5行：登录按钮 （磨角）
- 第6行：左注册按钮，右忘记密码按钮" 
-->
<template>
  <!--  第一行 返回按钮 + 登录文字 -->
  <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="goBack"
  > 
  </van-nav-bar>


  <!-- form表格 -->
  <van-form @submit="onLogin"> 
    <van-cell-group title="账号密码登录" inset>
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

      <!-- 登录按钮 -->
      <van-button round block type="primary" native-type="submit" >登录</van-button>

      <!-- 注册按钮-左对齐 + 忘记密码按钮=右对齐 space-between 表示左右对齐 -->
      <van-row justify="space-between" style="font-size: 14px;margin-top:10px;">
        <van-col>
          <router-link to="/setting/register">立即注册</router-link>
        </van-col>
        <van-col>
          <router-link to="/setting/forget">忘记密码</router-link>
        </van-col>
      </van-row>
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
const token = ref('')  // token
const showPassword = ref(false)  // 是否显示密码, 默认false

// 方法
// 方法：返回上一级
const goBack = () => {
  router.back();  // 等价于 history.go(-1)
}

// 方法：显示密码
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 方法：登录
/**
 * 思路：
 * 1 获取用户名、密码
 * 2 请求后台，判断用户名、密码是否正确
 * 3 如果正确，缓存数据，跳转到首页
 */
const onLogin = async() => {
  // 1 获取用户名、密码
  console.log('用户名：', username.value, '密码：', password.value)

  try {
    // 2 请求后台，判断用户名、密码是否正确。
    // 测试时，response 返回数组
    const response = await axios.get(API_IP+'/users', {
      params: {
        username: username.value,
        password: password.value
      }
    });
  
    // 3 如果正确，缓存数据，跳转到首页
    // 多判断一次：response.data。为了防止返回异常数据，空指针错误
    // console.debug('response: ', JSON.stringify(response))  // debug打印
    // console.debug('response.status == 200: ', response.status == 200)  // debug打印
    // console.debug('response.data: ', response.data) // debug打印
    // console.debug('response.data.length: ', response.data.length) // debug打印
    if (response.status == 200 && response.data && response.data.length > 0 ) {
      showToast('登录成功')

      // 缓存数据,有值才存。不写value 无法赋值
      username.value = response.data[0].username
      token.value = response.data[0].token
      console.debug("登录成功, 返回username: ", username.value, "token: ", token.value, "存入缓存localStorage")
      if (username.value  && token.value) {
        localStorage.setItem('username', username.value)
        localStorage.setItem('token', token.value)
      } else {
        console.error('用户名或token为空, 存入缓存localStorage失败')
      }

      router.push('/setting')  // 跳转 我的页面
    } else {
      showToast('登录失败, 用户名或密码错误')
    }
  } catch(error) {
    console.error('登录, 出现异常: ', error);
    showToast('登录失败，请稍后重试')
  }
}

</script>