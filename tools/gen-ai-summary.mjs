// 为 source/_posts/*.md 生成 AI 摘要，写入 front-matter 的 description 字段。
// 主题 index_post_content.method=2 时，description 优先作为卡片摘要，缺失则回退截断正文。
// key 只从环境变量 DOTS_API_KEY 读取，绝不写入仓库：
//   DOTS_API_KEY=$(...) npm run gen:ai
// 选项：--limit N 只处理前 N 篇（试水）；--force 覆盖已有 description；--dry 只打印不落盘
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const KEY = process.env.DOTS_API_KEY;
const BASE = "https://note3-prev-api.askdiandian.com/v1/chat/completions";
const MODEL = "dots3-note-prev";
if (!KEY) {
  console.error("缺少 DOTS_API_KEY 环境变量，未发起任何请求。");
  process.exit(1);
}

const argv = process.argv.slice(2);
const num = (flag) => {
  const i = argv.indexOf(flag);
  return i === -1 ? null : Number(argv[i + 1]);
};
const LIMIT = num("--limit");
const FORCE = argv.includes("--force");
const DRY = argv.includes("--dry");
const MAX_INPUT_CHARS = 12000;

const dir = join(process.cwd(), "source", "_posts");
let files = readdirSync(dir).filter((f) => f.endsWith(".md"));
if (LIMIT) files = files.slice(0, LIMIT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function summarize(title, body) {
  const clipped = body.length > MAX_INPUT_CHARS ? body.slice(0, MAX_INPUT_CHARS) : body;
  const sys =
    "你是技术博客摘要助手。用中文写一句话摘要，不超过70个汉字，直接说明这篇记录解决了什么具体问题、或给出了什么可直接复用的结论，让读者一眼判断要不要点开。硬性禁止：markdown语法、引号、以「本文」「这篇文章」「该记录」「系统梳理」「全面介绍」这类自指或空泛措辞开头、罗列章节标题、复述文章标题。若原文给出了具体命令、参数或方案，优先把那个方案写进摘要。只输出摘要本身，不要任何前后缀。";

  const call = async (userMsg) => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": KEY },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        max_tokens: 512,
        temperature: 0.3,
        chat_template_kwargs: { enable_thinking: false },
        messages: [
          { role: "system", content: sys },
          { role: "user", content: userMsg },
        ],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
    const j = await res.json();
    const text = (j.choices?.[0]?.message?.content || "").trim().replace(/\s+/g, " ");
    if (!text) throw new Error("空响应");
    return { text, tokens: j.usage?.total_tokens ?? 0 };
  };

  // 提示词约束不稳，用确定性规则兜底：不合格就带上下文重写一次
  const rejectable = (t) =>
    /^(本文|这篇|该文|该记录|该教程|本教程|本记录|本书|文章|此文章|这是一篇)/.test(t) ||
    t.length > 85;

  let out = await call(`标题：${title}\n\n正文：\n${clipped}`);
  let tokens = out.tokens;
  if (rejectable(out.text)) {
    const retry = await call(
      `标题：${title}\n\n正文：\n${clipped}\n\n上次摘要不合格：${out.text}\n重写要求：不得以「本」或「该」字开头，不超过70个汉字，直接讲结论或方案。`
    );
    tokens += retry.tokens;
    if (!rejectable(retry.text) || retry.text.length < out.text.length) out = retry;
  }
  return { ...out, tokens };
}

const yamlQuote = (s) => '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';

// 把 description 插入 front-matter 结束的 --- 之前
function injectDescription(raw, summary) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return { error: "无 front-matter" };
  const fm = m[1];
  const rest = raw.slice(m[0].length);
  const titleM = fm.match(/^title:\s*(.*)$/m);
  const title = titleM ? titleM[1].replace(/^['"]|['"]$/g, "") : "";
  const cleaned = fm.replace(/^description:.*$/m, "").trimEnd();
  const next = `---\n${cleaned}\ndescription: ${yamlQuote(summary)}\n---\n${rest}`;
  return { next, title };
}

let done = 0, skipped = 0, failed = 0, tokenTotal = 0;
for (const f of files) {
  const p = join(dir, f);
  const raw = readFileSync(p, "utf8");
  const parsed = injectDescription(raw, "");
  if (parsed.error) {
    console.log(`跳过 ${f}（${parsed.error}）`);
    skipped++;
    continue;
  }
  if (/^description:\s*\S/m.test(raw.split(/^---\r?\n/m)[1] || "") && !FORCE) {
    console.log(`跳过 ${f}（已有 description）`);
    skipped++;
    continue;
  }
  const body = raw.replace(/^---[\s\S]*?\n---\r?\n/, "");
  const bodyChars = body.replace(/\s+/g, "").length;
  if (bodyChars < 60) {
    console.log(`跳过 ${f}（正文仅 ${bodyChars} 字，视为未写完的草稿，不做摘要）`);
    skipped++;
    continue;
  }
  try {
    const { text, tokens } = await summarize(parsed.title, body);
    tokenTotal += tokens;
    console.log(`\n[${f}]  ${tokens} tok\n  ${text}`);
    if (!DRY) writeFileSync(p, injectDescription(raw, text).next, "utf8");
    done++;
  } catch (e) {
    console.error(`失败 ${f}: ${e.message}`);
    failed++;
  }
  await sleep(1200); // 60 RPM 限流下留足余量
}
console.log(
  `\n合计：写入 ${done} 篇（${DRY ? "dry-run 未落盘" : "已落盘"}），跳过 ${skipped}，失败 ${failed}，消耗 ${tokenTotal} tokens`
);
