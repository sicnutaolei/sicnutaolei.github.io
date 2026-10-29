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
import { readFileSync, existsSync } from "node:fs";

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
    finish("failed", { exit: r.status });
  }
  return out;
};

const wait = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

// 给 GUI / 脚本消费的机器契约：阶段行 + 最终结果行 + 明确的退出码。
// 0=成功（含 dry-run 与"已推送但未确认"）、2=没有待提交的改动、1=其它失败。
const OK_STATUS = new Set(["ok", "pushed", "dry"]);
const finish = (status, extra = {}) => {
  console.log(`::RESULT::${JSON.stringify({ status, ...extra })}`);
  const code = status === "no-changes" ? 2 : OK_STATUS.has(status) ? 0 : 1;
  process.exit(code);
};
const PHASE = (n, name) => console.log(`::PHASE::${n}/6 ${name}`);

const git = (args, opts) => run("git", args, { readonly: args[0] === "status" || args[0] === "diff", ...opts });

// 1. 状态检查
PHASE(1, "工作区状态");
// 用 -z：默认输出会把中文路径转义成八进制串，上一轮就是因此读错了文件名
const raw = execFileSync("git", ["status", "--porcelain", "-z"], { encoding: "utf8" });
const entries = [];
{
  const recs = raw.split("\0");
  for (let i = 0; i < recs.length; i++) {
    const rec = recs[i];
    if (!rec) continue;
    const code = rec.slice(0, 2).trim();
    entries.push({ code, path: rec.slice(3) });
    // 重命名/复制在 -z 下是两段：R  new\0old\0，第二段没有 XY 前缀，不能当普通记录解析
    if (/^[RC]/.test(code)) i++;
  }
}
const status = entries.map((e) => `${e.code} ${e.path}`).join("\n");
if (!status) {
  console.log("没有待提交的改动。若是新文章，请先 npm run new -- 标题。");
  finish("no-changes");
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
const minArg = Number(val("--min-body"));
const MIN_BODY = Number.isFinite(minArg) && minArg > 0 ? minArg : 60;
// 被删除的文章不在磁盘上了，跳过——否则 readFileSync 会直接抛异常把整条流程打断
const unfinished = touchedPosts.filter((p) => existsSync(p) && bodyLength(p) < MIN_BODY);

console.log(`涉及文章 ${touchedPosts.length} 篇：${touchedPosts.map((p) => p.slice(POSTS.length)).join("、") || "无"}`);
if (unfinished.length && !has("--force")) {
  console.error("\n中止：以下文章正文不足 " + MIN_BODY + " 字，像是没写完的草稿");
  unfinished.forEach((p) => console.error(`  ${p}（正文 ${bodyLength(p)} 字）`));
  console.error("\确认写完再发，或确实要发布草稿时加 --force。");
  finish("draft", { files: unfinished });
}
const newPosts = entries.filter((e) => e.path.startsWith(POSTS) && e.code === "??").map((e) => e.path);

// 2. AI 摘要（脚本自身是增量的：只处理 front-matter 里还没有 description 的篇目）
PHASE(2, "AI 摘要");
if (has("--skip-ai")) console.log("  已按 --skip-ai 跳过");
else if (!process.env.DOTS_API_KEY) console.log("  未设置 DOTS_API_KEY，跳过（不会阻塞发布）");
else if (DRY) console.log("  dry-run：将执行 gen-ai-summary（跳过）");
else run("node", ["tools/gen-ai-summary.mjs"]);

// 3. 热力图数据
PHASE(3, "贡献热力图数据");
if (has("--skip-contrib")) console.log("  已按 --skip-contrib 跳过");
else if (spawnSync("gh", ["--version"], { encoding: "utf8" }).status !== 0)
  console.log("  本机没有 gh CLI，跳过");
else if (DRY) console.log("  dry-run：将执行 gen-contrib（跳过）");
else run("node", ["tools/gen-contrib.mjs"]);

// 4. 构建自检（产物不提交，只为在推送前抓到渲染错误）
// 用 node 直接跑 hexo 入口：npx 在 Windows 上是 .cmd，spawnSync 不套 shell 会找不到
PHASE(4, "本地构建自检");
const HEXO = "node_modules/hexo-cli/bin/hexo";
run("node", [HEXO, "clean"]);
run("node", ["tools/pull-post-assets.mjs"]); // 手机端插入的图片需先归位到 _posts/<文章名>/
run("node", [HEXO, "generate"]);

// 5. 提交推送
PHASE(5, "提交并推送 hexo 分支");
git(["add", "-A"]);
git(["commit", "-m", msg || `更新博客 ${new Date().toISOString().slice(0, 16).replace("T", " ")}`]);
git(["pull", "--rebase", "--autostash", "origin", "hexo"]); // CI 可能已提交过友链改动
git(["push", "origin", "hexo"]);
const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
console.log(DRY ? `  dry-run：未推送，HEAD 仍是 ${sha.slice(0, 7)}` : `  已推送 ${sha.slice(0, 7)}`);

// 6. 盯 CI
if (DRY) {
  PHASE(6, "dry-run 结束");
  finish("dry", { sha });
}
if (has("--no-watch")) {
  PHASE(6, "已推送，跳过等待（--no-watch）");
  finish("pushed", { sha });
}
PHASE(6, "等待 Actions 部署");

const hasGh = spawnSync("gh", ["--version"], { encoding: "utf8" }).status === 0;
if (!hasGh) {
  console.log("  本机没有 gh CLI：已推送成功，但无法确认 CI 结果。请到 Actions 页面查看。");
  finish("pushed", { sha });
}

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
  finish("deploy", { sha, runId: null });
}
const w = spawnSync("gh", ["run", "watch", runId, "--exit-status", "--interval", "10"], { stdio: "inherit" });
if (w.status !== 0) {
  console.error(`\n部署失败。查看日志：gh run view ${runId} --log-failed`);
  finish("deploy", { sha, runId });
}
console.log("\n构建完成。Pages 还需约 30~60 秒发布，之后访问 https://sicnutaolei.github.io/");
finish("ok", { sha, runId });
