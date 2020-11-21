<template>
  <div class="home">
    <h2>{{count}}</h2>
    <p>{{double}}</p>
    <button type="button" @click="add">add</button>
  </div>
</template>

<script lang="ts">
import { computed, isRef, ref, defineComponent, reactive, toRefs } from 'vue';
interface TCountData {
  count: number;
  double: number;
  add: () => void
}
export default defineComponent({
  name: 'Home',
  setup() {
    const data: TCountData = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      add: () => data.count++
    });

    const name = ref('');
    console.log('name-ifRef', isRef(name));
    console.log('data-ifRef', isRef(data.count));

    const refData = toRefs(data);
    console.log('refData-ifRef', isRef(refData.count));
    
    return {
      ...refData
    }
  }
});
</script>
