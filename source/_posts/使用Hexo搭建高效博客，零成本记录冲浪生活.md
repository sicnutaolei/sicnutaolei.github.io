---
title: 使用Hexo搭建高效博客，零成本记录冲浪生活
date: 2024-12-22 19:23:45
tags:
---
[本文来源](https://blog.kingxujw.com/categories/%E6%96%87%E7%AB%A0/)

本文详细介绍了如何使用Hexo框架搭建个人博客，并将其部署到GitHub Pages和Cloudflare Pages上。主要内容包括：

-   环境准备：安装Node.js和Git
-   配置Git和GitHub：设置SSH密钥，创建GitHub仓库
-   初始化Hexo项目：安装Hexo，创建新博客
-   部署到GitHub Pages：配置部署设置，推送静态文件
-   部署到Cloudflare Pages：连接GitHub仓库，自动部署
-   基本使用方法：创建新文章，本地预览，发布更新
-   优点：免费，简单，零成本
-   缺点：发文不便，依赖于本地环境；更适合个人博客使用
-   最后，感谢您的阅读。

这个教程适合那些想要快速搭建个人博客，但又不想花费太多成本的人。通过使用Hexo、GitHub和Cloudflare的免费服务，您可以轻松创建一个高效、简洁的博客网站。

___

## 1.事前准备

1.  域名（**非必须**，你也可以使用免费域名，或者`GitHub.io`或`Pages.dev`分配的域名也可以）
2.  [GitHub](https://github.com/)（**必须**，你需要注册一个GitHub帐号）
3.  [Cloudflare](https://dash.cloudflare.com/)（**非必须**，你需要注册一个Cloudflare帐号，这样你就可以将博客部署在CF的CDN里加速，但是你也可以直接使用`GitHub.io`分配的域名）

___

## 2.软件支持

1.  [Node](https://nodejs.org/zh-cn)（**必须**）
2.  [Git](https://git-scm.com/downloads)（**必须**）
3.  [VSCode](https://code.visualstudio.com/)（**非必须**，轻量型的代码编辑器，安装MarsCode插件可Ai写代码）

### 2.1.安装 Node

1.  打开Node官网，下载和自己系统相配的Node的安装程序，否则会出现安装问题。下载地址：[https://nodejs.org/en](https://nodejs.org/en)
    
2.  下载后安装，安装的目录可以使用默认目录`C:/Program Files/nodejs/`
    
3.  安装完成后，检查是否安装成功。在键盘按下win + R键，输入CMD，然后回车，打开CMD窗口，执行`node -v`命令，看到版本信息，则说明安装成功。
    
4.  修改npm源。npm下载各种模块，默认是从国处服务器下载，速度较慢，建议配置成华为云镜像源。打开CMD窗口，运行如下命令:
    
```js
npm config set registry https://registry.npmmirror.com/
```
    

### 2.2.安装 Git

1.  进入官网下载适合你当前系统的 Git：[https://git-scm.com/downloads](https://git-scm.com/downloads)
    
2.  下载后傻瓜式安装Git即可，安装的目录最好使用默认目录`C:/Program Files/Git`
    
3.  点击电脑左下角开始即可看见`Git CMD`、`Git Bash`、`Git GUI`。
    
    -   `Git CMD` 是windows 命令行的指令风格
    -   `Git Bash` 是linux系统的指令风格（建议使用）
    -   `Git GUI`是图形化界面（新手学习不建议使用）

___

## 3.配置 Git 密钥并连接至 Github

常用 Git 命令

```bash
git config -l  //查看所有配置
git config --system --list //查看系统配置
git config --global --list //查看用户（全局）配置

```
### 3.1. 配置用户名和邮箱

```bash
git config --global user.name "你的用户名"
git config --global user.email "susetaolei@163.com"
```

通过`git config -l` 检查是否配置成功。

### 3.2. 配置公钥连接Github

1.  执行以下命令生成ssh公钥，此公钥用于你的计算机连接Github
    
```bash
ssh-keygen -t rsa -C "susetaolei@163.com"
```
    

-   `id_rsa`私钥
-   `id_rsa.pub`公钥  
    用记事本打开上述图片中的公钥`id_rsa.pub`，复制里面的内容，然后开始在github中配置ssh密钥。(建议保存在bitwarden中，方便管理)

1.  将 SSH KEY 配置到 GitHub  
    进入github，点击右上角头像 选择`settings`，进入设置页后选择 `SSH and GPG keys`，名字随便起，公钥填到`Key`那一栏。
    
2.  测试连接，输入以下命令
    

第一次连接会提示`Are you sure you want to continue connecting (yes/no/[fingerprint])?`，输入`yes`即可  
出现连接到账户的信息，说明已经大功告成，至此完成了环境准备工作。如果出现报错，可在安装.ssh目录下的`config`文件中添加
Host github.com
Hostname ssh.github.com
Port 443
User git
，然后重新测试连接。


```bash
ssh -T git@github.com
```


### 3.3. 创建GitHub.io仓库

1.  点击右上角的`+`按钮，选择**New repository**，创建一个`<用户名>.github.io`的仓库。
2.  仓库名字的格式必须为：`<用户名>.github.io` (注意：前缀必须为用户名，此为预览博客需要，后期可修改仓库名)
3.  可见性必须选择 `Public` 方便第一次部署检查问题，点击 **Creat repository** 进行创建即可

___

## 4.初始化 Hexo 博客

1.  创建一个文件夹来保存博客源码（我这里选的路径为`D:/Hexo-Blog`），在文件夹内右键鼠标，选择`Open Git Bash here`
2.  在`Git BASH`输入如下命令安装 Hexo
    
  ```bash
   npm install -g hexo-cli && hexo -v
  ```
3.  安装完后输入`hexo -v`验证是否安装成功。
4.  初始化 Hexo 项目安装相关依赖。
```bash
    hexo init blog-demo 
    cd blog-demo
    npm i
```   
5.  初始化项目后，`blog-demo`有如下结构：
-   **node\_modules**：依赖包
-   **scaffolds**：生成文章的一些模板
-   **source**：用来存放你的文章
-   **themes**：主题
-   **.npmignore**：发布时忽略的文件（可忽略）
-   **\_config.landscape.yml**：主题的配置文件
-   **config.yml**：博客的配置文件
-   **package.json**：项目名称、描述、版本、运行和开发等信

1.  输入`hexo cl && hexo s`启动项目
2.  打开浏览器，输入地址：[http://localhost:4000/](http://localhost:4000/) ，看到页面，说明你的博客已经构建成功了。
    
___

## 5.将静态博客挂载到 GitHub Pages

1.  安装 hexo-deployer-git
    
```bash
   npm install hexo-deployer-git --save
```
2.  修改 `_config.yml` 文件  
    在blog-demo目录下的\_config.yml，就是整个Hexo框架的配置文件了。可以在里面修改大部分的配置。详细可参考官方的[配置描述](https://hexo.io/zh-cn/docs/configuration)。  
    修改最后一行的配置，将repository修改为你自己的github项目地址即可，还有分支要改为`master`代表主分支（注意缩进）。
    
```bash
   deploy:
    type: git  
    repository: git@github.com:sicnutaolei/sicnutaolei.github.io.git  
    branch: master
```
    
3.  修改好配置后，运行如下命令，将代码部署到 GitHub（Hexo三连）。
    
```bash
// Git BASH终端
hexo clean && hexo generate && hexo deploy 
// 或者VSCODE终端
hexo cl; hexo g; hexo d
```
-   **hexo clean**：删除之前生成的文件，可以用`hexo cl`缩写。
-   **hexo generate**：生成静态文章，可以用`hexo g`缩写
-   **hexo deploy**：部署文章，可以用`hexo d`缩写_注意：deploy时可能要你输入 username 和 password。_

如果出现**Deploy done**，则说明部署成功了。

稍等两分钟，打开浏览器访问：[https://sicnutaolei.github.io](https://sicnutaolei.github.io/) ，这时候我们就可以看到博客内容了。

___

## 6.将静态博客挂载到 Cloudflare Pages

1.  在 `Workers 和 Pages` 中选择 `Pages` 的 `连接到 Git` 
2.  然后登录你Blog仓库对应的GitHub帐号
3.  点击`保存并部署`后等待部署完成即可。
4.  提示`成功！您的项目已部署到以下区域：全球`后，浏览器访问：[https://taoblog.pages.dev/](https://taoblog.pages.dev/) ，这时候我们就可以看到博客内容了。
    _这时你也就可以将你的`<用户名>.github.io`的仓库设置为`Private`私库了_
5.  如果你有自己的域名，你可以在这里绑定你自己的自定义域，即可。
    
___

## 如何使用

## 新建一篇博文

```bash
hexo new 这是一篇新的博文
```

然后用文本编辑器去编辑`_posts/这是一篇新的博文.md`里的内容即可，注意要使用**Markdown**格式书写。

详细使用方法可以查阅 [https://hexo.io/zh-cn/docs/writing](https://hexo.io/zh-cn/docs/writing)

___

# 附hexo简单命令

## Hexo 博客部署教程

Hexo 是一个快速、简洁且高效的静态博客框架，支持 Markdown 语法，非常适合用来构建个人博客。以下是详细的 Hexo 部署教程，包括环境搭建、文章创建、生成和发布。

### 环境准备

1.  **安装 Node.js**
    
    Hexo 依赖于 Node.js，因此首先需要在你的计算机上安装 Node.js。可以从 [Node.js 官网](https://nodejs.org/) 下载并安装。
    
2.  **安装 Hexo**
    
    使用 npm（Node.js 自带的包管理工具）全局安装 Hexo。在命令行中输入以下命令：
```bash
npm install -g hexo-cli
```
    
3.  **创建 Hexo 项目**
    
    在你想要存放博客的目录下，使用以下命令创建一个新的 Hexo 项目：
```bash
hexo init my-blog # 初始化
cd my-blog # 进入my-blog目录
npm install # 安装组件
```

### 创建新文章

1.  **生成文章**

    在项目根目录下，使用以下命令创建一篇新文章：
```bash
hexo new 新的文章标题
```
    这将在 `source/_posts` 目录下生成一个名为 `新的文章标题.md` 的文件。
    
2.  **撰写文章**
    
    使用支持 Markdown 的文本编辑器打开生成的 `.md` 文件，编辑内容。文件开头的 Front-matter 部分用于配置文章信息，例如：
```markdown
    ---
    title: 新的文章标题
    date: 2024-12-22 19:03:39
    tags:
    categories: # 分类
    - Diary
    tags: # 标签
    - PS3
    - Games
    ---
    摘要
    <!--more-->
    正文
```
    在 Front-matter 中，确保属性和属性值之间有一个空格，以避免解析错误。
    

### 生成和预览博客

1.  **清理旧数据**
    
    在每次修改文章后，建议先清理旧的数据：
```bash
hexo clean
```

2.  **生成静态文件**
    
    使用以下命令生成新的静态文件：
```bash
hexo generate #或简写 hexo g
```
   
    
3.  **启动本地服务器**
    
    启动本地服务器以预览博客：
```bash
hexo server #或简写 hexo s
```
    然后在浏览器中访问 `http://localhost:4000` 查看效果。
    

### 部署博客

1.  **部署到远程服务器**
    
    确保你已经在 `_config.yml` 文件中配置了部署信息，例如 GitHub Pages 或其他托管服务。然后使用以下命令进行部署：
    
```bash 
hexo deploy #或简写 hexo d
```
    
### 常用命令

```bash
hexo new "name"       # 新建文章
hexo new page "name"  # 新建页面
hexo g                # 生成页面
hexo d                # 部署
hexo g -d             # 生成页面并部署
hexo s                # 本地预览
hexo clean            # 清除缓存和已生成的静态文件
hexo help             # 帮助
```
    

## 参考资料

[https://hexo.io/zh-cn/](https://hexo.io/zh-cn/)

[https://www.fomal.cc/posts/e593433d.html](https://www.fomal.cc/posts/e593433d.html)

[https://docs.anheyu.com/](https://docs.anheyu.com/)

[King的部落格](https://blog.kingxujw.com/2024/10/07/%E6%90%AD%E5%BB%BAHexo%E5%8D%9A%E5%AE%A2/)

## 致谢项目

[https://github.com/hexojs/hexo](https://github.com/hexojs/hexo)