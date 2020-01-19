const path = require("path")
const webpack = require("webpack");
// 分离css webpack4 推荐使用mini-css-extract-plugin 而不是extract-text-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 自动创建html文件然后自动引入打包好的js css
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 使用了hash所以文件改动就会生成新的js css，这个是用来清除这些js css的
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  // 模式 有production 和 development， webpack内置的优化。
  mode: "development",
  // 入口 入口可以有多个，可以有字符串 对象 数组配置法。
  // 字符串简单配置
  // entry: "./src/index.js",
  //字符串配置
  // entry: {
  //   main: "./src/index.js"
  // },
  // 对象配置
  // entry: {
  //   app1: "./src/index.js",
  //   app2: "./src/function.js"
  // },
  // 数组配置
  // entry: {
  //   main: ["./src/index.js", "./src/function.js"]
  // },
  // 配置抽取公共模块入口
  entry: {
    app1: "./src/index.js",
    app2: "./src/function.js",
    vendor: ["jquery"]
  },

  // 出口
  // 普通固定路径 名字
  // output: {
  //   filename: "main.js",
  //   path: path.resolve(__filename, "../dist")
  // },
  // 占位符动态名字 hash避免发布新版本时线上使用浏览器缓存 占位符还有 id chunkhash等等
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  // 模块
  module: {
    rules: [
      // 使用babel处理js 需要安装babel-preset-env babel-core babel-loader包
      {
        test: /\.js$/,
        //loader: "babel-loader",//单个loader可以使用loader 或者use
        //use: "babel-loader",//单个loader可以使用loader 或者use
        // 多个loader我们使用use数组 或者loaders数组
        // use: [
        //   {
        //     loader: "babel-loader"
        //   }
        // ],
        loaders: [
          {
            loader: "babel-loader"
          }
        ],
        // 不匹配node_modules里面的js
        exclude: /node_modules/
      },
      // 使用css-loader style-loader处理css
      // {
      //   test: /\.css$/,
      //   use: [
      //     // loader从后往前解析
      //     {
      //       loader: "style-loader"//将解析好的css变成style标签插入到head里面
      //     },
      //     {
      //       loader: "css-loader"//将 CSS 转化成 CommonJS 模块
      //     }
      //   ],
      //   // 只匹配src/css文件夹里面的css
      //   include: /src\/css/
      // },
      // 增加了分离css的插件 ExtractTextPlugin 
      {
        test: /\.css$/,
        // 因为css单独抽离出去不用再插入html的head里面，所以可以不用style-loader。还使用了postcss
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        include: /src\/css/
      },
      // 处理scss
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        include: /src\/scss/
      },
      // 处理less
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        include: /src\/less/
      },
      // 处理图片 使用file-loader url-loader。file-loader是用来拷贝图片到目标目录，url-loader是把图片白案base64。
      {
        test: /\.(png|jpg|gif|jpeg)/,
        use: [
          // {
          //   loader: "file-loader" // 该loader可以不用安装 file-loader内置了file-loader
          // },
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]",
              limit: 33 * 1024 //超过33k的图片直接复制过去。不然就使用base64处理。
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins:[
    new HtmlWebpackPlugin({
      filename: "index.html", // 新建的html文件名
      template: "./src/public/index.html" // 基于哪个模板创建html
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: "[name][hash].css"
    }),
    new CleanWebpackPlugin()
  ]
}
