<template>
    <div class="child">child</div>
</template>

<script>
import { defineComponent, watchEffect } from 'vue';
import { useStore } from '../useSearchWord';
export default defineComponent({
    setup () {
        const searchWord = useStore();

        watchEffect(() => {
            console.log('child', searchWord.value);
        });
    }
});
</script>

<style>

</style>