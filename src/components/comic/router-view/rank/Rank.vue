<template>
  <van-row>
    <can-col span="6">
      <!-- 左侧：Vant Sidebar -->
      <van-sidebar v-model:active="activeIndex" @change="onSidebarChange">
        <van-sidebar-item title="日榜" />
        <van-sidebar-item title="周榜" />
        <van-sidebar-item title="月榜" />
      </van-sidebar>
    </can-col>
    
    <!-- 右侧：子组件 -->
    <can-col span="18">
      <List />
    </can-col>
  </van-row>
</template>

<script setup>
  import List from './List.vue'  // 导入子组件

</script>

