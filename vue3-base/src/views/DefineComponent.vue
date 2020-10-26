<template>
  <div>sdf</div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        msg: String,
        age: {
            type: Number,
            required: true
        }
    },
    setup (props, context) {
        console.log(props.msg); // 推导出msg为`string | undefined`
        console.log(props.age); // 推导出age为`number`
    }
})
</script>
