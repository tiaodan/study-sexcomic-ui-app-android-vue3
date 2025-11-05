<!-- 
  目的：用于整个界面显示。不是作为弹出窗口内容
  功能：显示章节
  结构： 
      - 整体高度：除了上下安全区
      - 上：导航栏
      - 下：列表
-->>
<template>
  <div class="class-all-view">
    <!-- #### 上：导航栏。不滚动 -->
    <!--  顶部 返回按钮 + 文字，一直显示 -->
    <van-nav-bar
      class="navBar"
      title="目录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    > 
    </van-nav-bar>

    <!-- #### 下：列表。滚动 -->
    <van-list
      :loading="false"
      :finished="true"
      finished-text="没有更多了"
    >
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="list-item"
        @click="onClickChapter(item)" 
      >
        <!-- width 如果用百分比的话，只设置 width 就行，不用设置 height -->
        <van-image
          :src="item.image"
          width="30%"
          fit="cover"
          radius="8"
          @click="onClickChapter"
        />
        <div class="info" @click="onClickChapter">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </van-list>

  </div>
</template>

<script setup >
// -- 导入第三方
import { ref } from 'vue';                // vue框架
import { useRouter } from 'vue-router'    // 导入vue-router对象。用于路由调整，返回

import { showToast } from 'vant';         // vant框架

// -- 初始化
const router = useRouter()       // router对象。用于路由调整，返回

// 列表加载相关
const loading = ref(false)
const finished = ref(true)

// 假的数据-test用 - delete -------------------
const items = ref(
  [
    {
      "title": "第1项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "328b"
    },
    {
      "title": "第2项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "54d8"
    },
    {
      "title": "第3项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "0736"
    },
    {
      "title": "第4项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "fa51"
    },
    {
      "title": "第5项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "e983"
    },
    {
      "title": "第6项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "f88c"
    },
    {
      "title": "第7项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "6b89"
    },
    {
      "title": "第8项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "b02a"
    },
    {
      "title": "第9项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "6323"
    },
    {
      "title": "第10项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "72dc"
    },
    {
      "title": "第11项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "9e9a"
    },
    {
      "title": "第12项",
      "desc": "这是一段描述信息",
      "image": "https://img.yzcdn.cn/vant/cat.jpeg",
      "id": "130e"
    }
  ]
); 


// -- 函数
// 返回 --
const goBack = () => {
  // 返回上一页
  router.back();  // 推荐用这个。等价于 history.go(-1) == window.history.back()
}

// 点击章节 --
const onClickChapter = (item) => {
  console.log('点击章节：  ', item);
  router.push('/comic/chapterView'); // 跳转到chapterView
}
</script>


<style scoped lang="less">
// -- 类选择器

// -- 整体布局相关
.class-all-view {
  // 除去安全区+footbar
  height: calc( 100vh - var(--safe-area-inset-top) - var(--safe-area-inset-bottom) - var(--vant-footbar-height) ); 
  display: flex;
  flex-direction: column;
}

// -- 列表相关
// vant框架提供的标签 <van-list>，可以直接使用 .van-list调用
.van-list {
  flex: 1;
  overflow-y: auto;
}

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