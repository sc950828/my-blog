"use strict";
// 使用nodejs自带的文件路径工具
const path = require("path");
// 引入utils工具方法
const utils = require("./utils");
// 引入config下面的index.js
const config = require("../config");
// 引入vue-loader的相关配置
const vueLoaderConfig = require("./vue-loader.conf");

// 定义文件生成路径方法
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

// eslint 详细信息可以查看 ttp://npm.taobao.org/package/eslint-loader
const createLintingRule = () => ({
  // 检测以.js或者.vue结尾的文件
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  // 在所有loader之前执行
  enforce: "pre",
  // 只检测src和test文件夹下的代码
  include: [resolve("src"), resolve("test")],
  options: {
    // eslint 代码检查配置工具
    // community formatter 格式
    formatter: require("eslint-friendly-formatter"),
    // 开发的时候使用热模块更换需要设置为true config里面配置的是false，这里就是true
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = {
  context: path.resolve(__dirname, "../"),
  // 入口文件
  entry: {
    app: "./src/main.js"
  },
  // 出口
  output: {
    // config文件夹下的index.js
    // 打包的路径 '../dist' 就是src/dist
    path: config.build.assetsRoot,
    filename: "[name].js",
    // '/' 会影响到我们在index.html文件里面引入打包后的资源的路径
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  // 配置模块如何解析
  resolve: {
    // 自动解析确定的扩展 我们引入文件的时候可以不带后缀 会自动寻找如下配置的后缀。默认是.js和.json
    extensions: [".js", ".vue", ".json"],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    // 比如我们引入src下的文件的时候可以使用@代替src
    alias: {
      "@": resolve("src")
    }
  },
  // loader的配置
  module: {
    rules: [
      // eslint
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      // vue
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      // js
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ]
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          // 放static下面
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      // 音视频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          // 放static下面
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      // 字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          // 放static下面
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  // 这些选项可以配置是否 polyfill 或 mock 某些 Node.js 全局变量和模块
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
