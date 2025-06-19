<!-- 父组件 -->
<template>
  <!-- <div>我是爸爸</div> -->
  <FootBar />
</template>

<script setup>
// 导入子组件
import FootBar from './components/comic/FootBar.vue';
</script>

<style lang="less">
  body {
    // font-size: 16px;  // 先不设置，看文字大小多少，默认14ox
    // background-color: transparent;  // 完全透明
    padding-top: 24px;  // body整理距离上面24px
    background-color: #f8f8f8;  // app常用背景颜色 - 浅灰色
    -webkit-font-smoothing: antialiased; // 防止文字锯齿
  }
</style>
