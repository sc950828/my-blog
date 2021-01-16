### docker file

Dockerfile 是 Docker 中用于定义镜像自动化构建流程的配置文件，在 Dockerfile 中，包含了构建镜像过程中需要执行的命令和其他操作。通过 Dockerfile 我们可以更加清晰、明确的给定 Docker 镜像的制作过程，而由于其仅是简单、小体积的文件，在网络等其他介质中传递的速度极快，能够更快的帮助我们实现容器迁移和集群部署。

Dockerfile 的内容很简单，主要以两种形式呈现，一种是注释行，另一种是指令行。

### docker file 优势

相对于之前我们介绍的提交容器修改，再进行镜像迁移的方式相比，使用 Dockerfile 进行这项工作有很多优势，我总结了几项尤为突出的。

1. Dockerfile 的体积远小于镜像包，更容易进行快速迁移和部署。
2. 环境构建流程记录了 Dockerfile 中，能够直观的看到镜像构建的顺序和逻辑。
3. 使用 Dockerfile 来构建镜像能够更轻松的实现自动部署等自动化流程。
4. 在修改环境搭建细节时，修改 Dockerfile 文件要比从新提交镜像来的轻松、简单。

### docker 指令

如果进行细分，我们可以将 Dockerfile 的指令简单分为五大类。

1. 基础指令：用于定义新镜像的基础和性质。
2. 控制指令：是指导镜像构建的核心部分，用于描述镜像在构建过程中需要执行的命令。
3. 引入指令：用于将外部文件直接引入到构建镜像内部。
4. 执行指令：能够为基于镜像所创建的容器，指定在启动时需要执行的脚本或命令。
5. 配置指令：对镜像以及基于镜像所创建的容器，可以通过配置指令对其网络、用户等内容进行配置。

### Dockerfile 的组成部分

1. 基础镜像信息 FROM
2. 维护者信息 MAINTAINER LABEL
3. 镜像操作指令 RUN、COPY、ADD、EXPOSE、WORKDIR、ONBUILD、USER、VOLUME 等
4. 容器启动时执行指令 CMD、ENTRYPOINT

### .dockerignore 文件

要排除与构建无关的文件（不重构源存储库），请使用.dockerignore 文件。此文件支持类似于.gitignore 文件的排除模式

#### FROM

在 Dockerfile 里，我们可以通过 FROM 指令指定一个基础镜像，接下来所有的指令都是基于这个镜像所展开的。在镜像构建的过程中，Docker 也会先获取到这个给出的基础镜像，再从这个镜像上进行构建操作。

```dockerfile
FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```

除了选择现有镜像为基础镜像外，Docker 还存在一个特殊的镜像，名为 scratch。这个镜像是虚拟的概念，并不实际存在，它表示一个空白的镜像。

如果你以 scratch 为基础镜像的话，意味着你不以任何镜像为基础，接下来所写的指令将作为镜像第一层开始存在。

```Dockerfile
FROM scratch
```

#### RUN

镜像的构建虽然是按照指令执行的，但指令只是引导，最终大部分内容还是控制台中对程序发出的命令，而 RUN 指令就是用于向控制台发送命令的指令。

在 RUN 指令之后，我们直接拼接上需要执行的命令，在构建时，Docker 就会执行这些命令，并将它们对文件系统的修改记录下来，形成镜像的变化。

Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大。所以我们使用\换行符和&& 符号连接命令，这样执行后，只会创建 1 层镜像。

RUN 是在 docker build 时运行

```shell
# <命令行命令> 等同于，在终端操作的 shell 命令。
RUN <command>
# exec 格式
RUN ["可执行文件", "参数1", "参数2"]
```

RUN 指令是支持 \ 换行的，如果单行的长度过长，建议对内容进行切割，方便阅读。而事实上，我们会经常看到 \ 分割的命令，例如在上面我们贴出的 Redis 镜像的 Dockerfile 里。

#### ENTRYPOINT 和 CMD

基于镜像启动的容器，在容器启动时会根据镜像所定义的一条命令来启动容器中进程号为 1 的进程。而这个命令的定义，就是通过 Dockerfile 中的 ENTRYPOINT 和 CMD 实现的。

CMD 指令就是用于指定默认的容器主进程的启动命令的。

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2

# exec 格式
CMD ["executable","param1","param2"]
CMD ["param1","param2"]
# <命令行命令> 等同于，在终端操作的 shell 命令。
CMD command param1 param2

# 使用 shell 格式的话，实际的命令会被包装为 sh -c 的参数的形式进行执行。
CMD echo $HOME
CMD [ "sh", "-c", "echo $HOME" ]
```

CMD 是在 docker run 时运行，为启动的容器指定默认要运行的程序

RUN 是在构建的时候执行，并生成一个新的镜像，CMD 在构建时不进行任何操作，在容器运行的时候执行。

ENTRYPOINT 指令和 CMD 指令的用法近似，都是给出需要执行的命令，并且它们都可以为空，或者说是不在 Dockerfile 里指出。

ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数。ENTRYPOINT 在运行时也可以替代，不过比 CMD 要略显繁琐，需要通过 docker run 的参数 --entrypoint 来指定。

当 ENTRYPOINT 与 CMD 同时给出时，CMD 中的内容会作为 ENTRYPOINT 定义命令的参数，最终执行容器启动的还是 ENTRYPOINT 中给出的命令。

### LABEL

给构建的镜像打标签。

```dockerfile
LABEL <key>=<value> <key>=<value> <key>=<value> ...

