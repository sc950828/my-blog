### 什么是 webpack?

webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

### 核心概念

entry: 入口

output: 输出

loader(在 module 的 rules 的数组里面配置): 模块转换器，用于把模块原内容按照需求转换成新内容

插件(plugins): 扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

### 使用

需要安装 webpack 和 webpack-cli。webpack-cli 它的作用就是让我们能够在命令行里面正确的使用 webpack 这个命令。

我们可以在 package.json 文件里面的 scripts 里面配置打包命令，"webpack": "webpack"。或者在命令行直接运行./node_modules/bin/webpack。或者使用在命令行直接运行 npx webpack。

webpack 有默认的配置，如默认的入口文件是 ./src，默认打包到 dist/main.js。默认的配置文件是 webpack.config.js。更多的默认配置可以查看: node_modules/webpack/lib/WebpackOptionsDefaulter.js。

指定用某配置文件使用命令 webpack --config=./config/webpack.config.js

webpack --watch 开启监听模式 边改动边打包 不会自动刷新浏览器。

```js
// webpack4 为了我们开发方便，已经给我们内置了一个默认的配置文件，规定了默认的 入口文件和输出文件
const path = require("path");

module.exports = {
  entry: "./src/index.js", // 打包的入口文件
  output: "./dist/main.js", // output 文件路径与名称
};
```

```js
// webpack的打包输出内容

// Hash: daacf045aacebdb28eb2 // 代表本次打包对应的唯一哈希值
// Version: webpack 4.41.5 代表本次打包使用的 webpack 的版本值
// Time: 502ms // 代表打包耗时
// Built at: 2020-01-09 23:45:41 // 打包时间
//     Asset      Size  Chunks             Chunk Names // 名称 大小 chunkid 入口的key值默认是main
// bundle.js  1.31 KiB       0  [emitted]  main
// Entrypoint main = bundle.js // 入口main对应bundle.js
// [0] ./src/index.js + 3 modules 770 bytes {0} [built]
//     | ./src/index.js 183 bytes [built]
//     | ./src/header.js 191 bytes [built]
//     | ./src/sidebar.js 200 bytes [built]
//     | ./src/content.js 196 bytes [built]
```

### 入口 entry

    入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
    可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 ./src/index.js。
    三种类型的入口文件写法
      字符串 'xx' 可以是相对路径 只会生成一个chunk chunk的名字是main
      数组 ['xx', 'xx']可以是相对路径 只会生成一个chunk chunk的名字是main
      对象 {a: 'xx', b: 'xx'} 可以是相对路径 每个入口生成一个chunk 每个chunk的名字就是对象的键名，默认是main。

    context
      启动webpack的时候会以context为根目录，context的默认值是执行webpack命令的当前目录，如果想要改变可以通过两种方式改变
        配置 context: path.resolve(__dirname, 'src') 必须是绝对路径
        命令行 webpack --context=xxx 必须是绝对路径

### 出口 output

    output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist/main.js
    注意，即使可以存在多个入口起点，但只指定一个输出配置。

    output是一个对象，主要设置path和filename两属性。
      path 输出文件的路径 必须是string类型的绝对路径。否则会抛错。
      filename 输出文件的名字 当有多个输出文件的时候需要使用到占位符。
        [name] 文件的chunk名字
        [id] chunk的唯一标识 从0开始
        [hash] chunk的唯一hash值
        [chunkhash] chunk内容的hash值
        [contenthash] 文件内容的hash
      publicPath //通常是CDN地址 不常用

### 模式 mode

通过选择 development 或 production 之中的一个，来设置 mode 参数，进行对 webpack 内置的优化。

我们也可以在命令行--mode=production 来指定 mode 的值。

当设置为 development 会将 process.env.NODE_ENV 的值设为 development，production 同理。

```js
// webpack.development.config.js
module.exports = {
  mode: "development",
  // 设置为development的时候
  // 会将 process.env.NODE_ENV 的值设为 development。
  // 启用 NamedChunksPlugin 和 NamedModulesPlugin。
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
};
```

```js
// webpack.production.config.js
module.exports = {
  mode: "production",
  // 当使用production的时候
  // 会将 process.env.NODE_ENV 的值设为 production。
  // 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,
  // ModuleConcatenationPlugin, NoEmitOnErrorsPlugin,
  // OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
  plugins: [
    new UglifyJsPlugin(/* ... */),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
```

