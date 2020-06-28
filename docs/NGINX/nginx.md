### 1、Nginx 介绍

Nginx 是开源、高性能、高可靠的 Web 和反向代理服务器，而且支持热部署，几乎可以做到 7 `*` 24 小时不间断运行，即使运行几个月也不需要重新启动，还能在不间断服务的情况下对软件版本进行热更新。性能是 Nginx 最重要的考量，其占用内存少、并发能力强、能支持高达 5w 个并发连接数，最重要的是，Nginx 是免费的并可以商业化，配置使用也比较简单。

### 2、平时开发主要关注的文件夹有两个

/etc/nginx/conf.d/ 文件夹，是我们进行子配置的配置项存放处，/etc/nginx/nginx.conf 主配置文件会默认把这个文件夹中所有子配置项都引入。

/usr/share/nginx/html/ 文件夹，通常静态文件都放在这个文件夹(打包好的文件)，也可以根据你自己的习惯放其他地方。

### 3、Nginx 的常用命令

    nginx -h 查看所有命令
    nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启
    nginx -s reopen	 # 重启 Nginx
    nginx -s stop    # 快速关闭
    nginx -s quit    # 等待工作进程处理完成后关闭
    nginx -T         # 查看当前 Nginx 最终的配置
    nginx -t -c <配置路径>    # 检查配置文件是否有问题，如果已经在配置目录，则不需要-c
    nginx -V 查看nginx版本及安装的本地位置
    ngxin -v 查看nginx版本

### 4、nginx 文件解构

    main        # 全局配置，对全局生效
    ├── events  # 配置影响 Nginx 服务器或与用户的网络连接
    ├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
    │   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
    │   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
    │   ├── server
    │   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
    │   │   ├── location
    │   │   └── ...
    │   └── ...
    └── ...

- 1、main 全局块：配置影响 nginx 全局的指令。一般有运行 nginx 服务器的用户组，nginx 进程 pid 存放路径，日志存放路径，配置文件引入，允许生成 worker process 数等。
- 2、events 块：配置影响 nginx 服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
- 3、http 块：可以嵌套多个 server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type 定义，日志自定义，是否使用 sendfile 传输文件，连接超时时间，单连接请求数等。
- 4、server 块：配置虚拟主机的相关参数，一个 http 中可以有多个 server。
- 5、location 块：配置请求的路由，以及各种页面的处理情况。

