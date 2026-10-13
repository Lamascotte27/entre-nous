// Dessins des directions B (Point-virgule) et C (Jardin)
const f = n => +(+n).toFixed(2);

// ---------- B : Point & Virgule ----------
const B = { bleu: '#1F2FA8', rouge: '#E1243B', papier: '#F5F2EC', graphite: '#26252E', buvard: '#F6CDD3', craie: '#FFFFFF' };
// Point : disque. (cx, cy) centre, r rayon, regard dx
function point(cx, cy, r, o = {}) {
  const dx = o.dx || 0, dy = o.dy || 0, s = r / 34;
  const eyes = o.closed
    ? `<path d="M${f(cx - 13 * s + dx)} ${f(cy - 2 * s)}q${f(5 * s)} ${f(4 * s)} ${f(10 * s)} 0M${f(cx + 3 * s + dx)} ${f(cy - 2 * s)}q${f(5 * s)} ${f(4 * s)} ${f(10 * s)} 0" stroke="${B.papier}" stroke-width="${f(2.6 * s)}" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${f(cx - 8 * s + dx)}" cy="${f(cy - 3 * s + dy)}" rx="${f(3.2 * s)}" ry="${f(4.4 * s)}" fill="${o.eye || B.papier}"/><ellipse cx="${f(cx + 8 * s + dx)}" cy="${f(cy - 3 * s + dy)}" rx="${f(3.2 * s)}" ry="${f(4.4 * s)}" fill="${o.eye || B.papier}"/>`;
  const cheek = o.blush ? `<ellipse cx="${f(cx - 15 * s + dx)}" cy="${f(cy + 8 * s)}" rx="${f(5 * s)}" ry="${f(3 * s)}" fill="${B.buvard}" opacity=".85"/><ellipse cx="${f(cx + 15 * s + dx)}" cy="${f(cy + 8 * s)}" rx="${f(5 * s)}" ry="${f(3 * s)}" fill="${B.buvard}" opacity=".85"/>` : '';
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || B.bleu}"/>${cheek}${eyes}`;
}
// Virgule : tête ronde + queue. Construite dans une boîte 100x150 (tête centre 50,45 r34), placée par transform
function virgule(x, y, scale, o = {}) {
  const dx = o.dx || 0;
  const body = `<path d="M50 11A34 34 0 0 1 81.95 56.6C80 90 60 118 26 140C44 120 52 100 50 79A34 34 0 0 1 50 11Z" fill="${o.fill || B.rouge}"/>`;
  const eyes = o.closed
    ? `<path d="M${37 + dx} 43q5 4 10 0M${53 + dx} 43q5 4 10 0" stroke="${B.papier}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${42 + dx}" cy="42" rx="3.2" ry="4.4" fill="${B.papier}"/><ellipse cx="${58 + dx}" cy="42" rx="3.2" ry="4.4" fill="${B.papier}"/>`;
  const cheek = o.blush ? `<ellipse cx="${35 + dx}" cy="53" rx="5" ry="3" fill="${B.buvard}" opacity=".9"/><ellipse cx="${65 + dx}" cy="53" rx="5" ry="3" fill="${B.buvard}" opacity=".9"/>` : '';
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0} 50 60) scale(${scale})">${body}${cheek}${eyes}</g>`;
}
// poses (viewBox 0 0 200 200)
const bPoses = {
  ensemble: `${point(100, 52, 30, { dy: 3, blush: true })}${virgule(64, 92, 0.72, { blush: true, dx: 0 })}`,
  attente: `${point(62, 108, 30, { dx: 4 })}<circle cx="114" cy="124" r="7" fill="${B.graphite}" opacity=".35"/><circle cx="140" cy="124" r="7" fill="${B.graphite}" opacity=".22"/><circle cx="166" cy="124" r="7" fill="${B.graphite}" opacity=".12"/>`,
  calin: `${virgule(78, 26, 1.02, { rot: 14, blush: true, closed: true })}${point(78, 116, 30, { closed: true, blush: true, dx: -2 })}`,
  revelation: `${point(64, 112, 30, { dx: 3, blush: true })}${virgule(98, 56, 0.86, { rot: -8, blush: true, dx: -2 })}<path d="M40 52l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="${B.rouge}"/><path d="M168 44l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="${B.bleu}"/><path d="M172 132l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="${B.rouge}"/>`
};
// marque ; (point bleu sur virgule rouge), boîte 0 0 60 100
const bMark = (pc = B.bleu, vc = B.rouge) => `<circle cx="30" cy="18" r="15" fill="${pc}"/><g transform="translate(5 37) scale(.5)"><path d="M50 11A34 34 0 0 1 81.95 56.6C80 90 60 118 26 140C44 120 52 100 50 79A34 34 0 0 1 50 11Z" fill="${vc}"/></g>`;
// cachet de cire
function cachet(cx, cy, r) {
  let d = '';
  const n = 14;
  for (let i = 0; i <= n * 2; i++) {
    const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r * 0.9;
    d += (i ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a));
  }
  return `<path d="${d}Z" fill="${B.rouge}" stroke="${B.rouge}" stroke-width="6" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="${f(r * .68)}" fill="none" stroke="#B0182C" stroke-width="2"/><g transform="translate(${f(cx - r * .3)} ${f(cy - r * .52)}) scale(${f(r / 95)})">${bMark('#B0182C', '#B0182C')}</g>`;
}

