<template>
    <div class="home-page">
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <img src="~assets/callout.svg" alt="callout" class="w-50" />
                    <h2 class="font-weight-light">随心写作，自由表达</h2>
                    <p>
                        <button type="button" class="btn btn-primary my-2" @click="goAddArtilcePage">开始写文章</button>
                    </p>
                </div>
            </div>
        </section>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <p>共{{len}}有个栏目</p>
        <column-list :list="list"></column-list>

        <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25">加载更多</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { GolbalDataProps } from '@/store';
import ColumnList from '@/components/ColumnList.vue';

export default defineComponent({
    components: { ColumnList },
    setup () {
        const router = useRouter();
        const store = useStore<GolbalDataProps>();
        const goAddArtilcePage = () => {
            router.push({ name: 'columnDetail', params: { id: 1 }, query: { name: 'xiaoming' } });
        };
        const list = computed(() => store.state.columns);
        const len = computed(() => store.getters.getColumnLen);

        onMounted(() => {
            store.dispatch('fetchColumns');
        });
        return { list, goAddArtilcePage, len };
    }
});
</script>
