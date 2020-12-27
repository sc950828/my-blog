### shell

#### shell 种类

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

#### echo

echo 命令用于向窗口输出文本。

#### 运行 Shell 脚本有两种方法

```bash
# 作为可执行程序
./test.sh  #执行脚本

# 作为解释器参数
/bin/sh test.sh
/bin/zsh test.php
```

#### Shell 变量

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

```bash
your_name="runoob.com"
```

#### 使用变量

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
