<template>
    <div class="login-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">登录到者也</h5>
        <validate-form @form-submit="formSubmitHandler">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validate-input v-model="emailRef.value" :rules="rules" type="haha"></validate-input>
                {{emailRef.value}}
                <button @click="changeHander">改变</button>
            </div>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ValidateForm from '@/components/ValidateForm.vue';
import ValidateInput, { RuleProps } from '@/components/ValidateInput.vue';

export default defineComponent({
    components: { ValidateForm, ValidateInput },
    setup () {
        // 未封装
        const emailRef = reactive({
            value: 'sdf',
            message: '',
            error: false
        });
        const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; // eslint-disable-line
        const validateEmail = () => {
            if (emailRef.value.trim() === '') {
                emailRef.error = true;
                emailRef.message = '邮箱不能为空';
            } else if (!myreg.test(emailRef.value)) {
                emailRef.error = true;
                emailRef.message = '邮箱格式错误';
            } else {
                emailRef.error = false;
                emailRef.message = '';
            }
        };

        // 封装后
        const rules: RuleProps = [
            { type: 'required', message: '邮箱不能为空' },
            { type: 'email', message: '请输入邮箱格式' }
        ];

        const changeHander = () => {
            emailRef.value = '我是小红';
        };

        const formSubmitHandler = (isValid: boolean) => {
            console.log('page-', isValid);
        };
        return { emailRef, validateEmail, rules, changeHander, formSubmitHandler };
    }
});
</script>

<style lang="scss" scoped>
.invalid-feedback {
    display: block !important;
}
</style>
