<template>
    <div>{{msg}}</div>
    <p>{{haha}}</p>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
export default defineComponent({
    props: {
        msg: String
    },
    setup (props) {
        const haha = ref('');
        if (props.msg) {
            const haha = '12'
        }
        return {haha};
    }
})
</script>