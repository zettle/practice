<template>
  <div>
      com-emit
      <button @click="handler">这是comEmit组件的</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import eventBus from '@/js/eventBus';

export default defineComponent({
    setup () {
        const handler = () => {
            eventBus.emit('yeyeye', { name: 'xiaoming' });
        };

        return { handler };
    }
})
</script>