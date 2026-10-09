// 友链申请处理：解析 Issue 表单正文 -> 校验 -> (可选) 写入 source/_data/link.yml
// 用法：
//   node tools/friend-from-issue.mjs --body-file issue.md            # 只校验，打印结论
//   node tools/friend-from-issue.mjs --body-file issue.md --apply    # 校验通过后写入
// 退出码：0 通过 / 2 校验失败 / 3 重复申请 / 4 已存在同名条目
import { readFileSync, writeFileSync } from "node:fs";
import yaml from "js-yaml";

const argv = process.argv.slice(2);
const argVal = (f) => {
  const i = argv.indexOf(f);
  return i === -1 ? null : argv[i + 1];
};
const bodyFile = argVal("--body-file");
const APPLY = argv.includes("--apply");
const CLASS_NAME = argVal("--class") || "友情链接";
if (!bodyFile) {
  console.error("需要 --body-file <path>");
  process.exit(2);
}

// GitHub Issue 表单渲染成 "### 字段名\n\n值\n\n### 下一个字段"
function parseForm(text) {
  const out = {};
  const parts = text.split(/^###\s+/m).slice(1);
  for (const p of parts) {
    const lines = p.split("\n");
    const key = lines[0].trim();
    const val = lines
      .slice(1)
      .join("\n")
      .split(/^---$/m)[0]
      .split(/<!--/)[0]
      .trim();
    out[key] = val;
  }
  return out;
}

const f = parseForm(readFileSync(bodyFile, "utf8"));
const get = (...names) => {
  for (const n of names) {
    const hit = Object.keys(f).find((k) => k.includes(n));
    if (hit && f[hit]) return f[hit];
  }
  return "";
};

const name = get("网站名称", "名称");
const linkRaw = get("网站地址", "地址", "链接");
const avatar = get("头像");
const descr = get("介绍", "描述", "简介");
const backlink = get("回链", "已放置");

const clean = (s) => s.replace(/^[<"]|[>"]$/g, "").trim();
const link = clean(linkRaw);
const hostOf = (u) => {
  try {
    return new URL(u).host;
  } catch {
    return null;
  }
};

const problems = [];
if (!name) problems.push("缺少网站名称");
if (!/^https?:\/\//i.test(link)) problems.push("网站地址必须以 http:// 或 https:// 开头");
else if (!hostOf(link)) problems.push("网站地址无法解析");
if (descr.length > 60) problems.push("介绍超过 60 字");
if (avatar && !/^https?:\/\//i.test(avatar)) problems.push("头像地址必须是完整 http(s) 链接");
if (!/已放置|已添加|yes/i.test(backlink)) problems.push("未确认已在对方站点放置回链");

const finalAvatar =
  avatar || (hostOf(link) ? `https://www.google.com/s2/favicons?domain=${hostOf(link)}&sz=128` : "");

const path = "source/_data/link.yml";
const data = yaml.load(readFileSync(path, "utf8"));
const cls = data.find((c) => c.class_name === CLASS_NAME);
if (!cls) {
  console.error(`link.yml 中找不到分组「${CLASS_NAME}」`);
  process.exit(2);
}
cls.link_list = cls.link_list || [];
const dup = cls.link_list.find((i) => clean(i.link) === link);
if (dup) {
  console.log(`DUPLICATE 该地址已在友链列表中：${dup.name} -> ${link}`);
  process.exit(4);
}

if (problems.length) {
  console.log("INVALID " + problems.join("；"));
  process.exit(2);
}

if (!/^(true|on|勾选|\[x\]|是|yes)$/i.test(backlink) && !/已放置|已添加/.test(backlink)) {
  console.log("WARN 回链确认为自由文本，请人工复核：" + backlink.slice(0, 40));
}

if (!APPLY) {
  console.log(
    `OK 可上墙：${name} | ${link} | 头像=${finalAvatar === avatar ? "申请人提供" : "favicon 兜底"} | 介绍=${descr || "（空）"}`
  );
  process.exit(0);
}

cls.link_list.push({ name, link, avatar: finalAvatar, descr: descr || name });
writeFileSync(path, yaml.dump(data, { lineWidth: 120, noRefs: true }), "utf8");
console.log(`APPLIED 已写入「${CLASS_NAME}」：${name} -> ${link}（当前共 ${cls.link_list.length} 条）`);
