## let const

let const 是什么？和 var 区别是什么？

- 是什么
  - let const 是 es6 新增的两种定义变量的方式。
  - 使用 const 申明的变量。基本类型变量的值不可以变，引用类型不能重新赋值。
  - 使用 let 申请的变量值可以更改。
- 区别
  - let const 声明的全局变量不是全局对象 window 的属性而 var 申明的变量挂载在 window 下
  - var 声明变量可以重复声明,而 let const 不能重复声明变量。
  - var 申明的变量或函数可以提升，即可以先使用变量然后再申明，而 let const 不存在变量提升，必须先声明然后再使用。
  - 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部并赋值为 undefined。
  - let const 声明的变量具有暂时性死区，而 var 不存在
  - let const 声明的变量拥有块级作用域，而 var 不存在

```js
// 1、暂时性死区
// 只要块级作用域内存在 let 命令，它所声明的变量就绑定在了这个区域，不再受外部的影响。
var a = 5;
if (true) {
  a = 6;
  let a;
  // var a; // 这样就不会报错
}
// Uncaught ReferenceError: Cannot access 'a' before initialization

// 2、let 声明的变量拥有块级作用域
{
  let a = 5;
}
console.log(a); // undefined

// ES5定义常量
Object.defineProperty(window, "PI", {
  value: 3.14,
  writable: false,
});
console.log(PI);
```

## 解构赋值

- 数组解构一一对应。字符串的解构和数组类似。
- 对象解构 key 相同，不同使用 key:newkey 指定。

```js
// 数组解构
const arr = [1, 2, 3];

const [a, b, c] = arr;

console.log(a, b, c); // 1 2 3

// 字符串解构
const str = "randy";

const [d, e, f, g, h] = str;

console.log(d, e, f, g, h); // r a n d y

// 对象解构
const obj = { name: "randy", age: 24 };

const { name, age: userAge } = obj;

console.log(name, userAge);

// 默认值
const obj2 = { name: "randy", age: 24 };

const { name, age: userAge, sex = "男" } = obj2;

console.log(name, userAge, sex);

// rest 运算符
let options = {
  title: "Menu",
  height: 200,
  width: 100,
};

let { title, ...rest } = options;

// title="Menu", rest={height: 200, width: 100}
console.log(rest.height); // 200
console.log(rest.width); // 100

// 嵌套解构
let options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ["Cake", "Donut"],
  extra: true, // something extra that we will not destruct
};

// destructuring assignment on multiple lines for clarity
let {
  size: {
    // put size here
    width,
    height,
  },
  items: [item1, item2], // assign items here
  title = "Menu", // not present in the object (default value is used)
} = options;

console.log(title); // Menu
console.log(width); // 100
console.log(height); // 200
console.log(item1); // Cake
console.log(item2); // Donut
```

## 字符串

1. 模板字符串

在模板字符串里面能使用变量。const foo = `this is a ${example}`;

2. 字符串我们能用 for of 进行遍历

## 属性名表达式

在 ES6 可以直接用变量或者表达式来定义 Object 的 key。

```js
let s = "school";
let obj = {
  foo: "bar",
  [s]: "imooc",
};

console.log(obj); // { foo: "bar", school: "imooc" };
```

## 箭头函数

箭头函数是什么？和普通函数有什么区别？

- 是什么
  - 箭头函数是 es6 新增的定义函数的方式。
- 区别
  - 箭头函数不能做构造函数。
  - 箭头函数的 this 是定义时确定的而不是运行时确定的,等于包裹他的第一个普通函数的 this（父作用域的 this）。而普通函数的 this 是运行时确定的。
  - 箭头函数更简洁，能解决 this 问题。
  - 箭头函数没有 arguments 变量。需要用 reset 表达式 ...args 定义参数列表。
  - 箭头函数不能通过 apply call bind 改变 this。
- 例子

```js
function fn() {
  console.log("real", this); // {a: 100} ，该作用域下的 this 的真实的值
  var arr = [1, 2, 3];
  // 普通 JS
  arr.map(function(item) {
    console.log("js", this); // window 。普通函数，这里打印出来的是全局变量，令人费解
    return item + 1;
  });
  // 箭头函数
  arr.map((item) => {
    console.log("es6", this); // {a: 100} 。箭头函数，这里打印的就是父作用域的 this
    return item + 1;
  });
}
fn.call({ a: 100 });
```

## 默认参数

```js
function f(x, y = 7, z = 42) {
  return x + y + z;
}
```

1. 如果我们想要最后一个参数使用默认参数我们可以省略不传。
2. 当需要使用默认值的参数不是最后一个的时候我们需要显示指定为 undefined f(1, undefined, 4) 算出来是 12。
3. 当我们不用默认值的时候我们需要传 null。

