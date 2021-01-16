### docker compose

解决容器管理问题

如果说 Dockerfile 是将容器内运行环境的搭建固化下来，那么 Docker Compose 我们就可以理解为将多个容器运行的方式和配置固化下来。

### docker compose 的简单使用

如果将使用 Docker Compose 的步骤简化来说，可以分成三步。

1. 如果需要的话，编写容器所需镜像的 Dockerfile；( 也可以使用现有的镜像 )
2. 编写用于配置容器的 docker-compose.yml；
3. 使用 docker-compose up 命令启动应用。

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

### 指定镜像

在 Docker Compose 里，我们可以通过两种方式为服务指定所采用的镜像。一种是通过 image 这个配置，这个相对简单，给出能在镜像仓库中找到镜像的名称即可。

另外一种指定镜像的方式就是直接采用 Dockerfile 来构建镜像，通过 build 这个配置我们能够定义构建的环境目录，这与 docker build 中的环境目录是同一个含义。如果我们通过这种方式指定镜像，那么 Docker Compose 先会帮助我们执行镜像的构建，之后再通过这个镜像启动容器。

```yml
## ......
webapp:
  build:
    context: ./webapp
    dockerfile: webapp-dockerfile
    args:
      - JAVA_VERSION=1.6
## ......
```

### 依赖声明

依赖声明通过 depends_on 这个配置项，我们只需要通过它列出这个服务所有依赖的其他服务即可。在 Docker Compose 为我们启动项目的时候，会检查所有依赖，形成正确的启动顺序并按这个顺序来依次启动容器。

### 文件挂载

在 Docker Compose 里定义文件挂载的方式与 Docker Engine 里也并没有太多的区别，使用 volumes 配置可以像 docker CLI 里的 -v 选项一样来指定外部挂载和数据卷挂载。

独立于 services 的 volumes 配置就是用来声明数据卷的。定义数据卷最简单的方式仅需要提供数据卷的名称，对于我们在 Docker Engine 中创建数据卷时能够使用的其他定义，也能够放入 Docker Compose 的数据卷定义中。

如果我们想把属于 Docker Compose 项目以外的数据卷引入进来直接使用，我们可以将数据卷定义为外部引入，通过 external 这个配置就能完成这个定义。

```yml
## ......
volumes:
  mysql-data:
    external: true
## ......
```

### 配置网络

要使用网络，我们必须先声明网络。声明网络的配置同样独立于 services 存在，是位于根配置下的 networks 配置。在上面的例子里，我们已经看到了声明 frontend 和 backend 这两个网络最简单的方式。

在这里，我们为网络定义了网络驱动的类型，并指定了子网的网段。

```yml
networks:
  frontend:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 10.10.1.0/24
## ......
```

使用网络别名

```yml
## ......
database:
  networks:
    backend:
      aliases:
        - backend.database
## ......
webapp:
  networks:
    backend:
      aliases:
        - backend.webapp
    frontend:
      aliases:
        - frontend.webapp
## ......
```

端口映射

在 Docker Compose 的每个服务配置里，我们还看到了 ports 这个配置项，它是用来定义端口映射的。

需要注意的是，由于 YAML 格式对 xx:yy 这种格式的解析有特殊性，在设置小于 60 的值时，会被当成时间而不是字符串来处理，所以我们最好使用引号将端口映射的定义包裹起来，避免歧义。

### docker-compose 模板

```yml
version: "3"

services:
  redis:
    image: redis:3.2
    networks:
      - backend
    volumes:
      - ./redis/redis.conf:/etc/redis.conf:ro
    ports:
      - "6379:6379"
    command: ["redis-server", "/etc/redis.conf"]

  database:
    image: mysql:5.7
    networks:
      - backend
    volumes:
      - ./mysql/my.cnf:/etc/mysql/my.cnf:ro
      - mysql-data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
    ports:
      - "3306:3306"

  webapp:
    build: ./webapp
    networks:
      - frontend
      - backend
    volumes:
      - ./webapp:/webapp
    depends_on:
      - redis
      - database

  nginx:
    image: nginx:1.12
    networks:
      - frontend
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./webapp/html:/webapp/html
    depends_on:
      - webapp
    ports:
      - "80:80"
      - "443:443"

networks:
  frontend:
  backend:

volumes:
  mysql-data:
```
