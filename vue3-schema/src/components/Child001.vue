<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, watchEffect } from "vue";
import { providerKey } from '../hooks/HomeProvideKey';

// props抽离出来成一个变量
export const propsJson = {
    msg: { type: String, required: true},
} as const;

export default defineComponent({
    props: propsJson,
    setup (props) {
        const content: any = inject(providerKey);
        watchEffect(() => {
            console.log('content', content.name);
        });
        
    }
});
</script>

