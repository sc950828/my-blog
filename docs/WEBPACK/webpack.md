### 1、什么是 webpack

webpack 是一个现代 JavaScript 应用程序的静态模块打包器。

### 2、使用

- 需要安装 webpack 和 webpack-cli。
- 运行 webpack 会自动读取当前运行命令的目录下的 webpack.config.js 文件。指定用某配置文件使用命令 webpack-dev-server --config=./config/webpack.config.js
- 本地安装的时候我们使用./node_modules/.bin/webpack 来运行 webpack。或者在 package.json 里面配置 script，"webpack": "webpack"他会自动去当前的 node_modules/.bin 里面查找 webpack 命令。
- webpack --watch 开启监听模式 边改动边打包 不会自动刷新浏览器。

### 3、创建本地服务器 webpack-dev-server 注意不会真正的打包

- 实现改变代码实时打包更新。以缓存的模式，不会真正的打包。真正的打包需要使用 webpack。
- 第一步： 安装 npm install webpack-dev-server
- 第二步： 配置 npm 命令 "server": "./node_modules/.bin/webpack-dev-server" 使用 npm run server 来开启

```js
devServer: {
  contentBase: "./dist",// 本地服务器所加载的页面所在的目录
  historyApiFallback: true,// 不跳转  它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html 只适用于单页面应用。
  port: 9000,  // 设置默认监听端口，如果省略，默认为”8080“
  host: '0.0.0.0', // 配置服务器监听地址
  inline: true, // 实时刷新，默认开启 所以修改会实时刷新网页
  open: true,   // 自动打开浏览器,
  overlay: true,  // 错误在页面也出现,不仅仅是控制台
  hot: true, // 热替换模式 默认未开启 开启后修改代码不用再去刷新页面
  headers: {
    "X-Custom-Foo": "bar"
  },// 可以在http响应头中注入一些响应信息
  https: false, // 默认是http 设置为true则可以开启https服务
  compress: false, // 是否启用Gzip压缩

}
```

- hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败

- 热替换模式
  - webpack-dev-server 启动后会实时刷新网页，如果不想实时刷新可以使用热替换模式 webpack-dev-server --hot 热替换模式启动后 修改文件不会自动实时刷新网页，下次以热模式启动后修改的都会自动刷新出来。

### 4、入口 entry

    入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
    可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 ./src/index.js。
    三种类型的入口文件写法
      字符串 'xx' 可以是相对路径 只会生成一个chunk chunk的名字是main
      数组 ['xx', 'xx']可以是相对路径 只会生成一个chunk chunk的名字是main
      对象 {a: 'xx', b: 'xx'} 可以是相对路径 每个入口生成一个chunk 每个chunk的名字就是对象的键名

    context
      启动webpack的时候会以context为根目录，context的默认值是执行webpack命令的当前目录，如果想要改变可以通过两种方式改变
        配置 context: path.resolve(__dirname, 'src') 必须是绝对路径
        命令行 webpack --context=xxx 必须是绝对路径

### 5、出口 output

    output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist/main.js
    注意，即使可以存在多个入口起点，但只指定一个输出配置。

    output是一个对象，主要设置path和filename两属性。
      path 输出文件的路径 必须是string类型的绝对路径。
      filename 输出文件的名字 当有多个输出文件的时候需要使用到占位符。
        [name] 文件的名字
        [id] chunk的唯一标识 从0开始
        [hash] chunk的唯一hash值
        [chunkhash] chunk内容的hash值

### 6、模式 mode

- 通过选择 development 或 production 之中的一个，来设置 mode 参数，进行对 webpack 内置的优化。
- 当设置为 development 会将 process.env.NODE_ENV 的值设为 development，production 同理。

```js
// webpack.development.config.js
module.exports = {
  mode: "development",
  // 设置为development的时候会自动使用如下两个插件
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
};
```

```js
// webpack.production.config.js
module.exports = {
  mode: "production",
  // 当使用production的时候会自动加上如下四个插件
  plugins: [
    new UglifyJsPlugin(/* ... */),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
```

### 7、加载器 loader 需要配置在 module 里面的 rules 数组里面

    loader从后往前解析。所以顺序不能错
    webpack只认识js，如果需要打包其他文件就需要用到loader。
    loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
    使用前需要下载好对应的loader，然后进行相关的配置
    在更高层面，在 webpack 的配置中 loader 有两个目标：
      test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
        可以是字符串 可以是数组
      include 只包括哪些文件 test检索的时候只会去这个路径下去查找
        可以是字符串 可以是数组
      exclude 不包括哪些文件
        可以是字符串 可以是数组
      use 属性，表示进行转换时，应该使用哪个 loader。loader从右往左执行
        可以是字符串 可以是数组
        里面的loader可以是对象
          loader 使用哪个loader
          options loader的相关配置
          enforce 强制loader的加载顺序 post强制最后执行 pre强制最先执行

### 8、resolve 配置 webpack 如何寻找模块所对应的的文件

- alias 取别名
- extensions 文件没后缀名时默认加 ['.js', '.json']等等

### 9、devtool

devtool 中的一些设置，可以帮助我们将编译后的代码映射回原始源代码。不同的值会明显影响到构建和重新构建的速度。

```js
//webpack.config.js 在开发模式下
module.exports = {
  devtool: "cheap-module-eval-source-map", // 开发环境下使用
  devtool: "none" / "source-map" // 生产环境可以使用
};
```

### 10、watch

    watch: false 默认是fasle 开启设置为true。在配置文件直接设置。
    也可以用命令行webpack --watch开启
    使用webpack-dev-server启动的默认开启了watch模式。所以会实时编译打包。

### 11、插件 plugins

    插件目的在于解决 loader 无法实现的其他事。
    模块代码转换的工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。
    由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。
      const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
      const webpack = require('webpack'); //访问内置的插件
      const path = require('path');

    const config = {
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
      ]
    };

### 12、命名

- webpack.config.js 这个文件是 webpack 的配置文件，名字唯一。默认读取，名字要换需要指定 webpack --config=config/webpack.dev.js
- 如果 config 文件在根目录并且名称为 webpack.config.js 我们可以直接使用 webpack 命令进行打包，否则需要通过 webpack --config=来指定 config 文件目录来进行打包。

### 13、常用插件

- extract-text-webpack-plugin 把 css 从 js 中分离出来，打包成单独的 css 文件。webpack4 需要安装 extract-text-webpack-plugin@next 才行。
- mini-css-extract-plugin 把 css 从 js 中纹理出来，打包成单独的 css 文件。webpack4 推荐使用该插件。
- html-webpack-plugin 自动创建 html 文件然后将生成的 js 和 css 自动引入 html 页面。
- clean-webpakc-plugin 目录清理。使用了 hash 所以文件改动就会生成新的 js css，这个是用来清除这些 js css 的。
- optimize-css-assets-webpack-plugin 压缩 css
- uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
- terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
- webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
- webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

### 14、常用的 loader

- babel-loader 用 babel 处理 js。(须同时安装 babel-core babel-preset-env)
- style-loader css-loader 处理 css。
- sass-loader 处理 scss。(需同时安装 node-sass)
- less-loader 处理 less。(需同时安装 less)
- postcss-loader 处理 css。(需安装 postcss 还有使用到的插件 autoprefixer)
- url-loader 与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值时返回其 publicPath，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- image-loader：加载并且压缩图片文件
- ts-loader: 将 TypeScript 转换成 JavaScript
- eslint-loader：通过 ESLint 检查 JavaScript 代码
- tslint-loader：通过 TSLint 检查 TypeScript 代码
- vue-loader：加载 Vue.js 单文件组件
