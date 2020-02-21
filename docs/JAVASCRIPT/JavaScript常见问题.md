### 1、数组去重方式有哪些？

    1：定义一个新数组，并存放原数组的第一个元素，然后将元素组一一和新数组的元素对比，若不同则存放在新数组中
    2：利用对象属性存在的特性，如果没有该属性则存入新数组。arr.inculeds()
    3：（最常用）：使用es6 set
    let arr= [1, 2, 3, 3, 5, 7, 2, 6, 8];
    console.log([...new Set(arr)]);

### 2、判断是不是一个数组的方法有哪些？各自区别？

- 使用 Array.isArray()方法 ES5 新增的方法
- 使用 instanceof xx instanceof Array 通过原型链来判断
- Object.prototype.toString().call(arr) 常用于判断浏览器内置对象。null 也能正确判断出来。

### 3、立即执行函数(IIFE)的作用？

- 独立的作用域，避免变量污染。
- 模拟块级作用域。

### 4、什么是作用域 作用域链？

- JavaScript 中的作用域是我们可以有效访问变量或函数的区域。JS 有三种类型的作用域：全局作用域、函数作用域和块作用域(ES6 新增)。
- 全局作用域无法访问局部作用域里面的变量，但局部作用域可以向上访问全局作用域的变量。
- 当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局作用域，这种查找过程称为作用域链。

### 5、什么是 window 对象? 什么是 document 对象?

- window 对象是指浏览器打开的窗口。
- document 对象是 Documentd 对象（HTML 文档对象）的一个只读引用，window 对象的一个属性。

### 6. Javascript 中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？

- hasOwnProperty()方法。obj.hasOwnProperty(pro);

### 7. js 异步加载 async defer 区别？

- 默认情况下，脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。但是通过加上 async 或 difer 标签就能实现异步加载。
- 下面是 async 和 defer 两者区别：
  - 当 script 中有 defer 属性时，脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded 事件发生)脚本才开始执行。多个脚本按顺序执行。
  - 当 script 有 async 属性时，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止 HTML 解析，执行脚本，脚本解析完继续 HTML 解析。多个脚本的执行顺序无法保证。
  - 当 script 同时有 async 和 defer 属性时，执行效果和 async 一致。

### 8. typeof 和 instanceof 区别是什么？

- typeof 能判断基本数据类型，除了 null 以外(null 会被判断成 object 类型)，但是判断引用类型的时候除了 function 被判断成 function 其他的都会判断成 object
- instanceof 不能判断基本数据类型，只能判断引用数据类型。原理利用的是原型链。A.**proto** 是不是等于类型的 protorype。

```js
//instanceof原理
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显式原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null || L == "undefined")
      //已经找到顶层
      return false;
    if (O === L)
      //当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__; //继续向上一层原型链查找
  }
}
```

### 9、for in for of forEach map 区别？

- for of 得到的是数组的值，不能遍历对象，支持 break。
- for in 得到的是数组的下标，遍历对象的时候得到的是 key，支持 break。能获取对象原型上的属性，属性描述需要是 enumerable。
- forEach 只能遍历数组，不支持 break，要 break 需要 throw error 然后 try catch 住。
- map 只能遍历数组，不支持 break。对数组元素统一操作并会返回一个新的数组。

### 10、类数组和数组

类数组拥有 length 属性，但不具有数组的方法，是一个普通的对象。常见的类数组有函数参数 arguments，jquery 的`$('div')`。可以使用 Array.from(类数组)或者`[...类数组]`把类数组变为数组。

### 11、什么是函数柯里化？实现 sum(1)(2)(3) 返回结果是 1,2,3 之和。

```js
function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(sum(1)(2)(3)); // 6
```

### 12、什么叫变量提升？

- JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量或函数，然后再一行一行地运行。
  这造成的结果，就是所有的变量的声明语句或申明的函数，都会被提升到代码的头部，这就叫做变量提升。
  因为变量提升所以可以先使用变量然后在定义变量。
- 但是后面变量只能定义，不能定义然后赋值。
- 变量提升只适用于 var 申明的变量或者函数，使用 let const 申明的变量或者箭头函数不存在变量提升这一说。

### 13、null undefined 的区别是什么？

- 都属于 javascript 的七种基本数据类型
- undefined 表示一个变量未赋值，null 表示赋值了知识值为空
- typeof undefined 是 undefined typeof null 是 object
- Number(undefined)是 NaN Number(null)是 0

### 14、在不借助第三个变量的情况下将两个数字对调有什么方法？

