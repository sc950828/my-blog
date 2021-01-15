## CSS 的选择器分类 5 类

```
基本选择器
  通配选择器 *
  标签选择器
  id选择器 #
  类选择器 .
组合选择器
  后代选择器 空格
  子选择器 >
  兄弟选择器 ~
  相邻选择器 +
  分组选择器 ,
属性选择器
伪类选择器
  动态伪类
  结构伪类
  否定伪类
  状态伪类
伪元素选择器
```

## 基本选择器

```
标签选择器
  div span

id选择器
  #id

类选择器
  .class

通配选择器
  *
```

## 组合选择器

```
后代选择器
  foo child 中间是空格

子元素选择器
  foo > child 只有是直接子元素才会被选中

兄弟选择器
  brother1 ~ brother2 选择brother1后面的所有brother2元素，(brother1和brother2具有相同的父元素，并且只能选择brother1后面的所有brother2元素)

相邻选择器
  brother1 + brother2 选择brother1后面紧跟着的brother2元素，中间不能间隔其他元素，不然选不到。(brother1和brother2具有相同的父元素，并且只能选择brother1后面的第一个brother2元素)

分组选择器
  group1, group2 选择符合条件的多个元素
```

## 属性选择器

```
E[att]选择具有att属性的E元素
E[att="val"]选择具有att属性且属性值等于val的E元素
E[att^="val"]选择具有att属性且属性值为以val开头的字符串的E元素
E[att$="val"]选择具有att属性且属性值为以val结尾的字符串的E元素
E[att~="val"]选择具有att属性且属性值其中一个等于val的E元素（包含只有一个值且该值等于val的情况）
E[att|="val"]选择具有att属性且属性值为val或以val字符开头的E元素
E[att*="val"]选择具有att属性且属性值为包含val的字符串的E元素
```

## 伪类选择器

```
动态伪类
  E:link  设置超链接a在未被访问前的样式
  E:visited  设置超链接a在其链接地址已被访问过时的样式
  E:hover  设置元素鼠标在其悬停时的样式
  E:active  设置元素在被用户激活（在鼠标点击与释放之间发生的事件）时的样式
  E:focus  设置元素在成为输入焦点（该元素的onfocus事件发生）时的样式。(一般应用于表单元素)
状态伪类
  E:checked  匹配用户界面上处于选中状态的元素E。(用于input type为radio与checkbox时)
  E:enabled  匹配用户界面上处于可用状态的元素E。(一般应用于表单元素)
  E:disabled  匹配用户界面上处于禁用状态的元素E。(一般应用于表单元素)
  E:invalid 验证未通过的，比如input的email，输入无效邮箱边框变红。或者设置了required属性但是没有值。
  E:read-only 设置了readonly的元素
  E:read-write 没设置readonly的元素
否定伪类
  E:not(s)  匹配不含有s选择符/标签的元素E。不需要引号。
结构伪类
  E:empty  匹配没有任何子元素（包括text节点）的元素E
  :root  匹配文档的根元素。在HTML中，根元素永远是body
  E:required 选择有"required"属性指定的元素属性
  E:optional 选择没有"required"的元素属性
  E:first-child  匹配第一个子元素E
  E:last-child  匹配最后一个子元素E。last-child 或者nth-last-child 要生效后面就不能再有元素。
  E:only-child  匹配自己是父元素唯一的子元素。E是子元素的选择器。
  E:nth-child(n)  匹配第n个子元素E，下标从1开始。 (even偶数 odd奇数)
  E:nth-last-child(n)  匹配倒数第n个子元素E。last-child 或者nth-last-child 要生效后面就不能再有元素
  E:first-of-type  匹配同类型中的第一个同级兄弟元素E
  E:last-of-type  匹配同类型中的最后一个同级兄弟元素E
  E:only-of-type  匹配同类型中的唯一的一个同级兄弟元素E
  E:nth-of-type(n)  匹配同类型中的第n个同级兄弟元素E
  E:nth-last-of-type(n)  匹配同类型中的倒数第n个同级兄弟元素E
```

## 伪元素选择器 css3 规定用双冒号::

```
E:before/E::before  在目标元素E的前面插入的内容。用来和content属性一起使用
E:after/E::after  在目标元素E的后面插入的内容。用来和content属性一起使用
E:first-letter/E::first-letter  设置元素内的第一个字符的样式
E:first-line/E::first-line  设置元素内的第一行的样式
E::placeholder  设置元素文字占位符的样式。(一般用于input输入框)
E::selection  设置元素被选择时的字体颜色和背景颜色
```

## 常见问题

### 伪类和伪元素区别是什么？

- 伪类和伪元素都是弥补 css 选择器的不足。
- 伪类 一个元素达到一个特定状态时，它可能得到一个伪类的样式。它是基于元素的。用单冒号:
- 伪元素 伪元素是对元素中的特定内容进行操作 它是基于元素内容的。css3 规定用双冒号::

### "nth-child"和"nth-of-type"的区别

- .box > p:nth-child(2)选择的是 box 下的 p 元素，并且 p 元素刚好是 box 的第二个子元素元素，如果 p 不是第二个子元素则选不到
- .box > p:nth-of-type(2)选择的始终是 box 下的第二个 p 元素，不管是不是第二个子元素

### CSS 权重都有哪些值？怎么计算权重？

- 元素的权重为元素所有的的选择器权重的和，相同权重后面的覆盖前面的。不会产生进位。
  - !important 10000 (覆盖所有)
  - 行内样式 1000 (一般也是能覆盖所有 除了用!important 定义的)
  - id 选择器 100
  - 类选择器 伪类选择器 属性选择器 10
  - 元素选择器 伪元素选择器 1
  - 其他选择器 0 子选择器> 兄弟选择器~ 相邻选择器+
