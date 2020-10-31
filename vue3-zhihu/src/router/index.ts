import store from '@/store';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
        meta: { redirectIsLogin: true }
    },
    {
        path: '/createPost',
        component: () => import('../views/CreatePost.vue'),
        meta: { requiredLogin: true }
    },
    {
        path: '/columnDetail/:id',
        name: 'columnDetail',
        component: () => import('../views/ColumnDetail.vue')
    },
    {
        path: '/postDetail',
        component: () => import('../views/PostDetail.vue')
    },
    {
        path: '/formRowSimple',
        component: () => import('../views/FormRowSimple.vue')
    },
    {
        path: '/formRowValid',
        component: () => import('../views/FormRowValid.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiredLogin && !store.state.user.isLogin) {
        // 如果在meta声明了requiredLogin说明需要登录才可以访问，非登录的重定向登录页面
        next('/login');
    } else if (to.meta.redirectIsLogin && store.state.user.isLogin) {
        // 如果在meta声明了redirectIsLogin说明登录不能访问该页面，将重定向到首页
        next('/');
    } else {
        next();
    }
});

export default router;
