### 1、Loader 和 Plugin 的区别？

Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

### 2、Webpack 构建流程简单说一下

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

简单说

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

### 3、文件监听原理呢？

轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行

缺点：每次需要手动刷新浏览器

```js
module.export = {
  // 默认false,也就是不开启
  watch: true,
  // 只有开启监听模式时，watchOptions才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll: 1000
  }
};
```

### 4、说一下 Webpack 的热更新原理

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk 的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

### 5、文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改。
Chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 的 key 值会生出不同的 chunkhash。
Contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变。

### 6、占位符名称及含义

- ext 资源后缀名
- name 文件名称
- path 文件的相对路径
- folder 文件所在的文件夹
- contenthash 文件的内容 hash，默认是 md5 生成
- hash 项目的 hash，默认是 md5 生成
- emoji 一个随机的指代文件内容的 emoj

### 7、在实际工程中，配置文件上百行乃是常事，如何保证各个 loader 按照预想方式工作？

可以使用 enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。(inline/行内 官方不推荐使用)

    可能的值有："pre" | "post"
    指定 loader 种类。没有值表示是普通 loader。
    还有一个额外的种类"行内 loader"，loader 被应用在 import/require 行内。
    所有 loader 通过 前置, 行内, 普通, 后置 排序，并按此顺序使用。
    所有普通 loader 可以通过在请求中加上 ! 前缀来忽略（覆盖）。
    所有普通和前置 loader 可以通过在请求中加上 -! 前缀来忽略（覆盖）。
    所有普通，后置和前置 loader 可以通过在请求中加上 !! 前缀来忽略（覆盖）。
    不应该使用行内 loader 和 ! 前缀，因为它们是非标准的。它们可在由 loader 生成的代码中使用。

### 8、webpack 构建速度优化？

- 1.使用高版本的 Webpack 和 Node.js

- 2.多进程/多实例构建：使用 happypack(不再维护)、thread-loader 进行多进程打包

  - 每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。处理完成之后，再将处理好的资源返回给 HappyPack 的主进程，从而加快打包速度。
  - thread-loader 原理和 HappyPack 类似，也是每次 webpack 解析一个模块，thread- loader 会将它及它的依赖分配给 worker 线程中，从而达到多进程打包的目的。

- 3.多进程压缩

  - 使用 webpack-parallel-uglify-plugin 插件来帮我们完成，我们可以传递一些参数进去，然后完成多进程压缩代码
  - 使用 uglifyjs-webpack-plugin，并开启 parallel 参数，之前的 webpack 版本推荐使用这个插件来对代码进行压缩，现在 webpack4.0 之后默认使用是 terser-webpack-plugin。两者的区别是前者不支持 es6 代码的压缩，后者是支持的。
  - 使用 terser-webpack-plugin，并开启 parallel 参数。

- 4.充分利用缓存提升二次构建速度。我们可以开启相应 loader 或者 plugin 的缓存，来提升二次构建的速度。(babel-loader 开启缓存 terser-webpack-plugin 开启缓存 HardSourceWebpackPlugin)

- 5.缩小查找作用域：

  - 合理配置 exclude/include (确定 loader 规则范围)
  - 合理配置 resolve 参数。比如 resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)。resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)。resolve.extensions 尽可能减少后缀尝试的可能性。适当的别名 alias

- 6.webpack.DllPlugin 处理第三方包

  - 当 webpack 打包引入第三方模块的时候，每一次引入，它都会去从 node_modules 中去分析，这样肯定会影响 webpack 打包的一些性能，如果我们能在第一次打包的时候就生成一个第三方打包文件，在接下去的过程中应用第三方文件的时候，就直接使用这个文件，这样就会提高 webpack 的打包速度。这就是 DllPlugin 的作用。

### 9、webpack 对代码的优化？

- 1.压缩代码

- 使用 webpack-paralle-uglify-plugin 多进程并行压缩
- uglifyjs-webpack-plugin 压缩 js (不支持 ES6 webpack4 以前)
- terser-webpack-plugin 压缩 js(webpack4)
- 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，并使用 optimize-css-assets-webpack-plugin 插件压缩 css
- 还可以使用 compression-webpack-plugin 插件，开启 gzip 压缩。new CompressionWebpackPlugin()

- 2.压缩图片

借助 image-webpack-loader 帮助我们来实现。它是基于 imagemin 这个 Node 库来实现图片压缩的。

- 3.删除无用代码

- 项目中没有使用到的代码，我们开启 tree-shaking 去除没有用到的 js 代码，生产环境默认开启。
- css 我们使用 purgecss-webpack-plugin 和 glob 配合可以去除没有用到的 css。

- 4.提取页面公共资源

- 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
- 使用 CommonsChunkPlugin(webpack4 以前)或者 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)抽取和分离。

- 5.Scope hoisting 减少闭包 缩小打包体积

- Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快，它又译作 "作用域提升"。
- scope hoisting 原理就是将所有模块的代码按照引用顺序放在一个函数作用域⾥，然后适当的重命名一些变量以防⽌变量名冲突，这样就可以减少函数申明代码和内存开销。
- 在 webpack4.0 中默认当 mode 为 production 的时候，就会开启 scope hoisting，或者我们可以使用 Webpack 的内置插件 ModuleConcatenationPlugin 自己配置。

- 6.动态 Polyfill

- 建议采用 polyfill-service 只给用户返回需要的 polyfill。原理是用户每次打开浏览器，浏览器都会去请求 Polyfill.im，它会识别浏览器的 User Agent，下发不同的 Polyfill。减小打包体积。

- 7.动态 cdn

使用 html-webpack-externals-plugin 配置第三方包采用 cdn 的方式引入，减小打包体积。

- 8.合理配置 devtool 生成与环境最匹配的 sourceMap

- 9.合理配置 resolve 别名 后缀 模块查找 入口文件查找

- 10.合理使用 noParse

- 如果一些第三方模块没有 AMD/CommonJS 规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash。
