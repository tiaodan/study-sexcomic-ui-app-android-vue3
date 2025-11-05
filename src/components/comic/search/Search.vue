<template>
	<!--
	结构: 
		- === 上：搜索框 (固定在顶部)
		- === 下：网格   (可滚动)
	-->
	
	<!-- 整个界面 -->
	<div class="class-all-view">
	
		<!-- === 上：搜索框 -->
		<van-search
			v-model="comicName"
			show-action
			placeholder="请输入搜索关键词"
			@search="onSearch"
			>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search>

		<!-- === 下：网格 -->
		<!-- grid 书 列表 -->
		<div class="class-grid">
			<ComicGrid :comics="comicList" @select="handleSelect" />
		</div>

    <!-- 测试弹出章节列表 delete ---------------------- -->
    <van-button @click="onClickShowPopup" >测试弹出章节列表</van-button>
    <!-- 弹窗层 -->
    <!-- safe-area-inset-bottom Capacitor 打包成apk后不生效(全屏设备)。iphone 全屏设备没验证 -->
    <van-popup v-model:show="showPopup" position="bottom" style="height: 70vh;" safe-area-inset-bottom closeable>
      <!-- 视觉上 nav-bar和 popup 的closeable 关闭按钮，在一行上 -->
      <!-- 引用子布局 -->
      <div style="height: 50vh;">
        <Chapter />
      </div>
    </van-popup>
		
	</div>
</template>

<script setup>
// 导入第三方
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router'; // 路由跳转
import axios from 'axios'; // 用于请求数据

// 导入自己写的
import ComicGrid  from '@/components/comic/public/grid/ComicGrid3Col.vue'; // 3列的grid组件
import Chapter    from '@/components/comic/public/chapter/Chapter.vue';  // 章节布局
import { API_IP } from '@/js/order/shared';  // 导入API_IP

// 初始化
const comicName = ref('');  // 搜索内容
const router = useRouter(); // 路由实例

const showPopup = ref(false);    // 是否显示弹出层。默认不显示

// --函数
const comicList = ref([]); // 漫画列表数据
// 点击搜索,请求后台，给本地变量赋值
// 思路：
// 1 参数校验
// 2 请求后台
// 3 给变量赋值
const onSearch = async () => {
  // 1 参数校验
  if (!comicName.value) {
    showToast('搜索内容不能为空');
    return;
  }

  try {
    const response = await axios.get(API_IP + '/shelfComicList', {
      params: { name: comicName.value  } // 传递搜索关键词
    });  // 返回数组

    // 给变量赋值
    comicList.value = response.data;

    // 判断获取数量多少
    var resLen = response.data.length; // 获取返回数据的长度
    if (resLen === 0) {
      showToast(`搜到 0 条数据`);
      return;
    }
    showToast(`搜到 ${resLen} 条数据`);
    console.log('comicList = ', JSON.stringify(comicList.value));
  } catch (error) {
    console.error('搜索失败,出错: ', error);
  }
};

// 选择漫画时触发的事件
const handleSelect = (comic) => {
  console.log('选择漫画', comic);
  // 跳转到漫画详情页
  router.push('/comic/chapterView');
};

// 控制弹出层显示
const onClickShowPopup = () => {
  showPopup.value = true;
}

</script> 


<style scoped lang="less">
// -- 类选择器
// -- 总界面相关
.class-all-view {
	// ！！！父容器+子容器,同时设置height,才能保证滚动不会溢出父容器
	// - (安全区-电量状态栏 + 安全区-手势条 + footbar高度50px)
	height: calc(100vh - var(--safe-area-inset-top) - var(--safe-area-inset-bottom) - var(--vant-footbar-height) ); 
	//height: calc(100vh - 200px);
	//height: 300px;
	
	//height: 70vh;
	display: flex;
	flex-direction: column;
}

// -- 网格布局相关
.class-grid {
	//height: 70vh;
	flex: 1;
	overflow-y: auto;  // 可滚动
}
</style>


<!-- <template>
  v0.1 仅显示界面，没有逻辑。van-search -> 搜索框; van-grid -> 书 列表
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

</script> -->