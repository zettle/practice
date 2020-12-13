<template>
    <div class="home">
      <Child001 msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue';
import Child001 from '@/components/Child001.vue'; // @ is an alias to /src
import { providerKey } from '../hooks/HomeProvideKey';

export default defineComponent({
    components: {
        Child001,
    },
    setup () {
        const data = reactive({
            name: 'xiaoming'
        });
        provide(providerKey, data);
        setInterval(() => {
            data.name += ';'
        }, 1000);
    }
});
</script>
