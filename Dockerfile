FROM nginx
# 复制 index.html
COPY docs/.vuepress/dist/index.html /usr/share/nginx/html/
# 复制文件到my-blog文件夹下 兼容github pages部署
COPY docs/.vuepress/dist/ /usr/share/nginx/html/my-blog/
# 复制nginx配置文件
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
