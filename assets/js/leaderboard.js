/* clembench leaderboard — v4.0 multilingual
   Reads assets/benchmark_results/v4/*.csv|json. No build step. Chart.js from CDN. */
(function () {
  "use strict";

  var BASE = "assets/benchmark_results/v4/";
  var PALETTE = ["#0969da", "#8250df", "#1a7f37", "#bf3989", "#bc4c00",
                 "#0550ae", "#953800", "#0f766e", "#6e7781"];

  var D = { rows: [], cost: [], fert: [], models: [], langs: [], caps: null };
  var S = { tab: "board", langs: new Set(), models: new Set(), metric: "clemscore", fertAll: false };

  /* ── CSV ────────────────────────────────────────────────────────── */
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
    if (!rows.length) return [];
    var head = rows.shift();
    return rows.filter(function (r) { return r.length > 1; }).map(function (r) {
      var o = {}; head.forEach(function (h, j) { o[h] = r[j] === undefined ? "" : r[j]; }); return o;
    });
  }
  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : null; }

  /* ── aggregation ────────────────────────────────────────────────── */
  // Per language, clemscore is mean(%Played) x mean(Quality) across that
  // language's games; the model score is then the mean of those per-language
  // clemscores. Pooling every cell first and multiplying once gives a different
  // (wrong) answer, because the product is not linear. This matches the paper.
  function agg(rows) {
    var by = {};
    rows.forEach(function (r) {
      if (r._p === null || r._q === null) return;
      (by[r.language] = by[r.language] || []).push(r);
    });
    var langs = Object.keys(by);
    if (!langs.length) return null;
    var P = 0, Q = 0, C = 0;
    langs.forEach(function (l) {
      var rs = by[l], p = 0, q = 0;
      rs.forEach(function (r) { p += r._p; q += r._q; });
      p /= rs.length; q /= rs.length;
      P += p; Q += q; C += (p / 100) * q;
    });
    return { played: P / langs.length, quality: Q / langs.length,
             clemscore: C / langs.length, n: langs.length };
  }
  function rowsFor(modelKey, opts) {
    opts = opts || {};
    return D.rows.filter(function (r) {
      if (r.model !== modelKey) return false;
      if (!S.langs.has(r.language)) return false;
      if (opts.games && opts.games.indexOf(r.game) === -1) return false;
      if (opts.lang && r.language !== opts.lang) return false;
      return true;
    });
  }
  function selectedModels() { return D.models.filter(function (m) { return S.models.has(m.model); }); }

  /* ── DOM helpers ────────────────────────────────────────────────── */
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  }
  function fmt(v, d) { return v === null || v === undefined ? "–" : v.toFixed(d === undefined ? 1 : d); }
  function $(sel) { return document.querySelector(sel); }

  /* ── filters ────────────────────────────────────────────────────── */
  function buildFilters() {
    var host = $("#clb-lang-groups");
    host.innerHTML = "";
    ["EU-24", "Other"].forEach(function (group) {
      var list = D.langs.filter(function (l) { return l.group === group; });
      if (!list.length) return;
      var wrap = el("div", "clb-group");
      wrap.appendChild(el("div", "clb-group-label", group + " (" + list.length + ")"));
      var chips = el("div", "clb-chips");
      list.forEach(function (l) { chips.appendChild(chip(l.code, l.name, S.langs, "lang")); });
      wrap.appendChild(chips);
      host.appendChild(wrap);
    });
    var mhost = $("#clb-model-chips");
    mhost.innerHTML = "";
    D.models.forEach(function (m) { mhost.appendChild(chip(m.model, m.model, S.models, "model")); });
    syncCounts();
  }
  function chip(value, label, set, kind) {
    var lab = el("label", "clb-chip" + (set.has(value) ? " is-on" : ""));
    var box = el("input");
    box.type = "checkbox"; box.checked = set.has(value); box.value = value;
    box.addEventListener("change", function () {
      if (box.checked) set.add(value); else set.delete(value);
      lab.classList.toggle("is-on", box.checked);
      syncCounts(); writeHash(); render();
    });
    lab.appendChild(box);
    lab.appendChild(el("span", null, label));
    if (kind === "lang") lab.appendChild(el("span", "clb-code", value));
    return lab;
  }
  function syncCounts() {
    $("#clb-lang-count").textContent = "— " + S.langs.size + " of " + D.langs.length + " selected";
    $("#clb-model-count").textContent = "— " + S.models.size + " of " + D.models.length + " selected";
  }
  function setLangs(codes) {
    S.langs = new Set(codes);
    buildFilters(); writeHash(); render();
  }

  /* ── tab 1: leaderboard ─────────────────────────────────────────── */
  var sortKey = "clemscore", sortDir = -1;

  function renderBoard() {
    var host = $("#clb-board");
    host.innerHTML = "";
    if (!S.langs.size || !S.models.size) {
      host.appendChild(el("p", "clb-empty", "Select at least one language and one model."));
      return;
    }
    var data = selectedModels().map(function (m) {
      var a = agg(rowsFor(m.model));
      return { m: m, played: a ? a.played : null, quality: a ? a.quality : null,
               clemscore: a ? a.clemscore : null };
    });
    data.sort(function (a, b) {
      var x = a[sortKey], y = b[sortKey];
      if (sortKey === "name") return a.m.model.localeCompare(b.m.model) * sortDir * -1;
      if (x === null) return 1; if (y === null) return -1;
      return (x - y) * sortDir;
    });
    var max = Math.max.apply(null, data.map(function (d) { return d.clemscore || 0; })) || 1;

    var wrap = el("div", "clb-tablewrap");
    var t = el("table", "clb-table");
    var thead = el("thead"), hr = el("tr");
    [["", "rank"], ["Model", "name"], ["clemscore", "clemscore"],
     ["% Played", "played"], ["Quality", "quality"]].forEach(function (h) {
      var th = el("th", null, h[0]);
      if (h[1] !== "rank") {
        th.dataset.key = h[1];
        if (h[1] === sortKey) th.className = "clb-sorted" + (sortDir === -1 ? " clb-desc" : "");
        th.addEventListener("click", function () {
          if (sortKey === h[1]) sortDir *= -1; else { sortKey = h[1]; sortDir = -1; }
          renderBoard();
        });
      }
      hr.appendChild(th);
    });
    thead.appendChild(hr); t.appendChild(thead);

    var tb = el("tbody");
    data.forEach(function (d, i) {
      var tr = el("tr");
      tr.appendChild(el("td", "clb-rank", String(i + 1)));
      var td = el("td", "clb-model");
      td.appendChild(document.createTextNode(d.m.model));
      var tag = el("span", "clb-tag " + (d.m.open_weight ? "open" : "closed"),
                   d.m.open_weight ? "open" : "closed");
      td.appendChild(tag);
      td.appendChild(el("div", "clb-vendor",
        d.m.vendor + (d.m.parameters ? " · " + d.m.parameters : "")));
      tr.appendChild(td);

      var sc = el("td", "clb-score clb-num");
      if (d.clemscore !== null) {
        var bar = el("div", "clb-bar");
        bar.style.width = Math.max(2, (d.clemscore / max) * 100) + "%";
        sc.appendChild(bar);
      }
      sc.appendChild(el("span", null, fmt(d.clemscore)));
      tr.appendChild(sc);
      tr.appendChild(el("td", "clb-num", fmt(d.played)));
      tr.appendChild(el("td", "clb-num", fmt(d.quality)));
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    wrap.appendChild(t);
    host.appendChild(wrap);

    var note = el("p", "clb-note",
      "clemscore is mean % Played × mean Quality over the selected languages and all games, " +
      "matching the aggregation used in the paper. Averaged over " + S.langs.size +
      " language" + (S.langs.size === 1 ? "" : "s") + ".");
    host.appendChild(note);
  }

  /* ── tab 2: capabilities radar ──────────────────────────────────── */
  var radar = null;
  function renderCaps() {
    var host = $("#clb-caps-chart");
    var names = Object.keys(D.caps.clusters);
    if (!S.langs.size || !S.models.size) {
      host.innerHTML = ""; host.appendChild(el("p", "clb-empty", "Select at least one language and one model."));
      if (radar) { radar.destroy(); radar = null; }
      return;
    }
    if (!host.querySelector("canvas")) { host.innerHTML = ""; host.appendChild(el("canvas")); }
    var ds = selectedModels().map(function (m, i) {
      return {
        label: m.model,
        data: names.map(function (n) {
          var a = agg(rowsFor(m.model, { games: D.caps.clusters[n] }));
          return a ? +a.clemscore.toFixed(1) : 0;
        }),
        borderColor: PALETTE[i % PALETTE.length],
        backgroundColor: PALETTE[i % PALETTE.length] + "22",
        borderWidth: 2, pointRadius: 2
      };
    });
    if (radar) radar.destroy();
    radar = new Chart(host.querySelector("canvas"), {
      type: "radar",
      data: { labels: names, datasets: ds },
      options: {
        responsive: true, aspectRatio: 1.15,
        scales: { r: { suggestedMin: 0, suggestedMax: 100, ticks: { stepSize: 25, backdropColor: "transparent" } } },
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } }
      }
    });
  }

  /* ── tab 3: games ───────────────────────────────────────────────── */
  function shade(v) {
    if (v === null) return "";
    var t = Math.max(0, Math.min(1, v / 100));
    return "background:rgba(9,105,218," + (0.05 + t * 0.5).toFixed(3) + ")";
  }
  function renderGames() {
    var host = $("#clb-games");
    host.innerHTML = "";
    if (!S.langs.size || !S.models.size) {
      host.appendChild(el("p", "clb-empty", "Select at least one language and one model."));
      return;
    }
    var games = Object.keys(D.caps.game_names);
    var wrap = el("div", "clb-tablewrap");
    var t = el("table", "clb-table");
    var hr = el("tr");
    hr.appendChild(el("th", null, "Model"));
    games.forEach(function (g) { hr.appendChild(el("th", null, D.caps.game_names[g])); });
    var thead = el("thead"); thead.appendChild(hr); t.appendChild(thead);

    var tb = el("tbody"), flagged = 0;
    selectedModels().forEach(function (m) {
      var tr = el("tr");
      tr.appendChild(el("td", "clb-model", m.model));
      games.forEach(function (g) {
        var rs = rowsFor(m.model, { games: [g] });
        var a = agg(rs);
        var v = a ? a[S.metric] : null;
        var td = el("td", "clb-cell" + (v === null ? " clb-na" : ""), fmt(v, 0));
        if (v !== null) td.setAttribute("style", shade(v));
        if (rs.some(function (r) { return r._q !== null && (r._q > 100 || r._q < 0); })) {
          td.classList.add("clb-flagged");
          td.title = "Contains an out-of-range Quality value; see the note below.";
          flagged++;
        }
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
    t.appendChild(tb); wrap.appendChild(t); host.appendChild(wrap);

    host.appendChild(el("p", "clb-note",
      "Showing " + ({ clemscore: "clemscore", played: "% Played", quality: "Quality" })[S.metric] +
      ", averaged over " + S.langs.size + " selected language" + (S.langs.size === 1 ? "" : "s") + "."));
    if (flagged) {
      host.appendChild(el("div", "clb-warnbox",
        "Outlined cells include at least one episode whose Quality falls outside [0, 100], " +
        "caused by an unclamped penalty score in the Clean Up scorer. The scorer has been fixed; " +
        "these cells predate the fix and are pending a re-run."));
    }
  }

  /* ── tab 4: cost & tokenisation ─────────────────────────────────── */
  var fertChart = null;
  function renderCost() {
    var host = $("#clb-cost");
    host.innerHTML = "";
    if (!S.models.size) { host.appendChild(el("p", "clb-empty", "Select at least one model.")); return; }

    var codes = D.langs.map(function (l) { return l.code; });
    if (S.fertAll && D.fert.length) {
      codes = Object.keys(D.fert[0]).filter(function (k) { return k !== "model"; });
    }
    var shown = codes.filter(function (c) { return S.fertAll || S.langs.has(c); });
    if (!shown.length) { host.appendChild(el("p", "clb-empty", "Select at least one language.")); return; }

    // fertility heatmap
    host.appendChild(el("h3", null, "Token fertility (tokens per word)"));
    var wrap = el("div", "clb-tablewrap");
    var t = el("table", "clb-table");
    var hr = el("tr"); hr.appendChild(el("th", null, "Model"));
    shown.forEach(function (c) { hr.appendChild(el("th", null, c)); });
    var thead = el("thead"); thead.appendChild(hr); t.appendChild(thead);
    var tb = el("tbody");
    selectedModels().forEach(function (m) {
      var row = D.fert.filter(function (f) { return f.model === m.model; })[0];
      var tr = el("tr");
      tr.appendChild(el("td", "clb-model", m.model));
      shown.forEach(function (c) {
        var v = row ? num(row[c]) : null;
        var td = el("td", "clb-cell" + (v === null ? " clb-na" : ""), v === null ? "–" : v.toFixed(2));
        if (v !== null) {
          var t2 = Math.max(0, Math.min(1, (v - 1.2) / 3));
          td.setAttribute("style", "background:rgba(188,76,0," + (0.05 + t2 * 0.5).toFixed(3) + ")");
        }
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
    t.appendChild(tb); wrap.appendChild(t); host.appendChild(wrap);
    host.appendChild(el("p", "clb-note",
      "Higher means the tokeniser splits words into more pieces, so the same text costs more to send. " +
      "Chinese is character-based and not directly comparable."));

    // cost + value
    host.appendChild(el("h3", null, "Cost and value"));
    var cw = el("div", "clb-tablewrap");
    var ct = el("table", "clb-table");
    var chr = el("tr");
    ["Model", "Total cost (USD)", "Input tokens", "Output tokens", "clemscore", "Points per $"]
      .forEach(function (h) { chr.appendChild(el("th", null, h)); });
    var cth = el("thead"); cth.appendChild(chr); ct.appendChild(cth);
    var ctb = el("tbody");
    selectedModels().forEach(function (m) {
      var rows = D.cost.filter(function (r) {
        return r.model === m.model && S.langs.has(r.language);
      });
      var cost = rows.reduce(function (s, r) { return s + (num(r.total_cost) || 0); }, 0);
      var ti = rows.reduce(function (s, r) { return s + (num(r.input_tokens) || 0); }, 0);
      var to = rows.reduce(function (s, r) { return s + (num(r.output_tokens) || 0); }, 0);
      var a = agg(rowsFor(m.model));
      var tr = el("tr");
      tr.appendChild(el("td", "clb-model", m.model));
      tr.appendChild(el("td", "clb-num", cost ? cost.toFixed(2) : "–"));
      tr.appendChild(el("td", "clb-num", ti ? ti.toLocaleString() : "–"));
      tr.appendChild(el("td", "clb-num", to ? to.toLocaleString() : "–"));
      tr.appendChild(el("td", "clb-num", a ? fmt(a.clemscore) : "–"));
      tr.appendChild(el("td", "clb-num", (a && cost) ? (a.clemscore / cost).toFixed(2) : "–"));
      ctb.appendChild(tr);
    });
    ct.appendChild(ctb); cw.appendChild(ct); host.appendChild(cw);
    host.appendChild(el("p", "clb-note",
      "Cost is summed over the selected languages, from the token counts in the interaction " +
      "transcripts priced at each model's list price. Three models were run locally, so their " +
      "figures are list prices rather than amounts billed."));
  }

  /* ── URL state ──────────────────────────────────────────────────── */
  function writeHash() {
    var p = [];
    p.push("tab=" + S.tab);
    if (S.langs.size && S.langs.size < D.langs.length) p.push("langs=" + Array.from(S.langs).join(","));
    if (S.models.size && S.models.size < D.models.length) p.push("models=" + Array.from(S.models).join(","));
    history.replaceState(null, "", "#" + p.join("&"));
  }
  function readHash() {
    var h = location.hash.replace(/^#/, ""); if (!h) return;
    h.split("&").forEach(function (kv) {
      var i = kv.indexOf("="); if (i < 0) return;
      var k = kv.slice(0, i), v = decodeURIComponent(kv.slice(i + 1));
      if (k === "tab") S.tab = v;
      if (k === "langs") S.langs = new Set(v.split(",").filter(Boolean));
      if (k === "models") S.models = new Set(v.split(",").filter(Boolean));
    });
  }

  /* ── tabs + render ──────────────────────────────────────────────── */
  function showTab(id) {
    S.tab = id;
    document.querySelectorAll(".clb-tab").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.dataset.tab === id));
    });
    document.querySelectorAll(".clb-panel").forEach(function (p) {
      p.hidden = p.dataset.tab !== id;
    });
    writeHash(); render();
  }
  function render() {
    if (S.tab === "board") renderBoard();
    else if (S.tab === "caps") renderCaps();
    else if (S.tab === "games") renderGames();
    else if (S.tab === "cost") renderCost();
  }

  /* ── boot ───────────────────────────────────────────────────────── */
  function fail(msg) {
    var h = $("#clb-app");
    if (h) h.innerHTML = '<p class="clb-empty">' + msg + "</p>";
  }
  function get(path, json) {
    return fetch(BASE + path).then(function (r) {
      if (!r.ok) throw new Error(path + " → " + r.status);
      return json ? r.json() : r.text();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!$("#clb-app")) return;
    Promise.all([
      get("combined_results.csv"), get("cost_by_language.csv"), get("token_fertility.csv"),
      get("models.json", true), get("languages.json", true), get("capabilities.json", true)
    ]).then(function (r) {
      D.rows = parseCSV(r[0]);
      D.rows.forEach(function (x) { x._p = num(x.played); x._q = num(x.quality); });
      D.cost = parseCSV(r[1]);
      D.fert = parseCSV(r[2]);
      D.models = r[3]; D.langs = r[4]; D.caps = r[5];

      if (!S.langs.size) S.langs = new Set(D.langs.map(function (l) { return l.code; }));
      if (!S.models.size) S.models = new Set(D.models.map(function (m) { return m.model; }));

      buildFilters();

      document.querySelectorAll(".clb-tab").forEach(function (b) {
        b.addEventListener("click", function () { showTab(b.dataset.tab); });
      });
      $("#clb-all").addEventListener("click", function () { setLangs(D.langs.map(function (l) { return l.code; })); });
      $("#clb-none").addEventListener("click", function () { setLangs([]); });
      $("#clb-eu").addEventListener("click", function () {
        setLangs(D.langs.filter(function (l) { return l.group === "EU-24"; }).map(function (l) { return l.code; }));
      });
      $("#clb-models-all").addEventListener("click", function () {
        S.models = new Set(D.models.map(function (m) { return m.model; })); buildFilters(); writeHash(); render();
      });
      $("#clb-models-none").addEventListener("click", function () {
        S.models = new Set(); buildFilters(); writeHash(); render();
      });
      document.querySelectorAll("#clb-metric button").forEach(function (b) {
        b.addEventListener("click", function () {
          S.metric = b.dataset.metric;
          document.querySelectorAll("#clb-metric button").forEach(function (o) {
            o.setAttribute("aria-pressed", String(o === b));
          });
          renderGames();
        });
      });
      $("#clb-fert-all").addEventListener("change", function (e) {
        S.fertAll = e.target.checked; renderCost();
      });

      showTab(S.tab || "board");
    }).catch(function (e) {
      fail("Could not load the benchmark data (" + e.message + "). " +
           "If you are viewing this from the filesystem, serve the site over HTTP instead.");
    });
  });

  readHash();
})();
