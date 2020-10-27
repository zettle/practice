# vue3.0-基础操作

## 和vue2.0的代码的对比
点击按钮，累加器count累加1，然后还有个变量double是count的双倍

在vue2.0的时候，代码如下:
```js
export default {
    data () {
        return {
            count: 0
        };
    },
    computed: {
        double () {
            return this.count * 2;
        }
    },
    method: {
        add () {
            this.count++;
        }
    }
};
```

到了vue3.0

- 提供了setup生命周期，意为“准备阶段”。**在该周期里vue实例还没创建，所以无法通过this访问到实例。** 要把在页面上展示的数据和事件，在setup上最后要return出去 
- 提供了ref来实现相应，想要一个变量是相应的，只需要用ref包裹下
- 提供了computed函数，来实现上面的计算数据
- 由于没有实例，所以无法通过`this.xxx`访问对象。同时，改变数据得通过`xxx.value`去改变才会触发相应
变成下面的代码
```js
import { ref,computed } from 'vue';
export default {
    setup () {
        const count = ref(0);
        const double = computed(() => count.value * 2);

        const add = () => {
            count.value++;
        };

        return {
            count,
            double,
            add
        }
    }
};
```

再继续演变

- 上面代码中，count和double太分散了，我们可以用reactive函数来包裹整个数据。然后改变数据的时候，不需要通过`xxx.value`去改变了，而是通过`data.xxx`去改变
```js
setup () {
    const data = reactive({
        count: 0,
        double: computed(() => data.count*2),
        add: () => {data.count++}
    })
}
```
在vue3中，reactive和computed一起使用的时候，有个缺陷，reactive会返回一个any类型，这个时候ts编译器会提示下面
```
'data' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
```
![](./readmeImg/reactive-computed.png)

这个是用了computed后，ts推导reactive出现问题，然后给了data个any类型。

如果不用computed的话，ts倒是可以正确的推导出data的类型，如下注释掉computed的代码后，data的类型

![](./readmeImg/reactive-type.png)

解决这个有2种方法，一种是将data显性声明为any类型，这种失去了ts的意义
```js
setup () {
    const data: any = reactive({
        count: 0,
        double: computed(() => data.count*2),
        add: () => {data.count++}
    })
}
```
另外一种是为data声明一个interface，这样就可以让ts正确的推导
```js
interface Tcount {
    count: number,
    double: number,
    add: () => void
}

const data: Tcount = reactive({
    count: 0,
    double: computed(() => data.count*2),
    add: () => {data.count++}
})
```
推荐使用第2种

这样完整的代码就如下:
```vue
<template>
<h1>{{data.count}}</h1>
<p>{{data.double}}</p>
<button @click="data.add">add</button>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';
interface Tcount {
    count: number;
    double: number;
    add: () => void;
}
export default {
    setup () {
        const data: Tcount = reactive({
            count: 0,
            double: computed(() => data.count*2),
            add: () => {data.count++}
        })

        return { data }
    }
};
</script>
```
上面看出，在html中，我们每个数据、方法，都需要加上`data.xxx`。

那是因为在return的时候，我们return了一个`{data: data}`。所以自然html中每个地方都需要加上data。

为了优化，我们在return的时候改为`{...data}`，让数据直接return出去
```js
return {
    ...data
}
```
这个时候，发现数据可以正常渲染到页面上，但是点击按钮没有反应了，事件能够执行，但数据失去了响应式。

把es6的扩展改为普通的es5形式
```js
return {
    count: data.count,
    double: data.double,
    add: data.add
}
```
借助vscode查看类型发现，`data.count`这些变成了普通了number类型。

![](./readmeImg/count-number.png)

而在之前，我们在ref中是可以明确知道，能响应的应该是`Ref<T>`类型

![](./readmeImg/count-ref.png)

这也解释了为什么点击按钮不发生改变了，只有响应式的数据才会发生响应，我们把响应式数据中对象中取出来（即通过`data.xxx`）得到是普通类型的数据。

