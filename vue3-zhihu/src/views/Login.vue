<template>
    <div class="login-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">登录到者也</h5>
        <validate-form @form-submit="submitHander">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validate-input v-model="email" :rules="emialRules"></validate-input>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <validate-input v-model="password" :rules="passwordRules" type="password"></validate-input>
            </div>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { GolbalDataProps } from '@/store';
import ValidateForm from '@/components/ValidateForm.vue';
import ValidateInput, { RuleProps } from '@/components/ValidateInput.vue';
export default defineComponent({
    components: { ValidateForm, ValidateInput },
    setup () {
        const store = useStore<GolbalDataProps>();
        const router = useRouter();

        const email = ref('234@qq.com');
        const emialRules: RuleProps = [
            { type: 'required', message: '邮箱不能为空' },
            { type: 'email', message: '邮箱格式错误' }
        ];
        const password = ref('12');
        const passwordRules: RuleProps = [
            { type: 'required', message: '密码不能为空' }
        ];

        const submitHander = (isValid: boolean) => {
            if (!isValid) { return false; }
            // 登录成功，数据存vuex中
            store.commit('login', { name: email.value, id: '90999' });
            router.push('/');
        };

        return { email, emialRules, password, passwordRules, submitHander };
    }
});
</script>

<style lang="scss" scoped>
.invalid-feedback {
    display: block !important;
}
</style>
