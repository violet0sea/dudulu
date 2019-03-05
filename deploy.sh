#!/bin/bash

localDir=build/*
remoteDir=/home/www/react
host=root@47.101.151.108
green='\033[0;32m'
## 将本地的ssh public key 拷贝到服务器下
## scp C:\Users\[name]\.ssh\id_rsa.pub root@ip:~/.ssh
## 进入.ssh目录
## cd ~/.ssh 
## 
## mv id_rsa.pub authorized_keys

## 1. build production file

echo "1. building..."
yarn build

# echo "2. 清除远端静态文件目录"
ssh $host rm -rf ${remoteDir}/*

# echo -e "${green}3. 传输本地静态文件到远端"

scp -r $localDir $host:$remoteDir