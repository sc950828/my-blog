## babel 文档

[babel 中文文档](https://www.babeljs.cn/docs/)

## babel 简介

### babel 是什么？

Babel 是一个 JavaScript 编译器。将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

### 版本

babel5 是一个全家桶 一次安装包括了各种包 plugin。

babel 6 是 2015 年 10 月 30 号发布

- 拆分成几个核心包，babel-core,babel-node,babel-cli...
- 没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化
- 添加了 preset，也就是预置条件。
- 增加了 .babelrc 文件，方便自定义的配置。

## 常用包

1. babel-core

可以看做 babel 的编译器。babel 的核心 api 都在这里面，比如 transform，主要都是处理转码的。它会把我们的 js 代码，抽象成 ast，即 abstract syntax tree 的缩写，是源代码的抽象语法结构的树状表现形式。我们可以理解为，它定义的一种分析 js 语法的树状结构。也就是说 es6 的新语法，跟老语法是不一样的，那我们怎么去定义这个语法呢。所以必须要先转成 ast，去发现这个语法的 kind，分别做对应的处理，才能转化成 es5.

```shell
npm install --save-dev @babel/core
```

2. babel-cli

提供命令行运行 babel。也就是你可以 babel filename 去对文件转码。

使用

```shell
# 工具安装
$ npm i @babel/cli -g

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

因为 Babel 虽然开箱即用，但是什么动作也不做，如果想要 Babel 做一些实际的工作，就需要为其添加插件(plugin)或者预设。

需要配置在.babelrc 文件或者 babel.config.json 文件或者.babelrc.json 文件中配置插件或者预设。

3. babel-external-helpers

是 babel-cli 中的一个 command，用来生成一段代码，包含 babel 所有的 helper 函数。babel 有很多辅助函数，例如 toArray 函数， jsx 转化函数。这些函数是 babel transform 的时候用的，都放在 babel-helpers 这个包中。如果 babe 编译的时候检测到某个文件需要这些 helpers，在编译成模块的时候，会放到模块的顶部。

4. babel-node

@babel/node 模块的 babel-node 命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

首先，安装这个模块。

```shell
npm install --save-dev @babel/node
```

然后，执行 babel-node 就进入 REPL 环境。

```shell
npx babel-node
> (x => x * 2)(1)
2
```

babel-node 命令可以直接运行 ES6 脚本。将上面的代码放入脚本文件 es6.js，然后直接运行。

```shell
# es6.js 的代码
# console.log((x => x * 2)(1));
$ npx babel-node es6.js
2
```

5. babel-register

@babel/register 模块改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载.js、.jsx、.es 和.es6 后缀名的文件，就会先用 Babel 进行转码。

```shell
npm install --save-dev @babel/register
```

使用时，必须首先加载@babel/register。

```js
// index.js
require("@babel/register");
require("./es6.js");
```

然后，就不需要手动对 index.js 转码了。

```js
$ node index.js
2
```

需要注意的是，@babel/register 只会对 require 命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

6. babel-runtime

这个包很简单，就是引用了 core-js 和 regenerator，然后生产环境把它们编译到 dist 目录下，做了映射，供使用。那么什么是 core-js 和 regenerator 呢。
首先我们要知道上面提到的 babel-core 是对语法进行 transform 的，但是它不支持 build-ints（Eg: promise，Set，Map），prototype function（Eg: array.reduce,string.trim），class static function （Eg：Array.form，Object.assgin），regenerator （Eg：generator，async）等等拓展的编译。所以才要用到 core-js 和 regenerator。

core-js 是用于 JavaScript 的组合式标准化库，它包含 es5 （e.g: object.freeze）, es6 的 promise，symbols, collections, iterators, typed arrays， es7+提案等等的 polyfills 实现。也就是说，它几乎包含了所有 JavaScript 最新标准的垫片。

regenerator 主要就是实现了 generator/yeild， async/await。

7. babel-polyfill

babel-runtime 已经是一堆 polyfill 了，为什么这里还有一个类似的包，它同样是引用了 core-js 和 regenerator，垫片支持是一样的。官网是这么说的，babel-polyfill 是为了模拟一个完整的 ES2015 +环境，旨在用于应用程序而不是库/工具。并且使用 babel-node 时，这个 polyfill 会自动加载

也就是说，它会让我们程序的执行环境，模拟成完美支持 es6+ 的环境，毕竟无论是浏览器环境还是 node 环境对 es6+ 的支持都不一样。它是以重载全局变量 （E.g: Promise）,还有原型和类上的静态方法（E.g：Array.prototype.reduce/Array.form），从而达到对 es6+ 的支持。不同于 babel-runtime 的是，babel-polyfill 是一次性引入你的项目中的，就像是 React 包一样，同项目代码一起编译到生产环境。

### polyfill

如果使用到了 Promise,Set,Symbol,Array.from,async 等等的一些 API。在低版本浏览器中没有相应的 api，所以就需要用到 polyfill。让新的内置函数、实例方法等在低版本浏览器中也可以使用。

@babel/polyfill 模块包括 core-js(版本 2) 和一个自定义的 regenerator runtime 模块，可以模拟完整的 ES2015+ 环境（不包含第 4 阶段前的提议）。

babel V7.4.0 版本开始，@babel/polyfill 已经被废弃(前端发展日新月异)，需单独安装 core-js 和 regenerator-runtime 模块。

@babel/polyfill 自带 core-js@2， 但是 core-js@2 分支中已经不会再添加新特性，新特性都会添加到 core-js@3。例如你使用了 Array.prototype.flat()，如果你使用的是 core-js@2，那么其不包含此新特性。为了可以使用更多的新特性，建议大家使用 core-js@3。

使用

1.安装@babel/polyfill 或者单独安装 core-js 和 regenerator runtime 模块。

2.在需要使用的地方通过 import 引入就可以了，会引入所有的 polyfill，如果不希望引入所有的可以配置 useBuiltIns 参数。需要安装 core-js@3。

```js
"presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
```

@babel/plugin-transform-runtime 是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件。

@babel/plugin-transform-runtime 需要和 @babel/runtime 配合使用。首先安装依赖，@babel/plugin-transform-runtime 通常仅在开发时使用，但是运行时最终代码需要依赖 @babel/runtime，所以 @babel/runtime 必须要作为生产依赖被安装

### transform-runtime 对比 babel-polyfill

babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。

transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。

## 插件

Babel 构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道，Babel 的插件分为两种: 语法插件和转换插件。

插件是一个数组，从前往后读取。插件在 Presets 前运行。

使用

```js
{
    "plugins": ["@babel/plugin-transform-arrow-functions"]
}

// 也可以指定插件的相对/绝对路径

{
    "plugins": ["./node_modules/@babel/plugin-transform-arrow-functions"]
}

```

插件和 preset 都可以接受参数，参数由插件名和参数对象组成一个数组。preset 设置参数也是这种格式。

```js
{
    "plugins": [
        [
            "@babel/plugin-proposal-class-properties",
            { "loose": true }
        ]
    ]
}
```

如果插件名称为 @babel/plugin-XXX，可以使用短名称@babel/XXX 。如果插件名称为 babel-plugin-XXX，可以使用短名称 XXX，该规则同样适用于带有 scope 的插件

```js
{    
  "plugins": [       
    "@babel/transform-arrow-functions", //同 "@babel/plugin-transform-arrow-functions" 
    "newPlugin", // 同 "babel-plugin-newPlugin"        
    "@scp/myPlugin" // 同 "@scp/babel-plugin-myPlugin"  
  ]
}
```

## 预设 preset

通过使用或创建一个 preset 即可轻松使用一组插件。预设是一个数组，从后往前读取。

```js
// 官方 Preset

// @babel/preset-env
// @babel/preset-flow
// @babel/preset-react
// @babel/preset-typescript
```

@babel/preset-env 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill，在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的 JS 特性(ES2015,ES2016 等，不包含 stage 阶段)，将其转换成 ES5 代码。

对于基于浏览器或 Electron 的项目，官方推荐使用 .browserslistrc 文件来指定目标环境。默认情况下，如果你没有在 Babel 配置文件中(如 .babelrc)设置 targets 或 ignoreBrowserslistConfig，@babel/preset-env 会使用 browserslist 配置源。如果你不是要兼容所有的浏览器和环境，推荐你指定目标环境，这样你的编译代码能够保持最小。

创建 Preset

```js
// 可以简单的返回一个插件数组;

module.exports = function () {
  return { plugins: ["A", "B", "C"] };
};

// preset 中也可以包含其他的 preset，以及带有参数的插件。
module.exports = function () {
  return {
    presets: [require("@babel/preset-env")],
    plugins: [
      [require("@babel/plugin-proposal-class-properties"), { loose: true }],
      require("@babel/plugin-proposal-object-rest-spread"),
    ],
  };
};
```

## 配置文件

Babel 支持多种格式的配置文件

```js
// babel.config.js 可以使用JS编写。
// 在项目根目录下创建一个名为 babel.config.js 的文件。
module.exports = function(api) {    
  api.cache(true);    
  const presets = [...];    
  const plugins = [...];    
  return {        
    presets,        
    plugins    
    };
} 
```

```json
// .babelrc 简单
// 在项目根目录下创建一个名为 .babelrc 的文件：

{
  "presets": [],
  "plugins": []
}
```

```js
// .babelrc.js
// 与 .babelrc 配置相同，但是可以使用JS编写。
//可以在其中调用 Node.js 的API
const presets = [];
const plugins = [];
module.exports = { presets, plugins };
```

```json
// package.json
// 可以将 .babelrc 中的配置信息作为 babel 键(key) 添加到 package.json 文件中:
{
  "name": "my-package",
  "babel": { "presets": [], "plugins": [] }
}
```

## 环境变量

在特定环境的时候，您可以用 env 选项来设置特定的配置, 如下在生产环境中指定插件

```json
{
  "env": {
    "production": {
      "plugins": ["transform-react-constant-elements"]
    }
  }
}
```

env 选项的值将从 process.env.BABEL_ENV 获取，如果没有的话，则获取 process.env.NODE_ENV 的值，它在无法获取时会设置为 development 。

您可以通过下面的方法设置环境变量, 也可以使用跨平台命令 cross-env

```shell
# 指定Babel环境
$ BABEL_ENV=production <commond>

# 跨平台使用
$ cross-env BABEL_ENV=production <commond>
```
