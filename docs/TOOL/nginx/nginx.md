1、使用nginx构建一个下载文件的服务器
  需要在nginx config文件中配置如下
  location /ctrs-download {
    alias /home/upload/ctrs/; //别名 请求/ctrs-download的时候去/home/upload/ctrs/这个路径
    autoindex on; //形成文件服务器
  }

2、配置跨域 proxy_pass
  location /api {
    proxy_pass http://192.168.10.66:11999;
  }
