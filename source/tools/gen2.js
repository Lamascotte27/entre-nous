const fs = require('fs'), path = require('path');
const opentype = require('opentype.js');
const P = require('./pv.js');
const { C, f } = P;
const ROOT = path.resolve(__dirname, '..'), OUT = path.join(ROOT, 'project', 'assets');
const font = opentype.loadSync(process.argv[2]);
const w = (p, s) => fs.writeFileSync(path.join(OUT, p), s);
const svg = (vb, inner, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg>`;

function glyph(ch, size) { // contour normalisé : boîte englobante commençant en 0,0
  const p0 = font.getPath(ch, 0, 0, size), bb = p0.getBoundingBox();
  const p = font.getPath(ch, -bb.x1, -bb.y1, size);
  return { d: p.toPathData(2), w: bb.x2 - bb.x1, h: bb.y2 - bb.y1 };
}
P.setGlyphs(glyph('?', 100));
const POSES = P.poses();

// ---- logo « entre ; nous » ----
const S = 100, xh = 50;
const pE = font.getPath('entre', 0, 0, S), wE = font.getAdvanceWidth('entre', S);
const gap = 24, rDot = 13.5, rHead = 15;
const dotCy = -(2 * rHead) - 5 - rDot, markTop = dotCy - rDot;
const mx = wE + gap + rHead;
const pN = font.getPath('nous', mx + rHead + gap, 0, S), wN = font.getAdvanceWidth('nous', S);
const kV = rHead / 34;
const markAt = (cx, dot, com) => `<circle cx="${f(cx)}" cy="${f(dotCy)}" r="${rDot}" fill="${dot}"/><g transform="translate(${f(cx)} ${f(-rHead)}) scale(${f(kV)}) translate(-50 -45)"><path d="${P.VPATH}" fill="${com}"/></g>`;
const bbE = pE.getBoundingBox(), bbN = pN.getBoundingBox();
const x0 = bbE.x1 - 6, x1 = bbN.x2 + 6;
const yTop = Math.min(bbE.y1, bbN.y1, markTop) - 6, yBot = 0 + (140 - 45) * kV - 0 + 4; // pointe de la queue
const tailY = -rHead + (140 - 45) * kV;
const y1 = Math.max(bbE.y2, bbN.y2, tailY) + 6;
const VB = `${f(x0)} ${f(yTop)} ${f(x1 - x0)} ${f(y1 - yTop)}`;
const lockup = (word, dot, com) => svg(VB, `<path d="${pE.toPathData(2)}" fill="${word}"/>${markAt(mx, dot, com)}<path d="${pN.toPathData(2)}" fill="${word}"/>`, 'Entre nous');
w('Logos/entre-nous-logo.svg', lockup(C.graphite, C.bleu, C.rouge));
w('Logos/entre-nous-logo-papier.svg', lockup(C.papier, C.papier, C.rouge));
w('Logos/entre-nous-logo-graphite.svg', lockup(C.graphite, C.graphite, C.graphite));
// marque seule ; (boîte 0 0 40 72 environ)
const markOnly = (dot, com) => svg(`${f(-rHead - 6)} ${f(markTop - 5)} ${f(2 * rHead + 12)} ${f(tailY - markTop + 10)}`, markAt(0, dot, com), 'Entre nous');
w('Logos/entre-nous-signe.svg', markOnly(C.bleu, C.rouge));
// icônes d'app
const iconMark = (dot, com) => `<g transform="translate(512 512) scale(7.6) translate(0 ${f(-(markTop + tailY) / 2)})">${markAt(0, dot, com)}</g>`;
w('Logos/app-icon.svg', svg('0 0 1024 1024', `<rect width="1024" height="1024" fill="${C.papier}"/>${iconMark(C.bleu, C.rouge)}`, 'Icône Entre nous'));
w('Logos/app-icon-bleu.svg', svg('0 0 1024 1024', `<rect width="1024" height="1024" fill="${C.bleu}"/>${iconMark(C.papier, C.rouge)}`, 'Icône Entre nous, fond bleu'));

// ---- mascottes en autocollant ----
const LABELS = { ensemble: 'Point et Virgule, ensemble', attente: 'Point attend Virgule', question: 'Point et Virgule devant la question du jour', revelation: 'Point et Virgule découvrent les réponses', calin: 'Point et Virgule, câlin', endormi: 'Point et Virgule endormis', fete: 'Point et Virgule font la fête', point: 'Point, avatar de ton ou ta partenaire', virgule: 'Virgule, ton avatar' };
for (const [k, inner] of Object.entries(POSES)) w(`Mascottes/${k}.svg`, svg('-8 -8 256 256', P.stickerDef('st') + `<g filter="url(#st)">${inner}</g>`, LABELS[k]));

// ---- ponctuation ----
const gQ = glyph('?', 80), gX = glyph('!', 80);
const center = (g, fill) => `<g transform="translate(${f(48 - g.w / 2)} ${f(48 - g.h / 2)})"><path d="${g.d}" fill="${fill}"/></g>`;
w('Ponctuation/question.svg', svg('0 0 96 96', center(gQ, C.rouge), 'Question du jour'));
w('Ponctuation/attente.svg', svg('0 0 96 96', `<circle cx="22" cy="60" r="9" fill="${C.bleu}"/><circle cx="48" cy="60" r="9" fill="${C.bleu}" opacity=".6"/><circle cx="74" cy="60" r="9" fill="${C.bleu}" opacity=".3"/>`, 'En attente'));
w('Ponctuation/revelation.svg', svg('0 0 96 96', center(gX, C.bleu), 'Révélation'));
w('Ponctuation/nous.svg', svg(`${f(-rHead - 14)} ${f(markTop - 12)} ${f(2 * rHead + 28)} ${f(tailY - markTop + 24)}`, markAt(0, C.bleu, C.rouge), 'Vous deux'));
w('Ponctuation/cachet.svg', svg('0 0 124 124', P.cachet(62, 62, 54), 'Cachet : réponse scellée'));

// ---- motif ----
const gq = glyph('?', 30), gx = glyph('!', 30);
let mo = '';
const cells = [[30, 30, 'nous'], [90, 34, 'q'], [150, 28, 'att'], [210, 32, 'x'], [34, 92, 'x'], [92, 88, 'att'], [150, 94, 'nous'], [208, 90, 'q'], [30, 152, 'att'], [90, 150, 'nous'], [152, 154, 'q'], [212, 148, 'att'], [32, 210, 'q'], [94, 212, 'x'], [150, 208, 'att'], [210, 212, 'nous']];
for (const [x, y, t] of cells) {
  if (t === 'nous') mo += `<g transform="translate(${x} ${y + 4}) scale(.42)">${markAt(0, C.bleu, C.rouge)}</g>`;
  if (t === 'q') mo += `<g transform="translate(${f(x - gq.w / 2)} ${f(y - gq.h / 2)})"><path d="${gq.d}" fill="${C.rouge}"/></g>`;
  if (t === 'x') mo += `<g transform="translate(${f(x - gx.w / 2)} ${f(y - gx.h / 2)})"><path d="${gx.d}" fill="${C.bleu}"/></g>`;
  if (t === 'att') mo += `<circle cx="${x - 10}" cy="${y + 6}" r="3.6" fill="${C.graphite}" opacity=".5"/><circle cx="${x}" cy="${y + 6}" r="3.6" fill="${C.graphite}" opacity=".5"/><circle cx="${x + 10}" cy="${y + 6}" r="3.6" fill="${C.graphite}" opacity=".5"/>`;
}
w('Motifs/motif-ponctuation.svg', svg('0 0 240 240', `<rect width="240" height="240" fill="${C.papier}"/>${mo}`, 'Motif Entre nous'));

// ---- données pour le bundle ----
fs.writeFileSync(path.join(ROOT, 'src', 'pv-data.json'), JSON.stringify({
  poses: POSES, vbLogo: VB, entre: pE.toPathData(2), nous: pN.toPathData(2), mx, rDot, rHead, xh, kV, vpath: P.VPATH, tailY,
  cachet: P.cachet(62, 62, 54), q: glyph('?', 100), dotCy, markTop
}));

// planche
const list = d => fs.readdirSync(path.join(OUT, d)).map(x => d + '/' + x);
const files = [...list('Logos'), ...list('Mascottes'), ...list('Ponctuation'), ...list('Motifs')];
const cell = (fl, bg) => `<figure style="background:${bg};margin:0;padding:10px;border-radius:12px;display:grid;place-items:center;gap:6px"><img src="../project/assets/${fl}" style="max-width:100%;height:140px;object-fit:contain"><figcaption style="font:11px system-ui;color:${bg === '#14152B' || bg === C.bleu ? '#fff' : '#333'}">${fl}</figcaption></figure>`;
fs.writeFileSync(path.join(ROOT, 'render', 'sheet2.html'), `<!doctype html><meta charset="utf-8"><body style="margin:0;padding:12px;background:#ccc"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px">${files.map(x => cell(x, C.papier)).join('')}${['Logos/entre-nous-logo-papier.svg', 'Mascottes/fete.svg', 'Mascottes/calin.svg'].map(x => cell(x, C.bleu)).join('')}${['Mascottes/revelation.svg', 'Mascottes/ensemble.svg'].map(x => cell(x, '#14152B')).join('')}</div></body>`);
console.log('ok', files.length, VB);
