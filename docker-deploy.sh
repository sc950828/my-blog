#! /bin/bash

git pull origin master

npm install

npm run build

docker build -t iblog .

docker stop myblog

docker rm myblog

docker run \
-p 80:80 \
-d --name myblog \
iblog
