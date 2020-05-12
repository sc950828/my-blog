const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

// process.env 中默认并没有 NODE_ENV 需要在脚本中配置 NODE_ENV=development
// 为了兼容Windows和Mac，我们先安装一下 cross-env
// 主要是在webpack.config.js中使用
const isDev = process.env.NODE_ENV === "development";

const config = require("./config/html-webpack-plugin-config")[
  isDev ? "dev" : "pro"
];

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // 单一入口
  // entry: path.resolve(__dirname, "src1", "part1", "index.js"),
  // 多入口 但是只会打包成一个bundle.js文件
  entry: [
    path.resolve(__dirname, "src1", "part1", "index.js"),
    path.resolve(__dirname, "src1", "part1", "other.js")
  ],

  output: {
    // filename: "bundle.[hash:8].[id].js",
    // filename: "[name].[contenthash:8].js",
    // filename: "[contenthash:6].[chunkhash:6].js",
    filename: "[hash:6].js",
    path: path.resolve(__dirname, "dist1")
  },

  mode: isDev ? "development" : "production",

  devtool: "cheap-module-eval-source-map",

  resolve: {
    // 直接 import { sayHello } from "Hello";不用加./components
    modules: ["./src1/part1/components", "node_modules"],
    // 注意 需要是绝对路径
    alias: {
      "@": path.resolve(__dirname, "src1/part1/components")
    }
  },

  devServer: {
    port: "3000", //默认是8080
    hot: true
  },

  plugins: [
    new CleanWebpackPlugin({
      // 默认删除所有 "**/*"
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"] //不删除dll目录下的文件
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      config: config //参数在index.html文件里面通过options拿到。
    }),
    new CopyWebpackPlugin(
      [
        {
          from: "config/*.js",
          to: path.resolve(__dirname, "dist1", "js"),
          flatten: true
        }
        //还可以继续配置其它要拷贝的文件
      ],
      // 忽略哪些不移动
      {
        ignore: ["other.js"]
      }
    ),
    // 配置全局变量默认引入
    new webpack.ProvidePlugin({
      jquery: "jquery"
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ]
};

console.log(path.resolve(__dirname, "src1", "part1", "index.js"));
