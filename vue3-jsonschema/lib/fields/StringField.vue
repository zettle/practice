<template>
    <input type="text" />
</template>
<script lang="ts" setup="props">
import { ref } from 'vue';
import { FiledPropsDefine } from '../types';

export default {
    props: FiledPropsDefine
}

const count = ref(0);
</script>