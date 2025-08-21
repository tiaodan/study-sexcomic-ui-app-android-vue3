<!-- 漫画章节浏览页面 -->
<!-- 需要全屏显示 -->
<template>


   <!--  顶部 返回按钮 + 文字，点击图片触发 -->
  <van-nav-bar
    class="navBar"
    title="第3话 / 更新至242话"
    left-text="返回"
    left-arrow
    v-show="shwoNavBar"
    @click-left="goBack"
  > 
  </van-nav-bar>

  <!-- @click="toggleNavBar" 放在div里，防止没图片时，不显示 顶部的tabbar（目的：返回） -->
  <div class="comic-fullscreen" @click="toggleNavBar" >
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(img, index) in imageList" :key="index" class="comic-image">
        <van-image
          :src="img"
          width="100%"
          fit="contain"
          lazy-load
          @error="onError(index)"
        />
      </div>
    </van-list>
  </div>

</template>

<script setup>
// 导入第三方
import { ref} from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { StatusBar, Style} from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'  // 导入Capacitor对象
import axios from 'axios'
// import { Plugins } from '@capacitor/core';  // 控制底部手势导航条,错误写法，capacitorv2.0 写法，应该用3.0
import { NavigationBar } from '@squareetlabs/capacitor-navigation-bar'


import {useRouter} from 'vue-router'    // 导入router对象
import { API_IP } from '@/js/order/shared'

// 初始化
const router = useRouter()  // router对象

const imageList = ref([])

const allImages = [
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986850.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986841.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986888.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986818.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986968.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986980.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986983.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986940.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/17374898695.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748986935.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987094.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987027.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987036.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987049.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987128.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/17374898715.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/17374898717.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987116.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987187.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987274.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987299.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987288.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987272.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987228.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987386.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987310.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987341.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987316.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/173748987391.jpg',
  // 'https://img.ymmh01.top/cartoon-content/1267/12/17374898734.jpg',
  // ... 一共20张图片，真实使用时可能是 file:// 本地路径
]

const loading = ref(false)
const finished = ref(false)
const pageSize = 5
let loadedCount = 0

const onLoad = () => {
  setTimeout(() => {
    const next = allImages.slice(loadedCount, loadedCount + pageSize)
    imageList.value.push(...next)
    loadedCount += next.length
    loading.value = false
    if (loadedCount >= allImages.length) {
      finished.value = true
    }
  }, 500)
}

const onError = (index) => {
  console.warn('加载失败:', imageList.value[index])
}

// const { NavigationBar } = Plugins;   // 控制底部手势导航条.错误写法，capacitorv2.0 写法，应该用3.0 -》 注释掉这一行

// 进入漫画页时设置透明状态栏 + 白色文字
onMounted( async() => {
  // 1 状态栏相关
  console.log('进入漫画页, onMounted -》 , 是否== web 环境=', Capacitor.getPlatform() == 'web')
  // Capacitor.getPlatform() 有3种返回值：ios / android / web
  if (Capacitor.getPlatform() !== 'web') {  // 或者Capacitor.isNativePlatform() 做判断。  if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') ？-》没试过
    console.log('进入漫画页，隐藏底部导航条, ! web 环境')
    console.log('进入漫画页，隐藏状态栏, ! web 环境')
    // StatusBar.setBackgroundColor({ color: '#00000000' })  // 不用了，只控制显示隐藏，要不容易看不清状态栏
    // StatusBar.setStyle({ style: Style.Light }) // 黑背景上显示白字 // 不用了，只控制显示隐藏，要不容易看不清状态栏
    // 选项：隐藏状态栏（沉浸式） - 这个最有用
    StatusBar.hide()  // 要不要await?
    await NavigationBar.hide();  // 要不要await? 隐藏底部导航条
  }

  // 2 请求数据
  try {
    const response = await axios.get(API_IP + '/chapterImgs')
    for (const item of response.data) {
      // console.log('请求到的图片数据: ', item.img)
      imageList.value.push(item.img)  // 添加到 imageList
    }
  }catch (error) {
    console.error('请求chapter 图片数据失败: ', error)
  }
})

