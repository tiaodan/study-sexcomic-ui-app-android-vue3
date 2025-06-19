<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="漫画" name="comic">
      <!-- 子模块 -->
       <ComicGrid />
    </van-tab>
    <van-tab title="小说" name="fiction">小说</van-tab>
    <van-tab title="动画" name="cartoon">动画</van-tab>
  </van-tabs>
</template>

<script setup>
// 导入三方工具
import { ref } from 'vue'  

// 导入自己写的子模块
import ComicGrid from './bookshelf/ComicGrid.vue';


const activeName = ref('comic')
</script>