### docker compose

解决容器管理问题

如果说 Dockerfile 是将容器内运行环境的搭建固化下来，那么 Docker Compose 我们就可以理解为将多个容器运行的方式和配置固化下来。

### docker compose 的简单使用

如果将使用 Docker Compose 的步骤简化来说，可以分成三步。

1. 如果需要的话，编写容器所需镜像的 Dockerfile；( 也可以使用现有的镜像 )
2. 编写用于配置容器的 docker-compose.yml；
3. 使用 docker-compose 命令启动应用。

与 Dockerfile 采用 Dockerfile 这个名字作为镜像构建定义的默认文件名一样，Docker Compose 的配置文件也有一个缺省的文件名，也就是 docker-compose.yml，如非必要，我建议大家直接使用这个文件名来做 Docker Compose 项目的定义。

### 常用命令

对于开发来说，最常使用的 Docker Compose 命令就是 docker-compose up 和 docker-compose down 了。

docker-compose up 命令类似于 Docker Engine 中的 docker run，它会根据 docker-compose.yml 中配置的内容，创建所有的容器、网络、数据卷等等内容，并将它们启动。与 docker run 一样，默认情况下 docker-compose up 会在“前台”运行，我们可以用 -d 选项使其“后台”运行。事实上，我们大多数情况都会加上 -d 选项。

```shell
$ sudo docker-compose up -d
```

需要注意的是，docker-compose 命令默认会识别当前控制台所在目录内的 docker-compose.yml 文件，而会以这个目录的名字作为组装的应用项目的名称。如果我们需要改变它们，可以通过选项 -f 来修改识别的 Docker Compose 配置文件，通过 -p 选项来定义项目名。

```shell
$ sudo docker-compose -f ./compose/docker-compose.yml -p myapp up -d
```

与 docker-compose up 相反，docker-compose down 命令用于停止所有的容器，并将它们删除，同时消除网络等配置内容，也就是几乎将这个 Docker Compose 项目的所有影响从 Docker 中清除。

```shell
$ sudo docker-compose down
```

同理通过 docker-compose create，docker-compose start 和 docker-compose stop 我们可以实现与 docker create，docker start 和 docker stop 相似的效果，只不过操作的对象由 Docker Engine 中的容器变为了 Docker Compose 中的服务。
