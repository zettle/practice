<template>
    <teleport to="#modal">
        <div class="dialog" v-if="isShow">
            <div class="dialog-header">对话框header</div>
            <div class="dialog-content">
                <slot>对话框内容</slot>
            </div>
            <div class="dialog-footer">
                <span @click="close">关闭</span>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isShow: Boolean
    },
    // vue3新推出的，用来校验emit出去的是否符合我们的要求
    // 返回true 表示符合要求才会真正的emit出去
    // 如果不想要做校验，则设置为null就会一直通过
    emits: {
        close: (playload: any) => {
            console.log('=====', playload.type === 'close');
            return playload.type === 'close';
        }
        // close: null
    },
    setup(props, context) {
        const close = () => {
            context.emit('close', {type: 'sdfsd'});
        }
        return {close};
    }
});
</script>
<style lang="scss" scoped>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 200px;
    background-color: #fff;
    margin-top: -100px;
    margin-left: -200px;
    border: 1px solid #eee;
}
</style>
