const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")

module.exports = {
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // "style-loader" 把css生成style标签放入heade标签里面。
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
        include: /css/
      }
    ]
  },
  plugins: [
    // 自动创建html 引入js css
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html"
    }),
    // 把css从js中分离
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    // 使用purgecsswebpackplugin和glob配合去除没有用到的css
    new PurgecssWebpackPlugin({
      // 同步查找css目录下的任意文件
      // 返回一个数组，如['真实路径/css/style.css','真实路径/css/index.css',...]
      // {nodir: true}表示不包含文件夹，加快查找速度
      paths: glob.sync("./css/*", { nodir: true })
    }),
    // 动态引入CDN
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          // 引入的模块
          module: 'jquery',
          // cdn的地址
          entry: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js',
          // 挂载到了window上的名称
          // window.jQuery就可以全局使用
          global: 'jQuery'
        }
      ]
    })
  ]
};
