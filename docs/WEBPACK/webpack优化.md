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

### 2、动态添加 CDN

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

### 3、Tree-shaking

在生产环境下，Tree-shaking 会进行自动删除的操作，如果通过 ES6 的 import 引用的方式引用的代码没有使用就会把该代码给删除掉。

- 代码引入了但是在当前文件夹没有被使用到就不会被打包。但是如果在该文件里面自身调用了自身的方法，导入过来虽然没有使用但是还是会被打包。
- 为了解决上面的问题我们需要在在 package.json 中配置。 "sideEffects": false
- 但是上面的问题会导致我们引用初始化 css 等文件的时候，虽然引入了但是没有使用，也会丢弃掉，所以我们需要修改成,`"sideEffects": ["./css/*.css"]`。这样排除这里的检查。这样我们的 css 引入不受影响。
