import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth/:pathMatch(.*)*',
      component: () => import('@/pages/auth/ui/AuthPage.vue')
    },
    {
      path: '/',
      component: () => import('@/app/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/home/ui/HomePage.vue')
        },
        {
          path: 'activity',
          component: () => import('@/pages/activity/ui/ActivityPage.vue')
        },
        {
          path: 'profile',
          component: () => import('@/pages/profile/ui/ProfilePage.vue')
        },
        {
          path: 'reader/:bookId',
          component: () => import('@/pages/reader/ui/ReaderPage.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded.value) return true

  if (!to.path.startsWith('/auth') && !isSignedIn.value) {
    return { path: '/auth' }
  }

  if (to.path === '/auth' && isSignedIn.value) {
    return { path: '/' }
  }

  return true
})

export default router