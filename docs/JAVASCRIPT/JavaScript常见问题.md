### 1、判断是不是一个数组的方法有哪些？各自区别？

- 使用 Array.isArray()方法 ES5 新增的方法
- 使用 instanceof xx instanceof Array 通过原型链来判断
- Object.prototype.toString.call(arr) 常用于判断浏览器内置对象。null 也能正确判断出来。

### 2、立即执行函数(IIFE)的作用？

- 模拟块级作用域。
- 独立的作用域，避免变量污染。

### 3、什么是作用域 作用域链？

- JavaScript 中的作用域是我们可以有效访问变量或函数的区域。JS 有三种类型的作用域：全局作用域、函数作用域和块作用域(ES6 新增)。
- 全局作用域无法访问局部作用域里面的变量，但局部作用域可以向上访问全局作用域的变量。
- 当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局作用域，这种查找过程称为作用域链。

### 4. js 异步加载 async defer 区别？

- 默认情况下，脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。但是通过加上 async 或 difer 标签就能实现异步加载。
- 下面是 async 和 defer 两者区别：
  - 当 script 中有 defer 属性时，脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded 事件发生前)脚本才开始执行。多个脚本按顺序执行。
  - 当 script 有 async 属性时，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止 HTML 解析，执行脚本，脚本解析完继续 HTML 解析。多个脚本的执行顺序无法保证。
  - 当 script 同时有 async 和 defer 属性时，执行效果和 async 一致。

### 5. typeof 和 instanceof 区别是什么？

- typeof 能判断基本数据类型，除了 null 以外(null 会被判断成 object 类型)，但是判断引用类型的时候除了 function 被判断成 function 其他的都会判断成 object
- instanceof 不能判断基本数据类型，只能判断引用数据类型。原理利用的是原型链。`A.__proto__` 是不是等于类型的 protorype。

```js
function myInstanceof(l, r) {
  let L = l.__proto__;
  let R = r.prototype;
  while (true) {
    if (L === R) {
      return true;
    }
    if (L === null || L === "undefined") {
      return false;
    }
    L = L.__proto__;
  }
}
```

### 6、for in for of forEach map 区别？

- 普通 for 循环支持 break
- for of 得到的是数组的值，不能遍历对象，支持 break。
- for in 得到的是数组的下标，遍历对象的时候得到的是 key，支持 break。能获取对象原型上的属性，属性描述需要是 enumerable。
- forEach 只能遍历数组，不支持 break，要 break 需要 throw error 然后 try catch 住。
- map 只能遍历数组，不支持 break。对数组元素统一操作并会返回一个新的数组。空元素也会被保留。比如`[1,,2]`会保留重中间的元素。

### 7、什么叫变量提升？

- JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量或函数，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句或申明的函数，都会被提升到代码的头部，这就叫做变量提升。因为变量提升所以可以先使用变量然后在定义变量。且函数的优先级比 var 声明的变量高。
- 但是后面变量只能定义，不能定义然后赋值。
- 变量提升只适用于 var 申明的变量或者函数，使用 let const 申明的变量或者箭头函数不存在变量提升这一说。

```js
// 1
console.log(foo); // undefined
console.log(foo); // undefined
foo = 1;
console.log(foo); // 1

var foo;

// 2
console.log(foo); // foo() {}
console.log(foo); // foo() {}
foo = 1;
console.log(foo); // 1

var foo;
function foo() {}
```

### 8、null undefined undeclared 的区别是什么？

- 都属于 javascript 的七种基本数据类型
- undefined 表示一个变量定义了但是未赋值，null 表示定义了一个变量并且赋值了只是值为空 null
- typeof undefined 是 undefined typeof null 是 object
- Number(undefined)是 NaN Number(null)是 0
- null == undefined
- 已在作用域中声明但还没有赋值的变量，是 undefined 的，不会报错。相反，还没有在作用域中声明过的变量，是 undeclared 的。对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: a is not defined 。但是我们可以使用 typeof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。

### 9、在不借助第三个变量的情况下将两个数字对调有什么方法？