// ---------- C : Jardin ----------
const G = { sapin: '#0F3B2F', pivoine: '#FF7096', pistache: '#C9E26B', lin: '#F2EDE3', mousse: '#5E8F6E', soleil: '#FFC24B', terre: '#0A2A21' };
function leaf(x1, y1, x2, y2, w, fill) { // feuille (lentille) entre deux points
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * w, ny = dx / L * w;
  return `<path d="M${f(x1)} ${f(y1)}Q${f(mx + nx)} ${f(my + ny)} ${f(x2)} ${f(y2)}Q${f(mx - nx)} ${f(my - ny)} ${f(x1)} ${f(y1)}Z" fill="${fill}"/>`;
}
const gMark = (a = G.pistache, b = G.pivoine, stem = G.mousse) => `${leaf(50, 88, 16, 22, 17, a)}${leaf(50, 88, 84, 22, 17, b)}<path d="M50 86V104" stroke="${stem}" stroke-width="6" stroke-linecap="round"/>`; // boîte 0 0 100 110
const face = (cx, cy, o = {}) => {
  const e = o.closed
    ? `<path d="M${cx - 9} ${cy}q3.5 3 7 0M${cx + 2} ${cy}q3.5 3 7 0" stroke="${G.sapin}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    : `<circle cx="${cx - 5.5}" cy="${cy}" r="2.8" fill="${G.sapin}"/><circle cx="${cx + 5.5}" cy="${cy}" r="2.8" fill="${G.sapin}"/>`;
  return e + `<path d="M${cx - 4} ${cy + 7}q4 4 8 0" stroke="${G.sapin}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
};
const pot = `<path d="M58 160H142L134 212H66Z" fill="${G.lin}"/><rect x="50" y="146" width="100" height="20" rx="10" fill="${G.lin}"/><path d="M58 166H142" stroke="${G.terre}" stroke-opacity=".12" stroke-width="3"/>`;
const potSoil = `<ellipse cx="100" cy="148" rx="40" ry="5" fill="${G.terre}" opacity=".25"/>`;
function pistacheHead(cx, cy, o = {}) { return `<ellipse cx="${cx}" cy="${cy}" rx="21" ry="19" fill="${G.pistache}" transform="rotate(-12 ${cx} ${cy})"/>${face(cx, cy - 1, o)}`; }
function pivoineHead(cx, cy, o = {}) {
  const bud = `<path d="M${cx} ${cy - 28}C${cx + 12} ${cy - 18} ${cx + 21} ${cy - 6} ${cx + 21} ${cy + 3}C${cx + 21} ${cy + 16} ${cx + 11} ${cy + 22} ${cx} ${cy + 22}C${cx - 11} ${cy + 22} ${cx - 21} ${cy + 16} ${cx - 21} ${cy + 3}C${cx - 21} ${cy - 6} ${cx - 12} ${cy - 18} ${cx} ${cy - 28}Z" fill="${G.pivoine}"/>`;
  const open = o.bloom ? [0, 1, 2, 3, 4].map(k => { const a = (k * 72 - 90) * Math.PI / 180; return `<circle cx="${f(cx + 17 * Math.cos(a))}" cy="${f(cy + 17 * Math.sin(a))}" r="13" fill="${G.pivoine}"/>`; }).join('') + `<circle cx="${cx}" cy="${cy}" r="15" fill="#FF8FAD"/>` : bud;
  return open + face(cx, cy + 2, o);
}
const gStages = {
  graine: `${pot}${potSoil}<path d="M92 147q8-12 16 0" fill="${G.mousse}"/>`,
  pousses: `<path d="M86 148Q82 120 82 96" stroke="${G.mousse}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M116 148Q120 122 118 100" stroke="${G.mousse}" stroke-width="6" fill="none" stroke-linecap="round"/>${leaf(84, 128, 64, 116, 7, G.mousse)}${leaf(117, 124, 137, 112, 7, G.mousse)}${pot}${potSoil}${pistacheHead(80, 82)}${pivoineHead(119, 84)}`,
  enlacees: `<path d="M84 148C78 124 112 112 108 90" stroke="${G.mousse}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M116 148C122 124 88 112 92 90" stroke="${G.mousse}" stroke-width="6" fill="none" stroke-linecap="round"/>${leaf(96, 120, 70, 108, 8, G.mousse)}${leaf(104, 120, 130, 108, 8, G.mousse)}${pot}${potSoil}${pistacheHead(88, 74, { closed: true })}${pivoineHead(113, 76, { closed: true })}`,
  fleuries: `<path d="M84 148C78 124 112 112 106 84" stroke="${G.mousse}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M116 148C122 124 88 112 94 84" stroke="${G.mousse}" stroke-width="6" fill="none" stroke-linecap="round"/>${leaf(96, 120, 68, 106, 9, G.mousse)}${leaf(104, 120, 132, 106, 9, G.mousse)}${leaf(100, 100, 82, 92, 6, G.pistache)}${pot}${potSoil}${pistacheHead(86, 64, { closed: true })}${pivoineHead(118, 62, { bloom: true, closed: true })}<circle cx="148" cy="40" r="5" fill="${G.soleil}"/><circle cx="50" cy="56" r="4" fill="${G.soleil}"/>`
};

module.exports = { B, point, virgule, bPoses, bMark, cachet, G, leaf, gMark, gStages, pistacheHead, pivoineHead, pot };
