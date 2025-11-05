// -- 导入第三方
import { createApp } from 'vue'      // 导入vue框架

import 'vant/lib/index.css'          // Vant 框架-用于手机 css
import Vant from 'vant'              // Vant 框架-用于手机 js
import { Lazyload } from 'vant'      // Vant 框架-用于手机 图片懒加载

// -- 导入自己写的
import '@/global.css';                           // 导入全局CSS
import App from '@/App.vue'                     // app入口文件
import comicRouter from '@/js/comic/router.js'  // 导入路由

// -- 创建app 对象
// createApp(App).mount('#app')      // 不用这个
const app = createApp(App)           // !!! 重要。引入App.Vue。界面的主入口

// -- app 引用 
//第三方库
app.use(comicRouter)                 // 全局导入, vue-router路由

app.use(Vant)                        // 全局导入，vant框架
app.use(Lazyload)                    // 全局导入, vant框架:图片懒加载

// app 挂载到 index.html上。 =》 类似于: 广告贴到广告牌上
app.mount('#app')

