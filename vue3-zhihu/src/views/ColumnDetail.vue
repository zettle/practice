<template>
    <div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
            <div class="col-3 text-center">
                <img :src="column.avatar" class="rounded-circle border w-100">
            </div>
            <div class="col-9">
                <h4>{{column.title}}</h4>
                <p class="text-muted">{{column.description}}</p>
            </div>
        </div>

        <div class="post-list">
            <article v-for="post of list" :key="post.id" class="card mb-3 shadow-sm">
                <div class="card-body">
                    <h4><router-link to="/">{{post.title}}</router-link></h4>
                    <div class="row my-3 align-items-center">
                        <div v-if="post.image" class="col-4">
                            <img :src="post.image" class="rounded-lg w-100">
                        </div>
                        <p class="col-8 text-muted">{{post.excerpt}}</p>
                    </div>
                    <span class="text-muted">{{post.createdAt}}</span>
                </div>
            </article>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { GolbalDataProps } from '@/store';
export default defineComponent({
    setup () {
        const route = useRoute();
        const store = useStore<GolbalDataProps>();
        // console.log(route.query, route.params);
        const id = +route.params.id;
        const list = computed(() => store.getters.getPostsById(id));
        const column = computed(() => store.getters.getColumnById(id));
        console.log(list);
        return { column, list };
    }
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
