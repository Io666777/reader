import { createRouter, createWebHistory } from 'vue-router'
import {authStore} from '../../../shared/store/auth'
import pageCatalog from '../../../pages/pageCatalog/index.vue'
import pageList from '../../../pages/pageList/index.vue'
import pageLogin from '../../../pages/pageLogin/index.vue' 
import profilPage from '../../../pages/profilPage/index.vue'
import defaultPage from '../../../pages/defaultPage.vue'

const routes = [
  {
    path: '/',
    component: defaultPage,
    children: [
      {
        path: '',
        name: 'home',
        component: pageList,
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: pageCatalog,
      },
      {
        path: 'book/:id',
        name: 'bookDetals',
        component: () => import('../../../pages/bookDetalsPage/index.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: pageLogin,
        meta: { guestOnly: true }
      },
      {
        path: 'profil',
        name: 'profil',
        component: profilPage,
      },
    ]
  }, 
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const isAuth = authStore.isAuth.value

  if (to.meta.requiresAuth && !isAuth) {
    return next({ name: 'login' })
  }

  if (to.meta.guestOnly && isAuth) {
    return next({ name: 'home' })
  }

  next()
})

export default router