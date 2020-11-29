<template>
    <div>{{content}}</div>
</template>
<script lang="ts">
import { ref, defineComponent} from 'vue';

export default defineComponent({
  setup() {
    const content = ref('this is child');

    return { content };
  }
});
</script>