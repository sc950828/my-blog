### 1、安装和编译
    npm install less -g
    lessc a.less b.css

### 2、变量
    定义 @key: value
    使用 常规使用是@key，但是变量当做选择器或者属性或者url时需要使用@{key}这种方式来使用
    变量是延迟加载的，不必在使用前声明。可以先使用再定义。

### 3、嵌套
    支持像div一样父子嵌套
    & 代表上级选择器

### 4、混合mixin
    就是代码的复用
    .card { //如果写成.card()则这个混合不会出现在css中，就是不会输出。只有带括号就不会出现在css中。
      background: #f6f6f6;
      -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
      box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
    }

    #wrap{
      .card;//等价于.card();
    }

    混合中的混合使用>或者空格或者不空格都行。例如.out>.inner或者.out .inner 或者.out.inner都能调用的到。

    调用mixin的时候在后面加上了!important,则这个mixin中所有的属性后都会加上!important。

    当mixin有参数时我们可以设置默认参数，还可以传自定义个数参数。传自定义参数的时候使用属性名指定当前传的是哪个属性的值。

    @arguments代表所有的参数

    mixin的参数还可以是动态的，定义mixin的时候使用...，这样我们传参数的时候可以想传几个就传几个。

    模式匹配 必须使用.mixin定义，根据传来的参数来匹配使用哪个mixin，使用@_匹配所有。

### 5、继承
    继承与混合最大的区别就是 &:extend 是同个选择器共用同一个声明
    /* Less */
    .animation{
        transition: all .3s ease-out;
        .hide{
          transform:scale(0);
        }
    }
    #main{
        &:extend(.animation);
    }
    #con{
        &:extend(.animation .hide);
    }

    /* 生成后的 CSS */
    .animation,#main{
      transition: all .3s ease-out;
    }
    .animation .hide , #con{
        transform:scale(0);
    }

### 6、if
  if(xxx, true执行, false执行)

### 7、boolean
  boolean(xxx) 返回true或false

### 8、range
    range(start, end, step) range(10px, 30px, 10)输出10px 20px 30px
    range(value) range(3)输出1 2 3

### 9、list
    lenght(@list) 返回某list或range的长度
    extract(index) 返回list某下标的元素，index从1开始
    each(@list, {xxx}) 循环list 在后面能通过@value获取到值。

### 10、math函数
    round(1.67); // returns `2`
    ceil(2.4);   // returns `3`
    floor(2.6);  // returns `2`
    如果你想将一个值转化为百分比，你可以使用percentage 函数:
    percentage(0.5); // returns `50%`

### 11、避免编译
  ~"xxx" 或者 ~'xxx'

### 12、注释
    /* 这是块注释 */ 这个会在编译后的css里面
    // 这是行注释 这个不会出现在编译后的css里面
