<template>
	
	<!-- 
		布局：
		- #### 上：tab标签。固定在顶部，不滚动
		- #### 下：tab具体内容，可滚动
	-->
	<van-tabs v-model:active="activeName" swipeable>
	
		<!-- #### 标签：漫画 -->
		<van-tab title="漫画" name="comic">
			<!-- 子模块 -->
			<div class="class-grid">
				<ComicGrid :comics="comicList" :onSelect="handleSelect" />
			</div>
		</van-tab>
		
		<!-- #### 标签：小说 -->
		<van-tab title="小说" name="fiction">
      11
		</van-tab>
		
		<!-- #### 标签：动画 -->
		<van-tab title="动画" name="cartoon">
      11
		</van-tab>
	</van-tabs>
</template>

<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue'  
import { useRouter } from 'vue-router';
import axios from 'axios';

// 导入自己写的子模块
import ComicGrid from '@/components/comic/public/grid/ComicGrid2Col.vue';
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

<style scoped lang="less">
// -- 类选择器

// -- 网格布局相关
.class-grid {
	// 50px -》footabar高度   -> var(--vant-footbar-height)
	// 44px -> tab标签栏高度  -> var(--vant-tab-height-line)
	height: calc(100vh - var(--safe-area-inset-top) - var(--safe-area-inset-bottom) - var(--vant-footbar-height) - var(--vant-tab-height-line) );  
	overflow-y: auto;  // 可滚动
}
</style>