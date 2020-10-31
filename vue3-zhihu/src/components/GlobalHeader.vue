<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link to="/" class="navbar-brand">者也专栏</router-link>
        <!-- 已登录 -->
        <div v-if="user.isLogin" class="list-inline mb-0">
            <dropdown :title="`您好，${user.name}`">
                <dropdown-item>新建文章</dropdown-item>
                <dropdown-item disabled>我的专栏</dropdown-item>
                <dropdown-item>编辑资料</dropdown-item>
                <dropdown-item>退出登陆</dropdown-item>
            </dropdown>
        </div>

        <!-- 未登录 -->
        <ul v-else class="list-inline mb-0">
            <li class="list-inline-item">
                <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
            </li>
            <li class="list-inline-item">
                <router-link to="/register" class="btn btn-outline-light my-2">注册</router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';
export interface UserProps {
    isLogin: boolean; // 是否登录
    name?: string;
    id?: number;
}

export default defineComponent({
    components: { Dropdown, DropdownItem },
    props: {
        user: {
            type: Object as PropType<UserProps>,
            required: true
        }
    },
    setup (props) {
        console.log(props.user);
    }
});
</script>
