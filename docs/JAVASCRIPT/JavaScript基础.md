### 1、数据类型

- 基本数据类型 字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol。保存在栈中。
- 引用数据类型 对象(Object)、数组(Array)、函数(Function)。保存在堆中。通过使用在栈中保存对应的指针来获取堆中的值。
- 判断数据类型用 typeof
  - 判断基本数据类型的时候除了 typeof null 是 object 其他的都是正确的。
  - 判断基本数据类型的时候如果是通过构造函数创建的则是 object。比如 typeof new Number(1)则是 object。
  - typeof 引用数据类型除了 typeof function 是 function 其他的都是 object。

### 2、Object 对象常用方法

- Object.assign(target, source1, source2,...) 返回一个新对象 target 会受到影响 返回的对象等于新的 target 对象。

  - 该方法主要用于对象的合并，将源对象 source 的所有可枚举属性合并到目标对象 target 上,此方法只拷贝源对象的自身属性，不拷贝继承的属性。
  - Object.assign 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
  - 相同的 key 源对象会覆盖目标对象。
  - Object.assign 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
  - Object.assign 可以用来处理数组，但是会把数组视为对象。 Object.assign([1, 2, 3], [4, 5]) 输出[4, 5, 3]

- Object.create(**proto**,`[properties]`)

  - 创建一个新的对象，该方法将**proto**作为原型对象，并将`[properties]`作为新对象的属性。
  - 该方法创建的对象 初始的属性 value get set 是 undefined，enumerable writable configurable 都是 false。需要配置才能正常赋值。

- Object.defineProperty(obj,prop,descriptor)

  - 在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
  - 该方法创建的对象 初始的属性 value get set 是 undefined，enumerable writable configurable 都是 false。需要配置才能正常赋值。

- Object.defineProperties(obj, props)

  - 在一个对象上定义多个新属性，或者修改一个对象的现有属性， 并返回这个对象。
  - 该方法创建的对象 初始的属性 value get set 是 undefined，enumerable writable configurable 都是 false。需要配置才能正常赋值。

- Object.getOwnPropertyDescriptor(obj,prop)

  - 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）。
  - 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

- Object.getOwnPropertyDescriptors(obj)

  - 获取一个对象的所有自身属性的描述符。返回的是对象。

- Object.entries()

  - 返回一个给定对象自身可枚举属性的键值对数组，([[key, value], [key, value]])其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。

- Object.keys(obj)

  - 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致（两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

- Object.values()

  - 方法返回一个给定对象自己的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

- Object.is(val1, val2)

  - 判断两个值是否相同。
  - 如果下列任何一项成立，则两个值相同：
    - 两个值都是 undefined
    - 两个值都是 null
    - 两个值都是 true 或者都是 false
    - 两个值是由相同个数的字符按照相同的顺序组成的字符串
    - 两个值指向同一个对象
    - 两个值都是数字并且
      - 都是正零 +0
      - 都是负零 -0
      - 都是 NaN
      - 都是除零和 NaN 外的其它同一个数字

- Object.getPrototypeOf(obj)
  返回指定对象的原型（内部`[[Prototype]]`属性的值，即**proto**，而非对象的 prototype）。

- Object.setPrototypeOf(obj, prototype)
  设置对象的原型对象

- obj.hasOwnProperty(prop)
  判断对象自身属性中是否具有指定的属性。 不包括原型链上的属性
  obj.hasOwnProperty('name')

- obj1.isPrototypeOf(obj2)
  判断 obj1 是否存在于 obj2 的原型链上。 原型.isPrototypeOf(对象)

