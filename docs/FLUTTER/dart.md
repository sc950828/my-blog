## Dart 文档

[Dart 中文文档](https://www.dartcn.com/guides/language/language-tour)

## Dart 简介

### Dart 是什么

Dart 是 Google 开发的计算机编程语言，可以用于 移动端、PC 端、WEB、服务器的开发，是全栈式编程语言。

Dart 早在 2011 年就发布了，现在 Dart 的最新版本是 2.3 。

### Dart 语言优势

1. Dart 中的所有东西都是对象，包括数字、函数等，它们都继承自 Object，并且对象的默认值都是 null（包括数字）。
2. Dart 既可以支持 JIT（动态编译），也可以支持 AOT（静态编译）。
3. Dart 是强类型语言，但是由于 Dart 可以推断类型，所以也可以支持动态类型，例如 var、dynamic。
4. Dart 有强大的异步编程能力。

## 变量

### 变量类型

int 整数

double 浮点数

num num 是数字类型，既可以表示整数，也可以表示浮点数，具体看赋的值

String 字符串

bool 布尔值

List `List<E>`E 表示 List 里的数据类型用中括号来赋值

Set `Set<E>`E 表示 Set 里的数据类型用大括号来赋值

Map `Map<K, V>`K 是 Key 的数据类型,V 是 Value 的数据类型

Runes 表示采用 UTF-32 的字符串，用于显示 Unicode，因为 Dart 字符串是 UTF-16，因此在 Dart 中表示 32 位的 Unicode 值需要 Runes 这个特殊语法。

### 申明变量

申明的变量未赋值的时候是 null。

使用 var 来声明变量，不需要特别指定变量的数据类型，因为 Dart 会自动推断其数据类型，所以可以使用 var 来定义任何的变量。

```dart
var content = 'Dart 语法'; // Declare and initialize a variable.
var switchOn = false;
var current = 0;
```

明确的数据类型

```dart
int name = 'randy'
```

使用 dynamic 定义变量，意思是数据类型是动态可变的，也可以定义任何变量，但是和 var 不同的是，var 一旦赋值后，就不能改变数据类型了

```dart
dynamic example = 'example';
example = 1; // 这个使用方法正确，因为 dynamic 的类型是动态可变的
```

Object Dart 里所有东西都是对象，是因为 Dart 的所有东西都继承自 Object，因此 Object 可以定义任何变量，而且赋值后，类型也可以更改。注意：请不要滥用 dynamic，一般情况下都可以用 Object 代替 dynamic。

```dart
Object index = 100;
index = 'string'; // 因为  'String' 也是 Object
```

### 常量

常量：final 和 const

注意

1. 使用 final 和 const 的时候可以把 var 省略
2. final 和 const 变量只能赋值一次，而且只能在声明的时候就赋值
3. const 是隐式的 final
4. 在使用 const 的时候，如果变量是类里的变量，必须加 static ，是全局变量时不需要加

```dart
import 'package:flutter/material.dart';

const demoConst = 'demo'; // 这里不用加 static
fina name = 'randy';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

    static const content = 'Dart 语法'; // 这里必须加 static
    ...
}
```

区别

const 是编译时常量，在编译的时候就初始化了，但是 final 变量是当类创建的时候才初始化。

### num

num1 ~/ num2 是取整除法

??= 赋值是该元素为 null 的时候再赋值，否则不赋值。

### String

插值使用"${name}" 或者 "$name"

## 条件表达式

param = params1 ?? param2 表示参数 1 为 null 就用第二个参数 否则就使用第一个参数

## 可选参数

1. 可选命名参数：使用 {} 包起来的参数是可选命名参数
2. 可选位置参数：使用 [] 包起来的参数是可选位置参数

注意 必选参数必须在可选参数的前面

## 类的构造方法

如果一个类要有多个构造方法的话需要使用类名.方法名(参数列表)定义。

```dart
<!-- 构造方法1 -->
Person(this.name, this.age);
new Person('randy', 24);
<!-- 构造方法2 这里的withName是随便定的 -->
Person.withName(this.name);
new Person.withName('demi');
```

私有构造方法 使用`类名._方法名(参数列表)`定义。

```dart
<!-- 这里的_intrenal是随便定义的名字 只要是私有的方法就行 就是私有构造方法 -->
Person._internal(this.name);
new Person._internal('randy');
```

工厂构造方法

工厂构造方法返回的是一个对象 可以进行特殊化处理

```dart
class Person {
    factory Person(String name) {
        return 对象;
    }
}
```

## 对象操作符

? 表示如果该对象不为空才会进行后续操作

```dart
Person p;
p?.name // 因为p是null 所已加了?后不会报错。
```

## 接口

dart 中的接口和类是统一的 类就是接口。

每个类都隐式的定义了一个包含所有实例成员的接口。

实现接口必须重写所有的属性和方法 如果是复用已有类的实现则使用继承

## Mixins

dart 中的 mixins 就是用来解决 dart 不能多继承的问题

dart 中使用 with 关键字使用 mixins

必须先继承 再使用 with 关键字启用 mixins

作为 mixins 的类不能有显示的构造方法

作为 mixins 的类只能继承 Object

```dart
class D extends A with B, C {}
```

## 枚举

使用关键字 enum 定义枚举

枚举的 index 从 0 开始

```dart
<!-- 定义 -->
enum Season {
    spring,
    summer,
    autumn,
    winter
}

<!-- 使用 -->
Season.spring

<!-- index等于0 -->
var currentSeason = Season.spring
print(currentSeason.index);
```
