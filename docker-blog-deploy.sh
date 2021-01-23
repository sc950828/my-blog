#! /bin/bash

# docker部署博客到阿里云

git checkout .

git pull origin master

npm install

npm run build

docker build -t iblog -f ./docker/blog.Dockerfile .

docker stop myblog

docker rm myblog

docker run \
-p 80:80 \
-d --name myblog \
iblog
