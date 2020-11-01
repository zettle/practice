<template>
    <teleport to="#back">
        <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container">
            <div class="loading-content">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">loading</span>
                </div>
                <p class="text-primary small">{{text}}</p>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
export default defineComponent({
    props: {
        text: String
    },
    setup () {
        const node = document.createElement('div');
        node.id = 'back';
        document.body.appendChild(node);

        onUnmounted(() => {
            document.body.removeChild(node);
        });
    }
});
</script>

<style lang="scss" scoped>
.loading-container {
    background: rgba(255, 255, 255, .5);
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
}
</style>
