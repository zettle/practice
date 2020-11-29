<template>
    <div>
        <pre>{{personRef}}</pre>
        <button type="button" @click="update">更新</button>
    </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRaw} from 'vue';

export default defineComponent({
    setup () {
        const person = { name: 'xiaoming', age: 23};
        const personRef = reactive(person);
        
        console.log(person === personRef);
        console.log(person === toRaw(personRef));

        const update = () => {
            person.name = 'xiaohong';
        };

        return {personRef, update};
    }
})
</script>