# 深入学习koa

## 1、 最简单的demo
```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);
```

koa此时的版本号是: `2.13.0`

koa的源码位置: `/node_modules/koa` 通过 `package.json`的main字段得出主入口是 `/node_modules/koa/lib/application.js`



## 2、 主入口

### 2.1 依赖
首先看下这个js的依赖了哪些模块

```js
// 判断是否是一个标准的Generator函数
const isGeneratorFunction = require('is-generator-function');

// 轻量级的js debug工具
const debug = require('debug')('koa:application');

// 事件监听，当一个http请求关闭、完成、出错的时候，调用注册好的回调函数
// https://blog.csdn.net/yangtzh/article/details/55260287
const onFinished = require('on-finished');

// 响应请求，向客户端或http请求的请求方返回数据
const response = require('./response');

// 中间件的函数数组， koa中的中间件都必须是函数数组，即数组中的每个元素都是一个函数，
const compose = require('koa-compose');

// context就是整个运行环境的上下文，在它里面不仅仅能访问到http请求的来源信息和方法，也可以访问到向客户端返回的信息和方法
// 简单的理解，就是整个http请求的上游、下游都可以通过content来访问
const context = require('./context');

// http请求的来源信息和方法，比如说cookie、headers、url等
const request = require('./request');

// 请求的状态码，是成功/失败/404等状态码
const statuses = require('statuses');

// nodejs的一个重要知识点: 事件循环，可以简单的理解订阅发布者模式
const Emitter = require('events');

const util = require('util');

// 流-数据流
const Stream = require('stream');

// node里面的http模块
const http = require('http');

// 白名单选择，把对象中的某些key给捡出来
const only = require('only');

// 针对老的koa的Generator中间件做兼容，将其转为标准的promise中间件
const convert = require('koa-convert');

// 判断在用的某些koa api是不是过期了，如果过期了会给出升级提示
const deprecate = require('depd')('koa');

const { HttpError } = require('http-errors');
```

然后看暴露出来的api，先不看细节，可以看出application.js暴露出来的就是一个class
```js
// 继承了Emitter，说明这个类可以直接自定义事件注册回调函数，也可以触发，捕捉到其他地方触发
// 更多内容看nodejs的events模块
module.exports = class Application extends Emitter {
    constructor(options) {}
  
    listen(...args) {}
    
    toJSON() {}
  
    inspect() {}
  
    use(fn) {}
  
    callback() {}
  
    handleRequest(ctx, fnMiddleware) {}
  
    createContext(req, res) {}
  
    onerror(err) {}
};
```

### 2.2 构造函数
接着看构造函数，定义了各种属性，注释如下
```js
constructor(options) {
    super();
    options = options || {};
    this.proxy = options.proxy || false;
    this.subdomainOffset = options.subdomainOffset || 2;
    this.proxyIpHeader = options.proxyIpHeader || 'X-Forwarded-For';
    this.maxIpsCount = options.maxIpsCount || 0;
    // env 环境变量
    this.env = options.env || process.env.NODE_ENV || 'development';
    if (options.keys) this.keys = options.keys;
    // middleware 中间件数组
    this.middleware = [];
    // context 上下文对象
    this.context = Object.create(context);
    // request 请求对象 
    this.request = Object.create(request);
    // response 响应对象
    this.response = Object.create(response);
    // util.inspect.custom support for node 6+
    /* istanbul ignore else */
    if (util.inspect.custom) {
        this[util.inspect.custom] = this.inspect;
    }
}
```


### 2.3 use方法
一般use的用法，我们用到use的场景如下
```js
// 代码 /src/app.js
app.use(async ctx => {
    ctx.body = 'Hello World';
});
```

看use的源码
```js
// 代码 /node_modules/koa/lib/application.js
use(fn) {
    // 判断下不是函数的就抛异常
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    // 兼容写法: 如果是老的koa的Generator中间件，将其转为标准的promise中间件
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');

    // 总体看下来，整个use的核心用法就是下面2句
    // 把传递进来的函数 push 到一个数组中
    this.middleware.push(fn);
    return this;
}
  ```



### 2.4 listen方法
在外界是这么用listen的
```js
// 代码: app.js
app.listen(3000);
```

在koa中，源码如下
```js
// 代码 /node_modules/koa/lib/application.js
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args); // 从这里看出外界传递的参数都传递给 http 模块
}
```
从代码不难看出，`app.linsten()` 传递的参数都会给到 node 的 http 模块。即[http模块的listen参数](http://nodejs.cn/api/http.html#http_server_listen)，都可以由外界传递进来

> `http.createServer` 的[用法](http://nodejs.cn/api/http.html#http_server_listen)

接受一个回调函数，代码如下:
```js
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
});
```

由此可以推出 koa 源码中 `const server = http.createServer(this.callback())` 的 `this.callback` 实现的就是类似上面的方法


### 2.5 callback方法
```js
// 代码 /node_modules/koa/lib/application.js
callback() {
    // const compose = require('koa-compose')
    // 使用koa-compose处理下存中间件函数的数组
    const fn = compose(this.middleware);
    if (!this.listenerCount('error')) this.on('error', this.onerror);

    // http.createServer接受的就是下面这个function
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res); // 创建执行上下文ctx对象
      return this.handleRequest(ctx, fn); // 调用 this.handleRequest
    };
    // 从这里看出，return一个函数，这个函数给http.createServer
    // 所以每次请求，都会进入这个
    return handleRequest;
}
```
callback里面返回一个函数给 `http.createServer` 使用，而callback通过 `this.handleRequest` 调用本类的的方法


### 2.7 createContext方法
创建执行上下文ctx，然后挂载各种对象
```js
// 创建了 ctx, 把各种对象往上挂载
createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
}
```



### 2.6 callback方法
```js
// 代码 /node_modules/koa/lib/application.js
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```