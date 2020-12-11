<template>
    <div>
        <child2></child2>
        <child class="mt-30" age="234"></child>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { providerStore } from '@/js/useCross';
import Child from '@/components/Child.vue';
import Child2 from '@/components/Child2.vue';
export default defineComponent({
    components: { Child, Child2 }
});
</script>