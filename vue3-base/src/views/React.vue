<template>
    <div v-for="item of list">{{item}}</div>
    <button @click="update">按钮</button>
</template>
<script lang="ts">
import { computed, isRef, ref, defineComponent, reactive, toRefs, onMounted } from 'vue';

export default defineComponent({
    setup () {
        const list = ref(['aaa', 'bbb']);
        const update = () => {
            list.value[1]= 'ccc';
        };

        return {list, update};
    }
})
</script>