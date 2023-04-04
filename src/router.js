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
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/signOut',
    name: 'signOut',
    component: () => import('@/views/SignOut.vue'),
  },
  {
    path: '/games/:slug',
    name: 'gameDetail',
    component: () => import('@/views/GameDetail.vue')
  },
  {
    path: '/users/:username',
    name: 'userProfile',
    component: () => import('@/views/UserProfile.vue')
  },
  {
    path: '/games/:slug/manage',
    name: 'manageGame',
    component: () => import('@/views/ManageGame.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new createRouter({
  history: createWebHistory(),
  routes
})

export default router
