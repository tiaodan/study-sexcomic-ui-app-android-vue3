<!-- 第1行，头像、用户名框 -->
<template>
  <van-cell-group inset>
    <van-cell :title="username || '未登录'" center>
      <!-- 左侧头像 -->
      <template #icon>
        <van-image
          round
          width="40"
          height="40"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </template>

      <!-- 右侧登录按钮 -->
      <template #right-icon>
        <van-button
          size="small"
          round
          type="primary"
          @click="goLogin"
        >
          登录
        </van-button>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('') // 模拟未登录
const router = useRouter()

const goLogin = () => {
  router.push('/setting/login')
}
</script>


<!-- 
v0.2 写法
<template>
  <div class="user-info-container">
    <img class="avatar" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="头像" />

    <div class="username">{{ username || '未登录' }}</div>

    <van-button round size="small" type="primary" @click="goLogin">
      登录
    </van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')  // 模拟未登录，设置为非空就是已登录状态
const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.user-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.username {
  flex: 1;
  font-size: 16px;
  color: #333;
}
</style> -->



<!-- 
v0.1 写法
<template>
  <van-row>
    <van-col span="8"><van-icon name="user" /></van-col>
    <van-col span="8"><span class="username">{{username}}</span></van-col>
    <van-col span="8">
      <van-button round type="success" size="small" to="/setting/login">
        圆形按钮
      </van-button>
    </van-col>
  </van-row>

</template>

<script setup>
var username = 'UserName'
</script> -->