为了解决这个问题，vue3推出了 `toRefs()` 函数，在return出去之前，再用toRefs包装下data数据，就可以了。最终代码如下
```js
import { reactive, computed, toRefs } from 'vue';
interface Tcount {
    count: number;
    double: number;
    add: () => void;
}
export default {
    setup () {
        const data: Tcount = reactive({
            count: 0,
            double: computed(() => data.count*2),
            add: () => { console.log('add');data.count++}
        });
        const refData = toRefs(data); // 这里再包裹一下

        return {
            ...refData
        }
    }
};
```

> 这种问题的大致现象可以通过下面方式解释下:
在js中，我们定义了一个对象如下
```js
var person = { name:'xiaoming' };
var teacher = person;
person.name = 'xiaohong'; // 因为是引用，所以2个对象都改为xiaohong

var {name} = person;
name = '小哥'; // 脱离了引用赋值，所以这里的改变不会影响到原对象里面
```


## vue3的生命周期
从vue2迁到vue3的有: 
* `beforeCreate()` --> `use setup()`
* `created` --> `use setup()`
* `beforeMount` --> `onBeforeMount`
* `mounted` --> `onMounted`
* `beforeUpdate` --> `onBeforeUpdate`
* `updated` --> `onUpdated`
* `beforeDestory` --> `onBeforeUnmount`
* `destroyed` --> `onUnmounted`
* `activated` --> `onActivated`
* `deactivated` --> `onDeactivated`
* `errorCaptured` --> `onErrorCaptured`

vue3新增的有:
* `onRenderTracked`: 调试用的构造函数，参数event，有新旧值的变化
* `onRenderTriggered`: 调试用的构造函数，参数event，有事件的详细情况

```js
setup() {
    onBeforeMount(() => {
        console.log('About-onBeforeMount');
    });
    onMounted(() => {
        console.log('About-onMounted');
    });
    onBeforeUpdate(() => {
        console.log('About-onBeforeUpdate');
    });
    onUpdated(() => {
        console.log('About-onUpdated');
    });
    onBeforeUnmount(() => {
        console.log('About-onBeforeUnmount');
    });
    onUnmounted(() => {
        console.log('About-onUnmounted');
    });
    onRenderTracked((event) => {
        console.log('onRenderTracked', event);
    });
    onRenderTriggered(() => {
        console.log('onRenderTriggered', event);
    });
}
```


## watch监听
详情看 `Watch.vue`

监听一个响应式:
```js
watch(xxxx, (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
})
```
监听必须是一个 `/有返回值的函数/ref对象/响应式reactive对象/数组` ，否则会提示
```
A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types. 
```
![](./readmeImg/watch-warn.png)

```js
// 监听一个ref对象
const greeting = ref('');
watch(greeting, (newVal, oldVal) => {
    console.log(newVal, oldVal);
});

// 监听一个reactive对象
const data = reactive({
    count: 0
});
watch(data, (newVal, oldVal) => {
    console.log(newVal, oldVal); // 这里返回的是一整个Proxy对象
});

// 监听一个函数的返回值
watch(() => data.count, (newVal, oldVal) => {
    console.log(newVal, oldVal);
});

// 监听数组
watch([()=>data.count, greeting], (newVal, oldVal) => {
    console.log(newVal, oldVal); // 返回一个数组，每个元素和监听的数组格式一样
});
```



## 代码复用hooks
代码: `Hooks.vue`

在vue2中，组件代码的复用主要是依赖mixins实现

而在vue3中，组件代码的复用则主要使用hooks函数

比如这么个场景，进入页面后，监听下用户的点击，页面展示用户点击的 `x坐标/y坐标`

在vue3代码如下:
```js
setup() {
    const x = ref(0);
    const y = ref(0);
    const updateMouse = (ev: MouseEvent) => {
        x.value = ev.pageX;
        y.value = ev.pageY;
    };
    onMounted(() => { // 开始监听
        document.addEventListener('click', updateMouse);
    });
    onUnmounted(() => { // 取消监听
        document.removeEventListener('click', updateMouse);
    });

    return { x, y };
},
```
点击获取 `x坐标/y坐标` 这块逻辑是可以复用的，我们封装起来以后方便其他组件使用。

