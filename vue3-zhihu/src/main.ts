import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import createMessage from '@/components/createMessage';

axios.defaults.baseURL = '/api/';

// 拦截请求前
axios.interceptors.request.use(config => {
    config.params = { ...config.params, code: 'xiaoxiao' };
    store.commit('setLoading', true);
    return config;
});
// 拦截请求后
axios.interceptors.response.use(config => {
    store.commit('setLoading', false);
    return config;
}, err => {
    console.log('拦截请求后', err.response.status);
    store.commit('setError', { status: true, message: '异常' });
    store.commit('setLoading', false);
    createMessage('请求异常');
    return Promise.reject(err);
});

// axios.get('columns', { params: { currentPage: 1, pageSize: 5 } }).then(resp => {
//     console.log(resp.data);
// });
createApp(App).use(store).use(router).mount('#app');
