const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

console.log(process.env.NODE_ENV);

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src1", "part2", "index.js"),
    main: path.resolve(__dirname, "src1", "part2", "main.js")
  },
  output: {
    path: path.resolve(__dirname, "dist2"),
    filename: "[name].[hash:6].js"
  },

  mode: "development",

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index2.html",
      filename: "index.html",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      template: "index2.html",
      filename: "main.html",
      chunks: ["main"]
    }),
    // 如果 value 是一个字符串，会被当做 code 片段
    // 如果 value 不是一个字符串，会被stringify
    // 如果 value 是一个对象，正常对象定义即可
    // 如果 key 中有 typeof，它只针对 typeof 调用定义
    new webpack.DefinePlugin({
      DEV: JSON.stringify("我通过DefinePlugin定义")
    })
  ]
};
