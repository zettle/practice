<template>
    <div>
        <h1>{{count}}</h1>
        <div id="box">{{count}}</div>
        <button type="button" @click="update">改变1</button>
    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref, watchEffect, watch, onMounted, onBeforeMount } from 'vue';
export default defineComponent({
    setup () {
        const count = ref(0);
        const update = () => {
            count.value++;
        };
        let isOk = true;
        watchEffect(() => {
            if (!isOk) {
                console.log(document.getElementById('box').innerHTML);
            }
            isOk = false;
            console.log('count', count.value);
        }, { flush: 'sync' });
        
        
        return {count, update};
    }
});
</script>