
<!-- 写法3：用router 常用 -->
<template>
  <div class="app-container">
    <!-- 页面内容 -->
    <router-view />

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" >
      <van-tabbar-item icon="home-o" name="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="notes-o" name="bookshelf" to="/bookshelf">书架</van-tabbar-item>
      <van-tabbar-item icon="setting-o" name="setting" to="/setting">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref('home')
</script>


<!-- 
写法2：ref(name属性) 指定默认显示标签页
<template>
  <div class="app-container">
    <van-tabbar v-model="active" >
      <van-tabbar-item icon="home-o" name="home" >首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="search" >搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="friends" >朋友</van-tabbar-item>
      <van-tabbar-item icon="setting-o" name="settings" >设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref("home")
</script> -->

<!-- 
写法1 -- 直接ref(0) 索引
<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">搜索</van-tabbar-item>
    <van-tabbar-item icon="friends-o">朋友</van-tabbar-item>
    <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'

// 当前选中的 tab 索引
const active = ref(0)

</script> -->