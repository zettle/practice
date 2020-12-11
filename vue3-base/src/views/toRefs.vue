<template>
    <div>
        {{objRef}}
        <button @click="update">更新</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs } from 'vue';
export default defineComponent({
    setup () {
        const obj = reactive({ name: 'xiaoming' });
        const objRef = toRef(obj, 'name');
        console.log(objRef);
        const update = () => {
            objRef.value = 'xiaohong';
            console.log(obj);
        };

        return {objRef, update}
    }
});
</script>