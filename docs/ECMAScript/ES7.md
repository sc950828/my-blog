## Array.prototype.includes()

在 ES7 之前想判断数组中是否包含一个元素，基本可以这样写：

```js
console.log(
  array1.find(function(item) {
    return item === 2;
  })
);

// 或者
console.log(
  array1.filter(function(item) {
    return item === 2;
  }).length > 0
);
```

ES7 引入的 Array.prototype.includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

```js
// 基本用法
const arr = ["es6", "es7", "es8"];
console.log(arr.includes("es6")); // true
console.log(arr.includes("es9")); // false
```

有两个参数，要搜索的值和搜索的开始索引。第二个参数可选。从该索引处开始查找 searchElement。负数表示从倒数第几个开始找

```js
const arr = ["es6", "es7", "es8"];
console.log(arr.includes("es7", 1)); // true
console.log(arr.includes("es7", 2)); // false
console.log(arr.includes("es7", -1)); // false
console.log(arr.includes("es7", -2)); // true
```

### 注意

只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的.

### 优缺点比较

两者都是采用===的操作符来作比较的，不同之处在于：对于 NaN 的处理结果不同。我们知道 js 中 NaN === NaN 的结果是 false, indexOf()也是这样处理的，但是 includes()不是这样的。

```js
const demo = [1, NaN, 2, 3];
demo.indexOf(NaN); //-1
demo.includes(NaN); //true
```

### 总结

如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用 includes()。如果想获取一个值在数组中的位置，那么只能使用 indexOf 方法。

## 幂运算符 `**`

如果不使用任何函数，如何实现一个数的求幂运算？

```js
function pow(x, y) {
  let res = 1;
  for (let i = 0; i < y; i++) {
    res *= x;
  }
  return res;
}

pow(2, 10);
// 1024
```

除了自己封装函数来实现，也可是使用 Math.pow() 来完成。

```js
console.log(Math.pow(2, 10)); // 1024
```

在 ES7 可以这样写了：

```js
console.log(2 ** 10);
```

### 注意

幂运算符的两个\*号之间不能出现空格，否则语法会报错。
