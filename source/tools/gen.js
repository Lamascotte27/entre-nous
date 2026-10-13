const fs = require('fs'), path = require('path');
const opentype = require('opentype.js');
const B = require('./brand.js');
const { C } = B;
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'project', 'assets');
const fontPath = process.argv[2];
fs.mkdirSync(path.join(OUT, 'Logos'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'Mascotte'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'Motifs'), { recursive: true });
const w = (p, s) => { fs.writeFileSync(path.join(OUT, p), s); };

// ---- wordmark, contours vectorisés de Caprasimo ----
const font = opentype.loadSync(fontPath);
const SIZE = 100;
const wmPath = font.getPath('entre nous', 0, 0, SIZE, { kerning: true, letterSpacing: -0.01 });
const bb = wmPath.getBoundingBox();
const wmD = wmPath.toPathData(2);
const wmW = bb.x2 - bb.x1, wmH = bb.y2 - bb.y1;
const xh = font.charToGlyph('x').getBoundingBox();
const xHeight = (xh.y2 - xh.y1) * SIZE / font.unitsPerEm;
console.log('wordmark bbox', bb, 'x-height', xHeight);

const wordmark = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(bb.x1 - 4).toFixed(1)} ${(bb.y1 - 4).toFixed(1)} ${(wmW + 8).toFixed(1)} ${(wmH + 8).toFixed(1)}" role="img" aria-label="Entre nous"><path d="${wmD}" fill="${fill}"/></svg>`;
w('Logos/entre-nous-wordmark.svg', wordmark(C.ink));
w('Logos/entre-nous-wordmark-lait.svg', wordmark(C.lait));

// ---- lockup horizontal : marque à gauche, centrée sur la hauteur d'x du mot ----
// marque : contenu x 8..116, y 12..94 (centre optique ~ y 50)
const markH = xHeight * 1.9, sc = markH / 82;
const mx = bb.x1 - 116 * sc - xHeight * 0.55; // gouttière ≈ 0,55 hauteur d'x
const my = -xHeight / 2 - 50 * sc;            // centre de la marque sur le milieu de la hauteur d'x
const lockup = (fill) => {
  const x0 = mx + 8 * sc - 6, y0 = Math.min(my + 12 * sc, bb.y1) - 6;
  const x1 = bb.x2 + 6, y1 = Math.max(my + 94 * sc, bb.y2) + 6;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0.toFixed(1)} ${y0.toFixed(1)} ${(x1 - x0).toFixed(1)} ${(y1 - y0).toFixed(1)}" role="img" aria-label="Entre nous"><g transform="translate(${mx.toFixed(2)} ${my.toFixed(2)}) scale(${sc.toFixed(4)})">${B.markInner()}</g><path d="${wmD}" fill="${fill}"/></svg>`;
};
w('Logos/entre-nous-lockup.svg', lockup(C.ink));
w('Logos/entre-nous-lockup-lait.svg', lockup(C.lait));
w('Logos/entre-nous-mark.svg', B.mark());

// ---- icônes d'app 1024 ----
const iconInk = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Icône Entre nous"><rect width="1024" height="1024" fill="${C.ink}"/><g transform="translate(512 520) scale(6.4) translate(-62 -53)">${B.markInner()}</g></svg>`;
w('Logos/app-icon.svg', iconInk);
const iconBeurre = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Icône Entre nous, variante Pépin"><rect width="1024" height="1024" fill="${C.beurre}"/><g transform="translate(512 560) scale(4.4) translate(-100 -140)">${B.pepinInner('content', 'pousse')}</g></svg>`;
w('Logos/app-icon-pepin.svg', iconBeurre);

// ---- Pépin ----
const moods = { content: 'Pépin, content', attend: 'Pépin attend la réponse', revelation: 'Pépin découvre les réponses', amoureux: 'Pépin amoureux', endormi: 'Pépin endormi', fete: 'Pépin fait la fête' };
for (const [m, t] of Object.entries(moods)) w(`Mascotte/pepin-${m}.svg`, B.pepin(m, 'graine', t));
w('Mascotte/pepin-pousse.svg', B.pepin('content', 'pousse', 'Pépin, 7 jours de série'));
w('Mascotte/pepin-fleur.svg', B.pepin('amoureux', 'fleur', 'Pépin, 100 jours de série'));

