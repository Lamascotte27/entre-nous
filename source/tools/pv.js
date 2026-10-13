// Entre nous : Point et Virgule (mascottes), cachet, icônes de ponctuation.
const C = { bleu: '#1F2FA8', rouge: '#E1243B', papier: '#F5F2EC', graphite: '#26252E', buvard: '#F6CDD3', beurre: '#FFD23F', nuit: '#0E1460', emboss: '#B0182C' };
const f = n => +(+n).toFixed(2);

// visage générique, coordonnées en unités "tête de rayon 34" centrée en (0,0) ; o.look = [dx,dy] des pupilles
function face(o = {}) {
  const lx = (o.look || [0, 0])[0], ly = (o.look || [0, 0])[1];
  let eyes;
  if (o.eyes === 'closed') eyes = `<path d="M-13 -3q5 4 10 0M3 -3q5 4 10 0" stroke="${C.papier}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  else if (o.eyes === 'happy') eyes = `<path d="M-13 -1q5 -6 10 0M3 -1q5 -6 10 0" stroke="${C.papier}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
  else {
    const big = o.eyes === 'big', rx = big ? 5.6 : 4.6, ry = big ? 6.6 : 5.6, pr = big ? 3.2 : 2.6;
    eyes = `<ellipse cx="-8" cy="-4" rx="${rx}" ry="${ry}" fill="${C.papier}"/><ellipse cx="8" cy="-4" rx="${rx}" ry="${ry}" fill="${C.papier}"/>` +
      `<circle cx="${f(-8 + lx)}" cy="${f(-3 + ly)}" r="${pr}" fill="${C.graphite}"/><circle cx="${f(8 + lx)}" cy="${f(-3 + ly)}" r="${pr}" fill="${C.graphite}"/>`;
  }
  const cheeks = `<ellipse cx="-16" cy="7" rx="5" ry="3" fill="${C.buvard}"/><ellipse cx="16" cy="7" rx="5" ry="3" fill="${C.buvard}"/>`;
  let mouth = '';
  if (o.mouth === 'o') mouth = `<ellipse cx="0" cy="10" rx="3" ry="3.8" fill="${C.nuit}"/>`;
  else if (o.mouth === 'open') mouth = `<path d="M-6 7Q0 19 6 7Z" fill="${C.nuit}" stroke="${C.nuit}" stroke-width="2" stroke-linejoin="round"/><ellipse cx="0" cy="12.6" rx="3" ry="1.7" fill="${C.rouge}"/>`;
  else if (o.mouth === 'small') mouth = `<ellipse cx="0" cy="9" rx="2.2" ry="1.6" fill="${C.nuit}"/>`;
  else mouth = `<path d="M-5 7q5 5 10 0" stroke="${C.papier}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  return cheeks + eyes + mouth;
}
// Point : disque centré (cx,cy) rayon r
function point(cx, cy, r, o = {}) {
  const k = r / 34;
  return `<g transform="translate(${cx} ${cy})"><circle r="${r}" fill="${o.fill || C.bleu}"/><g transform="scale(${f(k)})">${face(o)}</g></g>`;
}
// Virgule : tête de rayon 34 centrée (50,45) dans une boîte 100x150, posée par sa tête en (hx,hy), échelle k, rotation rot
const VPATH = 'M50 11A34 34 0 0 1 81.95 56.6C80 90 60 118 26 140C44 120 52 100 50 79A34 34 0 0 1 50 11Z';
function virgule(hx, hy, k, o = {}) {
  return `<g transform="translate(${hx} ${hy}) rotate(${o.rot || 0}) scale(${k}) translate(-50 -45)"><path d="${VPATH}" fill="${o.fill || C.rouge}"/><g transform="translate(50 45)">${face(o)}</g></g>`;
}
const star = (cx, cy, r, fill, stroke) => `<path d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z" fill="${fill}"${stroke ? ` stroke="${C.graphite}" stroke-width="2.4" stroke-linejoin="round"` : ''}/>`;
const heart = (cx, cy, s, fill) => `<path d="M${cx} ${f(cy + s * .9)}C${f(cx - s * 1.4)} ${f(cy + s * .1)} ${f(cx - s * .9)} ${f(cy - s)} ${cx} ${f(cy - s * .35)}C${f(cx + s * .9)} ${f(cy - s)} ${f(cx + s * 1.4)} ${f(cy + s * .1)} ${cx} ${f(cy + s * .9)}Z" fill="${fill}"/>`;
const zed = (cx, cy, s) => `<path d="M${cx - s} ${cy - s}L${cx + s} ${cy - s}L${cx - s} ${cy + s}L${cx + s} ${cy + s}" fill="none" stroke="${C.graphite}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;

let Q = { d: '', w: 0 }; // contour du « ? » de Caprasimo, injecté par gen2.js
const setGlyphs = (g) => { Q = g; };

// poses, viewBox 0 0 240 240
function poses() {
  return {
    ensemble: point(120, 50, 36, { look: [0, 2] }) + virgule(118, 132, .97, { look: [0, -2] }),
    attente: point(80, 122, 46, { look: [3, 0], mouth: 'o' }) + `<circle cx="154" cy="138" r="9" fill="${C.graphite}" opacity=".55"/><circle cx="182" cy="138" r="9" fill="${C.graphite}" opacity=".35"/><circle cx="210" cy="138" r="9" fill="${C.graphite}" opacity=".18"/>`,
    question: `<g transform="translate(${f(120 - Q.w * .5 / 2)} 12) scale(.5)"><path d="${Q.d}" fill="${C.rouge}"/></g>` + point(72, 170, 38, { look: [2, -3] }) + virgule(166, 148, .88, { look: [-2, -3], mouth: 'o' }),
    revelation: point(78, 156, 40, { eyes: 'big', mouth: 'open', look: [0, -1] }) + virgule(162, 116, .98, { eyes: 'big', mouth: 'open', rot: -6 }) +
      star(32, 66, 14, C.beurre, true) + star(214, 50, 10, C.bleu) + star(110, 34, 8, C.rouge) + star(218, 196, 9, C.beurre, true),
    calin: virgule(132, 84, 1.18, { rot: 16, eyes: 'closed' }) + point(96, 168, 40, { eyes: 'closed' }) + heart(206, 50, 13, C.rouge) + heart(36, 96, 9, C.bleu),
    endormi: point(78, 162, 40, { eyes: 'closed', mouth: 'small' }) + virgule(168, 138, .9, { eyes: 'closed', mouth: 'small', rot: 8 }) + zed(194, 60, 9) + zed(218, 34, 6),
    fete: point(72, 128, 40, { eyes: 'happy', mouth: 'open' }) + virgule(166, 104, .96, { eyes: 'happy', mouth: 'open', rot: -10 }) +
      `<rect x="20" y="36" width="10" height="18" rx="2" fill="${C.rouge}" transform="rotate(22 25 45)"/><rect x="214" y="28" width="10" height="18" rx="2" fill="${C.bleu}" transform="rotate(-26 219 37)"/><circle cx="118" cy="26" r="7" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4"/><circle cx="44" cy="206" r="7" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4"/><rect x="214" y="190" width="9" height="16" rx="2" fill="${C.rouge}" transform="rotate(30 218 198)"/><circle cx="226" cy="122" r="6" fill="${C.bleu}"/>`,
    point: point(120, 120, 86, { look: [0, 1] }),
    virgule: virgule(126, 80, 1.55, { look: [0, 1] })
  };
}
const stickerDef = (id) => `<defs><filter id="${id}" x="-12%" y="-12%" width="124%" height="124%"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/><feFlood flood-color="${C.papier}"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;

// cachet de cire avec le ; en relief
function cachet(cx, cy, r) {
  let d = '';
  const n = 14;
  for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r * .9; d += (i ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a)); }
  const k = r / 62;
  return `<path d="${d}Z" fill="${C.rouge}" stroke="${C.rouge}" stroke-width="${f(6 * k)}" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="${f(r * .7)}" fill="none" stroke="${C.emboss}" stroke-width="${f(2.2 * k)}"/>` +
    `<circle cx="${cx}" cy="${f(cy - 15 * k)}" r="${f(9 * k)}" fill="${C.emboss}"/><g transform="translate(${cx} ${f(cy + 9 * k)}) scale(${f(10 / 34 * k)}) translate(-50 -45)"><path d="${VPATH}" fill="${C.emboss}"/></g>`;
}

module.exports = { C, f, face, point, virgule, VPATH, poses, stickerDef, cachet, setGlyphs, star, heart };
