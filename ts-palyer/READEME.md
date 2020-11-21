# 慕课-TypeScript封装播放器组件

[慕课-TypeScript封装播放器组件](https://www.imooc.com/learn/1243) 学习做得笔记


## 1、 简写constructor初始化
```js
class Person {
    private name: string;
    constructor (name: string) {
        this.name = name;
    }
}
```
上面的可以简写为下面代码
```js
class Person {
    // 在形参前加修饰符，等同于上面的代码
    constructor (private name: string) {
    }
}
```