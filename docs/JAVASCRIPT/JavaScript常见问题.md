### 1、数组去重方式有哪些？
  1：定义一个新数组，并存放原数组的第一个元素，然后将元素组一一和新数组的元素对比，若不同则存放在新数组中
  2：利用对象属性存在的特性，如果没有该属性则存入新数组。arr.inculeds()
  3：（最常用）：使用es6 set
  let arr= [1, 2, 3, 3, 5, 7, 2, 6, 8];
  console.log([...new Set(arr)]);
  
### 2、判断是不是一个数组的方法有哪些？各自区别？
  使用Array.isArray()方法 ES5新增的方法
  使用instanceof  xx instanceof Array 通过原型链来判断
  Object.prototype.toString().call(arr) 常用于判断浏览器内置对象。null也能正确判断出来。

### 3、立即执行函数(IIFE)的作用？
  独立的作用域，避免变量污染。
  模拟块级作用域。

### 4、什么是作用域 作用域链？
  JavaScript 中的作用域是我们可以有效访问变量或函数的区域。JS 有三种类型的作用域：全局作用域、函数作用域和块作用域(ES6新增)。
  全局作用域无法访问局部作用域里面的变量，但局部作用域可以向上访问全局作用域的变量。
  当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局作用域，这种查找过程称为作用域链。

### 5、什么是window对象? 什么是document对象?
   window对象是指浏览器打开的窗口。
   document对象是Documentd对象（HTML 文档对象）的一个只读引用，window对象的一个属性。

### 6. Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？
  hasOwnProperty
  obj.hasOwnProperty(pro)

### 7. js异步加载 async defer区别？
  默认情况下，脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。
  下面是async和defer两者区别：
    当script中有defer属性时，脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded事件发生)脚本才开始执行。多个脚本按顺序执行。
    当script有async属性时，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止HTML解析，执行脚本，脚本解析完继续HTML解析。多个脚本的执行顺序无法保证。
    当script同时有async和defer属性时，执行效果和async一致。

### 8. typeof和instanceof区别是什么？
  typeof能判断基本数据类型，除了null以外(null会被判断成object类型)，但是判断引用类型的时候除了function被判断成function其他的都会判断成object
  instanceof不能判断基本数据类型，只能判断引用数据类型。原理利用的是原型链。A.__proto__ 是不是等于类型的protorype。
  instanceof原理
    function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
      var O = R.prototype;// 取 R 的显式原型
      L = L.__proto__;    // 取 L 的隐式原型
      while (true) { 
          if (L === null || L== 'undefined') //已经找到顶层
              return false;  
          if (O === L)   //当 O 严格等于 L 时，返回 true
              return true; 
          L = L.__proto__;  //继续向上一层原型链查找
      }
    }

### 9、for in for of forEach map区别？
  for of 得到的是数组的值，不能遍历对象，支持break。
  for in 得到的是数组的下标，遍历对象的时候得到的是key，支持break。能获取对象原型上的属性，属性描述需要是enumerable。
  forEach 只能遍历数组，不支持break，要break需要throw error 然后try catch住。
  map 只能遍历数组，不支持break。对数组元素统一操作并会返回一个新的数组。

### 10、类数组和数组
  类数组拥有length属性，但不具有数组的方法，是一个普通的对象。常见的类数组有函数参数arguments，jquery的$('div')
  可以使用Array.from(类数组)或者[...类数组]把类数组变为数组。

### 11、什么是函数柯里化？实现 sum(1)(2)(3) 返回结果是1,2,3之和。
  function sum(a) {
    return function(b) {
        return function(c) {
            return a+b+c;
        }
    }
  }
  console.log(sum(1)(2)(3)); // 6

### 12、什么叫变量提升？
  JavaScript引擎的工作方式是，先编译代码，获取所有被声明的变量或函数，然后再一行一行地运行。
  这造成的结果，就是所有的变量的声明语句或申明的函数，都会被提升到代码的头部，这就叫做变量提升。
  因为变量提升所以可以先使用变量然后在定义变量，但是后面变量只能定义，不能定义然后赋值。
  变量提升只适用于var申明的变量或者函数，使用let const申明的变量或者箭头函数不存在变量提升这一说。

### 13、null undefined的区别是什么？
  都属于javascript的七种基本数据类型
  undefined表示一个变量未赋值，null表示赋值了知识值为空
  typeof undefined是undefined typeof null是object
  Number(undefined)是NaN Number(null)是0

### 14、在不借助第三个变量的情况下将两个数字对调有什么方法？
  1. let a=1, b=2; [b, a] = [a, b]
  2. a = a+b; b=a-b; a=a-b;

