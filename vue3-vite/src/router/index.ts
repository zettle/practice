import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
    // 指定使用hash模式
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        component: () => import('../views/TodoList.vue')
    }, {
        path: '/about',
        component: () => import('../views/About.vue')
    }]
})