## rest 参数 ...

```js
// ...arr 参数数组。
function f(...arr) {
  console.log(arr); //[1,2,3]
}
f(1, 2, 3);
```

## 扩展运算符

扩展运算符 和 Rest 参数是形似但相反意义的操作符，简单的来说 Rest 参数 是把不定的参数“收敛”到数组，而 扩展运算符 是把固定的数组内容“打散”到对应的参数。

```js
function sum(x = 1, y = 2, z = 3) {
  return x + y + z;
}

console.log(sum(...[4])); // 9
console.log(sum(...[4, 5])); // 12
console.log(sum(...[4, 5, 6])); // 15
```

## symbol

新增的原始数据类型 symbol

调用 Symbol()返回的每个实例都是唯一的，因此当你比较两个 Symbol 实例的时候总是返回 false

1. 可以用来做对象的 key，但是使用 Symbol()创建的对象的 key 通过 Object.keys()或者 for in 循环获取不到。
2. 可以用做常量的值，这样值就永远不会相同 const VAL = Symbol()

```js
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 === s2);
console.log(s1.description); //undefined

// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，
// 或者转为字符串时，比较容易区分。
let s3 = Symbol("name");
let s4 = Symbol("name");
console.log(s3 === s4);
console.log(s3.description); // name

// Symbol.for() 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
// 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
let s5 = Symbol.for("randy");
let s6 = Symbol.for("randy");
console.log(s5 === s6);
console.log(s5.description); // randy

// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
const s7 = Symbol("foo");
console.log(Symbol.keyFor(s7)); // undefined

const s8 = Symbol.for("foo");
console.log(Symbol.keyFor(s8)); // foo
```

### 可以用来做对象的 key

```js
// 使用Symbol定义的key只能使用Reflect.ownKeys(obj)或者Object.getOwnPropertySymbols获取
const stu1 = Symbol("李四");
const stu2 = Symbol("李四");
const grade = {
  [stu1]: {
    address: "yyy",
    tel: "222",
  },
  [stu2]: {
    address: "zzz",
    tel: "333",
  },
};
console.log(grade);
console.log(grade[stu1]);
console.log(grade[stu2]);
```

### 属性遍历

```js
const sym = Symbol("name");
class User {
  constructor(name) {
    this.name = name;
    this[sym] = "randy";
  }
  getName() {
    return this.name + this[sym];
  }
}
const user = new User("randy");
console.log(user.getName());
// 不能获取Symbol做的key
for (let key in user) {
  console.log(key); // name
}

// 不能获取Symbol做的key
for (let key of Object.keys(user)) {
  console.log(key); // name
}

// 只能获取Symbol做的key
for (let key of Object.getOwnPropertySymbols(user)) {
  console.log(key); // Symbol(name)
}

// 能获取所有key包括Symbol做的key
for (let key of Reflect.ownKeys(user)) {
  console.log(key); // name Symbol(name)
}
```

### Symbol 类型的注意点？

（1）Symbol 函数前不能使用 new 命令，否则会报错。

（2）Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，
比较容易区分。

（3）Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。

（4）Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

（5）Symbol.for 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

（6）Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。

## 类和对象

类（class）是对象的模板，定义了同一组对象共有的属性和方法

```js
// es5的类
function People(name, age) {
  // 实例属性
  this.name = name;
  this.age = age;
  // 父类的方法我们一般不定义在类里面 而是使用prototype 定义在类的原型上
  // 这样我们每次new一个实例的时候 方法就不会每次都在实例里面
  this.sayName = function() {
    console.log(this.name);
  };
}
// 应该这样写
People.prototype.sayName = function() {
  console.log(this.name);
};

// 静态属性 静态方法只初始化一次
// 静态属性
People.count = 12;
// 直接使用
console.log(People.count);
// 静态方法
People.getCount = function() {
  console.log(People.count);
};
// 直接使用
People.getCount();
```

```js
// ES6的类
class Father {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // 这个方法类似ES5里面的原型链上
  add() {
    return this.x + this.y;
  }
}

// 继承
class Child extends Father {
  constructor(x, y, z) {
    // 继承父类
    // 继承使用 extends 关键字 注意子类构造函数中需要第一行需要显示调用父类构造函数 super(x, y)
    super(x, y);
    this.z = z;
  }
}

// 静态属性 静态方法
class People {
  constructor(name) {
    this.name = name;
  }
  // 静态方法
  static getName() {
    return 1;
  }
}
// 调用
People.getName(); //只能使用类调用

// 定义静态属性 类似ES5
People.count = 7;
console.log(People.count);
```

