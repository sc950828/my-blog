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

Shell 和其他编程语言一样，支持多种运算符，包括：

- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

原生 bash 不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

```shell
val=`expr 2 + 2`
echo "两数之和为 : $val"
```

### 算术运算符

乘号`(*)`前边必须加反斜杠`(\)`才能实现乘法运算；

<table class="reference">
  <tbody>
    <tr>
      <th>
        运算符
      </th>
      <th>
        说明
      </th>
      <th>
        举例
      </th>
    </tr>
    <tr>
      <td>
        +
      </td>
      <td>
        加法
      </td>
      <td>
        `expr $a + $b` 结果为&nbsp;30。
      </td>
    </tr>
    <tr>
      <td>
        -
      </td>
      <td>
        减法
      </td>
      <td>
        `expr $a - $b` 结果为 -10。
      </td>
    </tr>
    <tr>
      <td>
        *
      </td>
      <td>
        乘法
      </td>
      <td>
        `expr $a \* $b` 结果为 &nbsp;200。
      </td>
    </tr>
    <tr>
      <td>
        /
      </td>
      <td>
        除法
      </td>
      <td>
        `expr $b / $a` 结果为&nbsp;2。
      </td>
    </tr>
    <tr>
      <td>
        %
      </td>
      <td>
        取余
      </td>
      <td>
        `expr $b % $a` 结果为&nbsp;0。
      </td>
    </tr>
    <tr>
      <td>
        =
      </td>
      <td>
        赋值
      </td>
      <td>
        a=$b 将把变量 b 的值赋给 a。
      </td>
    </tr>
    <tr>
      <td>
        ==
      </td>
      <td>
        相等。用于比较两个数字，相同则返回 true。
      </td>
      <td>
        [ $a == $b ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        !=
      </td>
      <td>
        不相等。用于比较两个数字，不相同则返回 true。
      </td>
      <td>
        [ $a != $b ] 返回 true。
      </td>
    </tr>
  </tbody>
</table>

```shell
a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"

val=`expr $a - $b`
echo "a - b : $val"

val=`expr $a \* $b`
echo "a * b : $val"

val=`expr $b / $a`
echo "b / a : $val"

val=`expr $b % $a`
echo "b % a : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
```

### 关系运算符

<table class="reference">
  <tbody>
    <tr>
      <th>
        运算符
      </th>
      <th>
        说明
      </th>
      <th>
        举例
      </th>
    </tr>
    <tr>
      <td>
        -eq
      </td>
      <td>
        检测两个数是否相等，相等返回 true。
      </td>
      <td>
        [ $a -eq $b ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        -ne
      </td>
      <td>
        检测两个数是否不相等，不相等返回 true。
      </td>
      <td>
        [ $a -ne $b ] 返回 true。
      </td>
    </tr>
    <tr>
      <td>
        -gt
      </td>
      <td>
        检测左边的数是否大于右边的，如果是，则返回 true。
      </td>
      <td>
        [ $a -gt $b ] 返回 false。
      </td>
    </tr>
    <tr>
      <td>
        -lt
      </td>
      <td>
        检测左边的数是否小于右边的，如果是，则返回 true。
      </td>
      <td>
        [ $a -lt $b ] 返回 true。
      </td>
    </tr>
    <tr>
      <td>
        -ge
      </td>
      <td>
        检测左边的数是否大于等于右边的，如果是，则返回 true。
      </td>
      <td>
        [ $a -ge $b ] 返回 false。
      </td>
    </tr>
    <tr>
      <td>
        -le
      </td>
      <td>
        检测左边的数是否小于等于右边的，如果是，则返回 true。
      </td>
      <td>
        [ $a -le $b ] 返回 true。
      </td>
    </tr>
  </tbody>
</table>

```shell
a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
if [ $a -ne $b ]
then
   echo "$a -ne $b: a 不等于 b"
else
   echo "$a -ne $b : a 等于 b"
fi
if [ $a -gt $b ]
then
   echo "$a -gt $b: a 大于 b"
else
   echo "$a -gt $b: a 不大于 b"
fi
if [ $a -lt $b ]
then
   echo "$a -lt $b: a 小于 b"
else
   echo "$a -lt $b: a 不小于 b"
fi
if [ $a -ge $b ]
then
   echo "$a -ge $b: a 大于或等于 b"
else
   echo "$a -ge $b: a 小于 b"
fi
if [ $a -le $b ]
then
   echo "$a -le $b: a 小于或等于 b"
else
   echo "$a -le $b: a 大于 b"
fi
```

### 布尔运算符

<table class="reference">
  <tbody>
    <tr>
      <th>
        运算符
      </th>
      <th>
        说明
      </th>
      <th>
        举例
      </th>
    </tr>
    <tr>
      <td>
        !
      </td>
      <td>
        非运算，表达式为 true 则返回 false，否则返回 true。
      </td>
      <td>
        [ ! false ] 返回 true。
      </td>
    </tr>
    <tr>
      <td>
        -o
      </td>
      <td>
        或运算，有一个表达式为 true 则返回 true。
      </td>
      <td>
        [ $a -lt 20 -o $b -gt 100 ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -a
      </td>
      <td>
        与运算，两个表达式都为 true 才返回 true。
      </td>
      <td>
        [ $a -lt 20 -a $b -gt 100 ] 返回&nbsp;false。
      </td>
    </tr>
  </tbody>
</table>

```shell
a=10
b=20

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a == $b: a 等于 b"
fi
if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
   echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
if [ $a -lt 100 -o $b -gt 100 ]
then
   echo "$a 小于 100 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 100 或 $b 大于 100 : 返回 false"
fi
if [ $a -lt 5 -o $b -gt 100 ]
then
   echo "$a 小于 5 或 $b 大于 100 : 返回 true"
else
   echo "$a 小于 5 或 $b 大于 100 : 返回 false"
fi
```

### 逻辑运算符

<table class="reference">
  <tbody>
    <tr>
      <th>
        运算符
      </th>
      <th>
        说明
      </th>
      <th>
        举例
      </th>
    </tr>
    <tr>
      <td>
        &amp;&amp;
      </td>
      <td>
        逻辑的 AND
      </td>
      <td>
        [[ $a -lt 100 &amp;&amp; $b -gt 100 ]] 返回 false
      </td>
    </tr>
    <tr>
      <td>
        ||
      </td>
      <td>
        逻辑的 OR
      </td>
      <td>
        [[ $a -lt 100 || $b -gt 100 ]] 返回 true
      </td>
    </tr>
  </tbody>
</table>

```shell
a=10
b=20

if [[ $a -lt 100 && $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi

if [[ $a -lt 100 || $b -gt 100 ]]
then
   echo "返回 true"
else
   echo "返回 false"
fi
```

### 字符串运算符

<table class="reference">
  <tbody>
    <tr>
      <th>
        运算符
      </th>
      <th>
        说明
      </th>
      <th>
        举例
      </th>
    </tr>
    <tr>
      <td>
        =
      </td>
      <td>
        检测两个字符串是否相等，相等返回 true。
      </td>
      <td>
        [ $a = $b ] 返回 false。
      </td>
    </tr>
    <tr>
      <td>
        !=
      </td>
      <td>
        检测两个字符串是否相等，不相等返回 true。
      </td>
      <td>
        [ $a != $b ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -z
      </td>
      <td>
        检测字符串长度是否为0，为0返回 true。
      </td>
      <td>
        [ -z $a ] 返回 false。
      </td>
    </tr>
    <tr>
      <td>
        -n
      </td>
      <td>
        检测字符串长度是否不为 0，不为 0 返回 true。
      </td>
      <td>
        [ -n "$a" ] 返回 true。
      </td>
    </tr>
    <tr>
      <td>
        $
      </td>
      <td>
        检测字符串是否为空，不为空返回 true。
      </td>
      <td>
        [ $a ] 返回&nbsp;true。
      </td>
    </tr>
  </tbody>
</table>

```shell
a="abc"
b="efg"

if [ $a = $b ]
then
echo "$a = $b : a 等于 b"
else
echo "$a = $b: a 不等于 b"
fi
if [ $a != $b ]
then
echo "$a != $b : a 不等于 b"
else
echo "$a != $b: a 等于 b"
fi
if [ -z $a ]
then
echo "-z $a : 字符串长度为 0"
else
   echo "-z $a : 字符串长度不为 0"
fi
if [ -n "$a" ]
then
echo "-n $a : 字符串长度不为 0"
else
   echo "-n $a : 字符串长度为 0"
fi
if [ $a ]
then
echo "$a : 字符串不为空"
else
   echo "$a : 字符串为空"
fi
```

### 文件测试运算符

<table class="reference">
  <tbody>
    <tr>
      <th>
        操作符
      </th>
      <th>
        说明
      </th>
      <th>
        举例
      </th>
    </tr>
    <tr>
      <td>
        -b file
      </td>
      <td>
        检测文件是否是块设备文件，如果是，则返回 true。
      </td>
      <td>
        [ -b $file ] 返回 false。
      </td>
    </tr>
    <tr>
      <td>
        -c file
      </td>
      <td>
        检测文件是否是字符设备文件，如果是，则返回 true。
      </td>
      <td>
        [ -c $file ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        -d file
      </td>
      <td>
        检测文件是否是目录，如果是，则返回 true。
      </td>
      <td>
        [ -d $file ] 返回 false。
      </td>
    </tr>
    <tr>
      <td>
        -f file
      </td>
      <td>
        检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回
        true。
      </td>
      <td>
        [ -f $file ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -g file
      </td>
      <td>
        检测文件是否设置了 SGID 位，如果是，则返回 true。
      </td>
      <td>
        [ -g $file ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        -k file
      </td>
      <td>
        检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。
      </td>
      <td>
        [ -k $file ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        -p file
      </td>
      <td>
        检测文件是否是有名管道，如果是，则返回 true。
      </td>
      <td>
        [ -p $file ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        -u file
      </td>
      <td>
        检测文件是否设置了 SUID 位，如果是，则返回 true。
      </td>
      <td>
        [ -u $file ] 返回&nbsp;false。
      </td>
    </tr>
    <tr>
      <td>
        -r file
      </td>
      <td>
        检测文件是否可读，如果是，则返回 true。
      </td>
      <td>
        [ -r $file ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -w file
      </td>
      <td>
        检测文件是否可写，如果是，则返回 true。
      </td>
      <td>
        [ -w $file ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -x file
      </td>
      <td>
        检测文件是否可执行，如果是，则返回 true。
      </td>
      <td>
        [ -x $file ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -s file
      </td>
      <td>
        检测文件是否为空（文件大小是否大于0），不为空返回 true。
      </td>
      <td>
        [ -s $file ] 返回&nbsp;true。
      </td>
    </tr>
    <tr>
      <td>
        -e file
      </td>
      <td>
        检测文件（包括目录）是否存在，如果是，则返回 true。
      </td>
      <td>
        [ -e $file ] 返回&nbsp;true。
      </td>
    </tr>
  </tbody>
</table>

## Shell 流程控制

### if

注意：条件表达式要放在方括号之间，并且要有空格，例如: `[$a==$b]` 是错误的，必须写成 `[ $a == $b ]`。

```shell
if condition1
then
    command1
elif condition2
then
    command2
else
    commandN
fi

# 实例
a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

### for

```shell
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

# 写成一行
for var in item1 item2 ... itemN; do command1; command2… done;

# 实例
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

### while

```shell
while condition
do
    command
done

# 实例
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```

### until

until 循环执行一系列命令直至条件为 true 时停止。

```shell
until condition
do
    command
done

# 实例
a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

### case

```shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac

# 实例
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

### 跳出循环

break 和 continue 跟 js 里面一样

break 命令允许跳出所有循环（终止执行后面的所有循环）。

continue 命令与 break 命令类似，只有一点差别，它不会跳出所有循环，仅仅跳出当前循环。

## Shell 函数

### 普通函数

```shell
[ function ] funname [()]

{

    action;

    [return int;]

}

# 实例
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
```

### 带 return 的函数

```shell
funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```

### 传递参数

```shell
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
```

## Shell 文件包含

和其他语言一样，Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。

```shell
. filename   # 注意点号(.)和文件名中间有一空格

或

source filename

# 实例
#使用 . 号来引用test1.sh 文件
. ./test1.sh

# 或者使用以下包含文件代码
# source ./test1.sh
```
