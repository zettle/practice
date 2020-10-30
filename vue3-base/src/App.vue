<template>
    <div id="nav">
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
    </div>
    <div class="view">
        <router-view />
    </div>
</template>

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
</style>
