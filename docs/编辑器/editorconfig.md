### 1、 .editorconfig 文件

这里配置的代码规范规则优先级高于编辑器默认的代码格式化规则。如果需要使用 editorconfig 生效只有配置文件是不够的，还需要对应编辑器的插件，比如 vscode 需要下载 EditorConfig for VS Code 插件，配置才会生效

官网 http://editorconfig.org

### 2、常用属性配置

    1、root<boolean>
      是否是顶级配置文件，设置为true的时候才会停止搜索.editorconfig文件

    2、charset<"latin" | "utf-8" | "utf-8-bom" | "utf-16be" | "utf-16le">
      编码格式

    3、indent_style<"tab" | "space">
      缩进方式

    4、indent_size<number>
      缩进大小

    5、end_of_line<"lf" | "cr" | "crlf">
      换行符类型

    6、insert_final_newline<boolean>
      是否让文件以空行结束

    7、trim_trailing_whitespace<boolean>
      是否删除行尾空格

    8、max_line_length<number>
      最大行宽。

### 3、常用文件名匹配

    1、*
      匹配除/之外的任意字符

    2、**
      匹配任意字符串

    3、?
      匹配任意单个字符

    4、[name]
      匹配name字符

    5、[!name]
      不匹配name字符

    6、[s1,s2,s3]
      匹配给定的字符串

    7、[num1..num2]
      匹配num1到mun2直接的整数

### 4、基本配置

    #控制 .editorconfig 是否生效的字段
    root = true
    #对所有文件生效
    [*]
    #缩进风格：空格
    indent_style = space
    #缩进大小2
    indent_size = 2
    #换行符lf
    end_of_line = lf
    #字符集utf-8
    charset = utf-8
    #是否删除行尾的空格
    trim_trailing_whitespace = true
    #是否在文件的最后插入一个空行
    insert_final_newline = true

    #支队.md文件生效
    [*.md]
    trim_trailing_whitespace = false

    [Makefile]
    indent_style = tab
