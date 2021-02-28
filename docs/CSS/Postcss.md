## postcss 文档

[postcss 文档](https://www.postcss.com.cn/)

## postcss 知识点

### postcss

postcss 是一种对 css 编译的工具，类似 babel 对 js 的处理。css 的后置处理器。

- 常见的功能如：
  - 使用下一代 css 语法
  - 自动补全浏览器前缀
  - 自动把 px 代为转换成 rem 或 vw
  - css 代码压缩等等

### 常用的 postcss 插件

```
1. autoprefixer
  前缀补全，全自动的，无需多说
  安装：
  npm install autoprefixer --save-dev

2. postcss-cssnext
  使用下个版本的css语法，比如变量的使用
  安装：
  npm install postcss-cssnext --save-dev

3. postcss-pxtorem
  把px转换成rem
  安装：
  npm install postcss-pxtorem --save-dev

4. postcss-px-to-viewport
  把px转换成vw vh
  安装：
  npm install postcss-px-to-viewport --save-dev

5. cssnano
  压缩代码
  安装：
  npm install cssnano --save-dev

6. precss
  类似预处理器 提供循环 变量等等功能
  安装：
  npm install precss --save-dev

7. postcss-import
  把通过@import引入的css直接引到当前文件里面来，减少http的请求次数
  安装：
  npm install postcss-import --save-dev
```

## 使用

### postcss-cli

这是 postcss 的命令行工具我们可以单独使用，我们还可以结合 webpack gulp grunt rollup 等打包工具来使用。

```shell
# 安装
npm i postcss-cli -g

# 新建postcss.config.js 在里面配置插件 注意插件需要安装然后引入才能使用
module.exports = {
  plugins: [
    autoprefixer,
    cssnext,
    cssnano,
    precss
  ]
}

# 编译
postcss ./src/a.css -o ./build/a.css
```

### webpack 中使用 postcss

1. 安装 webpack 需要用到的的 postcss-loader 和 postcss

```shell
npm install postcss-loader postcss –save-dev
```

2. 在 webpack.config.js 的模块中配置使用该插件
3. 在 postcss.config.js 中配置 postcss 的插件
