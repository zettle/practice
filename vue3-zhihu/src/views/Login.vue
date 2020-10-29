<template>
    <div class="login-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">登录到者也</h5>
        <validate-form>
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validate-input></validate-input>
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
import { defineComponent } from 'vue';
import ValidateForm from '@/components/ValidateForm.vue';
import ValidateInput from '@/components/ValidateInput.vue';

export default defineComponent({
    components: { ValidateForm, ValidateInput }
});
</script>
