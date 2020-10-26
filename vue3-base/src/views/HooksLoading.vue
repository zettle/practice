<template>
    <div>
        <p v-if="isLoading">正在加载....</p>
        <p v-if="isLoaded">后台返回的是: {{result}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import useURLLoader from '../hooks/useURLLoader';
interface TyResult {
    code: number;
    msg: string;
}
export default defineComponent({
    setup() {
        const { isLoading, isLoaded, result, error } = useURLLoader<TyResult>('/api/getListjk3sad');
        return {isLoading, isLoaded, result, error};
    }
});
</script>
