FROM nginx
# 复制 home文件夹
COPY home/ /usr/share/nginx/html/
# 复制nginx配置文件
COPY nginx/home.conf /etc/nginx/conf.d/home.conf