- 1. let a=1, b=2; [b, a] = [a, b]
- 2. a = a+b; b=a-b; a=a-b;

### 15、eval()函数

- 用来执行一段字符脚本，如果参数不是字符串类型则直接返回该参数，在 eval 里面定义的变量不能变量提升，就是不能先使用后再 eval 里面定义。而且在严格模式下 eval 里面定义的变量和函数在外面访问不到。
- 应该避免使用 eval，不安全，非常耗性能（2 次，一次解析成 js 语句，一次执行）。

### 16、用 new 运算符创建对象时例如 new Fn()，具体的创建过程有那几步？

- 创建一个新的空对象，该对象的`__proto__`指向该构造函数的 prototype。
- 将执行上下文 this 绑定到新创建的对象中。
- 将指定的参数传递给构造函数，给该对象赋值新的属性和方法。
- 判断构造函数的返回值类型，如果是一个普通对象则返回该对象，否则返回刚新建的对象。

### 17、&&运算符能做什么 ||运算符能做什么

- && 也可以叫逻辑与，在其操作数中找到第一个虚值表达式并返回它，如果没有找到任何虚值表达式，则返回最后一个真值表达式。console.log(" " && true && 5); // 5
- || 也叫或逻辑或，在其操作数中找到第一个真值表达式并返回它。这也使用了短路来防止不必要的工作。console.log(null || 1); // 1

### 18、将字符串转换为数字的最快方法

使用 + 或一元加运算符是将字符串转换为数字的最快方法。因为如果值已经是数字，它不会执行任何操作。

### 19、DOM 是什么？

DOM 代表 html 文档的对象模型，在 js 中是 document 对象，里面有很多属性和方法。

### 20、!! 运算符能做什么？

!!运算符可以将右侧的值强制转换为布尔值，这也是将值转换为布尔值的一种简单方法。console.log(!!null); // false

### 21、如何在一行中计算多个表达式的值？

可以使用逗号运算符在一行中计算多个表达式。 它从左到右求值，并返回右边最后一个项目或最后一个操作数的值。

```js
x = (x++, (x = addFive(x)), (x *= 2), (x -= 5), (x += 10));
```

### 22、JavaScript 中的虚值是什么？

简单的来说虚值就是是在转换为布尔值时变为 false 的值。

```js
const falsyValues = ["", 0, null, undefined, NaN, false];
```

### 23、如何检查值是否虚值？

使用 Boolean 函数或者 !! 运算符。

### 24、严格模式怎么开启？有什么限制？

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

### 25、什么是高阶函数

高阶函数是将函数作为参数或者返回值的函数。

### 26、全局变量缺点有什么？

- 全局变量保存在静态存贮区，程序开始运行时为其分配内存，程序结束释放该内存。与局部变量的动态分配、动态释放相比，生存期比较长，因此过多的全局变量会占用较多的内存单元。
- 全局变量破坏了函数的封装性能。函数象一个黑匣子，一般是通过函数参数和返回值进行输入输出，函数内部实现相对独立。但函数中如果使用了全局变量，那么函数体内的语句就可以绕过函数参数和返回值进行存取，这种情况破坏了函数的独立性，使函数对全局变量产生依赖。同时，也降低了该函数的可移植性。
- 全局变量使函数的代码可读性降低。由于多个函数都可能使用全局变量，函数执行时全局变量的值可能随时发生变化，对于程序的查错和调试都非常不利。

### 27、下面输出什么

```js
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
freddie.newColor == "purple";
freddie.colorChange("orange"); //静态方法仅在创建它们的构造函数中存在，并且不能传递给任何子级。所以抛出 TypeError 错误
```

### 28、下面会输出什么

```js
let greeting;
greetign = {};
console.log(greetign); //输出{} 这个对象没被申明 默认到 window 上 全局变量。
```

### 29、setTimeout、Promise、Async/Await 的区别

- settimeout 的回调函数放到宏任务队列里，等到执行栈清空以后执行；
- promise.then 里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；
- async 函数表示函数里面可能会有异步方法，await 后面跟一个表达式，async 方法执行时，遇到 await 会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

### 30、ES5/ES6 的类创建对象除了写法以外还有什么区别？

- class 申明的类里面默认启用严格模式。
- class 里面的所有方法都是不可枚举的。
- class 创建的对象必须使用 new 创建 而 es5 通过方法创建的对象可以省略 new。

### 31、 什么是堆？什么是栈？它们之间有什么区别和联系？

