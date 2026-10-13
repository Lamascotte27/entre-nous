const fs = require('fs'), path = require('path');
const A = require('./brand.js');
const D = require('./dirs.js');
const ROOT = path.resolve(__dirname, '..');
let sid = 0;
const pep = (mood, stage, w) => { const id = 'st' + (++sid); return `<svg class="pep" viewBox="-8 -8 216 256" width="${w}" height="${Math.round(w * 256 / 216)}" role="img" aria-label="Pépin">${A.stickerDef(id)}<g filter="url(#${id})">${A.pepinInner(mood, stage)}</g></svg>`; };
const markA = (h) => `<svg viewBox="4 8 116 90" height="${h}" width="${Math.round(h * 116 / 90)}" aria-hidden="true">${A.markInner()}</svg>`;
const markB = (h, p, v) => `<svg viewBox="0 -2 60 100" height="${h}" width="${Math.round(h * .6)}" aria-hidden="true">${D.bMark(p, v)}</svg>`;
const markC = (h, a, b, s) => `<svg viewBox="8 14 84 94" height="${h}" width="${Math.round(h * 84 / 94)}" aria-hidden="true">${D.gMark(a, b, s)}</svg>`;
const bSvg = (k, w) => `<svg viewBox="0 0 200 200" width="${w}" height="${w}" role="img" aria-label="Point et Virgule">${D.bPoses[k]}</svg>`;
const cSvg = (k, w) => `<svg viewBox="30 0 140 220" width="${w}" height="${Math.round(w * 220 / 140)}" role="img" aria-label="Pivoine et Pistache">${D.gStages[k]}</svg>`;
const status = (dark) => `<div class="sb${dark ? ' sb-d' : ''}"><span>9:41</span><i></i><span class="sb-r">●●●</span></div>`;

// ---------------- écrans d'app ----------------
const phoneA = `<div class="ph" data-ph><div class="scr a-scr">${status()}
<div class="a-head"><span class="a-logo">${markA(22)}entre nous</span><span class="a-serie">${pep('content', 'pousse', 20)}41</span></div>
<div class="a-micro">Question du jour · mar. 13 oct.</div>
<div class="a-q">Quel petit geste de l’autre te fait te sentir aimé·e ?</div>
<div class="a-b a-moi"><b>Toi</b><span class="pend">Ta réponse…</span><span class="done">Quand tu me fais un café sans que je demande.</span><svg class="tail" viewBox="0 0 24 18"><path d="M2 0C4 8 2 14 0 18C10 16 18 10 22 0Z"/></svg></div>
<div class="a-b a-autre"><b>Thomas</b><span class="blur">Quand tu me laisses la dernière part de tarte.</span><svg class="tail" viewBox="0 0 24 18"><path d="M2 0C4 8 2 14 0 18C10 16 18 10 22 0Z"/></svg></div>
<div class="a-foot"><span class="pend">${pep('attend', 'graine', 58)}</span><span class="done">${pep('revelation', 'graine', 58)}</span><p><span class="pend">Thomas a répondu.<br>Réponds pour voir.</span><span class="done">Vos réponses sont prêtes.<br>À vous d’en parler.</span></p></div>
<div class="a-cta"><span class="pend">Répondre</span><span class="done">Question suivante</span></div>
</div></div>`;

const phoneB = `<div class="ph" data-ph><div class="scr b-scr">${status()}
<div class="b-head"><span class="b-logo">entre ${markB(17)} nous</span><span class="b-serie">41 jours</span></div>
<div class="b-micro">Question du jour — mardi 13 octobre</div>
<div class="b-q">Quel petit geste de l’autre te fait te sentir aimé·e <em>?</em></div>
<div class="b-note b-mine"><span class="pend b-ph">Écris ta réponse…</span><span class="done">Quand tu me fais un café sans que je demande.</span><small>— Léa</small></div>
<div class="b-note b-theirs"><div class="b-sealed pend"><svg viewBox="0 0 200 200" width="54" height="54" aria-hidden="true">${D.cachet(100, 100, 62)}</svg><span>Billet scellé jusqu’à ta réponse</span></div><div class="done">Quand tu me laisses la dernière part de tarte.<small>— Thomas</small></div></div>
<div class="b-foot"><span class="pend">${bSvg('attente', 64)}</span><span class="done">${bSvg('ensemble', 64)}</span><p><span class="pend">Thomas a glissé sa réponse.</span><span class="done">Vos deux billets sont ouverts.</span></p></div>
<div class="b-cta"><span class="pend">Écrire ma réponse</span><span class="done">Lire la suite</span></div>
</div></div>`;

