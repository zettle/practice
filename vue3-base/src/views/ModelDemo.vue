<template>
    <div>
        <button type="button" @click="openDialog">打开弹窗</button>
        <my-full-dialog :isShow="isShow" @close="closeDialog">
            <div>哈哈哈</div>
        </my-full-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import myFullDialog from '../components/myFullDialog.vue';
export default defineComponent({
    components: {
        myFullDialog
    },
    setup() {
        const isShow = ref(false);

        const openDialog = () => {
            isShow.value = true;
        }
        const closeDialog = () => {
            isShow.value = false;
        }

        return {isShow, openDialog, closeDialog};
    }
});
</script>
