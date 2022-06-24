import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'launch',
    component: () => import('@/views/launch')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
