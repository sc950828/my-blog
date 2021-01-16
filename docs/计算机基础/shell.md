## shell 文档

[菜鸟教程 shell 文档](https://www.runoob.com/linux/linux-shell.html)

## shell 基础

### shell 是什么

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务, Shell 脚本（shell script），是一种为 Shell 编写的脚本程序。我们经常说的 shell 通常都是指 shell 脚本。

### shell 种类

shell 种类众多

```shell
# 查看本机支持的shell
cat /etc/shells

# 我的mac支持如下
/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

1. BourneShell(sh)：是由 AT&T Bell 实验室的 Steven Bourne 为 AT&T 的 Unix 开发的，它是 Unix 的默认 Shell，也是其它 Shell 的开发基础。Bourne Shell 在编程方面相当优秀，但在处理与用户的交互方面不如其它几种 Shell。

2. BourneAgain Shell (即 bash)：是自由软件基金会(GNU)开发的一个 Shell，它是 Linux 系统中一个默认的 Shell。Bash 不但与 Bourne Shell 兼容，还继承了 C Shell、Korn Shell 等优点。bash 完全兼容 sh，也就是说，用 sh 写的脚本可以不加修改的在 bash 中执行。

3. zch：是 Linux 最大的 Shell 之一，由 Paul Falstad 完成，共有 84 个内部命令。如果只是一般的用途，没有必要安装这样的 Shell。

4. KornShell(ksh)：是 AT&T Bell 实验室的 David Korn 开发的，共有 42 条内部命令，它集合了 C Shell 和 Bourne Shell 的优点，并且与 Bourne Shell 向下完全兼容。Korn Shell 的效率很高，其命令交互界面和编程交互界面都很好。

5. CShell(csh)：是加州伯克利大学的 Bill Joy 为 BSD Unix 开发的，共有 52 个内部命令，与 sh 不同，它的语法与 C 语言很相似。它提供了 Bourne Shell 所不能处理的用户交互特征，如命令补全、命令别名、历史命令替换等。但是，C Shell 与 BourneShell 并不兼容。该 Shell 其实是指向/bin/tcsh 这样的一个 Shell，也就是说，csh 其实就是 tcsh。

### 查看目前使用的 shell

```shell
echo $SHELL
```

### 切换 shell

在 Linux 操作系统，“/bin/bash”是默认登录 shell，是在创建用户时分配的。使用 chsh 命令可以改变默认的 shell。

```shell
chsh <用户名> -s <新shell>

chsh linuxtechi -s /bin/sh
```

### #!

#! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

```shell
#!/bin/bash
echo "Hello World !"
```

### echo

echo 命令用于向窗口输出文本。

### shell 注释

```shell
# 这是一个单行注释
# 以 # 开头的行就是注释，会被解释器忽略。也称为单行注释

# 多行注释
:<<EOF
注释内容...
注释内容...
注释内容...
EOF

# EOF 也可以使用其他符号

:<<'
注释内容...
注释内容...
注释内容...
'

:<<!
注释内容...
注释内容...
注释内容...
!
```

### 运行 Shell 脚本有两种方法

```bash
# 作为可执行程序
./test.sh  #执行脚本

# 作为解释器参数
/bin/sh test.sh
/bin/zsh test.php
```

## Shell 变量

变量类型 运行 shell 时，会同时存在三种变量：

1. 局部变量 局部变量在脚本或命令中定义，仅在当前 shell 实例中有效，其他 shell 启动的程序不能访问局部变量。
2. 环境变量 所有的程序，包括 shell 启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候 shell 脚本也可以定义环境变量。
3. shell 变量 shell 变量是由 shell 程序设置的特殊变量。shell 变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了 shell 的正常运行

定义变量时，变量名不加美元符号`（$，PHP语言中变量需要）`

变量名和等号之间不能有空格

命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。

中间不能有空格，可以使用下划线`（_）`。

不能使用标点符号。

不能使用 bash 里的关键字（可用 help 命令查看保留关键字）。

```shell
your_name="runoob.com"
```

### 使用变量

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界

```
your_name="qinjx"
echo $your_name
echo ${your_name}
```

只读变量

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。

删除变量

使用 unset 命令可以删除变量。

变量被删除后不能再次使用。unset 命令不能删除只读变量。

```shell
unset variable_name
```

### Shell 字符串

字符串是 shell 编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。

区别

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
- 双引号里可以有变量,双引号里可以出现转义字符

获取字符串长度

```shell
string="abcd"
echo ${#string} #输出 4
```

提取子字符串

```shell
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo
```

### Shell 数组

bash 支持一维数组（不支持多维数组）

定义数组

```shell
array_name=(value0 value1 value2 value3)

# 还可以单独定义数组的各个分量： 可以不使用连续的下标，而且下标的范围没有限制。

array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```

读取数组

```shell
# 读取单个元素
${数组名[下标]}

# 使用 @ 或者 * 符号可以获取数组中的所有元素
echo ${array_name[*]}
echo ${array_name[@]}
```

获取数组长度

```shell
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

## 传递参数

我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：`$n`。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……

`$0` 代表文件名 包含路径

```shell
#!/bin/bash
# author:randy

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";

# 执行
./shell2.sh 1 2 3

# 输出
# 执行的文件名：./shell2.sh
# 第一个参数为：1
# 第二个参数为：2
# 第三个参数为：3
```

几个特殊字符用来处理参数

<table class="reference">
  <tbody>
    <tr>
      <th>参数处理</th>
      <th>说明</th>
    </tr>
    <tr>
      <td>$#</td>
      <td>传递到脚本的参数个数</td>
    </tr>
    <tr>
      <td>$*</td>
      <td>
        以一个单字符串显示所有向脚本传递的参数。<br />
        如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。
      </td>
    </tr>
    <tr>
      <td>$$</td>
      <td>脚本运行的当前进程ID号</td>
    </tr>
    <tr>
      <td>$!</td>
      <td>后台运行的最后一个进程的ID号</td>
    </tr>
    <tr>
      <td>$@</td>
      <td>
        与$*相同，但是使用时加引号，并在引号中返回每个参数。<br />
        如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。
      </td>
    </tr>
    <tr>
      <td>$-</td>
      <td>
        显示Shell使用的当前选项，与<a
          href="/linux/linux-comm-set.html"
          target="_blank"
          rel="noopener noreferrer"
          >set命令</a
        >功能相同。
      </td>
    </tr>
    <tr>
      <td>$?</td>
      <td>显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。</td>
    </tr>
  </tbody>
</table>

## Shell 基本运算符
