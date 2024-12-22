---
title: 京东云无线宝一代刷机后无法挂载其emmc的解决办法
date: 2024-12-22 20:16:06
tags:
---
## 问题描述 
我的京东云无线宝一代在刷机后，无法挂载其内置的 64g emmc 存储空间，这无疑是巨大的浪费。
## 解决办法
1. 首先，我们使用 fdisk -l 命令查看设备列表，找到对应的设备名称。我的设备名称是 /dev/mmcblk0
2. 使用 mkfs.ext4 /dev/mmcblk0 命令格式化设备
3. 使用fdisk /dev/mmcblk0 命令进入 fdisk 命令行界面
4. 使用 n 命令创建一个新的分区
5. 使用 p 命令查看分区表
6. 使用 1 命令选择第一个分区,默认值直接回车
7. 使用 w 命令保存分区表并退出 fdisk 命令行界面
8. 使用 mkdir /media/SD 命令创建挂载点
9. 使用 mount /dev/mmcblk0 /media/SD 命令挂载设备
10. 最后，使用 ls /media/SD 命令查看挂载结果