## Set 和 WeakSet

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
// const set = new Set()
// Set可以去重，类似数组只是里面的元素不能重复，并且set的键值是相同的，不像数组有下标
const set = new Set([1, 2, 3, 4, 4]);
console.log(set); // Set(4) {1, 2, 3, 4} //重复的数会被忽略
// Set常用的方法:
// size：获取元素数量。
console.log(set.size);
// add(value)：添加元素，返回 Set 实例本身。
console.log(set.add(5));
// delete(value)：删除元素，返回一个布尔值，表示删除是否成功。
console.log(set.delete(5));
// has(value)：返回一个布尔值，表示该值是否是 Set 实例的元素。
console.log(set.has(5));
// clear()：清除所有元素，没有返回值。
set.clear();

// 遍历
// keys()：返回键名的遍历器
// values()：返回键值的遍历器
// entries()：返回键值对的遍历器
// forEach()：使用回调函数遍历每个成员
// for...of：可以直接遍历每个成员
```

WeakSet 结构与 Set 类似，也是不重复的值的集合。

1. 但是 WeakSet 的成员只能是对象，而不能是其他类型的值。
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。也就是说对象没了 WeakSet 里面的值自动没了，不用我们手动再去删除处理。
3. WeakSet 没有 size 属性，没有办法遍历它的成员。

```js
let ws = new WeakSet();
const obj1 = {
  name: "randy",
};
const obj2 = {
  age: 5,
};
ws.add(obj1);
ws.add(obj2);
ws.delete(obj1);
console.log(ws);
console.log(ws.has(obj2));
```

## Map 和 WeakMap

Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串和 Symbol，各种类型的值（包括对象）都可以当作键。

Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。

Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。

Map 在涉及频繁增删键值对的场景下会有些性能优势。

```js
// map 的 key 可以是对象不单单是字符串，类似对象是键值对
// const map = new Map()
const map = new Map([
  ["age", 25],
  ["sex", "男"],
]);
console.log(map); // Map(2) {"age" => 25, "sex" => "男"}
// Map 的常用方法
// set：设置成员 key 和 value
map.set("name", "randy");
// get：获取成员属性值
console.log(map.get("name"));
// has：判断成员是否存在
console.log(map.has("name"));
// size：获取成员的数量
console.log(map.size);
// delete：删除成员
console.log(map.delete("name"));
// clear：清空所有
map.clear();

// 遍历
// keys() 返回一个新的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的 key 值
// values() 方法返回一个新的 Iterator 对象。它包含按顺序插入Map对象中每个元素的 value 值
// entries() 方法返回一个新的包含 [key, value] 对的 Iterator ? 对象，返回的迭代器的迭代顺序与 Map 对象的插入顺序相同
// forEach((value, key) => {}) 方法将会以插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数
// for...of 可以直接遍历每个成员 [key, value]
```

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。也就是说对象没了 WeakMap 里面的值自动没了，不用我们手动再去删除处理。

```js
const wMap = new WeakMap();
let obj = { name: "randy" };
wMap.set(obj, "xxx"); // WeakMap {{…} => "xxx"}
obj = null;
console.log(wMap); //自动清空
```

## Proxy

在 ES6 标准中新增的一个非常强大的功能是 Proxy，它可以自定义一些常用行为如查找、赋值、枚举、函数调用等。通过 Proxy 这个名称也可以看出来它包含了“代理”的含义，只要有“代理”的诉求都可以考虑使用 Proxy 来实现。

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

```js
let p = new Proxy(target, handler); // handler是一个对象
// 通俗的讲第一个参数 target 就是用来代理的“对象”，被代理之后它是不能直接被访问的，而 handler 就是实现代理的过程。
```

### get set deleteProperty ownKeys

```js
let user = {
  name: "xiecheng",
  age: 34,
  _password: "***",
};
user = new Proxy(user, {
  // 获取值触发
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("不可访问");
    } else {
      return target[prop];
    }
  },
  // 设置值触发
  set(target, prop, val) {
    if (prop.startsWith("_")) {
      throw new Error("不可访问");
    } else {
      target[prop] = val;
      return true;
    }
  },
  // 删除的时候会触发
  deleteProperty(target, prop) {
    // 拦截删除
    if (prop.startsWith("_")) {
      throw new Error("不可删除");
    } else {
      delete target[prop];
      return true;
    }
  },
  // 遍历键的时候会触发该方法
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});
console.log(user.age);
console.log(user._password);
user.age = 18;
console.log(user.age);
try {
  user._password = "xxx";
} catch (e) {
  console.log(e.message);
}

try {
  // delete user.age
  delete user._password;
} catch (e) {
  console.log(e.message);
}
console.log(user.age);

