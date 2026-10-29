// 封面规则：有自定义 cover 就用它，没有则按文章名生成一个固定的 Picsum seed。
// 主题的随机过滤器对页面（about / link）也会生效，所以这里不区分 layout。
//
// 为什么不用主题的 default_cover：主题的 random_cover.js 每次构建都用 Math.random()
// 从列表里抽，同一篇文章每次构建封面都会变（且没法复现）。这里改成按文章标识哈希，
// 同一篇永远同一张图。
//
// priority 9 < 主题的默认 10：Hexo 里数值越小越先执行。必须跑在主题之前——
// 否则主题的 random_cover 已经往 data.cover 塞了随机值，我们就会误判成"用户自定义封面"而放行。
// 必须是 CommonJS：scripts/ 是 Hexo 的自动加载目录。
'use strict';

const crypto = require('node:crypto');

hexo.extend.filter.register(
  'before_post_render',
  (data) => {
    if (data.cover === false) return data; // 显式声明不要封面
    if (data.cover) return data; // front-matter 已有自定义封面，尊重它

    const key = String(data.slug || data.source || data.title || '');
    const hash = crypto.createHash('sha1').update(key).digest('hex').slice(0, 8);
    data.cover = `https://picsum.photos/seed/tapost-${hash}/1200/675`;
    data.cover_type = 'img';
    return data;
  },
  9
);
