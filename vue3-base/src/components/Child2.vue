<template>
    <div>
        <p>child2: {{count}}</p>
        <button @click="update">更新</button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { providerStore } from '@/js/useCross';
export default defineComponent({
    setup () {
        const count = ref(1);
        const update = () => {
            count.value++;
        };
        providerStore(count);

        return {count, update};
    }
});
</script>