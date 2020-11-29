<template>
    <div>{{personRef}}</div>
    <button @click="update">更新</button>
</template>
<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue';
export default defineComponent({
    setup () {
        const person = { name: 'xiaoming', age: 23};
        const personRef = ref(person);
        console.log(personRef.value);

        console.log(toRaw(personRef) === personRef);
        

        const update = () => {
            personRef.value.name = 'xiaohong';
        }

        return {personRef, update}
    }
});
</script>