LABEL "com.example.vendor"="ACME Incorporated"
LABEL com.example.label-with-value="foo"
LABEL version="1.0"
LABEL description="This text illustrates \
that label-values can span multiple lines."
```

### WORKDIR

为接下来的 Dockerfile 指令指定当前工作目录，可多次使用，如果使用的是相对路径，则相对的是上一个工作目录，类似 shell 中的 cd 命令。

#### EXPOSE

通过 EXPOSE 指令就可以为镜像指定要暴露的端口。

```dockerfile
EXPOSE <port> [<port>/<protocol>...]
```

当我们通过 EXPOSE 指令配置了镜像的端口暴露定义，那么基于这个镜像所创建的容器，在被其他容器通过 --link 选项连接时，就能够直接允许来自其他容器对这些端口的访问了。

#### VOLUME

在 Dockerfile 里，提供了 VOLUME 指令来定义基于此镜像的容器所自动建立的数据卷。

```dockerfile
VOLUME ["/data"]
```

#### COPY 和 ADD

在制作新的镜像的时候，我们可能需要将一些软件配置、程序代码、执行脚本等直接导入到镜像内的文件系统里，使用 COPY 或 ADD 指令能够帮助我们直接从宿主机的文件系统里拷贝内容到镜像里的文件系统中。

```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] <src>... <dest>

# 例如
COPY package.json /usr/src/app/

COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

<源路径>相对于构建上下文目录，就是 build 后面的那个目录

<目标路径> 可以是容器内的绝对路径，也可以是相对于工作目录的相对路径（工作目录可以用 WORKDIR 指令来指定）。目标路径不需要事先创建，如果目录不存在会在复制文件前先行创建缺失目录。

COPY 与 ADD 指令的定义方式完全一样，需要注意的仅是当我们的目录中存在空格时，可以使用后两种格式避免空格产生歧义。

对比 COPY 与 ADD，两者的区别主要在于 ADD 能够支持使用网络端的 URL 地址作为 src 源，并且在源文件被识别为压缩包时，自动进行解压，而 COPY 没有这两个能力。

虽然看上去 COPY 能力稍弱，但对于那些不希望源文件被解压或没有网络请求的场景，COPY 指令是个不错的选择。

### 构建镜像

在编写好 Dockerfile 之后，我们就可以构建我们所定义的镜像了，构建镜像的命令为 docker build。

```shell
$ sudo docker build ./webapp
```

docker build 可以接收一个参数，需要特别注意的是，这个参数为一个目录路径 ( 本地路径或 URL 路径 )，而并非 Dockerfile 文件的路径。在 docker build 里，这个我们给出的目录会作为构建的环境目录，我们很多的操作都是基于这个目录进行的。

例如，在我们使用 COPY 或是 ADD 拷贝文件到构建的新镜像时，会以这个目录作为基础目录。

```
COPY ./package.json /app/
```

这并不是要复制执行 docker build 命令所在的目录下的 package.json，也不是复制 Dockerfile 所在目录下的 package.json，而是复制 上下文（context） 目录下的 package.json。

在默认情况下，docker build 也会从这个目录下寻找名为 Dockerfile 的文件，将它作为 Dockerfile 内容的来源。如果我们的 Dockerfile 文件路径不在这个目录下，或者有另外的文件名，我们可以通过 -f 选项单独给出 Dockerfile 文件的路径。

```shell
$ sudo docker build -t webapp:latest -f ./webapp/a.Dockerfile ./webapp
```

当然，在构建时我们最好总是携带上 -t 选项，用它来指定新生成镜像的名称。

```shell
$ sudo docker build -t webapp:latest ./webapp
```

如果目录下有些东西确实不希望构建时传给 Docker 引擎，那么可以用 .gitignore 一样的语法写一个 .dockerignore，该文件是用于剔除不需要作为上下文传递给 Docker 引擎的。

实际上 Dockerfile 的文件名并不要求必须为 Dockerfile，而且并不要求必须位于上下文目录中，比如可以用 -f ../Dockerfile.php 参数指定某个文件作为 Dockerfile。

### 构建时使用变量或环境变量

在 Dockerfile 里，我们可以用 ARG 指令来建立一个参数变量，使用 ENV 建立环境变量我们可以在构建时通过构建指令传入这个参数变量，并且在 Dockerfile 里使用它。

环境变量的值是直接定义的 如果需要更改可以在构建时通过构建指令传入

```dockerfile
FROM debian:stretch-slim

## ......

ARG TOMCAT_MAJOR
ARG TOMCAT_VERSION

# 第一种定义变量的方式 key value
ENV TOMCAT_MAJOR 8
# 第二种定义变量方式 key=value
ENV TOMCAT_VERSION=8.0.53

## ......

RUN wget -O tomcat.tar.gz "https://www.apache.org/dyn/closer.cgi?action=download&filename=tomcat/tomcat-$TOMCAT_MAJOR/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz"

## ......
```

如果我们需要通过这个 Dockerfile 文件构建 Tomcat 镜像，我们可以在构建时通过 docker build 的 --build-arg 选项来设置参数变量。通过-e 或者--env 修改环境变量

与参数变量只能影响构建过程不同，环境变量不仅能够影响构建，还能够影响基于此镜像创建的容器。所以构建的时候我们可以传环境变量 在运行的时候我们也还可以传递环境变量

```shell
# 传递变量
docker build --build-arg TOMCAT_MAJOR=8 --build-arg TOMCAT_VERSION=8.0.53 -t tomcat:8.0 ./tomcat
# 修改环境变量
sudo docker run -e TOMCAT_MAJOR=9 -d mysql:5.7
```
