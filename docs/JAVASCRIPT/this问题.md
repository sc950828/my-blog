1、this的4种绑定规则
  this的4种绑定规则分别是：默认绑定、隐式绑定、显示绑定、new 绑定。优先级从低到高。
  1.默认绑定 作为普通函数执行 this指向window严格模式下指向undefined
    function foo() { 
      console.log( this.a );
    }
    var a = 2; 
    foo(); //2
    因为foo()是直接调用的（独立函数调用），没有应用其他的绑定规则，这里进行了默认绑定，将全局对象绑定this上，所以this.a 就解析成了全局变量中的a，即2。
    注意：在严格模式下（use strict），全局对象将无法使用默认绑定，即执行会报undefined的错误

   2.隐式绑定 作为对象的属性执行 this指向该对象
      function foo() {
          console.log( this.a );
      }
      var a = 2;
      var obj = {
          a: 3,
          foo: foo 
      };
      obj.foo(); // 3
      这里this隐式绑定了obj

    3.显示绑定 显示的改变this
      通过这三个方法来改变this apply(this, [args]) call(this, args) bind(this, args)()
      区别是apply传参数是一个数组，bind需要再次调用

    4.new绑定 this用在了构造函数中 指向new出来的对象
      function foo(a) { 
          this.a = a;
      }
      var a = 2;
      var bar1 = new foo(3);
      console.log(bar1.a); // 3
      var bar2 = new foo(4);
      console.log(bar2.a); // 4

2、es6箭头函数中的this和普通函数中的this
  普通函数的this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this指向的是window；当函数被作为某个对象的方法调用时，this就等于那个对象。
  箭头函数的this是在定义函数时绑定的，不是在执行过程中绑定的。简单的说，函数在定义时，this就继承了定义函数的对象。
  箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this，箭头函数不能通过apply call bind改变this
  箭头函数不能使用arguments 不能用于构造函数。

3、在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window。
