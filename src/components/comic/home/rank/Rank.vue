<!-- v0.2 用flex实现， -->
<!-- 注释 左侧：Vant Sidebar  -->
<!-- 注释 右侧：子组件  -->
<template>
	<div style="display: flex; ">
    <div style="width: 25%">
      <van-sidebar v-model="activeIndex" @change="onSidebarChange">
        <van-sidebar-item title="日榜" />
        <van-sidebar-item title="周榜" />
        <van-sidebar-item title="月榜" />
      </van-sidebar>
    </div>

    <div style="flex: 1; overflow-y: auto;">
      <List :items="comicList" :onSelect="handleSelect" />
    </div>
  </div>
</template>

<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue'
import axios from 'axios'

// 导入自己写的
import List from '@/components/comic/home/rank/List.vue'  // 导入子组件
import { API_IP } from '@/js/order/shared'


// 初始化
const activeIndex = ref(0)  // 当前选中的索引
const comicList = ref([])  // 漫画列表数据

// ----------------------------------------  函数  start ----------------------------------------
// 切换榜单触发 请求
const onSidebarChange = async(index) => {
  console.debug('排行榜, 当前选中的索引: ', index);
  // activeIndex.value = index;  // 更新当前选中的索引 - 不用修改，自动就能实现显示样式切换
  console.debug('排行榜, 当前选中的索引 activeIndex: ', activeIndex.value);
  
  try {
    var response;
    switch (index) {
      case 0:
        console.debug('切换到日榜');
        response = await axios.get(API_IP + '/rank')  // 返回数组,方法名写async 才能用await   
        break;
      case 1:
        console.debug('切换到周榜');
        response = await axios.get(API_IP + '/rank_week')  // 返回数组,方法名写async 才能用await
        break;
      case 2:
        console.debug('切换到月榜');
        response = await axios.get(API_IP + '/rank_month')  // 返回数组,方法名写async 才能用await
        break;
      default:
        console.error('未知索引: ', index);
        return;  // 如果索引不在范围内，直接返回
    }

    comicList.value = response.data // 赋值给 comicList
    console.log('排行榜, 切换榜单, index=', index, '获取 成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('排行榜, 切换榜单, index=', index, '获取 失败: ', error);
  }
};

// 选择漫画时触发的事件
const handleSelect = (comic) => {
  // console.log('选择漫画:,这个变量以后可能用的着 ', comic);
  // 跳转页面
  router.push('/comic/chapterView');
};

// 加载页面时 - 请求数据 - 日榜
onMounted( async() => {
  try {
    const response = await axios.get(API_IP + '/rank')  // 返回数组,方法名写async 才能用await
    comicList.value = response.data // 赋值给 comicList
    console.log('排行榜, onMounted,获取日榜 成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('排行榜, onMounted,获取日榜 失败: ', error);
  }
});
// ----------------------------------------  函数  end ----------------------------------------

</script>

<!-- 
v0.1 用van-row van-col实现左右布局 ,父容器设置100vh overflow 实现左侧固定。但是会遮挡底部footbar
<template>
  <van-row style="height: 100vh; overflow: hidden;">
    <van-col span="6">
      注释 左侧：Vant Sidebar 
      <van-sidebar v-model:active="activeIndex" @change="onSidebarChange">
        <van-sidebar-item title="日榜" />
        <van-sidebar-item title="周榜" />
        <van-sidebar-item title="月榜" />
      </van-sidebar>
    </van-col>

    注释 右侧：子组件 
    <van-col span="18" style="height: 100vh; overflow-y: auto;">
        <List />
    </van-col>
  </van-row>
</template>

<script setup>
// 导入三方工具
import { ref } from 'vue'

import List from './List.vue'  // 导入子组件

// 初始化
const activeIndex = ref(0)  // 当前选中的索引

// ----------------------------------------  函数  start ----------------------------------------
const onSidebarChange = (index) => {
  console.log('当前选中的索引: ', index);
  activeIndex.value = index;  // 更新当前选中的索引
  // 可以在这里根据索引加载不同的内容
  // 比如调用子组件的方法，或者更新数据等
};
// ----------------------------------------  函数  end ----------------------------------------

</script>
 -->
