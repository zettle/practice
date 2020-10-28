<template>
    <div class="login-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">登录到者也</h5>
        <form class="validate-form-container">
            <div class="submit-area">
                <div class="mb-3">
                    <label class="form-label">邮箱地址</label>
                    <input class="form-control" placeholder="请输入邮箱地址" type="text" />
                </div>
                <div class="mb-3">
                    <label class="form-label">密码</label>
                    <input class="form-control" type="password" placeholder="请输入密码" />
                </div>
            </div>
            <div class="submit-area">
                <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
});
</script>
