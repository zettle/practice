const Koa = require('koa');
const logger = require('koa-logger');
const app = new Koa();

const mid1 = async ctx => {
    console.log('mid1');
    ctx.type = 'text/html;charset=utf-8';
};

const mid2 = async ctx => {
    console.log('mid2');
    ctx.body = 'Hi';
};

const mid3 = async ctx => {
    console.log('mid3');
    ctx.body = ctx.body + ' Luke';
};
app.use(logger());
app.use(mid1);
app.use(mid2);
app.use(mid3);

app.listen(3000);