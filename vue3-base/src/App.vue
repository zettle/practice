<template>
  <h1>{{count}}</h1>
  <p>{{double}}</p>
  <button @click="add">add</button>
</template>

<script lang="ts">
import { reactive, computed, toRefs } from 'vue';
interface Tcount {
  count: number;
  double: number;
  add: () => void;
}
export default {
  setup () {
    const data: Tcount = reactive({
      count: 0,
      double: computed(() => data.count*2),
      add: () => { console.log('add');data.count++}
    });
    const refData = toRefs(data);

    return {
      ...refData
    }
  }
};
</script>