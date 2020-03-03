### 1、let const是什么？和var区别是什么？
  是什么
    let const是es6新增的两种定义变量的方式。
    使用const申明的变量。基本类型变量的值不可以变，引用类型不能重新赋值。
    使用let申请的变量值可以更改。
  区别
    var声明变量可以重复声明,而let const不能重复声明变量。
    var申明的变量或函数可以提升，即可以先使用变量然后再申明，而let const不行，必须先声明然后再使用。
    函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部并赋值为null。
    var 在全局作用域下声明变量会导致变量挂载在 window 上，而let const定义的变量不会。

### 2、模板字符串
  在模板字符串里面能使用变量。
  const foo = `this is a ${example}`;
 
### 3、箭头函数是什么？和普通函数有什么区别？
  是什么
    箭头函数是es6新增的定义函数的方式。
  区别
    箭头函数不能做构造函数。
    箭头函数的this是定义时确定的不是运行时确定的,等于包裹他的第一个普通函数的this。
    箭头函数更简洁，能解决this问题。
    箭头函数没有arguments变量。需要用展开表达式 ...args定义参数列表。
    箭头函数不能通过apply call bind改变this。
  例子
    function fn() {
      console.log('real', this)  // {a: 100} ，该作用域下的 this 的真实的值
      var arr = [1, 2, 3]
      // 普通 JS
      arr.map(function (item) {
        console.log('js', this)  // window 。普通函数，这里打印出来的是全局变量，令人费解
        return item + 1
      })
      // 箭头函数
      arr.map(item => {
        console.log('es6', this)  // {a: 100} 。箭头函数，这里打印的就是父作用域的 this
        return item + 1
      })
    }
    fn.call({a: 100})
 
### 4、默认参数
  function f(x, y = 7, z = 42) {
    return x + y + z
  }
  如果我们想要最后一个参数使用默认参数我们可以省略不传。
  当需要使用默认值的参数不是最后一个的时候我们需要显示指定为undefined f(1, undefined, 4) 算出来是12。
  当我们不用默认值的时候我们需要传null。

### 5、可变参数
  ...arr 参数数组。
  function f(...arr) {
    console.log(arr) //1,2,3
  }
  f(1, 2, 3)

### 6、解构赋值
  数组解构一一对应。
  对象解构key相同，不同使用newkey:key指定。

### 7、for of遍历
  可以break，得到的是值。而不像for in一样，得到的是数组的下标或对象的key。
 
### 8、promise async await
  promise有三种状态: fulfilled, rejected, pending
  promise的优点
    一旦状态改变，就不会再变，任何时候都可以得到这个结果
    可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
  promise的缺点
    无法取消 Promise
    当处于pending状态时，无法得知目前进展到哪一个阶段
  Promise的构造函数是同步执行的。then 是异步执行的。

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

### 10、新的数据类型symbol
  调用Symbol()返回的每个实例都是唯一的，因此当你比较两个Symbol实例的时候总是返回false
  1.可以用来做对象的key，但是使用Symbol()创建的对象的key通过Object.keys()或者for in 循环获取不到。
  2.可以用做常量的值，这样值就永远不会相同 const VAL = Symbol()

### 11、class
  class Name {
    constructor(x, y){
      this.x = x
      this.y = y
    }
    add () {
      return this.x + this.y
    }
  }

  继承使用extends关键字 注意子类构造函数中需要第一行需要显示调用父类构造函数super(x, y)