- 堆和栈的概念存在于数据结构中和操作系统内存中。
- 在数据结构中
  - 栈中数据的存取方式为先进后出。
  - 而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。
- 在操作系统中，内存被分为栈区和堆区。
  - 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
  - 堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

### 32、内部属性 `[[Class]]` 是什么？

所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 `[[Class]]`（我们可以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性无法直接访问，一般通过 Object.prototype.toString(..) 来查看。
例如：

```js
Object.prototype.toString.call([1, 2, 3]);
// "[object Array]"

Object.prototype.toString.call(/regex-literal/i);
// "[object RegExp]"
```

### 33、介绍 js 有哪些内置对象？

- 全局属性 NaN Infinity null undefined
- 全局方法 eval()、parseFloat()、parseInt()
- 构造函数 String、Number、Object、Function、Boolean、Symbol、Error、RegExp、Array、Map、Set、WeakMap、WeakSet、Date
- 结构化数据 JSON
- 数据计算 Math

### 34、 undefined 与 undeclared 的区别？

- 已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明过的变量，是 undeclared 的。
- 对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typeof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。

### 35、在 js 中不同进制数字的表示方式

- （1）以 0X、0x 开头的表示为十六进制。
- （2）以 0、0O、0o 开头的表示为八进制。
- （3）以 0B、0b 开头的表示为二进制格式。

### 36、js 中整数的安全范围是多少？

- 安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数是 2^53 - 1，
  即 9007199254740991，在 ES6 中被定义为 Number.MAX_SAFE_INTEGER。最小整数是-9007199254740991，在 ES6 中被定义为 Number.MIN_SAFE_INTEGER。
- 如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次
  计算返回了正或负的 Infinity 值，那么该值将无法参与下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数
  来判断。

### 37、typeof NaN 的结果是什么？

- NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出
  数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。
- typeof NaN; // "number"
- NaN 是一个特殊值，它和自身不相等，是唯一一个自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN
  为 true。

### 38、全局函数 isNaN 和 Number.isNaN 函数的区别？

- 全局函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果不是数字则返回 false，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。

### 39、Array 构造函数只有一个参数值时的表现？

- Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。这样
  创建出来的只是一个空数组，只不过它的 length 属性被设置成了指定的值。
- 构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。

### 40、{} 和 [] 的 valueOf 和 toString 的结果是什么？

- {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
- [] 的 valueOf 结果为 [] ，toString 的结果为 ""

### 41、什么是假值对象？

浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和
普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 document.all，它
是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。

### 42、如何实现数组的随机排序？

    （1）使用数组 sort 方法对数组元素随机排序，让 Math.random() 出来的数与 0.5 比较，如果大于就返回 1 交换位
      置，如果小于就返回 -1，不交换位置。

    function randomSort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    }

    缺点：每个元素被派到新数组的位置不是随机的，原因是 sort() 方法是依次比较的。

    （2）随机从原数组抽取一个元素，加入到新数组

    function randomSort(arr) {
      var result = [];

      while (arr.length > 0) {
          var randomIndex = Math.floor(Math.random() * arr.length);
          result.push(arr[randomIndex]);
          arr.splice(randomIndex, 1);
      }

      return result;
    }

    （3）随机交换数组内的元素（洗牌算法类似）

    function randomSort(arr) {
      var index,
        randomIndex,
        temp,
        len = arr.length;

      for (index = 0; index < len; index++) {
        randomIndex = Math.floor(Math.random() * (len - index)) + index;

        temp = arr[index];
        arr[index] = arr[randomIndex];
        arr[randomIndex] = temp;
      }

      return arr;
    }

    // es6
    function randomSort(array) {
      let length = array.length;

      if (!Array.isArray(array) || length <= 1) return;

      for (let index = 0; index < length - 1; index++) {
        let randomIndex = Math.floor(Math.random() * (length - index)) + index;

        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
      }

      return array;
    }

### 43、 javascript 创建对象的几种方式？

- 我们一般使用字面量的形式直接创建对象，但是这种创建方式对于创建大量相似对象的时候，会产生大量的重复代码。但 js 和一般的面向对象的语言不同，在 ES6 之前它没有类的概念。但是我们可以使用函数来进行模拟，从而产生出可复用的对象创建方式，我了解到的方式有这么几种：

- （1）第一种是工厂模式，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。

- （2）第二种是构造函数模式。js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此我们可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此我们可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次我们都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。

- （3）第三种模式是原型模式，因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