1. 在 `/src/hooks/useMousePosition.ts`。

我们习惯hooks文件名以 `useXXX.tx` 开头。

把上面的逻辑复制过去，内容如下:
```js
import { ref, onMounted, onUnmounted } from 'vue';
function useMousePosition () {
    const x = ref(0);
    const y = ref(0);
    const updateMouse = (ev: MouseEvent) => {
        x.value = ev.pageX;
        y.value = ev.pageY;
    };
    onMounted(() => { // 开始监听
        document.addEventListener('click', updateMouse);
    });
    onUnmounted(() => { // 取消监听
        document.removeEventListener('click', updateMouse);
    });
    return {x, y}; // 最后要return出去
}

export default useMousePosition;
```

2. 在页面上引入上面的hooks后，调用下获取到Ref类型的坐标
```js
setup() {
    const {x, y} = useMousePosition();
    return { x, y };
}
```
这种方式比mixins好很多，看出 `{x, y}` 是从哪里来的。



## 代码复用hooks
使用hooks封装一个场景，axios请求接口，请求前展示loading文字，请求后展示后台的数据

代码: `HooksLoading.vue`
```js
function useURLLoader (api: string) {
    const isLoading = ref(true);
    const isLoaded = ref(false);
    const result = ref(null);
    const error = ref(null);

    axios.post(api).then((rowData) => {
        isLoading.value = false;
        isLoaded.value = true;
        console.log(rowData.data)
        result.value = rowData.data;
    }).catch(err => {
        isLoading.value = false;
        isLoaded.value = true;
        error.value = err;
    });
    // 有响应式的，所以可以不用放在回调里面
    return { isLoading, isLoaded, result, error };
}

export default useURLLoader;
```



## defineComponent
defineComponent函数是为了ts而生，加上后可以给ts识别，能语法提示

比如加上后，能自动推导出prop的类型

代码: `DefineComponent.vue`

```js
export default defineComponent({
    props: {
        msg: String,
        age: {
            type: Number,
            required: true
        }
    },
    setup (props, context) {
        console.log(props.msg); // 推导出msg为`string | undefined`
        console.log(props.age); // 推导出age为`number`
    }
})
```
在vscode中，鼠标移动到 `props.msg` 上会自动提示msg的类型

![](./readmeImg/props-define.png)

`context`是一个对象，里面提供了3个属性给我们使用
- `context.attrs`
- `context.slots`
- `context.emit`



## Teleport
意为“瞬移”。

代码: `Teleport.vue`

有这么个场景，在页面上要展示一个全局遮罩对话框让用户选择，那么就可能这么设计组件
```html
<div class="page">
    <div class="com"></div>
    <Dialog v-if="isShow"></Dialog>
</div>
```
这种会造成这么个问题，渲染最终`<Dialog></Dialog>`会嵌套在页面组件内部，形成了父子结构，但是页面顶层组件是挂载在顶层DOM节点上的，`<Dialog>`变得非常深。

这就比较尴尬，从用户感知来说，`<Dialog>`组件应该是一个比较独立的组件。

![](./readmeImg/dialog.png)

Teleport就是为了解决这种情况

使用Teleport后，我们可以把组件挂载到指定的DOM上，而不必一定准守写代码时候组件的顺序

![](./readmeImg/dialog-2.png)

在封装`myDialog.vue`的时候，代码如下
```html
<!-- 表示渲染的时候，要挂载到id=modal的DOM上 -->
<teleport to="#modal">
    <div>
        myDialog
    </div>
</teleport>
```


## emits
代码: `ModelDemo.vue` 里面引用的 `myFullDialog.vue`

在vue3中，有个新属性emits，用来校验我们将要广播出去的emit是否符合我们要求，符合才会真正的emit出去

如果不想要校验，一个是可以不写，另外是可以设置为null

```js
emits: {
    close: (playload: any) => {
        return playload.type === 'close';
    }
}
```