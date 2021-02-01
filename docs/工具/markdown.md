## Markdown 文档

[Markdown 文档](https://www.markdown.xyz/getting-started/)

## Markdown 的各种语法

### 标题

# 一级标题

```markdown
# 一级标题
```

## 二级标题

```markdown
## 二级标题
```

### 三级标题

```markdown
### 三级标题
```

#### 四级标题

```markdown
#### 四级标题
```

##### 五级标题

```markdown
##### 五级标题
```

###### 六级标题

```markdown
###### 六级标题
```

### 段落

要创建段落，请使用空白行将一行或多行文本进行分隔。

```markdown
要创建段落，请使用空白行将一行或多行文本进行分隔。

要创建段落，请使用空白行将一行或多行文本进行分隔。
```

### 换行

在一行的末尾添加两个或多个空格，然后按回车键（return），  
即可创建一个换行

```markdown
在一行的末尾添加两个或多个空格，然后按回车键（return），  
即可创建一个换行
```

### 粗体

要**加粗**文本，请在单词或短语的前后各添加两个星号或下划线(推荐使用星号)。如需加粗一个单词或短语的中间部分用以表示强调的话，请在要加粗部分的两侧各添加两个星号。

```
**加粗**

__加粗__
```

### 斜体

要用*斜体*显示文本，请在单词或短语前后添加一个星号或下划线(推荐使用星号)。要斜体突出单词的中间部分，请在字母前后各添加一个星号，中间不要带空格。

```
*斜体*

_斜体_
```

### 粗体加斜体

```
使用三个星号就同时是***斜体加粗体***
```

### 块引用

要创建块引用，请在段落前添加一个 > 符号。

> Dorothy followed her through many of the beautiful rooms in her castle.
> Dorothy followed her through many of the beautiful rooms in her castle.

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
```

块引用可以包含多个段落。为段落之间的空白行各添加一个 > 符号。

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

块引用可以嵌套。在要嵌套的段落前添加一个 >> 符号。

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> > The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> > The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

块引用可以包含其他 Markdown 格式的元素。并非所有元素都可以使用，你需要进行实验以查看哪些元素有效。

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>   _Everything_ is going according to **plan**.
>
>   > hello

```markdown
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>   _Everything_ is going according to **plan**.
>
>   > hello
```

### 列表

要创建有序列表，请在每个列表项前添加数字并紧跟一个英文句点。数字不必按数学顺序排列，但是列表应当以数字 1 起始。缩进一个或多个列表项可创建嵌套列表。

1. First item
2. Second item
   1. Third item
      1. Fourth item
      2. Fifth item
   2. Sixth item

```markdown
1. First item
2. Second item
   1. Third item
      1. Fourth item
      2. Fifth item
   2. Sixth item
```

要创建无序列表，请在每个列表项前面添加破折号 `(-)`、星号 `(*)` 或加号 `(+)` 。缩进一个或多个列表项可创建嵌套列表。

- First item
- Second item
  - Third item
    - Fourth item

```
- First item
- Second item
  - Third item
    - Fourth item

* First item
* Second item

+ First item
+ Second item
```

要在保留列表连续性的同时在列表中添加另一种元素，请将该元素缩进四个空格或一个制表符

- This is the first list item.
- Here's the second list item.

  > A blockquote would look great below the second list item.

- And here's the third list item.

```markdown
- This is the first list item.
- Here's the second list item.

  > A blockquote would look great below the second list item.

- And here's the third list item.
```

### 代码

要将单词或短语表示为代码，请将其包裹在反引号 (`) 中。

```markdown
`lala`
```

### 代码块

代码块（Code blocks） 通常采用四个空格或一个制表符缩进。当它们被放在列表中时，请将它们缩进八个空格或两个制表符。或者使用围栏代码块即三个反引号```如需添加语法高亮，请在围栏代码块前的反引号旁指定所用的编程语言。

    <html>
      <head>
        <title>Test</title>
      </head>
    </html>

```markdown
    <html>
      <head>
        <title>Test</title>
      </head>
    </html>
```

### 分割线

要创建分隔线，请在单独一行上使用三个或多个星号 `(***)`、破折号 `(---)` 或下划线 `(___)` ，并且不能包含其他内容。推荐使用破折号 `(---)`

---

```
***

---

