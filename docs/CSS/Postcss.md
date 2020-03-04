### 1、postcss 一种对 css 编译的工具，类似 babel 对 js 的处理。css 的后置处理器。

- 常见的功能如：
  - 使用下一代css语法
  - 自动补全浏览器前缀
  - 自动把px代为转换成rem
  - css代码压缩等等

### 2、常用的 postcss 插件

    1. autoprefixer
      前缀补全，全自动的，无需多说
      安装：
      npm install autoprefixer --save-dev

    2. postcss-cssnext
      使用下个版本的css语法
      安装：
      npm install postcss-cssnext --save-dev

    3. postcss-pxtorem
      把px转换成rem
      安装：
      npm install postcss-pxtorem --save-dev

### 3、使用

- 安装 webpack 的 loader 和 postcss
  - npm install postcss-loader postcss –save-dev
- 在 webpack.config.js 中的 css 模块配置使用该插件
- 在 postcss.config.js 中配置 postcss 的插件
