<template>
    <div class="home">
        <!-- input输入list内容 -->
        <div>
            <input type="text" placeholder="请输入" v-model="content" @keyup.enter="addHandle"/>
        </div>
        <!-- todoList 内容展示和删除 -->
        <ul class="ul">
            <li class="item" v-for="(item, $i) of list" :key="$i">
                <p :class="{'active': item.isFinshed, content: true}" @click="updateHandle($i)">{{item.label}}</p>
                <div class="item-delete" @click="delHandle($i)">X</div>
            </li>
            <li class="item-node" v-if="list.length<=0">暂无数据</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent, ref } from 'vue';
import { StateType } from '../store';
export default defineComponent({
    setup () {
        const store = useStore<StateType>();

        const content = ref('');
        const list = computed(() => store.state.todoList);

        const addHandle = () => {
            if (content.value) {
                store.commit('save', content.value);
                content.value = '';
            }
        };

        const updateHandle = (index: number) => {
            store.commit('update', index);
        };

        const delHandle = (index: number) => {
            store.commit('del', index);
        };
        return {content, list, addHandle, updateHandle, delHandle};
    }
});
</script>
<style lang="scss" scoped>
ul, li {
    list-style: none;
    text-align: left;
}

.home {
    max-width: 400px;
    margin: 0 auto;

    .input {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        outline-style: none;
        border: 2px solid #999;
        padding: 5px 10px;
    }

    .ul {
        margin-top: 10px;
    }

    .item {
        height: 40px;
        line-height: 40px;
        padding-bottom: 5px;
        border-bottom: 1px solid #dcdfe6;
        color: #333;
    }

    .item-none {
        height: 40px;
        line-height: 40px;
        padding-bottom: 5px;
        color: #333;
        text-align: center;
    }

    .content {
        float: left;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }

    p.active {
        text-decoration: line-through;
        color: #999;
    }
    .item-delete {
        float: right;
        width: 25px;
        text-align: center;
        cursor: pointer;
    }
}
</style>