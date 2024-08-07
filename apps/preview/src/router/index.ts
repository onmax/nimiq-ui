import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),
    },
    {
      path: '/typography',
      name: 'typography',
      component: () => import('../components/Typography.vue'),
    },
    {
      path: '/utilities',
      name: 'utilities',
      component: () => import('../components/Utilities.vue'),
    },
    {
      path: '/icons',
      name: 'icons',
      component: () => import('../components/Icons.vue'),
    },
    {
      path: '/preflight',
      name: 'preflight',
      component: () => import('../components/Preflight.vue'),
    },
    {
      path: '/migrate',
      name: 'migrate',
      component: () => import('../components/Migrate.vue'),
    },
  ],
})

export default router
