# 深入学习koa

## 最简单的demo
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



## 主入口
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