// CI 侧草稿闸：与 tools/publish.mjs 第 1 步同一规则——去掉 front-matter 后正文不足 60 字视为没写完。
// 桌面端有这道闸，手机端直推会绕过它，所以在 CI 里再拦一次。
// 用法：node tools/check-drafts.mjs [文件...]    不给参数则扫描 source/_posts 下全部文章
// 阈值可用 MIN_BODY 环境变量调整。
import { readFileSync, readdirSync, existsSync, appendFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MIN = Number(process.env.MIN_BODY || 60);
const POSTS = join(process.cwd(), "source", "_posts");

let files = process.argv.slice(2).filter(Boolean);
if (files.length === 0 && existsSync(POSTS)) {
  files = readdirSync(POSTS)
    .filter((f) => f.endsWith(".md") && !f.startsWith(".") && statSync(join(POSTS, f)).isFile())
    .map((f) => join("source", "_posts", f));
}

const bodyChars = (p) => {
  const raw = readFileSync(p, "utf8").replace(/^---[\s\S]*?\n---\r?\n/, "");
  return raw.replace(/\s+/g, "").length;
};

const bad = [];
const rel = (p) => p.replace(/\\/g, "/"); // GitHub 注解需要正斜杠路径
for (const f of files) {
  if (!existsSync(f)) continue; // 本次提交里被删除的文件
  const n = bodyChars(f);
  if (n < MIN) bad.push({ f: rel(f), n });
}

if (bad.length === 0) {
  console.log(`草稿校验通过：${files.length} 篇文章正文均不少于 ${MIN} 字`);
  process.exit(0);
}

console.error(`草稿校验失败：${bad.length} 篇文章正文不足 ${MIN} 字`);
for (const { f, n } of bad) {
  console.error(`  ${f}（正文 ${n} 字）`);
  console.log(`::error file=${f}::正文仅 ${n} 字（阈值 ${MIN}），疑似没写完。补齐后重新推送，或 git revert 本次提交。`);
}

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = bad.map(({ f, n }) => `| \`${f}\` | ${n} |`).join("\n");
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `## 草稿校验未通过\n\n以下文章正文少于 ${MIN} 字，构建已中止，线上仍是上一个正常版本。\n\n| 文件 | 正文字数 |\n|---|---|\n${rows}\n\n处理方式：手机上补完正文再推送；或 \`git revert\` 撤回本次提交后重推。\n`
  );
}

process.exit(1);
