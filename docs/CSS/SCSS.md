## SCSS 文档

[scss 文档](https://www.sass.hk/docs/)

## SCSS 知识点

### 全局安装 sass 用来编译 scss 文件

```
npm install sass -g
```

### 编译

```
sass xx.scss xx.css
压缩编译 sass -s/--style compressed xx.scss xx.css 编译成一行
sass xx.scss xx.css --no-source-map 不生成xx.css.map文件
sass --watch xx.scss xx.css 监听实时编译
```

### 变量

```scss
// 使用$定义
$color: red; //定义
color: $color; //引用
```

### 嵌套

可以一层一层嵌套

### 混合 @mixin

scss 里面的混合必须用@mixin 定义 @mixin xxx{}  
@mixin 定义的样式不会被编译到 css 里面  
使用 @include xx;

```scss
// 定义
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

// 使用
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

### 继承 @extend

scss 中使用已定义好的类可以使用@extend xx 来继承, 这样这两个类就形成了群组选择器。  
如果我们希望在没有地方引入的时候不编译到 css 里，可以定义类的时候使用%xx{} @extend %xx;继承。

### @include 和@extend 的区别

1. @include 只能使用由@mixin 定义的混合，不能使用类。
2. @extend 只能使用类或者由%xx 定义的样式，不能使用由@mixin 定义的混合。

### 插值语句#{}

通过 #{} 插值语句可以在选择器或属性名中使用变量

```scss
$color: color;
.class {
  #{$color}: red;
}
```

### 导入

@import "xxx"

### 运算

所有数据类型均支持相等运算 == 或 !=，此外，每种数据类型也有其各自支持的运算方式  
SassScript 支持数字的加减乘除、取整等运算 `(+, -, *, /, %)`，如果必要会在不同单位间转换值。

```scss
p {
  font: 10px/8px; // Plain CSS, no division
  $width: 1000px;
  width: $width/2; // Uses a variable, does division
  width: round(1.5) / 2; // Uses a function, does division
  height: (500px/2); // Uses parentheses, does division
  margin-left: 5px + 8px/2px; // Uses +, does division
}
```

### 引用父级选择器

& 就等于父选择器

### if

```scss
@if xx {
} @else if xx {
} @else {
}
// 例如
@if $max == 1 {
  color: red;
} @else if $max == 2 {
  color: blue;
} @else {
  color: yellow;
}
```

### for

```scss
// 不包括3
@for $i from 1 to 3 {
}
// 包括3
@for $i from 1 through 3 {
}

// 例如
@for $j from 1 to 3 {
  .items-#{$j} {
    width: $j * 100px;
  }
}
@for $i from 1 through 3 {
  .item-#{$i} {
    width: $i * 100px;
  }
}
```

### each

each 用来循环

```scss
.box2 {
  @each $i in width, height {
    #{$i}: 100px;
  }
}
```

### 注释

```scss
/* 这是块注释 这个会在编译后的css里面 */
// 这是行注释 这个不会出现在编译后的css里面
```

## 常见问题

### sass scss 的区别是什么？

- sass 表示旧语法，scss 表示新语法
- scss 文件的后缀是.scss sass 文件的后缀是.sass
- scss 选择器的内容用大括号包裹，而 sass 采用缩进
- scss 用;分隔语句而 sass 用换行符
