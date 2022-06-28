import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout'),
    children: [
      {
        path: '/students-manage',
        name: 'students-manage',
        component: () => import('@/views/students-manage')
      },
      {
        path: '/teachers-manage',
        name: 'teachers-manage',
        component: () => import('@/views/teachers-manage')
      },
      {
        path: '/students-region',
        name: 'students-region',
        component: () => import('@/views/students-region')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
