### 1、postcss 一种对css编译的工具，类似babel对js的处理。css的后置处理器。
    常见的功能如：
      使用下一代css语法
      自动补全浏览器前缀
      自动把px代为转换成rem
      css代码压缩等等

### 2、常用的postcss插件
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
*  安装webpack的loader和postcss
    npm install postcss-loader postcss –save-dev
*  在webpack.config.js中的css模块配置使用该插件
*  在postcss.config.js中配置postcss的插件
