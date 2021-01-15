## LESS 文档

[less 文档 1](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

[less 文档 2](http://lesscss.cn/functions/)

## LESS 知识点

### 安装和编译

```
安装
npm install less -g

编译
lessc a.less b.css
```

### 变量

定义 @key: value  
使用 常规使用是@key，但是变量当做选择器或者属性或者 url 时需要使用@{key}这种方式来使用  
变量是延迟加载的，不必在使用前声明。可以先使用再定义。

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

### 嵌套

支持像 div 一样父子嵌套  
& 代表上级选择器

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

### 混合 mixin

主要作用就是代码的复用

```less
// 定义
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

// 这种写法定义的混合不会编译在css里面
.bordered() {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

// 使用方式1
#menu a {
  color: #111;
  .bordered();
}

// 使用方式2
.post a {
  color: red;
  .bordered;
}
```

混合中的混合使用>或者空格或者不空格都行。例如.out>.inner 或者.out .inner 或者.out.inner 都能调用的到。

调用 mixin 的时候在后面加上了!important,则这个 mixin 中所有的属性后都会加上!important。

当 mixin 有参数时我们可以设置默认参数，还可以传自定义个数参数。传自定义参数的时候使用属性名指定当前传的是哪个属性的值。

@arguments 代表所有的参数

mixin 的参数还可以是动态的，定义 mixin 的时候使用...，这样我们传参数的时候可以想传几个就传几个。

模式匹配 必须使用.mixin 定义，根据传来的参数来匹配使用哪个 mixin，使用`@_`匹配所有。

### 继承

继承与混合最大的区别就是 &:extend() 是同个选择器共用同一个声明

```less
// less
.animation {
  transition: all 0.3s ease-out;
  .hide {
    transform: scale(0);
  }
}
#main {
  &:extend(.animation);
}
#con {
  &:extend(.animation .hide);
}

// 生成的css
.animation,
#main {
  transition: all 0.3s ease-out;
}
.animation .hide,
#con {
  transform: scale(0);
}
```

### 运算

算术运算符 `+、-、*、/` 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%

@color: #224488 / 2; //结果是 #112244
```

### if

if(xxx, true 执行, false 执行)

```less
// less
@some: foo;

div {
  margin: if((2 > 1), 0, 3px);
  color: if((iscolor(@some)), @some, black);
}

// 编译后的css
div {
  margin: 0;
  color: black;
}
```

### boolean

boolean(xxx) 返回 true 或 false

```less
// less
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);

div {
  background: @bg;
  color: if(@bg-light, black, white);
}

// 编译后的css
div {
  background: black;
  color: white;
}
```

### range

指定开始值 结束值 间隔 生成指定 list  
range(start, end, step)

```less
@list: range(10px, 30px, 10);
// 输出 10px 20px 30px
@list2: range(3);
// 输出 1 2 3
```

### list

```less
// 定义list
@list: "banana", "tomato", "potato", "peach";

// //返回某list或range的长度
@n: lenght(@list);

// extract(list, index) 返回list某下标的元素，index从1开始
@n: extract(@list, 3); // 输出 potato
```

### each

each(@list, {xxx}) 循环 list 在后面能通过@value 获取到值。

```less
each(@list1, {
  .cl-@{value} {
    color: value;
  }
})
```

### when 循环输出

```less
// less
@counter: 5;
// 循环函数
.xunhuan(@count) when(@count>0) {
  .item-@{count} {
    color: red;
  }
  // 递归调用自身
  .xunhuan(@count - 1);
}
// 使用循环
.xunhuan(@counter);

// 生成css
.item-1 {
  color: red;
}
.item-2 {
  color: red;
}
.item-3 {
  color: red;
}
.item-4 {
  color: red;
}
.item-5 {
  color: red;
}
```

### math 函数

```less
@n1: round(1.67); // returns `2`
@n2: ceil(2.4); // returns `3`
@n3: floor(2.6); // returns `2`
// 如果你想将一个值转化为百分比，你可以使用percentage 函数:
@n4: percentage(0.5); // returns `50%`
@n5: sqrt(25cm); //  return 5cm
@n6: min(3px, 42px, 1px, 16px); // 1px
@n7: max(3%, 42%, 1%, 16%); // 42%
```

### 避免编译/转义

转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 ~"anything" 或 ~'anything' 形式的内容都将按原样输出，

```less
// less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

// 编译后的css
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

### 导入

“导入”的工作方式和你预期的一样。你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉

```less
@import "library"; // library.less
@import "typo.css";
```

### 注释

```less
/* 这是块注释 这个会在编译后的css里面*/
// 这是行注释 这个不会出现在编译后的css里面
```

### 映射

从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。

```less
// less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}

// 编译后的css
.button {
  color: blue;
  border: 1px solid green;
}
```