// 离开漫画页时恢复状态栏样式
onUnmounted( async() => {
  console.log('进入漫画页, onUnmounted -》 , 是否== web 环境=', Capacitor.getPlatform() == 'web')
  // 状态栏判断
  if (Capacitor.getPlatform() !== 'web') {  // 或者Capacitor.isNativePlatform() 做判断。  if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') ？-》没试过
    console.log('离开漫画页，恢复状态栏样式, ! web 环境')
    // StatusBar.setBackgroundColor({ color: '#ffffff' }) // 或你默认的底色 // 不用了，只控制显示隐藏，要不容易看不清状态栏
    // StatusBar.setStyle({ style: Style.Dark }) // 黑字 // 不用了，只控制显示隐藏，要不容易看不清状态栏
    // 选项：隐藏状态栏（沉浸式） - 这个最有用
    await StatusBar.show()
    await NavigationBar.show();    // 恢复底部导航条
  }
})

// 控制顶部导航栏显示隐藏
const shwoNavBar = ref(false)  // 默认隐藏
const toggleNavBar = () => {
  shwoNavBar.value = !shwoNavBar.value
  // console.log("点击了图片, 顶部导航栏显示状态shwoNavBar : ", shwoNavBar.value)
}
const goBack = () => {
  // 返回上一页
  router.back();  // 推荐用这个。等价于 history.go(-1) == window.history.back()
}

</script>

<style scoped>
/* 设置全屏 */
.comic-fullscreen {
  /* app常用背景颜色 - 浅灰色，不用这个变量，App.vue 已经有了背景色 。 */
  /* 不知道为什么，加上background 就不显示底部footbar了。明明App.vue已经设置background了 */
  /* background: #f8f8f8;   */
  background: black;
  position: fixed;  /* 必须用fixed 才能全屏(基于viewport固定)，其它定位属性不行absolute / relative / stick(默认)：*/
  inset: 0; /* 只搭配定位元素使用，表示 定位后的偏移量 top，等价于： 上 右 下 左。0表示0倍*/
  z-index: 999;
  /* ✅ 加这个 overflow-y 才能滚动漫画内容 */
  overflow-y: auto;;

  padding: 0;   /*  去除内边距 inset 和它不冲突, 加上更安全,作用于上下左右 */
  margin: 0;    /*  去除外边距 inset 和它不冲突, 加上更安全,作用于上下左右   */

  /* 通过设置高度，可能-能避免滚动条 */
  /* (全面屏)留出底部 home 键横线的高度，避免被遮挡 */
  /* padding-bottom: 100px !important; */
  /* margin-bottom: 100px ; */
  /* margin-bottom: max(env(safe-area-inset-bottom, 34px));  */
}

.comic-image {
  /* padding: 0;  对于无缝衔接-无效 */
  /* margin: 0; 对于无缝衔接-无效 */
  /* 移除这个，让图片无缝衔接 */
  /* margin-bottom: 8px;  */
  line-height: 0;  /* ✅ 防止 img 之间出现 1px 间隙 -- 这个其实是最有效的。表示行间距。1 填文字大小倍数，如1.5 3，2- 填像素 px， */ 
}

/* 设置z-index ,比图片更高，要不不显示,van-nav-bar 通过标签设置不生效，为什么？ */
.navBar {
  z-index: 1000; /* 确保在图片上方 */
}

/* 网页端强制隐藏所有滚动条- 下面是最管用代码 */
/* scrollbar-width: none !important; Firefox */
/* -ms-overflow-style: none !important; IE/Edge */
/* * {
  scrollbar-width: none !important;        
  -ms-overflow-style: none !important;     
} */

/* 
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
} */

/* 整个滚动条 -变蓝色-test */
.comic-fullscreen::-webkit-scrollbar {
  width: 8px;               /* 垂直滚动条宽度 */
  height: 8px;              /* 水平滚动条高度 */
}

/* 滚动条轨道 */
.comic-fullscreen::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 滚动条滑块（拖动部分）*/
.comic-fullscreen::-webkit-scrollbar-thumb {
  background: #1e90ff;      /* 蓝色 */
  border-radius: 4px;
}

/* 鼠标悬停时滚动条滑块变色 */
.comic-fullscreen::-webkit-scrollbar-thumb:hover {
  background: #007bff;
}
</style>
