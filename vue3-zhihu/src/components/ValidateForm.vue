<template>
    <form class="validate-form-container">
        <!-- 表单内容区域 -->
        <slot name="default"></slot>
        <!-- 提交按钮区域 -->
        <div class="submit-area" @click.prevent="submitForm">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">提交</button>
            </slot>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    emits: {
        'form-submit': (playload: boolean) => {
            console.log(playload);
            return true;
        }
    },
    setup (props, context) {
        const submitForm = () => {
            context.emit('form-submit', true);
        };

        return { submitForm };
    }
});
</script>

<style lang="scss" scoped>

</style>
