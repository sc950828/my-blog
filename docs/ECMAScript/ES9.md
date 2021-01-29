## for await of

回想我们之前给数据结构自定义遍历器是同步的，如果想定义适合 for...await...of 的异步遍历器该怎么做呢？答案是 Symbol.asyncIterator。上一个异步执行完了才会执行下一个异步操作。

我们实现 Symbol.asyncIterator 然后使用 for wait of 循环就可以啦

```js
let obj = {
  count: 0,
  Gen(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({ done: false, value: time });
      }, time);
    });
  },
  [Symbol.asyncIterator]() {
    let self = this;
    return {
      next() {
        self.count++;
        if (self.count < 4) {
          return self.Gen(Math.random() * 2000);
        } else {
          return Promise.resolve({
            done: true,
            value: "",
          });
        }
      },
    };
  },
};

async function test() {
  for await (let item of obj) {
    console.log(Date.now(), item);
  }
}

test();
```

## RegExp Updates

### dotAll 模式

正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用 u 修饰符解决；另一个是行终止符（line terminator character）。

```js
const reg = /./;
console.log(reg.test("\r")); // false
console.log(reg.test("\n")); // false
```

我们可以使用 s 符修饰正则表达式 就是 dotAll 模式了，这样.就能真正意义代表任意字符了

```js
const reg = /./s;
console.log(reg.test("\r")); // true
console.log(reg.test("\n")); // true
```

### 具名组匹配

我们在写正则表达式的时候，可以把一部分用()包裹起来，被包裹起来的这部分称作“分组捕获”。

```js
let t1 = "2020-05-01".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(t1);
let t2 = /(\d{4})-(\d{2})-(\d{2})/.exec("2020-05-01");
console.log(t2);
// ["2020-05-01", "2020", "05", "01", index: 0, input: "2020-05-01", groups: undefined]
// ["2020-05-01", "2020", "05", "01", index: 0, input: "2020-05-01", groups: undefined]

// 我们通过下标获取
console.log(t1[1]); // 2020
console.log(t1[2]); // 05
console.log(t1[3]); // 01
```

使用具名组匹配语法 `?<key>`

```js
let t = "2020-05-01".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(t);
// ["2020-05-01", "2020", "05", "01", index: 0, input: "2020-05-01", groups: {…}]
// groups: {
//     year: "2020",
//     month: "05",
//     day: "01"
// }
console.log(t.groups.year); // 2020
console.log(t.groups.month); // 05
console.log(t.groups.day); // 01
```

## 后行断言

在 ES9 之前 JavaScript 正则只支持先行断言，不支持后行断言。简单复习下先行断言的知识：

先行断言 `(?=)`

```js
// 以ecma开头并且后面是script
let test = "ecmascript";
console.log(test.match(/ecma(?=script)/));
// ["ecma", index: 0, input: "ecmascript", groups: undefined]
```

后行断言 `(?<=)`

```js
// 以script结尾并且前面是ecma (?<=)
let test = "ecmascript";
console.log(test.match(/(?<=ecma)script/));
// ["script", index: 4, input: "ecmascript", groups: undefined]

// 不能是  前面不能是ecma (?<!)
console.log(test.match(/(?<!ecma)script/));
// null;
```

## Object Rest & Spread

前面有 function 的 Rest & Spread 方法。在 ES9 新增 Object 的 Rest & Spread 方法，直接看下示例：

```js
// Spread
const input = {
  a: 1,
  b: 2,
};

const output = {
  ...input,
  c: 3,
};

console.log(output); // {a: 1, b: 2, c: 3}
```

```js
// Rest
const input = {
  a: 1,
  b: 2,
  c: 3,
};

let { a, ...rest } = input;

console.log(a, rest); // 1 {b: 2, c: 3}
```

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。

## Promise.prototype.finally()

指定不管最后状态如何都会执行的回调函数。

Promise.prototype.finally() 方法返回一个 Promise，在 promise 执行结束时，无论结果是 fulfilled 或者是 rejected，在执行 then()和 catch()后，都会执行 finally 指定的回调函数。这为指定执行完 promise 后，无论结果是 fulfilled 还是 rejected 都需要执行的代码提供了一种方式，避免同样的语句需要在 then()和 catch()中各写一次的情况。

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    // reject('fail')
  }, 1000);
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("finally");
  });
```

### 场景 1：loading 关闭

需要每次发送请求，都会有 loading 提示，请求发送完毕，就需要关闭 loading 提示框，不然界面就无法被点击。不管请求成功或是失败，这个 loading 都需要关闭掉，这时把关闭 loading 的代码写在 finally 里再合适不过了。

### 场景 2：数据库断开链接

```js
let connection
db.open()
    .then(conn => {
        connection = conn
        return connection.select({
            name: 'Jane'
        })
    })
    .then(result => {
        // Process result
        // Use `connection` to make more queries
    })···
    .catch(error => {
        // handle errors
    })
    .finally(() => {
        connection.close()
    })
```

## String

放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义返回 undefined，并且从 raw 上可获取原字符串。

ES9 开始，模板字符串允许嵌套支持常见转义序列，移除对 ECMAScript 在带标签的模版字符串中转义序列的语法限制。

```js
function tag(strs) {
  console.log(strs);
  // strs[0] === undefined
  // strs.raw[0] === "\\unicode and \\u{55}"
}

// 在标签函数中使用
tag`\u{61} and \u{62}`; //
tag`\u{61} and \unicode`; // 结果是 undefined

// 之前的版本会报错：Invalid Unicode escape sequence
// 无效的Unicode转义序列

// 报错：
let bad = `bad escape sequence: \unicode`;
```
