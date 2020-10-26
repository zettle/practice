<template>
  <div class="home">
    <h2>{{count}}</h2>
    <p> {{double}} | {{greeting}}</p>
    <button type="button" @click="add">add</button> | 
    <button type="button" @click="updateTitle">update title</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch } from 'vue';
interface TCountData {
  count: number;
  double: number;
  add: () => void;
}
export default defineComponent({
  setup() {
    const data: TCountData = reactive({
      count: 0,
      double: computed(() => data.count*2),
      add: () => {
        data.count++
      }
    });
    const greeting = ref('');
    const updateTitle = () => {
      greeting.value += '!';
    }

    watch(() => 4, (newVal, oldVal) => {
      console.log('newVal', newVal);
      console.log('oldVal', oldVal);
      document.title = greeting.value;
    })

    return {
      ...toRefs(data),
      greeting,
      updateTitle
    };
  }
});
</script>
