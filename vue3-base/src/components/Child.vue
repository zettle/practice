<template>
    <div>child: {{num}}</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from '@/js/useCross';
export default defineComponent({
    inheritAttrs: false,
    props: {
        name: String
    },
    setup () {
        const store = useStore();
        const num = ref('haha');
        // watchEffect(() => {
        //     console.log('this is child', num.value);
        // });

        return { num };
    }
})
</script>