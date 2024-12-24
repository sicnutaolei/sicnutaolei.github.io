---
title: 开源免费的跨平台文件同步工具-Syncthing
date: 2024-12-24 20:19:35
tags:
---
## 开源免费的跨平台文件同步工具 - Syncthing
![软件截图](https://img.slarker.me/wiki/e310d62f71fd4b8eaf65461e6e437fb9.png)

多设备同步文件可以说是 NAS 必备的一个功能，作为 24 小时开机的设备，通过 NAS 来同步文件，可以做到不管其他终端是否在线，也能实时保持同步。推荐直接使用 Syncthing 来实现多端同步。

## 用法 
1. 用它来把电脑的截图同步到手机相册，电脑端直接截图保存，手机端直接访问相册就能发送。
2. 把电脑端的 Calibre 书库同步到 NAS 端的 calibre-Web，可以随时在想看某本书的时候，一键推送到 Kindle.
3. 把电脑的常用文档以及音乐库同步到 NAS 以及各个终端，即便在无网络的时候也能随时编辑文档，听喜欢的音乐。

## 功能对比
相比 Synology Drive，Syncthing 利用 P2P 技术来传输文件，不需要设置内网穿透，只要添加好远程设备，即便不在一个局域网里也可以自动连接。但这有时候也是一个缺点，需要依靠发现服务器才能建立连接，而国内的发现服务器较少，所以连接起来有时候会比较慢。好在可以通过自建中继和发现服务器来解决这个问题。
![软件截图](https://img.slarker.me/wiki/07dff7385de64be4adf7e3c6dabb0792.png)

## 如何使用 Syncthing

在 fnOS 上安装 Docker 版 Syncthing
在 fnOS 上打开应用商店，搜索 Syncthing，点击安装。
![alt text](https://s2.loli.net/2024/12/24/aVAChNH4E1jWUos.webp)

设置密码，其它都保持默认，点击确认，设置好之后点击打开就可以启动了。

默认的端口是 8384。你可以使用 fnOS IP:8384 来访问 Syncthing 的 WebUI。打开 Syncthing 之后，可以先设置密码，然后移除默认的文件夹（Default Folder）。

## 客户端
Syncthing 支持 Windows（推荐使用 SyncTrayzor），macOS，Linux，Android，可以到 官网 或者应用市场下载。

iOS 没有官方的 App，可以使用第三方开源的客户端 Synctrain。

## 添加设备 ID
每个设备安装 Syncthing 之后都会有一个唯一的 设备 ID，当前设备的 ID 在 操作 -> 显示 ID 中可以看到。要想同步文件，需要先互相添加远程设备 ID，类似于添加好友。比如我在 fnOS 的 Syncthing 中添加 Windows 的设备 ID，设备名 可以自己起一个容易区分的名字。



添加之后，在 Windows 中也会有提示添加 fnOS 的设备 ID。添加完成之后，就会显示已连接（未使用）。



## 文件夹同步
比如我想把 Windows 上的文件夹同步到 NAS 里，那就先在 Windows 的 Syncthing 中添加一个本地文件夹（比如 PixPinAutoSave，实际路径 D:\照片\PixPinAutoSave ），然后在这个文件夹中设置共享给 fnOS 这个设备。
![alt text](https://s2.loli.net/2024/12/24/UhkjGtiwplWDN8x.webp)



保存后，在 fnOS 端就可以看到一个共享文件夹的请求：



点击添加，将文件夹路径设置为 Syncthing 容器中映射的 /vol1/1000/Syncthing/截图。



设置好之后，点击保存，同步就会自动开始。fnOS 上的 截图 会和 Windows 上的 截图 保持实时同步。



版本控制
除了基本的同步功能外，Syncthing 还支持文件版本控制，非常适合有版本管理需求的用户：



如果你想防止误删文件，可以在 NAS 上的 Syncthing 中将版本控制设置为 回收站文件版本控制 模式。



当你在其他设备中（比如 macOS）删除文件时，NAS 端会将删除的文件移动到 .stversions 目录，在 fnOS 的文件管理器中可以直接看到 .stversions 目录中被删除的文件。



如果你想恢复某个版本的文件，可以直接在 历史版本 中按具体时间恢复到某个版本。



其它特性
此外，还可以设置文件夹类型（发送和接受，仅发送，仅接受），可以应对更多的场景。



比如，我只想给其他人共享文件，不想接受别人对文件的修改，就可以用 仅发送 模式。