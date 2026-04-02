import { createRouter, createWebHistory } from 'vue-router'
import libraryPage from '../../../pages/libraryPage/index.vue'
import catalogPage from '../../../pages/catalogPage/index.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component:libraryPage,
    },
    {
        path: '/catalog',
        name: 'catalog',
        component:catalogPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router