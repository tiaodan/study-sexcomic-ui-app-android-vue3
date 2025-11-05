<!-- 子UI入口 - 漫画 -->
<template>

	<!-- 页面内容 -->
	<div class="content">
		<router-view />
	</div>

	<!-- 底部导航栏 -->
	<van-tabbar v-model="active" >
		<van-tabbar-item icon="home-o"    name="home"      to="/home">      首页</van-tabbar-item>
		<van-tabbar-item icon="search"    name="search"    to="/search">    搜索</van-tabbar-item>
		<van-tabbar-item icon="notes-o"   name="bookshelf" to="/bookshelf"> 书架</van-tabbar-item>
		<van-tabbar-item icon="user-o"    name="my"        to="/setting">   我的</van-tabbar-item>
		<van-tabbar-item icon="setting-o" name="test"      to="/test">      测试</van-tabbar-item>
	</van-tabbar>

</template>

<!--  ------------------------------------------------------------  -->
<script setup>
// -- 导入第三方
import { ref } from 'vue';

// -- 初始化
const active = ref('home');   // 当前footbar 选中的标签
</script>

<!--  ------------------------------------------------------------  -->
<style scoped lang="less">
// -- 类选择器
// RouterView 路由界面。此界面不设置滚动，让子控件设置滚动。因为有的子控件需要滚动，有的不需要
.content {
	margin-top: var(--safe-area-inset-top);                  
	margin-bottom: calc( var(--safe-area-inset-bottom) + var(--vant-footbar-height) );       // 手势条栏 + vant-footbar高度 50px
	height: calc(100vh - var(--safe-area-inset-top) - var(--safe-area-inset-bottom) - var(--vant-footbar-height) ); // - (安全区-电量状态栏 + 安全区-手势条 + footbar高度50px)
	
	// 以下不用 --
	//overflow-y: auto;  // A路由界面 只写高度，不写滚动，滚动让 路由界面内 子控件来控制。
	// 因为子控件,有的全部滚动,有的部分滚动。  比如：Home.vue界面 tab标签栏不滚动，标签内容需要滚动。My.vue 全部都不用滚动
  

}
</style>

