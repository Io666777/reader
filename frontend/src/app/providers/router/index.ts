import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuth } from '@clerk/vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../../../pages/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../../../pages/home/ui/HomePage.vue')
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('../../../pages/activity/ui/ActivityPage.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../../../pages/auth/ui/AuthPage.vue'),
    meta: { requiresAuth: false }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const { isSignedIn } = useAuth()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isSignedIn.value) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && isSignedIn.value) {
    return { name: 'home' }
  }
})