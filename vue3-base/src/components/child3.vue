<template>
    <div>
        <h1>haha</h1>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    props: {
        name: String
    },
    setup (props, context) {
        console.log(context.attrs);
    }
})
</script>