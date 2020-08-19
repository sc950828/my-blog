### 1、什么是 docker

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

### 2、docker 三个基本概念

镜像（Image）：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。

容器（Container）：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

仓库（Repository）：仓库可看着一个代码控制中心，用来保存镜像。

### 3、镜像部分

镜像下载慢，我们可以修改为阿里镜像。

1. 进入阿里云https://cr.console.aliyun.com
2. 进入镜像加速器 tab，选择我们的镜像专属加速链接
3. 在 docker desktop for mac 中配置。在任务栏点击 Docker Desktop 应用图标 -> Perferences，在左侧导航菜单选择 Docker Engine，在右侧输入栏编辑 json 文件。将https://re49e07y.mirror.aliyuncs.com 加到"registry-mirrors"的数组里，点击 Apply & Restart 按钮，等待 Docker 重启并应用配置的镜像加速器。

常用命令

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

    4.删除镜像 参数是镜像id或者时镜像名 镜像名由仓库:tag组成
      docker rmi xxx

    5.创建镜像
      当我们从 docker 镜像仓库中下载的镜像不能满足我们的需求时，我们可以通过以下两种方式对镜像进行更改。
        1、从已经创建的容器中更新镜像，并且提交这个镜像
        2、使用 Dockerfile 指令来创建一个新的镜像

### 4、容器部分

容器包含 Created、Running、Paused、Stopped、Deleted 这五种状态。

常用命令

    1.查看容器
      docker ps 查看运行的容器
      docker ps -a 可以看到所有状态的容器

    2.创建容器 创建成功会输出容器id
      docker create imageName
      docker create --name myName imageName 根据镜像创建指定名字的容器

    3. 启动容器
      docker start/restart id/name

    4.创建并启动容器 是docker create和start的结合进一步提高工作效率。
      docker run (-itd) xxx
      我们通过 docker 的两个参数 -i -t，让 docker 运行的容器实现"对话"的能力
        -t: 在新容器内指定一个伪终端或终端。
        -i: 允许你对容器内的标准输入 (STDIN) 进行交互。
      中端的选择 由于 bash 的功能要比 sh 丰富，所以在能够使用 bash 的容器里，我们优先选择它作为控制台程序。
      我们可以过 -d (--detach)指定容器的后台运行模式
      指定容器名 --name name 例如docker run -itd --name ubuntu-test ubuntu /bin/bash

    5.进入容器
      不是后台启动的容器我们启动的时候就会默认进去，如果加了参数-d就是后台启动。
      docker exec -it xxx
        docker exec -it xxx进入容器后再退出来，容器不会停止(推荐使用这种方法)
      docker attach xxx进入容器
        docker attach xxx进入容器后再退出来，容器会停止

    5.退出容器
      我们可以通过运行 exit 命令或者使用 CTRL+D 来退出容器。

    6.停止容器
      docker stop id/name

    7.删除容器
      docker rm (-f) 容器id，如果容器还在运行可以加上-f参数强制删除

### 5、容器网络

在 Docker 网络中，有三个比较核心的概念，也就是：沙盒 ( Sandbox )、网络 ( Network )、端点 ( Endpoint )。这三者形成了 Docker 网络的核心模型，也就是容器网络模型 ( Container Network Model )。

沙盒提供了容器的虚拟网络栈，也就是之前所提到的端口套接字、IP 路由表、防火墙等的内容。其实现隔离了容器网络与宿主机网络，形成了完全独立的容器网络环境。

网络可以理解为 Docker 内部的虚拟子网，网络内的参与者相互可见并能够进行通讯。Docker 的这种虚拟网络也是于宿主机网络存在隔离关系的，其目的主要是形成容器间的安全通讯环境。

端点是位于容器或网络隔离墙之上的洞，其主要目的是形成一个可以控制的突破封闭的网络环境的出入口。当容器的端点与网络的端点形成配对后，就如同在这两者之间搭建了桥梁，便能够进行数据传输了。

常用命令

sudo docker network create -d bridge networkName

通过 -d 选项我们可以为新的网络指定驱动的类型，其值可以是刚才我们所提及的 bridge、host、overlay、maclan、none，也可以是其他网络驱动插件所定义的类型。这里我们使用的是 Bridge Driver ( 当我们不指定网络驱动时，Docker 也会默认采用 Bridge Driver 作为网络驱动 )。

通过 docker network ls 或是 docker network list 可以查看 Docker 中已经存在的网络。

之后在我们创建容器时，可以通过 --network 来指定容器所加入的网络，一旦这个参数被指定，容器便不会默认加入到 bridge 这个网络中了 ( 但是仍然可以通过 --network bridge 让其加入 )。

### 6、端口映射

- 1. 我们也可以使用 -P/-p 标识来指定容器端口绑定到主机端口
  - -P : 是容器内部端口随机映射到主机的高端口。
  - -p : 是容器内部端口绑定到指定的主机端口。(-p 本机端口:容器端口) 还可以指定 ip(-p ip:本机端口:容器端口)

