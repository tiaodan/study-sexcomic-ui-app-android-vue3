<!-- rank 右侧div，RankComicShow，显示 每天、每周、每月排行 img 流 -->
<!-- 默认先最多显示5个 -->

<!-- van-list @load="onLoad" 不要了，因为它还需要父组件传方法 -->
<!-- v0.3 打算用siderbar + van-list 实现，van-list 是可复用组件 -->
<template>
  <van-list
    :loading="false"
    :finished="true"
    finished-text="没有更多了"
  >
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="list-item"
      @click="onSelect(item)" 
    >
      <van-image
        :src="item.image"
        width="80"
        height="100"
        fit="cover"
        radius="8"
      />
      <div class="info">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </van-list>
</template>

<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue'

const loading = ref(false)
const finished = ref(true)

// 函数
const props = defineProps({
  items: Array, // 父组件传入的列表数据 arr，父组件传了这个，就不用自己 connst items = ref([]) 了
  onSelect: Function  // 父组件传入的加载函数
})

onMounted(() => {
  console.log('父传的, items: ', JSON.stringify(props.items)); // 打印父组件传入的 items
})
</script>


<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.info {
  margin-left: 10px;
}
.title {
  font-weight: bold;
  margin-bottom: 4px;
}
.desc {
  color: #888;
  font-size: 13px;
}
</style>


<!-- 
v0.2.5 打算用siderbar + van-list 实现,但没实现
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
  >
    <div 
      v-for="(item, index) in items" 
      :key="index" 
      class="list-item"
      @click="onSelect(item)" 
    >
      <van-image
        :src="item.image"
        width="80"
        height="100"
        fit="cover"
        radius="8"
      />
      <div class="info">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </van-list>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([]) // 列表数据
const loading = ref(false)
const finished = ref(false)

// 函数
defineProps({
  items: Array, // 父组件传入的列表数据 arr
  onSelect: Function  // 父组件传入的加载函数
})
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.info {
  margin-left: 10px;
}
.title {
  font-weight: bold;
  margin-bottom: 4px;
}
.desc {
  color: #888;
  font-size: 13px;
}
</style>  -->

<!-- 
v0.2 当前页面，发请求加载。未实现复用组件
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div v-for="(item, index) in items" :key="index" class="list-item">
      <van-image
        :src="item.image"
        width="80"
        height="100"
        fit="cover"
        radius="8"
      />
      <div class="info">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </van-list>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([]) // 列表数据
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  loading.value = true
  // 模拟异步请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      items.value.push({
        title: `第 ${items.value.length + 1} 项`,
        desc: '这是一段描述信息',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      })
    }
    loading.value = false
    if (items.value.length >= 30) {
      finished.value = true
    }
  }, 1000)
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.info {
  margin-left: 10px;
}
.title {
  font-weight: bold;
  margin-bottom: 4px;
}
.desc {
  color: #888;
  font-size: 13px;
}
</style> -->


<!-- 
v 1.0 官方默认写法
<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>

<script setup>
  // 导入第三方
  import { ref } from 'vue';

  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);

  const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        list.value.push(list.value.length + 1);
      }

      // 加载状态结束
      loading.value = false;

      // 数据全部加载完成
      if (list.value.length >= 20) {
        finished.value = true;
      }
    }, 1000);
  };
</script> -->