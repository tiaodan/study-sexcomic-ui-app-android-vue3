<!-- 自定义显示列数,默认一行显示4个 -->
<!-- :border=true,每个grid 四周就有边界. to 指向router的跳转链接 -->

<!-- v0.2 写法，grid弄成通用组件 -->
<template>
  <van-grid :border="true" :column-num="3">
    <van-grid-item 
      v-for="(item, index) in comics" 
      :key="index" 
      @click="onSelect(item)" 
    >
      <van-image :src="item.cover" />
      <div class="grid-item-comic-name">{{ item.name }}</div>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
defineProps({
  // 父组件传入的漫画列表数据
  comics: Array, 
  onSelect: Function // 选择漫画时触发的事件, -> 父组件传来的方法
});
</script>
<!-- v0.2 end -->

<!-- 
v0.1写法 页面自己请求数据，自己渲染
<template>
  <van-grid :border="true" :column-num="2">
    <van-grid-item v-for="(item, index) in comicList" :key="index" to="/comic/chapterView">
      <van-image :src="item.cover" />
      <div class="grid-item-comic-name">{{ item.name }}</div>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue';
import axios from 'axios';

// 导入自己写的
import { API_IP } from '@/js/order/shared';

// 漫画列表数据
const comicList = ref([
  // // 测试数据
  // {
  //   name: 'name1',
  //   cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
  // },
  // {
  //   name: 'name2', 
  //   cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
  // },
  // {
  //   name: 'name3',
  //   cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
  // }
]);

// 加载页面时 - 请求
onMounted( async() => {
  try {
    const response = await axios.get(API_IP + '/shelfComicList')  // 返回数组,方法名写async 才能用await
    comicList.value = response.data // 赋值给 comicList
    console.log('获取书架/comicList 成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('get 书架/comicList 失败: ', error);
  }
});
</script> -->

<!-- scoped 只应用于局部，不过不写，整个app、其它vue组件都应用 -->
<style scoped>
/* 只能用. 类修改才生效 如果用 div { margion-top: 6px} 不生效 */
.grid-item-comic-name {
  margin-top: 10px;
}
</style>