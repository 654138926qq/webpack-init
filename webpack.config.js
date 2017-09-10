//path是nodejs核心文件，用来解析路径
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

//require会把入口文件相关的所有文件都打包
module.exports = {
    entry: ['./src/js/main.js'],
    //入口文件（打包相关文件）
    output: {
        //出口文件（打包到哪里）
        path: path.resolve(__dirname, "dist"),
        // resolve：进行拼接, __dirname：命令行位置(项目根目录)
        filename: "app.js?[chunkhash:8]",
        //文件名
        publicPath: "dist/"
    },
    module: {
        //模块
        rules: [
            //规则
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.pcss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader","postcss-loader"]
                })
            },
            {
                test: /\.css$/,
                use: ["css-loader","postcss-loader"]

            },
            {
                test: /\.(jpe?g|png)$/,
                use: "file-loader?limit=8192&name=[name][hash:8].[ext]&outputPath=images/"
            }

        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new ExtractTextPlugin('[name].css?[contenthash:8]'),
        new HtmlWebpackPlugin({
            template: 'src/main.html',
            //模版文件地址
            filename: '../index.html',
            //生产的html文件名（默认为index.html）
            //可以添加其他的配置选项，例如：title，minify，favicon
            favicon: 'src/img/favicon.ico',
            minify: {
                collapseWhitespace: true
            }
        })

    ],
    resolve:{
        extensions:[".js",".json",".jsx",".css"]
    }
};