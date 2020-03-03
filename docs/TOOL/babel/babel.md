1、babel是什么？
  Babel 是一个 JavaScript 编译器。
  将ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

2、使用
  需要安装@babel/core @babel/cli @babel/preset-env三个npm包
  如果使用到了 Promise,Set,Symbol,Array.from,async 等等的一些API。还需要额外配置。有以下两种方法。
  1.安装 @babel/plugin-transform-runtime包。 一般用于第三方类库的开发
  2.配置"useBuiltIns": "usage"或者"useBuiltIns": "entry"或者直接引入babel-polyfill这三种一般用于app(应用)开发。

3、运行
  配置.babelrc文件。或者babel.config.json文件或者.babelrc.json文件。
  ./node_modules/.bin/babel src --out-dir dist 把src下的打包到dist下。

4、配置文件
  presets是预设 是一系列插件的集合。一般使用@babel/env。预设是一个数组，从后往前读取。
  plugins是插件 完成某项功能。插件是一个数组，从前往后读取。