// ---- motif : bulles et lentilles, tuile 240 ----
const lens = (cx, cy, s, fill) => `<path d="M${cx} ${cy - 15 * s}A17 17 0 0 1 ${cx} ${cy + 15 * s}A17 17 0 0 1 ${cx} ${cy - 15 * s}Z" fill="${fill}" transform="rotate(0)"/>`;
const duo = (cx, cy, r, flip) => { const d = r * 0.9, h = Math.sqrt(r * r - (d / 2) * (d / 2)); const L = flip ? C.outremer : C.tomate, R = flip ? C.tomate : C.outremer;
  return `<circle cx="${cx - d / 2}" cy="${cy}" r="${r}" fill="${L}"/><circle cx="${cx + d / 2}" cy="${cy}" r="${r}" fill="${R}"/><path d="M${cx} ${(cy - h).toFixed(2)}A${r} ${r} 0 0 1 ${cx} ${(cy + h).toFixed(2)}A${r} ${r} 0 0 1 ${cx} ${(cy - h).toFixed(2)}Z" fill="${C.beurre}"/>`; };
const seed = (cx, cy, s, fill) => `<path d="M${cx} ${cy - 14 * s}C${cx + 1.6 * s} ${cy - 12.8 * s} ${cx + 7.4 * s} ${cy - 7.6 * s} ${cx + 7.4 * s} ${cy - 1.3 * s}C${cx + 7.4 * s} ${cy + 3.5 * s} ${cx + 4 * s} ${cy + 7 * s} ${cx} ${cy + 7 * s}C${cx - 4 * s} ${cy + 7 * s} ${cx - 7.4 * s} ${cy + 3.5 * s} ${cx - 7.4 * s} ${cy - 1.3 * s}C${cx - 7.4 * s} ${cy - 7.6 * s} ${cx - 1.6 * s} ${cy - 12.8 * s} ${cx} ${cy - 14 * s}Z" fill="${fill}"/>`;
let mo = '';
for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
  const x = 30 + c * 60, y = 30 + r * 60;
  mo += ((r + c) % 2 === 0) ? duo(x, y, 14, (r % 2) === 1) : seed(x, y + 3, 1.25, [C.beurre, C.tomate, C.outremer][(r * 4 + c) % 3]);
}
const motif = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Motif Entre nous"><rect width="240" height="240" fill="${C.lait}"/>${mo}</svg>`;
w('Motifs/motif-bulles.svg', motif);

// export pour le bundle : le dessin de Pépin en chaînes
const pep = {};
for (const m of Object.keys(B.MOODS)) for (const s of Object.keys(B.STAGES)) pep[m + '|' + s] = B.pepinInner(m, s);
fs.writeFileSync(path.join(ROOT, 'src', 'pepin-data.json'), JSON.stringify(pep));
fs.writeFileSync(path.join(ROOT, 'src', 'logo-data.json'), JSON.stringify({ mark: B.markInner(), wordmark: wmD, wm: [bb.x1, bb.y1, wmW, wmH], lockup: { mx, my, sc } }));

// planche de contrôle
const files = fs.readdirSync(path.join(OUT, 'Logos')).map(f => 'Logos/' + f).concat(fs.readdirSync(path.join(OUT, 'Mascotte')).map(f => 'Mascotte/' + f), ['Motifs/motif-bulles.svg']);
const cell = (f, bg) => `<figure style="background:${bg};margin:0;padding:12px;border-radius:12px;display:grid;place-items:center;gap:6px"><img src="../project/assets/${f}" style="max-width:100%;height:150px;object-fit:contain"><figcaption style="font:11px system-ui;color:${bg === C.ink ? '#fff' : '#333'}">${f}</figcaption></figure>`;
fs.writeFileSync(path.join(ROOT, 'render', 'sheet.html'), `<!doctype html><meta charset="utf-8"><body style="margin:0;padding:16px;background:#ddd"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px">${files.map(f => cell(f, C.lait)).join('')}${files.filter(f => f.includes('lockup') || f.includes('mark') || f.startsWith('Mascotte')).map(f => cell(f, C.ink)).join('')}</div></body>`);
console.log('ok', files.length);