### 7、文件挂载

基于底层存储实现，Docker 提供了三种适用于不同场景的文件系统挂载方式：Bind Mount、Volume 和 Tmpfs Mount。

Bind Mount 能够直接将宿主操作系统中的目录和文件挂载到容器内的文件系统中，通过指定容器外的路径和容器内的路径，就可以形成挂载映射关系，在容器内外对文件的读写，都是相互可见的。

Volume 也是从宿主操作系统中挂载目录到容器内，只不过这个挂载的目录由 Docker 进行管理，我们只需要指定容器内的目录，不需要关心具体挂载到了宿主操作系统中的哪里。

Tmpfs Mount 支持挂载系统内存中的一部分到容器的文件系统里，不过由于内存和容器的特征，它的存储并不是持久的，其中的内容会随着容器的停止而消失。

挂载文件到容器

要将宿主操作系统中的目录挂载到容器之后，我们可以在容器创建的时候通过传递 -v 或 --volume 选项来指定内外挂载的对应目录或文件。

```shell
# 我们能够指定目录进行挂载，也能够指定具体的文件来挂载
# 定义目录时必须使用绝对路径，不能使用相对路径。
# -v <host-path>:<container-path>
$ sudo docker run -d --name nginx -v /webapp/html:/usr/share/nginx/html nginx:1.12

# 通过只读方式挂载的目录和文件，只能被容器中的程序读取，但不接受容器中程序修改它们的请求。
# 在挂载选项 -v 后再接上 :ro 就可以只读挂载了
$ sudo docker run -d --name nginx -v /webapp/html:/usr/share/nginx/html:ro nginx:1.12
```

挂载临时文件目录

与挂载宿主操作系统目录或文件不同，挂载临时文件目录要通过 --tmpfs 这个选项来完成。由于内存的具体位置不需要我们来指定，这个选项里我们只需要传递挂载到容器内的目录即可。

```shell
$ sudo docker run -d --name webapp --tmpfs /webapp/cache webapp:latest
```

使用数据卷

除了与其他虚拟机工具近似的宿主操作系统目录挂载的功能外，Docker 还创造了数据卷 ( Volume ) 这个概念。数据卷的本质其实依然是宿主操作系统上的一个目录，只不过这个目录存放在 Docker 内部，接受 Docker 的管理。

在使用数据卷进行挂载时，我们不需要知道数据具体存储在了宿主操作系统的何处，只需要给定容器中的哪个目录会被挂载即可。

```shell
$ sudo docker run -d --name webapp -v /webapp/storage webapp:latest
```

删除数据卷

```shell
$ sudo docker volume rm name
```

### 保存和共享镜像

将容器修改的内容保存为镜像的命令是 docker commit 容器名，我们还可以像通过 Git 等代码仓库软件提交代码一样，我们还能在提交容器更改的时候给出一个提交信息，方便以后查询。

```shell
docker commit webapp
docker commit -m 'tetst' webapp
```

通过上面创建出来的镜像是没有名字和仓库的，给镜像命名使用 docker tag

```shell
# 镜像id 仓库:tag 注意仓库名必须全小写
$ sudo docker tag 0bc42f7ff218 mynginx:1.0
```

### 镜像的迁移

导出镜像

docker save 命令可以将镜像输出，提供了一种让我们保存镜像到 Docker 外部的方式。

```shell
$ sudo docker save webapp:1.0 > webapp-1.0.tar

# docker save 命令还为我们提供了 -o 选项，用来指定输出文件，使用这个选项可以让命令更具有统一性。
$ sudo docker save -o ./webapp-1.0.tar webapp:1.0
```

导入镜像

导入镜像的方式也很简单，使用与 docker save 相对的 docker load 命令即可。

```shell
$ sudo docker load < webapp-1.0.tar
```

相对的，docker load 命令是从输入流中读取镜像的数据，所以我们这里也要使用管道来传输内容。当然，我们也能够使用 -i 选项指定输入文件。

```shell
$ sudo docker load -i webapp-1.0.tar
```

批量迁移

通过 docker save 和 docker load 命令我们还能够批量迁移镜像，只要我们在 docker save 中传入多个镜像名作为参数，它就能够将这些镜像都打成一个包，便于我们一次性迁移多个镜像。

```shell
$ sudo docker save -o ./images.tar webapp:1.0 nginx:1.12 mysql:5.7
```

装有多个镜像的包可以直接被 docker load 识别和读取，我们将这个包导入后，所有其中装载的镜像都会被导入到 Docker 之中。

导出和导入容器

使用 docker export 命令我们可以直接导出容器，我们可以把它简单的理解为 docker commit 与 docker save 的结合体。

```shell
$ sudo docker export -o ./webapp.tar webapp
```

相对的，使用 docker export 导出的容器包，我们可以使用 docker import 导入。这里需要注意的是，使用 docker import 并非直接将容器导入，而是将容器运行时的内容以镜像的形式导入。所以导入的结果其实是一个镜像，而不是容器。
