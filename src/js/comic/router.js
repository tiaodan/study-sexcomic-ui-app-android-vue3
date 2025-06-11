import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/home', component: () => import('@/components/comic/router-view/Home.vue') },
  { path: '/search', component: () => import('@/components/comic/router-view/Search.vue') },
  { path: '/friend', component: () => import('@/components/comic/router-view/Friend.vue') },
  { path: '/setting', component: () => import('@/components/comic/router-view/Setting.vue') },
  { path: '/', redirect: '/home' }
]

const comicRouter = createRouter({
  history: createWebHistory(),
  routes
})

export default comicRouter  // 导出
