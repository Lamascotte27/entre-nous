/* @ds-bundle: {"format":4,"namespace":"EntreNous","components":[{"name":"Logo"},{"name":"PointVirgule"},{"name":"Bouton"},{"name":"CarteQuestion"},{"name":"Billet"},{"name":"Cachet"},{"name":"SerieBadge"},{"name":"CarteOffre"},{"name":"NotificationPush"}]} */
(function () {
  var R = window.React, h = R.createElement;
  var D = __DATA__;
  var PAPIER = '#F5F2EC';
  var LABELS = { ensemble: 'Point et Virgule, ensemble', attente: 'Point attend Virgule', question: 'Point et Virgule devant la question du jour', revelation: 'Point et Virgule découvrent les réponses', calin: 'Point et Virgule, câlin', endormi: 'Point et Virgule endormis', fete: 'Point et Virgule font la fête', point: 'Point', virgule: 'Virgule' };
  var uid = 0;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function f(n) { return (+n).toFixed(2); }
  function useId(prefix) { var r = R.useRef(null); if (!r.current) r.current = prefix + (++uid); return r.current; }
  function markSvg(x, dot, com) {
    return '<circle cx="' + f(x) + '" cy="' + f(D.dotCy) + '" r="' + D.rDot + '" fill="' + dot + '"/><g transform="translate(' + f(x) + ' ' + f(-D.rHead) + ') scale(' + f(D.kV) + ') translate(-50 -45)"><path d="' + D.vpath + '" fill="' + com + '"/></g>';
  }

  function Logo(p) {
    var hauteur = p.hauteur || 40;
    var mono = !!p.mono;
    var dot = mono ? 'currentColor' : p.inverse ? PAPIER : p.fixe ? '#1F2FA8' : 'var(--bleu)';
    var com = mono ? 'currentColor' : p.fixe ? '#E1243B' : 'var(--rouge)';
    var vb, html;
    if (p.variante === 'signe') {
      vb = [-D.rHead - 6, D.markTop - 5, 2 * D.rHead + 12, D.tailY - D.markTop + 10];
      html = markSvg(0, dot, com);
    } else {
      vb = D.vbLogo.split(' ').map(Number);
      html = '<path d="' + D.entre + '" fill="currentColor"/>' + markSvg(D.mx, dot, com) + '<path d="' + D.nous + '" fill="currentColor"/>';
    }
    return h('svg', { className: cx('en-logo', p.className), style: p.style, viewBox: vb.map(f).join(' '), height: hauteur, width: Math.round(hauteur * vb[2] / vb[3]), role: 'img', 'aria-label': 'Entre nous', dangerouslySetInnerHTML: { __html: html } });
  }

  function PointVirgule(p) {
    var pose = D.poses[p.pose] ? p.pose : 'ensemble';
    var taille = p.taille || 120;
    var id = useId('en-st-');
    var inner = D.poses[pose];
    var html = p.autocollant === false ? inner : '<defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/><feFlood flood-color="' + PAPIER + '"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#' + id + ')">' + inner + '</g>';
    return h('svg', { className: cx('en-pv', p.className), viewBox: '-8 -8 256 256', width: taille, height: taille, role: p.decoratif ? null : 'img', 'aria-hidden': p.decoratif ? 'true' : null, 'aria-label': p.decoratif ? null : (p.label || LABELS[pose]), dangerouslySetInnerHTML: { __html: html } });
  }

  function Bouton(p) {
    var rest = {};
    for (var k in p) if (k !== 'variante' && k !== 'children' && k !== 'className') rest[k] = p[k];
    rest.className = cx('en-btn', 'en-btn--' + (p.variante || 'principal'), p.className);
    if (!rest.type) rest.type = 'button';
    return h('button', rest, p.children);
  }

  function Cachet(p) {
    var t = p.taille || 56;
    return h('svg', { className: 'en-cachet', viewBox: '0 0 124 124', width: t, height: t, role: 'img', 'aria-label': p.label || 'Réponse scellée', dangerouslySetInnerHTML: { __html: D.cachet } });
  }

  function Billet(p) {
    var toi = p.auteur !== 'autre';
    var vide = !p.scelle && (p.children == null || p.children === '');
    return h('div', { className: cx('en-billet', toi ? 'en-billet--toi' : 'en-billet--autre', p.scelle && 'en-billet--scelle', vide && 'en-billet--vide', p.className) },
      p.scelle
        ? h('div', { className: 'en-billet-scelle' }, h(Cachet, { taille: 48 }), h('span', null, (p.prenom || 'Ton ou ta partenaire') + ' a répondu. Billet scellé jusqu’à ta réponse.'))
        : h(R.Fragment, null,
          h('p', { className: 'en-billet-texte' }, vide ? 'Écris ta réponse…' : p.children),
          vide ? null : h('span', { className: 'en-billet-signature' }, '— ' + (p.prenom || (toi ? 'Toi' : 'Partenaire')))));
  }

  function SerieBadge(p) {
    var j = p.jours || 0;
    return h('span', { className: 'en-serie' },
      h(Logo, { variante: 'signe', hauteur: 18, mono: true }),
      h('span', null, j + (j > 1 ? ' jours' : ' jour')));
  }

  function questionAvecMarque(q) {
    var m = /^(.*?)[\s  ]*\?\s*$/.exec(q || '');
    if (!m) return q;
    return h(R.Fragment, null, m[1] + ' ', h('span', { className: 'en-q-marque' }, '?'));
  }

  function CarteQuestion(p) {
    var a = p.maReponse, b = p.saReponse, prenom = p.prenom || 'Thomas', moi = p.monPrenom || 'Toi';
    var ouverte = !!(a && b);
    var pose = ouverte ? 'revelation' : b ? 'attente' : 'question';
    var phrase = ouverte ? 'Vos deux billets sont ouverts. À vous d’en parler.' : b ? prenom + ' a glissé sa réponse.' : 'Personne n’a encore répondu. Lance-toi.';
    return h('article', { className: cx('en-carte', p.className) },
      h('div', { className: 'en-carte-haut' },
        h('span', { className: 'en-micro' }, 'Question du jour' + (p.date ? ' — ' + p.date : '')),
        p.serie ? h(SerieBadge, { jours: p.serie }) : null),
      h('h2', { className: 'en-question' }, questionAvecMarque(p.question)),
      h('div', { className: 'en-billets' },
        h(Billet, { auteur: 'toi', prenom: moi }, a),
        b ? h(Billet, { auteur: 'autre', prenom: prenom, scelle: !a }, b) : null),
      h('div', { className: 'en-carte-pied' }, h(PointVirgule, { pose: pose, taille: 84, decoratif: true }), h('span', null, phrase)));
  }

  function CarteOffre(p) {
    return h('button', { type: 'button', role: 'radio', 'aria-checked': p.choisie ? 'true' : 'false', className: cx('en-offre', p.choisie && 'en-offre--choisie'), onClick: p.onClick },
      p.etiquette ? h('span', { className: 'en-offre-etiquette' }, p.etiquette) : null,
      h('span', { className: 'en-offre-titre' }, p.titre),
      h('span', { className: 'en-offre-detail' }, p.detail),
      h('span', { className: 'en-offre-prix' }, h('b', null, p.prix), p.mention ? h('span', null, p.mention) : null));
  }

  function NotificationPush(p) {
    return h('div', { className: 'en-notif', role: 'status' },
      h('span', { className: 'en-notif-icone' }, h(Logo, { variante: 'signe', hauteur: 26, fixe: true })),
      h('div', null,
        h('div', { className: 'en-notif-tete' }, h('b', null, p.titre || 'Entre nous'), h('span', null, p.heure || 'maintenant')),
        h('p', null, p.texte)));
  }

  var api = { Logo: Logo, PointVirgule: PointVirgule, Bouton: Bouton, CarteQuestion: CarteQuestion, Billet: Billet, Cachet: Cachet, SerieBadge: SerieBadge, CarteOffre: CarteOffre, NotificationPush: NotificationPush };
  window.EntreNous = window.EntreNous || {};
  for (var n in api) window.EntreNous[n] = api[n];
})();
