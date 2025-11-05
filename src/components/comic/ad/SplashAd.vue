<template>
  <div class="class-start-ad" v-if="isShowAd">
    <van-image
      :src="adUrl"
      width="100%"
      height="100%"
      fit="contain"
      @click="onClickAd"
    />
    <van-button class="class-skip-btn" size="small" plain @click="closeAd">跳过 {{ countDown }}s</van-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCachedAd, fetchAndUpdateAd } from '@/js/comic/ad'
import { showToast  } from 'vant'

const countDown = ref(5) // 倒计时秒数
const adUrl = ref('/images/1.webp')  // 默认图路径
const adLink = ref('')
const isShowAd = ref(true)

// -- 加载广告过程
/**
 * 启动广告时，优先读本地缓存的广告图片，如果没有就用默认图
 * 1. 获取缓存的广告
 * 2. 显示广告
 * 3. 刷新缓存
 */
function loadAd() {
  const cached = getCachedAd()
  console.log('🔍 加载缓存广告: ', JSON.stringify(cached))
  if (cached?.file) {
    console.log('✅ 加载本地广告图:', Capacitor.convertFileSrc(cached.file))
    adUrl.value = Capacitor.convertFileSrc(cached.file)  // 本地 file:// 路径-》url格式  原来写法: adUrl.value = cached.fil
    adLink.value = cached.link || ''
  } else {
    console.warn('⚠️ 无本地广告缓存，使用默认图')
    // adUrl.value = '/images/1.webp' // -先删除
  }
}

// -- 点击广告，跳转到广告App
function onClickAd() {
  /*
  v0.1 写法，通过浏览器直接打开广告链接
  if (adLink.value) {
    window.open(adLink.value, '_blank')
  }
  closeAd()
  */
  // const scheme = 'pinduoduo://mall_page/mall_id/579519811'  // pinduoduo://mall_page/shop_id/579519811 -》不好用
  // const scheme = 'https://mobile.yangkeduo.com/mall_page.html?ps=fCbmZMEAo1'  // 店铺url pinduoduo://mall_page/shop_id/579519811 -》 不好用
  // const fallback = 'https://mobile.yangkeduo.com/mall_page.html?mall_id=579519811'  // 店铺 h5链接 -》不好用
  const cached = getCachedAd()
  const scheme = cached.link  // const scheme = 'https://mobile.yangkeduo.com/goods.html?ps=LZ9cNKTbtD'  // 商品url  √ 可用
  const fallback = cached.link // 'https://mobile.yangkeduo.com/mall_page.html?ps=fCbmZMEAo1'  // 店铺 h5链接 √ 可用，以后没准能用上

  if (!scheme) {
    showToast('无效的广告链接')
    console.log("无效的广告链接: ", scheme)
    return
  }

  // 不用了 start --- -没用，跳转的时候，不显示
  // ✅ 添加加载提示（Toast） -没用，跳转的时候，不显示
  // showLoadingToast({
  //   message: '正在打开拼多多...',
  //   forbidClick: true,  // 禁止点击穿透
  // })
  // showToast({
  //   message: '正在打开拼多多...',
  //   type: 'loading',
  //   // duration: 0,        // 0 表示不自动关闭
  //   // forbidClick: true,  // 禁止点击穿透
  //   // loadingType: 'spinner'
  // })  // 不用了 end --- 

  // 1. 尝试打开 PDD App
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = scheme
  document.body.appendChild(iframe)
  console.log("打开广告链接, 通过app跳转 scheme: ", scheme)

  // 2. 设置超时兜底打开网页（App 没装或失败）-好像有问题，会一直执行这块，暂时先注释，想到好办法再说
  // setTimeout(() => {
  //   window.location.href = fallback
  //   console.log("打开广告链接超时，跳转 fallback: ", fallback)
  // }, 1500)  // eg 5000 -> 5秒
  // 2. end ---- 设置超时兜底打开网页（App 没装或失败）-好像有问题，会一直执行这块，暂时先注释，想到好办法再说
}

