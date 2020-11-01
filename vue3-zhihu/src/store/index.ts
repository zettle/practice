import { createStore } from 'vuex';
import axios from 'axios';
import { ColumnProps, PostProps } from '../testData';
// 类型声明
export interface UserProps {
    isLogin: boolean; // 是否登录
    name?: string;
    id?: number;
}
export interface GolbalDataProps {
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
    isLoading: boolean;
    token: string;
}

const store = createStore<GolbalDataProps>({
    state: {
        token: sessionStorage.getItem('token') || '',
        columns: [],
        posts: [],
        user: { isLogin: false },
        isLoading: false
    },
    getters: {
        // 获取栏目数量
        getColumnLen (state) {
            return state.columns.length;
        },

        // 根据id获取栏目详情
        // getColumnById: (state) => {
        //     return (id: number) => {
        //         return state.columns.find(column => column.id === id);
        //     };
        // }
        // 上面可以简写
        getColumnById: (state) => (id: number) => state.columns.find(column => column.id === id),

        // 获取post文章列表
        getPostsById: (state) => (id: number) => state.posts.filter(post => post.columnId === id)
    },
    mutations: {
        login (state, data) {
            state.user = { isLogin: true, ...data };
        },
        setLoading (state, isShowLoading) {
            console.log('111', isShowLoading);
            state.isLoading = isShowLoading;
        },
        fetchColumns (state, rowData) {
            state.columns = rowData.list;
        },
        fetchColumn (state, rowData) {
            state.columns = [rowData];
        },
        fetchPosts (state, rowData) {
            state.posts = rowData.list;
        },
        saveToken (state, token) {
            console.log('token', token);
            state.token = token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
        }
    },
    actions: {
        // 获取所有的栏目
        async fetchColumns (context) {
            const resp = await axios.get('columns', { params: { currentPage: 1, pageSize: 5 } });
            context.commit('fetchColumns', resp.data.data);
        },
        // 获取当个的栏目
        async fetchColumn ({ commit }, id) {
            const resp = await axios.get('column', { params: { id } });
            commit('fetchColumn', resp.data.data);
        },
        // 根据某个栏目，获取栏目下所有的评价
        async fetchPosts ({ commit }, id) {
            const resp = await axios.get('posts', { params: { id } });
            commit('fetchPosts', resp.data.data);
        },
        // 登录
        async fetchLogin ({ commit }, data) {
            const resp = await axios.post('login', data);
            console.log(resp);
            commit('saveToken', resp.data.data.token);
        },
        // 获取当前用户信息
        async fetchCurrent () {
            const resp = await axios.post('current/user');
            console.log(resp);
        }
    },
    modules: {
    }
});

export default store;
