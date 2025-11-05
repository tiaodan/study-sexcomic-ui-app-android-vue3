import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 底部导航栏
  { path: '/home',      component: () => import('@/components/comic/home/Home.vue') },  // 首页
  { path: '/search',    component: () => import('@/components/comic/search/Search.vue') }, // 搜索界面
  { path: '/bookshelf', component: () => import('@/components/comic/bookshelf/Bookshelf.vue') }, // 书架界面
  { path: '/setting',   component: () => import('@/components/comic/my/My.vue') },  // 我的界面
  // 其它页面
  { path: '/setting/login',     component: () => import('@/components/comic/my/login//Login.vue') },  // 登录界面
  { path: '/setting/register',  component: () => import('@/components/comic/my/register/Register.vue') }, // 注册界面
  { path: '/setting/forget',    component: () => import('@/components/comic/my/forget/Forget.vue') },  // 忘记密码界面
  { path: '/rank',              component: () => import('@/components/comic/home/rank/Rank.vue') },  // 排行
  { path: '/rank/list',         component: () => import('@/components/comic/home/rank/List.vue') },  // 排行 - 右侧列表
	{ path: '/chapter',           component: () => import('@/components/comic/public/chapter/Chapter.vue') },  // 排行 - 右侧列表
  // 漫画浏览相关
  { path: '/comic/chapterView', component: () => import('@/components/comic/public/chapterview/ChapterView.vue') },  // 漫画浏览界面
	
	// 测试页面
	{ path: '/test', component: () => import('@/components/comic/test/Test.vue') },  // 测试界面
  

  // 主页面
  { path: '/', redirect: '/home' }
]

const comicRouter = createRouter({
  history: createWebHistory(),
  routes
})

export default comicRouter  // 导出
