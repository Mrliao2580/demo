import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: ()=> import('../views/index.vue')
  },
  {
    path:"/home",
    name:"home",
    component: ()=> import('../views/home.vue')
  }
]
const router = createRouter({
  // [history] createWebHistory 去掉'#' | 默認 createWebHashHistory
  history: createWebHistory(),
  routes,
})

export default router
