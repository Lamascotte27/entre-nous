  /* ================= l'app (V2) ================= */
  var APP = ['app-aujourdhui', 'app-explorer', 'app-billets', 'app-nous'];
  var DETAILS = ['mission', 'jeu', 'bilan', 'pack', 'parcours-d'];
  function premium() { return S.mode === 'partenaire' || !!S.abonne; }
  function partNom() { return S.mode === 'partenaire' ? 'Léa' : (S.partenaire || 'Thomas'); }
  function partPro() { return S.mode === 'partenaire' ? 'elle' : (S.pronomP || 'il'); }
  function partRepondu() { return S.mode === 'partenaire' || S.partenaireRepondu; }
  var DEMO = { serie: 41, gel: 2, billets: 128, missions: 6 };
  var NBSP = '\u00a0';
  var IC = {
    maison: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5V15h-5v5.5H5a1 1 0 0 1-1-1z"/></svg>',
    boussole: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke-linejoin="round"/></svg>',
    billets: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="6.5" width="12" height="14" rx="2" transform="rotate(-7 9.5 13.5)"/><rect x="8.5" y="3.5" width="12" height="14" rx="2" transform="rotate(6 14.5 10.5)"/></svg>',
    loupe: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    cad: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    flocon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/></svg>',
    coeur: '<svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="#E1243B"/></svg>',
    coeurS: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="currentColor"/></svg>',
    plus: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  };
  function signeMono(h) {
    var vb = [-D.rHead - 6, D.markTop - 5, 2 * D.rHead + 12, D.tailY - D.markTop + 10];
    return '<svg viewBox="' + vb.join(' ') + '" height="' + h + '" width="' + Math.round(h * vb[2] / vb[3]) + '" aria-hidden="true"><circle cx="0" cy="' + D.dotCy + '" r="' + D.rDot + '" fill="currentColor"/><g transform="translate(0 ' + (-D.rHead) + ') scale(' + D.kV + ') translate(-50 -45)"><path d="' + D.vpath + '" fill="currentColor"/></g></svg>';
  }
  function tabbar(actif) {
    var t = [['app-aujourdhui', 'Aujourd’hui', IC.maison], ['app-explorer', 'Explorer', IC.boussole], ['app-billets', 'Billets', IC.billets], ['app-nous', 'Nous', signeMono(22)]];
    return '<nav class="tabbar" aria-label="Onglets">' + t.map(function (x) { return '<button type="button" data-act="onglet" data-val="' + x[0] + '"' + (x[0] === actif ? ' aria-current="page"' : '') + '>' + x[2] + x[1] + '</button>'; }).join('') + '</nav>';
  }
  function ecranApp(id, corps) { return '<div class="scr app" data-ecran="' + id + '" data-haut="" data-bas=""><div class="sc">' + corps + '</div>' + tabbar(id) + '</div>'; }
  function carte(act, vis, bg, titre, sous, etat, val) {
    return '<button class="carte" data-act="' + act + '"' + (val != null ? ' data-val="' + val + '"' : '') + '><span class="vis" style="background:' + bg + '">' + vis + '</span><span><b>' + titre + '</b><small>' + sous + '</small></span>' + (etat ? '<span class="etat ' + etat[0] + '">' + etat[1] + '</span>' : '') + '</button>';
  }
  function verrou(etatSiOuvert) { return premium() ? etatSiOuvert : ['prem', 'Premium']; }
  function glyphe(g, couleur, t) { return '<span style="font:400 ' + (t || 30) + 'px/1 var(--font-display);color:' + couleur + '">' + g + '</span>'; }

  /* humeurs */
  var HUMEURS = ['rayonne', 'bien', 'bof', 'fatigue', 'calin'];
  function humeurNom(k, p) { return { rayonne: 'Rayonnant' + e(p), bien: 'Bien', bof: 'Bof', fatigue: 'Fatigué' + e(p), calin: 'En manque de câlins' }[k]; }
  function humeurCourt(k, p) { return k === 'calin' ? 'Câlin' : humeurNom(k, p); }
  function visage(t, s) {
    var c = { rayonne: ['#FFD23F', '#26252E'], bien: ['#1F2FA8', '#F5F2EC'], bof: ['#D9D4C8', '#26252E'], fatigue: ['#C9CFF5', '#26252E'], calin: ['#F6CDD3', '#26252E'] }[t];
    var yeux = (t === 'rayonne' || t === 'calin') ? '<path d="M12 18q3-4 6 0M22 18q3-4 6 0" stroke="' + c[1] + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : t === 'fatigue' ? '<path d="M12 18q3 2.5 6 0M22 18q3 2.5 6 0" stroke="' + c[1] + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' : '<circle cx="15" cy="17" r="2.4" fill="' + c[1] + '"/><circle cx="25" cy="17" r="2.4" fill="' + c[1] + '"/>';
    var bouche = t === 'rayonne' ? '<path d="M13 23q7 9 14 0z" fill="' + c[1] + '"/>' : t === 'bof' ? '<path d="M15 26h10" stroke="' + c[1] + '" stroke-width="2.4" stroke-linecap="round"/>' : t === 'fatigue' ? '<ellipse cx="20" cy="26.5" rx="2.6" ry="2" fill="' + c[1] + '"/>' : '<path d="M15 24q5 5 10 0" stroke="' + c[1] + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    var plus = t === 'calin' ? '<path d="M32 4.5c0-2.4 3.4-2.9 3.4 0 0-2.9 3.4-2.4 3.4 0 0 2.4-3.4 4.6-3.4 4.6S32 6.9 32 4.5z" fill="#E1243B"/>' : t === 'fatigue' ? '<text x="30" y="9" font-size="8" font-weight="800" fill="#1F2FA8" font-family="sans-serif">z</text>' : '';
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="21" r="16" fill="' + c[0] + '"/>' + yeux + bouche + plus + '</svg>';
  }

  /* contenus */
  var PACKS = [
    { id: 'souvenirs', pose: 'souvenirs', d: 'Pour vous remémorer vos meilleurs moments, et ceux que l’autre n’a jamais racontés.', r: 'Notre premier week-end à Lisbonne, quand on s’est perdus et qu’on a fini par danser sous la pluie.', t: 'Souvenirs', n: 40, g: ';', bg: 'var(--beurre-pale)', fg: 'var(--graphite)', prem: false, q: ['Quel souvenir de nous te fait encore sourire ?', 'Quelle a été ta toute première impression de moi ?', 'Quel moment à deux aimerais-tu revivre, exactement pareil ?'] },
    { id: 'avenir', pose: 'avenir', d: 'Vos envies, vos projets, la vie que vous imaginez ensemble.', r: 'Une maison avec un petit jardin, et toi qui râles parce que j’ai encore acheté une plante.', t: 'Projets et avenir', n: 40, g: '?', bg: 'var(--bleu)', fg: 'var(--on-bleu)', prem: true, q: ['Où te vois-tu avec moi dans cinq ans ?', 'Quel projet aimerais-tu qu’on lance ensemble cette année ?', 'Quelle tradition aimerais-tu qu’on crée ?'] },
    { id: 'argent', pose: 'argent', d: 'Parler d’argent sans tabou ni dispute : vos habitudes, vos peurs, vos envies.', r: 'Chez moi, on n’en parlait jamais. Du coup, j’ai encore du mal à en parler avec toi.', t: 'Argent et quotidien', n: 40, g: '€', bg: 'var(--craie)', fg: 'var(--graphite)', prem: true, q: ['Que représentait l’argent chez toi, quand tu étais petit·e ?', 'Quelle dépense te fait vraiment plaisir ?', 'Comment aimerais-tu qu’on décide des gros achats ?'] },
    { id: 'disputes', pose: 'disputes', d: 'Comprendre comment chacun vit les tensions, pour mieux se réconcilier.', r: 'Que tu me prennes la main, même si on n’a pas fini d’en parler.', t: 'Mieux se disputer', n: 40, g: '!', bg: 'var(--buvard)', fg: 'var(--graphite)', prem: true, q: ['Qu’est-ce qui t’aide à te calmer après une dispute ?', 'Quelle phrase aimerais-tu entendre quand ça chauffe ?', 'Quel sujet revient trop souvent entre nous ?'] },
    { id: 'intimite', pose: 'intimite', d: 'Tendresse, désir, envies : des questions pour vous rapprocher. Réservé aux adultes.', r: 'Le soir où on a éteint nos téléphones et parlé jusqu’à 3 h du matin.', t: 'Intimité (18+)', n: 40, g: '…', bg: 'var(--rouge)', fg: 'var(--on-rouge)', prem: true, q: ['Quel moment de tendresse t’a le plus marqué·e ?', 'Qu’est-ce qui te met dans l’ambiance ?', 'De quoi aimerais-tu qu’on parle plus librement ?'] },
    { id: 'distance', pose: 'distance', d: 'Pour rester proches quand des kilomètres vous séparent.', r: 'Te serrer dans mes bras à la gare, longtemps, sans rien dire.', t: 'À distance', n: 30, g: ';', bg: 'var(--bleu-pale)', fg: 'var(--graphite)', prem: true, q: ['Quelle est la première chose que tu veux faire quand on se retrouve ?', 'Quel petit rituel nous rapprocherait malgré la distance ?', 'Qu’est-ce qui te manque le plus de moi au quotidien ?'] },
    { id: 'rire', pose: 'rire', d: 'Des questions légères pour rire ensemble, sans se prendre au sérieux.', r: 'Le karaoké à l’anniversaire de Julie. Personne n’a oublié.', t: 'Pour rire', n: 30, g: '!', bg: 'var(--beurre)', fg: 'var(--on-beurre)', prem: false, q: ['Quelle est la chose la plus ridicule qu’on ait faite ensemble ?', 'Quel surnom gênant pourrais-tu me donner ?', 'Si on était un duo comique, lequel serait-on ?'] },
    { id: 'parents', pose: 'parents', d: 'Rester un couple quand on est aussi des parents.', r: 'Nos petits-déjeuners du dimanche, juste nous deux, avant que la maison se réveille.', t: 'Parents', n: 30, g: '?', bg: 'var(--filet)', fg: 'var(--graphite)', prem: true, q: ['Qu’est-ce qu’on doit garder rien qu’à nous deux, malgré les enfants ?', 'De quoi as-tu besoin quand la semaine a été dure ?', 'Quel moment de parent t’a rendu·e le plus fier·e ?'] }
  ];
  var PARCOURS = [
    { pose: 'disputes', t: 'Mieux se disputer', d: '7 jours · 10 min par jour', s: 'Conçu avec une conseillère conjugale', c: 'p-bleu', j: ['Ce qui se passe pendant une dispute', 'La règle des 20 minutes', 'Dire « je » plutôt que « tu »', 'Réparer après une dispute', 'Les sujets qui reviennent', 'Votre rituel de réconciliation', 'Votre pacte à deux'] },
    { pose: 'calin', t: 'Les langages de l’amour', d: '5 jours · 8 min par jour', s: 'Comprendre comment l’autre se sent aimé', c: 'p-rouge', j: ['Les cinq langages', 'Le tien', 'Le sien', 'Quand ils ne parlent pas pareil', 'Une semaine pour essayer'] },
    { pose: 'distance', t: 'Garder le lien à distance', d: '10 jours · 5 min par jour', s: 'Des rituels pour les couples loin l’un de l’autre', c: 'p-beurre', j: ['Le décalage, sans drame', 'Le rendez-vous fixe', 'Les petites attentions', 'Se disputer à distance', 'Préparer les retrouvailles'] },
    { pose: 'argent', t: 'Parler d’argent sans se fâcher', d: '6 jours · 10 min par jour', s: 'Envies, peurs, budget : on pose tout à plat', c: 'p-graphite', j: ['Votre histoire avec l’argent', 'Ce qui vous fait plaisir', 'Le budget à deux', 'Les gros projets', 'Les désaccords', 'Votre règle commune'] }
  ];
  var JEUX = [['toi-ou-moi', 'Toi ou moi ?', '5 questions : êtes-vous d’accord ?', '?', 'var(--bleu-pale)', 'var(--bleu)'], ['plutot', 'Plutôt A ou B ?', 'Des choix impossibles, à deux', '!', 'var(--beurre-pale)', 'var(--graphite)'], ['connait', 'Qui me connaît le mieux ?', 'Devine ce que l’autre a répondu', ';', 'var(--buvard)', 'var(--rouge)']];
  var TOM = [['Qui dit « je t’aime » le plus souvent ?', 'toi'], ['Qui est toujours en retard ?', 'lui'], ['Qui choisit le film du samedi soir ?', 'toi'], ['Qui s’endort en premier ?', 'lui'], ['Qui a fait le premier pas ?', 'toi']];
  var HIST = [
    { d: 'Hier', q: 'Quel est ton plus beau souvenir de vacances ensemble ?', a: 'Le marché flottant à Lisbonne, sous une pluie de dingue.', b: 'Le train de nuit pour Rome. On n’a pas dormi une seconde.' },
    { d: 'Dimanche', q: 'Qu’est-ce qui te fait rire chez moi, sans que je le fasse exprès ?', a: 'Ta façon de parler à la machine à café.', b: 'Quand tu chantes faux en faisant la vaisselle.' }
  ];

  /* ---------- Aujourd'hui ---------- */
  E['app-aujourdhui'] = function () {
    var p = partNom(), h = new Date().getHours(), a = annees(), rep = partRepondu();
    var dernier = S.motsDoux.filter(function (m) { return m.de === 'lui'; }).slice(-1)[0], envoyes = S.motsDoux.filter(function (m) { return m.de === 'toi'; });
    // 1. la question du jour : l'action principale, seule en grand
    var etat = S.revele ? 'ouvert' : S.envoye ? 'attente' : rep ? 'atoi' : 'neuf';
    var toiFait = S.revele || S.envoye, luiFait = S.revele || rep;
    var cta = { ouvert: 'Lire vos deux billets', attente: 'Relire mon billet', atoi: 'Répondre pour ouvrir son billet', neuf: 'Répondre' }[etat];
    var poseQ = { ouvert: 'calin', attente: 'attente', atoi: 'question', neuf: 'question' }[etat];
    var puce = function (fait, txt) { return '<li class="' + (fait ? 'fait' : '') + '"><span class="pc">' + (fait ? I.ok : '') + '</span>' + txt + '</li>'; };
    var hero = '<section class="qdj" aria-labelledby="qdj-t">' + ambiance() +
      '<span class="k" id="qdj-t">Question du jour</span><p class="q">' + esc(QUESTIONS.complicite()) + '</p>' +
      '<div class="qdj-bas"><ul class="qui">' + puce(luiFait, luiFait ? esc(p) + ' a répondu' : esc(p) + ' n’a pas encore répondu') + puce(toiFait, toiFait ? 'Tu as répondu' : 'À toi de répondre') + '</ul>' + pose(poseQ, 108, true) + '</div>' +
      '<button class="btn btn-beurre" data-act="question">' + cta + '</button></section>';
    // 2. ce que l'autre t'a laissé
    var nouv = '<div class="sec"><h2>Des nouvelles de ' + esc(p) + '</h2></div><div class="nouv">' +
      '<div class="nv-h">' + visage(S.humeurP, 40) + '<p>' + esc(p) + ' se sent <b>' + humeurNom(S.humeurP, partPro()).toLowerCase() + '</b> aujourd’hui</p></div>' +
      (dernier ? '<div class="billet autre"><span class="mic">Mot doux · ' + dernier.h + '</span><p>' + esc(dernier.t) + '</p></div>' : '') +
      '<button type="button" class="nv-act" data-act="motdoux">' + IC.coeurS + (envoyes.length ? 'Mot doux envoyé · en glisser un autre' : 'Lui répondre par un mot doux') + '</button></div>';
    // 3. ton geste du jour
    var toi = '<div class="sec"><h2>Et toi, aujourd’hui' + NBSP + '?</h2></div><div class="humeur"><div class="moods" role="group" aria-label="Ton humeur">' +
      HUMEURS.map(function (k) { return '<button type="button" data-act="humeur" data-val="' + k + '" aria-pressed="' + (S.humeur === k) + '">' + visage(k, 36) + '<span>' + humeurCourt(k, S.pronom) + '</span></button>'; }).join('') + '</div>' +
      '<p class="h-ok">' + (S.humeur ? I.ok + 'Partagée avec ' + esc(p) : 'Un geste de 2 secondes. ' + esc(p) + ' la verra.') + '</p></div>';
    // 4. le rendez-vous de la semaine
    var mEtat = S.missionFaite ? 'Accomplie ' + I.ok : S.missionOuverte ? 'En cours, jusqu’à dimanche' : 'Nouvelle cette semaine';
    var semaine = '<div class="sec"><h2>Cette semaine, à deux</h2></div><div class="minis">' +
      '<button class="mini" data-act="mission">' + (!premium() ? '<span class="mini-c">' + IC.cad + '</span>' : (!S.missionOuverte ? '<span class="pastille" aria-label="Nouveau"></span>' : '')) + '<span class="mv">' + cachet(46) + '</span><b>Mission secrète</b><small>' + mEtat + '</small></button>' +
      '<button class="mini" data-act="jeu">' + (!premium() ? '<span class="mini-c">' + IC.cad + '</span>' : '') + '<span class="mv mv-q">' + glyphe('?', 'var(--bleu)', 34) + '</span><b>Toi ou moi' + NBSP + '?</b><small>' + (S.jeuI >= 5 ? 'Joué ' + I.ok : 'Jeu · 2 min') + '</small></button></div>' +
      '<button class="bandeau-a" data-act="bilan">' + pose('revelation', 64, true) + '<span><b>Votre analyse de la semaine</b><small>' + (premium() ? 'Prête · vos forces, ce qui mérite de l’attention' : 'Avec l’abonnement') + '</small></span>' + I.chev + '</button>';
    var corps = '<div class="ahead"><span class="marque">' + logo(22) + (premium() ? '<span class="badge-p">Premium</span>' : '') + '</span><button type="button" class="serie" data-act="serie" aria-label="Série de ' + DEMO.serie + ' jours">' + signe(16) + DEMO.serie + ' jours</button></div>' +
      '<div class="salut"><h1 class="salut-t" tabindex="-1">' + (h < 18 ? 'Bonjour' : 'Bonsoir') + ' ' + esc(moi()) + NBSP + ';</h1><p class="salut-s">' + esc(dateDuJour()) + (a ? ' · ' + a + (a > 1 ? ' ans' : ' an') + ' d’histoire' : '') + '</p></div>' +
      hero + nouv + toi + semaine;
    return ecranApp('app-aujourdhui', corps);
  };

  /* ---------- Explorer ---------- */
  E['app-explorer'] = function () {
    var p = partNom();
    var sec = function (t, d) { return '<div class="ex-sec"><h2>' + t + '</h2><p>' + d + '</p></div>'; };
    var corps = '<div class="ex-intro"><h1 class="salut-t" tabindex="-1">Explorer</h1><p>Envie d’aller plus loin que la question du jour' + NBSP + '? Tout se fait à deux, quand vous voulez.</p></div>' +
      sec('Parler d’un sujet', 'Des questions par thème. Vous répondez chacun en secret, puis vous découvrez vos réponses, comme la question du jour.') +
      '<div class="tuiles">' + PACKS.map(function (k, i) { return '<button class="tuile" data-act="pack" data-val="' + k.id + '" style="background:' + k.bg + ';color:' + k.fg + ';--i:' + i + '">' + pose(k.pose, 124, true) + '<b>' + k.t + '</b><small>' + (k.prem && !premium() ? IC.cad : '') + k.n + ' questions</small></button>'; }).join('') + '</div>' +
      sec('Jouer à deux', 'Des jeux de 2 minutes pour rire et voir si vous vous connaissez vraiment.') +
      '<div class="lignes">' + JEUX.map(function (j) { return '<button class="ligne" data-act="' + (j[0] === 'toi-ou-moi' ? 'jeu' : 'jeu-autre') + '"><span class="vis" style="background:' + j[4] + ';color:' + j[5] + '"><span>' + j[3] + '</span></span><span><b>' + j[1] + '</b><small>' + j[2] + '</small></span>' + I.chev + '</button>'; }).join('') + '</div>' +
      sec('Se faire accompagner', 'Des programmes de quelques jours, 10 minutes par jour, conçus avec une conseillère conjugale.') +
      '<div class="defile">' + PARCOURS.map(function (k, i) { return '<button class="parc ' + k.c + '" data-act="parcours" data-val="' + i + '">' + pose(k.pose, 122, true) + '<span class="duree">' + k.d + '</span><b>' + k.t + '</b><small>' + k.s + '</small></button>'; }).join('') + '</div>';
    return ecranApp('app-explorer', corps);
  };
  function filtrerExplorer() {
    var q = (S.recherche || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    app.querySelectorAll('.scr:last-child [data-t]').forEach(function (el) {
      var t = el.getAttribute('data-t').normalize('NFD').replace(/[̀-ͯ]/g, '');
      el.hidden = q && t.indexOf(q) < 0;
    });
  }

  /* ---------- Billets ---------- */
  E['app-billets'] = function () {
    var p = partNom(), f = S.filtre || 'tout', moiN = S.prenom || 'Toi';
    var jours = [];
    if (S.revele) jours.push({ d: 'Aujourd’hui', q: QUESTIONS.complicite(), a: S.reponse, b: 'Quand tu me fais un café sans que je demande, les matins où je suis en retard.' });
    jours = jours.concat(HIST);
    var mots = S.motsDoux.slice().reverse();
    var html = '<h1 class="salut-t" tabindex="-1">Vos billets</h1><div class="filtres" role="group" aria-label="Filtrer">' + [['tout', 'Tout'], ['questions', 'Questions'], ['mots', 'Mots doux']].map(function (x) { return '<button type="button" data-act="filtre" data-val="' + x[0] + '" aria-pressed="' + (f === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>';
    if (f !== 'questions' && mots.length) html += '<div class="jour"><span class="d">Mots doux</span>' + mots.map(function (m) { return '<div class="billet ' + (m.de === 'toi' ? 'toi' : 'autre') + '"><span class="mic">' + (m.de === 'toi' ? 'De toi' : 'De ' + esc(p)) + ' · ' + m.h + '</span><p>' + esc(m.t) + '</p></div>'; }).join('') + '</div>';
    if (f !== 'mots') html += jours.map(function (j) { return '<div class="jour"><span class="d">' + j.d + '</span><p class="qq">' + esc(j.q) + '</p><div class="paire"><div class="billet toi"><p>' + esc(j.a) + '</p><span class="sig">— ' + esc(moiN) + '</span></div><div class="billet autre"><p>' + esc(j.b) + '</p><span class="sig">— ' + esc(p) + '</span></div></div></div>'; }).join('');
    if (!premium() && f !== 'mots') html += '<button class="carte" data-act="debloquer"><span class="vis" style="background:var(--beurre)">' + IC.cad + '</span><span><b>Tout votre historique</b><small>Les billets de plus de 7 jours sont inclus dans l’abonnement.</small></span></button>';
    return ecranApp('app-billets', html);
  };

  /* ---------- Nous ---------- */
  function prochaine(m, j) { // jours avant la prochaine date anniversaire (mois 0-11)
    var n = new Date(), d = new Date(n.getFullYear(), m, j); if (d < new Date(n.getFullYear(), n.getMonth(), n.getDate())) d.setFullYear(d.getFullYear() + 1);
    return Math.round((d - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
  }
  E['app-nous'] = function () {
    var p = partNom(), m = S.depuisM !== '' ? +S.depuisM : 8, an = S.depuisA || '2017', moiN = S.prenom || 'Toi';
    var dates = [['Votre rencontre', MOIS[m] + ' ' + an, prochaine(m, 22)]];
    if (S.situation === 'pacs' || S.situation === 'maries') dates.push([S.situation === 'pacs' ? 'Votre PACS' : 'Votre mariage', S.unionA ? MOIS[+S.unionM || 0] + ' ' + S.unionA : 'Date à ajouter', S.unionA ? prochaine(+S.unionM || 0, 15) : null]);
    dates.push(['Anniversaire de ' + p, 'À ajouter', null]);
    var corps = '<div class="couple">' + ambiance() + pose('ensemble', 120) + '<h2>' + esc(moiN) + ' ; ' + esc(p) + '</h2><p>Ensemble depuis ' + MOIS[m] + ' ' + an + '</p>' + (premium() ? '<span class="badge-p clair">Premium pour vous deux</span>' : '') + '</div>' +
      '<div class="stats"><div class="stat"><b>' + DEMO.serie + '</b><small>jours de série</small></div><div class="stat"><b>' + DEMO.billets + '</b><small>billets échangés</small></div><div class="stat"><b>' + DEMO.missions + '</b><small>missions</small></div></div>' +
      '<div class="sec"><h2>Dates importantes</h2></div><div class="dates">' + dates.map(function (d) { return '<div class="date"><span><b>' + esc(d[0]) + '</b><small>' + esc(d[1]) + '</small></span>' + (d[2] != null ? '<span class="cpt">' + (d[2] === 0 ? 'Aujourd’hui' : 'Dans ' + d[2] + ' j') + '</span>' : '<span class="cpt" style="background:var(--filet)">Ajouter</span>') + '</div>'; }).join('') + '</div>' +
      '<div class="sec"><h2>Vos souvenirs</h2></div><div class="frise-s"><button class="souv" style="background:var(--bleu);color:var(--on-bleu)" data-act="souvenir"><span class="gl">;</span>Premier rendez-vous</button><button class="souv" style="background:var(--beurre);color:var(--on-beurre)" data-act="souvenir"><span class="gl">!</span>Lisbonne, 2023</button><button class="souv ajout" data-act="souvenir">' + IC.plus + '<span>Ajouter</span></button></div>' +
      '<div class="sec"><h2>Votre couple</h2></div><div class="lignes"><button class="ligne" data-act="bilan"><span class="vis" style="background:var(--bleu)">' + pose('revelation', 44, true) + '</span><span><b>Analyse de la semaine</b><small>Vos forces, ce qui mérite de l’attention</small></span>' + I.chev + '</button></div>' +
      '<div class="reglages"><button data-act="reglage">Notifications <small>' + (S.notifs === false ? 'Désactivées' : '20 h 30') + '</small></button><button data-act="reglage">Pronoms <small>' + (S.pronom || 'iel') + ' · ' + partPro() + '</small></button><button data-act="reglage">Confidentialité et données <small>Exporter, supprimer</small></button><button data-act="' + (premium() ? 'reglage' : 'debloquer') + '">Abonnement <small>' + (premium() ? 'Actif pour vous deux' : 'Gratuit') + '</small></button></div>';
    return ecranApp('app-nous', corps);
  };

  /* ---------- détails ---------- */
  function modeEmploi(etapes) {
    return '<ol class="cmt" aria-label="Comment ça marche">' + etapes.map(function (t, i) { return '<li><span class="n">' + (i + 1) + '</span>' + t + '</li>'; }).join('') + '</ol>';
  }
  function etatPQ(k, i) { return (S.packRep || {})[k.id + '-' + i] || ''; }
  function entetePack(k, verrou) {
    return '<div class="pack-h" style="background:' + k.bg + ';color:' + k.fg + '"><span><small>' + (verrou ? IC.cad : '') + k.n + ' questions</small><b>' + k.t + '</b></span>' + pose(k.pose, 176, true, 'pop') + '</div>';
  }
  function bloque(id, titre, k) {
    if (k) return cadre({ id: id, prog: false, haut: entetePack(k, true),
      corps: '<p class="pack-d">' + k.d + '</p><p class="s" style="margin:0">Un avant-goût' + NBSP + ':</p><div class="mini-q">' + k.q.map(function (q, i) { return '<div class="billet ' + (i % 2 ? 'autre' : 'toi') + ' donne' + (i ? ' flou' : '') + '" style="--d:' + (i * .12) + 's"><span class="mic">Question ' + (i + 1) + '</span><p style="font:400 19px/24px var(--font-display)">' + esc(q) + '</p></div>'; }).join('') + '</div>',
      cta: ['Débloquer ce pack', 'debloquer'] });
    return cadre({ id: id, prog: false, centre: true, haut: '<div class="ill">' + pose('attente', 160, true) + '</div>', titre: titre, sous: 'C’est inclus dans l’abonnement, pour vous deux.', cta: ['Découvrir l’abonnement', 'debloquer'] });
  }
  E.mission = function () {
    if (!premium()) return bloque('mission', 'La mission secrète est réservée aux abonnés');
    var p = partNom();
    return cadre({ id: 'mission', prog: false, titre: 'Mission secrète', sous: 'Une surprise secrète par semaine. ' + esc(p) + ' a reçu la sienne, différente de la tienne.',
      corps: S.missionOuverte
        ? '<div class="billet toi' + (A.mission ? ' deplie' : '') + '"><span class="mic">Ta mission jusqu’à dimanche</span><p class="mission-txt">Glisse un petit mot sur papier dans la poche de ' + esc(p) + ', sans rien dire.</p></div><p class="s">Dimanche soir, vous découvrez ce que l’autre a fait pour vous.</p>'
        : '<button class="enveloppe" data-act="ouvrir-mission" aria-label="Ouvrir la mission">' + cachet(92) + '<span class="ind">Touche le cachet pour l’ouvrir</span></button>' + modeEmploi(['Ouvre ta mission', 'Fais-la en secret avant dimanche', 'Dimanche, découvrez ce que l’autre a fait']),
      cta: S.missionOuverte ? (S.missionFaite ? ['Mission accomplie ;', 'onglet-accueil'] : ['J’ai accompli ma mission', 'mission-faite']) : null, ctaCls: S.missionFaite ? 'btn-b' : 'btn-p' });
  };
  E.jeu = function () {
    if (!premium()) return bloque('jeu', 'Les jeux sont réservés aux abonnés');
    var p = partNom(), i = S.jeuI;
    if (i < TOM.length) {
      return cadre({ id: 'jeu', prog: false, titre: 'Toi ou moi ?', sous: 'Question ' + (i + 1) + ' sur ' + TOM.length + '. ' + esc(p) + ' a déjà répondu.',
        corps: '<div class="jeu-q entre">' + esc(TOM[i][0]) + '</div><div class="choix2"><button class="moi" data-act="jeu-rep" data-val="toi">' + pose('virgule', 54, true) + 'Moi</button><button class="lui" data-act="jeu-rep" data-val="lui">' + pose('point', 54, true) + esc(p) + '</button></div>' });
    }
    var score = 0; S.jeuR.forEach(function (r, k) { if (r === TOM[k][1]) score++; });
    return cadre({ id: 'jeu', prog: false, centre: true, haut: '<div class="ill">' + pose(score >= 3 ? 'fete' : 'calin', 150, false, 'pop') + '</div><div class="score">' + score + ' sur ' + TOM.length + '</div>',
      titre: score >= 3 ? 'Vous êtes sur la même longueur d’onde ;' : 'De quoi en discuter ce soir ;',
      corps: '<div class="res">' + TOM.map(function (t, k) { var ok = S.jeuR[k] === t[1]; return '<div><span>' + esc(t[0]) + '<br><small style="color:var(--graphite-doux)">Toi : ' + (S.jeuR[k] === 'toi' ? 'moi' : esc(p)) + ' · ' + esc(p) + ' : ' + (t[1] === 'toi' ? 'toi' : acc(partPro(), 'elle', 'lui', 'iel')) + '</small></span><span class="' + (ok ? 'ok' : 'ko') + '">' + (ok ? 'D’accord' : 'Pas d’accord') + '</span></div>'; }).join('') + '</div>',
      cta: ['Retour à l’accueil', 'onglet-accueil'], lien: ['Rejouer', 'jeu-rejouer'], lienDoux: true });
  };
  E.bilan = function () {
    if (!premium()) return bloque('bilan', 'L’analyse de couple est réservée aux abonnés');
    return cadre({ id: 'bilan', fond: 'bleu', prog: false, centre: true, haut: '<div class="ill">' + pose('revelation', 140, false, 'pop') + '</div>', titre: 'Votre semaine à deux', sous: 'D’après vos 6 réponses communes de la semaine.',
      corps: '<div class="insight force" style="text-align:left;color:var(--graphite)"><span class="k">Votre force</span><b>L’humour</b><p>Vous avez ri ensemble dans 4 de vos 6 réponses. C’est votre façon de vous rapprocher.</p></div>' +
        '<div class="insight force" style="text-align:left;color:var(--graphite)"><span class="k">Votre force</span><b>La gratitude</b><p>Vous vous remerciez souvent pour les petites attentions du quotidien.</p></div>' +
        '<div class="insight cultiver" style="text-align:left;color:var(--graphite)"><span class="k">À cultiver</span><b>Les projets</b><p>Vous parlez peu de l’avenir. La question de demain vous y aide : « Où te vois-tu avec moi dans cinq ans ? »</p></div>' +
        '<p class="s" style="font-size:13px;line-height:18px">Analyse générée par une IA à partir de vos réponses communes de la semaine, avec une méthode conçue par des conseillers conjugaux. Elle ne remplace pas un professionnel.</p>',
      cta: ['Retour à l’accueil', 'onglet-accueil'] });
  };
  E.pack = function () {
    var k = PACKS.filter(function (x) { return x.id === S.packId; })[0] || PACKS[0], p = partNom();
    if (k.prem && !premium()) return bloque('pack', '', k);
    var lignes = k.q.map(function (q, i) {
      var e = etatPQ(k, i), st = e === 'ouvert' ? ['ok', 'Ouverte · lire'] : e === 'envoye' ? ['att', 'En attente de ' + esc(p)] : ['go', 'Répondre'];
      return '<button class="pq" data-act="pack-q" data-val="' + i + '"><span class="n">' + (i + 1) + '</span><span><b>' + esc(q) + '</b><small class="' + st[0] + '">' + st[1] + '</small></span>' + I.chev + '</button>';
    }).join('');
    var prochaine = -1; k.q.forEach(function (q, i) { if (prochaine < 0 && !etatPQ(k, i)) prochaine = i; });
    return cadre({ id: 'pack', prog: false, haut: entetePack(k, false),
      corps: '<p class="pack-d">' + k.d + '</p>' + modeEmploi(['Choisis une question', 'Réponds en secret', 'Découvrez vos deux réponses']) +
        '<div class="pqs">' + lignes + '</div><p class="s" style="text-align:center;margin:0">Et ' + (k.n - k.q.length) + ' autres questions dans ce pack.</p>',
      cta: prochaine >= 0 ? [prochaine ? 'Répondre à la question suivante' : 'Répondre à la première question', 'pack-q', prochaine] : null });
  };
  E['parcours-d'] = function () {
    var k = PARCOURS[S.parcI || 0];
    if (!premium()) return bloque('parcours-d', 'Les parcours guidés sont réservés aux abonnés');
    return cadre({ id: 'parcours-d', prog: false, haut: '<div class="parc parc-h ' + k.c + '">' + pose(k.pose, 128, true, 'pop') + '<span class="duree">' + k.d + '</span><b>' + k.t + '</b><small>' + k.s + '</small></div>',
      corps: modeEmploi(['Chaque jour, 2 minutes de lecture', 'Puis une question à vous poser', 'Le jour suivant s’ouvre le lendemain']) + '<ol class="jours-p">' + k.j.map(function (t, i) { return '<li class="' + (i === 0 ? 'ouvert' : '') + '"><span class="n">' + (i + 1) + '</span><span><b>' + esc(t) + '</b><small>' + (i === 0 ? 'Disponible' : i === 1 ? 'Se débloque demain' : 'Dans ' + i + ' jours') + '</small></span>' + (i === 0 ? '' : IC.cad) + '</li>'; }).join('') + '</ol>',
      cta: ['Commencer le jour 1', 'parcours-go'] });
  };

  /* ---------- feuille « question d'un pack » ---------- */
  function feuillePQ(i) {
    var k = PACKS.filter(function (x) { return x.id === S.packId; })[0] || PACKS[0], p = partNom(), e = etatPQ(k, i);
    fermerOverlays();
    var v = document.createElement('div'); v.className = 'voile'; v.setAttribute('data-act', 'fermer-ov'); phone.appendChild(v);
    var d = document.createElement('div'); d.className = 'feuille'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    var corps;
    if (e === 'ouvert') corps = '<div class="qlab">' + pose('virgule', 24, true) + '<b>Ta réponse</b></div><div class="billet toi"><p>' + esc((S.packTxt || {})[k.id + '-' + i] || '') + '</p></div>' +
      '<div class="qlab">' + pose('point', 24, true) + '<b>La réponse de ' + esc(p) + '</b></div><div class="billet autre"><p>' + esc(k.r) + '</p></div><button class="btn btn-p" data-act="fermer-ov">Fermer</button>';
    else if (e === 'envoye') corps = '<div class="qlab">' + pose('virgule', 24, true) + '<b>Ta réponse</b><span class="meta ok">' + I.ok + 'Envoyée</span></div><div class="billet toi"><p>' + esc((S.packTxt || {})[k.id + '-' + i] || '') + '</p></div><p class="q-aide">Elle s’ouvrira avec celle de ' + esc(p) + ' dès qu’' + pr(partPro()) + ' aura répondu.</p><button class="btn btn-clair" data-act="fermer-ov">Fermer</button>';
    else corps = '<div class="billet toi"><label for="f-pq" class="vh">Ta réponse</label><textarea id="f-pq" maxlength="500" placeholder="Écris ta réponse ici…"></textarea></div><p class="q-aide">' + esc(p) + ' ne la lira qu’après avoir répondu à son tour.</p><button class="btn btn-p" data-act="envoyer-pq" data-val="' + i + '">Envoyer ma réponse</button>';
    d.innerHTML = '<span class="poignee"></span><span class="micro">' + esc(k.t) + ' · question ' + (i + 1) + '</span><h3 class="pq-t">' + esc(k.q[i]) + '</h3>' + corps;
    phone.appendChild(d);
    if (!e) setTimeout(function () { var t = d.querySelector('textarea'); if (t) t.focus(); }, 300);
  }

  /* ---------- feuille « mot doux » ---------- */
  function feuilleMot() {
    var p = partNom();
    fermerOverlays();
    var v = document.createElement('div'); v.className = 'voile'; v.setAttribute('data-act', 'fermer-ov'); phone.appendChild(v);
    var d = document.createElement('div'); d.className = 'feuille'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.innerHTML = '<span class="poignee"></span><h3>Un mot doux pour ' + esc(p) + '</h3><div class="billet toi"><label for="f-mot" class="mic">Ton billet</label><textarea id="f-mot" maxlength="200" placeholder="Écris quelques mots…"></textarea></div>' +
      '<div class="sugg">' + ['Je pense à toi', 'Merci pour ce matin', 'Ce soir, c’est moi qui cuisine', 'Tu m’as manqué aujourd’hui'].map(function (t) { return '<button type="button" data-act="sugg">' + t + '</button>'; }).join('') + '</div>' +
      '<button class="btn btn-p" data-act="envoyer-mot">Glisser le mot doux</button>';
    phone.appendChild(d);
    setTimeout(function () { var t = d.querySelector('textarea'); if (t) t.focus(); }, 300);
  }

  /* ---------- actions de l'app ---------- */
  ACT.onglet = function (el) { S.pile = []; aller(el.getAttribute('data-val'), 'onglet'); };
  ACT['onglet-accueil'] = function () { S.pile = []; aller('app-aujourdhui', 'onglet'); };
  ACT['vers-app'] = function () { chargement('On ouvre votre espace à deux…', 1500, function () { S.pile = []; aller('app-aujourdhui', 'onglet'); setTimeout(function () { toast('Aperçu de l’app : les chiffres de série et l’historique sont des exemples.', 3200); }, 500); }); };
  ACT.serie = function (el) { anime(el, 'hop'); toast(DEMO.serie + ' jours de suite à deux. ' + DEMO.gel + ' gels protègent votre série les jours sans.', 2800); };
  ACT.question = function () { aller('question'); };
  ACT.humeur = function (el) {
    S.humeur = el.getAttribute('data-val'); sauver(); rafraichir();
    var b = app.querySelector('.scr:last-child .moods [aria-pressed="true"] svg'); anime(b && b.parentNode, 'hop');
    toast('Ton humeur est partagée avec ' + partNom() + '.', 2000);
  };
  ACT.motdoux = feuilleMot;
  ACT.sugg = function (el) { var t = phone.querySelector('#f-mot'); if (t) { t.value = el.textContent; t.focus(); } };
  ACT['envoyer-mot'] = function () {
    var t = phone.querySelector('#f-mot'), v = t ? t.value.trim() : '';
    if (v.length < 2) { if (t) t.focus(); return; }
    var n = new Date(); S.motsDoux.push({ de: 'toi', t: v, h: String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0') }); sauver();
    fermerOverlays(); rafraichir(); confettis(24); toast('Mot doux glissé à ' + partNom() + ' ;', 2200);
  };
  ACT.mission = function () { aller('mission'); };
  ACT['ouvrir-mission'] = function () {
    var c = app.querySelector('.scr:last-child .enveloppe .cachet-anim'); if (c) c.classList.add('casse');
    setTimeout(function () { S.missionOuverte = true; sauver(); A.mission = true; rafraichir(); A.mission = false; }, 720);
  };
  ACT['mission-faite'] = function () { S.missionFaite = true; sauver(); rafraichir(); confettis(60); };
  ACT.jeu = function () { aller('jeu'); };
  ACT['jeu-autre'] = function () { toast('Dans ce prototype, seul « Toi ou moi ? » est jouable.', 2400); };
  ACT['jeu-rep'] = function (el) {
    anime(el.querySelector('.pv'), 'hop');
    S.jeuR.push(el.getAttribute('data-val')); S.jeuI++; sauver();
    setTimeout(function () {
      rafraichir();
      if (S.jeuI >= TOM.length) { var sc = 0; S.jeuR.forEach(function (r, k) { if (r === TOM[k][1]) sc++; }); if (sc >= 3) confettis(60); }
    }, 260);
  };
  ACT['jeu-rejouer'] = function () { S.jeuI = 0; S.jeuR = []; sauver(); rafraichir(); };
  ACT.bilan = function () { if (!premium()) return aller('bilan'); chargement('On relit votre semaine à deux…', 1700, function () { aller('bilan'); }); };
  ACT.pack = function (el) { S.packId = el.getAttribute('data-val'); sauver(); anime(el.querySelector('.pv-wrap'), 'hop'); setTimeout(function () { aller('pack'); }, 220); };
  ACT['pack-q'] = function (el) { feuillePQ(+el.getAttribute('data-val')); };
  ACT['envoyer-pq'] = function (el) {
    var i = +el.getAttribute('data-val'), t = phone.querySelector('#f-pq'), v = t ? t.value.trim() : '', p = partNom();
    if (v.length < 2) { if (t) t.focus(); return; }
    var cle = S.packId + '-' + i; S.packRep = S.packRep || {}; S.packTxt = S.packTxt || {};
    S.packRep[cle] = 'envoye'; S.packTxt[cle] = v; sauver(); fermerOverlays(); rafraichir();
    toast('Envoyée. Elle s’ouvrira quand ' + p + ' aura répondu.', 2200);
    setTimeout(function () { // dans le prototype, l'autre répond quelques secondes plus tard
      if (S.packRep[cle] !== 'envoye') return;
      S.packRep[cle] = 'ouvert'; sauver(); banniere(p + ' a répondu. Vos deux réponses sont ouvertes' + NBSP + ';');
      if (S.ecran === 'pack') rafraichir();
    }, 4200);
  };
  ACT.parcours = function (el) { S.parcI = +el.getAttribute('data-val'); sauver(); anime(el.querySelector('.pv-wrap'), 'hop'); setTimeout(function () { aller('parcours-d'); }, 220); };
  ACT['parcours-go'] = function () { toast('Jour 1 lancé. ' + partNom() + ' le reçoit aussi.', 2400); };
  ACT.filtre = function (el) { S.filtre = el.getAttribute('data-val'); sauver(); rafraichir(); };
  ACT.souvenir = function () { toast('Ajouter un souvenir : photo, lieu et date, dans la vraie app.', 2400); };
  ACT.reglage = function () { toast('Les réglages ne sont pas simulés dans ce prototype.', 2000); };
  ACT.debloquer = function () { S.retourApp = true; sauver(); aller('paywall'); };