### 3、String

    创建Number有两种种方法
      var str = "xxx";或者var str = 'xxx'
      var str = new String("xxx");
    属性
      length 字符串长度
    方法
      String.fromCharCode(unicode)  将 Unicode 编码转为字符。

    str.charAt(index)  返回在指定位置的字符。下标从0开始。
    str.charCodeAt(index)  返回在指定的位置的字符的 Unicode 编码。
    str.concat(str2)  连接两个或更多字符串，并返回新的字符串。不会改变原始字符串。
    str.indexOf(str2)  返回某个指定的字符串值或字符在字符串中首次出现的位置。
    str.lastIndexOf(str2)  从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。
    str.includes(str2)  查找字符串中是否包含指定的子字符串或字符。
    str.match(reg)  查找找到一个或多个正则表达式的匹配。返回一个对象，没有匹配则返回null
    str.search(reg)  返回查找与正则表达式相匹配的值的第一个下标。
    str.replace(reg, newStr)  在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。返回新的字符串，不会改变原字符串。
    str.repeat(number)  复制字符串指定次数，并将它们连接在一起返回。返回新的字符串，不会改变原字符串。
    str.split(str2)  把字符串按指定字符串或者字符分割为字符串数组。
    str.startsWith(str2)  查看字符串是否以指定的子字符串或者字符开头。
    str.endsWith(str2)  查看字符串是否以指定的子字符串或者字符结尾。
    str.slice(start, end)  提取字符串的片断，不改变原字符串。不包括结束。
    str.substr(startIndex, length)  从起始索引号提取字符串中指定数目的字符。不会改变原字符串
    str.substring(startIndex, endIndex)  提取字符串中两个指定的索引号之间的字符。不会改变原字符串
    str.toLowerCase()  把字符串转换为小写。
    str.toUpperCase()  把字符串转换为大写。
    str.trim()  去除字符串两边的空白
    str.trimLeft()  去除左边空格
    str.trimRight()  去除右边空格
    valueOf()  返回某个字符串对象的原始值。
    toString() 返回一个字符串。

### 4、数组

    创建数组有三种方法
      var arr = [xx, xx];
      var arr = new Array(xx, xx, xx);
      var arr = new Array(length); arr[xx] = xx;
    属性
      length 数组长度
    常用方法
      Array.from(arr)  通过给定的对象中创建一个数组。 使用该方法能实现数组的深拷贝。
      Array.isArray(arr)  判断对象是否为数组。
      arr.concat(arr2)  连接两个或更多的数组，并返回结果。arr1.concat(arr2)不该变原数组。
      arr.copyWithin(指定位置插入, 复制开始index, 复制结束index 不包括结束下标)  从数组的指定位置拷贝元素到数组的另一个指定位置中。修改原数组,并不会改变数组长度。
      arr.entries()  返回数组的可迭代对象。循环出来是一个个的数组，每个数组里面是两个元素，一个键一个值。
      arr.keys()  返回数组的可迭代对象，包含原始数组的键(key)。只能遍历自身属性。
      arr.values()  返回数组的可迭代对象，包含原始数组的值(value)。
      arr.every((item, index, arr)=>{})  检测数值元素的每个元素是否都符合条件。都为true才返回true。
      arr.some((item, index, arr)=>{})  检测数组元素中是否有元素符合指定条件。有一个为true就返回true。
      arr.map((item, index, arr)=>{})  通过指定函数处理数组的每个元素，并返回处理后的数组。
      arr.filter((item, index, arr)=>{})  检测数值元素，并返回符合条件所有元素的数组。
      arr.forEach((item, index, arr)=>{})  数组每个元素都执行一次回调函数。 中断需要用到throw error。
      arr.reduce((defaultInitValue, currentValue, currentIndex, arr)=>{}, initValue)  将数组元素计算为一个值（从左到右）。
        不给initValue的时候defaultInitValue默认为数组的第一个值，currentValue为数组的第二个值，currentIndex为数组第二个值得下标， arr为数组本身
        给initValue的时候defaultInitValue为initValue的值，currentValue为数组的第一个值，currentIndex为数组第一个值得下标， arr为数组本身
      arr.reduceRight((defaultInitValue, currentValue, currentIndex, arr)=>{}, initValue)  将数组元素计算为一个值（从右到左）。
      arr.fill(xx, start, end)  使用一个固定值来填充数组。会改变原数组。start end可选。
      arr.find((item, index, arr)=>{})  返回符合传入测试（函数）条件的第一个数组元素。
      arr.findIndex((item, index, arr)=>{})  返回符合传入测试（函数）条件的数组第一个元素索引。
      arr.indexOf(xx)  搜索数组中的元素，并返回它所在的位置。没有返回-1
      arr.lastIndexOf(xx)  返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
      arr.includes(xx)  判断一个数组是否包含一个指定的值。
      arr.join(str)  把数组的所有元素放入根据指定字符/字符串连接起来形成一个字符串。
      arr.slice(start, end)  选取数组的的一部分，并返回一个新数组。不会改变原数组。
      arr.splice(开始删除元素的index,删除多少个,新增元素item1,...)  从数组中添加或删除元素。会修改原数组 返回被删除的数据组成的数组。
      arr.unshift(xx)  向数组的开头添加一个或更多元素，并返回新的长度。
      arr.push(xx)  向数组的末尾添加一个或更多元素，并返回新的长度。
      arr.shift()  删除并返回数组的第一个元素。
      arr.pop()  删除数组的最后一个元素并返回删除的元素。
      arr.reverse()  反转数组的元素顺序。
      arr.sort()  对数组的元素进行排序。
      arr.toString()  把数组转换为字符串，并返回结果。
      arr.valueOf()  返回数组对象的原始值。