### 创建本地服务器 webpack-dev-server 注意不会真正的打包

实现改变代码实时打包更新。以缓存的模式，不会真正的打包。真正的打包需要使用 webpack。

- 第一步： 安装 npm install webpack-dev-server
- 第二步： 配置 npm 命令 "dev": "webpack-dev-server" 使用 npm run dev 来开启

```js
devServer: {
  contentBase: "./dist",// 本地服务器所加载的页面所在的目录
  historyApiFallback: true,// 不跳转  它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html 只适用于单页面应用。
  host: '0.0.0.0', // 配置服务器监听地址
  port: 9000,  // 设置默认监听端口，如果省略，默认为”8080“
  // 配置代理 它的原理是使用 http-proxy-middleware 去把请求代理到一个外部的服务器。
  proxy: {
    '/api': {
      target: 'https://other-server.example.com',
      pathRewrite: {'^/api' : ''}, // 如果你不想始终传递 /api ，则需要重写路径
      secure: false, //只要设置 secure: false 就行 能使用https
      changeOrigin: true, // 是一个布尔值, 设置为 true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
    }
  },
  inline: true, // 实时刷新，默认开启 所以修改会实时刷新网页
  open: true,   // 自动打开浏览器,
  overlay: true,  // 错误在页面也出现,不仅仅是控制台 默认是关闭的
  hot: true, // 热替换模式 默认未开启 开启后修改代码不用再去刷新页面 需要new webpack.HotModuleReplacementPlugin()配合使用
  headers: {
    "X-Custom-Foo": "bar"
  },// 可以在http响应头中注入一些响应信息
  https: false, // 默认是http 设置为true则可以开启https服务
  compress: false, // 是否启用Gzip压缩
  quiet: false, // 默认不启用。除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
  stats: "errors-only", // 终端中仅打印出 error，注意当启用了 quiet 或者是 noInfo 时，此属性不起作用。
  clientLogLevel: "silent", // 当使用内联模式时，在浏览器的控制台将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换启用时。如果你不喜欢看这些信息，可以将其设置为 silent (none 即将被移除)。
}
```

webpack-dev-server 启动后会实时刷新网页，如果不想实时刷新可以使用热替换模式，配置 hot 或者时 hotOnly 或者命令行配置 webpack-dev-server --hot。热替换模式启动后 修改文件不会刷新网页而自动显示出来。

hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，hot 会自动刷新页面，hotOnly 不会刷新页面，而是在控制台输出热更新失败。

### devtool

devtool 中的一些设置，可以帮助我们将编译后的代码映射回原始源代码。不同的值会明显影响到构建和重新构建的速度。

会多生成每个原文件的 map 文件，在开发模式下我们在控制台 source tab 下的 webpack 文件夹里面能找到这些文件

生产环境可以使用 none 或者是 source-map，使用 source-map 最终会单独打包出一个 .map 文件，我们可以根据报错信息和此 map 文件，进行错误解析，定位到源代码。

source-map 和 hidden-source-map 都会打包生成单独的 .map 文件，区别在于，source-map 会在打包出的 js 文件中增加一个引用注释，以便开发工具知道在哪里可以找到它。hidden-source-map 则不会在打包的 js 中增加引用注释。

注意：避免在生产中使用 inline- 和 eval-，因为它们会增加 bundle 体积大小，并降低整体性能。

```js
//webpack.config.js 在开发模式下
module.exports = {
  devtool: "cheap-module-eval-source-map", // 开发环境下使用
  devtool: "none" / "source-map", // 生产环境可以使用
};
```

### resolve 配置 webpack 如何寻找模块所对应的的文件

- alias 取别名 注意需要是绝对路径
- extensions 文件没后缀名时默认加 ['.js', '.json']等等
- modules 设置查找 module 的目录 注意如果配置了就只会在该数组里面查找
- mainFields 设置模块入口文件 默认配置是 ['browser', 'main']

### watch

```js
// 默认 false，也就是不不开启
// 某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 assregateTimeout 时间到了，在统一去执行。
// 使用webpack-dev-server启动的默认开启了watch模式。所以会实时编译打包。
watch: true,
// 只有开启监听模式时，watchOptions才有意义
wathcOptions: {
  // 默认为空，不监听的文件或者文件夹，支持正则匹配
  ignored: /node_modules/,
  // 监听到变化发生后会等300ms再去执行，默认300ms
  aggregateTimeout: 300,
  // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
  poll: 1000
}
```

