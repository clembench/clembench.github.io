/* clembench archive — previous benchmark versions.
   Renders the wide results.csv shipped for each version. No build step. */
(function () {
  "use strict";

  var BASE = "assets/benchmark_results/";

  var VERSIONS = [
    { id: "v3",             label: "v3",             scope: "English · text",         note: "Latest English-only round." },
    { id: "v2",             label: "v2",             scope: "English · text",         note: "Adds adventuregame." },
    { id: "v1.6_multimodal", label: "v1.6 multimodal", scope: "English · text + image", note: "Multimodal games (matchit, mapworld)." },
    { id: "v1.6",           label: "v1.6",           scope: "English · text",         note: "" },
    { id: "v1.5",           label: "v1.5",           scope: "English · text",         note: "" },
    { id: "v1.0",           label: "v1.0",           scope: "English · text",         note: "The original clembench release." }
  ];

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  }
  function $(s) { return document.querySelector(s); }

  function parseCSV(text) {
    var rows = [], row = [], field = "", q = false, i, c;
    text = text.replace(/^﻿/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    for (i = 0; i < text.length; i++) {
      c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
        else field += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else field += c;
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.length > 1; });
  }

  var sortCol = 1, sortDir = -1, current = null;

  function render(rows, version) {
    var host = $("#clb-archive");
    host.innerHTML = "";
    if (!rows.length) { host.appendChild(el("p", "clb-empty", "No data for this version.")); return; }

    var head = rows[0].slice();
    head[0] = "Model";
    var body = rows.slice(1);

    body.sort(function (a, b) {
      var x = a[sortCol], y = b[sortCol];
      var nx = parseFloat(x), ny = parseFloat(y);
      if (isFinite(nx) && isFinite(ny)) return (nx - ny) * sortDir;
      return String(x).localeCompare(String(y)) * sortDir * -1;
    });

    var scores = body.map(function (r) { return parseFloat(r[1]); }).filter(isFinite);
    var max = scores.length ? Math.max.apply(null, scores) : 1;

    var wrap = el("div", "clb-tablewrap");
    var t = el("table", "clb-table");
    var thead = el("thead"), hr = el("tr");
    head.forEach(function (h, i) {
      var th = el("th", null, h.replace(/^-, /, "").replace(/^all, /, ""));
      if (i === sortCol) th.className = "clb-sorted" + (sortDir === -1 ? " clb-desc" : "");
      th.addEventListener("click", function () {
        if (sortCol === i) sortDir *= -1; else { sortCol = i; sortDir = -1; }
        render(rows, version);
      });
      hr.appendChild(th);
    });
    thead.appendChild(hr); t.appendChild(thead);

    var tb = el("tbody");
    body.forEach(function (r, ri) {
      var tr = el("tr");
      r.forEach(function (v, ci) {
        if (ci === 0) {
          var td = el("td", "clb-model");
          td.appendChild(el("span", "clb-rank", String(ri + 1) + "  "));
          td.appendChild(document.createTextNode(v));
          tr.appendChild(td);
          return;
        }
        var n = parseFloat(v);
        if (ci === 1) {
          var sc = el("td", "clb-score clb-num");
          if (isFinite(n)) {
            var bar = el("div", "clb-bar");
            bar.style.width = Math.max(2, (n / max) * 100) + "%";
            sc.appendChild(bar);
          }
          sc.appendChild(el("span", null, isFinite(n) ? n.toFixed(2) : (v || "–")));
          tr.appendChild(sc);
          return;
        }
        tr.appendChild(el("td", "clb-num", isFinite(n) ? n.toFixed(1) : (v || "–")));
      });
      tb.appendChild(tr);
    });
    t.appendChild(tb); wrap.appendChild(t); host.appendChild(wrap);

    host.appendChild(el("p", "clb-note",
      version.label + " · " + version.scope + " · " + body.length + " models, " +
      (head.length - 1) + " score columns. Column headers are as published for that release, so the " +
      "game set differs between versions and scores are not comparable across them."));
  }

  function load(version) {
    current = version.id;
    document.querySelectorAll(".clb-version").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.v === version.id));
    });
    history.replaceState(null, "", "#" + version.id);
    var host = $("#clb-archive");
    host.innerHTML = '<p class="clb-empty">Loading ' + version.label + ' …</p>';
    sortCol = 1; sortDir = -1;
    fetch(BASE + version.id + "/results.csv").then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    }).then(function (txt) {
      render(parseCSV(txt), version);
    }).catch(function (e) {
      host.innerHTML = '<p class="clb-empty">Could not load ' + version.label +
        " (" + e.message + "). If you are viewing this from the filesystem, serve the site over HTTP.</p>";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var picker = $("#clb-versions");
    if (!picker) return;
    VERSIONS.forEach(function (v) {
      var b = el("button", "clb-version");
      b.type = "button"; b.dataset.v = v.id;
      b.setAttribute("aria-pressed", "false");
      b.appendChild(el("strong", null, v.label));
      b.appendChild(el("span", null, v.scope + (v.note ? " · " + v.note : "")));
      b.addEventListener("click", function () { load(v); });
      picker.appendChild(b);
    });
    var want = location.hash.replace(/^#/, "");
    var start = VERSIONS.filter(function (v) { return v.id === want; })[0] || VERSIONS[0];
    load(start);
  });
})();