### 5、Number

    创建Number有两种方法
      var num = value;
      var num = new Number(value); 如果一个参数值不能转换为一个数字将返回 NaN (非数字值)。
    方法
      Number.isFinite(x)  检测指定参数是否为无穷大。
      Number.isNaN(x)  判断是否不是一个数字 不是数字为true。
      Number.isInteger(): 用来判断给定的参数是否为整数。
      Number.isSafeInteger(): 判断传入的参数值是否是一个"安全整数"。安全整数范围为 -(2的53次方 - 1)到2的53次方 - 1之间的整数。

    num.toExponential()  把对象的值转换为指数计数法。
    num.toFixed(x)  把数字转换为字符串，结果的小数点后有指定位数的数字。会四舍五入。
    num.toPrecision(x)  把数字格式化为指定的长度。会四舍五入。
    num.toString()  把数字转换为字符串，使用指定的基数。
    num.valueOf()  返回一个 Number 对象的基本数字值。

### 6、Boolean

    创建Boolean有两种种方法
      var bool = true;
      var bool = new Boolean(true)
    方法
      toString() 把布尔值转换为字符串，并返回结果。
      valueOf() 返回 Boolean 对象的原始值。

### 7、Math

    Math.abs(x)  返回 x 的绝对值。
    Math.ceil(x)  对数进行上舍入。取整数 没有小数部分
    Math.floor(x)  对 x 进行下舍入。取整数 没有小数部分
    Math.max(x,y,z,...,n)  返回 x,y,z,...,n 中的最高值。
    Math.min(x,y,z,...,n)  返回 x,y,z,...,n中的最低值。
    Math.pow(x,y)  返回 x 的 y 次幂。
    Math.random()  返回 0 ~ 1 之间的随机数。
    Math.round(x)  截取整数部分，会四舍五入。
    Math.trunc(x) 截取整数部分，不会四舍五入。
    Math.sqrt(x)  返回数的平方根。

