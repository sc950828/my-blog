"use strict";
// 引入utils工具方法
const utils = require("./utils");
// 使用本地webpack
const webpack = require("webpack");
// 获取config下的默认配置
const config = require("../config");
// 使用webpack配置合并插件
const merge = require("webpack-merge");
// 使用nodejs自带的文件路径工具
const path = require("path");
// 引入开发和生产的公共基础配置
const baseWebpackConfig = require("./webpack.base.conf");
// 复制文件 webpack不处理
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 用于生成index.html 并自动引入css js
const HtmlWebpackPlugin = require("html-webpack-plugin");
//
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
//
const portfinder = require("portfinder");
// 读取的是config文件夹下面dev.env.js里面的配置
// process.env实际上是 require("../config/dev.env")
// 获取主机名 就是获取项目开发环境ip
const HOST = process.env.HOST;
// 读取的是config文件夹下面dev.env.js里面的配置
// process.env实际上是 require("../config/dev.env")
// 获取项目开发环境部署的端口
// && 操作符输出第一个不为真值的变量，都为真值则输出最后一个变量的值
const PORT = process.env.PORT && Number(process.env.PORT);

// 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并
const devWebpackConfig = merge(baseWebpackConfig, {
  // loader的配置
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // 获取config文件夹下面index.js里面的配置
  // 代码映射 可以帮助我们将编译后的代码映射回原始源代码
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // dev-server相关的配置
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html")
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  // 插件的配置
  plugins: [
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    // 所以我们可以获取到process.env
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    // 模块热替换 不用刷新浏览器就能页面更新
    new webpack.HotModuleReplacementPlugin(),
    //
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    //
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将 index.html 作为模板，注入 打包后的js css代码后生成 新的index.html文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    }),
    // copy custom static assets
    // 把static下的文件复制过去 webpack不处理
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        // static
        to: config.dev.assetsSubDirectory,
        // .开始的隐藏文件不复制
        ignore: [".*"]
      }
    ])
  ]
});

module.exports = new Promise((resolve, reject) => {
  // 首先从config文件夹下的dev.env.js文件获取端口号 再去index.js文件获取端口号
  portfinder.basePort = process.env.PORT || config.dev.port;
  // 获取端口 端口被占用会加1
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      // 重新把端口赋值给 process.env
      process.env.PORT = port;
      // add port to devServer config
      // 重新把端口赋值给 devServer
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      // 能够更好在终端看到webapck运行的警告和错误
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
