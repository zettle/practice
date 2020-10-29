<template>
    <div ref="dropdownRef" class="dropdown">
        <a class="btn btn-outline-light my-2 dropdown-toggle" @click.stop="toggleOpen">{{title}}</a>

        <ul v-if="isOpen" class="dropdown-menu">
            <slot>
                <li class="dropdown-item" href="#">Action</li>
                <li class="dropdown-item" href="#">Another action</li>
                <li class="dropdown-item" href="#">Something else here</li>
            </slot>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useClickOutside from '@/hooks/useClickOutside';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup () {
        const isOpen = ref(false);
        const dropdownRef = ref<null | HTMLElement>(null);
        const isOutSize = useClickOutside(dropdownRef);

        // 打开下拉框
        const toggleOpen = () => {
            isOpen.value = true;
            isOutSize.value = false;
        };
        // 每次点击会改变这个变量，所以要通过监听这个变量来决定是隐藏还是展示
        watch(isOutSize, () => {
            if (isOutSize.value) {
                isOpen.value = false;
            }
        });

        return { isOpen, toggleOpen, dropdownRef };
    }
});
</script>

<style lang="scss" scoped>
.dropdown-menu {
    display: block !important;
}
</style>
