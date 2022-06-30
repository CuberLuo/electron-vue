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
    redirect: '/students-manage',
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
      },
      {
        path: '/query-score',
        name: 'query-score',
        component: () => import('@/views/query-score')
      },
      {
        path: '/students-input-score',
        name: 'students-input-score',
        component: () => import('@/views/students-input-score')
      },
      {
        path: '/query-teach',
        name: 'query-teach',
        component: () => import('@/views/query-teach')
      },
      {
        path: '/class-manage',
        name: 'class-manage',
        component: () => import('@/views/class-manage')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
