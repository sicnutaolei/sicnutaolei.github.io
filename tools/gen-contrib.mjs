// 生成 about 页贡献热力图数据
// 数据源：GitHub GraphQL 账号全站贡献日历（近一年）。用本地 gh 凭证，不落 token、不进前端。
// 用法：node scripts/gen-contrib.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const AVATAR = "https://avatars.githubusercontent.com/u/94335131?v=4";

const QUERY = `
{ viewer { login name contributionsCollection {
  contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
} } }`;

let payload;
try {
  const out = execFileSync("gh", ["api", "graphql", "-f", "query=" + QUERY], {
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
  payload = JSON.parse(out).data.viewer;
} catch (e) {
  console.error("生成失败：需要已登录的 gh CLI（gh auth login）。");
  console.error(String(e.stderr || e.message).slice(0, 400));
  process.exit(1);
}

const weeks = payload.contributionsCollection.contributionCalendar.weeks;
const days = [];
for (const w of weeks) {
  for (const d of w.contributionDays) {
    days.push([d.date, d.contributionCount]);
  }
}

const total = payload.contributionsCollection.contributionCalendar.totalContributions;
const active = days.filter(([, c]) => c > 0).length;

const result = {
  login: payload.login,
  avatar: AVATAR,
  generated: new Date().toISOString().slice(0, 10),
  from: days[0][0],
  to: days[days.length - 1][0],
  total,
  activeDays: active,
  peak: Math.max(...days.map(([, c]) => c)),
  days,
};

const out = join(root, "source", "data", "contrib.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(result));
console.log(
  `contrib.json 已生成：${result.from} ~ ${result.to}，` +
    `总贡献 ${total}，有活动 ${active} 天，峰值 ${result.peak}/天，${(JSON.stringify(result).length / 1024).toFixed(1)} KB`
);
