const path = require('path');

function resolve (dir) {
    return path.join(process.cwd(), dir); // 原来的cli2是在build里面，这里就不需要回退了
}

const vueConfig = {
    chainWebpack: config => {
        config.resolve
            .alias // 别命名
            .set('@', resolve('./src'))
            // .set('vue$', 'vue/dist/vue.esm.js')
            .set('assets', resolve('src/assets'));

        // 移除prefetch/preload插件，员工金融不需要提前加载，意义不大
        config.plugins.delete('prefetch-index');
        config.plugins.delete('preload-index');
    }
};

module.exports = vueConfig;
