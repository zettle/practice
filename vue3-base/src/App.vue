<template>
    <!-- <div id="nav">
        <router-link to="/">数据变化</router-link> |
        <router-link to="/about">生命周期</router-link> |
        <router-link to="/watch">watch监听</router-link> |
        <router-link to="/hooks">hooks代码复用</router-link> |
        <router-link to="/hooksLoading">hooks-loading代码复用</router-link> |
        <router-link to="/defineComponent">defineComponent函数</router-link> |
        <router-link to="/teleport">teleport组件</router-link> |
        <router-link to="/modelDemo">teleport实现完整的弹窗</router-link> |
        <router-link to="/suspensePromise">suspense组件</router-link> |
        <router-link to="/mitt">mitt事件总线</router-link> |
        <router-link to="/test">test</router-link> |
        <router-link to="/watchEffect">watchEffect</router-link> |
        <router-link to="/watchEffecttime">watchEffecttime</router-link> |
        <router-link to="/parent">provider/inject</router-link> |
        <router-link to="/getDom">getDom</router-link> |
        <router-link to="/react">react</router-link> |
        <router-link to="/shallowReactive">shallowReactive 和 shallowRef</router-link> |
        <router-link to="/toRows">toRaw</router-link> |
        <router-link to="/toRawsRef">ref的toRaw</router-link> |
        <router-link to="/markRaw">markRaw</router-link> |
        <button @click="goPage('/demo/all')">跳到测试页</button>
    </div> -->
    <div class="view">
        <router-view v-slot="{ Component }">
            <transition name="slide-right">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        const router = useRouter();
        const goPage = (url: string) => {
            router.push(url);
        };
        return {goPage};
    }
})
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    border-bottom: 1px solid red;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s;
    // transition: transform 40s;
}

.slide-left-enter-from,
.slide-right-leave-active {
    transform: translateX(-100%);
}

.slide-left-leave-active,
.slide-right-enter-from {
    transform: translateX(100%);
}
</style>
