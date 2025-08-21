<!-- 开屏广告 -->
<template>
  <div class="splash-ad" v-if="visible">
    <van-image
      class="ad-img"
      :src="imageUrl"
      fit="contain"
      width="100%"
      height="100vh"
    />
    <van-button class="skip-btn" size="small" @click="skip">
      跳过 {{ count }}s
    </van-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(true)
const count = ref(3) // 倒计时秒数
const imageUrl = '/images/sea.webp' // 广告图 URL
// const imageUrl = 'https://img.yzcdn.cn/vant/cat.jpeg' // 广告图 URL
// const imageUrl = 'https://videos.openai.com/vg-assets/assets%2Ftask_01jy3sjhmsf66rztx3v5b8edga%2F1750326784_img_1.webp?st=2025-06-19T09%3A02%3A23Z&se=2025-06-25T10%3A02%3A23Z&sks=b&skt=2025-06-19T09%3A02%3A23Z&ske=2025-06-25T10%3A02%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=SjJimSJlx1rCc0ehtSwef7Wv1Rv4Lm6ZNAEqkZQJVo8%3D&az=oaivgprodscus' // 广告图 URL 房子
// const imageUrl = 'https://videos.openai.com/vg-assets/assets%2Ftask_01jy2h8560eb2vrzpwc6qm37mn%2F1750284414_img_1.webp?st=2025-06-19T08%3A09%3A16Z&se=2025-06-25T09%3A09%3A16Z&sks=b&skt=2025-06-19T08%3A09%3A16Z&ske=2025-06-25T09%3A09%3A16Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Dc7bV30RspDPnFbAwioqS%2BIINk%2Bw30jxIqjWveXf05s%3D&az=oaivgprodscus' // 广告图 URL / 树

const skip = () => {
  visible.value = false
}

onMounted(() => {
  const timer = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      clearInterval(timer)
      skip()
    }
  }, 1000)
})
</script>

<style scoped>
.splash-ad {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #000;
}

.ad-img {
  object-fit: cover;
}

.skip-btn {
  position: absolute;
  top: 30px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>