- 1. let a=1, b=2; [b, a] = [a, b]
- 2. a = a+b; b=a-b; a=a-b;

### 10、eval()函数

- 用来执行一段字符脚本，如果参数不是字符串类型则直接返回该参数，在 eval 里面定义的变量不能变量提升，就是不能先使用后再 eval 里面定义。
- 而且在严格模式下 eval 里面定义的变量和函数在外面访问不到。
- 应该避免使用 eval，不安全，非常耗性能（2 次，一次解析成 js 语句，一次执行）。

### 11、&&运算符能做什么 ||运算符能做什么 !!运算符能做什么

&& 也可以叫逻辑与，在其操作数中找到第一个虚值表达式并返回它，如果没有找到任何虚值表达式，则返回最后一个真值表达式。console.log(" " && true && 5); // 5

|| 也叫或逻辑或，在其操作数中找到第一个真值表达式并返回它。这也使用了短路来防止不必要的工作。console.log(null || 1); // 1

!!运算符可以将右侧的值强制转换为布尔值，这也是将值转换为布尔值的一种简单方法。console.log(!!null); // false

### 12、将字符串转换为数字的最快方法

使用 + 或一元加运算符是将字符串转换为数字的最快方法。因为如果值已经是数字，它不会执行任何操作。

```js
+new Date();
```

### 13、如何在一行中计算多个表达式的值？

可以使用逗号运算符在一行中计算多个表达式。 它从左到右求值，并返回右边最后一个项目或最后一个操作数的值。

```js
x = (x++, (x = addFive(x)), (x *= 2), (x -= 5), (x += 10));
```

### 14、JavaScript 中的虚值是什么？

简单的来说虚值就是是在转换为布尔值时变为 false 的值。

```js
const falsyValues = ["", 0, null, undefined, NaN, false];
```

### 15、严格模式怎么开启？有什么限制？

    使用"use strict"开启严格模式。严格模式帮助我们在代码的早期避免 bug，并为其添加限制。
    常见的几个限制:
      变量必须声明后再使用
      函数的参数不能有同名属性，否则报错
      不能使用 with 语句
      不能对只读属性赋值，否则报错
      不能使用前缀 0 表示八进制数，否则报错
      不能删除不可删除的属性，否则报错

    严格模式的优点
      消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
      消除代码运行的一些不安全之处，保证代码运行的安全；
      提高编译器效率，增加运行速度；为未来新版本的 Javascript 做好铺垫。

### 16、什么是高阶函数

高阶函数是将函数作为参数或者返回值的函数。

### 17、全局变量缺点有什么？

- 全局变量保存在静态存贮区，程序开始运行时为其分配内存，程序结束释放该内存。与局部变量的动态分配、动态释放相比，生存期比较长，因此过多的全局变量会占用较多的内存单元。
- 全局变量使函数的代码可读性降低。由于多个函数都可能使用全局变量，函数执行时全局变量的值可能随时发生变化，对于程序的查错和调试都非常不利。

### 18、setTimeout、Promise、Async/Await 的区别

- settimeout 的回调函数放到宏任务队列里，等到执行栈清空以后执行；
- promise.then 里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；
- async 函数表示函数里面可能会有异步方法，await 后面跟一个表达式，async 方法执行时，遇到 await 会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

### 19、ES5/ES6 的类创建对象除了写法以外还有什么区别？

- class 申明的类里面默认启用严格模式。
- class 里面的所有方法都是不可枚举的。

```js
class People1 {
  constructor(name) {
    this.name = name;
    // 方法在实例上
    this.hello = function () {
      console.log("hello");
    };
  }
  // 方法在原型上
  say() {
    console.log(say);
  }
}

const p1 = new People1("demi");
console.log(p1);

function People2(name) {
  this.name = name;
  // 看不到
  function say() {
    console.log(say);
  }
  // 方法在实实例上
  this.hello = function () {
    console.log("hello");
  };
}

// 方法在原型上
People2.prototype.hi = function () {
  console.log("hi");
};

const p2 = new People2("randy");
console.log(p2);
```

### 20、 什么是堆？什么是栈？它们之间有什么区别和联系？

