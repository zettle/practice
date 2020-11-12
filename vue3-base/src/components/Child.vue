<template>
    <div>child: {{num}}</div>
</template>

<script>
import { defineComponent, watchEffect } from 'vue';
import { useStore } from '@/js/useCross';
export default defineComponent({
    setup () {
        const num = useStore();
        watchEffect(() => {
            console.log('this is child', num.value);
        });

        return { num };
    }
})
</script>