<template>
    <div>
        <button @click="goPage('/demo/button')">跳转button.vue</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        const router = useRouter();
        const goPage = (url: string) => {
            router.push(url);
        };
        return {goPage};
    }
})
</script>