
'use strict';

/**
 * Module dependencies.
 */
// 判断是否是一个标准的Generator函数
const isGeneratorFunction = require('is-generator-function');
const debug = require('debug')('koa:application'); // 轻量级的js debug工具

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

/**
 * Expose `Application` class.
 * Inherits from `Emitter.prototype`.
 */
// 继承了Emitter，说明这个类可以直接自定义事件注册回调函数，也可以触发，捕捉到其他地方触发
module.exports = class Application extends Emitter {
  /**
   * Initialize a new `Application`.
   *
   * @api public
   */

  /**
    *
    * @param {object} [options] Application options
    * @param {string} [options.env='development'] Environment
    * @param {string[]} [options.keys] Signed cookie keys
    * @param {boolean} [options.proxy] Trust proxy headers
    * @param {number} [options.subdomainOffset] Subdomain offset
    * @param {boolean} [options.proxyIpHeader] proxy ip header, default to X-Forwarded-For
    * @param {boolean} [options.maxIpsCount] max ips read from proxy ip header, default to 0 (means infinity)
    *
    */
  // 构造函数，定义了各种属性
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

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */
  /**
   * 使用 node 的 http服务启动一个服务
   */
  listen(...args) {
    debug('listen');
    // http.createServer的用法: http://nodejs.cn/api/http.html#http_server_listen
    const server = http.createServer(this.callback());
    return server.listen(...args); // 从这里看出外界传递的参数都传递给 http 模块
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env'
    ]);
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    return this.toJSON();
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */
  /**
   * use方法: 把外界传递进来的function push到数组里面
   */
  use(fn) {
    // 判断下，如果不是函数就抛异常
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

    // 把this再return出去，就可以链式操作了
    return this; 
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */
  /**
   * callback本质就是一个function
   * 最终传递 node 的 http.createServer 回调函数
   */
  callback() {
    // const compose = require('koa-compose')
    // 使用koa-compose处理下存中间件函数的数组
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  /**
   * Handle request in callback.
   *
   * @api private
   */
  /**
   * 通过ctx拿到request
   */
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res; 
    res.statusCode = 404; // 设置默认状态码
    // 异常的监听
    const onerror = err => ctx.onerror(err);

    // 负责返回客户端数据
    const handleResponse = () => respond(ctx);

    onFinished(res, onerror);

    // fnMiddleware就是经过koa-compose处理的中间件数组， 
    // 把请求的上下文对象ctx交给数组，让中间件昨晚它要做的事情，把做完的结果传递给handleResponse
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  /**
   * Initialize a new context.
   *
   * @api private
   */
  /**
   * 创建执行上下文ctx，然后挂载各种对象
   */
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

  /**
   * Default error handler.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
    // See https://github.com/koajs/koa/issues/1466
    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
    const isNativeError =
      Object.prototype.toString.call(err) === '[object Error]' ||
      err instanceof Error;
    if (!isNativeError) throw new TypeError(util.format('non-error thrown: %j', err));

    if (404 === err.status || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
  }
};

/**
 * Response helper.
 */
/**
 * 向客户端发送数据
 */
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  // 判断状态码是不是在允许的范围内，不在范围内的就返回
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' === ctx.method) {
    if (!res.headersSent && !ctx.response.has('Content-Length')) {
      const { length } = ctx.response;
      if (Number.isInteger(length)) ctx.length = length;
    }
    return res.end();
  }

  // status body
  // 判断内容时候是空的，如果是空的，把body设置为状态码信息
  if (null == body) {
    if (ctx.response._explicitNullBody) {
      ctx.response.remove('Content-Type');
      ctx.response.remove('Transfer-Encoding');
      return res.end();
    }
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' === typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}

/**
 * Make HttpError available to consumers of the library so that consumers don't
 * have a direct dependency upon `http-errors`
 */
module.exports.HttpError = HttpError;
