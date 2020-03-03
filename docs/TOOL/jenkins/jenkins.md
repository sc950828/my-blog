1、安装
  1.第一种方法
    下载jenkins.war
    运行java -jar jenkins.war --httpPort=8080 (这种方式的劣势就是窗口不能关闭，不是服务的形式)
    访问http://localhost:8080
  2.第二种方法
    wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
    sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
    sudo apt-get update
    sudo apt-get install jenkins
    启动service jenkins start

2、配置java的maven jdk
  https://www.cnblogs.com/xiao987334176/p/11433636.html

3、项目配置
  1. 创建任务
  2. 配置git 添加远程仓库地址，配置登录名及密码及分支
  3. 配置脚本
