1、mac安装mongodb
  1.把解压好的mongodb文件夹放到/usr/local下面
  2.在根目录/下创建data/db文件夹 权限最大 chmod -R 777 data/
  3.在当前用户目录下创建.bash_profile文件
  4.在.bash_profile文件里新增 export PATH=${PATH}:/usr/local/mongodb/bin
  5.source .bash_profile 使配置生效
  6.mongod  mongo两个命令有用 就代表能使用mongodb数据库了(mongod开启服务，mongo使用客户端)

2、mac安装redis
  1.解压官网下载的redis包 tar -zxvf 包名
  2.移动到/usr/local下面
  3.sudo make 安装
  4.redis-server开启服务端 redis-cli开启客户端

3、homebrew
  Homebrew是一款Mac OS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。
  安装homebrew
    首先需要安装xcode-select
    然后执行 /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  更新homebrew
    brew update
  卸载homebrew
    cd `brew --prefix`
    rm -rf Cellar
    brew prune
    rm `git ls-files`
    rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
    rm -rf .git
    rm -rf ~/Library/Caches/Homebrew
  使用homebrew安装包
    brew install <packageName>
  使用homebrew卸载包
    brew uninstall <packageName>
  使用homebrew查看已安装的包
    brew list
  使用homebrew查看任意包信息
    brew info <packageName>
  查看homebrew的版本信息
    brew -v
  查看brew的帮助信息
    brew -h

4、xcode  xcode-select
  如果你不是一名 iOS 或 OS X 开发者，可以跳过安装 XCode 的过程，直接安装 Xcode command line tools 。(xcode-select)
  安装完成后，你将可以直接在 terminal 中使用主要的命令，比如：make, GCC, clang, perl, svn, git, size, strip, strings, libtool, cpp等等。

5、安装rvm
  curl -L https://get.rvm.io | bash -s stable

6、安装ruby
  rvm list known 查看已知的ruby版本
  rvm install 版本 安装指定版本的ruby

7、使用ruby
  查看已经安装的ruby rvm list
  使用指定版本的ruby rvm use ruby版本号
  设置默认版本的ruby ruby use ruby版本号 --default
  使用默认版本的ruby rvm use default

8、gemsets
  gemset 可以理解为是一个独立的虚拟 Gem 环境，每一个 gemset 都是相互独立的。gemset 是附加在特定的 ruby 版本上的
  rvm gemset list 查看所有的gemset
  rvm gemset create [gemset名（可以是多个）] 创建gemsets (创建新的gemset会把默认的gem包带过来)
  切换到指定gemset有两种方法
    rvm use ruby版本号@gemset名 例如rvm 2.6.3@rails5
    rvm gemset use gemset名 例如 rvm gemset use @rails5
