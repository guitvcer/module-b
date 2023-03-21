import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signIn',
    component: () => import('@/views/SignIn.vue')
  }
]

const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router
