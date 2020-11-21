<template>
    <div>
        <h1>{{person}}</h1>
        <button @click="update">更新</button>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
    setup () {
        const person = reactive({
            a: 'a',
            dd: {
                ee: 'b',
                tt: {
                    sdf: 'c',
                    sdfa: {
                        sdfs: 'd'
                    }
                }
            }
        });

        const update = () => {
            console.log(person);
            console.log(person.dd);
            console.log(person.dd.tt);
            console.log(person.dd.tt.sdfa);

            person.a = '1';
            person.dd.ee = '2';
            person.dd.tt.sdf = '3';
            person.dd.tt.sdfa.sdfs = '4';

            console.log(JSON.stringify(person));
            
        };
        return {person, update};
    }
})
</script>