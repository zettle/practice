<template>
    <div class="login-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">登录到者也</h5>
        <validate-form>
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <input v-model="emailRef.value" class="form-control" type="text" @blur="validateEmail">
                <span v-if="emailRef.error" class="invalid-feedback">{{emailRef.message}}</span>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <input class="form-control" type="password" placeholder="请输入密码" />
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
// import ValidateInput from '@/components/ValidateInput.vue';

export default defineComponent({
    components: { ValidateForm },
    setup () {
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

        return { emailRef, validateEmail };
    }
});
</script>

<style lang="scss" scoped>
.invalid-feedback {
    display: block !important;
}
</style>
