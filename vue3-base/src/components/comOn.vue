<template>
  <div>
      com-on
  </div>
</template>

<script>
import { defineComponent } from "vue";
import eventBus from '@/js/eventBus';

export default defineComponent({
    setup () {
        eventBus.on('yeyeye', (data) => {
            console.log('this is comOn组件', data);
        })
    }
})
</script>