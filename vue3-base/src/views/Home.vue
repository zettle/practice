<template>
  <div class="home">
    <h2>{{count}}</h2>
    <p>{{double}}</p>
    <button type="button" @click="add">add</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
interface TCountData {
  count: number;
  double: number;
  add: () => void
}
export default defineComponent({
  name: 'Home',
  setup() {
    console.log(23);
    const data: TCountData = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      add: () => data.count++
    });

    const refData = toRefs(data);

    return {
      ...refData
    }
  }
});
</script>
