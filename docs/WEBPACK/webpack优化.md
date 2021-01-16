### speed-measure-webpack-plugin 测量各个插件和 loader 所花费的时间

```js
//webpack.config.js
// 使用speed-measure-webpack-plugin包裹配置就可以了。
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
  //...webpack配置
};

module.exports = smp.wrap(config);
```

### 使用 include exclude

我们可以通过 exclude、include 配置来确保转译尽可能少的文件。 exclude 的优先级高于 include。

exclude 和 include 需要是绝对路径

```js
const path = require("path");
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ["babel-loader"],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
};
```

### 去除没有用到的样式

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

### Tree-shaking 去除引入但是没有用到的 js

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

### scope hoisting

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
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  // ...
};

module.exports = devConfig;
```

### 动态添加 CDN

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
      global: "jQuery",
    },
  ],
});
```

### 多进程打包 happypack thread-loader

每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。处理完成之后，再将处理好的资源返回给 HappyPack 的主进程，从而加快打包速度。

thread-loader 原理和 HappyPack 类似，也是每次 webpack 解析一个模块，thread- loader 会将它及它的依赖分配给 worker 线程中，从而达到多进程打包的目的。

thread-loader 和 Happypack 我对比了一下，构建时间基本没什么差别。不过 thread-loader 配置起来为简单。

```js
// happypack的使用
const Happypack = require("happypack");
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: "Happypack/loader?id=js",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: "Happypack/loader?id=css",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules", "bootstrap", "dist"),
        ],
      },
    ],
  },
  plugins: [
    new Happypack({
      id: "js", //和rule中的id=js对应
      //将之前 rule 中的 loader 在此配置
      use: ["babel-loader"], //必须是数组
    }),
    new Happypack({
      id: "css", //和rule中的id=css对应
      use: ["style-loader", "css-loader", "postcss-loader"],
    }),
  ],
};
```

```js
// thread-loader
module.exports = {
  module: {
    //我的项目中,babel-loader耗时比较长，所以我给它配置 thread-loader
    rules: [
      {
        test: /\.jsx?$/,
        use: ["thread-loader", "cache-loader", "babel-loader"],
      },
    ],
  },
};
```

### 多进程压缩

使用 webpack-parallel-uglify-plugin 插件来帮我们完成，我们可以传递一些参数进去，然后完成多进程压缩代码。

```js
import ParallelUglifyPlugin from "webpack-parallel-uglify-plugin";

module.exports = {
  plugins: [
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
  ],
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
      keep_fnames: false,
    },
    parallel: true,
  }),
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
        parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
      }),
    ],
  },
};
```

### 充分利用缓存提升二次构建速度。

```js
// 可以单独安装cache-loader进行缓存

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
// 首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%。
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
plugins: [
  new HardSourceWebpackPlugin(),
];

```

### 压缩图片

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
            outputPath: "images/",
          },
        },
        {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: "65-90",
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
  ];
}
```

### resolve 配置

```js
module.exports = {
  //....
  resolve: {
    // 这样配置之后，我们 import Dialog from 'dialog'，会去寻找 ./src/components/dialog，
    // 不再需要使用相对路径导入。如果在 ./src/components 下找不到的话，就会到 node_modules 下寻找。
    modules: ["./src/components", "node_modules"], //从左到右依次查找
    // 路径别名
    alias: {
      "@": "src/components", // @代表这个路径
    },
    // 配置 extensions，我们就可以缺省文件后缀，在导入语句没带文件后缀时，
    // 会自动带上extensions 中配置的后缀后，去尝试访问文件是否存在
    extensions: ["web.js", ".js"], //当然，你还可以配置 .json, .css
    // 如果配置了 resolve.enforceExtension 为 true，那么导入语句不能缺省文件后缀。
    enforceExtension: true,
    // 配置查找的入口文件
    mainFields: ["style", "main"],
  },
};
```

### noParse

如果一些第三方模块没有 AMD/CommonJS 规范版本，可以使用 noParse 来标识这个模块，这样 Webpack 会引入这些模块，但是不进行转化和解析，从而提升 Webpack 的构建性能 ，例如：jquery 、lodash。

```js
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/,
  },
};
```

### 抽离公共代码 splitChunks

```js
// all: 不管文件是动态还是非动态载入，统一将文件分离。当页面首次载入会引入所有的包
// async： 将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
// initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包。

//webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      //分割代码块
      cacheGroups: {
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 1, //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          name: "common",
          minSize: 100, //大小超过100个字节
          minChunks: 3, //最少引入了3次
        },
      },
    },
  },
};
```

### DllPlugin DllReferencePlugin 处理第三方包

```js
// webpack.config.dll.js 单独配置
// 使用 "build:dll": "webpack --config webpack.config.dll.js" 构建出单独的dlljs
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    react: ["react", "react-dom"],
    vendor: ["vue", "vuex", "vue-router", "element-ui", "axios"],
  },
  mode: "production",
  output: {
    filename: "[name].dll.[hash:6].js",
    path: path.resolve(__dirname, "dist", "dll"),
    library: "[name]_dll", //暴露给外部使用
    //libraryTarget 指定如何暴露内容，缺省时就是 var
  },
  plugins: [
    new webpack.DllPlugin({
      //name和library一致
      name: "[name]_dll",
      path: path.resolve(__dirname, "dist", "dll", "manifest.json"), //manifest.json的生成路径
    }),
  ],
};

// webpack.config.js
// 使用DllReferencePlugin联系起来
const webpack = require("webpack");
const path = require("path");
module.exports = {
  //...
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "dist", "dll", "manifest.json"),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], //不删除dll目录
    }),
    //...
  ],
};
```

### 结合 vue-cli3 的 webpack 打包优化

按需加载，打包到不同的 bundle 里面。

```js
// webpack 支持三种代码分割方式分别是：
AMD: require([url], resolve')
CommonJS: r => require.ensure([], () => r(require('@/components/RequireEnsure'), 'ensure'))
ES6: () => import(url)
```

使用 webpack-bundle-analyzer 分析包结构

```js
// 安装配置
{
  chainWebpack: config => {
    config
      .plugin("webpack-bundle-analyzer")
      .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin());
  };
}

// 配置script脚本
"analyzer": "cross-env NODE_ENV=production npm_config_report=true npm run build"
```

使用 DllPlugin DllReferencePlugin 处理第三方包

使用 splitChunks 抽离公共代码
