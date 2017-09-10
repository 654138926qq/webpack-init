### webpack-init

---

适用于自己项目的一款脚手架

#### 目录结构

---

    webpack-init
       ├─ README.md
       ├─ index.html *        // 访问入口 (打包后)
       ├─ dist *              // 打包后文件夹
       │    ├─ images         // 打包后的图片文件夹
       │    └─ ...
       ├─ src                 // 打包前文件夹
       │    ├─ style
       │    │   ├─ style.pcss // 存放pcss文件
       │    │   └─ ...
       │    ├─ img
       │    │   └─ ...        // 存放图片文件
       │    ├─ font
       │    │   └─ ...        // 存放字体文件
       │    ├─ js
       │    │   ├─ main.js    // webpack入口
       │    │   └─ ...
       │    └─ index.html     // 访问入口 (打包前)
       ├─ node_modules        // 依赖包文件夹 (需添加到gitignore)
       │    └─ ...
       ├─ webpack.config.js   // webpack打包配置文件
       ├─ package.json        // npm项目描述
       └─ .gitignore
       
       (*表示访问必需)

0、初始化

1. clone 仓库
2. 删除.git && git init
3. 修改package.json文件

1、安装

1. 需要安装cnpm
2. 一步安装完毕
       $ cnpm install
   或者分步安装，需要安装的模块名在package.json
  -  安装webpack以及插件，版本为2.6.1（目前较稳定的版本）

       ```
       $ cnpm i webpack@2.6.1 extract-text-webpack-plugin html-webpack-plugin -D
       ```
  -  根据业务需要安装loader

       ```
       // html 
       $ cnpm install html-loader -D
       // css
       $ cnpm install style-loader css-loader -D
       // postcss 
       $ cnpm i postcss-loader autoprefixer cssnano postcss-cssnext postcss-import -D
       // img路径解析，压缩
       $ cnpm install url-loader image-webpack-loader -D
       $ cnpm i file-loader -D
       // es6转es5语法
       $ cnpm i babel-loader babel-core -D
       // normalize.css
       $cnpm i normalize.css -D
       ```

2、开发

1. 修改入口文件 `src/main.js` ,  引入（`postcss-import`）样式（需要学习postcss及系列插件的语法）
2. `webpack.config.js`的配置
        //path是nodejs核心文件，用来解析路径
        const path = require('path');
        const webpack = require('webpack');
        // 自动生成html文件，可自定义名称和其他
        const ExtractTextPlugin = require("extract-text-webpack-plugin");
        // 用于分离html的插件
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
            //生产的html文件名（默认为index.html）(位置很重要)
            //可以添加其他的配置选项，例如：title，minify，favicon
            // 收藏夹图标
            favicon: 'src/img/favicon.ico',
            // 是否压缩代码
            minify: {
                collapseWhitespace: true
            }
          })
        ],
          resolve:{
            // 补充后缀
            extensions:[".js",".json",".jsx",".css"]
          }
        };

3、打包

`package.json`中`scripts` 已经配置好，运行`npm run + alias` 即可

    "scripts": {
        "build": "webpack -p", // 打包
        "watch": "webpack -p -w", // 监听
        "clean": "rm index.html && rm -rf dist", // 清除生成的文件
        "rebuild": "npm run clean && npm run build" // 重打包
    }

打包成功，访问index.html即可。

![](https://raw.githubusercontent.com/whelmin/mapbed/master/github/webpack.png)