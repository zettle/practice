<template>
    <div id="nav">
        <router-link to="/">数据变化</router-link> |
        <router-link to="/about">生命周期</router-link> |
        <router-link to="/watch">watch监听</router-link> |
        <router-link to="/hooks">hooks代码复用</router-link> |
        <router-link to="/hooksLoading">hooks-loading代码复用</router-link> |
        <router-link to="/defineComponent">defineComponent函数</router-link> |
    </div>
    <router-view />
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

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
