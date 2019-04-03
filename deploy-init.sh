#!/bin/bash

## 将本地的ssh public key 拷贝到服务器下
## scp C:\Users\[name]\.ssh\id_rsa.pub root@ip:~/.ssh
## 进入.ssh目录
## cd ~/.ssh
##
## mv id_rsa.pub authorized_keys

localDir=build/*
remoteweb=/home/www
remoteDir=/home/www/react
host=root@47.101.151.108
tarDir=react.tar.gz
temp=temp
green='\033[0;32m'


## 1. create an temporary dictionary and clone
echo -e "\n ${green}1. clone..."
git clone https://github.com/violet0sea/dudulu.git $temp

## 2. install packages
echo -e "\n ${green}2. intsall modules..."
## resolve bug https://npm.community/t/cannot-read-property-match-of-undefined/203/3
cd $temp
rm -rf package-lock.json
npm install

## 3. building
echo -e "\n ${green}3. building..."
npm run build

## 4. 打包上传至服务器
echo "\n ${green}4. 清除远端静态文件目录"
tar -czvf $tarDir build/*
scp -r $tarDir $host:$remoteweb
ssh $host "mv -f $remoteDir $remoteweb/react-past"
ssh $host "tar -xzvf $remoteweb/react.tar.gz && mv -f build $remoteweb/react"

## 5. 删除临时目录
cd ..
rm -rf $temp

