### 1、使用 new 操作符发生了什么？

创建一个空对象；
该空对象的原型指向构造函数（链接原型）：将构造函数的 prototype 赋值给对象的 **proto**属性；
绑定 this：将对象作为构造函数的 this 传进去，并执行该构造函数；
返回新对象：如果构造函数返回的是一个对象，则返回该对象；否则（若没有返回值或者返回基本类型），返回第一步中新创建的对象；

```js
// 模拟new
function myFactory() {
  // 创建一个空对象
  let obj = {};
  // 取出第一个参数 构造函数
  let Cons = [].shift.call(arguments);
  // 使空对象的__proto__指向构造函数的prototype
  obj.__proto__ = Cons.prototype;
  // 绑定 this：将对象作为构造函数的 this 传进去，并执行该构造函数；
  let result = Cons.apply(obj, arguments);

  // 这里用typeof result == 'object' 进行判断会有个问题：当构造函数返回 null 时，会有误差，因为 typeof null == 'object'
  // 应该是除了构造函数返回一个对象，其他的都返回新创建的对象
  return Object.prototype.toString.call(result) === "[object Object]"
    ? result
    : obj;
}

// 测试一下
function Angel(name, age) {
  this.strength = 60;
  this.age = age;
  return null;
}

var person = objFactory(Angel, "randy", "24");
console.log(person.name, person.habit); // undefined undefined
console.log(person.strength, person.age); // 60 "18"
```
