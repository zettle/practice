<template>
    <div>{{personReactive}}</div>
    <div>{{personRef}}</div>
    <button @click="update">按钮</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, markRaw } from 'vue'
export default defineComponent({
    setup () {
        const person = {name:'xiaoming',age:23};
        markRaw(person);

        const personReactive = reactive(person);
        const personRef = ref(person);

        const update = () => {
            personReactive.name = 'xiaohong';
            console.log(person);
            console.log(personReactive);
            console.log(personRef.value);
        }
        return {personReactive, personRef, update};
    }
})
</script>