const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "boundle.js",
    publicPath: "/Randy"
  },
  devServer: {
    // 端口
    port: "9000",
    // ip
    host: "0.0.0.0",
    // 实时刷新，默认开启 默认是true
    inline: true,
    // 自动打开浏览器
    open: false,
    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
    overlay: true,
    // 热替换模式 默认未开启 开启后修改代码不实时刷新页面
    hot: true,
    hotOnly: true,
    // hotOnly: false,
    // 提供在服务器内部先于所有其他中间件执行自定义中间件的功能。这可以用于定义自定义处理程序
    before(app) {
      // 相当于直接写了后端的接口，哈哈 这种方法可以解决跨域
      app.get("/api/info", (req, res) => {
        res.json({
          nickname: "我滴个大榴莲啊",
          level: 8,
          src: "https://music.163.com/song/media/outer/url?id=1382794914.mp3"
        });
      });
    },
    // 提供在服务器内部内部执行所有其他中间件之后执行自定义中间件的能力
    after(app) {
      console.log(app);
    },
    // 你可以阻止控制台的消息显示。可能的值有 none, error, warning 或者 info（默认值）。
    clientLogLevel: "none",
    // 始终定位到index.html文件
    historyApiFallback: true,
    // gzip压缩
    compress: false,
    // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    // contentBase: path.join(__dirname, "dist"),
    // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。
    // 错误和警告仍然会显示。
    noInfo: false,
    // 将运行进度输出到控制台。
    progress: true,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。
    // 这也意味着来自 webpack 的错误或警告在控制台不可见。
    quiet: false
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    // 模块热替换 不用刷新浏览器就能页面更新
    new webpack.HotModuleReplacementPlugin()
  ]
};

// output的publicPath是用来给生成的静态资源路径添加前缀的；
// devServer中的publicPath是用来本地服务拦截带publicPath开头的请求的；
// contentBase是用来指定被访问html页面所在目录的；