- （4）第四种模式是组合使用构造函数模式和原型模式，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此我们可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

- （5）第五种模式是动态原型模式，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

- （6）第六种模式是寄生构造函数模式，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个
  缺点和工厂模式一样，无法实现对象的识别。

### 44、什么是 DOM 和 BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。

### 45、写一个通用的事件侦听器函数。

```js
const EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 添加事件
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function(event) {
    return event || window.event;
  },

  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};
```

### 46、如何判断一个对象是否属于某个类？

- 第一种方式是使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

- 第二种方式可以通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。

- 第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的`[[Class]]` 属性来进行判断。

### 47、js 延迟加载的方式有哪些？

- js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。

  - 第一种方式是我们一般采用的是将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

  - 第二种方式是给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。

  - 第三种方式是给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。

  - 第四种方式是动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

### 48、DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？

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

### 49、JavaScript 类数组对象的定义？

- 一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。
- 常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length
  属性值，代表可接收的参数个数。

  常见的类数组转换为数组的方法有这样几种：

  （1）通过 call 调用数组的 slice 方法来实现转换

        Array.prototype.slice.call(arrayLike);

  （2）通过 call 调用数组的 splice 方法来实现转换

         Array.prototype.splice.call(arrayLike, 0);

  （3）通过 apply 调用数组的 concat 方法来实现转换

         Array.prototype.concat.apply([], arrayLike)

  （4）通过 Array.from 方法来实现转换

         Array.from(arrayLike);

### 50、如何编写高性能的 Javascript ？

- （1）使用位运算代替一些简单的四则运算。

- （2）避免使用过深的嵌套循环。

- （3）不要使用未申明的变量。在方法内未通过 var 申明的变量是全局变量。

- （4）当需要多次访问数组长度时，可以用变量保存起来，避免每次都会去进行属性查找。dom 也是类似。

### 51、实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？

- 通过使用 pushState + ajax 实现浏览器无刷新前进后退，当一次 ajax 调用成功后我们将一条 state 记录加入到 history 对象中。一条 state 记录包含了 url、title 和 content 属性，在 popstate 事件中可以获取到这个 state 对象，我们可以使用 content 来传递数据。最后我们通过对 window.onpopstate 事件监听来响应浏览器的前进后退操作。

- 使用 pushState 来实现有两个问题，一个是打开首页时没有记录，我们可以使用 replaceState 来将首页的记录替换，另一个问题是当一个页面刷新的时候，仍然会向服务器端请求数据，因此如果请求的 url 需要后端的配合将其重定向到一个页面。

### 52、如何判断当前脚本运行在浏览器还是 node 环境中？

- this === window ? 'browser' : 'node';

- 通过判断 Global 对象是否为 window，如果不为 window，当前脚本没有运行在浏览器中。

### 53、什么是“前端路由”？什么时候适合使用“前端路由”？“前端路由”有哪些优点和缺点？

- （1）什么是前端路由？

  - 前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

- （2）什么时候使用前端路由？

  - 在单页面应用，大部分页面结构不变，只改变部分内容的使用

- （3）前端路由有什么优点和缺点？

  - 优点
    - 用户体验好，不需要每次都从服务器全部获取，快速展现给用户
  - 缺点

    - 单页面第一次加载慢

- 前端路由一共有两种实现方式，一种是通过 hash 的方式，一种是通过使用 pushState 的方式。

### 54、 什么是 Polyfill ？

- Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。
- 比如说 querySelectorAll 是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么这就可以成为一个 Polyfill。

### 55、Object.is() 与原来的比较操作符 “===”、“==” 的区别？

- 使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

- 使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。

- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。

### 56、escape,encodeURI,encodeURIComponent 有什么区别？

- encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。

- encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。

- escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，再在每个字节前加上 %。

### 57、Unicode 和 UTF-8 之间的关系？

- Unicode 是一种字符集合，现在可容纳 100 多万个字符。每个字符对应一个不同的 Unicode 编码，它只规定了符号的二进制代码，却没有规定这个二进制代码在计算机中如何编码传输。

- UTF-8 是一种对 Unicode 的编码方式，它是一种变长的编码方式，可以用 1~4 个字节来表示一个字符。

### 58、为什么 0.1 + 0.2 != 0.3？如何解决这个问题？

