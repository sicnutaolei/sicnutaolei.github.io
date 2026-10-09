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

`tools/publish.mjs` 依次做六件事：查工作区 → 生成 AI 摘要（增量）→ 刷新贡献热力图数据 → 本地构建自检 → 提交并 `pull --rebase` 后推送 → 盯 CI 直到部署完成。

其它参数：`--dry` 只演练不写不推；`--skip-ai` / `--skip-contrib` 跳过对应步骤；不带 `-m` 时用时间戳做提交信息。

## CI 做的和不做

`.github/workflows/deploy.yml` 在 `hexo` 分支被推送时跑 `npm ci` → `hexo generate` → 把 `public/` 发布到 `master`（提交信息带 `[skip ci]`，只监听 `hexo`，两边不会互相触发）。全程使用内置 `GITHUB_TOKEN`，**仓库里没有任何 secrets**。

关于页的贡献热力图数据 `source/data/contrib.json` **不在 CI 里生成**：CI 的 token 是仓库应用身份，查 `viewer.contributionsCollection` 拿不到你的个人贡献。它必须在本地生成后随源码提交，所以热力图的新鲜度等于你上次发布的时间。想单独刷新：`npm run gen:contrib`。

## 友链申请怎么审

访客走导航栏「申请友链」提交 Issue（模板 `.github/ISSUE_TEMPLATE/friend-request.yml`）。机器人 `friend-link.yml` 只做校验并回帖结论——地址格式、站点可达性、介绍字数、是否确认回链、是否重复。

**你只需要做一件事**：看回帖觉得没问题，就在该 Issue 右侧标签里加 `approved`。机器人随即把条目写入 `source/_data/link.yml`、提交回 `hexo`、自动关闭 Issue，并触发重建。不打标签就永远不上墙。

被拒或重复的申请不会污染数据，你直接关闭即可。想线下手工加友链：编辑 `source/_data/link.yml` 后正常发布。

注意：机器人会往 `hexo` 分支提交，你本地那份会变旧，**push 前先 `git pull --rebase`**（`npm run publish` 已经内置这一步，不会忘）。

## 排查

- **页面输出成一堆未编译的 Pug 源码，但 `hexo generate` 报成功**：Syncthing 把 `node_modules` 同步坏了（子依赖只剩空目录）。`npm install` 比对 lockfile 后只会说 "up to date"，检测不到。必须 `rm -rf node_modules; npm ci`。
- **CI 失败**：`gh run list --limit 3` 找到 run id，`gh run view <id> --log-failed` 看第一段报错。
- **CI 绿了但站点没变**：Pages 还在重建，一般 30~60 秒；`gh api repos/sicnutaolei/sicnutaolei.github.io/pages --jq .status` 应为 `built`。
- **构建脚本报 `ERROR Script load failed`**：`scripts/` 是 Hexo 自动加载目录，它按 CommonJS 解析，放 ESM 文件会静默失败。所有辅助脚本一律放 `tools/`。

## 回滚

站点内容回滚：`git revert` 相应提交并推送，CI 会重新发布。
紧急恢复到上一次线上版本：`master` 由 CI 强制更新，直接 `git log hexo` 找到上一个正常提交，`git revert` 到它再推送即可。
摘要质量回滚：删掉某篇 front-matter 里的 `description` 行并推送，卡片会自动回退成截断正文。

## 当前遗留

- Issue 更新通知（新文章在固定 Issue 留言供读者订阅）——已搁置，未实现。
- 友链自动化尚未在 CI 里端到端跑过，脚本逻辑已本地验证。
- 124 张正文图片全是外链；`avatar` / `favicon` / `default_top_img` / `index_img` 仍在 `s21.ax1x.com`。都属于长期失效风险，尚未处理。
- Dependabot 报 64 条依赖漏洞，均为 dev 依赖噪音，静态站实际风险低。
