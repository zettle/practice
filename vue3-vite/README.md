# vite初体验

vite的原理是利用浏览器现在支持es6的import，浏览器遇到import会发起一个http请求去加载js文件，vite会拦截这些请求，做一些预编译，省去webpack冗长的打包时间，开发编译速度得到极大的提高


## 1、创建vite工程
```shell
npm i -g create-vite-app

create-vite-app vue3-vite

cd vue3-vite

npm i 

npm run dev
```


## 2、集成typescript
1. 安装ts
```shell
npm i -D typescript
```

2. 创建配置文件
```shell
# 下面命令会在根目录创建 tsconfig.json
npx tsc --init
```

3. 把 `/src/main.js` 改为 `/src/main.ts`。同时把 `/index.html` 里面引入的 `main.js` 改为 `main.ts`

4. 把所有 `.vue` 文件里面的 `<script></script>` 改为 `<script lang="ts"></script>`

改为上面之后，就可以让vue支持ts了，但是会提示下面的异常: `找不到模块“./App.vue”或其相应的类型声明。`

这是因为缺少了.vue文件的声明，因此做好第5步

5. 根目录创建`shim-vue.d.ts`，内容如下:
```
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
```



## 3、集成vue-router
1. 安装
因为配套的是vue-router@4以上的版本，目前还没有发布正式版，所以需要指定下版本号
```shell
npm i vue-router@next
```

2. 创建 `/src/router/index.ts` 文件，内容如下
```typescript
import { createRouter, createWebHashHistory } from 'vue-router';
export default createRouter({
    // 指定使用hash模式
    history: createWebHashHistory(),
    routes: [

    ]
});
```

3. 在 `/src/main.ts` 中引入挂载到vue上
```typescript   
import router from './router';

createApp(App).use(router).mount('#app')
```



## 3、集成vuex
1. 安装
和vue3.0配套的vuex是vue@4以上版本
```shell
npm i vuex@next
```

2. 创建 `/src/store/index.ts` 文件，内容如下
```typescript
import { createStore } from 'vuex';
interface StateType {
    userName: string;
}
export default createStore({
    state: {
        userName: '小明'
    }
});
```

3. 在 `/src/main.ts` 中引入挂载到vue上
```typescript   
import store from './store';

createApp(App).use(store).mount('#app')
```



## 4、集成sass
1.安装依赖
```shell
npm i -D sass sass-loader
```

安装完后即可，在 `.vue` 文件中就可以直接使用`<style lang="scss" scoped></style>`