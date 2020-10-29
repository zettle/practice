<template>
    <div class="dropdown">
        <a class="btn btn-outline-light my-2 dropdown-toggle" @click="toggleOpen">{{title}}</a>

        <ul v-if="isOpen" class="dropdown-menu">
            <li class="dropdown-item" href="#">Action</li>
            <li class="dropdown-item" href="#">Another action</li>
            <li class="dropdown-item" href="#">Something else here</li>
        </ul>
    </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup () {
        const isOpen = ref(false);
        const toggleOpen = () => {
            isOpen.value = true;
        };
        const clickHander = (e: MouseEvent) => {
            console.log(e);
        };
        onMounted(() => {
            document.addEventListener('click', clickHander);
        });
        onBeforeUnmount(() => {
            document.removeEventListener('click', clickHander);
        });
        return { isOpen, toggleOpen };
    }
});
</script>

<style lang="scss" scoped>
.dropdown-menu {
    display: block !important;
}
</style>
