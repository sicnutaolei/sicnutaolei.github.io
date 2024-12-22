---
title: 换新电脑后继续使用Hexo更新博客的解决办法
date: 2024-12-22 20:31:18
tags:
---
## 问题描述
在换新电脑后，我尝试使用Hexo更新博客时遇到了问题。我希望能够继续使用之前的Hexo配置和文章，而不是从头开始重新搭建。
## 解决思路
要解决这个问题，我需要确保在新电脑上正确安装和配置Hexo。以下是解决方法的详细步骤：
1.  了解机制：Hexo是一个基于Node.js的静态博客框架，它使用Markdown语法编写文章，并将其转换为静态网页。由 hexo d 命令生成的静态文件上传部署到GitHub Pages或其他静态网站托管服务上，不包含源文件。也就是说，上传的是在本地自动生成
.deploy_git 里面的静态文件，其他文件在本地。
2.  解决思路：只需要将本地的hexo文件上传到GitHub上，再将GitHub上的文件下载到新电脑上，就可以继续使用之前的Hexo配置和文章。

## 解决方案
1.  在GitHub上创建一个新的分支 hexo，并设置为默认分支将本地的Hexo源文件推送到该分支。
2.  在电脑上使用. 使用git clone git@github.com:sicnutaolei/sicnutaolei.github.io.git拷贝仓库到本地。
3.  打开本地仓库，使用git checkout -b hexo 创建一个新的分支hexo，并切换到该分支。
3.  依次执行git add .、git commit -m "备份"、git push origin hexo提交网站相关的文件到hexo分支。
4.  然后执行hexo g -d发布网站到master分支上。

## 关于日常的改动流程在本地对博客进行修改（添加新博文、修改样式等等）后，通过下面的流程进行管理。
1.  依次执行git add .、git commit -m "..."、git push origin hexo指令将改动推送到GitHub（此时当前分支应为hexo）2.  然后才执行hexo g -d发布网站到master分支上。
    虽然两个过程顺序调转一般不会有问题，不过逻辑上这样的顺序是绝对没问题的（例如突然死机要重装了，悲催....的情况，调转顺序就有问题了）。
## 本地资料丢失后的流程当重装电脑之后，或者想在其他电脑上修改博客，可以使用下列步骤：
1. 使用git clone git@github.com:sicnutaolei/sicnutaolei.github.io.git拷贝仓库（默认分支为hexo）；
2. 在本地新拷贝的http://sicnutaolei.github.io文件夹下通过Git bash依次执行下列指令：
```bash
    npm install hexo
    npm install
    npm install hexo-deployer-git #（记得，不需要hexo init这条指令）
```
## 本机使用方法提示
1.  本地目录 D:\hexo\backup\sicnutaolei.github.io 
2.  使用 hexo new 新文章 创建新的文章
3.  使用 git add .将当前目录下所有修改过的文件添加到 Git 的暂存区中
4.  使用 git commit -m "..."提交暂存区的修改，其中...是提交的描述信息
5.  使用 git push origin hexo将本地仓库的修改推送到远程仓库的hexo分支上
6.  使用 hexo g -d生成并部署网站到GitHub Pages上（master分支）