### 8、date

    创建Date的方法
      var d = new Date();
      var d = new Date(milliseconds);
      var d = new Date(dateString);
      var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    方法
      Date.now()  返回 1970 年 1 月 1 日至今的毫秒数。
      Date.parse(date字符串)  把指定date类型时间字符串变为毫秒数。
      Date.UTC(年,月,日,时,分,秒,毫秒)  把指定时间设为毫秒数。少8小时。

    date.getFullYear()  从 Date 对象以四位数字返回年份。
    date.getMonth()  从 Date 对象返回月份 (0 ~ 11)。小一个月。
    date.getDate()  从 Date 对象返回一个月中的某一天 (1 ~ 31)。
    date.getDay()  从 Date 对象返回一周中的某一天 0-6，星期天是0
    date.getHours()  返回 Date 对象的小时 (0 ~ 23)。
    date.getMinutes()  返回 Date 对象的分钟 (0 ~ 59)。
    date.getSeconds()  返回 Date 对象的秒数 (0 ~ 59)。
    date.getMilliseconds()  返回 Date 对象的毫秒(0 ~ 999)。
    date.getTime()  返回 1970 年 1 月 1 日至今的毫秒数。等于 +new Date()/Date.now()
    date.setFullYear()  设置 Date 对象中的年份（四位数字）。
    date.setMonth()  设置 Date 对象中月份 (0 ~ 11)。
    date.setDate()  设置 Date 对象中月的某一天 (1 ~ 31)。
    date.setHours()  设置 Date 对象中的小时 (0 ~ 23)。
    date.setMilliseconds()  设置 Date 对象中的毫秒 (0 ~ 999)。
    date.setMinutes()  设置 Date 对象中的分钟 (0 ~ 59)。
    date.setSeconds()  设置 Date 对象中的秒钟 (0 ~ 59)。
    date.setTime()  setTime() 方法以毫秒设置 Date 对象。

    date.toDateString()  返回时间对象的年月日
    date.toTimeString()  返回时间对象的时分秒
    date.toString()  返回时间对象的年月日时分秒
    date.toLocalDateString()  返回本地格式的日期 年/月/日
    date.toLocalTimeString()  返回本地格式的时间 上午时:分:秒
    date.toLocalString()  返回本地格式的年月日时分秒
    date.toUTCString()  返回时间对象世界时间，比北京东八区时间小8小时。
    date.toISOString()  使用 ISO 标准返回字符串的日期格式。
    date.toJSON()  以 JSON 数据格式返回日期字符串。与ISO格式返回的一样
    注意
      getUTCHours比getHours少8个小时其它的UTC时间与Date对象的时间是一样的。UTC属于世界时间比东八区北京时间小8。
      getMonth()会比现实小一个月，如果是自己通过setMonth()设置的则不会小。

### 9、Error

    抛出自定义异常 throw new Error(message)。
    Error：普通异常。通常与 throw 语句和 try／catch 语句一起使用。
    利用属性 name 可以声明或了解异常的类型，利用 message 属性可以设置和读取异常的详细信息。
    错误类型
      EvalError： 在不正确使用 eval（）方法时抛出。
      SyntaxError：抛出语法错误。
      RangeError：在数字超出合法范围时抛出。
      ReferenceError：在读取不存在的变量时抛出 。
      TypeError：当一个值的类型错误时抛出该异常。
      URLError：由 URL 的编码和解码方法抛出。

### 10、正则表达式

    创建有两种方法
      var patt=new RegExp("pattern", "modifiers"); 需要转义。比如\d要写成"\\d"
      或者更简单的方式:
      var patt=/pattern/modifiers; 使用这种方法创建的正则不需要转义\。比如\d直接写成 /\d/
    修饰符 modifiers
      i  执行对大小写不敏感的匹配。
      g  执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
      m  执行多行匹配。
    常用元字符
      \w  查找单词字符。 a-z、A-Z、0-9，以及下划线, 包含 _ (下划线) 字符。
      \W  查找非单词字符。
      \d  查找数字。 0-9
      \D  查找非数字字符。
      \s  查找空白字符。空格符 制表符 回车符 换行符 垂直换行符 换页符
      \S  查找非空白字符。
    匹配个数
      *  零个或多个
      +  一个或多个
      ？ 零个或一个
      {n, m} 至少n个至多m个
    方法
      exec  检索字符串中指定的值。返回找到的值，并确定其位置。返回对象，没有则返回null
      test  检索字符串中指定的值。返回 true 或 false。
      toString  返回正则表达式的字符串。返回/ /这种格式的正则。

### 11、全局属性和方法

    属性
      NaN 指示某个值不是数字值。
      Infinity 无穷大。
    方法
      encodeURI()  把字符串编码为URI，类似get请求，会把中文转义
      decodeURI()  把encodeURI的字符串解码。
      encodeURIComponent()  把字符串编码为URI，更严格 : \\这些都会转义。
      decodeURIComponent()  把encodeURIComponent的字符串解码。
      eval() 执行JavaScript 字符串，并把它作为脚本代码来执行。
      isFinite()检查某个值是否为有穷大的数。
      isNaN()  检查某个值是否不是数字。
      Number()  把对象的值转换为数字。其实类似new Number() 只是省略的new关键字。
      String()  把对象的值转换为字符串。
      Boolean() 把对象转换成布尔类型。
      parseFloat()  解析一个字符串并返回一个浮点数。
      parseInt()  解析一个字符串并返回一个整数。

