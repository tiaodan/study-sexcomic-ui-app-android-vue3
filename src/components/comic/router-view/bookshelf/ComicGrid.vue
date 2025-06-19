<!-- 自定义显示列数,默认一行显示4个 -->
<template>
  <van-grid :border="false" :column-num="3">
    <van-grid-item >
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg" />
      <div>name</div>
    </van-grid-item>
    <van-grid-item >
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg" />
      <div>name</div>
    </van-grid-item>
    <van-grid-item >
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
      <div>name</div>
    </van-grid-item>
  </van-grid>
</template>