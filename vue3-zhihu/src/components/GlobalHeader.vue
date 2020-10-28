<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link to="/" class="navbar-brand">者也专栏</router-link>
        <!-- 未登录 -->
        <!-- <ul class="list-inline mb-0">
            <li class="list-inline-item">
                <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
            </li>
            <li class="list-inline-item">
                <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
            </li>
        </ul> -->
        <!-- 已登录 -->
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Dropdown from './Dropdown.vue';
// import DropdownItem from './DropdownItem.vue';
export default defineComponent({
    // components: { Dropdown, DropdownItem }
});
</script>
