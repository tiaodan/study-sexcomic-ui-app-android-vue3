
<!-- v0.4 分类文字对齐，底部漫画列表是一行3个的。分类用van-tab 实现 -->
<template>
<div style="display: flex; flex-direction: column; height: 85vh;">
  <!-- 注释：顶部分类标签 -->
  <div >
    <!-- 注释：swipeable  是一个布尔属性，用于控制标签页是否可以左右滑动切换。当设置为 true 时，用户可以通过左右滑动来切换标签页；当设置为 false 时，用户只能通过点击标签来切换 -->
    <!-- 注释： 国家  -->
    <van-tabs v-model:active="activeCountry" swipeable @click-tab="handleSelectTab">
      <van-tab v-for="(item, index) in countries" :key="index" :title="item || ''" :disabled="!item"  ></van-tab>
    </van-tabs>

    <!-- 注释：完结  -->
    <van-tabs v-model:active="activeEnd" swipeable @click-tab="handleSelectTab">
      <van-tab v-for="(item, index) in ends" :key="index" :title="item || ''" :disabled="!item" ></van-tab>
    </van-tabs>

    <!-- 注释： 收费 -->
    <van-tabs v-model:active="activeCharge" swipeable @click-tab="handleSelectTab" >
      <van-tab v-for="(item, index) in charges" :key="index" :title="item || ''" :disabled="!item" ></van-tab>
    </van-tabs>

    <!-- 注释：综合  -->
    <van-tabs v-model:active="activeSynthesize" swipeable @click-tab="handleSelectTab">
      <van-tab v-for="(item, index) in synthesizes" :key="index" :title="item || ''" :disabled="!item" ></van-tab>
    </van-tabs>
  </div>

  <!-- 注释：漫画列表  -->
  <div style="flex: 1; overflow-y: auto;">
    <ComicGrid :comics="comicList" :onSelect="handleSelect" />
  </div>
</div>
</template>
    
<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue';
import { showToast } from 'vant';  // 用于提示
import axios from 'axios';  // 发请求用, axios 不能带中括号

// 导入自己写的
import  ComicGrid from './small/ComicGrid3Col.vue';  // 不能带中括号
import { API_IP } from '@/js/order/shared';
import { useRouter } from 'vue-router'; 

// 初始化
const activeCountry = ref(0);
const activeEnd = ref(0);
const activeCharge = ref(0);
const activeSynthesize = ref(0);
const countries = ['国家', '韩漫', '日漫', '美漫', '国漫'];
const ends = ['全部', '完结', '连载', '', ''];  // 完结、连载分类
const charges = ['全部', '免费', '付费', '会员',''];  // 收费分类
const synthesizes = ['综合', '最热', '最新', '高分',''];  // 综合分类：最热、最新：高分
const comicList = ref([]); // 漫画列表数据

// ----------------------------------------  函数  start ----------------------------------------
// 处理点击tab事件
// title 是 van-tab 的 title 属性值，必须是这个。如果传 hahaha ,就获取不到值
const handleSelectTab = (tabObj) => {
  if (!tabObj.title){
    return // tab是空，不处理
  }
  getComics();
};

// 请求，给comicGrid 组件传递数据
const getComics = async() => {
  showToast('点击了 getComics 。。。')
  // axios.get(API_IP +'/category')
  // const response = await axios.get(API_IP +'/shelfComicList')
  const response = await axios.get(API_IP + '/shelfComicList', {
      params: { name: "name1"  } // 传递搜索关键词
    });  // 返回数组
  comicList.value = response.data; // 赋值给 comicList
};

// 处理点击漫画事件。传入一个漫画对象
const router = useRouter(); // 路由实例,就近原则
const handleSelect = (comic) => {
  console.log('点击漫画：', comic.name);
  // 跳转漫画页
  if (comic) {  // 如果漫画对象有值，才跳转
    router.push('/comic/chapterView');
  }
};

