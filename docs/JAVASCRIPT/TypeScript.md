### 1、typescript
  TypeScript是JavaScript的一个超集，主要提供了类型系统和对 ES6 的支持。
  优点
    TypeScript 增加了代码的可读性和可维护性
    类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
    可以在编译阶段就发现大部分错误，这总比在运行时候出错好
    增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
    即使 TypeScript 编译报错，也可以生成 JavaScript 文件

### 2、使用
  安装 npm install -g typescript
  编译 tsc xxx.ts
  监听并编译 tsc -w xxx.ts

### 3、数据类型 定义变量的时候指定变量的数据类型
  布尔类型 boolean
  数字 number
  字符串 string
  数组 number[] 或者 Array<number> 这里的number只是举个例子，可以有其他类型比如string any等
    let arr: number[]/Array<number> = [1, 2]
  object object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
  null undefined 用处不大
    let u: undefined = undefined;
    let n: null = null;
  元组 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
    let x: [string, number];
    x = ['hello', 10];
  联合类型 |
    let myFavoriteNumber: string | number
    当TypeScript不确定一个变量类型的时候可以使用联合类型。但是我们只能访问此联合类型的所有类型里共有的属性或方法
  枚举 enum类型是对JavaScript标准数据类型的一个补充
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green; //返回的是下标 类似数组下标从0开始
  any 我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量。变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。
  void 申明变量或函数。当一个函数没有返回值时，你可以申明类型为void。当变量申明为void的时候只能为它赋予undefined和null
  never never类型表示的是那些永不存在的值的类型。用得少(死循环或者抛出异常)
  类型断言 你会比TypeScript更了解某个值的详细信息。告诉编译器是什么类型. 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。TypeScript会假设你，程序员，已经进行了必须的检查。
    两种表示法 尖括号<>或者as。当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。
      let someValue: any = "this is a string";
      let strLength: number = (<string>someValue).length; //<>
      let strLength: number = (someValue as string).length; //as

### 4、变量申明
  let
    当用let声明一个变量，它使用的是词法作用域或块作用域。块作用域变量在包含它们的块或for循环之外是不能访问的
    拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写
    同一作用域内不能重复申明同一变量
  const
    与let类似，但是定义基本变量值不能改变，定义引用变量地址不能改变
  解构数组
    let input = [1, 2];
    //变量未定义好 需要使用let
    let [first, second] = input;
    //变量已定义
    [first, second] = input
  对象解构
    const user = {name: 'randy', age: 24}
    //变量未定义
    let {name, age} = user
    //变量已定义
    let name, age
    ({name, age} = user) 注意这里需要加上(),不然会当做语句块
  对象多层解构
    const book = {bookname: 'javascript', body: {price: 200, count: 100}}
    let {bookname, body, body: {price, count}} = book
    console.log(bookname, body, count) // 输出javascript {price: 200, count: 100} 100
  对象解构重命名
    const book = {bookname: 'es6', price: 50}
    let {bookname: bookname1, price: price1} = book
    console.log(bookname1, price1)
  默认值
    function say(name: string = 'randy', age: number = 24){
      console.log(`${name}的年龄是${age}`)
    }
    say() //randy的年龄是24  不传都是用默认
    say('demi') //demi的年龄是24  只传第一个默认使用第二个
    say(undefined, 20) //randy的年龄是20 只传第二个 第一个用默认参数需要制定其值为undefined
    say(null, 25) //null的年龄是25 只传第二个 第一个不使用默认参数 需要指定其值为null
  可选参数 用?
    const add(a: number, b: number, c?: number): number => a+b
  不确定参数
    const add(initDate: number, ...nums: number[]): number = xxx

### 5、接口 interface 使用implements实现接口。 使用extends继承接口，可以多继承。
  接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。主要用于约束对象、函数、类的结构。
  interface LabelledValue {
    label: string;
    color?: string; //可选属性
    readyonly x: string; //只读属性
    [propName:string]: any //任意属性。使用 [propName: string] 定义了任意属性取 string 类型的值,值类型是任何值。
  }
  接口可以限制哪些属性？
    可选属性 只读属性
  接口类型有哪些?
    对象接口类型 函数接口类型 索引类型 混合类型
  类实现接口必须实现接口里面的所有方法
  接口可以继承接口并且可以多继承，类实现接口可以多实现

### 6、类 class 使用extends实现继承，使用implements实现接口。可以实现多个接口
  class Greeter {
    public greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    private greet() {
        return "Hello, " + this.greeting;
    }
  }

  let greeter = new Greeter("world");

### 7、泛型
  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
  function createArray<T>(length: number, value: T): Array<T> { //T就是泛型
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
  }

  createArray<string>(3, 'x'); // ['x', 'x', 'x'] //在使用的时候使用<string>指定具体的类型
  泛型不能用于类的静态成员 

8、访问修饰符
  public 默认
  protected 子类访问
  private 私有 private的变量在外面如果需要访问 就需要提供get set方法。

### 9、类型别名 type
  type name = string 给string类型定义别名
  type user = {name: string, age: number}; const me: user = {name: 'randy', age: 24}

### 10、非空检查 !
  我们可以通过!来进行非空的检查
  let str: string = `yayxs`;
  str!.substring(0, 1)

### 11、ts中的函数与普通函数的区别
  支持约束参数类型 支持可选参数 支持重载 支持函数返回值类型定义

### 12、抽象类与多态
  什么是抽象类？
    抽象类通常作为基类，将多个事物中的共性抽离，方便其他派生类继承。
  抽象类有什么特点？
    只能被继承，不能被实例化。 只能单继承
  如何创建抽象类？
    抽象类使用abstract关键字定义抽象类与抽象方法。
  什么是多态？
    在父类中定义，在子类中可以有不同的实现，此为多态。