for (let key in user) {
  console.log(key);
}
```

### has

```js
// has
let range = {
  start: 1,
  end: 5,
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  },
});
// 调用in的时候会触发has方法
console.log(2 in range);
console.log(9 in range);
```

### apply

拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

```js
let sum = (...args) => {
  let num = 0;
  args.forEach((item) => {
    num += item;
  });
  return num;
};

sum = new Proxy(sum, {
  apply(target, ctx, args) {
    return target(...args) * 2;
  },
});
console.log(sum(1, 2));
console.log(sum.call(null, 1, 2, 3));
console.log(sum.apply(null, [1, 2, 3]));
```

### construct

拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

```js
let User = class {
  constructor(name) {
    this.name = name;
  }
};
User = new Proxy(User, {
  construct(target, args, newTarget) {
    console.log("construct");
    return new target(...args);
  },
});
console.log(new User("imooc"));
```

## Reflect

### Reflect 对象创建目的？

（1）将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。

```js
let obj = {};
let newVal = "";
Reflect.defineProperty(obj, "name", {
  get() {
    return newVal;
  },
  set(val) {
    console.log("set");
    // this.name = val
    newVal = val;
  },
});
obj.name = "es";
console.log(obj.name);
```

（2）修改某些 Object 方法的返回结果，让其变得更合理（比如 Object.defineProperty）成功会返回 boolean 值 true。

```js
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

（3）让 Object 操作都变成函数行为。（比如 以前判断对象是否有某属性是 'assign' in Object 用 Reflect 的话只需要 Reflect.has(Object, 'assign')来判断）

```js
// 老写法
"assign" in Object; // true

// 新写法
Reflect.has(Object, "assign"); // true
```

（4）Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```js
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log("property " + name + " on " + target + " set to " + value);
    }
    return success;
  },
  // 还有 get apply deleteProperty has 等方法
});
```

### 注意

与大多数全局对象不同，Reflect 没有构造函数。你不能将其与一个 new 运算符一起使用，或者将 Reflect 对象作为一个函数来调用。Reflect 的所有属性和方法都是静态的（就像 Math 对象）

## Iterator

是一种接口机制，为各种不同的数据结构提供统一的访问机制。主要供 for of 消费 就是使不支持遍历的数据结构可遍历。Iterator 就是 ES6 中用来实现自定义遍历的接口

原生具备 Iterator 接口的数据结构有 Array Map Set String 函数的 arguments 对象 NodeList 等

要使不具备循环功能的数据(Object 等)能循环我们必须手动实现迭代器协议和可迭代协议。

迭代器协议

1. 首先，它是一个对象
2. 其次，这个对象包含一个无参函数 next
3. 最后，next 返回一个对象，对象包含 done 和 value 属性。其中 done 表示遍历是否结束，value 返回当前遍历的值。

```js
function() {
  return {
    next() {
      return {
        value: xx,
        done: xx
      }
    }
  }
}
```

可迭代协议

可迭代协议允许 JavaScript 对象去定义或定制它们的迭代行为, 例如（定义）在一个 for..of 结构中什么值可以被循环（得到）

为了变成可迭代对象， 一个对象必须实现 iterator 方法, 意思是这个对象（或者它原型链 prototype 上的某个对象）必须有一个名字是 Symbol.iterator 的属性:

```js
let authors = {
  allAuthors: {
    fiction: ["Agatha Christie", "J. K. Rowling", "Dr. Seuss"],
    scienceFiction: [
      "Neal Stephenson",
      "Arthur Clarke",
      "Isaac Asimov",
      "Robert Heinlein",
    ],
    fantasy: ["J. R. R. Tolkien", "J. K. Rowling", "Terry Pratchett"],
  },
};

authors[Symbol.iterator] = function() {
  let allAuthors = this.allAuthors;
  let keys = Reflect.ownKeys(allAuthors);
  console.log(keys);
  let values = [];
  return {
    next() {
      if (!values.length) {
        if (keys.length) {
          values = allAuthors[keys[0]];
          keys.shift();
        }
      }
      return {
        done: !values.length,
        value: values.shift(),
      };
    },
  };
};

for (a of authors) {
  console.log(typeof a);
}
```

熟悉了 Generator 之后，发现它是天然满足可迭代协议的。上述的代码我们可以用 Generator 来实现：

```js
authors[Symbol.iterator] = function*() {
  let allAuthors = this.allAuthors;
  let keys = Reflect.ownKeys(allAuthors);
  let values = [];
  while (1) {
    if (!values.length) {
      if (keys.length) {
        values = allAuthors[keys[0]];
        keys.shift();
        yield values.shift();
      } else {
        return false;
      }
    } else {
      yield values.shift();
    }
  }
};
```
