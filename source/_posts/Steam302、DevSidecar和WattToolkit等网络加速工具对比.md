---
title: Steam302、DevSidecar和WattToolkit等网络加速工具对比
date: 2025-01-01 20:10:43
tags:
---
# dev-sidecar

开发者边车，命名取自service-mesh的service-sidecar，意为为开发者打辅助的边车工具（以下简称ds）
通过本地代理的方式将https请求代理到一些国内的加速通道上

<a href='https://github.com/docmirror/dev-sidecar'><img alt="GitHub stars" src="https://img.shields.io/github/stars/docmirror/dev-sidecar?logo=github"></a>



## 重要提醒

> ------------------------------重要提醒1---------------------------------
>
> 注意：由于electron无法监听windows的关机事件，开着ds情况下直接重启电脑，会导致无法上网，你可以手动启动ds即可恢复网络，你也可以将ds设置为开机自启。
>

> 注：此问题已在 `1.8.9` 版本中得到解决。

> ------------------------------重要提醒2---------------------------------
>
> 注意：本应用启动会自动修改系统代理，所以会与其他代理软件有冲突，请务必不要一起使用。

## 一、 特性

### 1.1、 dns优选（解决\*\*\*污染问题）

- 根据网络状况智能解析最佳域名ip地址，获取最佳网络速度
- 解决一些网站和库无法访问或访问速度慢的问题
- 建议遇到打开比较慢的国外网站，可以优先尝试将该域名添加到dns设置中（注意：被\*\*\*封杀的无效）

### 1.2、 请求拦截

- 拦截打不开的网站，代理到加速镜像站点上去。
- 可配置多个镜像站作为备份
- 具备测速机制，当访问失败或超时之后，自动切换到备用站点，使得目标服务高可用

### 1.3、 github加速

- github 直连加速 
- release、source、zip下载加速
- clone 加速
- 头像加速

### 1.4、 Stack Overflow 加速

- 将ajax.google.com代理到加速CDN上
- recaptcha 图片验证码加速

### 1.5、 npm加速

- 支持开启npm代理
- 官方与淘宝npm registry一键切换
- 某些npm install的时候，并且使用cnpm也无法安装时，可以尝试开启npm代理再试


## 二、快速开始

支持windows、Mac、Linux(Ubuntu)

### 2.1、DevSidecar桌面应用

#### 1）下载安装包

- release下载
  [Github Release](https://github.com/docmirror/dev-sidecar/releases)

> Windows: 请选择DevSidecar-x.x.x.exe


> 注意：由于没有买应用证书，所以应用在下载安装时会有“未知发行者”等安全提示，选择保留即可。


#### 3）安装根证书

第一次打开会提示安装证书，根据提示操作即可

> 根证书是本地随机生成的，所以不用担心根证书的安全问题（本应用不收集任何用户信息）
> 你也可以在加速服务设置中自定义根证书（PEM格式的证书与私钥）


#### 4）开始加速吧

去试试打开github


## 三、模式说明

### 3.1、安全模式

- 此模式：关闭拦截、关闭增强、开启dns优选、开启测速
- 最安全，无需安装证书，可以在浏览器地址栏左侧查看域名证书
- 功能也最弱，只有特性1，相当于查询github的国外ip，手动改hosts一个意思。
- github的可访问性不稳定，取决于IP测速，如果有绿色ip存在，就 `有可能` 可以直连访问。

### 3.2、默认模式

- 此模式：开启拦截、关闭增强、开启dns优选、开启测速
- 需要安装证书，通过修改sni直连访问github
- 功能上包含特性1/2/3/4。




# steamcommunity 302

网盘下载:[steamcommunity_302](https://wwid.lanzouw.com/ioqRq2fbvlxe)

解压密码dogfight360

![程序首页](https://www.dogfight360.com/blog/wp-content/uploads/2023/07/image-1.png)

-   **启动服务** – 总闸
-   **停止&退出** – 退出程序(关闭后端进程,删除带有#S302的所有hosts后退出自身)
-   **设置** – 进入设置页

![](https://www.dogfight360.com/blog/wp-content/uploads/2023/07/image-3.png)

**重启后端** – 重新生成设置内的配置到config文件并重启后端caddy进程

![](https://www.dogfight360.com/blog/wp-content/uploads/2023/07/image-4.png)

-   **1.开机自动运行** – 写入计划任务,在电脑开机时自动运行
-   **1.自动启动服务** – 运行程序时自动点击启动服务,无需再手动操作
-   **1.隐藏托盘图标** – 启动程序后不在系统托盘(右下角)显示图标**(窗口不可见时可再次运行程序呼出窗口)**
-   **2.hosts检查** – <sub><strong>开启时</strong></sub>自动写入对应hosts / <sub><strong>不开启时</strong></sub>仅启动服务不处理hosts文件(不读不写)





# Watt Toolkit
原名 「Steam++」是一个开源跨平台的多功能 Steam 工具箱。具有网络加速、脚本配置、账号切换、本地令牌、库存管理等功能。
<a href='https://github.com/BeyondDimension/SteamTools'><img alt="GitHub stars" src="https://img.shields.io/github/stars/BeyondDimension/SteamTools?logo=github"></a>

## 🚀 下载渠道
- [Steam 商店](https://store.steampowered.com/app/2425030)
- [Microsoft 应用商店](https://apps.microsoft.com/store/detail/watt-toolkit/9MTCFHS560NG?hl=zh-cn&gl=cn)
- [软件官网](https://steampp.net)
- [GitHub 发行版](https://github.com/BeyondDimension/SteamTools/releases)

## ✨ 功能
全新的 3.0 版本，支持自定义插件功能，以下功能为下载时自带的默认插件，可以自行删除或禁用。
1. 网络加速 
	- 使用 [YARP.ReverseProxy](https://github.com/microsoft/reverse-proxy) 开源项目进行本地反代来支持更快的访问游戏网站。
	- 通过加速服务拦截网络请求将一些 JS 脚本注入在网页中，提供类似网页插件的功能。
3. 账号切换 
	- 快速切换已在当前 PC 上登录过的 Steam、Epic、Uplay 等等多平台账号，与管理 Steam 家庭共享库排序及禁用等功能。
4. 库存游戏
	- 直接管理你的 Steam 游戏库存，可以编辑游戏名称和[自定义封面](https://www.steamgriddb.com)。
	- 监控 Steam 游戏下载进度实现 Steam 游戏下载完成定时关机功能。
	- 模拟运行 Steam 游戏，让您不用安装和下载对应的游戏也能挂游玩时间和掉落 Steam 卡片
	- 自助管理 Steam 游戏云存档，随时删除和上传自定义的存档文件至 Steam 云。
	- 解锁以及反解锁 Steam 游戏成就。
5. 本地令牌 
	- 让您的手机令牌统一保存在电脑中、支持通用HOTP、TOTP、Steam、Google 等令牌导入。
	- 支持 Steam 登录账号自定绑定生成令牌、支持 Steam 批量确认交易功能。

