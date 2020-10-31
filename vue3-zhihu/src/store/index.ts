import { createStore } from 'vuex';
import { testData, testPosts, ColumnProps, PostProps } from '../testData';
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
}

const store = createStore<GolbalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
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
        }
    },
    actions: {
    },
    modules: {
    }
});

export default store;
