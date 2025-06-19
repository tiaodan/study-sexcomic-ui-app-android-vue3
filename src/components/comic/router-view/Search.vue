<template>
  <!-- 搜索框 -->
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
  >
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search>

  <!-- grid 书 列表 -->
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

<script setup>
// 导入第三方
import { ref } from 'vue';
import { showToast } from 'vant';

const value = ref('');
const onSearch = (val) => showToast(val);
const onClickButton = () => showToast(value.value);

</script>