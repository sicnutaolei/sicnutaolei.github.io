## 本机使用方法提示

目录：`D:\hexo\backup\sicnutaolei.github.io`，源分支 `hexo`，成品分支 `master`。

**自 2026-10-09 起，站点构建与上线由 GitHub Actions 负责，本地不再执行 `hexo g -d`。**
往 `hexo` 分支推送任何内容，都会触发 `.github/workflows/deploy.yml` 自动构建并把产物发布到 `master`。

日常发文：

1. `hexo new 文章标题` 新建文章
2. 写完可选生成摘要：`$env:DOTS_API_KEY="<key>"; npm run gen:ai`（只处理 front-matter 里还没有 `description` 的篇目，已有则跳过；`--dry` 只看结果不落盘，`--force` 覆盖重写，`--limit N` 试水前 N 篇）
3. `git add .` → `git commit -m "..."` → `git push origin hexo`
4. 到 Actions 页面看构建结果，一两分钟后刷新站点

其它常用命令：

- `npm run gen:contrib` 刷新关于页贡献热力图数据（需要本机 `gh` 已登录；CI 里的 token 查不到个人贡献，所以只能本地跑。跑完记得一起提交 `source/data/contrib.json`）
- `npm run server` 本地预览
- 若 `hexo generate` 输出的页面是一堆未编译的 Pug 源码，说明 Syncthing 把 `node_modules` 同步坏了。`npm install` 检测不到，必须 `rm -rf node_modules && npm ci`

## 友链申请

访客通过导航栏「申请友链」提交 Issue（模板 `.github/ISSUE_TEMPLATE/friend-request.yml`）。
机器人 `friend-link.yml` 只做校验并回帖，**必须由你给该 Issue 打上 `approved` 标签才会真正写入** `source/_data/link.yml` 并触发重建。
本地手动处理某个 Issue 正文：`node tools/friend-from-issue.mjs --body-file 文件`（加 `--apply` 才写入）。

## 已知遗留

- 主题里 `avatar` / `favicon` / `default_top_img` / `index_img` 仍指向 `s21.ax1x.com` 免费图床，目前可用，但它和当初暴雷的 `i.111666.best` 是同一类脆弱源。
- 文章正文图片全部是外链（共 124 张，`post_asset_folder: false`），是长期失效风险，尚未本地化。
- 更新通知（新文章自动在固定 Issue 留言、读者订阅收邮件）尚未实现。
