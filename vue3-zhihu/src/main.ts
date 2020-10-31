import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://api.vikingship.xyz/api/';

// 拦截请求前
axios.interceptors.request.use(config => {
    console.log('请求前', config);
    return config;
});
// 拦截请求后
axios.interceptors.response.use(config => {
    console.log('请求后', config);
    return config;
});

axios.get('columns', { params: { currentPage: 1, pageSize: 5 } }).then(resp => {
    console.log(resp.data);
});
createApp(App).use(store).use(router).mount('#app');
