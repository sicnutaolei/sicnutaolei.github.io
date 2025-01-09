---
title: 飞牛nas添加硬盘但不格式化的办法
date: 2025-01-09 21:50:52
tags:
---
# 一、使用lsblk列出所有块设备及其挂载点
```bash
lsblk
```
lsblk会展示一个列表，其中包含了所有连接的块设备及其当前的挂载点。通过这个列表可以识别出需要挂载的目标硬盘。例如
```bash
root@FnNas:~# lsblk
NAME                      MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINTS
sda                         8:0    0 931.5G  0 disk
└─sda1                      8:1    0 931.5G  0 part
  └─md0                     9:0    0 931.4G  0 raid1
    └─trim_b7b9e27f_3baf_4d3d_b2cd_c8f1f82566b7-0
                          253:2    0 931.4G  0 lvm   /vol1
sdb                         8:16   0 465.8G  0 disk
└─sdb1                      8:17   0 465.8G  0 part
  └─md126                   9:126  0 465.6G  0 raid1
    └─trim_e92ec900_fb6f_4691_8fb4_c61ac1ca30cb-0
                          253:1    0 465.6G  0 lvm   /vol2
sdc                         8:32   0 465.8G  0 disk
└─sdc1                      8:33   0 465.8G  0 part
```
三、查看对应硬盘分区的UUID
输入

sudo blkid
​
会出现如下信息，记录下对应的UUID

此处我需要用到的是sdc1分区，即UUID为06A3-4D34

```bash
/dev/sdc1: LABEL="TOSHIBA500" UUID="06A3-4D34" BLOCK_SIZE="512" TYPE="exfat" PARTUUID="307937f3-01"
```

​
四、创建挂载点
请注意从这里开始的 “文件夹名称” 可自定义且必须使用英文，不建议大小混合，以免后续输入错误，后文中所有的 “文件夹名称” 均需统一内容及大小写

```bash
sudo mkdir -p /vol1/toshiba500
```
​
五、设置挂载目录权限
```bash
sudo chown 1000:1000 /vol1/toshiba500
sudo chmod 777 /vol1/toshiba500
```
​
六、创建mount单元文件
使用nano命令新建并编辑.mount单元文件

```bash
sudo nano /etc/systemd/system/vol1-toshiba500.mount
```
​
输入以下内容（请注意此处的toshiba500必须为英文，且此处的“toshiba500”大小写与mount文件名完全对应，必须完全对应！

```bash
[Unit]
Description=Mount storage volume
Before=docker.service
# 在docker服务前启动
[Mount]
# 要挂载设备的UUID
What=UUID=之前记录的UUID
# 要挂载的目录，注意大小写与文件名称完全对应
Where=/vol1/toshiba500
# 文件系统类型，自动
Type=auto
Options=defaults
[Install]
WantedBy=multi-user.target
[Service]
ExecStartPre=/bin/mkdir -p /vol1/toshiba500
ExecStartPre=/bin/chmod 0777 /vol1/toshiba500
ExecStartPost=/bin/chmod 0777 /vol1/toshiba500
```
​
检查无误后，按 Ctrl+O 回车保存，Ctrl+X 退出

例如我这里文件夹名称是toshiba500,UUID为06A3-4D34，修改如下：

```bash
[Unit]
Description=Mount toshiba500 volume
Before=docker.service
[Mount]
What=UUID=06A3-4D34
Where=/vol1/toshiba500
Type=auto
Options=defaults
[Install]
WantedBy=multi-user.target
[Service]
ExecStartPre=/bin/mkdir -p /vol1/toshiba500
ExecStartPre=/bin/chmod 0777 /vol1/toshiba500
ExecStartPost=/bin/chmod 0777 /vol1/toshiba500
```

​
七、重载systemd配置
```bash
sudo systemctl daemon-reload
```
​
八、启用创建的挂载单元
```bash
sudo systemctl enable vol1-toshiba500.mount
```
​
九、启动挂载单元
```bash
sudo systemctl start vol1-toshiba500.mount
```
​
至此，没有报错就已经是成功的，你也可以继续查看单元状态。

十、检查挂载单元状态
```bash
sudo systemctl status vol1-toshiba500.mount
```
​
至此，我们已经完成了硬盘挂载的设置，当我们启动系统时，系统将自动对指定的硬盘进行挂载，且该挂载位于docker启动之前，故可以在docker中进行调用。

# 总结
在上文中，我们介绍了如何手动挂载内置硬盘到外接目录，主要是为了满足部分人员不组raid不且不格式化硬盘的需求，操作本身没有特别大的难度，重点注意“文件夹名称”的统一性即可，理论上不会受到系统更新影响（具体以实际为准，如果更新后被取消了重新操作即可）。该方法具有唯一性，如果需要挂载多个硬盘，请创建多个“.mount“单元而不是写在同一个单元中。请勿使用任何ai工具补全本mount单元内容，请不要在单元中添加after语句，不要破坏系统服务项的启动顺序，由此导致对系统的影响本人概不负责。

Enjoy！！！