- 当计算机计算 0.1+0.2 的时候，实际上计算的是这两个数字在计算机里所存储的二进制，0.1 和 0.2 在转换为二进制表示的时候会出现位数无限循环的情况。js 中是以 64 位双精度格式来存储数字的，只有 53 位的有效数字，超过这个长度的位数会被截取掉这样就造成了精度丢失的问题。这是第一个会造成精度丢失的地方。在对两个以 64 位双精度格式的数据进行计算的时候，首先会进行对阶的处理，对阶指的是将阶码对齐，也就是将小数点的位置对齐后，再进行计算，一般是小阶向大阶对齐，因此小阶的数在对齐的过程中，有效数字会向右移动，移动后超过有效位数的位会被截取掉，这是第二个可能会出现精度丢失的地方。当两个数据阶码对齐后，进行相加运算后，得到的结果可能会超过 53 位有效数字，因此超过的位数也会被截取掉，这是可能发生精度丢失的第三个地方。

- 对于这样的情况，我们可以将其转换为整数后再进行运算，运算后再转换为对应的小数，以这种方式来解决这个问题。

### 59、offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？

- clientWidth/clientHeight 返回的是元素的内部宽度，它的值只包含 content + padding，如果有滚动条，不包含滚动条。
- clientTop 返回的是上边框的宽度。
- clientLeft 返回的左边框的宽度。

- offsetWidth/offsetHeight 返回的是元素的布局宽度，它的值包含 content + padding + border 包含了滚动条。
- offsetTop 返回的是当前元素相对于其 offsetParent 元素的顶部的距离。
- offsetLeft 返回的是当前元素相对于其 offsetParent 元素的左部的距离。

- scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸。
- scrollTop 属性返回的是一个元素的内容垂直滚动的像素数。
- scrollLeft 属性返回的是元素滚动条到元素左边的距离。

### 60、Js 动画与 CSS 动画区别及相应实现

CSS3 的动画的优点

- 在性能上会稍微好一些，浏览器会对 CSS3 的动画做一些优化
- 代码相对简单

缺点

- 在动画控制上不够灵活
- 兼容性不好

JavaScript 的动画正好弥补了这两个缺点，控制能力很强，可以单帧的控制、变换，同时写得好完全可以兼容 IE6，并且功能强
大。对于一些复杂控制的动画，使用 javascript 会比较靠谱。而在实现一些小的交互动效的时候，就多考虑考虑 CSS 吧

### 61、URL 和 URI 的区别？

- URI: Uniform Resource Identifier 指的是统一资源标识符
- URL: Uniform Resource Location 指的是统一资源定位符
- URN: Universal Resource Name 指的是统一资源名称

URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说，不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。

URL 指的是统一资源定位符，URN 指的是统一资源名称。URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，U
RN 可以理解为使用名称来标识资源。

### 62、js 拖拽功能的实现

一个元素的拖拽过程，我们可以分为三个步骤，第一步是鼠标按下目标元素，第二步是鼠标保持按下的状态移动鼠标，第三步是鼠
标抬起，拖拽过程结束。

这三步分别对应了三个事件，mousedown 事件，mousemove 事件和 mouseup 事件。只有在鼠标按下的状态移动鼠标我们才会执行拖拽事件，因此我们需要在 mousedown 事件中设置一个状态来标识鼠标已经按下，然后在 mouseup 事件中再取消这个状态。在 mousedown 事件中我们首先应该判断，目标元素是否为拖拽元素，如果是拖拽元素，我们就设置状态并且保存这个时候鼠标的位置。然后在 mousemove 事件中，我们通过判断鼠标现在的位置和以前位置的相对移动，来确定拖拽元素在移动中的坐标。最后 mouseup 事件触发后，清除状态，结束拖拽事件。

### 63、为什么使用 setTimeout 实现 setInterval？怎么模拟？

setInterval 的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间立即执行，它真正的作用是每隔一段时间将事件加入事件队列中去，只有当当前的执行栈为空的时候，才能去从事件队列中取出事件执行。所以可能会出现这样的情况，就是当前执行栈执行的时间很长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候，这些事件会依次执行，因此就不能到间隔一段时间执行的效果。

针对 setInterval 的这个缺点，我们可以使用 setTimeout 递归调用来模拟 setInterval，这样我们就确保了只有一个事件结束了，我们才会触发下一个定时器事件，这样解决了 setInterval 的问题。

```js
function mySetInterval(fn, timeout) {
  // 控制器，控制定时器是否继续执行
  var timer = {
    flag: true
  };

  // 设置递归函数，模拟定时器执行。
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout);
    }
  }

  // 启动定时器
  setTimeout(interval, timeout);

  // 返回控制器
  return timer;
}
```

