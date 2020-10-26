<template>
    <div class="home">
        <p>{{ x }}; {{ y }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import useMousePosition from '../hooks/useMousePositon';
export default defineComponent({
    setup() {
        const {x, y} = useMousePosition();

        return { x, y };
    },
});
</script>
