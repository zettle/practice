<template>
    <div>
        teleport
        <my-dialog></my-dialog>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import myDialog from '../components/myDialog';
export default defineComponent({
    components: {
        myDialog
    }
})
</script>