### 64、什么是尾调用，使用尾调用有什么好处？

尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一个函数里调用另一个函数时，我们会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

### 65、require 模块引入的查找方式？

    当 Node 遇到 require(X) 时，按下面的顺序处理。

    （1）如果 X 是内置模块（比如 require('http')）
    　　a. 返回该模块。
    　　b. 不再继续执行。

    （2）如果 X 以 "./" 或者 "/" 或者 "../" 开头
    　　a. 根据 X 所在的父模块，确定 X 的绝对路径。
    　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X
        X.js
        X.json
        X.node

    　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X/package.json（main字段）
        X/index.js
        X/index.json
        X/index.node

    （3）如果 X 不带路径
    　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。
    　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。

    （4）抛出 "not found"

### 66、如何在 js 里面判断是否有网络？

- navigator.onLine
- window.addEventListener('online', updateOnlineStatus);
- window.addEventListener('offline', updateOnlineStatus);

### 67、如何在 js 里面判断网络类型？

使用 navigator.connection||navigator.mozConnection||navigator.webkitConnection，该对象里面包含了网络类型。

### 68、如何在 js 里面判断浏览器类型？如何判断版本？

- navigator.userAgent 判断浏览器类型
- navigator.appVersion 判断浏览器版本

### 69、如何封装一个 javascript 的类型判断函数？

```js
function getType(value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + "";
  }

  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");

    type.pop();

    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
```

### 70、如何判断一个对象是否为空对象？

```js
function checkNullObj(obj) {
  return Object.keys(obj).length === 0;
}
```

### 71、一道常被人轻视的前端 JS 面试题

```js
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```

### 72、js for 循环注意点

```js
for (var i = 0, j = 0; i < 5, j < 9; i++, j++) {
  console.log(i, j);
}
```

- 当判断语句含有多个语句时，以最后一个判断语句的值为准，因此上面的代码会执行 10 次。
- 当判断语句为空时，循环会一直进行。

### 73、一个列表，假设有 100000 个数据，这个该怎么办？

我们需要思考的问题：该处理是否必须同步完成？数据是否必须按顺序完成？

解决办法：

（1）将数据分页，利用分页的原理，每次服务器端只返回一定数目的数据，浏览器每次只对一部分进行加载。

（2）使用懒加载的方法，每次加载一部分数据，其余数据当需要使用时再去加载。

（3）使用数组分块技术，基本思路是为要处理的项目创建一个队列，然后设置定时器每过一段时间取出一部分数据，然后再使用定时器取出下一个要处理的项目进行处理，接着再设置另一个定时器。

### 74、 js 中倒计时的纠偏实现？

在前端实现中我们一般通过 setTimeout 和 setInterval 方法来实现一个倒计时效果。但是使用这些方法会存在时间偏差的问题，这是由于 js 的程序执行机制造成的，setTimeout 和 setInterval 的作用是隔一段时间将回调事件加入到事件队列中，因此事件并不是立即执行的，它会等到当前执行栈为空的时候再取出事件执行，因此事件等待执行的时间就是造成误差的原因。

一般解决倒计时中的误差的有这样两种办法：

（1）第一种是通过前端定时向服务器发送请求获取最新的时间差，以此来校准倒计时时间。

（2）第二种方法是前端根据偏差时间来自动调整间隔时间的方式来实现的。这一种方式首先是以 setTimeout 递归的方式来实现倒计时，然后通过一个变量来记录已经倒计时的秒数。每一次函数调用的时候，首先将变量加一，然后根据这个变量和每次的间隔时间，我们就可以计算出此时无偏差时应该显示的时间。然后将当前的真实时间与这个时间相减，这样我们就可以得到时间的偏差大小，因此我们在设置下一个定时器的间隔大小的时候，我们就从间隔时间中减去这个偏差大小，以此来实现由于程序执行所造成的时间误差的纠正。

### 75、如何查找一篇英文文章中出现频率最高的单词？

```js
function findMostWord(article) {
  // 合法性判断
  if (!article) return;

  // 参数处理
  article = article.trim().toLowerCase();

  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = "";

  article = " " + wordList.join("  ") + " ";

  // 遍历判断单词出现次数
  wordList.forEach(function(item) {
    if (visited.indexOf(item) < 0) {
      let word = new RegExp(" " + item + " ", "g"),
        num = article.match(word).length;

      if (num > maxNum) {
        maxNum = num;
        maxWord = item;
      }
    }
  });

  return maxWord + "  " + maxNum;
}
```
