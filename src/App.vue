<!-- 父组件 -->
<template>
  <!-- <div>我是爸爸</div> -->
  <!-- 开屏广告 -->
  <!-- <StartAd /> -->
   <!-- 这个开屏广告，cover也会截取部分屏幕 -->
  <SplashAd />
  
  <!-- 主页面 -->
  <FootBar />
</template>

<script setup>
// 导入子组件
import StartAd from './components/comic/StartAd.vue';
import SplashAd from './components/comic/SplashAd.vue';
import FootBar from './components/comic/FootBar.vue';
</script>

<style lang="less">
body {
  // font-size: 16px;  // 先不设置，看文字大小多少，默认14ox
  // background-color: transparent;  // 完全透明
  // padding-top: 30px;  // body整体距离上面24px （电池状态栏），之前写的24px，后来发现是24px不遮挡，但紧挨着，不美观
  padding-top: env(safe-area-inset-top); /* iOS/安卓状态栏高度自动适配 */
  background-color: #f8f8f8;  // app常用背景颜色 - 浅灰色
  -webkit-font-smoothing: antialiased; // 防止文字锯齿
}

/* 网页端强制隐藏所有滚动条- 下面是最管用代码 */
* {
  scrollbar-width: none !important;        /* Firefox */
  -ms-overflow-style: none !important;     /* IE/Edge */
}

/* Chrome/Safari 以下好像没管用 */
*::-webkit-scrollbar {
  display: none !important;                
  width: 0px !important;
  height: 0px !important;
  background: transparent !important;
}

*::-webkit-scrollbar-track {
  display: none !important;
}

*::-webkit-scrollbar-thumb {
  display: none !important;
}

*::-webkit-scrollbar-corner {
  display: none !important;
}
/* Chrome/Safari 以下好像没管用 end */


/* 整个滚动条 -变蓝色-test */
// ::-webkit-scrollbar {
//   width: 8px;               /* 垂直滚动条宽度 */
//   height: 8px;              /* 水平滚动条高度 */
// }

// /* 滚动条轨道 */
// ::-webkit-scrollbar-track {
//   background: #f1f1f1;
// }

// /* 滚动条滑块（拖动部分）*/
// ::-webkit-scrollbar-thumb {
//   background: #1e90ff;      /* 蓝色 */
//   border-radius: 4px;
// }

// /* 鼠标悬停时滚动条滑块变色 */
// ::-webkit-scrollbar-thumb:hover {
//   background: #007bff;
// }

</style>
