// 一键发文：检查 -> 摘要 -> 刷新热力图 -> 提交推送 -> 盯 CI 上线
// 用法：
//   npm run publish -- -m "记录了 xxx"
//   npm run publish -- --dry            # 只报告将要做什么，不写不推
//   npm run publish -- --skip-ai --skip-contrib
//   npm run publish -- --force          # 明知是草稿仍要发布
//   npm run publish -- --min-body 200   # 调高草稿判定阈值（默认 60 字）
// 摘要需要密钥，只从环境变量读取：
//   $env:DOTS_API_KEY="<key>";  npm run publish -- -m "..."
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const argv = process.argv.slice(2);
const val = (f) => {
  const i = argv.indexOf(f);
  return i === -1 ? null : argv[i + 1];
};
const has = (f) => argv.includes(f);
const DRY = has("--dry");
const msg = val("-m") || val("--message");

const run = (cmd, args, opts = {}) => {
  console.log(`\n\$ ${cmd} ${args.join(" ")}`);
  // 默认视为写操作；只读的探测传 readonly: true，dry-run 才不会被跳过
  if (DRY && !opts.readonly && !opts.safe) {
    console.log("  (dry-run 跳过)");
    return "";
  }
  const r = spawnSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });
  const out = (r.stdout || "") + (r.stderr || "");
  if (out.trim()) console.log(out.trim().split("\n").slice(-12).join("\n"));
  if (r.status !== 0) {
    console.error(`\n命令失败（退出码 ${r.status}），流程中止。`);
    process.exit(1);
  }
  return out;
};

const wait = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

const git = (args, opts) => run("git", args, { readonly: args[0] === "status" || args[0] === "diff", ...opts });

// 1. 状态检查
console.log("== 1/6 工作区状态");
// 用 -z：默认输出会把中文路径转义成八进制串，上一轮就是因此读错了文件名
const raw = execFileSync("git", ["status", "--porcelain", "-z"], { encoding: "utf8" });
const entries = raw.split("\0").filter(Boolean).map((rec) => ({
  code: rec.slice(0, 2).trim(),
  path: rec.slice(3),
}));
const status = entries.map((e) => `${e.code} ${e.path}`).join("\n");
if (!status) {
  console.log("没有待提交的改动。若是新文章，请先 npm run new -- 标题。");
  process.exit(0);
}
console.log(status.split("\n").map((l) => "  " + l).join("\n"));

const POSTS = "source/_posts/";
const touchedPosts = entries
  .filter((e) => e.path.startsWith(POSTS) && e.path.endsWith(".md"))
  .map((e) => e.path);

// 正文（去掉 front-matter）太短就视为半成品，直接拦下：
// git add -A 会把工作区一切提交，空模板被顺手发布的风险必须挡住
const bodyLength = (p) => {
  const text = readFileSync(p, "utf8").replace(/^---[\s\S]*?\n---\r?\n/, "");
  return text.replace(/\s+/g, "").length;
};
const MIN_BODY = Number(val("--min-body") || 60);
const unfinished = touchedPosts.filter((p) => bodyLength(p) < MIN_BODY);

console.log(`涉及文章 ${touchedPosts.length} 篇：${touchedPosts.map((p) => p.slice(POSTS.length)).join("、") || "无"}`);
if (unfinished.length && !has("--force")) {
  console.error("\n中止：以下文章正文不足 " + MIN_BODY + " 字，像是没写完的草稿");
  unfinished.forEach((p) => console.error(`  ${p}（正文 ${bodyLength(p)} 字）`));
  console.error("\确认写完再发，或确实要发布草稿时加 --force。");
  process.exit(1);
}
const newPosts = entries.filter((e) => e.path.startsWith(POSTS) && e.code === "??").map((e) => e.path);

// 2. AI 摘要（脚本自身是增量的：只处理 front-matter 里还没有 description 的篇目）
console.log("\n== 2/6 AI 摘要");
if (has("--skip-ai")) console.log("  已按 --skip-ai 跳过");
else if (!process.env.DOTS_API_KEY) console.log("  未设置 DOTS_API_KEY，跳过（不会阻塞发布）");
else if (DRY) console.log("  dry-run：将执行 gen-ai-summary（跳过）");
else run("node", ["tools/gen-ai-summary.mjs"]);

// 3. 热力图数据
console.log("\n== 3/6 贡献热力图数据");
if (has("--skip-contrib")) console.log("  已按 --skip-contrib 跳过");
else if (spawnSync("gh", ["--version"], { encoding: "utf8" }).status !== 0)
  console.log("  本机没有 gh CLI，跳过");
else if (DRY) console.log("  dry-run：将执行 gen-contrib（跳过）");
else run("node", ["tools/gen-contrib.mjs"]);

// 4. 构建自检（产物不提交，只为在推送前抓到渲染错误）
// 用 node 直接跑 hexo 入口：npx 在 Windows 上是 .cmd，spawnSync 不套 shell 会找不到
console.log("\n== 4/6 本地构建自检");
const HEXO = "node_modules/hexo-cli/bin/hexo";
run("node", [HEXO, "clean"]);
run("node", [HEXO, "generate"]);

// 5. 提交推送
console.log("\n== 5/6 提交并推送 hexo 分支");
git(["add", "-A"]);
git(["commit", "-m", msg || `更新博客 ${new Date().toISOString().slice(0, 16).replace("T", " ")}`]);
git(["pull", "--rebase", "--autostash", "origin", "hexo"]); // CI 可能已提交过友链改动
git(["push", "origin", "hexo"]);
const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
console.log(DRY ? `  dry-run：未推送，HEAD 仍是 ${sha.slice(0, 7)}` : `  已推送 ${sha.slice(0, 7)}`);

// 6. 盯 CI
if (DRY) {
  console.log("\n== 6/6 dry-run 结束，未真正推送");
  process.exit(0);
}
console.log("\n== 6/6 等待 Actions 部署");
let runId = null;
for (let i = 0; i < 20 && !runId; i++) {
  const out = execFileSync(
    "gh",
    ["run", "list", "--limit", "5", "--json", "databaseId,headSha,status", "--jq",
     `.[] | select(.headSha=="${sha}") | .databaseId`],
    { encoding: "utf8" }
  ).trim();
  if (out) runId = out.split("\n")[0];
  else wait(3000);
}
if (!runId) {
  console.log("  没找到对应的运行记录，请到 Actions 页面手动确认（站点不会自动更新）");
  process.exit(1);
}
const w = spawnSync("gh", ["run", "watch", runId, "--exit-status", "--interval", "10"], { stdio: "inherit" });
if (w.status !== 0) {
  console.error(`\n部署失败。查看日志：gh run view ${runId} --log-failed`);
  process.exit(1);
}
console.log("\n构建完成。Pages 还需约 30~60 秒发布，之后访问 https://sicnutaolei.github.io/");
