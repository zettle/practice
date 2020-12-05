import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home },
    { path: '/about', component: () => import('../views/About.vue') },
    { path: '/about', component: () => import('../views/About.vue') },
    { path: '/watch', component: () => import('../views/Watch.vue') },
    { path: '/hooks', component: () => import('../views/Hooks.vue') },
    { path: '/hooksLoading', component: () => import('../views/HooksLoading.vue') },
    { path: '/defineComponent', component: () => import('../views/DefineComponent.vue') },
    { path: '/teleport', component: () => import('../views/Teleport.vue') },
    { path: '/modelDemo', component: () => import('../views/ModelDemo.vue') },
    { path: '/suspensePromise', component: () => import('../views/SuspensePromise.vue') },
    { path: '/test', component: () => import('../views/Test.vue') },
    { path: '/mitt', component: () => import('../views/Mitt.vue') },
    { path: '/watchEffect', component: () => import('../views/WatchEffect.vue') },
    { path: '/watchEffecttime', component: () => import('../views/WatchEffecttime.vue') },
    { path: '/parent', component: () => import('../views/Parent.vue') },
    { path: '/toRef', component: () => import('../views/toRef.vue') },
    { path: '/toRefs', component: () => import('../views/toRefs.vue') },
    { path: '/getDom', component: () => import('../views/getDom.vue') },
    { path: '/react', component: () => import('../views/React.vue') },
    { path: '/shallowReactive', component: () => import('../views/shallowReactive.vue') },
    { path: '/toRows', component: () => import('../views/toRows.vue') },
    { path: '/toRawsRef', component: () => import('../views/toRawsRef.vue') },
    { path: '/markRaw', component: () => import('../views/markRaw.vue') },
    { path: '/context', component: () => import('../views/context.vue') },
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
