---
layout: default
title: Leaderboard
---

<link rel="stylesheet" href="{{ '/assets/css/leaderboard.css' | relative_url }}">

<div class="clb" id="clb-app">

<div class="clb-intro">
 <h1>clembench v4.0 — multilingual</h1>
 <p class="clb-sub">Nine LLMs evaluated as agents in self-play across 14 dialogue games and 30 languages: the 24 official EU languages plus Arabic, Chinese, Russian, Serbian, Turkish and Ukrainian.</p>
 <div class="clb-badges">
  <span class="clb-badge is-current">v4.0 · current</span>
  <span class="clb-badge">30 languages</span>
  <span class="clb-badge">14 games</span>
  <span class="clb-badge">9 models</span>
  <span class="clb-badge">~108,000 episodes</span>
  <a class="clb-badge" href="{{ '/previous-benchmarks.html' | relative_url }}">Previous benchmarks →</a>
 </div>
</div>

<p><em>clemscore</em> combines the ability to follow game instructions at all (<em>% Played</em>) with how well the game was played when the instructions were followed (<em>Quality</em>). A model has to do both to score well.</p>

<div class="clb-filters">
 <div class="clb-filter">
  <h3>Languages <span class="clb-count" id="clb-lang-count"></span></h3>
  <div class="clb-actions">
   <button type="button" id="clb-all">Select all</button>
   <button type="button" id="clb-none">Deselect all</button>
   <button type="button" id="clb-eu">EU-24 only</button>
  </div>
  <div id="clb-lang-groups"></div>
 </div>
 <div class="clb-filter">
  <h3>Models <span class="clb-count" id="clb-model-count"></span></h3>
  <div class="clb-actions">
   <button type="button" id="clb-models-all">Select all</button>
   <button type="button" id="clb-models-none">Deselect all</button>
  </div>
  <div class="clb-chips" id="clb-model-chips"></div>
 </div>
</div>

<div class="clb-tabs" role="tablist">
 <button class="clb-tab" role="tab" data-tab="board" aria-selected="true">Leaderboard</button>
 <button class="clb-tab" role="tab" data-tab="caps" aria-selected="false">Capabilities</button>
 <button class="clb-tab" role="tab" data-tab="games" aria-selected="false">Games</button>
 <button class="clb-tab" role="tab" data-tab="cost" aria-selected="false">Cost &amp; tokenisation</button>
</div>

<div class="clb-panel" data-tab="board">
 <div id="clb-board"></div>
</div>

<div class="clb-panel" data-tab="caps" hidden>
 <p class="clb-note">Each axis is the mean clemscore over the games in that capability cluster, averaged across the selected languages.</p>
 <div class="clb-chartwrap" id="clb-caps-chart"></div>
</div>

<div class="clb-panel" data-tab="games" hidden>
 <div class="clb-toolbar">
  <span class="clb-seg" id="clb-metric">
   <button type="button" data-metric="clemscore" aria-pressed="true">clemscore</button>
   <button type="button" data-metric="played" aria-pressed="false">% Played</button>
   <button type="button" data-metric="quality" aria-pressed="false">Quality</button>
  </span>
 </div>
 <div id="clb-games"></div>
</div>

<div class="clb-panel" data-tab="cost" hidden>
 <div class="clb-toolbar">
  <label><input type="checkbox" id="clb-fert-all"> Include languages outside the benchmark set</label>
 </div>
 <div id="clb-cost"></div>
</div>

</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="{{ '/assets/js/leaderboard.js' | relative_url }}"></script>
<script>document.body.classList.add('leaderboard-page');</script>
