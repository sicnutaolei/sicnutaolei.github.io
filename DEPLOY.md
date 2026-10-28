# 部署规范

本仓库是 Hexo 博客源。**本地不再生成、也不再部署**，构建与发布全部由 GitHub Actions 负责。

## 分支模型

| 分支 | 内容 | 谁来写 |
|---|---|---|
| `hexo`（默认分支） | 站点源文件、主题配置、workflow | 你 + 友链机器人 |
| `master` | 构建产物，GitHub Pages 从这里根目录发布 | 只有 `deploy.yml` |

Pages 设置指向 `master`，切默认分支或改 Pages 来源会让站点直接下线（2026 年初那次"荒废"就是这么来的）。

## 本机没有全局 hexo

这台机器上**没有安装全局 `hexo`**，直接敲 `hexo new` 会报"不是内部或外部命令"。Hexo 是仓库的本地依赖（`hexo@7.3.0`，自带 `hexo-cli@4.3.2`），有两种正确用法：

```powershell
npm run new -- 文章标题       # 推荐，已加进 package.json
npx hexo new 文章标题          # 等价，npx 会用 node_modules/.bin 里的 hexo
```

npm 脚本里可以直接写裸 `hexo`（npm 会把 `node_modules/.bin` 临时加入 PATH），所以 `npm run build` / `npm run server` / `npm run clean` 都能正常工作。想彻底摆脱 `npx`/`npm run` 前缀，可以自行 `npm i -g hexo-cli`，但没有任何必要。

## 日常发文

```powershell
npm run new -- 文章标题
$env:DOTS_API_KEY = "<你的 Dots key>"   # 可选，不设就跳过摘要
npm run publish -- -m "记录了 xxx"
```

`tools/publish.mjs` 依次做六件事：查工作区并拦截半成品草稿 → 生成 AI 摘要（增量）→ 刷新贡献热力图数据 → 本地构建自检 → 提交并 `pull --rebase` 后推送 → 盯 CI 直到部署完成。

其它参数：`--dry` 只演练不写不推；`--skip-ai` / `--skip-contrib` 跳过对应步骤；`--force` 见下；不带 `-m` 时用时间戳做提交信息。

### 摘要显示在哪里

`description` 有两个落点：首页/归档页的卡片摘要（主题 `index_post_content.method: 2` 决定），以及**文章正文顶部的「AI 摘要」块**——后者由 `scripts/ai-abstract.js` 在渲染后注入，样式在 `source/css/ai-abstract.css`，通过 `_config.butterfly.yml` 的 `inject.head` 挂载。Butterfly 原生不会把 `description` 显示在正文里，别以为改个配置就有了。

没写 `description` 的文章不会渲染这个块，页面保持原样。这个目录是 Hexo 的自动加载目录且必须是 CommonJS，别往里塞 `.mjs`。

### 草稿保护

发布脚本内部用 `git add -A`，会把工作区里的一切一并提交，所以必须有这道闸：**凡本次涉及的文章，去掉 front-matter 后正文不足 60 字的直接中止**，并列出是哪几篇、各有多少字。确实要发布草稿时再加 `--force`，阈值可用 `--min-body 200` 调高。`npm run gen:ai` 里有同样判定，不会给空草稿白烧 tokens。

之所以要盯死这一条：2026-10-09 那次发布比你建草稿只早了 8 秒，差一点那篇 7 行的空模板就被推上线了。

**CI 里还有第二道同样的闸**（`tools/check-drafts.mjs`，扫描 `source/_posts` 全部文章），因为手机端直接推仓库、绕过了本地脚本。它一旦拦下，`master` 保持上一个正常版本，站点不会坏，但新文章不会上线。

## 在手机上发表

技术栈是两个现成 App，不改任何代码：**Markor**（Markdown 编辑器）+ **GitSync**（git 客户端），都在 F-Droid。

### 一次性配置

1. GitSync 新建仓库：地址 `https://github.com/sicnutaolei/sicnutaolei.github.io.git`，分支选 **`hexo`**（不是 master），本地目录放共享存储，例如 `/storage/emulated/0/Documents/hexo`。
2. 认证用 **fine-grained PAT，只授权这一个仓库的 `Contents: Read and write`**。不要用 classic token（那会拿到你所有仓库的写权限），也不用 SSH。
3. 授予 GitSync「所有文件访问」权限，否则 Markor 看不到 clone 出来的目录。
4. Markor 的 Notebook 指向 `<clone>/source/_posts`。
5. Markor 设置里把 **Attachment folder name 设为 `assets`**。留空会把图片散在 `_posts` 根，脚本虽然也能兜住，但目录会越来越乱。

模板放在 `source/_posts/.template.md`（已被 gitignore）：

```markdown
---
title:
date: 2026-01-01 12:00:00
tags: []
---
```

`date` 要手填、**不带时区**，和现有文章保持一致。别省略它：Hexo 在没有 `date` 时会退回用文件修改时间，而 CI 每次 checkout 都会把文件时间刷成构建当天，文章日期就会全变成构建日期。

### 每次发文

1. GitSync 先 **pull**。
2. Markor 新建文件（**文件名就是 URL 里 `:title` 那一段**，所以别用带 `/ : ?` 的名字），填 title/date，写正文，插图。
3. GitSync **手动** commit + push。
4. 等 Actions 绿、Pages 重建，约一分钟。

手机端**不要开** GitSync 的"App 打开/关闭自动同步"：Markor 边写边落盘，自动同步会提交半截内容、在编辑途中触发冲突，而 GitSync 没有 rebase，只会越滚越多 merge commit。

手机上也不要碰 `source/_data/link.yml` 和 `source/data/contrib.json`：前者由友链机器人写，后者由桌面 `gh` 生成，改了只会制造冲突。

