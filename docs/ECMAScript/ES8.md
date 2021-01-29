## async await

在我们处理异步的时候，比起回调函数，Promise 的 then 方法会显得较为简洁和清晰，但是在处理多个彼此之间相互依赖的请求的时候，就会显的有些繁琐。这时候，用 async/await 更加优雅。

没有了链式调用，用完全同步的方法写异步代码 缺点是没有 promise.all()这种并发的方法

## Object

ES8 中对象扩展补充了两个静态方法，用于遍历对象：Object.values()，Object.entries()

### Object.values()

之前的语法如何获取对象的每一个属性值

```js
const obj = {
  name: "imooc",
  web: "www.imooc.com",
  course: "es",
};
console.log(Object.keys(obj));
const res = Object.keys(obj).map((key) => obj[key]);
console.log(res);
// ["imooc", "www.imooc.com", "es"]
```

使用新语法

```js
const obj = {
  name: "imooc",
  web: "www.imooc.com",
  course: "es",
};

console.log(Object.values(obj));
// ["imooc", "www.imooc.com", "es"]
```

### Object.entries()

```js
let grade = {
  lilei: 98,
  hanmei: 87,
};

for (let [k, v] of Object.entries(grade)) {
  console.log(k, v);
  // lilei 98
  // hanmei 87
}
```

### Object.getOwnPropertyDescriptors()

什么是 descriptor

```js
Object.defineProperty(data, "Lima", {
  enumerable: false,
});
```

那么 defineProperty 的第三个参数就是描述符(descriptor)这个描述符包括几个属性：

1. value [属性的值]
2. writable [属性的值是否可被改变]
3. enumerable [属性的值是否可被枚举]
4. configurable [描述符本身是否可被修改，属性是否可被删除]

```js
const obj = { name: "randy", age: 25 };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// 获取多个
// age: {value: 25, writable: true, enumerable: true, configurable: true}
// name: {value: "randy", writable: true, enumerable: true, configurable: true}

// 获取单个
const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
console.log(descriptor);
// name: {value: "randy", writable: true, enumerable: true, configurable: true}
```

## String

在 ES8 中 String 新增了两个实例函数 String.prototype.padStart 和 String.prototype.padEnd，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。

### String.prototype.padStart()

把指定字符串填充到字符串头部，返回新字符串。

str.padStart(targetLength [, padString])

<table>
  <thead>
    <tr>
      <th style="text-align: center;">参数</th>
      <th style="text-align: center;">含义</th>
      <th style="text-align: center;">必选</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">targetLength</td>
      <td style="text-align: center;">目标字符要保持的长度值</td>
      <td style="text-align: center;">Y</td>
    </tr>
    <tr>
      <td style="text-align: center;">padString</td>
      <td style="text-align: center;">
        如果目标字符的长度不够需要的补白字符，默认为空
      </td>
      <td style="text-align: center;">N</td>
    </tr>
  </tbody>
</table>

```js
const str = "randy";
console.log(str.padStart(8, "x")); // xxxrandy
console.log(str.padEnd(8, "y")); // randyxxx
console.log(str.padStart(8)); //    randy
```

### 场景 1：日期格式化

```js
const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const day = now
  .getDate()
  .toString()
  .padStart(2, "0");
console.log(year, month, day);
console.log(`${year}-${month}-${day}`);
```

### 场景 2：数字替换

```js
// 数字替换，比如手机号，身份证号
const tel = "13012345678";
const newTel = tel.slice(-4).padStart(tel.length, "*");
console.log(newTel); // *******5678
```

### String.prototype.padEnd()

方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。 语法：

str.padEnd(targetLength [, padString])

<table>
  <thead>
    <tr>
      <th style="text-align: center;">参数</th>
      <th style="text-align: center;">含义</th>
      <th style="text-align: center;">必选</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">targetLength</td>
      <td style="text-align: center;">目标字符要保持的长度值</td>
      <td style="text-align: center;">Y</td>
    </tr>
    <tr>
      <td style="text-align: center;">padString</td>
      <td style="text-align: center;">
        如果目标字符的长度不够需要的补白字符，默认为空
      </td>
      <td style="text-align: center;">N</td>
    </tr>
  </tbody>
</table>

```js
const str1 = "randy";
console.log(str1.padEnd(8, "x"));
// randyxxx
console.log(str1.padEnd(8));
// "randy   "
```

### 场景：时间戳统一长度

在 JS 前端我们处理时间戳的时候单位都是 ms 毫秒，但是，后端同学返回的时间戳则不一样是毫秒，可能只有 10 位，以 s 秒为单位。所以，我们在前端处理这个时间戳的时候，保险起见，要先做一个 13 位的补全，保证单位是毫秒。

```js
// 伪代码
console.log(new Date().getTime()); // 时间戳 13位的
const timestamp = +String(timestamp).padEnd(13, "0");
```

## 尾逗号

ES8 允许函数的最后一个参数有尾逗号（Trailing comma）。

此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(param1, param2) {
  /* ... */
}

clownsEverywhere("foo", "bar");
```

上面代码中，如果在 param2 或 bar 后面加一个逗号，就会报错。

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数 clownsEverywhere 添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。

```js
// function clownsEverywhere(param1, param2,) {
/* ... */
// }

// clownsEverywhere("foo", "bar",);
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
