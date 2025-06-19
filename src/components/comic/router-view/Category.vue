<template>
  <div>
    <!-- 顶部分类标签 -->
    <!-- swipeable  是一个布尔属性，用于控制标签页是否可以左右滑动切换。当设置为 true 时，用户可以通过左右滑动来切换标签页；当设置为 false 时，用户只能通过点击标签来切换 -->
    <!-- 国家 -->
    <van-tabs v-model:active="activeCountry" swipeable>
      <van-tab v-for="item in countries" :title="item" :key="item" />
    </van-tabs>

    <!-- 完结 -->
    <van-tabs v-model:active="activeEnd" swipeable>
      <van-tab v-for="item in ends" :title="item" :key="item" />
    </van-tabs>

    <!-- 收费 -->
    <van-tabs v-model:active="activeCharge" swipeable>
      <van-tab v-for="item in charges" :title="item" :key="item" />
    </van-tabs>

     <!-- 综合 -->
     <van-tabs v-model:active="activeSynthesize" swipeable>
      <van-tab v-for="item in synthesizes" :title="item" :key="item" />
    </van-tabs>

    

    <!-- 漫画列表 -->
    <div class="card-list">
      <van-card
        v-for="comic in comics"
        :key="comic.title"
        :title="comic.title"
        :desc="comic.desc"
        :thumb="comic.image"
        :tag="comic.tag"
      >
        <template #footer>
          <van-icon name="eye" /> {{ comic.views }}人正在看
        </template>
      </van-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeCountry = ref(0);
const activeEnd = ref(0);
const activeCharge = ref(0);
const activeSynthesize = ref(0);
const countries = ['国家', '韩漫', '日漫', '美漫', '国漫'];
const ends = ['全部', '完结', '连载'];  // 完结、连载分类
const charges = ['全部', '免费', '付费', '会员'];  // 收费分类
const synthesizes = ['综合', '最热', '最新', '高分'];  // 综合分类：最热、最新：高分

const comics = [
  {
    title: '一人之下',
    desc: '热血·都市·异能',
    image: 'https://example.com/cover1.jpg',
    tag: '18.7万人在看',
    views: '18.7万',
  },
  {
    title: '我的徒弟都是大反派',
    desc: '重生·玄幻',
    image: 'https://example.com/cover2.jpg',
    tag: '14.4万人在看',
    views: '14.4万',
  },
  // ...其他数据
];

const onSort = (type) => {
  console.log('切换排序：', type);
};

const onFilter = (tag) => {
  console.log('筛选标签：', tag);
};
</script>

<style scoped>
.card-list {
  padding: 10px;
  background: #f5f5f5;
}
</style>
