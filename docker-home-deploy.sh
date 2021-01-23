#! /bin/bash

# docker部署首页到阿里云

git checkout .

git pull origin master


docker build -t ihome -f ./docker/home.Dockerfile .

docker stop myhome

docker rm myhome

docker run \
-p 80:80 \
-d --name myhome \
ihome
