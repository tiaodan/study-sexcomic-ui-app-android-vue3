import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// 定义一个 vite 配置对象
export default defineConfig({
  // -- 启用的插件
  plugins: [
    vue(),         // 启用 Vue 3 支持，让 .vue 文件能被编译
    vueDevTools(), // 集成 Vue DevTools，方便在开发时调试组件状态
  ],
  // -- 各种解决方案
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))  // 全项目，用@ → 代指 ./src 目录
    },
  },
  // -- 服务器相关配置
  server: { // 这样写, 本地npm run dev，请求不到数据，没定位原因
    host: '0.0.0.0',    // 允许外部访问
    port: 80,           // 端口号
    allowedHosts: ['www.j88d.com', 'j88d.com', 'aoxuehongmei.com', 'www.aoxuehongmei.com'],  // 允许该域名访问
    // 代理
    proxy: {
      '/api': {                                          // 拦截前端以 /api 开头的请求
        target: 'http://www.j88d.com:8888',              // 实际请求的目的地址。拦截的请求，都请求到这
        // target: 'localhost:8888', // 不带http请求不到
        /*
          changeOrigin 作用：
         - 当前端请求 http://www.j88d.com:8888 时，如果不设置 changeOrigin: true，
           浏览器会把请求头里的 Origin 保留为 http://localhost:5173（开发服务器地址），后端可能拒绝跨域请求
         - 设置 true 后，浏览器会把请求头 Origin 改成 http://www.j88d.com:8888，后端就认为是同源请求
        */
        changeOrigin: true,                              // 改变请求头中 orgin参数 从http://localhost:5173改成http://www.xxxx.com:8888
        rewrite: (path) => path.replace(/^\/api/, ''),   // 把请求中 /api/... 去掉 /api 再发给后端
      },
    },
  },
  // -- 打包用
  build: {
    // 启用源码映射。目的：打包后debug 能定位到源代码。false -> 打包后出现问题，看不到源代码
    // 生产环境用false. 开发环境用true
    sourcemap: true, 
  }, 

})
