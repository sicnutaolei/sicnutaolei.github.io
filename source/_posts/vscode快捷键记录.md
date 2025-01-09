---
title: vscode使用教程+快捷键记录
date: 2025-01-09 22:26:30
tags:
---
## 简介
Visual Studio Code（简称VS Code）是由微软开发的一个现代化、轻量级的代码编辑器，它支持几十种主流编程语言（如 JavaScript、Python、C++、Java、Go 等），并通过扩展提供更广泛的语言支持。

VSCode 可以在 Windows、macOS 和 Linux 操作系统上运行，为开发者提供了一个统一的开发环境。

VSCode 因其强大的功能和灵活性，已经成为全球开发者广泛使用的代码编辑器之一。

![](https://www.runoob.com/wp-content/uploads/2024/12/vs-code_background.png)

___

## 特点

-   **轻量与高性能** - VS Code 的设计初衷是既轻量又强大，启动速度快、内存占用低，同时支持各种现代开发需求。
    
-   **多语言支持** - 支持几十种主流编程语言（如 JavaScript、Python、C++、Java、Go 等），并通过扩展提供更广泛的语言支持。
    
-   **强大的扩展系统** - 通过扩展市场，用户可以安装上千种插件（如代码美化工具、调试插件、Git 集成工具），自由定制开发环境。
    
-   **丰富的内置功能** - 内置 Git 控制、调试工具、终端等，帮助开发者提升效率。
    
-   **跨平台一致性** - 在不同操作系统上，提供一致的用户体验和功能支持。
    

___

## 为什么选择 VS Code？

-   **免费开源**：无需付费，没有功能限制，完全开源（基于 MIT 协议）。
-   **灵活性**：无论是前端开发、后端开发，还是 DevOps、数据科学，VS Code 都能胜任。
-   **强大的社区支持**：有庞大的开发者社区，持续维护和开发插件与功能。
-   **高度可定制化**：几乎所有功能都能通过配置文件调整，满足个性化需求。

___

## 适用场景

-   **前端开发**：支持 HTML/CSS/JavaScript、TypeScript，以及 React、Vue、Angular 等框架。
-   **后端开发**：支持 Node.js、Python、Java 等后端开发语言。
-   **数据科学**：可安装 Jupyter Notebook 插件，进行数据分析和可视化。
-   **DevOps**：支持 YAML 配置、Docker、Kubernetes 等工具集成。
-   **其他场景**：例如文档编辑（Markdown）、静态网站生成、代码复审等。

___

## 对比其他编辑器的优势

VS Code 与其他主流编辑器对比：

| 编辑器 | 优势 | 劣势 |
| --- | --- | --- |
| **VS Code** | 功能强大、扩展丰富、轻量灵活 | 需要一定配置时间 |
| Atom | 简洁、界面友好 | 性能较慢，社区逐渐萎缩 |
| Sublime | 速度快、占用资源低 | 付费软件，功能不够全面 |
| IntelliJ | 针对特定语言（如 Java）优化强 | 占用资源高，功能复杂 |

___

## 版本类型

以下是 Visual Studio Code 的主要版本类型及其特点对比：

| **版本名称** | **下载渠道** | **许可协议** | **主要特点** | **适合人群** |
| --- | --- | --- | --- | --- |
| **官方版** | [微软官网](https://code.visualstudio.com/) | 微软专有许可协议 | \- 官方支持  
\- 带有微软品牌和服务  
\- 内置遥测功能 | 需要稳定功能的普通用户和开发者 |
| **开源版（Code-OSS）** | [GitHub 源码](https://github.com/microsoft/vscode) | MIT 许可协议 | \- 完全开源  
\- 无微软品牌和遥测功能  
\- 需要手动构建 | 开源爱好者或对隐私有高要求的用户 |
| **VSCodium** | [VSCodium 官网](https://vscodium.com/) | MIT 许可协议 | \- 基于 Code-OSS 构建  
\- 去掉微软遥测功能  
\- 即装即用 | 需要无遥测的开源版本的用户 |
| **Insiders 版** | [VS Code Insiders](https://code.visualstudio.com/insiders/) | 微软专有许可协议 | \- 最新特性预览  
\- 每日构建，可能存在不稳定性 | 喜欢尝鲜的开发者，测试版功能用户 |
| **社区构建版** | 各开源社区提供 | 各社区指定协议 | \- 根据 Code-OSS 修改  
\- 添加社区特色功能 | 需要特定功能或自定义版本的用户 |
## 汉化
默认 VS Code 的界面上英文的，我们可以通过VS Code 的扩展市场安装中文包。

VS Code 有一个内置的扩展市场，提供了数千个由社区和微软官方提供的扩展。

接下来我们就在扩展市场中查找中文包，并安装。

VScode 安装汉化包很简单，打开 VScode，点击左侧安装扩展图标，在搜索框输入 Chinese：

![](https://www.runoob.com/wp-content/uploads/2024/12/32016a09-5531-47c3-ae66-5e9d6bb06ce8.png)

然后点击第一个搜索出来选项【Chinese (Simplified) (简体中文)】的 Install 按钮就可以：

![](https://www.runoob.com/wp-content/uploads/2024/12/67096301-7d51-4113-830d-15bf8494c504.png)

安装完成后，重启 VSCode，界面显示的就是中文了。

![](https://www.runoob.com/wp-content/uploads/2024/12/35946715-ee86-4827-9291-d17668319f2a.png)

## 快捷键
本章节是 Visual Studio Code (VS Code) 的常用快捷键大全，涵盖代码编辑、文件管理、调试等操作，便于提高开发效率。

快捷键的设置可以通过菜单栏的 Code > 首选项 > 键盘快捷方式 查看：

![](https://www.runoob.com/wp-content/uploads/2024/12/5d1419da-2f35-45b1-ab65-9a036b044b61.png)

通过快捷键编辑器，您可以根据自己的需求定制键盘快捷键，提升开发效率。

### 1\. **通用操作快捷键**

| 功能 | Windows/Linux |
| --- | --- |
| 打开命令面板 | `Ctrl + Shift + P` | 
| 打开设置 | `Ctrl + ,` | `Cmd + ,` |
| 打开终端 | `` Ctrl + ` `` | 
| 新建窗口 | `Ctrl + Shift + N` | 
| 关闭窗口 | `Ctrl + Shift + W` | 
| 保存文件 | `Ctrl + S` | 
| 全部保存 | `Ctrl + K S` |
| 自动保存切换 | `Ctrl + Shift + P` 后搜索 **Auto Save** | 
| 快速打开，转到文件 | `Ctrl + P` | 
| 键盘快捷键设置 | `Ctrl + K, Ctrl + S` | `Cmd + K, Cmd + S` |

___

### 2\. **文件与编辑器操作**

| 功能 | Windows/Linux | 
| --- | --- | 
| 新建文件 | `Ctrl + N` | `Cmd + N` |
| 打开文件 | `Ctrl + O` | `Cmd + O` |
| 保存文件 | `Ctrl + S` | `Cmd + S` |
| 另存为 | `Ctrl + Shift + S` | `Cmd + Shift + S` |
| 关闭文件 | `Ctrl + W` | `Cmd + W` |
| 关闭所有文件 | `Ctrl + K, Ctrl + W` | `Cmd + K, Cmd + W` |
| 重新打开关闭的文件 | `Ctrl + Shift + T` | `Cmd + Shift + T` |
| 打开文件夹 | `Ctrl+K O` | `Cmd+K O` |
| 上一个文件 | `Ctrl+Tab` | `Cmd+Tab` |
| 下一个文件 | `Ctrl+Shift+Tab` | `Cmd+Shift+Tab` |
| 切换编辑器布局 | `Alt+Shift+数字` | `Cmd+Option+数字` |
| 全屏切换 | `F11` | `Ctrl+Cmd+F` |

___

### 3\. **代码编辑快捷键**

| 功能 | Windows/Linux |
| --- | --- | 
| 撤销 | `Ctrl + Z` | `Cmd + Z` |
| 重做 | `Ctrl + Y` | `Cmd + Y` |
| 复制 | `Ctrl + C` | `Cmd + C` |
| 剪切 | `Ctrl + X` | `Cmd + X` |
| 粘贴 | `Ctrl + V` | `Cmd + V` |
| 查找 | `Ctrl + F` | `Cmd + F` |
| 替换 | `Ctrl + H` | `Cmd + H` |
| 全选 | `Ctrl + A` | `Cmd + A` |
| 格式化代码 | `Shift + Alt + F` | `Shift + Option + F` |
| 注释行 | `Ctrl + /` | `Cmd + /` |
| 多行注释 | `Shift + Alt + A` | `Shift + Option + A` |
| 复制当前行 | `Alt + Shift + Down` | `Option + Shift + Down` |
| 删除当前行 | `Ctrl + Shift + K` | `Cmd + Shift + K` |
| 移动当前行 | `Alt + Up/Down` | `Option + Up/Down` |
| 选中当前行 | `Ctrl + L` | `Cmd + L` |
| 查找替换 | `Ctrl + H` | `Cmd + Option + F` |
| 转到行号 | `Ctrl + G` | `Cmd + G` |
| 在下方插入行 | `Ctrl + Enter` | `Cmd + Enter` |
| 在上方插入行 | `Ctrl + Shift + Enter` | `Cmd + Shift + Enter` |
| 跳转到匹配的括号 | `Ctrl + \` | `Cmd + \` |
| 缩进/取消缩进 | `Ctrl + ] / [` | `Cmd + ] / [` |
| 转到行首/行尾 | `Home / End` | `Cmd + ← / →` |
| 转到文件开头/结尾 | `Ctrl + Home / End` | `Cmd + ↑ / ↓` |
| 折叠/展开区域 | `Ctrl + Shift + [ / ]` | `Option + Cmd + [ / ]` |
| 切换块注释 | `Shift + Alt + A` | `Option + Shift + A` |
| 切换自动换行 | `Alt + Z` | `Option + Z` |

___

### 4\. **多光标操作**

| 功能 | Windows/Linux | 
| --- | --- | 
| 插入光标 | `Alt + 点击` | `Option + 点击` |
| 在上方/下方插入光标 | `Ctrl + Alt + ↑ / ↓` | `Option + Cmd + ↑ / ↓` |
| 撤销上一个光标操作 | `Ctrl + U` | `Cmd + U` |
| 选择当前行 | `Ctrl + L` | `Cmd + L` |
| 选择所有匹配项 | `Ctrl + F2` | `Cmd + F2` |
| 列选择 | `Shift + Alt + 拖动` | `Shift + Option + 拖动` |
| 选中所有匹配内容 | `Ctrl + Shift + L` | `Cmd + Shift + L` |
| 选中下一个匹配 | `Ctrl + D` | `Cmd + D` |

___

### 5\. **调试快捷键**

| 功能 | Windows/Linux |
| --- | --- | 
| 开始调试 | `F5` | `F5` |
| 停止调试 | `Shift+F5` | `Shift+F5` |
| 步过 | `F10` | `F10` |
| 步入 | `F11` | `F11` |
| 步出 | `Shift+F11` | `Shift+F11` |
| 切换断点 | `F9` | `F9` |

___

### 6\. **搜索和导航**

| 功能 | Windows/Linux | 
| --- | --- | 
| 全局搜索 | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| 转到定义 | `F12` | `F12` |
| 转到声明 | `Ctrl+F12` | `Cmd+F12` |
| 查找引用 | `Shift+F12` | `Shift+F12` |
| 显示大纲 | `Ctrl+Shift+O` | `Cmd+Shift+O` |
| 跳转到上一个位置 | `Ctrl+Alt+Left` | `Cmd+Option+Left` |
| 跳转到下一个位置 | `Ctrl+Alt+Right` | `Cmd+Option+Right` |

___

### 7\. **版本控制**

| 功能 | Windows/Linux | 
| --- | --- | 
| 打开版本控制视图 | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| 提交代码 | `Ctrl+Enter` | `Cmd+Enter` |
| 查看变更 | `Ctrl+Shift+D` | `Cmd+Shift+D` |

___

### 8\. **终端操作**

| 功能 | Windows/Linux | 
| --- | --- | 
| 显示集成终端 | Ctrl + \` | Ctrl + \` |
| 新建终端 | ` Ctrl+Shift+`` ` | ` Cmd+Shift+`` ` |
| 切换终端 | `Ctrl+PageUp/PageDown` | `Cmd+PageUp/PageDown` |
| 关闭终端 | `Ctrl+Shift+W` | `Cmd+Shift+W` |

### 9\. 命令面板

| 操作 | Windows/Linux | 
| --- | --- | 
| 打开命令面板 | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| 打开键盘快捷键参考 | `Ctrl + K, Ctrl + S` | `Cmd + K, Cmd + S` |

### 10\. 显示

| **功能** | **Windows/Linux** | 
| --- | --- | 
| 切换全屏 | `F11` | 
| 放大/缩小 | `Ctrl + = / -` | `Cmd + = / -` |
| 切换侧边栏可见性 | `Ctrl + B` | `Cmd + B` |
| 显示资源管理器 | `Ctrl + Shift + E` | `Cmd + Shift + E` |
| 显示搜索 | `Ctrl + Shift + F` | `Cmd + Shift + F` |
| 显示源代码控制 | `Ctrl + Shift + G` | `Cmd + Shift + G` |
| 显示调试 | `Ctrl + Shift + D` | `Cmd + Shift + D` |
| 显示扩展 | `Ctrl + Shift + X` | `Cmd + Shift + X` |

### 11\. 扩展操作

| 操作 | Windows/Linux |
| --- | --- | --- |
| 安装扩展 | `Ctrl + Shift + X` | 
| 扩展管理 | `Ctrl + Shift + P` → 输入 "Extensions" | 

### 12\. 其他

| **功能** | **Windows/Linux** | 
| --- | --- | --- |
| 打开 Markdown 预览 | `Ctrl + K, V` | 
| 禅模式 | `Ctrl + K, Z` | 

___

## 官方提供的快捷键说明

### Windows 平台

![](https://www.runoob.com/wp-content/uploads/2024/12/keyboard-shortcuts-win.png)

### Linux 平台

![](https://www.runoob.com/wp-content/uploads/2024/12/keyboard-shortcuts-linux.png)

___

以上快捷键可以通过 **键绑定设置** 自定义。在 VS Code 中，按下 `Ctrl+K Ctrl+S`（macOS 上 `Cmd+K Cmd+S`）打开键绑定页面，方便查询和修改快捷键。

## AI Coding
VS Code 包含了很多 AI 编程的扩展，本文将介绍如何在 VS Code 中安装 TONGYI Lingma（通义灵码） 扩展。

TONGYI Lingma（通义灵码） 是阿里云推出的一款智能编程助手，基于通义大模型开发，旨在帮助开发者提高编程效率。

通义灵码支持多种编程语言，能够提供代码补全、代码解释、代码优化、智能问答等功能。

**官方说明参见：[https://lingma.aliyun.com/](https://click.aliyun.com/m/1000399802/)。**

### 安装

打开 Visual Studio Code 扩展窗口，搜索 TONGYI Lingma，找到通义灵码后单击安装。

安装完成后，请重启 Visual Studio Code。

![](https://www.runoob.com/wp-content/uploads/2024/12/pawmkwdq37c7s_54ff525d0675489ba707b9e718b41903.webp)

### 登录并开启智能编码之旅

重启 Visual Studio Code 后，单击侧边导航的通义灵码，在通义灵码助手的窗口单击登录按钮。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_6bc51781e88346209ad027470b302d1c.webp)

**提示：**如果安装后在侧边导航上找不到通义灵码入口，可鼠标聚焦在侧边导航后右键查看，勾选通义灵码后即可将插件入口配置在侧边导航上。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_ff7ed77548d649378a7380af910c573d.webp)

单击登录后，将前往登录页面，完成登录后可进入 IDE 客户端开始使用。登录相关具体操作，可参考：[登录通义灵码插件端](https://help.aliyun.com/zh/lingma/user-guide/installation-and-login-guide/?spm=a2c6h.12873639.article-detail.13.3065169b8envuu)。

___

## 功能展示

### 代码智能补全

#### 行级/函数级实时补全

当你在 IDE 编辑器区进行代码编写时，在开启自动云端生成的模式下，通义灵码会根据当前代码文件及相关代码文件的上下文，自动为你生成行级/函数级的代码建议，此时你可以使用快捷键采纳、废弃，或查看不同的代码建议。

同时，当你在编码的过程中，也可以通过快捷键 ⌥ P 手动触发生成代码建议。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_3a74e28397c348f999e102aaf726cb3e.webp)

编辑器中代码建议相关操作的快捷键如下：

| 操作 | macOS | Windows |
| --- | --- | --- |
| 接受行间代码建议 | `Tab` | `Tab` |
| 废弃行间代码建议 | `esc` | `esc` |
| 查看上一个行间推荐结果 | `⌥(option) [` | `Alt [` |
| 查看下一个行间推荐结果 | `⌥(option) ]` | `Alt ]` |
| 手动触发行间代码建议 | `⌥(option) P` | `Alt P` |

#### 自然语言生成代码

在编辑器中，可以直接通过自然语言的方式描述需要实现的需求，通义灵码可以在编辑器中生成代码建议，单击 Tab 可直接采纳。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_5b2b1a1277a44cc3895e8b1edfb1fe86.webp)

### 研发智能问答

使用通义灵码的智能问答时，为了通义灵码与你的对话能够更友好、高效，希望你能够在输入问题时：

-   选中代码，开始输入你的问题，通义灵码将围绕着选中代码与你开展对话；
-   精准表达问题，以及给出相对详细的上下文输入， 比如选中的代码、日志、报错信息等；
-   多多互动，告诉通义灵码，所给出代码建议或回答是否满足你的预期，或生成内容存在的具体瑕疵，通义灵码也会不断改进。

#### 研发自由问答

当你编码遇到问题，缺乏具体解决思路时，可单击 IDE 侧边工具导航或使用 ⌘ ⇧ L 唤起通义灵码智能问答助手，无需离开 IDE 客户端，即可快速获得答案和解决思路。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_b0448b34632f4ee1926e59b9aed8481a.webp)

#### 代码问答

当你对某段代码有疑问或期望针对代码进行一些问题解决时，选中代码后，在智能问答窗口的输入框中输入你的问题，通义灵码将围绕选中代码与你开展对话。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_fc0bcf1338a34865802eb9beafec4576.webp)

#### @workspace 本地工程问答

当你需要快速了解一个工程、查找工程内的实现逻辑，或有新的诉求需要进行代码变更时，可以在智能问答窗口中通过 @ 可唤起 @workspace，选中后输入你的问题或诉求，通义灵码可快速结合当前仓库进行工程理解、代码查询、代码问答等，同时可以通过自然语言描述需求，结合当前工程生成简单需求或缺陷的整体修改建议和相关建议代码。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_e372c885d37d4e4982fe7bd7cc386c87.webp)

#### @terminal 问答

当你遇到执行指令不知道如何写，或者不清楚某个指令的意思时，可以在智能问答窗口中通过 @ 可唤起 @terminal，选择后使用自然语言描述你的需要指令诉求，通义灵码将可以生成你需要的命令。生成指令后，你可以一键插入到 **teminal** 中进行执行或让通义灵码继续解释。当然，你也可以在选择 @terminal 后，输入指令让通义灵码生成指令解释。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_8dea5632e01e4fdca0f1c487d54b4b08.webp)

#### team docs 知识库问答（企业版）

当你需要结合企业内私域知识信息让通义灵码进行回答时，可以在智能问答窗口中通过 # 唤起 #team docs，并输入问题，通义灵码将结合企业知识库（当前用户有权限的知识库）对问题进行回答，在回复中也可以单击查看引用的企业知识库内容。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_64cd0d0b09b74bfea72b20ce94098b4a.webp)

清空会话上下文历史记忆

当你在会话中是，在智能问答输入框中输入 / 即可看到 /clear context 指令，选择后即可清空当前会话的上下文历史记忆。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_4b865a7c48ca459a8012383480ba7efe.webp)

#### 新建会话

在智能问答窗口中，单击右上角的新建按钮即可新建会话窗口，单击后会话窗口将回到默认状态。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_7f0dcd3af7074b9b9c2835ef1c94418a.webp)

#### 查看会话历史

历史会话功能帮助你检索和回顾与通义灵码的交流记录，方便针对多次的建议进行对比和选择。不管你在哪个 IDE 客户端上、哪个工程中，均可以查看或搜索你和通义灵码的历史会话。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_49e3ef48dd6b4161b924d894184484cc.webp)

___

## 智能生成指令

### 指令触发方式

通义灵码提供多处触发单元测试生成、代码解释、生成代码注释、代码优化功能的入口，当你选中的代码后，有 3 种触发方式：

1.  在编辑器中，单击右键找到通义灵码功能操作入口，单击对应功能操作；
2.  在智能问答中，直接单击对应功能操作；
3.  在智能问答中，使用 / 查看快捷指令，单击对应功能操作。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_8af9ea91e21d41a99bd23ba3822c9c95.webp)

当需要针对一个方法实现生成单元测试、代码注释、代码解释、代码优化时，无需选中代码，可直接单击函数上方的快捷入口触发相关功能操作。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_24cd99069e094a44aec500997e7700c1.webp)

### 选择指令后输入回答要求

当你选中代码后，并通过在智能问答窗口的输入框输入 / 的方式选中指令后，可以继续输入附加的要求，比如：

-   选择 /generate unit test 后，继续输入你对单元测试生成的要求，比如使用 JUnit 5 生成；
-   选择 /generate comment 后，继续输入生成注释的要求，比如开头标明日期，并用英文注释。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_5323d205adb14d0bb78be373255eed73.webp)

### 指令一：解释代码

覆盖各种编程语言，选中代码后可自动识别编程语言并生成代码解释。跨越语言的边界，让你阅读代码更高效。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_c5770f4780364f9d876335d6a442dd8b.webp)

### 指令二：生成单元测试

支持根据 JUnit、Mockito、Spring Test、unit test、pytest 等框架生成单元测试。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_9639982245e44c1cb5c2c8f894830bac.webp)

### 指令三：生成注释

一键生成方法注释及行间注释，节省你写代码注释的时间，并能够有效提升代码可读性。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_e1c32b78b57e405799d6c3f83adeb420.webp)

### 指令四：代码优化

深度分析代码及其上下文，迅速识别潜在的编码问题，从简单的语法错误到复杂的性能瓶颈，均能够指出问题所在，并提供具体的优化建议代码。

![](https://www.runoob.com/wp-content/uploads/2025/01/pawmkwdq37c7s_1cdeaf423f8044f88a719d1b60c34231.webp)

## 界面设定
## 1、启动页面

在完成 VSCode 安装后，点击 VSCode 图标，启动界面如下所示：

![](https://www.runoob.com/wp-content/uploads/2021/08/349FE7BD-1052-4FB4-8332-7099D75FF66B-scaled.jpeg)

上图展示了 Visual Studio Code（VS Code）的欢迎界面，它是一个代码编辑器的起始页，提供了快速访问不同功能和资源的入口。

以下是图片中各个部分的说明：

**活动栏（Activity Bar）**：

-   位于左侧，包含多个图标，每个图标代表 VS Code 的一个功能视图。
-   图片中用红色箭头标注了四个功能：
    -   **文档管理**：可能是指资源管理器，用于管理文件和文件夹。
    -   **搜索**：用于在整个工作区中搜索文件或文本。
    -   **版本控制**：通常与Git集成，用于代码版本管理。
    -   **debug调试**：用于启动调试会话，进行代码调试。

**启动（Start）**：

-   位于活动栏上方，包含常用功能的快捷方式。
-   图片中用红色方框标注了三个选项：
    -   **新建文件**：创建一个新的文件。
    -   **打开...**：打开一个文件或文件夹。
    -   **运行命令...**：使用命令面板执行命令。

**最近打开的目录（最近）**：

-   显示了最近打开的文件夹列表，方便快速切换到之前的工作目录。
-   图片中用红色方框标注了最近打开的目录，例如"runoob-test"。

**演练（Tutorial）**：

-   位于欢迎界面的右侧，提供了一些快速链接，帮助用户了解和使用VS Code。
-   图片中用红色方框标注了三个链接：
    -   **开始使用 VS Code**：提供自定义方法和使用专属VS Code的指导。
    -   **了解基础知识**：链接到VS Code的基础知识，帮助用户了解必备功能。
    -   **提高工作效率**：提供提高使用VS Code效率的建议。

**vscode文档**：

-   位于演练部分的上方，可能是指向 VS Code 官方文档的链接。

## 2、编辑页面

打开或编辑一个代码的界面如下所示：

![](https://www.runoob.com/wp-content/uploads/2024/12/3a8f3097-8bbe-4fd5-8de6-d464d9da58e0.png)

### 活动栏与侧边栏

界面左侧，通过图标切换不同的功能模块：

![](https://www.runoob.com/wp-content/uploads/2024/12/42197912-e62c-4106-884b-b2f79d366248.png)

-   **资源管理器（第一个图标）**：在图片中显示了项目文件结构，其中包含：
    -   `RUNOOB-TEST` 文件夹：当前工作区的项目文件夹。
    -   `test.html` 文件：当前正在编辑的 HTML 文件。
-   **搜索（第二个图标）**：用于全局搜索文件内容（未激活）。
-   **源代码管理（第三个图标）**：显示 Git 状态，方便管理代码版本。
-   **运行和调试（第四个图标）**：可以设置断点并运行代码。
-   **扩展（第五个图标）**：用于安装和管理插件。

紧邻活动栏右侧，展示当前功能模块的具体内容：

-   当前显示的是 **资源管理器**。
-   项目结构清晰展示，包括：
    -   `RUNOOB-TEST` 文件夹中的所有文件。
    -   当前正在编辑的文件 `test.html`。

### 编辑区

位于界面中间，用于显示和编辑文件内容：

![](https://www.runoob.com/wp-content/uploads/2024/12/c20ba2f7-89f1-41bc-a4c6-395447cac026.png)

-   编辑区域显示 `test.html` 文件的代码。
-   支持语法高亮（如 `DOCTYPE html` 和 `<h1>` 标签）。
-   光标定位在第 11 行（底部状态栏显示"行 11"）。

### 状态栏

位于底部，显示当前文件和编辑环境的信息：

![](https://www.runoob.com/wp-content/uploads/2024/12/1a10e240-72e7-4a5c-a4d2-1a3eb973c5dd.png)

-   **Git 状态**：当前分支为 `main`（左下角）。
-   **文件信息**：
    -   编码格式：UTF-8。
    -   行尾序列：LF。
    -   当前文件类型：HTML。
-   **终端状态**：显示当前打开的终端类型为 `zsh`。
## 编写代码
VS Code 内置了对 JavaScript、TypeScript、HTML、CSS 等多种语言的支持。

在本章节中，我们将创建一个 JavaScript 代码文件，并使用 VS Code 提供的一些代码编辑功能。

VS Code 支持多种编程语言，在后面的章节中，我们还会安装 [Python 的语言扩展](https://www.runoob.com/vscode/vscode-extensions.html)，为其他语言添加支持。

### 1、创建 JavaScript 文件并编写代码

在资源管理器（Explorer）视图中，创建一个名为 app.js 的新文件，并输入以下 JavaScript 代码：

## 实例

function sayHello(name) {  
  console.log('Hello, ' + name);  
}

sayHello('VS Code');

**代码自动补全（IntelliSense）：**当您开始输入代码时，会弹出代码补全建议，使用方向键 ↑ 或 ↓（上下键） 导航建议项，按 Tab 键选择并插入选中的建议。

**语法高亮：**注意代码的格式化显示（语法高亮），这有助于区分代码的不同部分，提高可读性。

![](https://www.runoob.com/wp-content/uploads/2024/12/javascript-intellisense.gif)

### 使用代码操作（Code Actions）

将光标放在字符串 'Hello,' 上时，您会看到一个小灯泡图标，表示可以应用代码操作（Code Action）。

您也可以使用快捷键 ⌃Space 打开灯泡菜单。

点击灯泡图标，然后选择 Convert to template string（转换为模板字符串）。

![](https://www.runoob.com/wp-content/uploads/2024/12/code-action-template-string.png)

代码操作为您的代码提供了快速修复建议。

在本例中，Code Action 将字符串拼接：

```
<span>"Hello, "</span><span> </span><span>+</span><span> name</span>
```

转换为模板字符串：

```
<span>`Hello, ${name}`</span>
```

模板字符串是 JavaScript 中一种特殊的语法，可以在字符串中嵌入表达式。

转化后的代码如下：

![](https://www.runoob.com/wp-content/uploads/2024/12/8ba7d8e0-91e0-4dee-bb37-1fd7fa7ee896.png)
## 安装扩展
VS Code 的扩展功能和市场是其强大和灵活的核心特性之一，允许用户通过安装各种扩展来增强和定制编辑器的功能。

VS Code 拥有丰富的扩展生态系统，允许您为安装添加语言支持、调试器和工具，以适应您的特定开发工作流程。

在 Visual Studio Marketplace 中，有成千上万的扩展可供选择：

-   **编程语言支持：**提供特定语言的语法高亮、代码补全、智能提示等功能。
-   **调试工具：**扩展VS Code的调试功能，支持更多语言和环境。
-   **版本控制：**提供更好的Git集成，如GitLens这样的扩展，增强代码版本控制能力。
-   **主题和美化：**改变编辑器的视觉风格，包括主题、图标、字体等，提高编码环境的个性化。
-   **工具集成：**集成其他开发工具和平台的功能，例如容器工具、云服务管理等。
-   **辅助开发：**提供API文档、代码片段、快速修复建议等辅助开发功能。

VS Code 扩展市场：[https://marketplace.visualstudio.com/](https://marketplace.visualstudio.com/)

![](https://www.runoob.com/wp-content/uploads/2024/12/264e2362-30b7-458b-92e2-7bdff78d3e29.png)

接下来，我们安装一个语言扩展，为 Python 或其他您感兴趣的编程语言添加支持。

### 1、打开扩展视图

选择 **活动栏（Activity Bar）** 中的 **扩展视图（Extensions View）** 图标。

扩展视图可以让您直接在 VS Code 中浏览和安装扩展。

![](https://www.runoob.com/wp-content/uploads/2024/12/extensions-view.png)

### 2、安装 Python 扩展

在扩展视图的搜索框中输入 Python，以浏览与 Python 相关的扩展。

选择由 Microsoft 发布的 Python 扩展，然后点击 Install（安装） 按钮。

![](https://www.runoob.com/wp-content/uploads/2024/12/extensions-search-python.png)

### 3、编写 Python 代码

在工作区中创建一个新的 Python 文件，命名为 hello.py。

开始输入以下 Python 代码：

## 实例

def say\_hello(name):  
    print("Hello, " + name)

say\_hello("VS Code")

**注意：**现在您也可以为 Python 代码获得 代码建议（Suggestions） 和 智能感知（IntelliSense）。

![](https://www.runoob.com/wp-content/uploads/2024/12/python-intellisense.gif)

智能感知（IntelliSense） 提供代码补全、语法高亮等功能，帮助您更高效地编写代码。

通过安装扩展，您可以根据需求扩展 VS Code 的功能，从而更好地支持各种编程语言！
## 集成终端
VS Code 内置了集成终端，我们可以在菜单栏上选择"终端"选项，然后选择"新建终端"：

![](https://www.runoob.com/wp-content/uploads/2024/12/25d0ae2d-4f1d-410e-a07d-09d1b3fa42a5.png)

也可以选择目录下的文件，右击，在下拉菜单选择"在集成终端打开"：

![](https://www.runoob.com/wp-content/uploads/2024/12/dd6abbe3-2755-4843-9dc2-b553f2c00afc.png)

**终端快捷键：**

| 功能 | Windows/Linux | macOS |
| --- | --- | --- |
| 显示集成终端 | Ctrl + \` | Ctrl + \` |
| 新建终端 | ` Ctrl+Shift+`` ` | ` Cmd+Shift+`` ` |
| 切换终端 | `Ctrl+PageUp/PageDown` | `Cmd+PageUp/PageDown` |
| 关闭终端 | `Ctrl+Shift+W` | `Cmd+Shift+W` |

根据操作系统的不同，我们可以选择不同的终端环境，例如 PowerShell、命令提示符（Command Prompt）、或 Bash。

![](https://www.runoob.com/wp-content/uploads/2024/12/vscode-panel.png)

在终端中输入以下命令，创建一个新的文件 greetings.txt：

```
<span>echo </span><span>"Hello, VS Code"</span><span> </span><span>&gt;</span><span> greetings</span><span>.</span><span>txt</span>
```

工作区的默认文件夹是当前项目的根目录。

创建文件后，"资源管理器（Explorer）"会自动显示新文件。

![](https://www.runoob.com/wp-content/uploads/2024/12/terminal-new-file.png)

我们可以同时打开多个终端，点击终端右上角的"启动配置（Launch Profile）"下拉菜单，查看可用的终端环境并选择。

![](https://www.runoob.com/wp-content/uploads/2024/12/terminal-launch-profile.png)

___

## 使用终端运行命令

终端会打开一个默认的 Shell，如 Bash、PowerShell 或 Zsh，终端的工作目录会从工作区文件夹的根目录开始。

![](https://www.runoob.com/wp-content/uploads/2024/12/open-terminal.png)

输入类似 ls 或 dir 这样的基本命令来列出当前目录下的文件。

终端会直接显示命令的输出内容：

![](https://www.runoob.com/wp-content/uploads/2024/12/terminal-output.png)

### 与命令输出交互

VS Code 中的终端还提供了与命令输出交互的功能，命令通常会输出文件路径或 URL，你可能希望直接打开或跳转到这些链接。

例如，编译器或代码检查工具可能会返回一个包含文件路径和行号的错误信息。你不需要手动去搜索该文件，只需在终端输出中选择该链接即可直接在编辑器中打开文件。

让我们看看如何与终端中的命令输出进行交互：

1.  打开你之前运行过 `ls` 或 `dir` 命令的终端。
2.  在终端中，按住 `Ctrl/Cmd` 键，将鼠标悬停在文件名上，然后选择该链接。

![](https://www.runoob.com/wp-content/uploads/2024/12/terminal-links.png)

注意，当你将鼠标悬停在输出中的文本上时，它会变成一个链接。

当你选择文件名时，VS Code 会在编辑器中打开选定的文件。

终端输出中的所有文本都是可以点击的，如果你选择终端中的超链接，它会在默认浏览器中打开链接。

### 创建一个包含可用 Shell 命令的 Command.txt 文件

在 PowerShell 中：

```
<span>Get</span><span>-</span><span>Command</span><span> </span><span>|</span><span> </span><span>Out</span><span>-</span><span>File</span><span> </span><span>-</span><span>FilePath</span><span> </span><span>.</span><span>\Command</span><span>.</span><span>txt</span>
```

在 Bash / Zsh 中：

```
<span>ls </span><span>-</span><span>l </span><span>/</span><span>usr</span><span>/</span><span>bin </span><span>&gt;</span><span> </span><span>Command</span><span>.</span><span>txt</span>
```

输入以下命令以搜索 Command.txt 文件中的命令：

在 PowerShell 中：

```
<span>Get</span><span>-</span><span>ChildItem</span><span> </span><span>*.</span><span>txt </span><span>|</span><span> </span><span>Select</span><span>-</span><span>String</span><span> </span><span>"dir"</span>
```

在 Bash / Zsh 中：

```
<span>grep </span><span>-</span><span>n </span><span>"dir"</span><span> </span><span>*.</span><span>txt</span>
```

注意，命令输出中会包含文件名和找到搜索结果的行号，终端会将这些文本识别为链接。

选择其中一个链接，可以在编辑器中打开该文件，并跳转到文件中的特定行。

![](https://www.runoob.com/wp-content/uploads/2024/12/terminal-line-column.png)

### 浏览历史命令

在使用终端时，我们可能需要查看之前的命令及其输出，或者可能想重新运行某个命令。

我们可以使用快捷键快速浏览历史命令：按下 `Ctrl + ↑` 或 `⌘ + ↑` 快捷键，向上滚动至终端历史记录中的上一条命令。

![](https://www.runoob.com/wp-content/uploads/2024/12/previous-command.png)

如果你多次按下 `Ctrl + ↑`，终端会继续向上滚动历史记录。你也可以使用 `Ctrl + ↓` 快捷键向下浏览历史记录。

最好我们会看到一个圆形图标出现在某个已运行命令旁边，选择该圆形图标，然后选择"重新运行命令"来重新执行该命令。

![](https://www.runoob.com/wp-content/uploads/2024/12/rerun-command.png)

### 不同 Shell 中运行命令

终端支持同时打开多个终端。

例如，我们可以将一个终端用于运行 Git 命令，另一个终端用于运行构建脚本。

在不同 Shell 中添加新终端：选择终端面板中的 ˅ 图标以打开终端下拉菜单，然后从可用的 Shell 中选择一个。

![](https://www.runoob.com/wp-content/uploads/2024/12/select-shell.png)

**注意：** 可用的 Shell 取决于你电脑上安装的 Shell。

新终端会以你选择的 Shell 打开，你可以像之前一样输入命令。

![](https://www.runoob.com/wp-content/uploads/2024/12/terminal-list.png)

**提示：** 你也可以选择 + 图标来为默认 Shell 创建新终端，使用快捷键 `⌃⇧`（Ctrl + Shift + \`），或者从菜单栏选择 **终端** > **新终端** 来创建新终端。

我们还可以将终端从终端列表拖动到编辑器区域。

例如，我们将终端标签拖出 VS Code 窗口，使其成为浮动窗口。

![](https://www.runoob.com/wp-content/uploads/2024/12/move-terminal.png)

**将终端移动到编辑器区域：**当你将鼠标悬停在终端列表上时，选择垃圾桶图标来关闭已打开的终端。

![](https://www.runoob.com/wp-content/uploads/2024/12/close-terminal.png)