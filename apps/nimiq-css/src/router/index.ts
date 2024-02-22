import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue') 
    },
    {
      path: '/typography',
      name: 'typography',
      component: () => import('../components/Typography.vue') 
    }
  ]
})

export default router
