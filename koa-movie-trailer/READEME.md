# koa电影预告

## koa脚手架
这里直接用脚手架初始化项目
1. 执行`npm init -y`初始化
2. 执行`npm install -D koa-generator`。这里也可以执行`npm install -g koa-generator`把脚手架安装到全局中，不过自己不喜欢什么都往全局安装，所以安装在该项目中，后面通过npx初始化
3. 执行`npx koa2 -e`
> `koa2 -e [项目名称]`: -e表示用ejs模板引擎
4. 执行`npm install`
5. 执行`npm run dev`
6. 访问`http://localhost:3000/`


## UI框架
使用Bootstrap作为UI框架



## 视频播放器: Dplayer
[DPlayer相关文档](http://dplayer.js.org/zh/)



## 爬虫: puppeter
* [puppeter地址](https://github.com/puppeteer/puppeteer)
* [puppeter中文网](https://zhaoqize.github.io/puppeteer-api-zh_CN/)
* [各种国内镜像](https://www.npmjs.com/package/mirror-config-china)

遇到被墙的问题，先按照上面配置下[国内镜像](https://www.npmjs.com/package/mirror-config-china)

对node版本有要求，目前 `14.14.0` 可以，`10.15.1`不行


