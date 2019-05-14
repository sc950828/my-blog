### 1、let const 是什么？和 var 区别是什么？

- 是什么
  - let const 是 es6 新增的两种定义变量的方式。
  - 使用 const 申明的变量。基本类型变量的值不可以变，引用类型不能重新赋值。
  - 使用 let 申请的变量值可以更改。
- 区别
  - var 声明变量可以重复声明,而 let const 不能重复声明变量。
  - var 申明的变量或函数可以提升，即可以先使用变量然后再申明，而 let const 不行，必须先声明然后再使用。
  - 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部并赋值为 undefined。
  - var 在全局作用域下声明变量会导致变量挂载在 window 上，而 let const 定义的变量不会。

### 2、模板字符串

在模板字符串里面能使用变量。const foo = `this is a ${example}`;

### 3、箭头函数是什么？和普通函数有什么区别？

- 是什么
  - 箭头函数是 es6 新增的定义函数的方式。
- 区别
  - 箭头函数不能做构造函数。
  - 箭头函数的 this 是定义时确定的不是运行时确定的,等于包裹他的第一个普通函数的 this。
  - 箭头函数更简洁，能解决 this 问题。
  - 箭头函数没有 arguments 变量。需要用展开表达式 ...args 定义参数列表。
  - 箭头函数不能通过 apply call bind 改变 this。
- 例子

```js
function fn() {
  console.log("real", this); // {a: 100} ，该作用域下的 this 的真实的值
  var arr = [1, 2, 3];
  // 普通 JS
  arr.map(function (item) {
    console.log("js", this); // window 。普通函数，这里打印出来的是全局变量，令人费解
    return item + 1;
  });
  // 箭头函数
  arr.map(item => {
    console.log("es6", this); // {a: 100} 。箭头函数，这里打印的就是父作用域的 this
    return item + 1;
  });
}
fn.call({ a: 100 });
```

### 4、默认参数

```js
function f(x, y = 7, z = 42) {
  return x + y + z;
}
```

如果我们想要最后一个参数使用默认参数我们可以省略不传。
当需要使用默认值的参数不是最后一个的时候我们需要显示指定为 undefined f(1, undefined, 4) 算出来是 12。
当我们不用默认值的时候我们需要传 null。

### 5、可变参数 也是 rest 参数 ...

```js
// ...arr 参数数组。
function f(...arr) {
  console.log(arr); //1,2,3
}
f(1, 2, 3);
```

### 6、解构赋值

- 数组解构一一对应。
- 对象解构 key 相同，不同使用 newkey:key 指定。

### 7、for of 遍历

- 可以 break，得到的是值。而不像 for in 一样，得到的是数组的下标或对象的 key。
- 但是 for of 不能遍历对象

### 8、promise async await

- promise 有三种状态: fulfilled, rejected, pending
- promise 的优点
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果
  - 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
- promise 的缺点
  - 无法取消 Promise
  - 当处于 pending 状态时，无法得知目前进展到哪一个阶段
- Promise 的构造函数是同步执行的。then 是异步执行的。

### 9、Set Map

    Set可以去重，类似数组只是里面的元素不能重复，并且set的键值是相同的，不像数组有下标
      const set = new Set([1, 2, 3, 4, 4]);
      console.log(set) // Set(4) {1, 2, 3, 4} //重复的数会被忽略
      Set常用的方法
        size：获取元素数量。
        add(value)：添加元素，返回 Set 实例本身。
        delete(value)：删除元素，返回一个布尔值，表示删除是否成功。
        has(value)：返回一个布尔值，表示该值是否是 Set 实例的元素。
        clear()：清除所有元素，没有返回值。
    map的key可以是对象不单单是字符串，类似对象是键值对
      const map = new Map()
      Map的常用方法
        size：获取成员的数量
        set：设置成员 key 和 value
        get：获取成员属性值
        has：判断成员是否存在
        delete：删除成员
        clear：清空所有

### 10、新的数据类型 symbol

- 调用 Symbol()返回的每个实例都是唯一的，因此当你比较两个 Symbol 实例的时候总是返回 false
  - 1.可以用来做对象的 key，但是使用 Symbol()创建的对象的 key 通过 Object.keys()或者 for in 循环获取不到。
  - 2.可以用做常量的值，这样值就永远不会相同 const VAL = Symbol()

### 11、class

```js
class Name {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add() {
    return this.x + this.y;
  }
}
```

继承使用 extends 关键字 注意子类构造函数中需要第一行需要显示调用父类构造函数 super(x, y)

### 11、Symbol 类型的注意点？

（1）Symbol 函数前不能使用 new 命令，否则会报错。

（2）Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，
比较容易区分。

（3）Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。

（4）Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

（5）Symbol.for 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

（6）Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。

### 12、 Set 和 WeakSet 结构？

（1）ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

（2）WeakSet 结构与 Set 类似，也是不重复的值的集合。但是 WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，

### 13、Map 和 WeakMap 结构？

（1）Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

（2）WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

### 14、什么是 Proxy ？

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

### 15、Reflect 对象创建目的？

（1）将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。

（2）修改某些 Object 方法的返回结果，让其变得更合理。

（3）让 Object 操作都变成函数行为。

（4）Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。
