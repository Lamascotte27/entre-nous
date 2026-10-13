// Générateur des visuels Entre nous : logo, Pépin (mascotte), icônes d'app, motif.
// Une seule source pour les fichiers SVG (assets) et le composant Pepin du bundle.
const C = {
  ink: '#17162B', beurre: '#FFD23F', reflet: '#FFF0B3', tomate: '#FF5533',
  outremer: '#2F3CF5', lait: '#FFF8F0', blanc: '#FFFFFF'
};

const f = n => +n.toFixed(2);
const star = (cx, cy, r, fill) =>
  `<path d="M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
const heart = (cx, cy, s, fill) =>
  `<path d="M${cx} ${f(cy + s * .9)}C${f(cx - s * 1.4)} ${f(cy + s * .1)} ${f(cx - s * .9)} ${f(cy - s)} ${cx} ${f(cy - s * .35)}C${f(cx + s * .9)} ${f(cy - s)} ${f(cx + s * 1.4)} ${f(cy + s * .1)} ${cx} ${f(cy + s * .9)}Z" fill="${fill}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
const zed = (cx, cy, s) =>
  `<path d="M${cx - s} ${cy - s}L${cx + s} ${cy - s}L${cx - s} ${cy + s}L${cx + s} ${cy + s}" fill="none" stroke="${C.ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const stroke = (d, w = 4.5) => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const BODY = 'M100 54C113 63 157 103 157 150C157 186 131 212 100 212C69 212 43 186 43 150C43 103 87 63 100 54Z';

const eyes = {
  normal: `<ellipse cx="84" cy="128" rx="6.5" ry="9" fill="${C.ink}"/><ellipse cx="116" cy="128" rx="6.5" ry="9" fill="${C.ink}"/><circle cx="86.5" cy="124" r="2.4" fill="${C.blanc}"/><circle cx="118.5" cy="124" r="2.4" fill="${C.blanc}"/>`,
  haut: `<ellipse cx="87" cy="124" rx="6.5" ry="8.5" fill="${C.ink}"/><ellipse cx="119" cy="124" rx="6.5" ry="8.5" fill="${C.ink}"/><circle cx="89.5" cy="120" r="2.4" fill="${C.blanc}"/><circle cx="121.5" cy="120" r="2.4" fill="${C.blanc}"/>`,
  grands: `<circle cx="83" cy="126" r="10" fill="${C.ink}"/><circle cx="117" cy="126" r="10" fill="${C.ink}"/><circle cx="86" cy="122" r="3.5" fill="${C.blanc}"/><circle cx="120" cy="122" r="3.5" fill="${C.blanc}"/>`,
  heureux: stroke('M77 130Q84 120 91 130') + stroke('M109 130Q116 120 123 130'),
  fermes: stroke('M77 128Q84 134 91 128') + stroke('M109 128Q116 134 123 128')
};
const cheeks = (big) => `<ellipse cx="70" cy="150" rx="${big ? 11 : 9}" ry="${big ? 6.5 : 5.5}" fill="${C.tomate}"/><ellipse cx="130" cy="150" rx="${big ? 11 : 9}" ry="${big ? 6.5 : 5.5}" fill="${C.outremer}"/>`;
const mouths = {
  sourire: stroke('M91 150Q100 160 109 150'),
  o: `<ellipse cx="100" cy="153" rx="4" ry="5" fill="${C.ink}"/>`,
  ouvert: `<path d="M90 148Q100 170 110 148Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="100" cy="158.5" rx="4.5" ry="2.6" fill="${C.tomate}"/>`,
  grand: `<path d="M87 146Q100 172 113 146Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="100" cy="160" rx="6" ry="3.2" fill="${C.tomate}"/>`,
  petit: `<ellipse cx="100" cy="152" rx="3.5" ry="2.5" fill="${C.ink}"/>`
};

