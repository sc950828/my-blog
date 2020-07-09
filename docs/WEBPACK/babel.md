### 1、babel 是什么？

Babel 是一个 JavaScript 编译器。将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

### 2、使用

安装@babel/core @babel/cli 或者直接安装 babel-cli

使用

```
# 工具安装
$ npm i babel-cli -g

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

### 3、插件

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

### 4、预设 preset

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

### 5、polyfill

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

### 6、配置文件

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

### 7、环境变量

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

env 选项的值将从 process.env.BABEL_ENV 获取，如果没有的话，则获取 process.env.NODE_ENV 的值，它也无法获取时会设置为 development 。

您可以通过下面的方法设置环境变量, 也可以使用跨平台命令 cross-env

```shell
# 指定Babel环境
$ BABEL_ENV=production <commond>

# 跨平台使用
$ cross-env BABEL_ENV=production <commond>
```
