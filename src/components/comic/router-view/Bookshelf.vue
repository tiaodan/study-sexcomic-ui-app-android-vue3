<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="漫画" name="comic">
      <!-- 子模块 -->
       <ComicGrid :comics="comicList" :onSelect="handleSelect" />
    </van-tab>
    <van-tab title="小说" name="fiction">小说</van-tab>
    <van-tab title="动画" name="cartoon">动画</van-tab>
  </van-tabs>
</template>

<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue'  
import { useRouter } from 'vue-router';
import axios from 'axios';

// 导入自己写的子模块
import ComicGrid from './small/ComicGrid2Col.vue';
import { API_IP } from '@/js/order/shared';  // 导入API_IP

// 初始化
const activeName = ref('comic')
const router = useRouter();

// ----------  函数  start ----------
const comicList = ref([])  // 漫画列表数据
// 加载页面时 - 请求数据
onMounted( async() => {
  try {
    const response = await axios.get(API_IP + '/shelfComicList')  // 返回数组,方法名写async 才能用await
    comicList.value = response.data // 赋值给 comicList
    console.log('获取书架/comicList 成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('get 书架/comicList 失败: ', error);
  }
});

// 选择漫画时触发的事件
const handleSelect = (comic) => {
  console.log('选择漫画: ', comic);
  // 跳转页面
  router.push('/comic/chapterView');
};
// ----------  函数  end ----------
</script>