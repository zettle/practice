<template>
  <div>
      <com-emit></com-emit>
      <com-on></com-on>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import comEmit from "@/components/comEmit.vue";
import comOn from "@/components/comOn.vue";
export default defineComponent({
    components: { comEmit, comOn }
})
</script>