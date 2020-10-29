<template>
    <div class="validate-input-container pb-3">
        <input class="form-control" placeholder="请输入邮箱地址" type="text" />
        <span class="invalid-feedback">sdf</span>
        <!-- <p>{{per.sdf}}</p> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup () {
        const person = ref({
            name: 'xiaoming',
            age: 23
        });

        return { per: person };
    }
});
</script>