### 手机插图怎么落到 Hexo 期望的位置

`post_asset_folder: true` 已开启，Hexo 把 `source/_posts/<文章名>/` 当作该文章的资源目录；而 Markor 把图片存在 `source/_posts/assets/`。这中间的落差由 `tools/pull-post-assets.mjs` 在**构建前**补齐：扫描每篇文章的相对图片引用，只**复制**到 `source/_posts/<文章名>/<相对路径>`，不改写任何 Markdown，副本已在 `.gitignore` 中排除。

所以 `source/_posts/assets/` 是唯一真源，正常提交即可；也可单独跑 `npm run assets:fix`。相对路径找不到源文件时脚本直接失败（`--warn` 可容忍）——宁可在构建阶段报错，也不要静默发一篇裂图的文章。代码块里的示例不会被当成真实引用。

已知限制：手机发的文章**没有 AI 摘要**（key 只存在本机、不进 CI），卡片回退成正文截断，正文顶部也没有「AI 摘要」块。哪天在电脑上跑一次 `npm run gen:ai` 就会自动补齐（该脚本是增量的）。

## CI 做的和不做

`.github/workflows/deploy.yml` 在 `hexo` 分支被推送时跑 `npm ci` → **草稿校验** → **图片资源归位** → `hexo generate` → 把 `public/` 发布到 `master`（提交信息带 `[skip ci]`，只监听 `hexo`，两边不会互相触发）。全程使用内置 `GITHUB_TOKEN`，**仓库里没有任何 secrets**——AI 摘要的 key 不在 CI 里，这是刻意的。

关于页的贡献热力图数据 `source/data/contrib.json` **不在 CI 里生成**：CI 的 token 是仓库应用身份，查 `viewer.contributionsCollection` 拿不到你的个人贡献。它必须在本地生成后随源码提交，所以热力图的新鲜度等于你上次桌面发布的时间。想单独刷新：`npm run gen:contrib`。

## 友链申请怎么审

访客走导航栏「申请友链」提交 Issue（模板 `.github/ISSUE_TEMPLATE/friend-request.yml`）。机器人 `friend-link.yml` 只做校验并回帖结论——地址格式、站点可达性、介绍字数、是否确认回链、是否重复。

**你只需要做一件事**：看回帖觉得没问题，就在该 Issue 右侧标签里加 `approved`。机器人随即把条目写入 `source/_data/link.yml`、提交回 `hexo`、关闭 Issue，并**显式 `workflow_dispatch` 触发一次重建**。不打标签就永远不上墙。

这里有个 GitHub 的坑值得记：用内置 `GITHUB_TOKEN` 发起的 push **不会触发下游 workflow**（官方防递归规则），所以光靠"推了就会自动构建"是等不到的——必须 dispatch。`workflow_dispatch` 是唯一不受该限制约束的触发方式。

被拒或重复的申请不会污染数据，你直接关闭即可。想线下手工加友链：编辑 `source/_data/link.yml` 后正常发布。

注意：机器人会往 `hexo` 分支提交，你本地那份会变旧，**push 前先 `git pull --rebase`**（`npm run publish` 已经内置这一步，不会忘）。

## 排查

- **页面输出成一堆未编译的 Pug 源码，但 `hexo generate` 报成功**：Syncthing 把 `node_modules` 同步坏了（子依赖只剩空目录）。`npm install` 比对 lockfile 后只会说 "up to date"，检测不到。必须 `rm -rf node_modules; npm ci`。
- **CI 失败**：`gh run list --limit 3` 找到 run id，`gh run view <id> --log-failed` 看第一段报错。
- **CI 绿了但站点没变**：Pages 还在重建，一般 30~60 秒；`gh api repos/sicnutaolei/sicnutaolei.github.io/pages --jq .status` 应为 `built`。
- **构建脚本报 `ERROR Script load failed`**：`scripts/` 是 Hexo 自动加载目录，它按 CommonJS 解析，放 ESM 文件会静默失败。所有辅助脚本一律放 `tools/`。
- **手机发的文章图裂**：相对图片必须能被 `tools/pull-post-assets.mjs` 找到源文件。检查图片是否真的提交到了 `source/_posts/assets/`，或本地跑一次 `npm run assets:fix` 看报错。若报"缺失"而你想先发出去，用 `node tools/pull-post-assets.mjs --warn`。
- **手机发的文章没有摘要**：这是预期行为，见上文「在手机上发表」；回电脑跑 `npm run gen:ai` 补齐。
- **改了 `post_asset_folder` / `marked` 却不确定有没有影响老文章**：比对构建产物时注意有三处**每次构建都会变**的随机内容——随机封面 seed（`random_cover.js`）、`data-lastPushDate` 构建时间戳、marked 对 mailto 链接的随机实体编码。不归一化这三项就比对，会把它们误判成回归。

## 回滚

站点内容回滚：`git revert` 相应提交并推送，CI 会重新发布。
紧急恢复到上一次线上版本：`master` 由 CI 强制更新，直接 `git log hexo` 找到上一个正常提交，`git revert` 到它再推送即可。
摘要质量回滚：删掉某篇 front-matter 里的 `description` 行并推送，卡片会自动回退成截断正文。

## 当前遗留

- Issue 更新通知（新文章在固定 Issue 留言供读者订阅）——已搁置，未实现。
- 友链自动化尚未在 CI 里端到端跑过，脚本逻辑已本地验证。
- 124 张正文图片全是外链；`avatar` / `favicon` / `default_top_img` / `index_img` 仍在 `s21.ax1x.com`。都属于长期失效风险，尚未处理。
- Dependabot 报 64 条依赖漏洞，均为 dev 依赖噪音，静态站实际风险低。