const phoneC = `<div class="ph" data-ph><div class="scr c-scr">${status(true)}
<div class="c-head"><span class="c-logo">${markC(22)}entre nous</span><span class="c-serie">41 j</span></div>
<div class="c-micro">Question du jour</div>
<div class="c-q">Quel petit geste de l’autre te fait te sentir aimé·e ?</div>
<div class="c-card c-moi"><b>Toi</b><span class="pend">Ta réponse…</span><span class="done">Quand tu me fais un café sans que je demande.</span></div>
<div class="c-card c-autre"><b>Thomas</b><span class="blur">Quand tu me laisses la dernière part de tarte.</span></div>
<div class="c-foot"><span class="pend">${cSvg('pousses', 62)}</span><span class="done">${cSvg('fleuries', 62)}</span><p><span class="pend">Thomas a arrosé le jardin.<br>À toi.</span><span class="done">Ça a poussé.<br>Parlez-en ce soir.</span></p></div>
<div class="c-cta"><span class="pend">Répondre</span><span class="done">Voir le jardin</span></div>
</div></div>`;

// ---------------- notifications (écran verrouillé) ----------------
const lock = (cls, icon, n1, n2) => `<div class="lock ${cls}"><div class="lock-t">21:47</div><div class="lock-d">mardi 13 octobre</div>
<div class="nt"><span class="nt-i">${icon}</span><div><b>Entre nous <em>maintenant</em></b><p>${n1}</p></div></div>
<div class="nt"><span class="nt-i">${icon}</span><div><b>Entre nous <em>il y a 2 h</em></b><p>${n2}</p></div></div></div>`;

