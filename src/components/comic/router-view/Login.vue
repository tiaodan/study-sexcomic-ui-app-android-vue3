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
  <van-form> 
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
        type="showPassword ? 'text' : 'password' "
        name="password"
        label="密码"
        placeholder="密码"
        :right-icon="showPassword ? 'eye-o' : 'closed-eye' "
        :rules="[{ required: true, message: '请填写密码' }]"
        @click-right-icon="togglePassword"
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

      <!-- 登录按钮 -->
      <van-button round block type="primary" native-type="submit">登录</van-button>

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
// 导入ref
import {ref} from 'vue'

// 导入router对象
import {useRouter} from 'vue-router'
const router = useRouter()

// 变量
const username = ref('')
const password = ref('')
const showPassword = ref(false)  // 是否显示密码, 默认false
const checked = ref(false)  // 是否同意协议, 默认false

// 方法
// 方法：返回上一级
const goBack = () => {
  router.back();  // 等价于 history.go(-1)
}

// 方法：显示密码
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const errorMsg = ref('错误消息')
</script>