// 导入vue框架
import { createApp } from 'vue'
import App from './App.vue'

// 导入自己写的
import comicRouter from './js/comic/router.js'  // 导入路由

// 导入第三方
import 'vant/lib/index.css' // Vant 框架-用于手机 css
import Vant from 'vant' // Vant 框架-用于手机 js

// createApp(App).mount('#app')  // 不用这个
const app = createApp(App)  // !!! 重要。引入App.Vue。界面的主入口

// app管理第三方库
app.use(Vant)  // 全局导入

// app管理自己写的
app.use(comicRouter)

// app绑定
app.mount('#app')


// // 参考其它项目-test
// import { createApp } from 'vue';
// import App from './App.vue';

// createApp(App).mount('#app');