### 12、浏览器对象 BOM

    window
      属性
        outerWidth 返回窗口的外部宽度，包含工具条与滚动条。
        outerHeight 返回窗口的外部高度，包含工具条与滚动条。
        innerWidth 返回窗口的文档显示区的宽度。可视区域宽度。
        innerHeight 返回窗口的文档显示区的高度。可视区域高度。
        pageXOffset 获取滚动条在x轴上滚动的距离。
        pageYOffset 获取滚动条在y轴上滚动的距离。
        screenX 获取浏览器左上角相对屏幕左上角x轴的距离。IE不支持。
        screenY 获取浏览器左上角相对屏幕左上角y轴的距离。IE不支持。
        screenLeft 获取浏览器左上角相对屏幕左上角x轴的距离。火狐不支持。
        screenTop 获取浏览器左上角相对屏幕左上角y轴的距离。火狐不支持。
      方法
        getComputedStyle(dom) 获取指定元素的样式。
        setTimeout(function, time, params...) 设置定时器 执行一次。
        clearTomeout(timeout) 清除定时器
        setInterval(function, time, params...) 设置循环定时器 无数次执行。
        clearInterval(interval) 清除循环定时器
        alert(message) 警告框。
        confirm(message) 确认框。点击确定返回true 点击取消返回false
        prompt(message, defaultValue) 输入框。
        open(URL,name,specs,replace) 新建一个窗口。
        myWindow.focus() 让指定窗口获取焦点。或者通过window调用把当前窗口获取焦点。
        myWindow.blur() 让指定窗口失去焦点。或者通过window调用把当前窗口失去焦点。
        myWindow.moveBy(x, y) 把指定窗口移动指定距离。或者通过window调用把当前窗口移动指定距离。
        myWindow.moveTo(x, y) 把指定窗口移动指定位置。或者通过window调用把当前窗口移动到指定位置。
        myWindow.scrollBy(x, y) 把指定窗口滚动条滚动指定距离。或者通过window调用把当前窗口滚动条滚动指定距离。
        myWindow.scrollTo(x, y) 把指定窗口滚动条滚动到指定位置。或者通过window调用把当前窗口滚动条滚动指定位置。
        myWindow.resizeBy(x, y) 把指定窗口增大或缩小指定大小。正数增大负数减小。或者通过window调用把当前窗口增大或缩小指定大小。
        myWindow.resizeTo(x, y) 把指定窗口变为指定大小。或者通过window调用把当前窗口变为指定大小。
        myWindow.close() 关闭指定窗口。或者通过window调用关闭当前窗口。
        window.atob() 解码一个 base-64 编码的字符串。
        window.btoa() 创建一个 base-64 编码的字符串。
    history
      方法
        back()  加载 history 列表中的前一个 URL
        forward()  加载 history 列表中的下一个 URL
        go(string/number)  加载 history 列表中的某个具体页面或者 0刷新 正数向前 负数向后。
      属性
        length  返回历史列表中的网址数
    location
      方法
        assign()  载入一个新的文档
        reload()  重新载入当前文档
        replace()  用新的文档替换当前文档
      属性
        href  返回完整的URL
        protocol  返回一个URL协议 https:
        host  返回一个URL的主机名和端口
        port  返回一个URL服务器使用的端口号
        hostname  返回URL的主机名 域名
        pathname  返回的URL路径名。 /xx/xx
        search  返回一个URL的查询部分 ?xx=xx
        hash  返回一个URL的锚部分 #xx
    screen
     属性
        height 屏幕总高度
        width 屏幕总宽度
        availHeight 返回屏幕的高度（不包括Windows任务栏）
        availWidth 返回屏幕的宽度（不包括Windows任务栏）
    navigator
      属性
        appCodeName 返回浏览器的代码名
        appName 返回浏览器名称
        appVersion 返回浏览器版本
        userAgent 返回由客户机发送服务器的user-agent 头部的值。可以使用该字段检测是什么浏览器
        platform 返回运行浏览器的操作系统平台
        cookieEnabled 返回指明浏览器中是否启用 cookie 的布尔值

