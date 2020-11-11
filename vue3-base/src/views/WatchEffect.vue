<template>
    <div>
        <h1>{{count}}</h1>
        <button type="button" @click="add">改变1</button>
        <hr>
        <hr>
        <hr>
        <h1>{{num}}</h1>
        <button type="button" @click="change">改变2</button>
        <hr>
        <hr>
        <input type="text" v-model="keyword">
    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref, watchEffect, watch } from 'vue';
export default defineComponent({
    setup () {
        const count = ref(0);
        const add = () => {
            count.value++;
        };

        const num = ref(1);
        const change = () => {
            num.value++;
            if (num.value === 5) {
                stop();
            }
        };

        const stop = watchEffect(() => {
            console.log('watchEffect', num.value);
        });
        // watch(num, (newVal, oldVal) => {
        //     console.log('newVal', newVal, oldVal);
        // });

        const keyword = ref('');
        var cacenlToken = null;
        watchEffect(async(cancel) => {

            const resp = await axios.get('/api', {
                params: {keyword: keyword.value},
                cancelToken: new axios.CancelToken((c) => {
                    cacenlToken = c;
                })
            });

            // 就算放在后面，也是比await先触发
            cancel(() => {
                cacenlToken();
            });
        })

        return {count, add, num, change, keyword};
    }
});
</script>