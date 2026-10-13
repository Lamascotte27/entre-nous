// Entre nous : Point et Virgule (mascottes), cachet, icônes de ponctuation.
const C = { bleu: '#1F2FA8', rouge: '#E1243B', papier: '#F5F2EC', graphite: '#26252E', buvard: '#F6CDD3', beurre: '#FFD23F', nuit: '#0E1460', emboss: '#B0182C' };
const f = n => +(+n).toFixed(2);

// visage générique, coordonnées en unités "tête de rayon 34" centrée en (0,0) ; o.look = [dx,dy] des pupilles
function face(o = {}) {
  const lx = (o.look || [0, 0])[0], ly = (o.look || [0, 0])[1], ink = o.ink || C.papier;
  let eyes;
  if (o.eyes === 'closed') eyes = `<g class="pv-yeux-f"><path d="M-13 -3q5 4 10 0M3 -3q5 4 10 0" stroke="${ink}" stroke-width="2.8" fill="none" stroke-linecap="round"/></g>`;
  else if (o.eyes === 'happy') eyes = `<g class="pv-yeux-f"><path d="M-13 -1q5 -6 10 0M3 -1q5 -6 10 0" stroke="${ink}" stroke-width="2.8" fill="none" stroke-linecap="round"/></g>`;
  else {
    const big = o.eyes === 'big', rx = big ? 5.6 : 4.6, ry = big ? 6.6 : 5.6, pr = big ? 3.2 : 2.6;
    eyes = `<g class="pv-yeux"><ellipse cx="-8" cy="-4" rx="${rx}" ry="${ry}" fill="${C.papier}"/><ellipse cx="8" cy="-4" rx="${rx}" ry="${ry}" fill="${C.papier}"/>` +
      `<g class="pv-pup"><circle cx="${f(-8 + lx)}" cy="${f(-3 + ly)}" r="${pr}" fill="${C.graphite}"/><circle cx="${f(8 + lx)}" cy="${f(-3 + ly)}" r="${pr}" fill="${C.graphite}"/></g></g>`;
  }
  const cheeks = o.blush
    ? `<g class="pv-joues"><ellipse cx="-16" cy="7" rx="7" ry="4.2" fill="#FF8FA6"/><ellipse cx="16" cy="7" rx="7" ry="4.2" fill="#FF8FA6"/></g>`
    : `<ellipse cx="-16" cy="7" rx="5" ry="3" fill="${C.buvard}"/><ellipse cx="16" cy="7" rx="5" ry="3" fill="${C.buvard}"/>`;
  const brows = o.brows === 'fache' ? `<path d="M-15 -15L-3 -10.5M15 -15L3 -10.5" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>` : '';
  let mouth = '';
  if (o.mouth === 'o') mouth = `<ellipse cx="0" cy="10" rx="3" ry="3.8" fill="${C.nuit}"/>`;
  else if (o.mouth === 'open') mouth = `<path d="M-6 7Q0 19 6 7Z" fill="${C.nuit}" stroke="${C.nuit}" stroke-width="2" stroke-linejoin="round"/><ellipse cx="0" cy="12.6" rx="3" ry="1.7" fill="${C.rouge}"/>`;
  else if (o.mouth === 'small') mouth = `<ellipse cx="0" cy="9" rx="2.2" ry="1.6" fill="${C.nuit}"/>`;
  else if (o.mouth === 'moue') mouth = `<path d="M-5 11q5 -4.5 10 0" stroke="${ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  else mouth = `<path d="M-5 7q5 5 10 0" stroke="${ink}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  return cheeks + eyes + brows + `<g class="pv-bouche">${mouth}</g>`;
}
// Point : disque centré (cx,cy) rayon r
function point(cx, cy, r, o = {}) {
  const k = r / 34;
  return `<g transform="translate(${cx} ${cy})"><g class="pv-entree pv-ep"><g class="pv-corps"><circle r="${r}" fill="${o.fill || C.bleu}"/><g transform="scale(${f(k)})">${face(o)}</g></g></g></g>`;
}
// Virgule : tête de rayon 34 centrée (50,45) dans une boîte 100x150, posée par sa tête en (hx,hy), échelle k, rotation rot
const VPATH = 'M50 11A34 34 0 0 1 81.95 56.6C80 90 60 118 26 140C44 120 52 100 50 79A34 34 0 0 1 50 11Z';
function virgule(hx, hy, k, o = {}) {
  return `<g transform="translate(${hx} ${hy}) rotate(${o.rot || 0}) scale(${k}) translate(-50 -45)"><g class="pv-entree pv-ev"><g class="pv-corps-v"><path d="${VPATH}" fill="${o.fill || C.rouge}"/><g transform="translate(50 45)">${face(o)}</g></g></g></g>`;
}
const star = (cx, cy, r, fill, stroke, d = 0) => `<g class="pv-etoile" style="--d:${d}s"><path d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z" fill="${fill}"${stroke ? ` stroke="${C.graphite}" stroke-width="2.4" stroke-linejoin="round"` : ''}/></g>`;
const heart = (cx, cy, s, fill, d = 0) => `<g class="pv-coeur" style="--d:${d}s"><path d="M${cx} ${f(cy + s * .9)}C${f(cx - s * 1.4)} ${f(cy + s * .1)} ${f(cx - s * .9)} ${f(cy - s)} ${cx} ${f(cy - s * .35)}C${f(cx + s * .9)} ${f(cy - s)} ${f(cx + s * 1.4)} ${f(cy + s * .1)} ${cx} ${f(cy + s * .9)}Z" fill="${fill}"/></g>`;
const zed = (cx, cy, s, d = 0) => `<g class="pv-z" style="--d:${d}s"><path d="M${cx - s} ${cy - s}L${cx + s} ${cy - s}L${cx - s} ${cy + s}L${cx + s} ${cy + s}" fill="none" stroke="${C.graphite}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;

let Q = { d: '', w: 0 }, G = {}; // contours de Caprasimo (« ? », « ! », « € »), injectés par gen-anim.js
const setGlyphs = (g, autres) => { Q = g; G = autres || {}; };
// glyphe centré en (cx, cy), hauteur h
const glyph = (ch, cx, cy, h, fill, cls) => { const g = G[ch]; if (!g) return ''; const k = h / g.h; return `<g transform="translate(${f(cx - g.w * k / 2)} ${f(cy - h / 2)}) scale(${f(k)})"><g${cls ? ` class="${cls}"` : ''}><path d="${g.d}" fill="${fill}"/></g></g>`; };

// poses, viewBox 0 0 240 240
function poses() {
  return {
    ensemble: point(120, 50, 36, { look: [0, 2] }) + virgule(118, 132, .97, { look: [0, -2] }),
    attente: point(80, 122, 46, { look: [3, 0], mouth: 'o' }) + `<circle class="pv-pt" style="--i:0" cx="154" cy="138" r="9" fill="${C.graphite}" opacity=".55"/><circle class="pv-pt" style="--i:1" cx="182" cy="138" r="9" fill="${C.graphite}" opacity=".35"/><circle class="pv-pt" style="--i:2" cx="210" cy="138" r="9" fill="${C.graphite}" opacity=".18"/>`,
    question: `<g transform="translate(${f(120 - Q.w * .5 / 2)} 12) scale(.5)"><g class="pv-q"><path d="${Q.d}" fill="${C.rouge}"/></g></g>` + point(72, 170, 38, { look: [2, -3] }) + virgule(166, 148, .88, { look: [-2, -3], mouth: 'o' }),
    revelation: point(78, 156, 40, { eyes: 'big', mouth: 'open', look: [0, -1] }) + virgule(162, 116, .98, { eyes: 'big', mouth: 'open', rot: -6 }) +
      star(32, 66, 14, C.beurre, true, 0) + star(214, 50, 10, C.bleu, false, .5) + star(110, 34, 8, C.rouge, false, .9) + star(218, 196, 9, C.beurre, true, 1.3),
    calin: virgule(132, 84, 1.18, { rot: 16, eyes: 'closed' }) + point(96, 168, 40, { eyes: 'closed' }) + heart(206, 50, 13, C.rouge, 0) + heart(36, 96, 9, C.bleu, 1.2),
    endormi: point(78, 162, 40, { eyes: 'closed', mouth: 'small' }) + virgule(168, 138, .9, { eyes: 'closed', mouth: 'small', rot: 8 }) + zed(194, 60, 9, 0) + zed(218, 34, 6, 1.1),
    fete: point(72, 128, 40, { eyes: 'happy', mouth: 'open' }) + virgule(166, 104, .96, { eyes: 'happy', mouth: 'open', rot: -10 }) +
      `<g class="pv-conf" style="--d:0s"><rect x="20" y="36" width="10" height="18" rx="2" fill="${C.rouge}"/></g><g class="pv-conf" style="--d:.4s"><rect x="214" y="28" width="10" height="18" rx="2" fill="${C.bleu}"/></g><g class="pv-conf" style="--d:.8s"><circle cx="118" cy="26" r="7" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4"/></g><g class="pv-conf" style="--d:.2s"><circle cx="44" cy="206" r="7" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4"/></g><g class="pv-conf" style="--d:.6s"><rect x="214" y="190" width="9" height="16" rx="2" fill="${C.rouge}"/></g><g class="pv-conf" style="--d:1s"><circle cx="226" cy="122" r="6" fill="${C.bleu}"/></g>`,
    // ---------- variantes thématiques (Explorer) ----------
    souvenirs: `<path d="M-10 22Q120 44 250 16" stroke="${C.graphite}" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
      `<g class="pv-photo"><rect x="86" y="30" width="70" height="80" rx="4" fill="${C.papier}" stroke="${C.graphite}" stroke-width="3"/><rect x="94" y="38" width="54" height="50" rx="2" fill="${C.bleu}"/>` +
      `<circle cx="134" cy="52" r="7" fill="${C.beurre}"/><path d="M94 88V76Q108 60 122 72Q134 62 148 72V88Z" fill="${C.rouge}"/><rect x="114" y="20" width="14" height="20" rx="3" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4"/></g>` +
      star(196, 52, 11, C.beurre, true, .3) + star(40, 70, 7, C.rouge, false, 1.1) +
      point(68, 178, 38, { look: [3, -4] }) + virgule(178, 152, .84, { look: [-3, -4], rot: -6 }),
    avenir: `<path class="pv-trace" d="M26 128Q60 70 128 70" stroke="${C.papier}" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="1 11" opacity=".9"/>` +
      `<g transform="translate(150 62)"><g class="pv-avion"><path d="M-22 6L30 -16L-2 14Z" fill="${C.papier}" stroke="${C.graphite}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-2 14L30 -16L4 26Z" fill="#D9D4C8" stroke="${C.graphite}" stroke-width="2.6" stroke-linejoin="round"/></g></g>` +
      star(212, 116, 9, C.beurre, true, 0) + star(38, 40, 7, C.beurre, false, .7) + star(206, 22, 6, C.papier, false, 1.3) +
      point(76, 182, 38, { eyes: 'big', look: [2, -4], mouth: 'o' }) + virgule(170, 160, .82, { eyes: 'big', look: [-2, -4], mouth: 'open', rot: 6 }),
    argent: `<g transform="translate(84 62)"><g class="pv-piece"><g class="pv-piece-f"><circle r="23" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="3"/><circle r="16" fill="none" stroke="${C.graphite}" stroke-width="2" opacity=".35"/>${glyph('€', 0, 0, 20, C.graphite)}</g></g></g>` +
      [222, 208, 194].map((y, i) => `<g class="pv-pile" style="--d:${i * .15}s"><ellipse cx="206" cy="${y + 6}" rx="21" ry="8" fill="#E0B400" stroke="${C.graphite}" stroke-width="2.6"/><ellipse cx="206" cy="${y}" rx="21" ry="8" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.6"/></g>`).join('') +
      point(84, 180, 38, { look: [0, -5], mouth: 'o' }) + virgule(158, 140, .8, { look: [-4, -3], rot: -4 }),
    disputes: `<g class="pv-nuage"><path d="M88 80h62a17 17 0 0 0 0-34a24 24 0 0 0-44-9a19 19 0 0 0-18 43z" fill="${C.graphite}"/><g class="pv-eclair"><path d="M122 80L110 104h12l-8 22l24-30h-12l8-16z" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4" stroke-linejoin="round"/></g></g>` +
      heart(120, 214, 9, C.rouge, .4) +
      point(66, 174, 38, { look: [-4, 1], brows: 'fache', mouth: 'moue' }) + virgule(176, 146, .84, { look: [4, 1], brows: 'fache', mouth: 'moue', rot: 10 }),
    intimite: `<circle class="pv-halo" cx="200" cy="132" r="30" fill="${C.beurre}" opacity=".28"/><rect x="188" y="150" width="24" height="64" rx="5" fill="${C.papier}" stroke="${C.graphite}" stroke-width="2.6"/><path d="M200 150v-8" stroke="${C.graphite}" stroke-width="2.4" stroke-linecap="round"/>` +
      `<g class="pv-flamme"><path d="M200 112C210 126 211 134 200 144C189 134 190 126 200 112Z" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.2" stroke-linejoin="round"/><path d="M200 128C204 133 204 137 200 141C196 137 196 133 200 128Z" fill="${C.rouge}"/></g>` +
      heart(46, 66, 10, C.papier, 0) + heart(150, 30, 7, C.beurre, 1.4) +
      virgule(126, 88, 1.0, { rot: 16, eyes: 'closed', blush: true }) + point(86, 170, 40, { eyes: 'closed', blush: true }),
    distance: `<g class="pv-soleil"><circle cx="38" cy="44" r="13" fill="${C.beurre}" stroke="${C.graphite}" stroke-width="2.4"/><path d="M38 20v-6M38 74v-6M14 44h-6M68 44h-6M21 27l-4-4M59 65l-4-4M21 61l-4 4M59 23l-4 4" stroke="${C.graphite}" stroke-width="2.6" stroke-linecap="round"/></g>` +
      `<g class="pv-lune"><path d="M212 26a17 17 0 1 0 12 30a14 14 0 1 1 -12 -30z" fill="${C.bleu}"/></g>` +
      `<path d="M70 150Q120 30 176 112" stroke="${C.graphite}" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="1 10" opacity=".45"/>` +
      `<g class="pv-voyage"><path d="M0 9C-14 1 -9 -10 0 -3.5C9 -10 14 1 0 9Z" fill="${C.rouge}"/></g>` +
      point(50, 186, 32, { look: [4, -3] }) + virgule(194, 150, .7, { look: [-4, -3], rot: -6 }),
    rire: point(74, 162, 40, { eyes: 'happy', mouth: 'open' }) + virgule(170, 126, .92, { eyes: 'happy', mouth: 'open', rot: -10 }) +
      `<g class="pv-larme" style="--x:-16px;--d:0s"><path d="M30 120c-5 7-5 12 0 12s5-5 0-12z" fill="${C.bleu}"/></g><g class="pv-larme" style="--x:14px;--d:.35s"><path d="M222 92c-5 7-5 12 0 12s5-5 0-12z" fill="${C.bleu}"/></g>` +
      glyph('!', 40, 54, 40, C.rouge, 'pv-ha') + glyph('!', 128, 30, 30, C.bleu, 'pv-ha pv-ha2') + glyph('!', 214, 42, 26, C.graphite, 'pv-ha pv-ha3'),
    parents: heart(122, 140, 8, C.rouge, .4) +
      point(56, 166, 36, { look: [4, 4], eyes: 'happy' }) + virgule(188, 126, .78, { look: [-4, 4], eyes: 'happy', rot: -4 }) +
      `<g transform="translate(122 196)"><g class="pv-bebe"><circle r="21" fill="${C.beurre}"/><g transform="scale(.6)">${face({ eyes: 'happy', ink: C.graphite, mouth: 'small' })}</g></g></g>`,
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

module.exports = { C, f, face, point, virgule, VPATH, poses, stickerDef, cachet, setGlyphs, star, heart, glyph };