### 15、eval()函数
  用来执行一段字符脚本，如果参数不是字符串类型则直接返回该参数，在eval里面定义的变量不能变量提升，就是不能先使用后再eval里面定义。
  在严格模式下eval里面定义的变量和函数在外面访问不到。

### 16、用new运算符创建对象时例如new Fn()，具体的创建过程有那几步？
  创建一个新的空对象，该对象的__proto__指向该构造函数的prototype。
  将指定的参数传递给构造函数，给该对象赋值新的属性和方法。
  将执行上下文this绑定到新创建的对象中。
  返回该对象的地址。

### 17、&&运算符能做什么 ||运算符能做什么
  && 也可以叫逻辑与，在其操作数中找到第一个虚值表达式并返回它，如果没有找到任何虚值表达式，则返回最后一个真值表达式。
  console.log(" " && true && 5); // 5
  || 也叫或逻辑或，在其操作数中找到第一个真值表达式并返回它。这也使用了短路来防止不必要的工作。
  console.log(null || 1); // 1

### 18、使用 + 或一元加运算符是将字符串转换为数字的最快方法。因为如果值已经是数字，它不会执行任何操作。

### 19、DOM是什么？
  DOM 代表html文档的对象模型，在js中是document对象，里面有很多属性和方法。

### 20、!! 运算符能做什么？
  !!运算符可以将右侧的值强制转换为布尔值，这也是将值转换为布尔值的一种简单方法。
  console.log(!!null); // false

### 21、如何在一行中计算多个表达式的值？
  可以使用逗号运算符在一行中计算多个表达式。 它从左到右求值，并返回右边最后一个项目或最后一个操作数的值。
  x = (x++ , x = addFive(x), x *= 2, x -= 5, x += 10);

### 22、JavaScript 中的虚值是什么？
  简单的来说虚值就是是在转换为布尔值时变为 false 的值。
  const falsyValues = ['', 0, null, undefined, NaN, false];

### 23、如何检查值是否虚值？
  使用 Boolean 函数或者 !! 运算符。

### 24、严格模式怎么开启？有什么限制？
  使用"use strict"开启严格模式。严格模式帮助我们在代码的早期避免 bug，并为其添加限制。
  常见的几个限制
    变量必须声明后再使用
    函数的参数不能有同名属性，否则报错
    不能使用with语句
    不能对只读属性赋值，否则报错
    不能使用前缀 0 表示八进制数，否则报错
    不能删除不可删除的属性，否则报错
  严格模式的优点
    消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    消除代码运行的一些不安全之处，保证代码运行的安全；
    提高编译器效率，增加运行速度；为未来新版本的Javascript做好铺垫。

### 25、什么是高阶函数
   高阶函数是将函数作为参数或者返回值的函数。

### 26、全局变量缺点有什么？
  全局变量保存在静态存贮区，程序开始运行时为其分配内存，程序结束释放该内存。与局部变量的动态分配、动态释放相比，生存期比较长，
  因此过多的全局变量会占用较多的内存单元。
  全局变量破坏了函数的封装性能。函数象一个黑匣子，一般是通过函数参数和返回值进行输入输出，函数内部实现相对独立。但函数中如果使用了全局变量，
  那么函数体内的语句就可以绕过函数参数和返回值进行存取，这种情况破坏了函数的独立性，使函数对全局变量产生依赖。同时，也降低了该函数的可移植性。
  全局变量使函数的代码可读性降低。由于多个函数都可能使用全局变量，函数执行时全局变量的值可能随时发生变化，对于程序的查错和调试都非常不利。

### 27、下面输出什么
  class Chameleon {
    static colorChange(newColor) {
      this.newColor = newColor;
    }

    constructor({ newColor = "green" } = {}) {
      this.newColor = newColor;
    }
  }

  const freddie = new Chameleon({ newColor: "purple" });
  freddie.newColor == "purple"
  freddie.colorChange("orange"); //静态方法仅在创建它们的构造函数中存在，并且不能传递给任何子级。所以抛出TypeError错误

### 28、下面会输出什么
  let greeting;
  greetign = {};
  console.log(greetign); //输出{} 这个对象没被申明 默认到window上 全局变量。

### 29、setTimeout、Promise、Async/Await 的区别
  settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行； 
  promise.then里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；
  async函数表示函数里面可能会有异步方法，await后面跟一个表达式，async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

### 30、ES5/ES6 的类创建对象除了写法以外还有什么区别？
  class申明的类里面默认启用严格模式。
  class里面的所有方法都是不可枚举的。
  class创建的对象必须使用new创建 而es5通过方法创建的对象可以省略new。