### externals

打包排除模块，防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖

### 加载器 loader 需要配置在 module 里面的 rules 数组里面

    loader从后往前解析。所以顺序不能错
    webpack只认识js和json，如果需要打包其他文件就需要用到loader。
    loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
    使用前需要下载好对应的loader，然后进行相关的配置
    通过 enforce 选项可以将一期中一个 loader 的执行顺序放到最前或者最后。
    配置
      test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
        可以是字符串 可以是数组
      include 只包括哪些文件 test检索的时候只会去这个路径下去查找
        可以是字符串 可以是数组
      exclude 不包括哪些文件
        可以是字符串 可以是数组
      loader 与use互斥 简单的设置loader
      use 属性，表示进行转换时，应该使用哪个 loader。loader从右往左执行
        里面的loader可以是字符串 可以是数组
        里面的loader可以是对象
          loader 使用哪个loader
          options loader的相关配置
          enforce 强制loader的加载顺序 post强制最后执行 pre强制最先执行

### 插件 plugins

    插件目的在于解决 loader 无法实现的其他事。
    模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。plugin 提供额外的能力，类似 vue/react 中的生命周期函数。它作用于整个构建过程，用于增强 webpack。
    由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。
      const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
      const webpack = require('webpack'); //访问内置的插件

    const config = {
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({filename: "index.html", template: './src/index.html'})
      ]
    };

### 常用的 loader

- babel-loader 用 babel 处理 js。(须同时安装 @babel/core @babel/preset-env)(@babel/preset-react 处理 react 代码)
- style-loader 将 css 内联到 html 头部
- css-loader 处理 css。
- postcss-loader 处理 css。(需安装 postcss 还有使用到的插件 autoprefixer)
- mini-css-extract-plugin.loader 将 css 抽离成单独的 css 文件
- sass-loader 处理 scss。(需同时安装 node-sass)
- less-loader 处理 less。(需同时安装 less)
- px2rem-loader px 转 rem
- url-loader 与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值时返回其 publicPath，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- image-loader：加载并且压缩图片文件
- ts-loader: 将 TypeScript 转换成 JavaScript
- eslint-loader：通过 ESLint 检查 JavaScript 代码
- tslint-loader：通过 TSLint 检查 TypeScript 代码
- vue-loader：加载 Vue.js 单文件组件

### 常用插件

- uglifyjs-webpack-plugin：压缩 js 不支持 ES6 压缩 (Webpack4 以前)
- terser-webpack-plugin: 压缩 js 支持压缩 ES6 (Webpack4)

- extract-text-webpack-plugin 把 css 从 js 中分离出来，打包成单独的 css 文件。webpack4 需要安装 extract-text-webpack-plugin@next 才行。
- mini-css-extract-plugin 把 css 从 js 中纹理出来，打包成单独的 css 文件。webpack4 推荐使用该插件。
- optimize-css-assets-webpack-plugin 压缩 css
- purgecss-webpack-plugin 和 glob 配合可以去除没有用到的 css。

- html-webpack-plugin 自动创建 html 文件然后将生成的 js 和 css 自动引入 html 页面。
- clean-webpakc-plugin 目录清理。使用了 hash 所以文件改动就会生成新的 js css，这个是用来清除这些 js css 的。
- zip-webpack-plugin：将打包出的资源生成一个 zip 包
- copy-webpack-plugin：将文件或者文件夹拷贝到构建的输出目录
- webpack.DefinePlugin：创建一个在 编译 时可以配置的全局常量，可以在 js 业务代码中使用。
- webpack.ProvidePlugin 配置全局变量，不用 import require 就可以使用。
- webpack-merge：提取公共配置，减少重复配置代码

- webpack.DllPlugin：抽取第三方 js，使用 dll 打包。
- webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
- webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
- webpack.HotModuleReplacementPlugin() 热更新
- html-webpack-externals-plugin，此插件可以将一些公用包提取出来使用 cdn 引入，不打入 bundle 中。
- friendly-errors-webpack-plugin 能给我们带来更好的日志提示体验
