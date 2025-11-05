<!-- 父组件 -->
<template>
  <!-- <div>我是爸爸</div> -->
  <!-- 开屏广告 -->
  <!-- <StartAd /> -->
   <!-- 这个开屏广告，cover也会截取部分屏幕 -->
  <SplashAd />
  
  <!-- 主页面 -->
  <SubAppComic />
	<!-- <Test /> -->
</template>

<script setup>
// -- 导入第三方
import { onMounted } from 'vue';                        // 生命周期函数
import { Capacitor } from '@capacitor/core';            // 打包工具
import { SafeArea } from 'capacitor-plugin-safe-area';  // 安全区

// 导入子组件
import StartAd from '@/components/comic/ad/StartAd.vue';          // 广告 UI
import SplashAd from '@/components/comic/ad/SplashAd.vue';        // 广告 UI
import SubAppComic from '@/components/comic/SubAppComic.vue';  // 子项目 UI入口
import Test from '@/components/comic/test/Test.vue';

// -- 函数
// -- 生命周期函数
/*
	绑定时：
	要做的事：
	- 判断是否是 手机app环境 (通过判断 非web环境)
	- 获取安全区域 (顶部状态栏、底部手势条) - 通过 capacitor-plugin-safe-area
	- 自定义css变量，让全局css -》style.css用
*/
onMounted( async() => {
	// -- 判断是否是 手机app环境 (通过判断 非web环境)
	if (Capacitor.getPlatform() !== 'web') {	
		// -- 获取安全区
		console.log('非web环境，获取安全区, platform==', Capacitor.getPlatform());
		const { insets } = await SafeArea.getSafeAreaInsets();
		console.log('top = ', insets.top);
		console.log('bottom = ', insets.bottom);
		// 自定义css变量，top bottom 
		document.documentElement.style.setProperty('--safe-area-inset-top', `${insets.top}px`);
		document.documentElement.style.setProperty('--safe-area-inset-bottom', `${insets.bottom}px`);
	}
})
</script>

