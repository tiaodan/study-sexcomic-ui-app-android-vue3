<!-- 测试页面 -->
<template>
  <van-button @click="onClick">跳转章节</van-button>
</template>

<script setup>
// -- 导入第三方
import { useRouter } from 'vue-router';          // 导入vue router对象

// -- 初始化
const router = useRouter();

// -- 函数
const onClick = () => {
  router.push('/chapter')  // 跳转 chapter页面
}
</script>

