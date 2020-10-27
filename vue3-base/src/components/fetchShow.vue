<template>
    <div>
        <!-- 可以直接使用promise里面的返回 -->
        ajaxResult: {{result}}
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
export default defineComponent({
    async setup () {
        const rowData = await axios.post('/asdfsdpi/cccc');
        return { result: rowData.data };
    }
})
</script>