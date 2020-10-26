import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home },
    { path: '/about', component: () => import('../views/About.vue') },
    { path: '/about', component: () => import('../views/About.vue') },
    { path: '/watch', component: () => import('../views/Watch.vue') },
    { path: '/hooks', component: () => import('../views/Hooks.vue') }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
