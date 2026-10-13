(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var fmtEUR = function (v, d) {
    var a = Math.abs(v), s = v < 0 ? "−" : "";
    if (a >= 1e6) return s + (a / 1e6).toLocaleString("fr-FR", { maximumFractionDigits: d == null ? 2 : d }) + " M€";
    if (a >= 1e3) return s + Math.round(a / 1e3).toLocaleString("fr-FR") + " k€";
    return s + Math.round(a).toLocaleString("fr-FR") + " €";
  };
  var fmtN = function (v) { return Math.round(v).toLocaleString("fr-FR"); };

  /* ================= question du jour ================= */
  var QS = [
    ["Quel petit geste de l'autre te fait te sentir le plus aimé·e ?", "Quand tu me fais un café sans que je demande, les matins où je suis en retard."],
    ["Si on partait demain, sans aucune contrainte, ce serait où ?", "Lisbonne. Trois jours, pas de réveil, et des pastéis de nata au petit-déj."],
    ["Quel sujet on évite un peu trop, selon toi ?", "L'argent. On n'en parle que quand il y a un problème."],
    ["Quel souvenir de nous te fait encore sourire ?", "La panne de voiture en Bretagne, et la crêperie où on a attendu la dépanneuse pendant trois heures."],
    ["Qu'est-ce que tu aimerais qu'on fasse plus souvent ?", "Cuisiner ensemble le dimanche, même si c'est raté."]
  ];
  var qi = 0, streak = 41;
  var qText = $("#q-text"), meIn = $("#me-in"), meSaid = $("#me-said"), them = $("#them"), themSaid = $("#them-said"),
      send = $("#q-send"), next = $("#q-next"), streakEl = $("#streak");
  function loadQ() {
    qText.textContent = QS[qi][0];
    themSaid.textContent = QS[qi][1];
    them.classList.add("locked");
    meIn.hidden = false; meSaid.hidden = true; meIn.value = "";
    send.hidden = false; next.hidden = true; send.disabled = true;
    streakEl.textContent = "Série : " + streak + " jours";
  }
  meIn.addEventListener("input", function () { send.disabled = meIn.value.trim().length < 2; });
  send.addEventListener("click", function () {
    meSaid.textContent = meIn.value.trim();
    meIn.hidden = true; meSaid.hidden = false;
    them.classList.remove("locked");
    send.hidden = true; next.hidden = false;
    streak += 1; streakEl.textContent = "Série : " + streak + " jours";
  });
  next.addEventListener("click", function () { qi = (qi + 1) % QS.length; loadQ(); meIn.focus(); });
  loadQ();

  /* ================= onboarding ================= */
  var OB = window.ONBOARDING, PH = window.PHASES;
  var PH_COLORS = { compte: "var(--ink-3)", profil: "var(--ord-1)", relation: "var(--ord-2)", viral: "var(--rouge)", attrib: "var(--warn)", paywall: "var(--bleu)" };
  var NAME = "Léa", PARTNER = "Thomas";
  var fill = function (s) { return String(s || "").replace(/\{name\}/g, NAME).replace(/\{partner\}/g, PARTNER); };
  var couple = '<svg viewBox="0 0 120 90" aria-hidden="true"><circle cx="46" cy="45" r="32" fill="var(--bleu)" opacity=".9"/><circle cx="74" cy="45" r="32" fill="var(--rouge)" opacity=".85" style="mix-blend-mode:multiply"/></svg>';
  function renderScreen(s) {
    var u = s.ui, h = '<div class="island"></div><div class="sbar"><span>9:41</span><span>●●● ▮</span></div><div class="scr-body">';
    if (u.skip) h += '<div class="scr-skip">Skip</div>';
    var sheetLike = u.sheet || u.alert;
    if (!sheetLike) {
      if (u.offer) {
        h += '<div class="off-big">50% off</div><div class="off-timer">Offer expires in 23:56:34</div>' +
             '<div class="scr-title" style="text-align:center">One time offer!</div>' +
             '<div class="off-price">Just <s>$79.99</s> <b>$39.99/year</b></div>' +
             '<div class="scr-sub" style="text-align:center">Start a 7-day free trial today, and save an extra 50%. Offer only valid today.</div>' +
             '<div class="scr-spacer"></div><div class="scr-btn">Get 7 days free and save</div><div class="scr-link">I don\'t want it</div>';
      } else if (u.paywall) {
        h += '<div class="scr-title" style="text-align:center">' + esc(fill(s.title)) + '</div>' +
             '<div class="pw-trial"><i></i>7-day <b>FREE</b> trial enabled</div>' +
             '<div class="pw-plan sel"><span class="pw-tag">MOST POPULAR · SAVE 77%</span><b>Yearly</b><b class="r">$3.33</b><span>12 mo · $79.99</span><span class="r">each a month</span></div>' +
             '<div class="pw-plan"><b>Monthly</b><b class="r">$15.00</b><span>1 mo · $29.99</span><span class="r">each a month</span></div>' +
             '<div class="pw-stars"><span>★★★★★</span><br>292k 5-star reviews</div>' +
             '<div class="scr-spacer"></div><div class="scr-btn">Start your 7-day free trial</div><div class="scr-sub" style="text-align:center">Cancel your plan anytime.</div>';
      } else {
        h += '<div class="scr-title">' + esc(fill(s.title)) + '</div>';
        if (s.sub && !u.picker) h += '<div class="scr-sub">' + esc(fill(s.sub)) + '</div>';
        if (u.picker) h += '<div class="scr-sub">' + esc(s.sub) + '</div><div class="scr-picker"><div><span>August</span><b>September</b><span>October</span></div><div><span>21</span><b>22</b><span>23</span></div><div><span>2014</span><b>2015</b><span>2016</span></div></div>';
        if (u.illus) h += '<div class="scr-illus">' + couple + '</div>';
        if (u.fields) h += '<div class="scr-opts">' + u.fields.map(function (f, i) { return '<div class="scr-field"><small>' + esc(f) + '</small><span>' + (i === 0 ? esc(/partner|their/i.test(f) ? PARTNER : /email/i.test(f) ? "lea@exemple.fr" : NAME) : "&nbsp;") + '</span></div>'; }).join("") + '</div>';
        if (u.options) h += '<div class="scr-opts">' + u.options.map(function (o, i) { return '<div class="scr-opt' + (i === 0 ? " sel" : "") + '">' + esc(o) + '</div>'; }).join("") + '</div>';
        if (u.card) h += '<div class="scr-spacer"></div><div class="scr-card">' + couple.replace('viewBox="0 0 120 90"', 'viewBox="0 0 120 90" width="90"') + esc(u.card) + '</div>';
        if (u.notif) h += '<div class="scr-spacer"></div><div class="scr-notif"><b>Paired</b><span>' + PARTNER + ' answered today\'s question. Answer to reveal it!</span></div>';
        if (u.compare) h += '<div class="scr-cmp"><div class="wo"><b>Without Paired</b>' + u.compare.without.map(function (x) { return '<span>– ' + esc(x) + '</span>'; }).join("") + '</div><div class="wi"><b>With Paired</b>' + u.compare.with.map(function (x) { return '<span>✓ ' + esc(x) + '</span>'; }).join("") + '</div></div>';
        h += '<div class="scr-spacer"></div>';
        if (u.buttons) h += u.buttons.map(function (b, i) { return '<div class="scr-btn' + (i > 0 ? " alt" : "") + '">' + esc(fill(b)) + '</div>'; }).join("");
        if (u.link) h += '<div class="scr-link">' + esc(fill(u.link)) + '</div>';
      }
    }
    h += '</div>';
    if (sheetLike) {
      h += '<div class="dim"></div>';
      if (u.alert) {
        h += '<div class="alert"><b>' + esc(s.title) + '</b><span>Notifications may include alerts, sounds, and icon badges.</span><div class="acts"><span>Don\'t Allow</span><span>Allow</span></div></div>';
      } else if (u.iap) {
        h += '<div class="sheet"><div class="bar"></div><div class="t">In-App Purchase</div><div class="scr-field"><small>Paired Premium</small><span>1-week free trial, then $39.99 per year</span></div><div class="row"></div><div class="scr-btn" style="background:var(--bleu)">Subscribe</div></div>';
      } else {
        h += '<div class="sheet"><div class="bar"></div><div class="t">' + esc(s.title) + '</div><div class="row"></div><div class="row"></div><div class="row" style="width:70%"></div><div class="scr-btn" style="background:var(--bleu)">Continue</div></div>';
      }
    }
    if (s.sys) h += '<span class="sys-tag">Écran iOS</span>';
    return h;
  }
  var obi = 0, scr = $("#ob-screen"), strip = $("#ob-strip");
  OB.forEach(function (s, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.style.setProperty("--c", PH_COLORS[s.phase]);
    if (s.sys) b.className = "sys";
    b.setAttribute("aria-label", "Écran " + (i + 1) + " : " + fill(s.title));
    b.title = (i + 1) + ". " + fill(s.title);
    b.addEventListener("click", function () { showOB(i); });
    strip.appendChild(b);
  });
  var legend = $("#ob-legend");
  var counts = {};
  OB.forEach(function (s) { counts[s.phase] = (counts[s.phase] || 0) + 1; });
  legend.innerHTML = Object.keys(PH).map(function (k) { return '<span><i style="background:' + PH_COLORS[k] + '"></i>' + PH[k].label + ' · ' + counts[k] + '</span>'; }).join("") + '<span><i class="sysk"></i>hachuré = écran iOS imposé</span>';
  function showOB(i) {
    obi = (i + OB.length) % OB.length;
    var s = OB[obi];
    scr.innerHTML = renderScreen(s);
    $("#ob-phase").innerHTML = '<i style="background:' + PH_COLORS[s.phase] + '"></i>' + PH[s.phase].label;
    $("#ob-count").textContent = "Écran " + (obi + 1) + " sur " + OB.length + (s.sys ? " · écran système iOS" : "");
    $("#ob-lever").textContent = s.lever;
    $("#ob-why").textContent = fill(s.why);
    $("#ob-fr").textContent = fill(s.fr);
    $$("button", strip).forEach(function (b, k) { b.classList.toggle("on", k === obi); });
  }
  $("#ob-prev").addEventListener("click", function () { stopPlay(); showOB(obi - 1); });
  $("#ob-next").addEventListener("click", function () { stopPlay(); showOB(obi + 1); });
  var playT = null, playBtn = $("#ob-play");
  function stopPlay() { if (playT) { clearInterval(playT); playT = null; playBtn.textContent = "Lecture auto"; } }
  playBtn.addEventListener("click", function () {
    if (playT) return stopPlay();
    playBtn.textContent = "Pause";
    playT = setInterval(function () { showOB(obi + 1); }, 3200);
  });
  $("#onboarding").addEventListener("keydown", function (e) {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") { stopPlay(); showOB(obi + 1); }
    if (e.key === "ArrowLeft") { stopPlay(); showOB(obi - 1); }
  });
  showOB(0);

  /* ================= petits outils de graphique ================= */
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  // barre avec bout arrondi (4px) côté donnée, carrée côté ligne de base
  function barPath(x, y, w, h, horizontal) {
    var r = Math.min(4, horizontal ? h / 2 : w / 2, horizontal ? w : h);
    if (h <= 0 || w <= 0) return "";
    if (horizontal) return "M" + x + "," + y + "h" + (w - r) + "a" + r + "," + r + " 0 0 1 " + r + "," + r + "v" + (h - 2 * r) + "a" + r + "," + r + " 0 0 1 -" + r + "," + r + "h-" + (w - r) + "z";
    return "M" + x + "," + (y + h) + "v-" + (h - r) + "a" + r + "," + r + " 0 0 1 " + r + ",-" + r + "h" + (w - 2 * r) + "a" + r + "," + r + " 0 0 1 " + r + "," + r + "v" + (h - r) + "z";
  }
  function niceMax(v) { if (v <= 0) return 1; var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; var m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10; return m * p; }
  function tipFor(box) { var t = box.querySelector(".tip"); if (!t) { t = document.createElement("div"); t.className = "tip"; box.appendChild(t); } return t; }
  function placeTip(box, tip, x, y, html) {
    tip.innerHTML = html; tip.classList.add("show");
    var bw = box.clientWidth, tw = tip.offsetWidth;
    var cx = Math.max(tw / 2 + 4, Math.min(bw - tw / 2 - 4, x));
    tip.style.left = cx + "px"; tip.style.top = y + "px";
  }

  // barres horizontales : [{label, value, display, color, note}]
  function hbars(box, data, opts) {
    opts = opts || {};
    box.innerHTML = "";
    var W = Math.max(300, box.clientWidth || 640), rowH = opts.rowH || 50, barH = Math.min(24, rowH - 24), L = opts.left || 0, top = 6;
    var H = top + data.length * rowH + 4;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.aria || "" }, box);
    var max = opts.max || Math.max.apply(null, data.map(function (d) { return d.value; }));
    var avail = W - L - (opts.right || 84);
    var tip = tipFor(box);
    data.forEach(function (d, i) {
      var y = top + i * rowH;
      var t = el("text", { x: 0, y: y + 13, class: "lbl" }, svg); t.textContent = d.label;
      if (d.note) { var ts = el("tspan", { class: "", dx: 8 }, t); ts.textContent = d.note; ts.setAttribute("style", "font-weight:400;fill:var(--ink-3);font-size:11.5px"); }
      var w = Math.max(3, d.value / max * avail);
      var by = y + 18;
      el("path", { d: barPath(L, by, w, barH, true), fill: d.color }, svg);
      var v = el("text", { x: L + w + 8, y: by + barH / 2 + 4, class: "lbl" }, svg); v.textContent = d.display;
      var hit = el("rect", { x: 0, y: y, width: W, height: rowH, fill: "transparent" }, svg);
      hit.addEventListener("mousemove", function (e) {
        var r = box.getBoundingClientRect();
        placeTip(box, tip, e.clientX - r.left, (by / H) * box.clientHeight, '<i style="background:' + d.color + '"></i>' + esc(d.label) + " : <b>" + esc(d.display) + "</b>" + (d.tip ? "<br>" + esc(d.tip) : ""));
      });
      hit.addEventListener("mouseleave", function () { tip.classList.remove("show"); });
    });
  }
  window.hbars = hbars;

  // colonnes empilées mensuelles : series [{key,label,color}], rows [{m, key:value...}]
  function stackCols(box, rows, series, opts) {
    opts = opts || {};
    box.innerHTML = "";
    var W = Math.max(300, box.clientWidth || 760), H = Math.round(Math.min(320, Math.max(220, W * 0.42))), L = 58, R = 10, T = 12, B = 30;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.aria || "" }, box);
    var totals = rows.map(function (r) { return series.reduce(function (a, s) { return a + Math.max(0, r[s.key]); }, 0); });
    var max = niceMax(Math.max.apply(null, totals) * 1.05);
    var pw = W - L - R, ph = H - T - B, n = rows.length, band = pw / n, bw = Math.min(24, band - 2);
    for (var g = 0; g <= 4; g++) {
      var gy = T + ph - g / 4 * ph;
      el("line", { x1: L, x2: W - R, y1: gy, y2: gy, class: "grid" }, svg);
      var tx = el("text", { x: L - 8, y: gy + 4, "text-anchor": "end" }, svg); tx.textContent = fmtEUR(max * g / 4, 1);
    }
    var tip = tipFor(box);
    rows.forEach(function (r, i) {
      var x = L + i * band + (band - bw) / 2, acc = 0;
      series.forEach(function (s, si) {
        var v = Math.max(0, r[s.key]); if (!v) return;
        var h = v / max * ph, y = T + ph - acc / max * ph - h;
        var gap = acc > 0 ? 2 : 0; // 2px d'air entre segments empilés
        var isTop = series.slice(si + 1).every(function (s2) { return !(r[s2.key] > 0); });
        if (isTop) el("path", { d: barPath(x, y, bw, Math.max(0, h - gap), false), fill: s.color }, svg);
        else el("rect", { x: x, y: y, width: bw, height: Math.max(0, h - gap), fill: s.color }, svg);
        acc += v;
      });
      if ((i + 1) % (W < 480 ? 12 : 6) === 0 || i === 0) { var lx = el("text", { x: x + bw / 2, y: H - 10, "text-anchor": "middle" }, svg); lx.textContent = "M" + r.m; }
      var hit = el("rect", { x: L + i * band, y: T, width: band, height: ph, fill: "transparent" }, svg);
      hit.addEventListener("mousemove", function () {
        placeTip(box, tip, x + bw / 2, T + ph - totals[i] / max * ph,
          "<b>Mois " + r.m + "</b> · " + fmtEUR(totals[i]) + "<br>" + series.map(function (s) { return '<i style="background:' + s.color + '"></i>' + s.label + " : " + fmtEUR(r[s.key]); }).join("<br>"));
      });
      hit.addEventListener("mouseleave", function () { tip.classList.remove("show"); });
    });
    el("line", { x1: L, x2: W - R, y1: T + ph, y2: T + ph, class: "axis" }, svg);
  }

  // courbe avec zone + ligne zéro, crosshair
  function lineArea(box, rows, key, color, opts) {
    opts = opts || {};
    box.innerHTML = "";
    var W = Math.max(300, box.clientWidth || 760), H = Math.round(Math.min(240, Math.max(180, W * 0.3))), L = 58, R = 14, T = 18, B = 30;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.aria || "" }, box);
    var vals = rows.map(function (r) { return r[key]; });
    var hi = Math.max(0, Math.max.apply(null, vals)), lo = Math.min(0, Math.min.apply(null, vals));
    var span = niceMax((hi - lo) * 1.08 || 1), step = span / 4;
    var top = Math.ceil(hi / step) * step, bot = top - 4 * step; if (bot > lo) { bot -= step; }
    var pw = W - L - R, ph = H - T - B;
    var X = function (i) { return L + (rows.length === 1 ? pw / 2 : i / (rows.length - 1) * pw); };
    var Y = function (v) { return T + (top - v) / (top - bot) * ph; };
    for (var v = bot; v <= top + 1e-6; v += step) {
      el("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: Math.abs(v) < 1e-6 ? "axis" : "grid" }, svg);
      var tx = el("text", { x: L - 8, y: Y(v) + 4, "text-anchor": "end" }, svg); tx.textContent = fmtEUR(v, 1);
    }
    var d = rows.map(function (r, i) { return (i ? "L" : "M") + X(i).toFixed(1) + "," + Y(r[key]).toFixed(1); }).join("");
    el("path", { d: d + "L" + X(rows.length - 1) + "," + Y(0) + "L" + X(0) + "," + Y(0) + "Z", fill: color, opacity: ".1" }, svg);
    el("path", { d: d, fill: "none", stroke: color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);
    rows.forEach(function (r, i) { if ((i + 1) % (W < 480 ? 12 : 6) === 0 || i === 0) { var lx = el("text", { x: X(i), y: H - 10, "text-anchor": "middle" }, svg); lx.textContent = "M" + r.m; } });
    var last = rows[rows.length - 1];
    el("circle", { cx: X(rows.length - 1), cy: Y(last[key]), r: 5, fill: color, stroke: "var(--card)", "stroke-width": 2 }, svg);
    if (opts.mark) { var mi = opts.mark - 1; el("circle", { cx: X(mi), cy: Y(rows[mi][key]), r: 5, fill: "var(--card)", stroke: color, "stroke-width": 2 }, svg); var mt = el("text", { x: X(mi), y: Y(rows[mi][key]) - 12, "text-anchor": "middle", class: "lbl" }, svg); mt.textContent = opts.markLabel; }
    var cross = el("line", { x1: 0, x2: 0, y1: T, y2: T + ph, stroke: "var(--ink-3)", "stroke-width": 1, opacity: 0 }, svg);
    var dot = el("circle", { r: 5, fill: color, stroke: "var(--card)", "stroke-width": 2, opacity: 0 }, svg);
    var tip = tipFor(box);
    var hit = el("rect", { x: L, y: T, width: pw, height: ph, fill: "transparent" }, svg);
    hit.addEventListener("mousemove", function (e) {
      var rect = svg.getBoundingClientRect(), sc = 1;
      var mx = (e.clientX - rect.left), i = Math.round((mx - L) / pw * (rows.length - 1));
      i = Math.max(0, Math.min(rows.length - 1, i));
      cross.setAttribute("x1", X(i)); cross.setAttribute("x2", X(i)); cross.setAttribute("opacity", .5);
      dot.setAttribute("cx", X(i)); dot.setAttribute("cy", Y(rows[i][key])); dot.setAttribute("opacity", 1);
      placeTip(box, tip, X(i) * sc, Y(rows[i][key]) * sc, "<b>Mois " + rows[i].m + "</b><br>" + (opts.label || "") + " : " + fmtEUR(rows[i][key]));
    });
    hit.addEventListener("mouseleave", function () { tip.classList.remove("show"); cross.setAttribute("opacity", 0); dot.setAttribute("opacity", 0); });
  }

  // colonnes groupées ordinales (scénarios x années)
  function groupCols(box, groups, keys, colors, labels) {
    box.innerHTML = "";
    var W = Math.max(300, box.clientWidth || 760), H = 260, L = 58, R = 10, T = 22, B = 30;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img" }, box);
    var max = niceMax(Math.max.apply(null, groups.map(function (g) { return Math.max.apply(null, keys.map(function (k) { return g[k]; })); })) * 1.08);
    var pw = W - L - R, ph = H - T - B, gb = pw / groups.length, bw = Math.min(24, (gb - 16) / keys.length - 2), gap = 2;
    for (var g = 0; g <= 4; g++) { var gy = T + ph - g / 4 * ph; el("line", { x1: L, x2: W - R, y1: gy, y2: gy, class: "grid" }, svg); var tx = el("text", { x: L - 8, y: gy + 4, "text-anchor": "end" }, svg); tx.textContent = fmtEUR(max * g / 4, 1); }
    var tip = tipFor(box);
    groups.forEach(function (gr, gi) {
      var gw = keys.length * bw + (keys.length - 1) * gap, x0 = L + gi * gb + (gb - gw) / 2;
      keys.forEach(function (k, ki) {
        var h = gr[k] / max * ph, x = x0 + ki * (bw + gap), y = T + ph - h;
        el("path", { d: barPath(x, y, bw, h, false), fill: colors[ki] }, svg);
        if (ki === keys.length - 1) { var vt = el("text", { x: x + bw / 2, y: y - 6, "text-anchor": "middle", class: "lbl" }, svg); vt.textContent = fmtEUR(gr[k], 1); }
      });
      var lt = el("text", { x: x0 + gw / 2, y: H - 10, "text-anchor": "middle" }, svg); lt.textContent = gr.label;
      var hit = el("rect", { x: L + gi * gb, y: T, width: gb, height: ph, fill: "transparent" }, svg);
      hit.addEventListener("mousemove", function () {
        placeTip(box, tip, x0 + gw / 2, T + 10, "<b>" + esc(gr.label) + "</b><br>" + keys.map(function (k, ki) { return '<i style="background:' + colors[ki] + '"></i>' + labels[ki] + " : " + fmtEUR(gr[k]); }).join("<br>"));
      });
      hit.addEventListener("mouseleave", function () { tip.classList.remove("show"); });
    });
    el("line", { x1: L, x2: W - R, y1: T + ph, y2: T + ph, class: "axis" }, svg);
  }

  var css = function (v) { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); };

  /* ================= graphiques statiques ================= */
  function drawStatic() {
    hbars($("#ch-price"), [
      { label: "Mensuel × 12", value: 359.88, display: "359,88 $", note: "15,00 $ / pers. / mois", color: css("--ord-1") },
      { label: "Annuel (prix affiché)", value: 79.99, display: "79,99 $", note: "3,33 $ / pers. / mois", color: css("--ord-2") },
      { label: "Offre de rattrapage (−50 %)", value: 39.99, display: "39,99 $", note: "1,67 $ / pers. / mois", color: css("--ord-3") }
    ], { aria: "Coût sur un an selon l'offre Paired" });
    if (window.WORLD) hbars($("#ch-world"), window.WORLD.map(function (d) { return Object.assign({ color: css(d.hl ? "--bleu" : "--ord-1") }, d); }), { aria: "CA mensuel des principales apps de couple", rowH: 46 });
    if (window.MARKET_FUNNEL) hbars($("#ch-funnel"), window.MARKET_FUNNEL.map(function (d, i) { return Object.assign({ color: css(["--ord-1", "--ord-1", "--ord-2", "--ord-3"][i] || "--ord-3") }, d); }), { aria: "Du marché total au marché visé" });
  }

  /* ================= simulateur ================= */
  var PRESETS = window.PRESETS;
  var FIELDS = [
    { k: "budget", grp: "Acquisition", label: "Budget pub au départ", min: 1000, max: 40000, step: 500, f: function (v) { return fmtEUR(v); }, help: "par mois, Meta + TikTok" },
    { k: "growth", grp: "Acquisition", label: "Hausse du budget", min: 0, max: 0.12, step: 0.005, f: function (v) { return "+" + (v * 100).toFixed(1).replace(".", ",") + " %/mois"; }, help: "pendant 24 mois, puis budget stable" },
    { k: "cpi", grp: "Acquisition", label: "Coût par install (CPI)", min: 0.8, max: 5, step: 0.1, f: function (v) { return v.toFixed(2).replace(".", ",") + " €"; }, help: "il monte tout seul quand le budget grossit" },
    { k: "organic", grp: "Acquisition", label: "Installs organiques en plus", min: 0, max: 1.5, step: 0.05, f: function (v) { return "+" + Math.round(v * 100) + " %"; }, help: "TikTok organique, ASO, bouche-à-oreille" },
    { k: "trial", grp: "Conversion", label: "Install → essai gratuit", min: 0.03, max: 0.25, step: 0.005, f: function (v) { return (v * 100).toFixed(1).replace(".", ",") + " %"; } },
    { k: "conv", grp: "Conversion", label: "Essai → abonné payant", min: 0.15, max: 0.65, step: 0.01, f: function (v) { return Math.round(v * 100) + " %"; } },
    { k: "mixY", grp: "Conversion", label: "Part d'abonnés annuels", min: 0.3, max: 0.95, step: 0.05, f: function (v) { return Math.round(v * 100) + " %"; } },
    { k: "priceY", grp: "Prix (TTC)", label: "Prix annuel", min: 29.99, max: 99.99, step: 5, f: function (v) { return v.toFixed(2).replace(".", ",") + " €"; } },
    { k: "priceM", grp: "Prix (TTC)", label: "Prix mensuel", min: 4.99, max: 29.99, step: 1, f: function (v) { return v.toFixed(2).replace(".", ",") + " €"; } },
    { k: "renewY", grp: "Rétention", label: "Renouvellement annuel", min: 0.1, max: 0.7, step: 0.01, f: function (v) { return Math.round(v * 100) + " %"; }, help: "part des annuels qui repaient l'année suivante" },
    { k: "churnM", grp: "Rétention", label: "Désabonnement mensuel", min: 0.05, max: 0.35, step: 0.01, f: function (v) { return Math.round(v * 100) + " %"; } },
    { k: "fixed", grp: "Coûts fixes", label: "Coûts fixes", min: 0, max: 20000, step: 500, f: function (v) { return fmtEUR(v); }, help: "par mois : outils, serveurs, contenu, freelances" }
  ];
  var state = Object.assign({}, PRESETS.realiste), cur = "realiste";
  var host = $("#sim-ctrls"), groups = {};
  FIELDS.forEach(function (f) {
    if (!groups[f.grp]) { var g = document.createElement("div"); g.className = "grp"; g.innerHTML = "<b>" + f.grp + "</b>"; host.appendChild(g); groups[f.grp] = g; }
    var w = document.createElement("div"); w.className = "sl";
    w.innerHTML = '<label for="s-' + f.k + '">' + f.label + ' <output id="o-' + f.k + '"></output></label><input type="range" id="s-' + f.k + '" min="' + f.min + '" max="' + f.max + '" step="' + f.step + '">' + (f.help ? "<small>" + f.help + "</small>" : "");
    groups[f.grp].appendChild(w);
    var inp = $("input", w);
    inp.addEventListener("input", function () { state[f.k] = parseFloat(inp.value); setSeg(null); run(); });
  });
  function syncInputs() { FIELDS.forEach(function (f) { $("#s-" + f.k).value = state[f.k]; $("#o-" + f.k).textContent = f.f(state[f.k]); }); }
  function setSeg(k) { cur = k; $$("#sim-seg button").forEach(function (b) { b.classList.toggle("on", b.dataset.k === k); }); }
  $$("#sim-seg button").forEach(function (b) { b.addEventListener("click", function () { state = Object.assign({}, PRESETS[b.dataset.k]); setSeg(b.dataset.k); syncInputs(); run(); }); });
  var yearSum = function (rows, k, y) { return rows.slice(y * 12, y * 12 + 12).reduce(function (a, r) { return a + r[k]; }, 0); };

  function run() {
    FIELDS.forEach(function (f) { $("#o-" + f.k).textContent = f.f(state[f.k]); });
    var res = window.simulate(state, 36), rows = res.rows;
    var y = [0, 1, 2].map(function (i) { return yearSum(rows, "gross", i); });
    var last = rows[35];
    $("#k-y1").textContent = fmtEUR(y[0]); $("#k-y2").textContent = fmtEUR(y[1]); $("#k-y3").textContent = fmtEUR(y[2]);
    $("#k-m36").textContent = fmtEUR(last.gross);
    $("#k-m36s").textContent = "soit " + Math.round(last.gross / window.PAIRED_MONTHLY_EUR * 100) + " % du CA mensuel de Paired (monde)";
    $("#k-subs").textContent = fmtN(last.active);
    $("#k-subs-s").textContent = fmtN(res.couplesTotal) + " couples ont installé l'app en 3 ans (" + (res.couplesTotal / window.FR_COUPLES * 100).toFixed(1).replace(".", ",") + " % des couples)";
    var cash = last.cash;
    var kc = $("#k-cash"); kc.textContent = fmtEUR(cash); kc.className = "v " + (cash >= 0 ? "pos" : "neg");
    $("#k-pay").textContent = res.payback ? "Mois " + res.payback : "Pas en 36 mois";
    $("#k-net").textContent = fmtEUR(yearSum(rows, "net", 2));
    $("#k-ads").textContent = fmtEUR(rows.reduce(function (a, r) { return a + r.budget; }, 0));
    stackCols($("#ch-rev"), rows, [
      { key: "grossNew", label: "Nouveaux abonnements", color: css("--bleu") },
      { key: "grossRen", label: "Renouvellements", color: css("--rouge") }
    ], { aria: "Chiffre d'affaires mensuel TTC sur 36 mois" });
    lineArea($("#ch-cash"), rows, "cash", css("--bleu"), { label: "Résultat cumulé", aria: "Trésorerie cumulée", mark: res.payback || null, markLabel: res.payback ? "rentable" : "" });
    // tableau
    $("#sim-table").innerHTML = "<thead><tr><th></th><th>Année 1</th><th>Année 2</th><th>Année 3</th></tr></thead><tbody>" +
      [["CA TTC", "gross"], ["CA net (après TVA et Apple)", "net"], ["Budget pub", "budget"], ["Résultat", "profit"]].map(function (r) {
        return "<tr><td>" + r[0] + "</td>" + [0, 1, 2].map(function (i) { return '<td class="n">' + fmtEUR(yearSum(rows, r[1], i)) + "</td>"; }).join("") + "</tr>";
      }).join("") + "<tr><td>Installs (sans les partenaires)</td>" + [0, 1, 2].map(function (i) { return '<td class="n">' + fmtN(yearSum(rows, "installs", i)) + "</td>"; }).join("") + "</tr>" +
      "<tr><td>Installs partenaires gratuites</td>" + [0, 1, 2].map(function (i) { return '<td class="n">' + fmtN(yearSum(rows, "partner", i)) + "</td>"; }).join("") + "</tr></tbody>";
  }

  function drawScenarios() {
    var g = ["prudent", "realiste", "ambitieux"].map(function (k) {
      var r = window.simulate(PRESETS[k], 36).rows;
      return { label: PRESETS[k].name, a1: yearSum(r, "gross", 0), a2: yearSum(r, "gross", 1), a3: yearSum(r, "gross", 2) };
    });
    groupCols($("#ch-scen"), g, ["a1", "a2", "a3"], [css("--ord-1"), css("--ord-2"), css("--ord-3")], ["Année 1", "Année 2", "Année 3"]);
  }

  syncInputs(); setSeg("realiste"); run(); drawStatic(); drawScenarios();
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  var redraw = function () { run(); drawStatic(); drawScenarios(); };
  if (mq.addEventListener) mq.addEventListener("change", redraw);
  new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  var lastW = window.innerWidth, rT = null;
  window.addEventListener("resize", function () { if (Math.abs(window.innerWidth - lastW) < 8) return; lastW = window.innerWidth; clearTimeout(rT); rT = setTimeout(redraw, 120); });

  /* ================= nav active ================= */
  var links = $$(".nav a"), secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { var i = secs.indexOf(e.target); links.forEach(function (l, k) { l.classList.toggle("on", k === i); }); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { if (s) io.observe(s); });
  }
})();
