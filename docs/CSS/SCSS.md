### 1、全局安装sass 用来编译scss文件
  npm install sass -g

### 2、编译
    sass xx.scss xx.css
    压缩编译 sass -s/--style compressed xx.scss xx.css  编译成一行
    sass xx.scss xx.css --no-source-map 不生成xx.css.map文件
    sass --watch xx.scss xx.css 监听实时编译

### 3、变量
    使用$定义 
    定义 $color: red;
    引用 color: $color;

### 4、嵌套
  可以一层一层嵌套

### 5、混合 @mixin
    scss里面的混合必须用@mixin定义 @mixin xxx{}
    @mixin定义的样式不会被编译到css里面
    使用
      @include xx;

### 6、继承 @extend
    scss中使用已定义好的类可以使用@extend xx, 这样这两个类就形成了群组选择器。
    如果我们希望在没有地方引入的时候不编译到css里，可以定义类的时候使用%xx{} @extend %xx;继承。

### 7、@include和@extend的区别
    @include只能使用由@mixin定义的混合，不能使用类。
    @extend只能使用类或者由%xx定义的样式，不能使用由@mixin定义的混合。

### 8、插值语句#{}
    通过 #{} 插值语句可以在选择器或属性名中使用变量
      $color: color
      .class{#{$color}: red}

### 9、导入
  @import "xxx"

### 10、运算
    + - * /

### 11、引用父级选择器
  & 就等于父选择器

### 12、if
    @if xx {}
    @else if xx {}
    @else {}

### 13、for
    @for $i from 1 to 3 {} 不包括3 
    @for $i from 1 through 3 {} 包括3

### 14、each
    each用来循环数组
    .box2 {
      @each $i in width, height {
      #{$i}: 100px 
      }
    }

### 15、注释
    /* 这是块注释 */ 这个会在编译后的css里面
    // 这是行注释 这个不会出现在编译后的css里面

### 16、sass scss的区别是什么？
*  sass表示旧语法，scss表示新语法
*  scss文件的后缀是.scss sass文件的后缀是.sass
*  scss选择器的内容用大括号包裹，而sass采用缩进
*  scss用;分隔语句而sass用换行符
