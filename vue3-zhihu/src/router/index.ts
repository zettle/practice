import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/signup',
        component: () => import('../views/Signup.vue')
    },
    {
        path: '/createPost',
        component: () => import('../views/CreatePost.vue')
    },
    {
        path: '/columnDetail',
        component: () => import('../views/ColumnDetail.vue')
    },
    {
        path: '/postDetail',
        component: () => import('../views/PostDetail.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
