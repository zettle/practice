<template>
    <div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
            <div class="col-3 text-center">
                <img src="https://f11.baidu.com/it/u1=4170634177&u2=1663227958&fm=76" class="rounded-circle border w-100">
            </div>
            <div class="col-9">
                <h4>title</h4>
                <p class="text-muted">description</p>
            </div>
        </div>

        <div class="post-list">
            <article class="card mb-3 shadow-sm">
                <div class="card-body">
                    <h4><router-link to="/">title</router-link></h4>
                    <div class="row my-3 align-items-center">
                        <div class="col-4">
                            <img src="https://f11.baidu.com/it/u1=4170634177&u2=1663227958&fm=76" class="rounded-lg w-100">
                        </div>
                        <p class="col-8 text-muted">excerpt</p>
                    </div>
                    <span class="text-muted">createdAt</span>
                </div>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({

});
</script>

<style lang="scss" scoped>
.post-list h4 a {
    text-decoration: none;
    color:#1a1a1a;

    &:hover {
        color:#0d6efd;
    }
}
</style>
