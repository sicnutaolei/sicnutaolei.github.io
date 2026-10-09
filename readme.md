本机博客源目录：`D:\hexo\backup\sicnutaolei.github.io`

**部署规范和日常操作流程见 [DEPLOY.md](DEPLOY.md)。** 一句话版本：写完文章跑 `npm run publish -- -m "说明"`，本地不要执行 `hexo g -d`。

## 本机命令

| 命令 | 作用 |
|---|---|
| `npm run new -- 标题` | 新建文章（本机没有全局 hexo，别直接敲 `hexo new`） |
| `npm run publish` | 一键发文：摘要 + 热力图数据 + 构建自检 + 推送 + 盯 CI |
| `npm run gen:ai` | 只补文章 AI 摘要（增量，需 `DOTS_API_KEY` 环境变量） |
| `npm run gen:contrib` | 只刷新关于页贡献热力图数据（需本机 `gh` 已登录） |
| `npm run server` | 本地预览 |
| `npm run clean` / `npm run build` | 手动清理 / 构建（产物不提交） |

## 结构速览

- `source/_posts/` 文章；front-matter 的 `description` 是卡片摘要，由 AI 生成
- `source/_data/link.yml` 友链数据，由审批通过的 Issue 自动写入
- `source/data/contrib.json` 热力图数据，本地生成后提交
- `source/js/` `tools/` 自定义脚本与构建辅助脚本（`scripts/` 是 Hexo 自动加载目录，不要往那儿放）
- `.github/workflows/` 部署与友链自动化
