<template>
		<!-- 每个格子和内容间，源码里有间距-上下左右各约 4~8px（取决于主题变量） -->
		<van-grid :column-num="columnNum" :gutter="0">
			<van-grid-item v-for="(item, index) in images" :key="index" class="van-grid-item-test">
				<div><img :src="item.url" class="grid-img" /></div>
				<div class="book-name">{{ item.bookName }}</div>
				<div class="sub-info">{{ item.subInfo }}</div>
			</van-grid-item>
		</van-grid>
</template>

<script setup>
// -- 导入第三方
import { ref } from 'vue';

// -- 初始化
// 漫画数据：封面+书名+简介
const images = ref([
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book One', subInfo: 'Author A' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Two', subInfo: 'Author B' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', 
	bookName: 'Book ThreeBookThree', 
	subInfo: 'Author C' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Four', subInfo: 'Author D' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Five', subInfo: 'Author E' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Six', subInfo: 'Author F' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Seven', subInfo: 'Author G' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Eight', subInfo: 'Author H' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Nine', subInfo: 'Author I' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book One', subInfo: 'Author A' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Two', subInfo: 'Author B' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Three', subInfo: 'Author C' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Four', subInfo: 'Author D' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Five', subInfo: 'Author E' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Six', subInfo: 'Author F' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Seven', subInfo: 'Author G' },
	{ url: 'https://p8.itc.cn/q_70/images03/20210626/3eb7e6574ada4d5f9768f5d9785adfb9.jpeg', bookName: 'Book Eight', subInfo: 'Author H' },
	{ url: 'https://p8.itc.cn/images01/20210918/3a0b025632524e52b0de9177c20c9125.jpeg', bookName: 'Book Nine', subInfo: 'Author I' },
]);
const columnNum = ref(3);  // 3 列布局

// -- 自定义css属性
document.documentElement.style.setProperty('--grid-column-num', columnNum.value);  // grid 列数量 
</script>

<style scoped lang="less">
// vant 只要有标签，自动就有同名的class，可以用。
// 比如写了van-button css就能直接调CSS类 .van-button。不用在标签的地方，写class="van-button"
.van-grid-item-test {
	//border: 1px solid blue;      // 测试用-delete。显示边框,标准需要: border-style 、border-style 、border-color style必须有
	max-width: calc(100% / var(--grid-column-num));              // 用它能解决书名长, 3列变2列问题。要进行运输,必加calc
}

.grid-img {
  width: 100%;
  aspect-ratio: 3 / 4; /* 图片宽高比 3:4 */
  //object-fit: cover; /* 裁剪图片以填满容器 */
}

.book-name {
	// 左对齐。必须width + text-align 配合使用。不管左对齐、居中对齐、右对齐
  width: 100%;
	text-align: left;        // 左对齐 center表示居中对齐。必须搭配 width:100% 使用
	
	// 字体
  font-size: 14px;         // 字体大小
  font-weight: bold;       // 字体宽度
	
	// 单行超出用省略号。以下属性需要搭配使用
  overflow: hidden;        // 隐藏超出容器范围的内容。如果文字太长，不会溢出显示
  text-overflow: ellipsis; // 当文字被隐藏时，用 省略号（…） 显示结尾。必须和 white-space 搭配使用
  white-space: nowrap;     // 不换行
	
	//margin-top: 8px;       // 不用margin, 现在够用了,不够用的时候再说
}

.sub-info {
  width: 100%;
  text-align: left;        // 左对齐 center表示居中对齐。必须搭配 width:100% 使用
  font-size: 12px;
  color: #666;
  //margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>