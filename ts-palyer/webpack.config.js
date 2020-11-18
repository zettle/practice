const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve (...args) {
    return path.resolve(__dirname, ...args);
}

module.exports = {
    mode: 'development', // development production
    entry: './src/main.ts',
    output: {
        path: resolve('dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    devServer: {
        contentBase: '/dist', // 服务器根路径，我们打包后会放在dist目录里面，所以设置dist目录是我们 localhost 服务的跟目录
        open: true // 自动打开浏览器
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    { loader: 'sass-loader', options: {implementation: require('dart-sass')} }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};