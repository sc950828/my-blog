### 1、mac 安装 mongodb

    1.把解压好的mongodb文件夹放到/usr/local下面
    2.在根目录/下创建data/db文件夹 权限最大 chmod -R 777 data/
    3.在当前用户目录下创建.bash_profile文件
    4.在.bash_profile文件里新增 export PATH=${PATH}:/usr/local/mongodb/bin
    5.source .bash_profile 使配置生效
    6.mongod  mongo两个命令有用 就代表能使用mongodb数据库了(mongod开启服务，mongo使用客户端)

### 2、mac 安装 redis

    1.解压官网下载的redis包 tar -zxvf 包名
    2.移动到/usr/local下面
    3.sudo make 安装
    4.redis-server开启服务端 redis-cli开启客户端

### 3、homebrew

Homebrew 是一款 Mac OS 平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。

安装 homebrew

自动安装

```shell
# 下边的命令行时两个命令，首先下载install文件，然后用系统的ruby工具安装。
# 首先需要安装xcode-select 这个待验证
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 安装完成后输入brew -v 即可显示是否安装成功
```

手动安装

```shell
# 目录内包含空格
# 不要安装在/sw或者/opt/local目录下
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

卸载

```shell
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

常用命令

    更新homebrew
      brew update
    使用homebrew安装包
      brew install <packageName>
    使用homebrew卸载包
      brew uninstall <packageName>
    使用homebrew查看已安装的包
      brew list
    查找包
      brew search <packageName> 搜索本地和远程仓库的软件，已安装会显示绿色的勾
    使用homebrew查看任意包信息
      brew info <packageName>
    查看homebrew的版本信息
      brew -v
    查看brew的帮助信息
      brew -h
    检测已经过时的软件
      brew outdated
    升级所有已过时的软件，即列出的以过时软件
      brew upgrade
    升级指定的软件
      brew upgrade <formula>
    禁止指定软件升级
      brew pin <formula>
    解锁禁止升级
      brew unpin <formula>
    升级所有的软件包，包括未清理干净的旧版本的包
      brew upgrade --all
    列出需要清理的内容
      brew cleanup -n
    清理指定的软件过时包
      brew cleanup <formula>
    清理所有的过时软件
      brew cleanup
    卸载指定软件
      brew unistall <formula>
    彻底卸载指定软件，包括旧版本
      brew unistall <fromula> --force
    查看缓存目录
      brew --cache

### 4、mac 设置静态 ip

- 打开设置
- 选择网络
- 选择高级
- 选择 TCP/IP
- 使用 DHCP(手动设置地址)
- 填入你想要设置的 ip
- 点击保存 然后点击应用即可

### 5、常用软件

iTerm2

可以在官网(https://www.iterm2.com/)直接下载 iTerm2，也可以通过 Homebrew 直接下载 brew cask install iterm2

    几个我常用的快捷键：

    command + d ：垂直分屏；
    command + shift + d ：水平分屏；
    command + enter ：切换全屏；
    command + t ：新建标签；
    command + shift + 左右方向键 或 command + 1/2/3 ：切换标签；
    command + ; ：查看历史命令；
    control + u ：清除当前行；
    control + a/e ：跳转到行首/行尾；
    command + 左右方向键 ：按单词前移/后移；
    control + k ：删除到文本末尾；

滴答清单 事件管理 类似 todolist

Tencent Lemon Lite 清除电脑垃圾

XMind Zen 轻量版的思维导图工具

IINA 视频播放器

Xnip 截图 支持滚动截图

GIF Brewery 3 制作 gif 图
