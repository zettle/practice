# vue3练手项目

vue3练手项目
- ts
- vue@3: 特别是新特性这一块
- boostrap@4: 构建ui


## 1、vue create选择的选项

![](./readmeImg/vue-choice.png)



## 2、开发过程记录的知识点
- 2.1 props遇到数组类型的时候
代码: `/src/components/ColumnList.vue`

在props遇到数组的时候，需要用 `as PropType<T>` 来告诉ts该props的类型
```js
props: {
    list: Array as PropType<string[]>
}
```
`PropType<T>`的作用是把构造函数断言为类型，这个在`vue@2`中也是存在的

同样也适用在 Object 上，代码: `/src/components/GlobalHeader.vue`
```js
props: {
    user: {
        type: Object as PropType<UserProps>,
        required: true
    }
}
```


- 2.2 refs获取DOM
在vue@3中，refs获取指定DOM有新的方式
```js
// html
<div ref="dropdown">123</div>

// js
setup () {
    const dropdownRef = ref<null | HTMLElement>(null);
    console.log(dropdownRef); // 此刻还是null
    onMounted(() => {
        console.log(dropdownRef.value); // 在挂载后，通过 `xx.value` 可以获取到DOM
    });
    return { dropdown: dropdownRef }; // 把这个return出去的赋值给html中的ref属性，vue会自动去获取
}
```
因为 `setup()` 执行的时候，还没有挂载到DOM。

所以在 `setup()` 函数里面是获取不到DOM的，此刻是null。等到挂载好了，vue会自动赋值给 `dropdownRef` 变量

另外要注意点的是，`ref`和`Ref`是不同的，前者是一个函数，后者是一个类型声明
```js
const dropdownRef: Ref<null | HTMLElement> = ref<null | HTMLElement>(null);
```