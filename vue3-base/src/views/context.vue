<template>
    <div>
        <child3 name="xiaoming" age="23"></child3>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Child3 from '@/components/child3.vue';
export default defineComponent({
    components: {Child3}
})
</script>