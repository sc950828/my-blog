### 1、ESLint 支持几种格式的配置文件，如果同一个目录下有多个配置文件，ESLint 只会使用一个。

    优先级顺序如下：
      JavaScript - 使用 .eslintrc.js 然后输出一个配置对象。
      YAML - 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。
      JSON -使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
      Deprecated -使用 .eslintrc，可以使 JSON 也可以是 YAML。
      package.json - 在 package.json 里创建一个 eslintConfig 属性，在那里定义你的配置。

### 2、配置规则格式

    规则格式是<规则名称>: <告警级别>，告警级别分为三种:
    "off" or 0 - 关闭规则
    "warn" or 1 - 将规则视为一个警告（不会影响退出码）
    "error" or 2 - 将规则视为一个错误 (退出码为1)。

### 3、例子 .eslintrc.js

```js
module.exports = {
  // true就会停止在父级目录中寻找
  root: true,
  // 环境
  env: {
    node: true
  },
  //继承
  extends: ["plugin:vue/essential", "@vue/standard"],
  // 规则 0 = off, 1 = warn, 2 = error
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off", //禁用 console
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", //禁用 debugger
    "no-unused-vars": "error", //禁止出现未使用过的变量
    quotes: "off", // 强制使用一致的反勾号、双引号或单引号
    semi: "off", // 要求或禁止使用分号代替 ASI
    "space-before-function-paren": "off", //强制在 function的左括号之前使用一致的空格
    eqeqeq: "off" //要求使用 === 和 !==
  },
  // 解析器
  parserOptions: {
    parser: "babel-eslint"
  }
  // 处理器 processor
};
```

### 4、vue 关闭控制台 eslint 提示

lintOnSave: false

### 5、禁止 eslint 检查注释

单行注释

```js
let map = new BMap.Map("map"); // eslint-disable-line
// eslint-disable-next-line
let map = new BMap.Map("map");
```

多行注释

```js
/* eslint-disable */
export function getAddressByLngLat(lng, lat) {
  return new Promise(resolve => {
    let myGeo = new BMap.Geocoder();
    myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
      if (result) {
        resolve(result);
      }
    });
  });
}
/* eslint-enable */
```

文件注释

```
整个文件范围内禁止规则出现警告,将 /* eslint-disable */块注释放在文件顶部。
```