_________________
```

### 链接

要创建链接，请将链接文本括在方括号（例如 [百度]）中，后面紧跟着括在圆括号中的 URL（例如 (https://www.baidu.com) ）。

My favorite search engine is [百度](https://www.baidu.com).

```markdown
My favorite search engine is [百度](https://www.baidu.com).
```

你可以选择为链接添加标题（即 title 属性）。当用户将鼠标悬停在链接上时，将显示一个提示。要添加标题，请将其放在 URL 后面。

My favorite search engine is [百度](https://www.baidu.com "我最喜欢的哦").

```markdown
My favorite search engine is [百度](https://www.baidu.com "我最喜欢的哦").
```

如需 强调（emphasize） 某个链接, 请在方括号前及圆括号后添加星号。要将链接表示为 代码（code） ，请在方括号内添加反引号。

I love supporting the **[EFF](https://eff.org)**.  
This is the _[Markdown Guide](https://www.markdownguide.org)_.  
See the section on [`code`](#code).

```
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).
```

### 网址和电子邮件地址

要将 URL 或电子邮件地址快速转换为链接，请将其括在尖括号中。

<https://www.markdownguide.org>  
<fake@example.com>

```markdown
<https://www.markdownguide.org>  
<fake@example.com>
```

### 图片

要添加图片，首先请添加感叹号（!），然后紧跟着是方括号，方括号中可添加替代文本（alt text，即图片显示失败后显示此文本），最后跟着圆括号，圆括号中添加图片资源的路径或 URL。你可以选择在圆括号中的 URL 之后添加标题（即 title 属性）。

![我的头像](http://xiaosu72.oss-cn-shanghai.aliyuncs.com/randy.jpg "我的头像")

```markdown
![我的头像](http://xiaosu72.oss-cn-shanghai.aliyuncs.com/randy.jpg "我的头像")
```

### 转义字符

要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符 `(\)` 。

\* 如果没有开头的反斜杠字符的话，这一行将显示为无序列表。

```markdown
\* 如果没有开头的反斜杠字符的话，这一行将显示为无序列表。
```

### HTML 标签

大多 Markdown 应用程序允许你在 Markdown 格式文本中添加 HTML 标签。如果你喜欢某些 HTML 标签胜于 Markdown 语法的话，这将何有帮助。例如，某些人发现通过 HTML 标签添加图像更加容易。当你需要更改元素的属性时（例如为文本指定颜色或更改图像的宽度），使用 HTML 标签更方便些。

This **word** is bold. This <em>word</em> is italic.

```markdown
This **word** is bold. This <em>word</em> is italic.
```

<table>
  <tr>
    <th>head1</th>
    <th>head2</th>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
  </tr>
</table>

```markdown
<table>
  <tr>
    <th>head1</th>
    <th>head2</th>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
  </tr>
</table>
```

### 表格

如需添加表格，请使用三个或更多个连字符（---）来为每个列创建表头，并使用管道符（|）来分隔每个列。你还可以在表格的任意一侧添加管道符。

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |
| Paragraph | Text        |

通过在标题行中的连字符（hyphens）的左侧或右侧或两侧添加冒号（:），可以将对应列中的文本向左或向右或居中对齐。

| HEAD1 | HEAD2 | HEAD3 |
| :---- | :---: | ----: |
| 1     |   2   |     3 |

```markdown
| HEAD1 | HEAD2 | HEAD3 |
| :---- | :---: | ----: |
| 1     |   2   |     3 |
```

### 任务列表

任务列表（task lists）允许你创建带有复选框的项目列表。在支持任务列表的 Markdown 应用程序中，复选框将显示在内容旁边。要创建任务列表，请在任务列表项前面添加破折号（-）和中间带空格的方括号（[ ]）。要选中复选框，请在方括号中间添加一个 x ，即（[x]）。

我们这个项目的 markdown 好像暂时还不支持

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

```markdown
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

### 删除线

你可以贯穿单词的中心放一条横线从而删除这些单词。其效果看起来是这样的： like this。此功能允许你标记某些单词是错误的，不应该出现在文档中。在单词前面和后面分别放置两个波浪号（~~） 来表示删除这些单词。

我们这个项目的 markdown 好像暂时还不支持

```markdown
~~The world is flat.~~ We now know that the world is round.
```

### 表情符号

有两种方式可以将表情符号添加到 Markdown 文档中：将表情符号复制并粘贴到 Markdown 格式的文本中，或者键入 表情符号的简码（emoji shortcodes）。

在大多数情况下，你可以简单地从 [Emojipedia](https://emojipedia.org/) 等来源复制表情符号，然后将其粘贴到文档中。许多 Markdown 应用程序就会自动以 Markdown 格式的文本来显示表情符号。从 Markdown 应用程序导出的 HTML 和 PDF 文件也是可以显示表情符号的。

💔

某些 Markdown 应用程序允许你通过键入表情符号的简码来插入表情符号。简码以冒号开头和结尾，两个冒号中间是表情符号的名称。

Gone camping! :tent: Be back soon.

That is so funny! :joy:

```markdown
Gone camping! :tent: Be back soon.

That is so funny! :joy:
```

你可以使用这个 [表情符号简码列表](https://gist.github.com/rxaviers/7360908)，但请记住，表情符号的简码随着 Markdown 应用程序的不同而不同。有关详细信息，请参阅你所使用的 Markdown 应用程序的文档。
