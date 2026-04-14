import { createRouter, createWebHistory } from 'vue-router'
import pageCatalog from '../../../pages/pageCatalog/index.vue'
import pageList from '../../../pages/pageList/index.vue'
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
        path: '/book/:id',
        name: 'bookDetals',
        component: ()=> import('../../..//pages/bookDetalsPage/index.vue')
      }
    ]
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router