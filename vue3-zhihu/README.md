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