- 堆和栈的概念存在于数据结构中和操作系统内存中。
- 在数据结构中
  - 栈中数据的存取方式为先进后出。
  - 而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。
- 在操作系统中，内存被分为栈区和堆区。
  - 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
  - 堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。存放引用数据类型。

### 21、内部属性 `[[Class]]` 是什么？

所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 `[[Class]]`（我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性无法直接访问，一般通过 Object.prototype.toString.call() 来查看。
例如：

```js
Object.prototype.toString.call([1, 2, 3]);
// "[object Array]"

Object.prototype.toString.call(/regex-literal/i);
// "[object RegExp]"
```

### 22、介绍 js 有哪些内置对象？

- 全局属性 NaN Infinity null undefined
- 全局方法 eval()、parseFloat()、parseInt() isNaN()
- 构造函数 String、Number、Object、Function、Boolean、Symbol、Error、RegExp、Array、Map、Set、WeakMap、WeakSet、Date
- 结构化数据 JSON
- 数据计算 Math

### 23、在 js 中不同进制数字的表示方式

- （1）以 0X、0x 开头的表示为十六进制。
- （2）以 0、0O、0o 开头的表示为八进制。
- （3）以 0B、0b 开头的表示为二进制格式。

### 24、js 中整数的安全范围是多少？

安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数是 2^53 - 1，即 9007199254740991，在 ES6 中被定义为 Number.MAX_SAFE_INTEGER。最小整数是-9007199254740991，在 ES6 中被定义为 Number.MIN_SAFE_INTEGER。

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次计算返回了正或负的 Infinity 值，那么该值将无法参与下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数来判断。

### 25、typeof NaN 的结果是什么？

- NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。
- typeof NaN; // "number"
- NaN 是一个特殊值，它和自身不相等，是唯一一个自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN 为 true。使用 Object.is()判断 NaN 会是 true。

### 26、全局函数 isNaN 和 Number.isNaN 函数的区别？

- 全局函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。这个是判断是否不是一个数字。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果不是数字则返回 false，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。专门针对 NaN 判断的。

### 27、{} 和 [] 的 valueOf 和 toString 的结果是什么？

