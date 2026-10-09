// 把 front-matter 的 description（AI 生成）渲染成文章正文顶部的摘要块。
// Butterfly 原生只把 description 用在 head meta 和首页卡片，正文里不显示，所以在这里补。
// 必须放 scripts/ 且用 CommonJS：Hexo 会自动加载 scripts/ 下的脚本。
'use strict';

const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

hexo.extend.filter.register('after_post_render', (data) => {
  // 只处理文章，不动页面（about / link 等）
  if (data.layout !== 'post') return data;
  const desc = (data.description || '').trim();
  if (!desc) return data;
  if (data.content && data.content.includes('ai-abstract')) return data; // 幂等

  data.content =
    `<div class="ai-abstract"><div class="ai-abstract-label">AI 摘要</div>` +
    `<p>${escape(desc)}</p></div>` +
    (data.content || '');

  return data;
});