// -- 关闭广告页面
function closeAd() {
  isShowAd.value = false
}


// -- 生命周期方法
// 页面挂载时 --
onMounted( async() => {
  loadAd()
  fetchAndUpdateAd()  // 异步刷新缓存，不影响加载速度

  // 倒计时后，关闭广告 --
  // setIntervalx写法 1.0，不喜欢
  const timer = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearInterval(timer)
      closeAd()
    }
  }, 1000)
  
  // await 写法2.0.这种写法还要自己实现slleep函数，不好 ---------- 弃用
  // while (countDown.value > 0) {
  //   await sleep(1000);
  //   countDown.value--;
  // }
  // closeAd()
})
</script>

<style scoped lang="less">
.class-start-ad {
  position: fixed;  // fixed 脱离文档流
  inset: 0;         // 上下左右边界0倍,搭配fixed使用
  z-index: 9999;    // 悬浮最高
  background-color: black; // 必须加上背景色,不然就看到主界面了
}

.class-skip-btn {
  // -- 目的：实现在右上角
  position: absolute;  // 绝对定位，脱离文档流
  top: calc(var(--safe-area-inset-top) + 20px);           // 距离上边界
  right: 20px;         // 距离右边界
  opacity: 0.5;        // 不透明度. 1-完全不透明 0-完全透明
  //background-color:  rgba(255, 255, 255, 0.6);  // 透明度正好
} 
</style>

<!-- v0.2 加载缓存广告的写法-script -->
<!--
一会取消注释
<template>
  <div class="splash-ad" v-if="show">
    <van-image
      :src="adUrl"
      width="100%"
      height="100%"
      fit="cover"
      @click="onClickAd"
    />
    <div class="skip-btn" @click="closeAd">跳过</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCachedAd, fetchAndUpdateAd } from '@/js/comic/ad'

const adUrl = ref('')
const adLink = ref('')
const show = ref(true)

function loadAd() {
  const cached = getCachedAd()
  if (cached?.file) {
    // ✅ 使用文件系统返回的 file:// 路径
    adUrl.value = cached.file
    adLink.value = cached.link || ''
  } else {
    // ✅ 默认图，放在 public/images 中
    console.error("缓存没图片url,用默认的 /images/sea.webp")
    adUrl.value = '/images/sea.webp'
  }
}

function onClickAd() {
  if (adLink.value) {
    window.open(adLink.value, '_blank')
  }
  closeAd()
}

function closeAd() {
  show.value = false
}

onMounted(async () => {
  loadAd()
  await fetchAndUpdateAd()
})
</script>

<style scoped>
.splash-ad {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 9999;
  background: #000;
}
.skip-btn {
  position: absolute;
  top: 30px; right: 20px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style> -->

<!--
v0.1 一直请求在线广告的写法
<template>
  <div class="splash-ad" v-if="show">
    <van-image
      :src="adUrl"
      width="100%"
      height="100%"
      fit="cover"
      @click="onClickAd"
    />
    <div class="skip-btn" @click="closeAd">跳过</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCachedAd, fetchAndUpdateAd } from '@/js/comic/ad'

const adUrl = ref('')
const adLink = ref('')
const show = ref(true)

function loadAd() {
  const cached = getCachedAd()
  if (cached) {
    adUrl.value = cached.url
    adLink.value = cached.link
  } else {
    console.log("缓存没图片url,用默认的 /images/sea.webp")
    adUrl.value = '/images/sea.webp'
  }
}

function onClickAd() {
  if (adLink.value) {
    window.open(adLink.value, '_blank')
  }
  closeAd()
}

function closeAd() {
  show.value = false
}

onMounted(() => {
  loadAd()
  fetchAndUpdateAd() // 异步刷新
})
</script>

<style scoped>
.splash-ad {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 9999;
  background: #000;
}
.skip-btn {
  position: absolute;
  top: 30px; right: 20px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style> -->
