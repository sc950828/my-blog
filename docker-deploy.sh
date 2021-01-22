#! /bin/bash

docker build -t iblog .

docker run \
-p 3000:80 \
-d --name myblog \
iblog
