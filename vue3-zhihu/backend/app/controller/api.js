'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async columns() {
        const { ctx } = this;
        ctx.body = {
            "code": 0,
            "data": {
                "count": 11,
                "list": [
                    {
                        id: 1,
                        title: '这是我的第一篇栏目',
                        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
                        createdAt: '2020-06-11 10:34:22',
                        columnId: 1
                    },
                    {
                        id: 2,
                        title: '这是我的第二篇栏目',
                        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                        createdAt: '2020-06-11 10:34:22',
                        columnId: 1
                    },
                    {
                        id: 3,
                        title: '这是我的第三篇栏目',
                        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                        avatar: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
                        createdAt: '2020-06-11 10:34:22',
                        columnId: 1
                    }
                ],
                "pageSize": 5,
                "currentPage": 1
            },
            "msg": "请求成功"
        };
    }

    async column() {
        const { ctx } = this;
        ctx.body = {
            "code": 0,
            "data": {
                id: 1,
                title: '这是我的第一篇文章',
                content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
                createdAt: '2020-06-11 10:34:22',
                columnId: 1
            }
        }
    }

    async posts() {
        const { ctx } = this;
        const list = await this.yanchi();
        ctx.body = {
            code: 0,
            data: {
                list
            }
        };
    }

    async yanchi () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        title: '这是我的第一篇评价',
                        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
                        createdAt: '2020-06-11 10:34:22',
                        columnId: 1
                    },
                    {
                        id: 2,
                        title: '这是我的第二篇评价',
                        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                        createdAt: '2020-06-11 10:34:22',
                        columnId: 1
                    },
                    {
                        id: 3,
                        title: '这是我的第三篇评价',
                        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
                        avatar: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
                        createdAt: '2020-06-11 10:34:22',
                        columnId: 1
                    }
                ]);
            }, 4000);
        });
    }


    async login () {
        const { ctx } = this;
        ctx.body = {
            code: 0,
            data: {
                token: 'sddfjkwj23kwejjfsdkjf'
            }
        };
    }

    async user () {
        const { ctx } = this;
        ctx.body = {
            code: 0,
            data: {
                name: '夏明'
            }
        };
    }

    async upload () {
        const { ctx } = this;
        ctx.body = {
            code: 0,
            data: {
                fildId: 'https://p5.ssl.qhimg.com/t01299b812d5bddfd28.png'
            }
        };
    }
}

module.exports = HomeController;