- {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
- [] 的 valueOf 结果为 [] ，toString 的结果为 ""

### 28、如何判断一个对象是否属于某个类？

- 第一种方式是使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

- 第二种方式可以通过对象的 constructor.name 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。

### 29、js 延迟加载的方式有哪些？

- js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。

  - 第一种方式是我们一般采用的是将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

  - 第二种方式是给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。

  - 第三种方式是给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。

  - 第四种方式是动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。document.createElement("script")

### 30、DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？

    （1）创建新节点
      createDocumentFragment(node)
      createElement(node)
      createTextNode(text)

    （2）添加、移除、替换、插入
      appendChild(node)
      removeChild(node)
      replaceChild(new,old)
      insertBefore(new,old)

    （3）查找
      getElementById()
      getElementsByName()
      getElementsByTagName()
      getElementsByClassName()
      querySelector()
      querySelectorAll()

    （4）属性操作
      getAttribute(key)
      setAttribute(key,value)
      hasAttribute(key)
      removeAttribute(key)

### 31、如何判断当前脚本运行在浏览器还是 node 环境中？

- this === window ? 'browser' : 'node';

- 通过判断 Global 对象是否为 window，如果不为 window，当前脚本没有运行在浏览器中。
- 在 node 中 this===global

### 32、 什么是 Polyfill ？

- Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。
- 比如说 querySelectorAll 是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么这就可以成为一个 Polyfill。

### 33、Object.is() 与原来的比较操作符 “===”、“==” 的区别？

- 使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

- 使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。

- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

### 34、为什么 0.1 + 0.2 != 0.3？如何解决这个问题？

对于这样的情况，我们可以将其转换为整数后再进行运算，运算后再转换为对应的小数，以这种方式来解决这个问题。

### 35、offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？

- clientWidth/clientHeight 返回的是元素的内部宽度，它的值只包含 content + padding，如果有滚动条，不包含滚动条。
- clientTop 返回的是上边框的宽度。
- clientLeft 返回的左边框的宽度。

- offsetWidth/offsetHeight 返回的是元素的布局宽度，它的值包含 content + padding + border 包含了滚动条。
- offsetTop 返回的是当前元素相对于其 offsetParent 元素的顶部的距离。
- offsetLeft 返回的是当前元素相对于其 offsetParent 元素的左部的距离。

- scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸。
- scrollTop 属性返回的是一个元素的内容垂直滚动的像素数。
- scrollLeft 属性返回的是元素滚动条到元素左边的距离。

### 36、URL 和 URI 的区别？

- URI: Uniform Resource Identifier 指的是统一资源标识符
- URL: Uniform Resource Location 指的是统一资源定位符
- URN: Universal Resource Name 指的是统一资源名称

URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说，不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。

URL 指的是统一资源定位符，URN 指的是统一资源名称。URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。

### 37、js 拖拽功能的实现

一个元素的拖拽过程，我们可以分为三个步骤，第一步是鼠标按下目标元素，第二步是鼠标保持按下的状态移动鼠标，第三步是鼠标抬起，拖拽过程结束。

这三步分别对应了三个事件，mousedown 事件，mousemove 事件和 mouseup 事件。只有在鼠标按下的状态移动鼠标我们才会执行拖拽事件，因此我们需要在 mousedown 事件中设置一个状态来标识鼠标已经按下，然后在 mouseup 事件中再取消这个状态。在 mousedown 事件中我们首先应该判断，目标元素是否为拖拽元素，如果是拖拽元素，我们就设置状态并且保存这个时候鼠标的位置。然后在 mousemove 事件中，我们通过判断鼠标现在的位置和以前位置的相对移动，来确定拖拽元素在移动中的坐标。最后 mouseup 事件触发后，清除状态，结束拖拽事件。

### 38、什么是尾调用，使用尾调用有什么好处？

尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一个函数里调用另一个函数时，我们会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

### 39、如何在 js 里面判断是否有网络？

- navigator.onLine
- window.addEventListener('online', updateOnlineStatus);
- window.addEventListener('offline', updateOnlineStatus);

### 40、如何在 js 里面判断网络类型？

使用 navigator.connection||navigator.mozConnection||navigator.webkitConnection，该对象里面包含了网络类型。

### 41、如何在 js 里面判断浏览器类型？如何判断版本？

- navigator.userAgent 判断浏览器类型
- navigator.appVersion 判断浏览器版本

### 42、js 中编码的三种方法

1、encodeURI

该方法不会对 ASCII 表中的字母和数字编码，同时也不会对 ASCII 中的标点符号编码 `-_.~*’()`， 在 URI 中具有特殊含义的符号 `;/?:@&=+$,#`同样不会被编码。

```js
var url = "https://google.com/pathname?a=1&b=abcde&c=黄山#hash";
encodeURI(url); // 返回 https://google.com/pathname?a=1&b=abcde&c=%E9%BB%84%E5%B1%B1#hash

encodeURI("-_.~*'()"); // 返回 -_.~*'()

encodeURI(";/?:@&=+$,#"); // 返回 ;/?:@&=+$,#
```

2、encodeURIComponent

该方法相比 encodeURI 多编码 URI 中具有特殊含义的符号 `;/?:@&=+$,#`

```js
var url = "https://google.com/pathname?a=1&b=abcde&c=黄山#hash";
encodeURIComponent(url); // 打印 "https%3A%2F%2Fgoogle.com%2Fpathname%3Fa%3D1%26b%3Dabcde%26c%3D%E9%BB%84%E5%B1%B1%23hash"

encodeURIComponent("-_.~*'()"); // 返回 -_.~*'()

encodeURIComponent(";/?:@&=+$,#"); // 返回 %3B%2F%3F%3A%40%26%3D%2B%24%2C%23
```

3、escape（不推荐使用，推荐使用上面两个方法代替）

该方法会对 ASCII 中 字母、数字及符号`*@-_+./`之外的所有字符进行编码。

### 43、获取页面是否是否可见

当页面被最小化或者被切换成后台标签页时，页面为不可见，浏览器会触发一个 visibilitychange 事件,并设置 document.hidden 属性为 true；切换到显示状态时，页面为可见，也同样触发一个 visibilitychange 事件，设置 document.hidden 属性为 false。

```js
window.addEventListener("visibilitychange", function () {
  alert(document.hidden);
});
```

### 44、requestAnimationFrame

在 requestAnimationFrame 还未出来之前，大多数使用定时器完成 js 动画，但是由于定时器不准确，而且每次更新动画的时候不能保证与浏览器渲染同步，这样将会导致画面的不流畅

由于目前主流屏幕的固定刷新频率一般为 60HZ 即一秒 60 帧，每次刷新间隔为 1000/60 = 16.7，为了使浏览器得到最好的渲染效果，浏览器每次渲染应该与屏幕刷新率保持一致，那么对于 js 动画而言，最好的更新时机应该与浏览器尽量保持一致

当每次浏览器将要重绘之前，把要执行更新的动画更新完成，那么当浏览器渲染的时候将会保持最新的动画，这就是 requestAnimationFrame 所做的事情

requestAnimationFrame(callback) 的参数就是每次渲染前需要执行的动画更新函数，当浏览器将要重绘画面时就会执行这个回调函数，这个回调函数接受一个参数，即从当前页面加载之后到现在所经过的毫秒数。time

此 api 将会与浏览器渲染同步，即浏览器渲染几次这个 api 将会执行几次，那么就达到了不掉帧的效果，画面效果就更加流程
requestAnimationFrame 执行时机在事件循环机制中处于微任务队列之后，浏览器渲染之前，浏览器渲染之后就会进入下一次的事件循环(宏任务开始，浏览器渲染结束)

如果使用定时器进行 js 动画操作，那么首先将会导致动画更新与浏览器每次重绘时机不匹配，造成卡顿，其次过于频繁的更新动画还会导致不必要的性能开销，且并非能够达到更好的效果

简单说使用 requestAnimationFrame 更新的动画与浏览器保持同步，不会掉帧，除非浏览器掉帧或者，js 主线程阻塞导致浏览器无法正常渲染，使用定时器更新动画，如果频率高了会影响性能，且达不到更好的效果，如果频率低了将会有不连贯的感觉

```js
// requestAnimationFrame的调用和浏览器的刷新保持一致
let t = 0;
function fn(time) {
  console.log(time - t); //16.7 60HZ
  t = time;
  requestAnimationFrame(fn);
}
requestAnimationFrame(fn);
```

### 45、sort()方法

- 会修改原数组
- 如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。第一个相同比较第二个。
- 如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个参数 a 和 b，a 和 b 代表数组中的项，然后返回一个用于说明这两个值的相对顺序的数字。适用与数字。
  - return a-b 升序即 a > b
  - return b-a 降序 a < b
- 如果是对象上的某个属性比较，可以使用下面的比较。使用与字符串。升序
  - if(a.xxx > b.xxx){return 1} //1 升序。降序的话返回-1
  - if(a.xxx < b.xxx>){return -1}
  - else return 0

### 46、获取自定义属性 data-xxx

```js
// <div id="div1" data-user="randy" data-user-age="24"></div>;

// 第一种方法
const div1 = document.getElementById("div1");
console.log(div1.dataset.user);
console.log(div1.dataset.userAge); // 会变成驼峰式

// 第二种方法
console.log(div1.getAttribute("data-user"));
console.log(div1.getAttribute("data-user-age"));
```

### 47、JS 如何获取盒模型对应的宽和高？

```js
//只能获取内联样式设置的宽高
dom.style.width / height;

//获取渲染后即时运行的宽高，值是准确的。但只支持 IE
dom.currentStyle.width / height;

//获取渲染后即时运行的宽高，值是准确的。兼容性更好
window.getComputedStyle(dom).width / height;

//获取渲染后即时运行的宽高，值是准确的。兼容性也很好，一般用来获取元素的绝对位置和大小。
dom.getBoundingClientRect().width / height;
```
