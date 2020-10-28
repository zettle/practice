<template>
    <div class="post-detail-page">
        <article class="w-75 mx-auto mb-5 pb-3">
            <img src="https://f11.baidu.com/it/u1=4170634177&u2=1663227958&fm=76" class="rounded-lg img-fluid my-4">
            <h2 class="mb-4">title</h2>
            <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
                <div class="col">
                    <!-- 头像组件 -->
                    <div class="user-profile-component">
                        <div class="d-flex align-items-center">
                            <img src="https://f11.baidu.com/it/u1=4170634177&u2=1663227958&fm=76" class="rounded-circle img-thumbnail">
                            <div class="detail ml-2">
                                <h6 class="d-block mb-0">nickName</h6>
                                <span class="text-truncate text-muted d-block">description</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="text-muted col text-right font-italic">发表于: createdAt</span>
            </div>
            <div>currentHTMLcurrentHTMLcurrentHTML</div>
            <div class="btn-group mt-5">
                <router-link type="button" class="btn btn-success" to="/">编辑</router-link>
                <button type="button" class="btn btn-danger" @click="modalIsVisible = true">删除</button>
            </div>
        </article>

        <!-- 弹窗提示 -->
        <modal
            title="删除文章">
            <p>确定要删除这篇文章吗？</p>
        </modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '../components/Modal.vue';

export default defineComponent({
    components: { Modal },
    setup () {
        const modalIsVisible = ref(false);

        return { modalIsVisible };
    }
});
</script>

<style lang="scss" scoped>
.user-profile-component img {
    width: 50px;
    height: 50px;
}
</style>
