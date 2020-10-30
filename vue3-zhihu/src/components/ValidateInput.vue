<template>
    <div class="validate-input-container pb-3">
        <input
            :value="modelValue"
            :class="['form-control', {'is-invalid': inputRef.error}]"
            placeholder="请输入邮箱地址"
            type="text"
            v-bind="$attrs"
            @input="inputHander"
            @blur="validateInput" />
        <span v-show="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue';
import { emitter } from './ValidateForm.vue';

// 类型声明
export interface RuleProp {
    type: 'email' | 'required';
    message: string;
}
export type RuleProps = RuleProp[];

// 正则
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; // eslint-disable-line
export default defineComponent({
    inheritAttrs: false,
    props: {
        rules: {
            type: Array as PropType<RuleProps>
        },
        modelValue: String
    },
    setup (props, context) {
        const inputRef = reactive({
            val: props.modelValue || '',
            error: false,
            message: ''
        });
        const validateInput = () => {
            if (props.rules) {
                const isAllRightRule = props.rules.every(rule => {
                    let passed = true;
                    inputRef.message = rule.message;
                    switch (rule.type) {
                        case 'email':
                            if (!emailReg.test(inputRef.val)) {
                                passed = false;
                            }
                            break;
                        case 'required':
                            if (inputRef.val.trim() === '') {
                                passed = false;
                            }
                            break;
                    }
                    return passed;
                });
                inputRef.error = !isAllRightRule;
                return isAllRightRule;
            }
        };

        // input框的input事件
        const inputHander = (ev: KeyboardEvent) => {
            const targetVal = (ev.target as HTMLInputElement).value;
            inputRef.val = targetVal;
            context.emit('update:modelValue', targetVal);
        };

        onMounted(() => {
            emitter.emit('form-item-created', validateInput);
        });

        return { inputRef, validateInput, inputHander };
    }
});
</script>

<style lang="scss" scoped>
.invalid-feedback {
    display: block;
}
</style>
