### 1、mac安装mongodb
    1.把解压好的mongodb文件夹放到/usr/local下面
    2.在根目录/下创建data/db文件夹 权限最大 chmod -R 777 data/
    3.在当前用户目录下创建.bash_profile文件
    4.在.bash_profile文件里新增 export PATH=${PATH}:/usr/local/mongodb/bin
    5.source .bash_profile 使配置生效
    6.mongod  mongo两个命令有用 就代表能使用mongodb数据库了(mongod开启服务，mongo使用客户端)

### 2、mac安装redis
    1.解压官网下载的redis包 tar -zxvf 包名
    2.移动到/usr/local下面
    3.sudo make 安装
    4.redis-server开启服务端 redis-cli开启客户端

### 3、homebrew
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