### 13、DOM

    document
      属性
        document.documentElement 返回文档的根节点
        document.cookie 设置或返回与当前文档有关的所有 cookie。
        document.title 返回当前文档的标题。
        document.referrer 返回载入当前文档的文档的 URL。
      方法
        document.getElementsByClassName() 返回文档中所有指定类名的元素集合，作为 NodeList 对象。
        document.getElementById() 返回对拥有指定 id 的第一个对象的引用。
        document.getElementsByName() 返回带有指定名称的对象集合。
        document.getElementsByTagName() 返回带有指定标签名的对象集合。
        document.querySelector() 返回文档中匹配指定的CSS选择器的第一元素
        document.querySelectorAll() 返回文档中匹配的CSS选择器的所有元素节点列表。
        document.createAttribute() 创建一个属性节点
        document.createComment() createComment() 方法可创建注释节点。
        document.createDocumentFragment() 创建空的 DocumentFragment 对象，并返回此对象。
        document.createElement() 创建元素节点。
        document.createTextNode() 创建文本节点。
    元素
      属性
        element.style 设置或返回指定元素的样式
        element.title	设置或返回元素的title属性
        element.tagName	作为一个字符串返回某个元素的标记名（大写）
        element.attributes 返回指定元素的所有属性数组。
        element.firstChild 返回元素的第一个子元素 包括里面的所有内容。
        element.lastChild 返回的最后一个子节点
        element.parentNode 返回元素的父节点
        element.parentElement 返回元素的父元素
        element.previousSibling 返回指定元素前紧跟的一个元素。不可以跨父元素。
        element.previousElementSibling 返回指定元素之前的一个兄弟元素（相同节点树层中的上一个元素节点）。可以跨父元素。
        element.nextSibling 返回指定元素后紧跟的一个元素。不可以跨父元素。
        element.nextElementSibling 返回指定元素之后的下一个兄弟元素（相同节点树层中的下一个元素节点）。可以跨父元素。
        element.childNodes 返回元素的子节点的数组。所有的后代元素都有。
        element.children 返回元素的子元素集合。只有第一层子元素。
        element.className 返回元素的class字符串。
        element.classList 返回元素的class数组。
        element.id 返回元素的id。
        element.nodeName 返回元素的标签名（大写）。
        element.nodeType 返回元素的节点类型。元素节点返回1 属性节点返回2 文本节点返回3 文档根节点9
        element.nodeValue 返回元素的节点值。
        element.ownerDocument 返回元素的根元素（文档对象）document。
        element.clientWidth 在页面上返回内容的可视宽度（不包括边框、滚动条、外边距）。
        element.clientHeight 在页面上返回内容的可视高度（不包括边框、滚动条、外边距）。
        element.scrollWidth 返回元素的整个宽度（包括带滚动条的隐蔽的地方，不包括边框、外边距)
        element.scrollHeight 返回元素的整个高度（包括带滚动条的隐蔽的地方，不包括边框、外边距)
        element.offsetWidth 返回元素的宽度，包括边框和填充。元素占据空间的大小。(包括边框 不包括外边距)
        element.offsetHeight 返回元素的高度，包括边框和填充。元素占据空间的大小。(包括边框 不包括外边距)
        element.offsetLeft 返回元素在当前文档中距离文档左边的距离。固定不变。
        element.offsetTop 返回元素在当前文档中距离文档顶部的距离。固定不变。
        element.scrollLeft 返回元素自身在x轴上滚动的距离。前提是该元素有滚动条。
        element.scrollTop 返回元素自身在y轴上滚动的距离。前提是该元素有滚动条。
      方法
        element.addEventListener(event, function, useCapture)添加事件监听。event不需要on前缀，useCapture默认是fasle冒泡事件。
        element.removeEventListener(function)	移除由 addEventListener() 方法添加的事件监听。function要是同一个方法。
        element.appendChild(dom) 给指定元素添加子元素。
        element.removeChild(dom) 删除指定元素的一个子元素。
        element.replaceChild(newdom, olddom) 替换指定元素的一个子元素
        element.insertBefore(newdom, dom) 在指定元素内的指定子元素前添加一个新元素。
        element.hasChildNodes() 返回一个元素是否具有任何子元素。
        element.getAttribute(attr) 返回元素的指定属性
        element.setAttribute(attr, value) 设置元素的指定属性
        element.removeAttribute(attr) 删除指定元素的指定属性
        document.createAttribute("attr") 创建属性节点。
        element.setAttributeNode(属性节点) 给指定元素添加属性节点。
        element.getAttributeNode("attr") 返回指定元素的指定属性的属性节点。
        element.removeAttributeNode(属性节点) 删除指定元素的指定属性节点。
        element.hasAttribute(attr) 如果元素中存在指定的属性返回 true，否则返回false。
        element.hasAttributes() 如果元素有任何属性返回true，否则返回false。
        element.focus() 设置文档或元素获取焦点。
        document.hasFocus() 返回布尔值，检测文档是否获取焦点。元素不能使用该方法。
        element.innerHTML 设置或者返回元素的内容。包含html，会解析html。
        element.innerText 设置或者返回元素的内容。单纯的当做字符串处理。
        element.querySelector("选择器") 返回匹配指定 CSS 选择器元素的第一个子元素
        element.querySelectorAll("选择器") 返回匹配指定 CSS 选择器元素的所有子元素。返回数组。
        element.getElementsByTagName(tagName) 返回指定标签名的所有子元素集合。返回数组。没有通过id和name查找的方法。
        element.getElementsByClassName(className) 返回文档中所有指定类名的元素集合，作为 NodeList 对象。
    事件
      鼠标事件
        onclick  当用户点击某个对象时调用的事件句柄。
        oncontextmenu  在用户点击鼠标右键打开上下文菜单时触发。
        ondblclick  当用户双击某个对象时调用的事件句柄。鼠标左键连续两下。
        onmousedown  鼠标按钮被按下。
        onmouseup  鼠标按键被松开。
        onmousemove  鼠标被移动。
        onmouseenter  当鼠标指针移动到元素上时触发。不支持冒泡 。
        onmouseleave  当鼠标指针移出元素时触发。不支持冒泡 。
        onmouseover  鼠标移到某元素之上。支持冒泡。
        onmouseout  鼠标从某元素移开。支持冒泡。
      键盘事件
        onkeydown  某个键盘按键被按下。
        onkeypress  某个键盘按键被按下并松开。
        onkeyup  某个键盘按键被松开。
      框架对象事件
        onbeforeunload  该事件在即将离开页面（刷新或关闭）时触发
        onerror  在加载文档或图像时发生错误。
        onhashchange  该事件在当前 URL 的锚部分发生修改时触发。
        onload  页面完成加载。
        onunload  用户退出页面。
        onpageshow  该事件在用户访问页面时触发。
          为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用该事件对象的 persisted 属性来判断。
          如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 。
        onpagehide  该事件在用户离开当前网页跳转到另外一个页面时触发
        onresize  窗口或框架被重新调整大小。
        onscroll  当文档被滚动时发生的事件。
      表单事件
        onblur  元素失去焦点时触发 不支持冒泡。
        onfocus  元素获取焦点时触发 不支持冒泡。
        onfocusin  元素即将获取焦点时触发 支持冒泡。
        onfocusout  元素即将失去焦点时触发 支持冒泡。
        onchange  该事件在表单元素的内容改变时触发( <input>, <keygen>, <select>, 和 <textarea>)
        oninput  元素获取用户输入时触发
        onsubmit  表单提交时触发
        onreset  表单重置时触发
        onsearch  用户向搜索域输入文本时触发 ( <input="search">)
        onselect  用户选取文本时触发 ( <input> 和 <textarea>)
      剪贴板事件
        oncopy 该事件在用户拷贝元素内容时触发
        oncut 该事件在用户剪切元素内容时触发
        onpaste 该事件在用户粘贴元素内容时触发
