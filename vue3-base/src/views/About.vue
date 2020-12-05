<template>
  <div class="home">
    <h2>{{count}}</h2>
    <button type="button" @click="add">add</button>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent, reactive, toRefs,
  onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onRenderTracked, onRenderTriggered
} from 'vue';
interface TCountData {
  count: number;
}
export default defineComponent({
  name: 'About',
  setup(props, context) {
    const data: TCountData = reactive({
      count: 0,
      add: () => data.count++
    });

    onBeforeMount(() => {
      console.log('About-onBeforeMount');
    });
    onMounted(() => {
      console.log(this); //undefined
      console.log('About-onMounted');
    });
    onBeforeUpdate(() => {
      console.log('About-onBeforeUpdate');
    });
    onUpdated(() => {
      console.log('About-onUpdated');
    });
    onBeforeUnmount(() => {
      console.log('About-onBeforeUnmount');
    });
    onUnmounted(() => {
      console.log('About-onUnmounted');
    });
    onRenderTracked((event) => {
      console.log('onRenderTracked', event);
    });
    onRenderTriggered(() => {
      console.log('onRenderTriggered', event);
    });

    const refData = toRefs(data);

    return {
      ...refData
    }
  }
});
</script>
