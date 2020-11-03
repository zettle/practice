<template>
    <div class="container">
        <loading v-if="isLoading" text="拼命加载中..."></loading>
        <global-header :user="currentUser"></global-header>

        <router-view />

        <footer class="text-center py-4 text-secondary bg-light mt-6" @click="togggleLoading">
            <small>
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">© 2020 者也专栏</li>
                    <li class="list-inline-item">课程</li>
                    <li class="list-inline-item">文档</li>
                    <li class="list-inline-item">联系</li>
                    <li class="list-inline-item">更多</li>
                </ul>
            </small>
        </footer>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { GolbalDataProps } from '@/store';
import GlobalHeader from '@/components/GlobalHeader.vue';
import Loading from '@/components/Loading.vue';
export default defineComponent({
    components: { Loading, GlobalHeader },
    setup () {
        const store = useStore<GolbalDataProps>();

        const currentUser = computed(() => store.state.user);
        const isLoading = computed(() => store.state.isLoading);
        const token = computed(() => store.state.token);
        if (token.value) {
            axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
            store.dispatch('fetchCurrent');
        }

        return { currentUser, isLoading, token };
    }
});
</script>
