"use strict";
// 使用nodejs自带的文件路径工具
const path = require("path");
// 引入utils工具方法
const utils = require("./utils");
// 使用本地webpack
const webpack = require("webpack");
// 引入config文件夹下的index.js
const config = require("../config");
// 使用webpack配置合并插件
const merge = require("webpack-merge");
// 引入开发和生产的公共基础配置
const baseWebpackConfig = require("./webpack.base.conf");
// 复制文件 webpack不处理
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 用于生成index.html 并自动引入css js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 把css从js中分离出来
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩css
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
// 压缩js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 获取config文件夹下的prod.env.js配置
const env = require("../config/prod.env");

const webpackConfig = merge(baseWebpackConfig, {
  // loader配置
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  // 代码映射 生产环境是 source-map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // 出口
  output: {
    // 打包的路径 '../dist' 就是src/dist
    path: config.build.assetsRoot,
    // js会在static/js文件夹下
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    //
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
  },
  // 插件
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    // 所以我们可以获取到process.env值就是 require('../config/prod.env')
    new webpack.DefinePlugin({
      "process.env": env
    }),
    // 压缩js
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    // 分离css
    new ExtractTextPlugin({
      // 分离到static/css下面
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 生成index.html文件并自动引入css js
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // 代码分割
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "app",
      async: "vendor-async",
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    // 把static下的文件复制过去 webpack不处理
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ]
});

// GZip压缩
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

// 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
// 打包的时候 npm run build --report
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
