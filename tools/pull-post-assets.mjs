// 资源归位：把 Markor 存下的图片复制到 Hexo 期望的 source/_posts/<文章名>/ 下。
// 只复制，不移动、不改写任何 Markdown——source/_posts/assets/ 始终是唯一真源。
// 由 publish.mjs 与 CI 的 deploy.yml 在 hexo generate 之前调用。
// 用法：node tools/pull-post-assets.mjs [--warn]
//   --warn  源文件缺失时只警告（默认直接失败，避免静默发布出裂图）
//   HEXO_ASSET_COPY=0  整体跳过
import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
  statSync,
} from "node:fs";
import { join, dirname, basename, extname } from "node:path";

const POSTS = join(process.cwd(), "source", "_posts");
const WARN_ONLY = process.argv.includes("--warn");

if (process.env.HEXO_ASSET_COPY === "0") {
  console.log("HEXO_ASSET_COPY=0，跳过资源归位");
  process.exit(0);
}
if (!existsSync(POSTS)) {
  console.error(`找不到 ${POSTS}`);
  process.exit(1);
}

// 图片引用：markdown 语法与裸 img 标签
const MD_IMG = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/g;
const HTML_IMG = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi;

// 去掉代码块与行内代码，避免把语法示例当成真实图片
function stripCode(text) {
  return text
    .replace(/^```[\s\S]*?^```/gm, "")
    .replace(/^~~~[\s\S]*?^~~~/gm, "")
    .replace(/`[^`\n]*`/g, "");
}

const isRelative = (href) =>
  href &&
  !/^(https?:)?\/\//i.test(href) &&
  !href.startsWith("/") &&
  !href.startsWith("data:") &&
  !href.startsWith("#") &&
  !href.startsWith("mailto:");

function findSource(href) {
  const candidates = [];
  const decoded = (() => {
    try {
      return decodeURIComponent(href);
    } catch {
      return href;
    }
  })();
  for (const h of new Set([href, decoded])) {
    const clean = h.replace(/^\.\//, "");
    candidates.push(join(POSTS, clean)); // assets/a.jpg
    candidates.push(join(POSTS, basename(clean))); // 散落在 _posts 根
    candidates.push(join(POSTS, "assets", basename(clean))); // 与 Markor 配置一致
  }
  return candidates.find((p) => existsSync(p) && statSync(p).isFile());
}

const mdFiles = readdirSync(POSTS).filter(
  (f) => f.endsWith(".md") && !f.startsWith(".") && statSync(join(POSTS, f)).isFile()
);

let copied = 0;
let skipped = 0;
const missing = [];

for (const file of mdFiles) {
  const slug = basename(file, extname(file));
  const raw = readFileSync(join(POSTS, file), "utf8");
  const body = stripCode(raw.replace(/^---[\s\S]*?\n---\r?\n/, ""));

  const hrefs = new Set();
  for (const re of [MD_IMG, HTML_IMG]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(body))) hrefs.add(m[1].trim());
  }

  for (const href of [...hrefs].filter(isRelative)) {
    const dest = join(POSTS, slug, href.replace(/^\.\//, ""));
    if (existsSync(dest)) {
      skipped++;
      continue;
    }
    const src = findSource(href);
    if (!src) {
      missing.push(`${file} -> ${href}`);
      continue;
    }
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    console.log(`  复制 ${basename(src)} -> ${slug}/${href}`);
    copied++;
  }
}

console.log(
  `资源归位完成：复制 ${copied} 个，已存在 ${skipped} 个，缺失 ${missing.length} 个（扫描 ${mdFiles.length} 篇文章）`
);

if (missing.length) {
  for (const m of missing) console.error(`  缺失: ${m}`);
  if (WARN_ONLY) {
    console.warn("以上引用找不到源文件，已按 --warn 继续（这些图片会裂）");
  } else {
    console.error(
      "有相对图片引用找不到源文件。请确认图片已提交（Markor 的附件目录应为 assets），或用 --warn 容忍。"
    );
    process.exit(1);
  }
}
