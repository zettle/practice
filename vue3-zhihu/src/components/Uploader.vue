<template>
    <div>
        <slot v-if="fileStatus === 'loading'" name="loading">
            <button class="btn btn-primary" disabled>正在上传...</button>
        </slot>
        <slot v-if="fileStatus === 'sucess'" name="uploaded">
            <button class="btn btn-primary">上传成功</button>
        </slot>
        <slot v-else name="default">
            <button class="btn btn-primary" @click="tiggerInputClick">点击上传</button>
            <input ref="fileInput" type="file" class="d-none" @change="handleFileChange">
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

type UploadStatus = 'ready' | 'loading' | 'sucess' | 'error';
export default defineComponent({
    setup () {
        const fileInput = ref<null | HTMLInputElement>(null);
        const fileStatus = ref<UploadStatus>('ready');
        const tiggerInputClick = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };
        const handleFileChange = (ev: Event) => {
            const oInput = ev.target as HTMLInputElement;
            const files = oInput.files;
            if (files?.length) {
                fileStatus.value = 'loading';
                const oFormData = new FormData();
                oFormData.append('file', files[0]);
                axios.post('upload', oFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(resp => {
                    console.log(resp.data.data);
                    fileStatus.value = 'sucess';
                }).catch(err => {
                    console.log(err);
                    fileStatus.value = 'error';
                }).finally(() => {
                    if (oInput.value) {
                        oInput.value = '';
                    }
                });
            }
        };
        return { fileInput, tiggerInputClick, fileStatus, handleFileChange };
    }
});
</script>