const MOODS = {
  content: { eyes: 'normal', mouth: 'sourire' },
  attend: { eyes: 'haut', mouth: 'o',
    front: `<circle cx="146" cy="86" r="4" fill="${C.blanc}" stroke="${C.ink}" stroke-width="3"/><circle cx="152" cy="68" r="6" fill="${C.blanc}" stroke="${C.ink}" stroke-width="3"/><rect x="128" y="24" width="58" height="32" rx="16" fill="${C.blanc}" stroke="${C.ink}" stroke-width="3"/><circle cx="144" cy="40" r="3.5" fill="${C.ink}"/><circle cx="157" cy="40" r="3.5" fill="${C.ink}"/><circle cx="170" cy="40" r="3.5" fill="${C.ink}"/>` },
  revelation: { eyes: 'grands', mouth: 'ouvert',
    back: stroke('M54 152L32 132', 5) + stroke('M146 152L168 132', 5) + `<circle cx="31" cy="131" r="5.5" fill="${C.ink}"/><circle cx="169" cy="131" r="5.5" fill="${C.ink}"/>`,
    front: star(38, 92, 12, C.beurre) + star(164, 98, 9, C.outremer) + star(152, 50, 7, C.tomate) },
  amoureux: { eyes: 'heureux', mouth: 'sourire', bigCheeks: true,
    front: heart(156, 80, 11, C.tomate) + heart(44, 94, 7, C.outremer) },
  endormi: { eyes: 'fermes', mouth: 'petit', front: zed(146, 88, 7) + zed(165, 66, 5) },
  fete: { eyes: 'heureux', mouth: 'grand', bigCheeks: true,
    back: stroke('M55 140L38 106', 5) + stroke('M145 140L162 106', 5) + `<circle cx="37" cy="104" r="5.5" fill="${C.ink}"/><circle cx="163" cy="104" r="5.5" fill="${C.ink}"/>`,
    front: `<rect x="26" y="58" width="8" height="15" rx="2" fill="${C.tomate}" transform="rotate(22 30 65)"/><rect x="166" y="56" width="8" height="15" rx="2" fill="${C.outremer}" transform="rotate(-26 170 63)"/><circle cx="56" cy="40" r="5" fill="${C.outremer}"/><circle cx="150" cy="30" r="5.5" fill="${C.beurre}" stroke="${C.ink}" stroke-width="2.5"/><rect x="178" y="112" width="7" height="13" rx="2" fill="${C.tomate}" transform="rotate(30 181 118)"/><circle cx="20" cy="118" r="4.5" fill="${C.beurre}" stroke="${C.ink}" stroke-width="2.5"/>` }
};

const leafR = (d) => `<path d="${d}" fill="${C.outremer}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
const STAGES = {
  graine: '',
  pousse: stroke('M100 58Q97 44 103 30') + leafR('M103 34C110 18 130 14 142 20C136 34 118 42 103 34Z'),
  fleur: stroke('M100 58Q97 40 101 24') + leafR('M101 46C108 32 126 28 136 34C130 46 114 52 101 46Z') + leafR('M100 52C93 38 75 34 65 40C71 52 87 58 100 52Z') +
    [0, 1, 2, 3, 4].map(k => { const a = (k * 72 - 90) * Math.PI / 180; return `<circle cx="${f(101 + 9 * Math.cos(a))}" cy="${f(20 + 9 * Math.sin(a))}" r="8" fill="${C.tomate}" stroke="${C.ink}" stroke-width="2.5"/>`; }).join('') +
    `<circle cx="101" cy="20" r="6" fill="${C.beurre}" stroke="${C.ink}" stroke-width="2.5"/>`
};

function pepinInner(mood = 'content', stage = 'graine') {
  const m = MOODS[mood] || MOODS.content;
  return (m.back || '') +
    `<ellipse cx="86" cy="212" rx="10" ry="6" fill="${C.ink}"/><ellipse cx="114" cy="212" rx="10" ry="6" fill="${C.ink}"/>` +
    (STAGES[stage] || '') +
    `<path d="${BODY}" fill="${C.beurre}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>` +
    stroke('M64 128Q66 106 82 90', 6).replace(C.ink, C.reflet) +
    cheeks(m.bigCheeks) + eyes[m.eyes] + mouths[m.mouth] + (m.front || '');
}
const stickerDef = (id) => `<defs><filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/><feFlood flood-color="${C.lait}"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
function pepin(mood, stage, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 216 256" role="img" aria-label="${title || 'Pépin'}">${stickerDef('st')}<g filter="url(#st)">${pepinInner(mood, stage)}</g></svg>`;
}

// ---------- logo ----------
const LENS = 'M62 16A34 34 0 0 1 62 76A34 34 0 0 1 62 16Z';
function markInner() {
  return `<circle cx="78" cy="46" r="34" fill="${C.outremer}"/><path d="M100 70Q106 86 116 94Q96 92 84 78Z" fill="${C.outremer}"/>` +
    `<circle cx="46" cy="46" r="34" fill="${C.tomate}"/><path d="M24 70Q18 86 8 94Q28 92 40 78Z" fill="${C.tomate}"/>` +
    `<path d="${LENS}" fill="${C.beurre}"/><ellipse cx="57" cy="44" rx="2.6" ry="3.8" fill="${C.ink}"/><ellipse cx="67" cy="44" rx="2.6" ry="3.8" fill="${C.ink}"/>`;
}
const mark = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 8 116 90" role="img" aria-label="Entre nous">${markInner()}</svg>`;

module.exports = { C, pepin, pepinInner, stickerDef, MOODS, STAGES, markInner, mark, BODY };
