#!/bin/sh

# 终止一个错误
set -e

# 构建
# npm run build

# 进入生成的构建文件夹
cd home

# 初始化项目仓库并提交
git init
git add .
git commit -m 'deploy home page'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:sc950828/sc950828.github.io.git master

cd -
