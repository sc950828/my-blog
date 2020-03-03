1、购买了服务器需要开通访问的权限，不然外面是访问不了主机的。配置安全组
  https://help.aliyun.com/document_detail/25471.html?spm=a2c4e.11153987.0.0.4acf3927PZJeuk
  
2、ubuntu安装mongodb
  #setp 1. Import the public key used by the package management system.
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
  
  #step 2. Create a list file for MongoDB
  echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
  
  #step 3. Reload local package database
  sudo apt-get update
 
  #step 4. Install the latest stable version of MongoDB
  sudo apt-get install -y mongodb-org
  
  安装完成后可开启服务
    sudo service mongod stop　　#停止服务
    sudo service mongod start　　#启动服务
    sudo service mongod restart #重新启动服务
    sudo service mongod status #查看状态
   
  设置mongodb为开机自己启动
    sudo systemctl enable mongod
    
  连接mongodb
    mongo
  
  mongodb配置文件
    less /etc/mongod.conf
  
  mongo安装完成后，默认是只能在本机连接，在服务器外部是不能连接mongo的
    #切换至root用户
      sudo -i
    #修改mongo配置文件
      vim /etc/mongod.conf
    #把net下的127.0.0.1改为0.0.0.0
    #重启服务
      sudo service mongod restart
    
  如果有需要删除文件
    #停止mongodb服务
      sudo service mongod stop
    #删除包
      sudo apt-get purge mongodb-org*
    #删除数据文件及日志文件
      sudo rm -r /var/log/mongodb
      sudo rm -r /var/lib/mongodb

3、ubuntu安装nodejs和npm
  sudo apt-get install nodejs
  sudo apt install nodejs-legacy
  sudo apt install npm
  
  使用node -v npm -v查看版本
  
  如果版本过低全局安装n，然后使用n来更新node，n只能在linux上用，不支持windows。
  sudo npm install n -g
  sudo n stable
    
4、ubuntu安装ngnix
  sudo apt-get install nginx
  命令
    ngnix -s stop
    ngnix -s reopen
    ngnix -s reload
    ngnix -t 配置文件是否正确
  
  出现错误nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)使用如下命令
    sudo nginx -c /etc/nginx/nginx.conf
    
  这种版本的nginx配置文件除了nginx.conf还有sites-enable文件夹里的default文件，默认的配置都在里面。
  
  跨域加上如下配置，就是前端请求路径中有/api会替换成http:localhost:5000/api
    location /api {
      proxy_pass http:localhost:5000/api;
    }
  
  刷新会出现404问题
    这是因为我们只配置了/,所以我们需要在location中加上 try_files $uri $uri/ /index.html;就是匹配不到的时候就去index.html.
    https://router.vuejs.org/zh/guide/essentials/history-mode.html

  匹配规则
    = 表示精确匹配。只有请求的url路径与后面的字符串完全相等时，才会命中（优先级最高）。
    ^~ 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找。
    ~ 表示该规则是使用正则定义的，区分大小写。
    ~* 表示该规则是使用正则定义的，不区分大小写。

5、ubuntu安装图形化界面
  sudo apt-get install ubuntu-desktop #安装桌面软件
  reboot #重启
  图形化界面和命令行界面的切换
  ctrl + alt + F1到F6 图形界面到命令行界面
  ctrl + alt + F7 命令行到图形化界面

6、安装git
  sudo apt-get install git

7、安装maven
  下载 https://maven.apache.org/download.cgi 下载linux里的apache-maven-3.6.3-bin.tar.gz
  解压 sudo tar -zxvf apache-maven-3.6.3-bin.tar.gz
  修改全局配置文件 sudo vim /etc/profile
  在profile文件最后加上
    export M2_HOME=解压后的路径/apache-maven-3.6.3
    export PATH=${M2_HOME}/bin:$PATH
  使修改的配置文件立即生效 source /etc/profile
  查看是否安装成功 mvn -v
