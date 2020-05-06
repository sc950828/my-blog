### 1、去除没有用到的样式

```js
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

// 使用purgecss-webpack-plugin和glob配合去除没有用到的css
new PurgecssWebpackPlugin({
  // 同步查找css目录下的任意文件
  // 返回一个数组，如['真实路径/css/style.css','真实路径/css/index.css',...]
  // {nodir: true}表示不包含文件夹，加快查找速度
  paths: glob.sync("./css/*", { nodir: true })
}),
```

### 2、Tree-shaking 去除引入但是没有用到的 js

在生产环境下，Tree-shaking 会自动开启，会进行自动删除的操作。如果通过 ES6 的 import 引用的方式引用的模块没有使用就会把该模块代码给删除掉。

```js
// 使用 开发环境配置 mode: "development"
// 开发环境虽然这样设置了但是并不会去除只会加上一个注释 /*! exports used: add */
// mode设置为production会自动开启tree-shaking 会真正的删除没用到的代码
// 1.webpack.config.js
optimization: {
  usedExports: true;
}
// 2.package.json
"sideEffects": false; // 所有的都会经过tree-shaking 但是我们有些css引入会受到影响 设置数组排除就行。
//`"sideEffects": ["./css/*.css"]`。这样排除这里的检查。这样我们的 css 引入不受影响。
```

只能是静态声明和引用的 ES6 模块，不能是动态引入和声明的。所以通过条件 import 或者 require 引入的不会被 tree-shaking 处理。

```js
// webpack编译时会报错
if (condition) {
  import module1 from "./module1";
} else {
  import module2 from "./module2";
}
```

只能处理模块级别，不能处理函数级别的冗余；

只能处理 JS 相关冗余代码，不能处理 CSS 冗余代码。

### 3、scope hoisting

Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快，它又译作 "作用域提升"。

普通打包后我们可以看到一个问题就是 构建后的代码存在⼤大量量闭包代码，导致体积增大，运行代码时创建的函数作用域变多，内存开销变⼤。

scope hoisting 原理就是将所有模块的代码按照引用顺序放在一个函数作用域⾥，然后适当的重命名一些变量以防⽌变量名冲突，这样就可以减少函数申明代码和内存开销。

在 webpack4.0 中默认当 mode 为 production 的时候，就会开启 scope hoisting，或者我们可以使用 Webpack 的内置插件 ModuleConcatenationPlugin 自己配置。

```js
const webpack = require("webpack");

const devConfig = {
  mode: "none",
  // ...
  plugins: [
    // ...
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
  // ...
};

module.exports = devConfig;
```

### 4、动态添加 CDN

```js
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

// 动态引入CDN
new HtmlWebpackExternalsPlugin({
  externals: [
    {
      // 引入的模块
      module: "jquery",
      // cdn的地址
      entry: "https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js",
      // 挂载到了window上的名称
      // window.jQuery就可以全局使用
      global: "jQuery"
    }
  ]
});
```

### 5、多进程打包 happypack thread-loader

-每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。处理完成之后，再将处理好的资源返回给 HappyPack 的主进程，从而加快打包速度。

thread-loader 原理和 HappyPack 类似，也是每次 webpack 解析一个模块，thread- loader 会将它及它的依赖分配给 worker 线程中，从而达到多进程打包的目的。

```js
// happypack的使用
const makePlugins = (configs) => {
  const plugins = [
    ...
    new HappyPack({
      loaders: [ 'babel-loader' ]
    }),
  ];
  ...
  return plugins;
}

const commonConfig = {
  entry: {
    main: "./src/index.js",
    entry2: "./src/entry2.js",
    entry3: "./src/entry3.js",
    entry4: "./src/entry4.js",
    entry5: "./src/entry5.js",
    entry6: "./src/entry6.js",
  },
  ...
  module: {
    rules: [{
      test: /\.jsx?$/,
      // exclude: /node_modules/,
      // include: path.resolve(__dirname, '../src'),
      use: [
        'happypack/loader'
        // 'babel-loader'
      ]
    }]
  },
  ...
}

commonConfig.plugins = makePlugins(commonConfig);
```

```js
// thread-loader

const commonConfig = {
  ...
  module: {
    rules: [{
      test: /\.jsx?$/,
      // exclude: /node_modules/,
      // include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: 'thread-loader',
          options: {
            workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
          }
        },
        'babel-loader'
      ]
    }]
  },
  ...
}

commonConfig.plugins = makePlugins(commonConfig);
```

### 6、多进程压缩

使用 webpack-parallel-uglify-plugin 插件来帮我们完成，我们可以传递一些参数进去，然后完成多进程压缩代码。

```js
import ParallelUglifyPlugin from "webpack-parallel-uglify-plugin";

module.exports = {
  plugins: [
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    })
  ]
};
```

使用 uglifyjs-webpack-plugin，并开启 parallel 参数，之前的 webpack 版本推荐使用这个插件来对代码进行压缩，现在 webpack4.0 之后默认使用是 terser-webpack-plugin。两者的区别是前者不支持 es6 代码的压缩，后者是支持的。

```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const plugins = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      parse: {},
      compress: {},
      mangle: true, // Note `mangle.properties` is `false` by default.
      output: null,
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_fnames: false
    },
    parallel: true
  })
];
```

使用 terser-webpack-plugin，并开启 parallel 参数。

```js
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4 // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
      })
    ]
  }
};
```

### 7、充分利用缓存提升二次构建速度。

```js
// babel-loader 开启缓存
module: {
  rules: [
    {
      test: /\.jsx?$/,
      // exclude: /node_modules/,
      // include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
      ]
    },
  ]
}
// terser-webpack-plugin 开启缓存
optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
      cache: true,
    }),
  ],
},
// 使用hard-source-webpack-plugin 这个插件其实就是用于给模块提供一个中间的缓存
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
plugins: [
  new HardSourceWebpackPlugin(),
];

```

### 8、 压缩图片

借助 image-webpack-loader 帮助我们来实现。它是基于 imagemin 这个 Node 库来实现图片压缩的。

```js
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/"
          }
        },
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false
            },
            pngquant: {
              quality: "65-90",
              speed: 4
            },
            gifsicle: {
              interlaced: false
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        }
      ]
    }
  ];
}
```
