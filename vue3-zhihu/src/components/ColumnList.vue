<template>
    <div class="row">
        <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
            <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                    <img class="rounded-circle border border-light my-3" :src="column.avatar" />
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text text-left">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <!-- <router-link :to="`/columnDetail/${column.id}`" class="btn btn-outline-primary">详情</router-link> -->
                    <router-link :to="{name: 'columnDetail', params: {id:column.id}, query: {name: 'xiaoming'}}" class="btn btn-outline-primary">详情</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ColumnProps } from '@/testData';

export default defineComponent({
    props: {
        list: {
            type: Array as PropType<ColumnProps[]>,
            required: true // 加了这个required后表示必传，ts会自动推导出不可能为undefined
        }
    },
    setup (props) {
        const columnList = props.list.map(item => {
            item.avatar = item.avatar ? item.avatar : require('@/assets/column.jpg');
            return item;
        });

        return { columnList };
    }
});
</script>

<style lang="scss" scoped>
.card-body  {
    img{
        width: 50px;
        height: 50px;
    }
}
</style>
