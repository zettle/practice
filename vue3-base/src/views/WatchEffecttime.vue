<template>
    <div>
        <h1>{{count}}</h1>
        <div id="box"></div>
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
        onBeforeMount(() => {
            console.log('onBeforeMount')
        })
        onMounted(() => {
            watchEffect(() => {
                console.log(document.getElementById('box'));
                console.log('count', count.value);
            });
            console.log('onMounted')
        })
        
        
        return {count, update};
    }
});
</script>