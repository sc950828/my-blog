### 1、this

```js
// 全局环境下，this始终指向全局对象（window），无论是否严格模式；
// 在浏览器中，全局对象为 window 对象：
console.log(this === window); // true
this.a = 37;
console.log(window.a); // 37
```

```js
// 普通函数
// 普通函数内部的this分两种情况，严格模式和非严格模式。
// 非严格模式下，this 默认指向全局对象window。
// 严格模式下，this指向undefined。
function f1() {
  console.log("普通函数非严格模式下，this 默认指向全局对象window", this);
  return this;
}
console.log(f1() === window); // true
function f2() {
  "use strict"; // 这里是严格模式
  console.log("普通函数严格模式下，this 默认指向undefined", this);
  return this;
}
console.log(f2() === undefined); // true
```

```js
// 函数作为对象的方法
// 当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
// 多层嵌套的对象，内部方法的this指向离被调用函数最近的对象

//方式1
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
//当 o.f()被调用时，函数内的this将绑定到o对象。
console.log(o.f()); // logs 37

//方式2
var o = { prop: 37 };
function independent() {
  return this.prop;
}
//函数f作为o的成员方法调用
o.f = independent;
console.log(o.f()); // logs 37

//方式3
//this 的绑定只受最靠近的成员引用的影响
o = { prop: 37, b: { g: independent, prop: 42 } };
console.log(o.b.g()); // 42
```

```js
// 显示绑定 显示的改变this
// 通过这三个方法来改变this apply(this, [args]) call(this, args) bind(this, args)()
// 区别是apply传参数是一个数组，bind需要再次调用
```

```js
// 构造函数中的this
// 当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。
// 构造器返回的默认值是this所指的那个对象，也可以手动返回其他的对象。
function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37

function C2() {
  this.a = 37;
  return { a: 38 }; //手动设置返回{a:38}对象
}

o = new C2();
console.log(o.a); // logs 38
```

```js
// setTimeOut setInterval this
// 对于延时函数内部的回调函数的this指向全局对象window；
// 可以通过bind()方法改变内部函数this指向。
setTimeout(function() {
  console.log("setTimeout this=", this);
}, 1000);
setTimeout(
  function() {
    console.log("setTimeout bind {name: 'randy'} this=", this);
  }.bind({ name: "randy" }),
  1000
);
```

```js
// 在DOM事件中 this总是与currentTarget相等
document
  .getElementsByClassName("father")[0]
  .addEventListener("click", function(e) {
    // currentTarget是绑定事件的元素
    // target是触发事件的元素
    console.log(e.target === this);
    console.log(e.currentTarget === this); // 总是 true
  });
```

```html
<!-- 作为一个内联事件处理函数 -->
<!-- 当代码被内联处理函数调用时，它的this指向监听器所在的DOM元素； -->
<!-- 当代码被包括在函数内部执行时，其this指向等同于 普通函数直接调用的情况，即在非严格模式指向全局对象window，在严格模式指向undefined -->
<button onclick="console.log(this)">
  作为一个内联事件处理函数中的this === button对象
</button>
<button onclick="(function(){console.log(this)})()">
  作为一个内联事件处理函数中当代码被包括在函数内部执行时this === window
</button>
<button onclick="(function(){'use strict';console.log(this)})()">
  作为一个内联事件处理函数中当代码被包括在函数内部执行时严格模式this ===
  undefined
</button>
```

### 2、es6 箭头函数中的 this 和普通函数中的 this

- 箭头函数的 this 是在定义函数时绑定的，不是在执行过程中绑定的。简单的说，函数在定义时，this 就继承了定义函数的对象。
- 箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this，箭头函数不能通过 apply call bind 改变 this。
- 箭头函数不能使用 arguments 不能用于构造函数。

```js
// 作为普通函数
// 在普通函数中，箭头函数被设置为全局对象：无论是否严格模式
var globalObject = window;
var foo = () => this;
var foo2 = () => {
  "use strict";
  return this;
};
console.log(foo() === globalObject); // true
console.log(foo2() === globalObject); // true
```

```js
//箭头函数没有自己的this，而是使用箭头函数所在的作用域的this
// 箭头函数作为对象的方法使用
// 箭头函数作为对象的方法使用，指向全局window对象；而普通函数作为对象的方法使用，则指向调用的对象。
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log(this.i, this);
  }
};
obj.b(); // undefined window{...}
obj.c(); // 10 Object {...}
```

```js
//箭头函数在函数内部，以非对象的方法使用
function Person1(age) {
  this.age = age;
  setInterval(() => {
    console.log(this); // 指向p1
  }, 1000);
}
//普通函数作为内部函数
function Person2() {
  this.age = 0;
  setInterval(function() {
    console.log(this); // 指向window
  }, 1000);
}
// var p1 = new Person1(10);
// var p2 = new Person2();
```

```js
// 箭头函数中，call()、apply()、bind()方法无效
var say = () => {
  console.log(this);
};
say(); // window
say.call({ name: "randy" }); // 无效 还是window

// 箭头函数不能用作构造函数
var Father = name => {
  this.name = name;
};
// console.log(new Father("randy")); //报错 箭头函数不能作为构造函数

// 箭头函数没有arguments对象 如果需要 需要使用...args
var hello = function(name, age) {
  console.log(arguments);
  console.log("arguments[0]", arguments[0]);
  console.log("arguments[1]", arguments[1]);
};
hello("randy", 24); //Arguments(2) [0: "randy", 1: 24]

var hello2 = (name, age) => {
  console.log(arguments);
};
// hello2("randy", 24) // Uncaught ReferenceError: arguments is not defined

var hello3 = (...args) => {
  console.log(args);
};
hello3("randy", 24); // ["randy", 24]
```
