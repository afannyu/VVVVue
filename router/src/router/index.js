import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NameView from '../views/NameView.vue'

const routes = [
  // 访问不同的路径，使用的组件不同
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // 异步加载路由
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/name',
    name: 'name',
    component: NameView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
