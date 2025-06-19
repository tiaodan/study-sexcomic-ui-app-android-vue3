import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 底部导航栏
  { path: '/home', component: () => import('@/components/comic/router-view/Home.vue') },  // 首页
  { path: '/search', component: () => import('@/components/comic/router-view/Search.vue') }, // 搜索界面
  { path: '/bookshelf', component: () => import('@/components/comic/router-view/Bookshelf.vue') }, // 书架界面
  { path: '/setting', component: () => import('@/components/comic/router-view/Setting.vue') },  // 我的界面
  // 其它页面
  { path: '/setting/login', component: () => import('@/components/comic/router-view/Login.vue') },  // 登录界面
  { path: '/setting/register', component: () => import('@/components/comic/router-view/Register.vue') }, // 注册界面
  { path: '/setting/forget', component: () => import('@/components/comic/router-view/Forget.vue') },  // 忘记密码界面
  { path: '/rank', component: () => import('@/components/comic/router-view/rank/Rank.vue') },  // 排行
  { path: '/rank/list', component: () => import('@/components/comic/router-view/rank/List.vue') },  // 排行 - 右侧列表
  

  // 主页面
  { path: '/', redirect: '/home' }
]

const comicRouter = createRouter({
  history: createWebHistory(),
  routes
})

export default comicRouter  // 导出
