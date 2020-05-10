### 1、babel 是什么？

Babel 是一个 JavaScript 编译器。将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

### 2、使用

- 需要安装@babel/core @babel/cli @babel/preset-env 三个 npm 包。和 webpack 使用的时候需要 babel-loader
- 如果使用到了 Promise,Set,Symbol,Array.from,async 等等的一些 API。还需要额外配置。有以下两种方法。
  - 1.安装 @babel/plugin-transform-runtime 包。 一般用于第三方类库的开发
  - 2.配置"useBuiltIns": "usage"或者"useBuiltIns": "entry"或者直接引入 @babel-polyfill。

### 3、运行

- 配置.babelrc 文件。或者 babel.config.json 文件或者.babelrc.json 文件。
- ./node_modules/.bin/babel src --out-dir dist 把 src 下的打包到 dist 下。

### 4、配置文件

- presets 是预设 是一系列插件的集合。一般使用@babel/env。预设是一个数组，从后往前读取。
- plugins 是插件 完成某项功能。插件是一个数组，从前往后读取。
