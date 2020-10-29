<template>
    <li :class="{'dropdown-option': true, 'is-disabled': disabled}"><slot></slot></li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        disabled: {
            type: Boolean
        }
    }
});
</script>

<style lang="scss" scoped>
.dropdown-option {
    padding-left: 10px;
    &.is-disabled {
        color: #6c757d;
        pointer-events: none;
        background-color: transparent;
    }

}
</style>
