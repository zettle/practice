<template>
    <div>
        <!-- 可以直接使用promise里面的返回 -->
        syncShow: {{result}}
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    setup () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 这里要加return？？
                return resolve({
                    result: 44
                });
            }, 3000);
        });
    }
})
</script>