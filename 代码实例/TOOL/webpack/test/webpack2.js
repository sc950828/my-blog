const path = require("path");
// 自动创建html文件然后自动引入打包好的js css
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 清除打包文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  // 入口可以是字符串 数组 对象 只有对象会分为多个chunk
  entry: {
    main: "./src/webpack2/index.js",
    main2: "./src/webpack2/add.js"
  },
  output: {
    filename: "[name].[id].[hash].js",
    path: path.resolve(__dirname, "dist2")
    // publicPath: "http://cdn.com.cn" // 在服务器访问的时候会加上这个前缀
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            // loader: "file-loader",
            loader: "url-loader", // 更精细的控制 是直接复制还是转为base64
            options: {
              // name: "randy.jpg"
              name: "[name]_[hash].[ext]",
              // 文件路径
              outputPath: "/images/",
              // 小于30k的才会直接打包到文件里 base64的形式
              limit: 30 * 1024
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //使用minicss将css生成单独的文件
          // "style-loader", //把css自动引用到head里面 称为内联样式
          {
            loader: "css-loader"
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index2.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CleanWebpackPlugin()
  ],
  devtool: "source-map"
};