// 加载页面时 - 先请求一次数据
onMounted( async() => {
  try {
    const response = await axios.get(API_IP + '/shelfComicList');  // 返回数组,方法名写async 才能用await
    comicList.value = response.data; // 赋值给 comicList
    console.log('get 分类 all  成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('get 分类 all 失败: ', error);
  }
});

// 暂时没用，先留着看
const onSort = (type) => {
  console.log('切换排序：', type);
};

// 暂时没用，先留着看
const onFilter = (tag) => {
  console.log('筛选标签：', tag);
};
// ----------------------------------------  函数  end ----------------------------------------
</script>


<!-- v0.3 分类文字对齐，底部漫画列表是一行3个的。分类用van-grids 实现
遗留问题1：- 分类，用grid实现，少于5个，会显示出灰色背景不好看
遗留问题2：- 分类，用grid实现，不能显示下划线，自定义实现很麻烦 

<template>
<div style="display: flex; flex-direction: column; height: 85vh;">
  注释：顶部分类标签
  <div >
    注释：swipeable  是一个布尔属性，用于控制标签页是否可以左右滑动切换。当设置为 true 时，用户可以通过左右滑动来切换标签页；当设置为 false 时，用户只能通过点击标签来切换
    注释： 国家 
    van-grid 不用clickable 只要item 写了click就行； column-num="5" 控制一行显示几个，默认4个
    <van-grid :column-num="5" :border="false"  >
      <van-grid-item v-for="(item, index) in countries" :key="item" :text="item" @click="getComics" icon="home-o" dot />
    </van-grid>

    注释：完结 
    <van-grid :column-num="5" :border="false" >
      <van-grid-item v-for="(item, index) in ends" :key="item" :text="item" @click="getComics" dot />
    </van-grid>

    注释： 收费
    <van-grid :column-num="5" :border="false" >
      <van-grid-item v-for="(item, index) in charges" :key="item" :text="item" @click="getComics" dot />
    </van-grid>

    注释：综合 
    <van-grid :column-num="5" :border="false" >
      <van-grid-item v-for="(item, index) in synthesizes" :key="item" :text="item" @click="getComics" dot />
    </van-grid>
  </div>

  注释：漫画列表 
  <div style="flex: 1; overflow-y: auto;">
    <ComicGrid :comics="comicList" :onSelect="handleSelect" />
  </div>
</div>
</template>
  
<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue';
import axios from 'axios';  // 发请求用, axios 不能带中括号

// 导入自己写的
import  ComicGrid from './small/ComicGrid3Col.vue';  // 不能带中括号
import { API_IP } from '@/js/order/shared';
import { useRouter } from 'vue-router'; 

// 初始化
const activeCountry = ref(0);
const activeEnd = ref(0);
const activeCharge = ref(0);
const activeSynthesize = ref(0);
const countries = ['国家', '韩漫', '日漫', '美漫', '国漫'];
const ends = ['全部', '完结', '连载'];  // 完结、连载分类
const charges = ['全部', '免费', '付费', '会员'];  // 收费分类
const synthesizes = ['综合', '最热', '最新', '高分'];  // 综合分类：最热、最新：高分
const comicList = ref([]); // 漫画列表数据

// ----------------------------------------  函数  start ----------------------------------------
// 请求，给comicGrid 组件传递数据
const getComics = async() => {
  // axios.get(API_IP +'/category')
  const response = await axios.get(API_IP +'/shelfComicList')
  comicList.value = response.data; // 赋值给 comicList
};

// 处理点击漫画事件。传入一个漫画对象
const router = useRouter(); // 路由实例,就近原则
const handleSelect = (comic) => {
  console.log('点击漫画：', comic.name);
  // 跳转漫画页
  if (comic) {  // 如果漫画对象有值，才跳转
    router.push('/comic/chapterView');
  }
};

// 加载页面时 - 先请求一次数据
onMounted( async() => {
  try {
    const response = await axios.get(API_IP + '/shelfComicList');  // 返回数组,方法名写async 才能用await
    comicList.value = response.data; // 赋值给 comicList
    console.log('get 分类 all  成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('get 分类 all 失败: ', error);
  }
});

// 暂时没用，先留着看
const onSort = (type) => {
  console.log('切换排序：', type);
};

// 暂时没用，先留着看
const onFilter = (tag) => {
  console.log('筛选标签：', tag);
};
// ----------------------------------------  函数  end ----------------------------------------
</script>  -->


<!-- v0.2 分类文字对齐，底部漫画列表是一行3个的。分类用van-tabs 实现，但是乱
<template>
<div style="display: flex; flex-direction: column; height: 85vh;">
  注释：顶部分类标签
  <div >
    注释：swipeable  是一个布尔属性，用于控制标签页是否可以左右滑动切换。当设置为 true 时，用户可以通过左右滑动来切换标签页；当设置为 false 时，用户只能通过点击标签来切换
    注释： 国家 
    <van-tabs v-model:active="activeCountry" swipeable>
      <van-tab v-for="item in countries" :title="item" :key="item" @click="getComics" />
    </van-tabs>

    注释：完结 
    <van-tabs v-model:active="activeEnd" swipeable>
      <van-tab v-for="item in ends" :title="item" :key="item" @click="getComics" />
    </van-tabs>

    注释： 收费
    <van-tabs v-model:active="activeCharge" swipeable>
      <van-tab v-for="item in charges" :title="item" :key="item" @click="getComics" />
    </van-tabs>

    注释：综合 
      <van-tabs v-model:active="activeSynthesize" swipeable>
      <van-tab v-for="item in synthesizes" :title="item" :key="item" @click="getComics" />
    </van-tabs>

  </div>

  注释：漫画列表 
  <div style="flex: 1; overflow-y: auto;">
    <ComicGrid :comics="comicList" :onSelect="handleSelect" />
  </div>
</div>
</template>

<script setup>
// 导入三方工具
import { ref,onMounted } from 'vue';
import axios from 'axios';  // 发请求用, axios 不能带中括号

// 导入自己写的
import  ComicGrid from './small/ComicGrid3Col.vue';  // 不能带中括号
import { API_IP } from '@/js/order/shared';
import { useRouter } from 'vue-router'; 

// 初始化
const activeCountry = ref(0);
const activeEnd = ref(0);
const activeCharge = ref(0);
const activeSynthesize = ref(0);
const countries = ['国家', '韩漫', '日漫', '美漫', '国漫'];
const ends = ['全部', '完结', '连载'];  // 完结、连载分类
const charges = ['全部', '免费', '付费', '会员'];  // 收费分类
const synthesizes = ['综合', '最热', '最新', '高分'];  // 综合分类：最热、最新：高分
const comicList = ref([]); // 漫画列表数据

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

// ----------------------------------------  函数  start ----------------------------------------
// 请求，给comicGrid 组件传递数据
const getComics = async() => {
  // axios.get(API_IP +'/category')
  const response = await axios.get(API_IP +'/shelfComicList')
  comicList.value = response.data; // 赋值给 comicList
};

// 处理点击漫画事件。传入一个漫画对象
const router = useRouter(); // 路由实例,就近原则
const handleSelect = (comic) => {
  console.log('点击漫画：', comic.name);
  // 跳转漫画页
  if (comic) {  // 如果漫画对象有值，才跳转
    router.push('/comic/chapterView');
  }
};

// 加载页面时 - 先请求一次数据
onMounted( async() => {
  try {
    const response = await axios.get(API_IP + '/shelfComicList');  // 返回数组,方法名写async 才能用await
    comicList.value = response.data; // 赋值给 comicList
    console.log('get 分类 all  成功: ', JSON.stringify(comicList.value));  // 必须加value 才能JSON出来
  } catch (error) {
    console.error('get 分类 all 失败: ', error);
  }
});

// 暂时没用，先留着看
const onSort = (type) => {
  console.log('切换排序：', type);
};

// 暂时没用，先留着看
const onFilter = (tag) => {
  console.log('筛选标签：', tag);
};
// ----------------------------------------  函数  end ----------------------------------------
</script> -->


<!-- v0.1 分类没有对齐，底部漫画列表是一行，左侧图片，右边文字，下一步要弄个一行3个的
<template>
  <div>
    注释：顶部分类标签
    注释：swipeable  是一个布尔属性，用于控制标签页是否可以左右滑动切换。当设置为 true 时，用户可以通过左右滑动来切换标签页；当设置为 false 时，用户只能通过点击标签来切换
    注释： 国家 
    <van-tabs v-model:active="activeCountry" swipeable>
      <van-tab v-for="item in countries" :title="item" :key="item" />
    </van-tabs>

    注释：完结 
    <van-tabs v-model:active="activeEnd" swipeable>
      <van-tab v-for="item in ends" :title="item" :key="item" />
    </van-tabs>

    注释： 收费
    <van-tabs v-model:active="activeCharge" swipeable>
      <van-tab v-for="item in charges" :title="item" :key="item" />
    </van-tabs>

    注释：综合 
     <van-tabs v-model:active="activeSynthesize" swipeable>
      <van-tab v-for="item in synthesizes" :title="item" :key="item" />
    </van-tabs>

    

    注释：漫画列表 
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
</style> -->
