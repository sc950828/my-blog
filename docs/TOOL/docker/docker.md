1、什么是docker
  Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。
  Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
  容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

2、docker三个基本概念
  镜像（Image）：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
  容器（Container）：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
  仓库（Repository）：仓库可看着一个代码控制中心，用来保存镜像。

3、ubuntu安装docker
  由于apt官方库里的docker版本可能比较旧，所以先卸载可能存在的旧版本
    sudo apt-get remove docker docker-engine docker.io containerd runc
  更新apt
    sudo apt-get update
  安装以下包以使apt可以通过HTTPS使用存储库（repository）
    sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      software-properties-common
  添加Docker官方的GPG密钥
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  使用下面的命令来设置stable存储库
    sudo add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"
  再更新一下apt包索引
    sudo apt-get update
  安装
    sudo apt-get install docker-ce docker-ce-cli containerd.io

4、镜像部分
  1.查看本地镜像
    docker images

  2.下载镜像
    docker pull xxx
  
  3.查找镜像
    我们可以从 Docker Hub 网站来搜索镜像，Docker Hub 网址为： https://hub.docker.com/
    我们也可以使用 docker search 命令来搜索镜像。例如 docker search xxx
      NAME: 镜像仓库源的名称
      DESCRIPTION: 镜像的描述
      OFFICIAL: 是否 docker 官方发布
      stars: 类似 Github 里面的 star，表示点赞、喜欢的意思。
      AUTOMATED: 自动构建。
  
  4.删除镜像
    docker rmi xxx
  
  5.创建镜像
    当我们从 docker 镜像仓库中下载的镜像不能满足我们的需求时，我们可以通过以下两种方式对镜像进行更改。
      1、从已经创建的容器中更新镜像，并且提交这个镜像
      2、使用 Dockerfile 指令来创建一个新的镜像

5、容器部分
  1.查看容器
    docker ps 查看运行的容器
    docker ps -a 可以看到所有的容器

  2.运行容器
    docker run (-itd) xxx
    我们通过 docker 的两个参数 -i -t，让 docker 运行的容器实现"对话"的能力
      -t: 在新容器内指定一个伪终端或终端。
      -i: 允许你对容器内的标准输入 (STDIN) 进行交互。
    我们可以过 -d 指定容器的后台运行模式
    指定容器名 --name name 例如docker run -itd --name ubuntu-test ubuntu /bin/bash
    不是后台启动的容器我们启动的时候就会默认进去，如果加了参数-d就是后台启动，我们使用docker exec xxx 和 docker attach xxx进入容器
      docker exec xxx进入容器后再退出来，容器不会停止(推荐使用这种方法)
      docker attach xxx进入容器后再退出来，容器会停止

  3.退出容器
    我们可以通过运行 exit 命令或者使用 CTRL+D 来退出容器。

  4.停止容器
    docker stop id/name
  
  5. 启动容器
    docker start/restart id/name

  5.删除容器
    docker rm (-f) 容器id

6、容器连接
  1. 我们也可以使用 -P/-p 标识来指定容器端口绑定到主机端口
    -P :是容器内部端口随机映射到主机的高端口。
    -p : 是容器内部端口绑定到指定的主机端口。(-p 本机端口:容器端口) 还可以指定ip(-p ip:本机xxx:容器端口)
