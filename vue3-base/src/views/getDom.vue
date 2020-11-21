<template>
  <div class="home">
    <h1>{{content}}</h1>
    <div class="box" ref="content">sdf</div>
    <child-ref></child-ref>
  </div>
</template>

<script lang="ts">
import { computed, isRef, ref, defineComponent, reactive, toRefs, onMounted } from 'vue';
import ChildRef from '../components/ChildRef.vue';

export default defineComponent({
  components: {ChildRef},
  setup(props, context) {
    const content = ref('');
    onMounted(() => {
        console.log(content);
    })
    return { content };
  }
});
</script>