// ---------------- widgets d'écran d'accueil ----------------
const widget = (cls, art, big, small) => `<div class="t t-wid ${cls}"><div class="wall"><div class="wid">${art}<div><div class="wid-n">${big}</div><div class="wid-s">${small}</div></div></div><div class="apps"><i></i><i></i><i></i><i></i></div></div><div class="cap">Le widget d’écran d’accueil</div></div>`;
// ---------------- page ----------------
const html = `<title>Entre nous, trois pistes</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;500;700;800&family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;700;800&family=Young+Serif&display=swap">
<style>
${fs.readFileSync(path.join(__dirname, 'page.css'), 'utf8')}
</style>
<header class="top"><div class="wrap top-in"><span class="top-b">Entre nous · pistes de marque</span><nav><a href="#pop"><i style="background:#FF5533"></i>A · Pop</a><a href="#virgule"><i style="background:#1F2FA8"></i>B · Point-virgule</a><a href="#jardin"><i style="background:#0F3B2F"></i>C · Jardin</a><a href="#choix">Comparer</a></nav></div></header>
<main>
<section class="wrap hero">
  <div class="hero-k">Identité visuelle · trois directions</div>
  <h1>Même app, même nom,<br>trois façons de la faire aimer.</h1>
  <p class="hero-p">Chaque piste a sa mascotte, sa palette, sa typo, son icône et son écran « question du jour ». Touche « Voir la révélation » sous chaque téléphone pour jouer le moment clé de l’app. Choisis une piste, ou un mélange, et je la décline en charte complète.</p>
  <div class="hero-row">
    <a class="hero-c c1" href="#pop"><span>A</span>${pep('content', 'graine', 100)}<b>Pop</b><small>Joueur · franc · contagieux</small></a>
    <a class="hero-c c2" href="#virgule"><span>B</span>${bSvg('ensemble', 124)}<b>Point-virgule</b><small>Spirituel · élégant · littéraire</small></a>
    <a class="hero-c c3" href="#jardin"><span>C</span>${cSvg('pousses', 88)}<b>Jardin</b><small>Doux · vivant · apaisant</small></a>
  </div>
</section>

<!-- ===================== A ===================== -->
<section class="dir dA" id="pop"><div class="wrap">
  <div class="intro">
    <div><div class="letter">A</div><h2>Pop</h2><div class="kw">Joueur · Franc · Contagieux</div></div>
    <div class="intro-t">
      <p class="concept">Deux bulles qui se chevauchent : toi en tomate, l’autre en outremer. Là où elles se croisent naît <b>Pépin</b>, le « nous ». Il grandit à chaque jour de série : graine, pousse, puis fleur.</p>
      <dl><dt>Pour qui</dt><dd>20–35 ans, couples qui rient beaucoup, gros consommateurs de TikTok.</dd><dt>Pourquoi ça vend</dt><dd>Une mascotte qui se décline en autocollants, widgets et vidéos. C’est le ressort des apps qui montent (Candle, Couple Joy), avec une vraie allure d’affiche française.</dd><dt>Le risque</dt><dd>Peut paraître enfantin aux couples de 40 ans et plus.</dd></dl>
    </div>
  </div>
  <div class="bento">
    <div class="t t-logo a-logo-t"><div class="a-lock">${markA(84)}<span>entre nous</span></div><div class="cap">Le logo : deux bulles et Pépin qui regarde depuis l’entre-deux</div></div>
    <div class="t t-icon a-icon-t"><div class="icons"><span class="ic" style="background:#17162B">${markA(70)}</span><span class="ic" style="background:#FFD23F">${pep('content', 'pousse', 58)}</span></div><div class="cap">Icônes d’app</div></div>
    <div class="t t-phone a-phone-t">${phoneA}<button class="rev" type="button">Voir la révélation</button></div>
    <div class="t t-masc a-masc-t"><div class="masc">${['content', 'attend', 'fete'].map(m => `<figure>${pep(m, 'graine', 104)}<figcaption>${{ content: 'Content', attend: 'Il attend', fete: 'Palier de série' }[m]}</figcaption></figure>`).join('')}<figure>${pep('amoureux', 'fleur', 104)}<figcaption>100 jours : il fleurit</figcaption></figure></div><div class="cap">Pépin, la mascotte. Toujours en autocollant, une joue de chaque couleur.</div></div>
    <div class="t t-pal a-pal-t"><div class="pal">${[['Tomate', '#FF5533', 'toi'], ['Outremer', '#2F3CF5', 'l’autre'], ['Beurre', '#FFD23F', 'vous deux'], ['Encre', '#17162B', 'texte'], ['Lait', '#FFF8F0', 'fond']].map(([n, h, r]) => `<div class="sw"><i style="background:${h}"></i><b>${n}</b><span>${h} · ${r}</span></div>`).join('')}</div></div>
    <div class="t t-type a-type-t"><div class="ty-big" style="font-family:Caprasimo">Aa</div><div class="ty"><b>Caprasimo</b><span>titres, questions, logo</span><b class="ty2" style="font-family:Figtree">Figtree</b><span>interface et réponses</span></div></div>
    <div class="t t-poster a-poster"><div class="po-t">Il a répondu.<br>Pas toi.</div>${pep('attend', 'graine', 118)}<div class="po-l">${markA(26)}entre nous</div></div>
    ${widget('wid-a', pep('content', 'pousse', 74), '41 jours', 'Thomas a répondu.<br>Pépin t’attend.')}
    <div class="t t-lock">${lock('lock-a', markA(22), 'Thomas a répondu. Pépin trépigne : à toi de jouer.', '41 jours de série. Ne laissez pas Pépin s’endormir.')}<div class="cap">Le ton des notifications</div></div>
  </div>
</div></section>

<!-- ===================== B ===================== -->
<section class="dir dB" id="virgule"><div class="wrap">
  <div class="intro">
    <div><div class="letter">B</div><h2>Point-virgule</h2><div class="kw">Spirituel · Élégant · Littéraire</div></div>
    <div class="intro-t">
      <p class="concept">Un couple, c’est un point-virgule : deux signes, une seule phrase. <b>Point</b> (bleu stylo) et <b>Virgule</b> (rouge baiser) sont les mascottes. Toute l’iconographie est faite de ponctuation : « ? » la question du jour, « … » l’attente, « ; » vous deux. Chaque réponse est un billet, scellé jusqu’à la tienne.</p>
      <dl><dt>Pour qui</dt><dd>28–45 ans, couples installés, prêts à payer pour un bel objet.</dd><dt>Pourquoi ça vend</dt><dd>Introuvable ailleurs dans une catégorie pleine de cœurs et de violet. Justifie un prix premium et se décline en papeterie : cartes à questions, coffret de Saint-Valentin.</dd><dt>Le risque</dt><dd>Moins « mignon » dans le fil TikTok, l’humour passe surtout par l’écrit.</dd></dl>
    </div>
  </div>
  <div class="bento">
    <div class="t t-logo b-logo-t"><div class="b-lock">entre ${markB(92)} nous</div><div class="cap">Le logo : le point-virgule se glisse entre les deux mots, comme en typographie française</div></div>
    <div class="t t-icon b-icon-t"><div class="icons"><span class="ic" style="background:#F5F2EC">${markB(72)}</span><span class="ic" style="background:#1F2FA8">${markB(72, '#F5F2EC', '#E1243B')}</span></div><div class="cap">Icônes d’app</div></div>
    <div class="t t-phone b-phone-t">${phoneB}<button class="rev" type="button">Voir la révélation</button></div>
    <div class="t t-masc b-masc-t"><div class="masc">${[['ensemble', 'Ensemble ;'], ['attente', 'Point attend…'], ['calin', 'Câlin'], ['revelation', 'Révélation !']].map(([k, c]) => `<figure>${bSvg(k, 116)}<figcaption>${c}</figcaption></figure>`).join('')}</div><div class="cap">Point et Virgule, les mascottes. Des signes de ponctuation avec deux yeux, rien de plus.</div></div>
    <div class="t t-pal b-pal-t"><div class="pal">${[['Bleu stylo', '#1F2FA8', 'Point, texte fort'], ['Rouge baiser', '#E1243B', 'Virgule, accents'], ['Papier', '#F5F2EC', 'fond'], ['Graphite', '#26252E', 'texte'], ['Buvard', '#F6CDD3', 'tendresse']].map(([n, h, r]) => `<div class="sw"><i style="background:${h}"></i><b>${n}</b><span>${h} · ${r}</span></div>`).join('')}</div></div>
    <div class="t t-type b-type-t"><div class="ty-big" style="font-family:'Instrument Serif';font-style:italic">Aa</div><div class="ty"><b>Instrument Serif</b><span>questions, billets, logo</span><b class="ty2" style="font-family:'Instrument Sans'">Instrument Sans</b><span>interface</span></div></div>
    <div class="t t-poster b-poster"><svg viewBox="0 0 200 200" width="140" height="140" aria-hidden="true">${D.point(100, 56, 32, { blush: true, dy: 3, fill: '#F5F2EC', eye: '#1F2FA8' })}${D.virgule(64, 96, .72, { blush: true })}</svg><div class="po-t">Deux, et pourtant liés ;</div><div class="po-l">entre ${markB(20, '#F5F2EC', '#E1243B')} nous</div></div>
    ${widget('wid-b', bSvg('attente', 92), '41 jours ;', 'Thomas a glissé<br>sa réponse.')}
    <div class="t t-lock">${lock('lock-b', markB(26), 'Thomas a glissé sa réponse. Elle reste scellée jusqu’à la tienne.', 'Point attend Virgule… 41 jours que vous écrivez ensemble.')}<div class="cap">Le ton des notifications</div></div>
  </div>
</div></section>

<!-- ===================== C ===================== -->
<section class="dir dC" id="jardin"><div class="wrap">
  <div class="intro">
    <div><div class="letter">C</div><h2>Jardin</h2><div class="kw">Doux · Vivant · Apaisant</div></div>
    <div class="intro-t">
      <p class="concept">Un couple, ça s’arrose. Chaque réponse arrose le pot que vous partagez, où poussent <b>Pivoine</b> et <b>Pistache</b>. À 7 jours de série, elles sortent de terre. À 30 jours, elles s’enlacent. À 100 jours, elles fleurissent.</p>
      <dl><dt>Pour qui</dt><dd>25–40 ans, sensibles au bien-être et au soin de soi, adeptes des rituels.</dd><dt>Pourquoi ça vend</dt><dd>La série devient un jardin qui grandit : le ressort des apps à animal virtuel, en plus adulte. Le vert ne ressemble à aucune app de couple.</dd><dt>Le risque</dt><dd>Plus calme, donc moins d’impact immédiat dans un fil de vidéos.</dd></dl>
    </div>
  </div>
  <div class="bento">
    <div class="t t-logo c-logo-t"><div class="c-lock">${markC(92)}<span>entre nous</span></div><div class="cap">Le logo : deux feuilles, une seule tige</div></div>
    <div class="t t-icon c-icon-t"><div class="icons"><span class="ic" style="background:#0F3B2F">${markC(76)}</span><span class="ic" style="background:#FF7096">${cSvg('pousses', 62).replace('#FF7096', '#FF7096')}</span></div><div class="cap">Icônes d’app</div></div>
    <div class="t t-phone c-phone-t">${phoneC}<button class="rev" type="button">Voir la révélation</button></div>
    <div class="t t-masc c-masc-t"><div class="masc">${[['graine', 'Jour 1'], ['pousses', '7 jours'], ['enlacees', '30 jours'], ['fleuries', '100 jours']].map(([k, c]) => `<figure>${cSvg(k, 86)}<figcaption>${c}</figcaption></figure>`).join('')}</div><div class="cap">Pivoine et Pistache grandissent avec votre série</div></div>
    <div class="t t-pal c-pal-t"><div class="pal">${[['Sapin', '#0F3B2F', 'fond, texte'], ['Pivoine', '#FF7096', 'toi'], ['Pistache', '#C9E26B', 'l’autre'], ['Lin', '#F2EDE3', 'texte clair'], ['Soleil', '#FFC24B', 'célébrations']].map(([n, h, r]) => `<div class="sw"><i style="background:${h}"></i><b>${n}</b><span>${h} · ${r}</span></div>`).join('')}</div></div>
    <div class="t t-type c-type-t"><div class="ty-big" style="font-family:'Young Serif'">Aa</div><div class="ty"><b>Young Serif</b><span>titres, questions, logo</span><b class="ty2" style="font-family:Manrope">Manrope</b><span>interface</span></div></div>
    <div class="t t-poster c-poster"><div class="po-t">Un couple,<br>ça s’arrose.</div>${cSvg('enlacees', 104)}<div class="po-l">${markC(22, '#0F3B2F', '#0F3B2F', '#0F3B2F')}entre nous</div></div>
    ${widget('wid-c', cSvg('pousses', 58), '41 jours', 'Thomas a arrosé.<br>À toi.')}
    <div class="t t-lock">${lock('lock-c', markC(26), 'Thomas a arrosé le jardin. Ta réponse fera pousser la suite.', 'Vos pousses tiennent depuis 41 jours. Une réponse et elles fleurissent.')}<div class="cap">Le ton des notifications</div></div>
  </div>
</div></section>

<!-- ===================== comparatif ===================== -->
<section class="wrap choix" id="choix">
  <h2>Comment choisir</h2>
  <div class="tbl"><table>
    <thead><tr><th></th><th><i style="background:#FF5533"></i>A · Pop</th><th><i style="background:#1F2FA8"></i>B · Point-virgule</th><th><i style="background:#0F3B2F"></i>C · Jardin</th></tr></thead>
    <tbody>
      <tr><th>Personnalité</th><td>Drôle, énergique</td><td>Malin, raffiné</td><td>Doux, attentionné</td></tr>
      <tr><th>Cible principale</th><td>20–35 ans</td><td>28–45 ans</td><td>25–40 ans</td></tr>
      <tr><th>Force sur TikTok</th><td><span class="lv l3">Très forte</span></td><td><span class="lv l1">Moyenne</span></td><td><span class="lv l2">Bonne</span></td></tr>
      <tr><th>Prix premium crédible</th><td><span class="lv l2">Bon</span></td><td><span class="lv l3">Très fort</span></td><td><span class="lv l2">Bon</span></td></tr>
      <tr><th>Mascotte qui grandit</th><td>Oui : graine, pousse, fleur</td><td>Non, ce sont des signes</td><td>Oui : tout un jardin</td></tr>
      <tr><th>Produits dérivés</th><td>Autocollants, peluche Pépin</td><td>Papeterie, coffret de cartes</td><td>Graines à planter, cartes</td></tr>
      <tr><th>Se distingue de Paired</th><td>Fortement</td><td>Totalement</td><td>Fortement</td></tr>
    </tbody>
  </table></div>
  <div class="reco">
    <div class="reco-k">Mon conseil</div>
    <p><b>A, avec une touche de B.</b> Pépin donne à l’app ce qui fait grandir les challengers du marché : une mascotte qui évolue avec la série et qui fait des vidéos. L’esprit typographique de B (« ? » pour la question, « … » pour l’attente, le billet scellé) peut nourrir le ton et les micro-détails sans changer la palette.</p>
    <p class="reco-s">Réponds simplement A, B, C ou « A + B » et je construis la charte complète : couleurs pour l’app en clair et en sombre, composants, mascotte dans toutes ses humeurs, icônes et règles d’usage.</p>
  </div>
</section>
</main>
<script>
document.querySelectorAll('.rev').forEach(function (b) {
  b.addEventListener('click', function () {
    var ph = b.parentNode.querySelector('[data-ph]');
    var on = ph.classList.toggle('is-rev');
    b.textContent = on ? 'Revenir à l’attente' : 'Voir la révélation';
  });
});
</script>
`;
fs.mkdirSync(path.join(ROOT, 'out'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'out', 'pistes.html'), html);
fs.writeFileSync(path.join(ROOT, 'out', 'preview.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + html);
console.log('ok', html.length);
