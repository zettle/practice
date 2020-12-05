<script lang="ts">
import { defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    msg: {type: String, required: true}
  },
  render () {
    return h('p',  'this is title');
  }
});
</script>