### 5、典型的例子

    user  nginx;                        # 运行用户，默认即是nginx，可以不进行设置
    worker_processes  1;                # Nginx 进程数，一般设置为和 CPU 核数一样
    error_log  /var/log/nginx/error.log warn;   # Nginx 的错误日志存放目录
    pid        /var/run/nginx.pid;      # Nginx 服务启动时的 pid 存放位置

    events {
        use epoll; # 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
        worker_connections 1024;   # 每个进程允许最大并发数
        multi_accept 配置指定nginx在收到一个新连接通知后尽可能多的接受更多的连接
    }

    # 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
    http {

        log_format  main  # 设置日志模式
        access_log  /var/log/nginx/access.log  main;   # Nginx访问日志存放位置

        sendfile            on;   # 开启高效传输模式
        tcp_nopush          on;   # 减少网络报文段的数量
        tcp_nodelay         on;
        keepalive_timeout   65;   # 保持连接的时间，也叫超时时间，单位秒
        client_header_timeout 10：# 设置请求头的超时时间
        client_body_timeout 10:   # 设置请求体的超时时间
        types_hash_max_size 2048;

        include             /etc/nginx/mime.types;      # 文件扩展名与类型映射表
        default_type        application/octet-stream;   # 默认文件类型

        include /etc/nginx/conf.d/*.conf;   # 加载子配置项

        server {
          listen       80;       # 配置监听的端口
          server_name  localhost;    # 配置的域名或ip 多个配置之间用空格分隔
          root：表示整个server虚拟主机内的根目录，所有当前主机中web项目的根目录
          index：用户访问web网站时的全局首页
          charset：用于设置www/路径中配置的网页的默认编码格式
          access_log：用于指定该虚拟主机服务器中的访问记录日志存放路径
          error_log：用于指定该虚拟主机服务器中访问错误日志的存放路径

          location / {
            root   /usr/share/nginx/html;  # 网站根目录
            index  index.html index.htm;   # 默认首页文件
            proxy_pass http://192.168.10.66:11999; #配置反向代理
            try_files $uri $uri/ /index.html; 单页面应用配置 始终定向为 index.html 文件
            proxy_cookie_domain be.sherlocked93.club fe.sherlocked93.club; # 两个域名之间cookie的传递与回写
            proxy_set_header：在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。
            proxy_connect_timeout：配置Nginx与后端代理服务器尝试建立连接的超时时间。
            proxy_read_timeout：配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。
            proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。
            proxy_redirect：用于修改后端服务器返回的响应头中的Location和Refresh。
            proxy_redirect     off;
            client_max_body_size       10m; #允许客户端请求的最大单文件字节数
            client_body_buffer_size    128k; #缓冲区代理缓冲用户端请求的最大字节数
            proxy_buffer_size          4k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers              4 32k; #proxy_buffers缓冲区，网页平均在32k以下就设置
            proxy_busy_buffers_size    64k; #高负荷下缓冲大小（proxy_buffers*2）
            proxy_temp_file_write_size 64k; #设定缓存文件夹大小，大于这个值，将从upstream服务器传
            deny 172.168.22.11;   # 禁止访问的ip地址，可以为all
            allow 172.168.33.44； # 允许访问的ip地址，可以为all
          }

          error_page 500 502 503 504 /50x.html;  # 默认50x对应的访问页面
          error_page 400 404 error.html;   # 同上
        }
    }

### 6、常用全局变量

    $host 请求信息中的 Host，如果请求中没有 Host 行，则等于设置的服务器名，不包含端口
    $request_method 客户端请求类型，如 GET、POST
    $remote_addr 客户端的 IP 地址
    $args 请求中的参数
    $arg_PARAMETER GET 请求中变量名 PARAMETER 参数的值，例如：$http_user_agent(Uaer-Agent 值),
    $content_length 请求头中的 Content-length 字段
    $http_user_agent 客户端 agent 信息
    $http_cookie 客户端cookie信息
    $remote_addr 客户端的 IP 地址
    $remote_port 客户端的端口
    $server_protocol 请求使用的协议，如 HTTP/1.0、HTTP/1.1
    $server_addr 服务器地址
    $server_name 服务器名称
    $server_port 服务器的端口号
    $scheme HTTP 方法（如 http，https）

### 7、location 的匹配配置

`=` 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；

`^~` 用于不含正则表达式的 uri； 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；

`~` 表示用该符号后面的正则去匹配路径，区分大小写；

`~*` 表示用该符号后面的正则去匹配路径，不区分大小写。跟 ~ 优先级都比较低，如有多个 location 的正则能匹配的话，则使用正则表达式最长的那个；

    如果 uri 包含正则表达式，则必须要有 ~ 或 ~* 标志。
    location [ = | ~ | ~* | ^~] uri {
      ...
    }

### 8、upstream 配置负载均衡

负载均衡主要思想就是把负载均匀合理地分发到多个服务器上，实现压力分流的目的。

    http {
      upstream myserver {
        # ip_hash;  # ip_hash 方式
        # fair;   # fair 方式
        server 127.0.0.1:8081;  # 负载均衡目的服务地址
        server 127.0.0.1:8080;
        server 127.0.0.1:8082 weight=10;  # weight 方式，不写默认为 1
        server 192.168.1.100:8001 down; # 表示该主机暂停服务
        server 192.168.1.100:8002 max_fails=3; # 表示失败最大次数，超过失败最大次数暂停服务
        server 192.168.1.100:8003 fail_timeout=20s; # 表示如果请求受理失败，暂停指定的时间之后重新发起请求
      }

      server {
        location / {
          proxy_pass http://myserver;
          proxy_connect_timeout 10;
        }
      }
    }

Nginx 提供了好几种分配方式，默认为轮询，就是轮流来。有以下几种分配方式：

轮询，默认方式，每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务挂了，能自动剔除；

weight，权重分配，指定轮询几率，权重越高，在被访问的概率越大，用于后端服务器性能不均的情况；

ip_hash，每个请求按访问 IP 的 hash 结果分配，这样每个访客固定访问一个后端服务器，可以解决动态网页 session 共享问题。负载均衡每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的；

fair（第三方），按后端服务器的响应时间分配，响应时间短的优先分配，依赖第三方插件 nginx-upstream-fair，需要先安装；

### 9、Nginx 配置 gzip

使用 gzip 不仅需要 Nginx 配置，浏览器端也需要配合，需要在请求消息头中包含 Accept-Encoding: gzip（IE5 之后所有的浏览器都支持了，是现代浏览器的默认设置）。一般在请求 html 和 css 等静态资源的时候，支持的浏览器在 request 请求静态资源的时候，会加上 Accept-Encoding: gzip 这个 header，表示自己支持 gzip 的压缩方式，Nginx 在拿到这个请求的时候，如果有相应配置，就会返回经过 gzip 压缩过的文件给浏览器，并在 response 相应的时候加上 content-encoding: gzip 来告诉浏览器自己采用的压缩方式（因为浏览器在传给服务器的时候一般还告诉服务器自己支持好几种压缩方式），浏览器拿到压缩的文件后，根据自己的解压方式进行解析。

    # /etc/nginx/conf.d/gzip.conf 该配置会被注入到主配置文件的http模块里面

    gzip on; # 默认off，是否开启gzip
    gzip_types text/plain text/css application/json application/x-javascript text/xml
                application/xml application/xml+rss text/javascript;
                要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；

    # 上面两个开启基本就能跑起了，下面的愿意折腾就了解一下
    gzip_static on; 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；
    gzip_proxied any; 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；
    gzip_vary on; 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；
    gzip_comp_level 6; gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；
    gzip_buffers 16 8k; 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；
    # gzip_min_length 1k; 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。
                          默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；
    gzip_http_version 1.1; 默认 1.1，启用 gzip 所需的 HTTP 最低版本；

这个配置可以插入到 http 模块整个服务器的配置里，也可以插入到需要使用的虚拟主机的 server 或者下面的 location 模块中，当然像上面我们这样写的话就是被 include 到 http 模块中了。

### 10、Webpack 的 gzip 配置

打包之后的文件下面有一个对应的 .gz 文件，这个是经过 gzip 压缩后的文件

那么为啥这里 Nginx 已经有了 gzip 压缩，Webpack 这里又整了个 gzip 呢，因为如果全都是使用 Nginx 来压缩文件，会耗费服务器的计算资源，如果服务器的 gzip_comp_level 配置的比较高，就更增加服务器的开销，相应增加客户端的请求时间，得不偿失。

如果压缩的动作在前端打包的时候就做了，把打包之后的高压缩等级文件作为静态资源放在服务器上，Nginx 会优先查找这些压缩之后的文件返回给客户端，相当于把压缩文件的动作从 Nginx 提前给 Webpack 打包的时候完成，节约了服务器资源，所以一般推介在生产环境应用 Webpack 配置 gzip 压缩。在 nginx 配置文件中 gzip_static 配置设置为 on 就可以。

```js
// vue-cli3 的 vue.config.js 文件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  // gzip 配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css/,    // 匹配文件名
          threshold: 10240,               // 文件压缩阈值，对超过10k的进行压缩
          deleteOriginalAssets: false     // 是否删除源文件
        })]
      }
    }
  },
  ...
}
```

### 11、配置动静分离

动静分离就是把动态和静态的请求分开。方式主要有两种，一种 是纯粹把静态文件独立成单独的域名，放在独立的服务器上，也是目前主流推崇的方案(cdn)。另外一种方法就是动态跟静态文件混合在一起发布， 通过 Nginx 配置来分开。

通过 location 指定不同的后缀名实现不同的请求转发。

    server {
      # 动态
      location /www/ {
        root /data/;
        index index.html index.htm;
      }

      # 静态 这也是文件服务器的配置
      location /image/ {
        root /data/;
        alias /usr/share/nginx/html/static;  # 静态资源目录
        autoindex on;
        autoindex_exact_size off; # on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB
        autoindex_localtime off; # off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间
      }
    }

### 12、根据用户设备不同返回不同样式的站点

根据用户设备不同返回不同样式的站点，以前经常使用的是纯前端的自适应布局，但无论是复杂性和易用性上面还是不如分开编写的好，比如我们常见的淘宝、京东......这些大型网站就都没有采用自适应，而是用分开制作的方式，根据用户请求的 user-agent 来判断是返回 PC 还是 H5 站点。

    server {
      listen 80;
      server_name fe.sherlocked93.club;

      location / {
        root  /usr/share/nginx/html/pc;
        # 判断是否是手机端 定位到不同的目录
        if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
          root /usr/share/nginx/html/mobile;
        }
        index index.html;
      }
    }

### 13、配置 HTTPS

我购买的腾讯云提供的亚洲诚信机构颁发的免费证书只能一个域名使用，二级域名什么的需要另外申请，但是申请审批比较快，一般几分钟就能成功，然后下载证书的压缩文件，里面有个 nginx 文件夹，把 xxx.crt 和 xxx.key 文件拷贝到服务器目录，再配置下：

    server {
      listen 443 ssl http2 default_server; # SSL 访问端口号为 443
      server_name sherlocked93.club; # 填写绑定证书的域名

      ssl_certificate /etc/nginx/https/1_sherlocked93.club_bundle.crt;   # 证书文件地址
      ssl_certificate_key /etc/nginx/https/2_sherlocked93.club.key;      # 私钥文件地址
      ssl_session_timeout 10m;

      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;      #请按照以下协议配置
      ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
      ssl_prefer_server_ciphers on;

      location / {
        root         /usr/share/nginx/html;
        index        index.html index.htm;
      }
    }

    一般还可以加上几个增强安全性的命令：
    add_header X-Frame-Options DENY;           # 减少点击劫持
    add_header X-Content-Type-Options nosniff; # 禁止服务器自动解析资源类型
    add_header X-Xss-Protection 1;             # 防XSS攻击

### 14、图片防盗链

    server {
      listen       80;
      server_name  *.sherlocked93.club;

      # 图片防盗链
      location ~* \.(gif|jpg|jpeg|png|bmp|swf)$ {
        valid_referers none blocked 192.168.0.2;  # 只允许本机 IP 外链引用
        if ($invalid_referer){
          return 403;
        }
      }
    }

### 15、请求过滤

    # 非指定请求全返回 403
    if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
      return 403;
    }

    location / {
      # IP访问限制（只允许IP是 192.168.0.2 机器访问）
      allow 192.168.0.2;
      deny all;

      root   html;
      index  index.html index.htm;
    }

### 16、配置图片、字体等静态文件缓存

    location ~ .\*\.(css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)\$ {
        expires 10d; # 10天
    }

    # 如果不希望缓存
    expires -1;

### 17、HTTP 请求转发到 HTTPS

配置完 HTTPS 后，浏览器还是可以访问 HTTP 的地址 http://sherlocked93.club/ 的，可以做一个 301 跳转，把对应域名的 HTTP 请求重定向到 HTTPS 上

    server {
      listen      80;
      server_name www.sherlocked93.club;

      # 单域名重定向
      if ($host = 'www.sherlocked93.club'){
          return 301 https://www.sherlocked93.club$request_uri;
      }
      # 全局非 https 协议时重定向
      if ($scheme != 'https') {
          return 301 https://$server_name$request_uri;
      }

      # 或者全部重定向
      return 301 https://$server_name$request_uri;

      # 以上配置选择自己需要的即可，不用全部加
    }

### 18、泛域名路径分离

这是一个非常实用的技能，经常有时候我们可能需要配置一些二级或者三级域名，希望通过 Nginx 自动指向对应目录，比如：

test1.doc.sherlocked93.club 自动指向 /usr/share/nginx/html/doc/test1 服务器地址；

test2.doc.sherlocked93.club 自动指向 /usr/share/nginx/html/doc/test2 服务器地址；

    server {
      listen       80;
      server_name  ~^([\w-]+)\.doc\.sherlocked93\.club$;

      root /usr/share/nginx/html/doc/$1;
    }

### 19、泛域名转发

和之前的功能类似，有时候我们希望把二级或者三级域名链接重写到我们希望的路径，让后端就可以根据路由解析不同的规则：

test1.serv.sherlocked93.club/api?name=a 自动转发到 127.0.0.1:8080/test1/api?name=a；

test2.serv.sherlocked93.club/api?name=a 自动转发到 127.0.0.1:8080/test2/api?name=a ；

    server {
      listen       80;
      server_name ~^([\w-]+)\.serv\.sherlocked93\.club$;

      location / {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;
        proxy_pass              http://127.0.0.1:8080/$1$request_uri;
    }
    }
