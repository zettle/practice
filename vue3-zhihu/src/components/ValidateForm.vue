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
import { defineComponent, onUnmounted } from 'vue';
import mitt from 'mitt';
export const emitter = mitt();
// 声明
type ValidateFunc = () => boolean;

export default defineComponent({
    emits: {
        'form-submit': (playload: boolean) => { // eslint-disable-line
            return true;
        }
    },
    setup (props, context) {
        const funcArr: ValidateFunc[] = [];

        const callback = (func?: ValidateFunc) => {
            func && funcArr.push(func);
        };
        emitter.on('form-item-created', callback);

        onUnmounted(() => {
            emitter.off('form-item-created', callback); // 取消监听
        });

        const submitForm = () => {
            // 先用map让所有校验走一遍，返回`[false,true]`这种格式
            // 再用every遍历`[false,true]`看下是否都通过
            const isAllValid = funcArr.map(fun => fun()).every(isOk => isOk);
            context.emit('form-submit', isAllValid);
        };

        return { submitForm };
    }
});
</script>

<style lang="scss" scoped>

</style>
