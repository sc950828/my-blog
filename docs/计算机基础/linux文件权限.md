### 拥有者 用户组 其他用户

Linux 的文件权限是和 用户与用户组 密切相关的一个概念，对于一个文件来说，用户可以分为三类：

1. 文件的 拥有者 - user
2. 文件的拥有者所在 用户组 的其他成员 - group
3. 除 拥有者 和 用户组 成员以外的其他用户 - others

文件权限是相对于这三类用户而言的，不同身份的用户可以具有不同的权限

### 文件属性

我们使用 ls -l 命令可以看到

drwxr-xr-x 5 root root 4096 Sep 7 19:52 shelltest1

我们可以把每一条信息分为 8 个部分

<table  cellpadding="2" cellspacing="0" border="1">
<thead>
<tr>
<th>文件类型</th>
<th>权限信息</th>
<th>连结数</th>
<th>拥有者</th>
<th>用户组</th>
<th>文件容量</th>
<th>修改日期</th>
<th>文件名</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>d</code></td>
<td><code>rwxr-xr-x</code></td>
<td><code>5</code></td>
<td><code>root</code></td>
<td><code>root</code></td>
<td><code>4096</code></td>
<td><code>Sep  7 19:52</code></td>
<td><code>shelltest1</code></td>
</tr>
</tbody>
</table>

### 文件类型

Linux 中文件可以分为 5 个类型， ls -l 输出的每条信息中的 第一个字符 就用于表示文件类型。

<table cellpadding="2" cellspacing="0" border="2">
<thead>
<tr>
<th>表示字符</th>
<th>文件类型</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>d</code></td>
<td>目录</td>
</tr>
<tr>
<td><code>-</code></td>
<td>文件</td>
</tr>
<tr>
<td><code>l</code></td>
<td>符号链接等</td>
</tr>
<tr>
<td><code>b</code></td>
<td>可供储存的接口设备</td>
</tr>
<tr>
<td><code>c</code></td>
<td>串行端口设备，如键盘、鼠标等</td>
</tr>
</tbody>
</table>

### 文件权限

linux 系统内有档案有三种身份 u:拥有者 g:群组 o:其他人

这些身份对于文档常用的有下面权限：

1. r：读权限，用户可以读取文档的内容，如用 cat，more 查看 权限值是 4
2. w：写权限，用户可以编辑文档 权限值大小是 2
3. x：该目录具有可以被系统执行的权限 权限制大小是 1

每个文件的 权限信息 由 9 个字符组成，分为三组，每组三个字符，分别对应 拥有者, 用户组, 其他人 拥有的权限。

```
drwxr-xr-x 5 root root 4096 Sep 7 19:52 shelltest1

例如这个文件的话
拥有者有读写执行的权限 rwx 权限值为7
拥有者所在用户组有读执行的权限 r-x 权限值为5
其他用户有读执行的权限 r-x 权限值为5
```

### 修改文件拥有者和所属用户组

命令 chown 和 chgrp 可以用于修改文件拥有者和所属用户组，使用方式也很简单：

```shell
# 修改文件拥有者
$ chown [-R] 账号名称 文件或目录
$ chown [-R] 账号名称:组名 文件或目录

# 修改文件所属用户组
$ chgrp [-R] 用户组名称 文件或目录
```

参数 -R 进行递归的持续变更，即连同次目录下的所有文件都变更。

### 修改文件权限

命令 chmod 用于修改文件的权限，并提供了两种修改文件权限的方式。

```shell
# 数字 第一个7代表拥有者 第二个代表组 字三个代表其他用户的权限
chmod [-R] 777 文件或目录
```

符号类型改变文件权限

符号类型改变文件权限需要遵循一定的语法规则，分别需要了解的有 身份表示符, 操作表示符 和 权限表示符.

身份表示符

<table cellpadding="2" cellspacing="0" border="2">
<thead>
<tr>
<th>表示符</th>
<th>代表的身份</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>u</code></td>
<td>文件的拥有者</td>
</tr>
<tr>
<td><code>g</code></td>
<td>文件的拥有者所在用户组</td>
</tr>
<tr>
<td><code>o</code></td>
<td>其他人</td>
</tr>
<tr>
<td><code>a</code></td>
<td>所有用户</td>
</tr>
</tbody>
</table>

操作表示符

<table cellpadding="2" cellspacing="0" border="2">

<thead>
<tr>
<th>表示符</th>
<th>代表的操作</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>+</code></td>
<td>添加权限</td>
</tr>
<tr>
<td><code>-</code></td>
<td>去除权限</td>
</tr>
<tr>
<td><code>=</code></td>
<td>设定权限</td>
</tr>
</tbody>
</table>

权限表示符

权限表示符 就是 r, w 和 x.分别代表读 写 执行的权限

```shell
# 比如说下面的这条指令让拥有者具有所有权限，而为用户组和其他人添加执行权限：
chmod u=rwx,go+x shelltest1
```
