<template>
    <div id="nav">
      <router-link to="/">todoList</router-link>
      <router-link to="/about">about</router-link>
    </div>
    <router-view></router-view>
</template>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
<style lang="scss" scoped>
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
