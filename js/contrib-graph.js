// about 页贡献热力图：有活动的日子填头像，其余灰白。
// 数据来自 /data/contrib.json（由 scripts/gen-contrib.mjs 在本地生成，不含任何 token）。
(function () {
  var box = document.getElementById("contrib-graph");
  if (!box) return; // 只在 about 页存在容器时工作，其它页面零开销

  var CSS = [
    "#contrib-graph{margin:24px 0 8px}",
    "#contrib-graph .cg-stats{font-size:14px;color:var(--font-color,#4e4e4e);margin-bottom:14px;line-height:1.9}",
    "#contrib-graph .cg-stats b{font-weight:600}",
    "#contrib-graph .cg-grid{display:grid;grid-template-rows:repeat(7,11px);grid-auto-flow:column;grid-auto-columns:11px;gap:3px;overflow-x:auto;padding:2px 0 8px}",
    "#contrib-graph .cg-cell{width:11px;height:11px;border-radius:2px;background:rgba(128,128,128,.16)}",
    "#contrib-graph .cg-cell.cg-on{background-image:var(--cg-avatar);background-size:cover;background-position:center}",
    "#contrib-graph .cg-cell.cg-future{visibility:hidden}",
    "#contrib-graph .cg-legend{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(128,128,128,.9);margin-top:6px}",
    "#contrib-graph .cg-legend .cg-cell{display:inline-block}",
  ].join("");

  if (!document.getElementById("cg-style")) {
    var s = document.createElement("style");
    s.id = "cg-style";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  fetch("/data/contrib.json")
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (d) {
      box.style.setProperty("--cg-avatar", 'url("' + d.avatar + '")');
      box.innerHTML =
        '<div class="cg-stats"></div><div class="cg-grid"></div>' +
        '<div class="cg-legend"><span>无活动</span><span class="cg-cell"></span>' +
        '<span class="cg-cell cg-on"></span><span>有活动</span>' +
        '<span style="margin-left:auto">数据截至 ' + d.generated + "</span></div>";

      box.querySelector(".cg-stats").innerHTML =
        "近一年 <b>" + d.total + "</b> 次贡献，分布在 <b>" + d.activeDays +
        "</b> 天里，单日峰值 <b>" + d.peak + "</b> 次（" + d.from + " ~ " + d.to + "）。";

      var grid = box.querySelector(".cg-grid");
      var frag = document.createDocumentFragment();
      d.days.forEach(function (row, i) {
        var c = document.createElement("span");
        c.className = "cg-cell" + (row[1] > 0 ? " cg-on" : "");
        c.title = row[0] + "：" + row[1] + " 次贡献";
        frag.appendChild(c);
      });
      grid.appendChild(frag);
    })
    .catch(function (e) {
      box.innerHTML = ""; // 取不到数据就整块不显示，不留破图
      console.warn("contrib graph skipped:", e.message);
    });
})();
