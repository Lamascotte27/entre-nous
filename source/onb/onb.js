(function () {
  'use strict';
  var D = window.PV;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var app = $('#app');

  /* ================= état ================= */
  var CLE = 'entre-nous-onboarding-v1';
  function etatInitial(mode) {
    return { mode: mode || 'principal', ecran: 'accueil', pile: [], vus: {}, email: '', prenom: '', naissance: '', pronom: '', partenaire: '', pronomP: '',
      depuisM: '', depuisA: '', situation: '', unionM: '', unionA: '', cohab: '', enfants: '', objectifs: [], source: '', codeCreateur: '', consent: false,
      code: '', codeSaisi: '', invite: false, notifs: null, plan: 'an', essai: true, offreVue: false, offreFin: 0, abonne: null, reponse: '', envoye: false, partenaireRepondu: false, revele: false,
      humeur: '', humeurP: 'bien', motsDoux: [{ de: 'lui', t: 'Hâte de te retrouver ce soir. Je m’occupe du dîner ;', h: '14:12' }], relance: false, reaction: '', missionOuverte: false, missionFaite: false, jeuI: 0, jeuR: [], filtre: 'tout', packId: 'souvenirs', parcI: 0, retourApp: false, recherche: '' };
  }
  var S;
  try { S = Object.assign(etatInitial(), JSON.parse(localStorage.getItem(CLE)) || {}); } catch (x) { S = etatInitial(); }
  if (!S || !S.ecran) S = etatInitial();
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(S)); } catch (e) { /* stockage indisponible : le parcours marche quand même */ } }

  /* ================= accords et prénoms ================= */
  function acc(p, f, m, n) { return p === 'elle' ? f : p === 'il' ? m : n; }
  function e(p) { return acc(p, 'e', '', '·e'); }
  function moi() { return S.prenom || 'toi'; }
  function lui() { return S.partenaire || 'ton ou ta partenaire'; }
  function Lui() { return S.partenaire || 'Ton ou ta partenaire'; }
  function pr(p) { return acc(p, 'elle', 'il', 'iel'); }
  function couple(f, m, n) { var a = S.pronom || 'iel', b = S.pronomP || 'iel'; if (a === 'elle' && b === 'elle') return f; if (a === 'il' && b === 'il') return m; return n; }
  var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function dureeMois() {
    if (!S.depuisM || !S.depuisA) return null;
    var now = new Date();
    return (now.getFullYear() - (+S.depuisA)) * 12 + (now.getMonth() - (+S.depuisM));
  }
  function dureeTexte() {
    var m = dureeMois();
    if (m == null) return '';
    if (m < 0) return 'Cette date est dans le futur.';
    if (m < 1) return 'Tout nouveau, tout beau ;';
    if (m < 12) return m + ' mois d’histoire ;';
    var a = Math.floor(m / 12), r = m % 12;
    return a + (a > 1 ? ' ans' : ' an') + (r ? ' et ' + r + ' mois' : '') + ' d’histoire ;';
  }
  function annees() { var m = dureeMois(); return m == null ? 0 : Math.floor(m / 12); }
  function codeInvit() {
    if (S.code) return S.code;
    var base = (S.prenom || 'NOUS').normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 3).padEnd(3, 'X');
    var alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = '';
    for (var i = 0; i < 3; i++) s += alpha[Math.floor(Math.random() * alpha.length)];
    S.code = base + s; sauver();
    return S.code;
  }
  function dateDuJour() { var d = new Date(); return ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][d.getDay()] + ' ' + d.getDate() + ' ' + MOIS[d.getMonth()]; }

  /* ================= dessins ================= */
  var sid = 0;
  function pose(nom, taille, deco, extra) {
    var id = 'st' + (++sid);
    return '<span class="pv-wrap' + (taille >= 120 ? ' flotte' : '') + (extra ? ' ' + extra : '') + '"><svg class="pv pose-' + nom + '" viewBox="-8 -8 256 256" width="' + taille + '" height="' + taille + '"' + (deco ? ' aria-hidden="true"' : ' role="img" aria-label="Point et Virgule"') + '><defs><filter id="' + id + '" x="-12%" y="-12%" width="124%" height="124%"><feGaussianBlur in="SourceAlpha" stdDeviation="3.4" result="b"/><feColorMatrix in="b" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 28 -1.6" result="d"/><feFlood flood-color="#F5F2EC"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#' + id + ')">' + D.poses[nom] + '</g></svg></span>';
  }
  var AMB = [[';', 6, 10, 56, -12, 9, 0], ['?', 80, 6, 46, 10, 11, 1.2], ['…', 70, 56, 40, 0, 10, .6], ['!', 8, 62, 50, 8, 12, 2], [';', 86, 80, 34, 14, 8, 1.6], ['?', 28, 34, 30, -8, 13, .4], ['!', 58, 22, 28, 0, 10, 2.4], ['…', 16, 88, 32, 0, 11, 1]];
  function ambiance() {
    return '<div class="ambiance" aria-hidden="true">' + AMB.map(function (a) { return '<span style="left:' + a[1] + '%;top:' + a[2] + '%;font-size:' + a[3] + 'px;--r:' + a[4] + 'deg;--dur:' + a[5] + 's;--d:-' + a[6] + 's;--x:' + (a[1] > 50 ? -12 : 12) + 'px;--y:-' + Math.round(14 + a[3] / 4) + 'px">' + a[0] + '</span>'; }).join('') + '</div>';
  }
  function signe(h, fixe) {
    var dot = fixe ? '#1F2FA8' : 'var(--bleu)', com = fixe ? '#E1243B' : 'var(--rouge)';
    var vb = [-D.rHead - 6, D.markTop - 5, 2 * D.rHead + 12, D.tailY - D.markTop + 10];
    return '<svg viewBox="' + vb.join(' ') + '" height="' + h + '" width="' + Math.round(h * vb[2] / vb[3]) + '" aria-hidden="true"><circle cx="0" cy="' + D.dotCy + '" r="' + D.rDot + '" fill="' + dot + '"/><g transform="translate(0 ' + (-D.rHead) + ') scale(' + D.kV + ') translate(-50 -45)"><path d="' + D.vpath + '" fill="' + com + '"/></g></svg>';
  }
  function logo(h, inv) {
    var vb = D.vbLogo.split(' ').map(Number);
    return '<svg viewBox="' + D.vbLogo + '" height="' + h + '" width="' + Math.round(h * vb[2] / vb[3]) + '" role="img" aria-label="Entre nous" style="color:' + (inv ? 'var(--on-bleu)' : 'var(--graphite)') + '"><path d="' + D.entre + '" fill="currentColor"/><circle cx="' + D.mx + '" cy="' + D.dotCy + '" r="' + D.rDot + '" fill="' + (inv ? 'var(--on-bleu)' : 'var(--bleu)') + '"/><g transform="translate(' + D.mx + ' ' + (-D.rHead) + ') scale(' + D.kV + ') translate(-50 -45)"><path d="' + D.vpath + '" fill="var(--rouge)"/></g><path d="' + D.nous + '" fill="currentColor"/></svg>';
  }
  function melange(t) {
    var id = 'goo' + (++sid), k = D.kV, dy = D.dotCy;
    return '<svg class="melange" viewBox="-52 -76 104 112" width="' + t + '" height="' + Math.round(t * 112 / 104) + '" aria-hidden="true"><defs><filter id="' + id + '" x="-40%" y="-40%" width="180%" height="180%">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="3.4" result="b"/><feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -16" result="g"/>' +
      '<feMorphology in="g" operator="dilate" radius="2.6" result="d"/><feFlood flood-color="#F5F2EC"/><feComposite in2="d" operator="in" result="o"/>' +
      '<feMerge><feMergeNode in="o"/><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
      '<g filter="url(#' + id + ')"><g class="lm-v"><g transform="translate(0 ' + (-D.rHead) + ') scale(' + k + ') translate(-50 -45)"><path class="lm-vp" d="' + D.vpath + '"/></g></g>' +
      '<g class="lm-pt"><circle class="lm-pp" cx="0" cy="' + dy + '" r="' + D.rDot + '"/></g></g></svg>';
  }
  function chargement(msg, ms, fin) {
    phone.querySelectorAll('.charge').forEach(function (n) { n.remove(); });
    var d = document.createElement('div'); d.className = 'charge'; d.setAttribute('role', 'status');
    d.innerHTML = melange(104) + '<p>' + esc(msg) + '</p>';
    phone.appendChild(d);
    setTimeout(function () { if (fin) fin(); d.classList.add('sort'); setTimeout(function () { d.remove(); }, 400); }, ms || 1400);
  }
  function cachet(t) { return '<svg class="cachet-anim" viewBox="0 0 124 124" width="' + t + '" height="' + t + '" aria-hidden="true">' + D.cachet + '</svg>'; }
  var I = {
    chev: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    ok: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cad: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    okb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    tiret: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M7 12h10"/></svg>',
    cadenas: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    europe: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    corbeille: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
    copie: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>',
    apple: '<svg width="18" height="20" viewBox="0 0 17 20" fill="currentColor" aria-hidden="true"><path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1.1 7.3c-1.8 3.2-.5 7.9 1.3 10.5.9 1.3 1.9 2.7 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.7-1-2.7-4.2zM11.6 3c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3.1-1.5z"/></svg>',
    google: '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
    cle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  /* ================= briques ================= */
  function cadre(o) {
    var h = '<div class="scr ' + (o.cls || '') + (o.fond ? ' fond-' + o.fond : '') + (o.compagnon ? ' avec-comp' : '') + '" data-ecran="' + o.id + '" data-haut="' + (o.hautCouleur || o.fond || '') + '" data-bas="' + (o.fond || '') + '">' + (o.fond === 'bleu' ? ambiance() : '');
    if (o.barre !== false) {
      h += '<div class="tb">' + (o.retour === false ? '<span class="tb-vide"></span>' : '<button class="back" data-act="retour" aria-label="Retour">' + I.chev + '</button>') +
        (o.prog === false ? '<span style="flex:1"></span>' : '<div class="prog" role="progressbar" aria-label="Progression" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(progression() * 100) + '"><i data-w="' + Math.round(progression() * 100) + '" style="width:' + Math.round(progression() * 100) + '%"></i></div>') +
        (o.passer ? '<button class="skip" data-act="' + o.passer + '">Passer</button>' : '<span class="tb-vide"></span>') + '</div>';
    }
    if (o.compagnon) h += '<div class="compagnon">' + pose(o.compagnon, 70, true) + '</div>';
    h += '<div class="sc' + (o.centre ? ' centre' : '') + '">' + (o.haut || '') + (o.titre ? '<h1 class="t' + (o.xl ? ' xl' : '') + '" tabindex="-1">' + o.titre + '</h1>' : '') + (o.sous ? '<p class="s">' + o.sous + '</p>' : '') + (o.corps || '') + '</div>';
    if (o.cta || o.lien || o.pied) h += '<div class="ft">' + (o.cta ? '<button class="btn ' + (o.ctaCls || 'btn-p') + '" data-act="' + o.cta[1] + '"' + (o.cta[2] != null ? ' data-val="' + o.cta[2] + '"' : '') + ' data-cta>' + o.cta[0] + '</button>' : '') + (o.lien ? '<button class="lnk' + (o.lienDoux ? ' doux' : '') + '" data-act="' + o.lien[1] + '">' + o.lien[0] + '</button>' : '') + (o.pied || '') + '</div>';
    return h + '</div>';
  }
  function option(val, titre, sous, choisi, groupe, multi) {
    return '<button class="opt' + (multi ? ' multi' : '') + '" role="' + (multi ? 'checkbox' : 'radio') + '" aria-checked="' + (choisi ? 'true' : 'false') + '" data-act="choix" data-groupe="' + groupe + '" data-val="' + val + '"><span class="ol"><b>' + titre + '</b>' + (sous ? '<span>' + sous + '</span>' : '') + '</span><span class="rd">' + I.ok + '</span></button>';
  }
  function pronoms(groupe, val) {
    return '<div class="seg" role="radiogroup">' + [['elle', 'Elle'], ['il', 'Il'], ['iel', 'Iel']].map(function (p) { return '<button role="radio" aria-checked="' + (val === p[0]) + '" data-act="choix" data-groupe="' + groupe + '" data-val="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div>';
  }
  function qTexte() { return 'Quel petit geste de l’autre te fait te sentir aimé' + e(S.pronom) + ' <span class="qm">?</span>'; }

  /* ================= parcours ================= */
  var PRINCIPAL = ['accueil', 'email', 'email-envoye', 'bienvenue', 'consent', 'prenom', 'pronom', 'interlude', 'partenaire', 'depuis', 'situation', 'cohab', 'enfants', 'objectifs', 'analyse', 'invite', 'notifs', 'source', 'avantapres', 'paywall', 'offre', 'bravo', 'question', 'app-aujourdhui', 'app-explorer', 'app-billets', 'app-nous', 'mission', 'jeu', 'bilan', 'pack', 'parcours-d'];
  var PARTENAIRE = ['accueil', 'bienvenue', 'code', 'rejoindre', 'consent', 'prenom', 'pronom', 'notifs', 'cadeau', 'question', 'app-aujourdhui', 'app-explorer', 'app-billets', 'app-nous', 'mission', 'jeu', 'bilan', 'pack', 'parcours-d'];
  var PHASES = { accueil: 'Compte', email: 'Compte', 'email-envoye': 'Compte', bienvenue: 'Compte', code: 'Compte', rejoindre: 'Compte', consent: 'Compte', prenom: 'Toi', pronom: 'Toi', interlude: 'Vous deux', partenaire: 'Vous deux', depuis: 'Vous deux', situation: 'Vous deux', cohab: 'Vous deux', enfants: 'Vous deux', objectifs: 'Vous deux', analyse: 'Vous deux', invite: 'Ensemble', notifs: 'Ensemble', source: 'Ensemble', avantapres: 'Abonnement', paywall: 'Abonnement', offre: 'Abonnement', bravo: 'Abonnement', cadeau: 'Abonnement', question: 'Première question', 'app-aujourdhui': 'L’app (V2)', 'app-explorer': 'L’app (V2)', 'app-billets': 'L’app (V2)', 'app-nous': 'L’app (V2)', mission: 'L’app (V2)', jeu: 'L’app (V2)', bilan: 'L’app (V2)', pack: 'L’app (V2)', 'parcours-d': 'L’app (V2)' };
  var NOMS = { accueil: 'Accueil', email: 'Adresse email', 'email-envoye': 'Lien envoyé', bienvenue: 'Bienvenue', code: 'Code d’invitation', rejoindre: 'Rejoindre', consent: 'Confidentialité', prenom: 'Prénom', pronom: 'Pronom', interlude: 'Respiration', partenaire: 'Partenaire', depuis: 'Depuis quand', situation: 'Situation', cohab: 'Vie commune', enfants: 'Enfants', objectifs: 'Envies', analyse: 'Préparation', invite: 'Invitation', notifs: 'Notifications', source: 'Attribution', avantapres: 'Avant / après', paywall: 'Paywall', offre: 'Offre de rattrapage', bravo: 'Confirmation', cadeau: 'Premium offert', question: 'Question du jour', 'app-aujourdhui': 'Onglet Aujourd’hui', 'app-explorer': 'Onglet Explorer', 'app-billets': 'Onglet Billets', 'app-nous': 'Onglet Nous', mission: 'Mission secrète', jeu: 'Jeu « Toi ou moi ? »', bilan: 'Analyse de couple', pack: 'Pack de questions', 'parcours-d': 'Parcours guidé' };
  function parcours() { return S.mode === 'partenaire' ? PARTENAIRE : PRINCIPAL; }
  function progression() {
    var p = parcours().filter(function (x) { return x !== 'email' && x !== 'email-envoye' && x !== 'offre' && x !== 'question' && x.indexOf('app-') !== 0 && ['mission', 'jeu', 'bilan', 'pack', 'parcours-d'].indexOf(x) < 0; });
    var i = p.indexOf(S.ecran);
    return i < 0 ? 1 : Math.max(.04, i / (p.length - 1));
  }

  var POURQUOI = {
    accueil: 'La promesse tient en une phrase, et le compte se crée en un geste. Comme chez Paired, on récupère l’email avant tout le reste, pour relancer ceux qui ne paient pas.',
    email: 'Lien magique plutôt que mot de passe : trois écrans iOS en moins que Paired (saisie, trousseau, enregistrement).',
    'email-envoye': 'Écran d’attente du lien magique. En vrai, l’app reprend toute seule quand le lien est ouvert.',
    bienvenue: 'Annonce la personnalisation pour justifier les questions. Le lien du bas sort le partenaire invité du tunnel : il rejoint sans passer par le paywall.',
    code: 'Le partenaire invité saisit le code reçu. En vrai, le lien d’invitation remplit ce champ automatiquement.',
    rejoindre: 'On montre tout de suite qui attend : l’invité voit qu’une personne réelle compte sur lui.',
    consent: 'Obligatoire (RGPD, article 9 : vie de couple et sexualité). On en fait un argument rassurant, avec le cachet de la marque. Sans accord, on ne peut pas continuer.',
    prenom: 'Le prénom est réutilisé dès l’écran suivant : l’onboarding devient une conversation.',
    pronom: 'Spécifique au français : sert uniquement à accorder les phrases (« prête », « prêt », « prêt·e »). Rien d’autre n’en est déduit.',
    interlude: 'Une respiration avant le bloc sur le couple, avec le nombre de questions restantes.',
    partenaire: 'Le partenaire devient réel : son prénom revient jusqu’au paywall (« Un abonnement pour vous deux »).',
    depuis: 'Valeur immédiate (le rappel d’anniversaire) et segmentation : un couple de 6 mois et un couple de 12 ans n’ont pas les mêmes questions.',
    situation: 'Le PACS a sa place, contrairement à Paired. Les mots s’accordent selon les pronoms des deux.',
    cohab: 'Repère les couples à distance, le segment le plus motivé. Leur envie « garder le lien » est cochée d’office à l’écran suivant.',
    enfants: 'Adapte le contenu, familles recomposées comprises.',
    objectifs: 'La personne choisit ce qu’elle va acheter. Ses choix reviennent à l’écran suivant.',
    analyse: 'Écran de préparation : il montre le travail fait pour le couple et augmente la valeur perçue juste avant le prix. Paired n’en a pas.',
    invite: 'La boucle virale, placée avant le paywall comme chez Paired : chaque install en amène une deuxième, gratuite.',
    notifs: 'Pré-permission : la notification promise est sociale (« Thomas a répondu »). La demande iOS n’arrive qu’après un oui, ce qui fait monter le taux d’acceptation.',
    source: 'Attribution déclarative, indispensable depuis iOS 14. Le code créateur permet de payer les influenceurs à la performance.',
    avantapres: 'Avant / après interactif : la scène passe toute seule de « sans » à « avec », et on peut rebasculer. Plus parlant que deux listes, et personnalisé (durée du couple, distance).',
    paywall: 'Prix par personne, essai expliqué par une frise (on rassure sur le prélèvement), une seule offre mise en avant. Aucun faux avis : on les ajoutera après le lancement.',
    offre: 'Rattrapage honnête : la date limite est réelle et enregistrée. Ce n’est pas un compte à rebours qui repart à zéro.',
    bravo: 'Célébration courte, puis le moment « aha » tout de suite.',
    cadeau: 'Le partenaire invité profite de l’abonnement de l’autre : pas de paywall, il arrive directement sur la question.',
    'app-aujourdhui': 'L’accueil, hiérarchisé en quatre étages : la question du jour en grand (l’action principale, un seul bouton), puis les nouvelles de l’autre (humeur et mot doux), ton geste du jour, et le rendez-vous de la semaine. Chiffres de série et historique : données d’exemple.',
    'app-explorer': 'La bibliothèque, pour aller plus loin que la question du jour, rangée par intention : parler d’un sujet (packs de questions, même principe de réponses secrètes), jouer à deux (jeux de 2 minutes), se faire accompagner (parcours de quelques jours). C’est le contenu « à volonté » qui justifie l’abonnement.',
    'app-billets': 'L’historique des réponses et des mots doux, présentés comme des billets. En gratuit, seulement les 7 derniers jours : un argument d’abonnement doux.',
    'app-nous': 'L’espace du couple : série, dates importantes avec compte à rebours, souvenirs, analyse et réglages. C’est ici que l’attachement se construit.',
    mission: 'Équivalent des « Missions secrètes » de Paired, avec notre cachet : on décachette sa mission, l’autre en a une différente, on découvre tout dimanche.',
    jeu: 'Jeu jouable : 5 questions « Toi ou moi ? », puis la comparaison avec les réponses de l’autre. Format court, très partageable en vidéo.',
    bilan: 'Équivalent de l’« Analyse de couple » de Paired : une IA analyse les réponses communes de la semaine. Mention claire de l’IA et de la relecture humaine. Texte d’exemple.',
    pack: 'Un pack : à quoi il sert, comment ça marche en 3 étapes, puis les questions à toucher pour y répondre. Dans le prototype, l’autre répond quelques secondes après toi.',
    'parcours-d': 'Parcours guidé jour par jour, comme les « Journeys » de Paired. Un jour se débloque chaque jour pour créer l’habitude.',
    question: 'La question du jour, lisible d’un coup d’œil : la règle en une phrase (chacun répond en secret, tout s’ouvre en même temps), un suivi en 3 étapes, puis « Ta réponse » et « La réponse de Thomas » clairement séparées. Le bouton « Prototype » simule sa réponse.'
  };

  /* ================= écrans ================= */
  var E = {};
  E.accueil = function () {
    return '<div class="scr fond-bleu" data-ecran="accueil" data-haut="bleu" data-bas="bleu">' + ambiance() + '<div class="hero-ill">' + pose('ensemble', 230, false, 'entree') + '</div>' +
      '<div class="sc" style="flex:none;padding-top:0">' + '<div style="display:flex;justify-content:center;margin-bottom:2px">' + logo(30, true) + '</div>' +
      '<h1 class="t xl" tabindex="-1" style="text-align:center">Une question par jour. Rien que pour vous deux<span class="qm" style="font-size:1em">\u00a0;</span></h1>' +
      '<p class="s" style="text-align:center">Chacun répond de son côté. Le billet de l’autre s’ouvre quand vous avez répondu tous les deux.</p></div>' +
      '<div class="ft"><button class="btn btn-noir" data-act="apple">' + I.apple + 'Continuer avec Apple</button><button class="btn btn-clair" data-act="google">' + I.google + 'Continuer avec Google</button>' +
      '<button class="lnk" data-act="va-email">Continuer avec mon email</button><p class="legal">En continuant, tu acceptes nos <u>Conditions</u> et notre <u>Politique de confidentialité</u>.</p></div></div>';
  };
  E.email = function () {
    return cadre({ id: 'email', compagnon: 'virgule', titre: 'Ton adresse email', sous: 'Pas de mot de passe : on t’envoie un lien pour te connecter.',
      corps: '<div class="champ"><label for="f-email">Email</label><input class="in" id="f-email" type="email" inputmode="email" autocomplete="email" placeholder="prenom@exemple.fr" data-modele="email" value="' + esc(S.email) + '"></div>',
      cta: ['Recevoir mon lien', 'email-ok'] });
  };
  E['email-envoye'] = function () {
    return cadre({ id: 'email-envoye', centre: true, haut: '<div class="ill">' + pose('attente', 170) + '</div>', titre: 'Regarde tes emails', sous: 'On a envoyé un lien de connexion à <b>' + esc(S.email) + '</b>. Ouvre-le sur ce téléphone pour continuer.',
      cta: ['J’ai ouvert le lien', 'va:bienvenue'], lien: ['Renvoyer le lien', 'renvoyer'], lienDoux: true });
  };
  E.bienvenue = function () {
    return cadre({ id: 'bienvenue', retour: false, centre: true, haut: '<div class="ill">' + pose('virgule', 170, false, 'salut pop') + '</div>', titre: 'Bienvenue ;', xl: true,
      sous: S.mode === 'partenaire' ? 'Ton ou ta partenaire t’a envoyé un code ? Entre-le pour rejoindre votre espace à deux.' : 'Quelques questions pour adapter Entre nous à votre couple. Ça prend une minute.',
      cta: S.mode === 'partenaire' ? ['Entrer mon code', 'va:code'] : ['C’est parti', 'va:consent'],
      lien: S.mode === 'partenaire' ? ['Je n’ai pas de code', 'mode-principal'] : ['J’ai un code de mon ou ma partenaire', 'mode-partenaire'] });
  };
  E.code = function () {
    return cadre({ id: 'code', compagnon: 'point', titre: 'Entre le code d’invitation', sous: 'Il est dans le message que t’a envoyé ton ou ta partenaire.',
      corps: '<div class="champ"><label for="f-code" class="lab" style="position:absolute;left:-9999px">Code d’invitation</label><input class="in code" id="f-code" maxlength="6" autocomplete="one-time-code" autocapitalize="characters" spellcheck="false" data-modele="codeSaisi" value="' + esc(S.codeSaisi) + '" placeholder="······"></div><p class="hint">Pour tester le prototype : <b>LEA4K2</b></p><p class="err" id="code-err" hidden>Ce code ne correspond à aucune invitation. Vérifie les 6 caractères.</p>',
      cta: ['Valider', 'code-ok'] });
  };
  E.rejoindre = function () {
    return cadre({ id: 'rejoindre', fond: 'bleu', centre: true, haut: '<div class="ill">' + pose('ensemble', 190, false, 'entree') + '</div>', titre: 'Léa t’attend ;', xl: true,
      sous: 'Léa t’a invité·e sur Entre nous. Vous recevrez la même question chaque jour, et vos billets s’ouvriront ensemble.', cta: ['Rejoindre Léa', 'va:consent'] });
  };
  E.consent = function () {
    return cadre({ id: 'consent', haut: '<div class="ill" style="justify-items:start">' + cachet(84) + '</div>', titre: 'Ce qui se dit ici reste entre vous deux',
      corps: '<ul class="ras"><li><span class="ic">' + I.cadenas + '</span>Vos réponses sont chiffrées et hébergées en Europe.</li><li><span class="ic">' + I.europe + '</span>Elles ne sont jamais vendues, ni utilisées pour de la publicité.</li><li><span class="ic">' + I.corbeille + '</span>Tu peux tout exporter ou tout supprimer, quand tu veux.</li></ul>' +
        '<button class="check" role="checkbox" aria-checked="' + S.consent + '" data-act="consent"><span class="bx">' + I.ok + '</span><span>J’accepte que mes réponses sur notre vie de couple soient utilisées pour faire fonctionner Entre nous. <u>Politique de confidentialité</u></span></button>',
      cta: ['Continuer', 'va-suite'] });
  };
  E.prenom = function () {
    return cadre({ id: 'prenom', compagnon: 'virgule', titre: 'Comment tu t’appelles ?',
      corps: '<div class="champ"><label for="f-prenom">Ton prénom</label><input class="in" id="f-prenom" autocomplete="given-name" autocapitalize="words" placeholder="' + (S.mode === 'partenaire' ? 'Thomas' : 'Léa') + '" maxlength="30" data-modele="prenom" value="' + esc(S.prenom) + '"></div>' +
        '<div class="champ"><label for="f-naiss">Ta date de naissance <small>(facultatif)</small></label><input class="in" id="f-naiss" type="date" data-modele="naissance" value="' + esc(S.naissance) + '"></div>',
      cta: ['Continuer', 'va-suite'] });
  };
  E.pronom = function () {
    return cadre({ id: 'pronom', compagnon: 'virgule', titre: esc(moi()) + ', comment on s’adresse à toi ?', sous: 'Juste pour accorder les phrases. Rien d’autre.',
      corps: '<div class="opts" role="radiogroup">' + option('elle', 'Elle', '« Tu es prête ? »', S.pronom === 'elle', 'pronom') + option('il', 'Il', '« Tu es prêt ? »', S.pronom === 'il', 'pronom') + option('iel', 'Iel', '« Tu es prêt·e ? »', S.pronom === 'iel', 'pronom') + '</div>' });
  };
  E.interlude = function () {
    return cadre({ id: 'interlude', fond: 'bleu', centre: true, haut: '<div class="ill">' + pose('question', 220, false, 'pop') + '</div>', titre: 'Maintenant, parlons de vous deux', sous: 'Six questions rapides pour choisir vos premières questions.', cta: ['Continuer', 'va-suite'] });
  };
  E.partenaire = function () {
    return cadre({ id: 'partenaire', compagnon: 'point', titre: 'Comment s’appelle ton ou ta partenaire ?',
      corps: '<div class="champ"><label for="f-part">Son prénom</label><input class="in" id="f-part" autocapitalize="words" placeholder="Thomas" maxlength="30" data-modele="partenaire" value="' + esc(S.partenaire) + '"></div><div class="champ"><span class="lab">Pour parler de ' + (S.partenaire ? esc(S.partenaire) : 'cette personne') + ', on dit…</span>' + pronoms('pronomP', S.pronomP) + '</div>',
      cta: ['Continuer', 'va-suite'] });
  };
  E.depuis = function () {
    var an = new Date().getFullYear(), opts = '<option value="">Année</option>';
    for (var y = an; y >= an - 60; y--) opts += '<option value="' + y + '"' + (String(S.depuisA) === String(y) ? ' selected' : '') + '>' + y + '</option>';
    var mo = '<option value="">Mois</option>' + MOIS.map(function (m, i) { return '<option value="' + i + '"' + (String(S.depuisM) === String(i) ? ' selected' : '') + '>' + m.charAt(0).toUpperCase() + m.slice(1) + '</option>'; }).join('');
    return cadre({ id: 'depuis', compagnon: 'ensemble', titre: 'Depuis quand êtes-vous ensemble ?', sous: 'On vous rappellera votre anniversaire.',
      corps: '<div class="duo"><select class="in" id="f-mois" aria-label="Mois" data-modele="depuisM">' + mo + '</select><select class="in" id="f-an" aria-label="Année" data-modele="depuisA">' + opts + '</select></div><p class="t" id="duree" style="font-size:24px;line-height:30px;min-height:30px" aria-live="polite">' + esc(dureeTexte()) + '</p>',
      cta: ['Continuer', 'va-suite'] });
  };
  E.situation = function () {
    var union = S.situation === 'pacs' || S.situation === 'maries';
    var an = new Date().getFullYear(), ys = '<option value="">Année</option>';
    for (var y = an; y >= an - 60; y--) ys += '<option value="' + y + '"' + (String(S.unionA) === String(y) ? ' selected' : '') + '>' + y + '</option>';
    var ms = '<option value="">Mois</option>' + MOIS.map(function (m, i) { return '<option value="' + i + '"' + (String(S.unionM) === String(i) ? ' selected' : '') + '>' + m.charAt(0).toUpperCase() + m.slice(1) + '</option>'; }).join('');
    return cadre({ id: 'situation', compagnon: 'calin', titre: 'Vous êtes…',
      corps: '<div class="opts" role="radiogroup">' + option('couple', 'En couple', '', S.situation === 'couple', 'situation') + option('pacs', couple('Pacsées', 'Pacsés', 'Pacsé·es'), '', S.situation === 'pacs', 'situation') + option('fiances', couple('Fiancées', 'Fiancés', 'Fiancé·es'), '', S.situation === 'fiances', 'situation') + option('maries', couple('Mariées', 'Mariés', 'Marié·es'), '', S.situation === 'maries', 'situation') + '</div>' +
        (union ? '<div class="champ"><span class="lab">' + (S.situation === 'pacs' ? 'Date du PACS' : 'Date du mariage') + ' <small>(facultatif, pour un second anniversaire)</small></span><div class="duo"><select class="in" aria-label="Mois" data-modele="unionM">' + ms + '</select><select class="in" aria-label="Année" data-modele="unionA">' + ys + '</select></div></div>' : ''),
      cta: union ? ['Continuer', 'va-suite'] : null });
  };
  E.cohab = function () {
    return cadre({ id: 'cohab', compagnon: 'point', titre: 'Vous vivez ensemble ?', corps: '<div class="opts" role="radiogroup">' + option('oui', 'Oui, sous le même toit', '', S.cohab === 'oui', 'cohab') + option('proche', 'Non, mais pas loin', '', S.cohab === 'proche', 'cohab') + option('distance', 'Non, à distance', 'Autre ville, autre pays, autre fuseau', S.cohab === 'distance', 'cohab') + '</div>' });
  };
  E.enfants = function () {
    return cadre({ id: 'enfants', compagnon: 'virgule', titre: 'Des enfants dans votre vie ?', corps: '<div class="opts" role="radiogroup">' + option('ensemble', 'Oui, ensemble', '', S.enfants === 'ensemble', 'enfants') + option('avant', 'Oui, d’une histoire d’avant', 'Famille recomposée', S.enfants === 'avant', 'enfants') + option('pasencore', 'Pas encore', '', S.enfants === 'pasencore', 'enfants') + option('non', 'Non', '', S.enfants === 'non', 'enfants') + '</div>' });
  };
  var OBJ = [['connaitre', 'Mieux se connaître'], ['complicite', 'Plus de complicité'], ['difficile', 'Oser parler des sujets difficiles'], ['rire', 'Rire ensemble'], ['distance', 'Garder le lien à distance'], ['flamme', 'Raviver la flamme']];
  E.objectifs = function () {
    return cadre({ id: 'objectifs', compagnon: 'ensemble', titre: 'Qu’aimeriez-vous vivre avec Entre nous ?', sous: 'Plusieurs choix possibles.',
      corps: '<div class="opts">' + OBJ.map(function (o) { return option(o[0], o[1], '', S.objectifs.indexOf(o[0]) >= 0, 'objectifs', true); }).join('') + '</div>', cta: ['Continuer', 'va-suite'] });
  };
  var QUESTIONS = {
    connaitre: 'Quel souvenir d’enfance tu ne m’as jamais raconté ?',
    complicite: function () { return 'Quel petit geste de l’autre te fait te sentir aimé' + e(S.pronom) + ' ?'; },
    difficile: 'Quel sujet on évite un peu trop, selon toi ?',
    rire: 'Quelle est la chose la plus ridicule qu’on ait faite ensemble ?',
    distance: 'Quelle est la première chose que tu veux faire quand on se retrouve ?',
    flamme: 'Quel moment à deux aimerais-tu revivre, exactement pareil ?'
  };
  function troisQuestions() {
    var ks = S.objectifs.slice();
    ['complicite', 'connaitre', 'rire', 'flamme'].forEach(function (k) { if (ks.indexOf(k) < 0) ks.push(k); });
    return ks.slice(0, 3).map(function (k) { var q = QUESTIONS[k]; return typeof q === 'function' ? q() : q; });
  }
  E.analyse = function () {
    var obj = OBJ.filter(function (o) { return S.objectifs.indexOf(o[0]) >= 0; })[0];
    var a = annees();
    var etapes = [a >= 1 ? 'Adapter les questions à vos ' + a + (a > 1 ? ' ans' : ' an') + ' d’histoire' : 'Adapter les questions à un couple tout neuf', 'Choisir des questions pour ' + (obj ? obj[1].charAt(0).toLowerCase() + obj[1].slice(1) : 'mieux vous connaître'), 'Glisser une question surprise'];
    return cadre({ id: 'analyse', fond: 'bleu', retour: false, centre: true, haut: '<div class="ill" id="an-ill">' + melange(150) + '</div>', titre: 'On prépare vos premières questions…',
      corps: '<ul class="etapes" id="etapes">' + etapes.map(function (t) { return '<li><span class="pt">' + I.okb + '</span>' + esc(t) + '</li>'; }).join('') + '</ul><div class="mini-q" id="mini-q" hidden></div>',
      cta: ['Continuer', 'va-suite'] });
  };
  E.invite = function () {
    var c = codeInvit();
    var msg = esc(moi()) + ' t’invite sur Entre nous ; une question par jour, rien que pour vous deux. Télécharge l’app et rejoins-moi avec le code ' + c + '.';
    return cadre({ id: 'invite', compagnon: 'point', titre: 'Invite ' + esc(lui()), sous: 'Entre nous se joue à deux : ' + esc(lui()) + ' recevra la même question que toi, chaque jour.',
      corps: '<div class="msg"><span class="mic">Aperçu du message</span>' + msg + '</div><div class="codebox"><div><span class="lab">Ton code</span><b>' + c + '</b></div><button class="copier" data-act="copier-code">' + I.copie + 'Copier</button></div>',
      cta: [S.invite ? 'Continuer' : 'Envoyer l’invitation', S.invite ? 'va-suite' : 'inviter'], lien: S.invite ? null : ['Je l’inviterai plus tard', 'va-suite'], lienDoux: true });
  };
  E.notifs = function () {
    var p = S.mode === 'partenaire' ? 'Léa' : lui();
    return cadre({ id: 'notifs', fond: 'bleu', titre: 'Sois prévenu' + e(S.pronom) + ' quand ' + esc(p) + ' répond', sous: 'Une notification quand son billet arrive, et un rappel le soir si tu n’as pas encore répondu. Jamais plus de trois par jour.',
      corps: '<div class="verr"><div class="h">21:47</div><div class="d">' + esc(dateDuJour()) + '</div>' +
        '<div class="nt"><span class="ic">' + signe(22, true) + '</span><div><b>Entre nous <em>maintenant</em></b><p>' + esc(p) + ' a glissé sa réponse. Elle reste scellée jusqu’à la tienne.</p></div></div>' +
        '<div class="nt"><span class="ic">' + signe(22, true) + '</span><div><b>Entre nous <em>20:30</em></b><p>Point attend Virgule… La question du jour est toujours là.</p></div></div></div>',
      cta: ['Oui, préviens-moi', 'notifs-oui'], lien: ['Plus tard', 'notifs-non'], lienDoux: true });
  };
  var SOURCES = [['tiktok', 'TikTok'], ['instagram', 'Instagram'], ['createur', 'Un·e créateur·rice'], ['ami', 'Un ou une ami·e'], ['partenaire', 'Mon ou ma partenaire'], ['store', 'L’App Store'], ['podcast', 'Un podcast'], ['ia', 'ChatGPT ou une autre IA'], ['autre', 'Autre']];
  E.source = function () {
    return cadre({ id: 'source', compagnon: 'point', passer: 'va-suite', titre: 'Comment as-tu connu Entre nous ?',
      corps: '<div class="opts" role="radiogroup">' + SOURCES.map(function (s) { return option(s[0], s[1], '', S.source === s[0], 'source'); }).join('') + '</div>' +
        (S.source === 'createur' ? '<div class="champ"><label for="f-crea">Son code <small>(facultatif)</small></label><input class="in" id="f-crea" autocapitalize="characters" placeholder="ex. CAMILLE10" data-modele="codeCreateur" value="' + esc(S.codeCreateur) + '"></div>' : ''),
      cta: S.source === 'createur' ? ['Continuer', 'va-suite'] : null });
  };
  E.avantapres = function () {
    var a = annees(), loin = S.cohab === 'distance';
    var sans = ['On se parle surtout d’organisation.', 'Les vraies discussions attendent « le bon moment ».', loin ? 'La distance prend toute la place.' : 'On croit tout savoir de l’autre.'];
    var avec = ['Une vraie question chaque jour, en deux minutes.', 'Les sujets qu’on n’osait pas aborder.', loin ? 'Proches, même à distance.' : (a >= 2 ? 'Des surprises, même après ' + a + ' ans.' : 'Des surprises, chaque jour.')];
    return cadre({ id: 'avantapres', titre: 'Deux minutes par jour, et tout change',
      corps: '<div class="bascule" role="group" aria-label="Comparer"><button type="button" data-act="bascule" data-val="sans" aria-pressed="true">Sans Entre nous</button><button type="button" data-act="bascule" data-val="avec" aria-pressed="false">Avec Entre nous</button></div>' +
        '<div class="scene" id="scene" aria-live="polite">' +
          '<div class="sc-sans"><div class="sc-ill">' + pose('endormi', 150, true) + '</div><ul>' + sans.map(function (t, i) { return '<li style="--i:' + i + '">' + I.tiret + '<span>' + esc(t) + '</span></li>'; }).join('') + '</ul></div>' +
          '<div class="sc-avec">' + ambiance() + '<div class="sc-ill">' + pose('calin', 160, true) + '</div><ul>' + avec.map(function (t, i) { return '<li style="--i:' + i + '"><span class="ok">' + I.ok + '</span><span>' + esc(t) + '</span></li>'; }).join('') + '</ul></div>' +
        '</div>',
      cta: ['Continuer', 'va-suite'] });
  };
  E.paywall = function () {
    var an = S.plan === 'an', essai = an && S.essai;
    var cta = essai ? 'Commencer mes 7 jours gratuits' : an ? 'S’abonner pour 59,99 € par an' : 'S’abonner pour 14,99 € par mois';
    return cadre({ id: 'paywall', barre: false, cls: 'pw', hautCouleur: 'bleu', ctaCls: 'btn-p brille-cta',
      haut: '<div class="pw-top"><button class="fermer" data-act="pw-fermer" aria-label="Fermer">' + I.x + '</button></div><div class="band b-bleu">' + ambiance() + pose('fete', 118, false, 'pop') + '<h1 class="t" tabindex="-1">Un abonnement pour vous deux</h1><p class="s">' + esc(Lui()) + ' en profite aussi, sans payer.</p></div>',
      corps: '<div class="essai"><div><b>Essai gratuit de 7 jours</b><small>' + (an ? 'Annulable avant, sans frais' : 'Inclus dans l’offre annuelle') + '</small></div><button class="sw" role="switch" aria-label="Essai gratuit" aria-checked="' + essai + '" data-act="essai"' + (an ? '' : ' disabled') + '></button></div>' +
        '<div class="opts" role="radiogroup" style="gap:16px;padding-top:6px"><button class="offre" role="radio" aria-checked="' + an + '" data-act="plan" data-val="an"><span class="etq">Le plus choisi</span><span class="ti">Annuel</span><span class="de">59,99 € par an</span><span class="pr"><b>2,50 €</b><span>par personne<br>et par mois</span></span></button>' +
        '<button class="offre" role="radio" aria-checked="' + !an + '" data-act="plan" data-val="mois"><span class="ti">Mensuel</span><span class="de">Sans engagement</span><span class="pr"><b>14,99 €</b><span>par mois<br>pour vous deux</span></span></button></div>' +
        (essai ? '<ul class="frise"><li><span class="pt on">' + I.ok + '</span><div><b>Aujourd’hui</b><span>Tout Entre nous, pour vous deux.</span></div></li><li><span class="pt">' + I.cle + '</span><div><b>Dans 5 jours</b><span>On te rappelle que l’essai se termine.</span></div></li><li><span class="pt">' + signe(14) + '</span><div><b>Dans 7 jours</b><span>Début de l’abonnement, 59,99 €. Annulable avant, sans frais.</span></div></li></ul>' : '') +
        '<div class="inclus2"><h3>Inclus dans votre formule</h3>' +
          '<div class="inc"><span class="vis" style="background:var(--bleu-pale)">' + pose('question', 54, true) + '</span><span><b>Toutes les questions</b><small>Plus de 400 questions et des packs à thème : souvenirs, argent, intimité…</small></span></div>' +
          '<div class="inc"><span class="vis" style="background:var(--beurre-pale);font:400 30px/1 var(--font-display);color:var(--graphite)">!</span><span><b>Jeux et parcours guidés</b><small>« Toi ou moi ? », quiz, et des parcours conçus avec des conseillers conjugaux</small></span></div>' +
          '<div class="inc"><span class="vis" style="background:var(--bleu)">' + pose('revelation', 54, true) + '</span><span><b>Votre analyse de couple</b><small>Chaque semaine, vos forces et ce qui mérite un peu d’attention</small></span></div>' +
          '<div class="inc"><span class="vis" style="background:var(--craie);box-shadow:inset 0 0 0 1.5px var(--filet)">' + cachet(40) + '</span><span><b>Missions secrètes</b><small>Une surprise secrète à faire pour l’autre, chaque semaine</small></span></div>' +
          '<div class="inc"><span class="vis" style="background:var(--beurre)">' + signe(26) + '</span><span><b>Le gel de série</b><small>Pour les jours sans, votre série reste intacte</small></span></div></div>',
      cta: [cta, 'acheter'], pied: '<p class="legal">Annulable à tout moment dans les réglages de l’App Store.<br><u>Restaurer mes achats</u> · <u>Conditions</u> · <u>Confidentialité</u></p>' });
  };
  function finOffre() {
    if (!S.offreFin) { S.offreFin = Date.now() + 24 * 3600 * 1000; sauver(); }
    var d = new Date(S.offreFin);
    return 'demain à ' + String(d.getHours()).padStart(2, '0') + ' h ' + String(d.getMinutes()).padStart(2, '0');
  }
  E.offre = function () {
    return cadre({ id: 'offre', barre: false, centre: true, hautCouleur: 'rouge', ctaCls: 'btn-p brille-cta',
      haut: '<div class="band b-rouge">' + ambiance() + pose('calin', 130, false, 'pop') + '<div class="remise">−33 %</div><h1 class="t" tabindex="-1">Attendez ; une offre rien que pour vous deux</h1></div>',
      sous: 'Une seule fois : votre première année à prix doux.',
      corps: '<div class="prix-barre"><b>39,99 €</b><s>59,99 €</s></div><p class="s" style="margin-top:-8px">la première année, puis 59,99 € par an</p><span class="limite">' + I.cle + 'Valable jusqu’à ' + finOffre() + '</span>',
      cta: ['Profiter de l’offre', 'acheter-offre'], lien: ['Non merci, continuer gratuitement', 'refuser'], lienDoux: true });
  };
  E.bravo = function () {
    var ab = S.abonne;
    return cadre({ id: 'bravo', fond: 'beurre', retour: false, prog: false, centre: true, haut: '<div class="ill">' + pose('fete', 230, false, 'pop') + '</div>',
      titre: ab ? 'C’est parti ;' : 'Bienvenue ;', xl: true,
      sous: ab ? (ab === 'essai' ? 'Ton essai de 7 jours commence. ' : 'Ton abonnement est actif. ') + esc(Lui()) + ' en profite dès qu’' + pr(S.pronomP) + ' te rejoint.' : 'La question du jour est gratuite, tous les jours. Tu pourras passer à l’abonnement quand tu veux.',
      cta: ['Découvrir la question du jour', 'va:question'] });
  };
  E.cadeau = function () {
    return cadre({ id: 'cadeau', fond: 'beurre', retour: false, prog: false, centre: true, haut: '<div class="ill">' + pose('calin', 210, false, 'pop') + '</div>', titre: 'Léa vous offre l’abonnement ;', xl: true,
      sous: 'Son abonnement couvre vos deux comptes. Rien à payer de ton côté.', cta: ['Voir la question du jour', 'va:question'] });
  };
  E.question = function () {
    var part = S.mode === 'partenaire' ? 'Léa' : (S.partenaire || 'Thomas');
    var partRep = S.mode === 'partenaire' || S.partenaireRepondu;
    var rep = 'Quand tu me fais un café sans que je demande, les matins où je suis en retard.';
    var depuisApp = S.pile.length && APP.concat(DETAILS).indexOf(S.pile[S.pile.length - 1]) >= 0;
    // où en est-on ? 1. tu réponds  2. l'autre répond  3. vous découvrez
    var toiFait = S.envoye || S.revele, luiFait = partRep || S.revele;
    var etape = function (fait, cours, av, txt) { return '<li class="' + (fait ? 'fait' : cours ? 'cours' : '') + '"><span class="nd">' + av + (fait ? '<span class="ck">' + I.ok + '</span>' : '') + '</span><span class="l">' + txt + '</span></li>'; };
    var suivi = '<ol class="suivi" aria-label="Étapes">' +
      etape(toiFait, !toiFait, pose('virgule', 30, true), 'Tu réponds') +
      etape(luiFait, toiFait && !luiFait, pose('point', 30, true), esc(part) + ' répond') +
      etape(S.revele, false, signe(18), 'Vous découvrez') + '</ol>';
    // ta réponse
    var toi = '<div class="qlab">' + pose('virgule', 26, true) + '<b>Ta réponse</b>' + (toiFait && !S.revele ? '<span class="meta ok">' + I.ok + 'Envoyée</span>' : '') + '</div>' + (toiFait
      ? '<div class="billet toi' + (A.envoi ? ' glisse' : '') + '"><p>' + esc(S.reponse) + '</p></div>'
      : '<div class="billet toi"><label for="f-rep" class="vh">Ta réponse</label><textarea id="f-rep" maxlength="500" placeholder="Écris ta réponse ici…" data-modele="reponse">' + esc(S.reponse) + '</textarea><span class="cpt" id="cpt">' + (S.reponse || '').length + ' / 500</span></div>' +
        '<p class="q-aide">' + (partRep ? 'Dès que tu envoies, vous découvrez vos deux réponses.' : esc(part) + ' ne pourra la lire qu’après avoir répondu à son tour.') + '</p>');
    // la réponse de l'autre
    var lui = '<div class="qlab">' + pose('point', 26, true) + '<b>La réponse de ' + esc(part) + '</b>' + (S.revele ? '' : partRep ? '<span class="meta">' + I.cad + 'Cachée</span>' : '<span class="meta">Pas encore</span>') + '</div>';
    if (S.revele) lui += '<div class="billet autre' + (A.rev ? ' deplie' : '') + '"><div class="rev-txt"><p>' + esc(rep) + '</p></div></div>' +
      '<div class="reac" role="group" aria-label="Réagir">' + [['coeur', 'J’adore'], ['rire', 'Haha'], ['pareil', 'Moi aussi']].map(function (r) { return '<button type="button" data-act="reagir" data-val="' + r[0] + '" aria-pressed="' + (S.reaction === r[0]) + '">' + r[1] + '</button>'; }).join('') + '</div>';
    else if (partRep) lui += '<div class="billet autre scelle' + (A.arrive ? ' arrive' : '') + '" id="b-autre"><div class="faux" aria-hidden="true"><i></i><i></i><i></i></div><div class="scel">' + cachet(46) + '<span>' + esc(part) + ' a répondu.<br>' + (toiFait ? 'Ouverture…' : 'Réponds pour découvrir sa réponse.') + '</span></div></div>';
    else lui += '<div class="vide">' + pose('attente', 40, true) + '<span>' + esc(part) + ' n’a pas encore répondu. ' + (toiFait ? 'On te prévient dès que c’est fait.' : 'Tu peux répondre ' + acc(S.pronom, 'la première', 'le premier', 'en premier') + '.') + '</span></div>';
    var haut = '<div class="qhead"><span style="display:flex;align-items:center;gap:6px">' + (depuisApp ? '<button class="back" data-act="retour" aria-label="Retour" style="margin-left:-10px">' + I.chev + '</button>' : '') + logo(22) + '</span>' +
      (S.revele ? '<span class="serie' + (A.rev ? ' pop' : '') + '" id="serie">' + signe(16) + '1 jour</span>' : '') + '</div>';
    var corps = haut + '<span class="micro">Question du jour · ' + esc(dateDuJour()) + '</span><h1 class="q" tabindex="-1">' + qTexte() + '</h1>' +
      '<p class="q-regle">Chacun répond de son côté, en secret. Vos deux réponses s’ouvrent en même temps.</p>' + suivi +
      (S.revele ? '<div class="rev-ok">' + pose('revelation', 58, true, A.rev ? 'pop' : '') + '<span><b>C’est ouvert' + '\u00a0;</b>Lisez-vous, puis parlez-en ce soir.</span></div>' : '') +
      '<div class="qsec">' + toi + '</div><div class="qsec">' + lui + '</div>' +
      (S.envoye && !partRep && !S.revele ? '<button class="btn btn-clair" data-act="relancer"' + (S.relance ? ' disabled' : '') + '>' + (S.relance ? 'Petit rappel envoyé' : 'Envoyer un petit rappel à ' + esc(part)) + '</button><button class="proto" data-act="simuler"><em>Prototype</em>Simuler la réponse de ' + esc(part) + '</button>' : '') +
      (S.revele ? (depuisApp ? '<button class="btn btn-p" data-act="onglet-accueil">Retour à l’accueil</button>' : '<button class="btn btn-p" data-act="vers-app">Découvrir l’app</button><button class="lnk doux" data-act="recommencer">Recommencer le parcours</button>') : '');
    return '<div class="scr" data-ecran="question"><div class="sc" style="padding-top:14px">' + corps + '</div>' +
      (toiFait ? '' : '<div class="ft"><button class="btn btn-p" data-act="envoyer" data-cta>Envoyer ma réponse</button></div>') + '</div>';
  };

  /* ================= validation des boutons ================= */
  var VALIDE = {
    email: function () { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(S.email.trim()); },
    code: function () { return S.codeSaisi.replace(/\s/g, '').length === 6; },
    consent: function () { return S.consent; },
    prenom: function () { return S.prenom.trim().length > 0; },
    partenaire: function () { return S.partenaire.trim().length > 0 && !!S.pronomP; },
    depuis: function () { var m = dureeMois(); return m != null && m >= 0; },
    objectifs: function () { return S.objectifs.length > 0; },
    question: function () { return S.reponse.trim().length >= 2; }
  };
  function majCta() {
    var b = $('.scr:last-child [data-cta]', app); if (!b) return;
    var f = VALIDE[S.ecran]; b.disabled = f ? !f() : false;
  }

  /* ================= navigation ================= */
  function suivant(id) {
    var p = parcours(), i = p.indexOf(id || S.ecran), n = p[i + 1];
    if (n === 'email' || n === 'email-envoye') n = 'bienvenue';
    if (n === 'offre') n = 'bravo';
    return n;
  }
  function aller(id, sens) {
    if (!E[id]) return;
    var ancien = app.querySelector('.scr:last-child');
    if (sens !== 'retour' && sens !== 'onglet' && S.ecran && S.ecran !== id) S.pile.push(S.ecran);
    S.ecran = id; S.vus[id] = true; sauver();
    var tmp = document.createElement('div'); tmp.innerHTML = E[id]();
    var neuf = tmp.firstElementChild;
    var animer = !!ancien;
    if (animer) {
      neuf.classList.add(sens === 'retour' ? 'in-l' : (sens === 'fondu' || sens === 'onglet') ? 'in-f' : 'in-r');
      ancien.classList.add(sens === 'retour' ? 'out-r' : sens === 'onglet' ? 'out-f' : 'out-l');
      ancien.style.zIndex = sens === 'retour' ? 2 : 0; neuf.style.zIndex = sens === 'retour' ? 1 : 2;
      setTimeout(function () { if (ancien.parentNode) ancien.parentNode.removeChild(ancien); }, 360);
    }
    fermerOverlays();
    app.appendChild(neuf);
    couleursTelephone(neuf); cascade(neuf); animerProg(neuf);
    if (id === 'bravo' || id === 'cadeau') setTimeout(function () { confettis(70); }, 450);
    if (id === 'avantapres') { basculeTouchee = false; setTimeout(function () { if (S.ecran === 'avantapres' && !basculeTouchee) basculer(true); }, 1600); }
    majCta(); majPanneau();
    var t = neuf.querySelector('.t, .q'); if (t) setTimeout(function () { try { t.focus({ preventScroll: true }); } catch (x) { } }, animer ? 360 : 0);
    if (id === 'analyse') lancerAnalyse();
  }
  var A = {}, lastProg = 0, basculeTouchee = false;
  function basculer(avec) {
    var sc = app.querySelector('.scr:last-child #scene'); if (!sc) return;
    sc.classList.toggle('avec', avec);
    app.querySelectorAll('.scr:last-child .bascule button').forEach(function (b) { b.setAttribute('aria-pressed', (b.getAttribute('data-val') === 'avec') === avec); });
    app.querySelector('.scr:last-child .bascule').classList.toggle('avec', avec);
    anime(sc.querySelector(avec ? '.sc-avec .pv' : '.sc-sans .pv'), 'hop');
  }
  function couleursTelephone(n) { phone.setAttribute('data-haut', n.getAttribute('data-haut') || ''); phone.setAttribute('data-bas', n.getAttribute('data-bas') || ''); }
  function cascade(n) {
    n.classList.add('cascade');
    var i = 0;
    n.querySelectorAll('.sc > *:not(.opts):not(.mini-q):not(.cmp), .opts > *, .cmp > *, .ft > *').forEach(function (el) { el.style.setProperty('--i', i++); });
    setTimeout(function () { n.classList.remove('cascade'); }, 1700);
  }
  function animerProg(n) {
    var b = n.querySelector('.prog i'); if (!b) return;
    var cible = +b.getAttribute('data-w');
    b.style.width = lastProg + '%';
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      b.style.width = cible + '%';
      if (cible > lastProg) { b.parentNode.classList.add('bond'); setTimeout(function () { b.parentNode.classList.remove('bond'); }, 600); }
      lastProg = cible;
    }); });
  }
  function anime(el, cls) { if (!el) return; el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); setTimeout(function () { el.classList.remove(cls); }, 600); }
  function compagnon(cls) { anime(app.querySelector('.scr:last-child .compagnon .pv'), cls); }
  var dernierHoche = 0;
  function confettis(n) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var W = phone.offsetWidth, H = phone.offsetHeight, cols = ['var(--rouge)', 'var(--bleu)', 'var(--beurre)', 'var(--rouge)', 'var(--beurre)', 'var(--bleu)'];
    for (var i = 0; i < n; i++) {
      var d = document.createElement('i'); d.className = 'confetti';
      var w = 6 + Math.random() * 6, rond = Math.random() < .3, h = rond ? w : w * 1.8;
      d.style.width = w + 'px'; d.style.height = h + 'px'; d.style.background = cols[i % cols.length]; if (rond) d.style.borderRadius = '50%';
      phone.appendChild(d);
      var x0 = W / 2 + (Math.random() - .5) * 60, y0 = H * .36, ang = Math.random() * Math.PI * 2, v = 110 + Math.random() * 210;
      var x1 = x0 + Math.cos(ang) * v, y1 = y0 + Math.sin(ang) * v - 130, x2 = x1 + (Math.random() - .5) * 90, y2 = H + 40, rot = (Math.random() - .5) * 1080;
      var an = d.animate([{ transform: 'translate(' + x0 + 'px,' + y0 + 'px) rotate(0deg)', opacity: 1 }, { transform: 'translate(' + x1 + 'px,' + y1 + 'px) rotate(' + (rot / 2) + 'deg)', opacity: 1, offset: .32 }, { transform: 'translate(' + x2 + 'px,' + y2 + 'px) rotate(' + rot + 'deg)', opacity: .85 }], { duration: 1900 + Math.random() * 900, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'forwards' });
      an.onfinish = (function (el) { return function () { el.remove(); }; })(d);
    }
  }
  function retour() { var p = S.pile.pop(); if (p) aller(p, 'retour'); }
  function rafraichir() { // re-rend l'écran courant sans animation (après un choix qui change l'affichage)
    var ancien = app.querySelector('.scr:last-child');
    var tmp = document.createElement('div'); tmp.innerHTML = E[S.ecran]();
    var neuf = tmp.firstElementChild;
    var sc = ancien && ancien.querySelector('.sc'), y = sc ? sc.scrollTop : 0;
    if (ancien) app.replaceChild(neuf, ancien); else app.appendChild(neuf);
    couleursTelephone(neuf);
    var sc2 = neuf.querySelector('.sc'); if (sc2) sc2.scrollTop = y;
    majCta(); majPanneau();
  }

  /* ================= overlays ================= */
  var phone = $('.phone');
  function fermerOverlays() { phone.querySelectorAll('.voile, .sheet, .alerte, .feuille').forEach(function (n) { n.remove(); }); }
  function overlay(html, cls) {
    fermerOverlays();
    var v = document.createElement('div'); v.className = 'voile'; phone.appendChild(v);
    var d = document.createElement('div'); d.className = cls; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.innerHTML = html; phone.appendChild(d);
    var f = d.querySelector('button:not(.x)') || d.querySelector('button'); if (f) setTimeout(function () { f.focus(); }, 50);
    return d;
  }
  function toast(t, ms) {
    phone.querySelectorAll('.toast').forEach(function (n) { n.remove(); });
    var d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = t; phone.appendChild(d);
    setTimeout(function () { d.remove(); }, ms || 2600);
  }
  function banniere(txt) {
    var d = document.createElement('div'); d.className = 'banniere'; d.setAttribute('role', 'status');
    d.innerHTML = '<div class="nt"><span class="ic">' + signe(22, true) + '</span><div><b>Entre nous <em>maintenant</em></b><p>' + esc(txt) + '</p></div></div>';
    phone.appendChild(d);
    setTimeout(function () { d.classList.add('part'); setTimeout(function () { d.remove(); }, 400); }, 2600);
  }
  function feuilleApple() {
    overlay('<div class="sh-h"><b>Se connecter avec Apple</b><button class="x" data-act="fermer-ov" aria-label="Fermer">' + I.x + '</button></div>' +
      '<div class="appl"><span class="ic">' + signe(34, true) + '</span><div><b>Entre nous</b><small>Crée un compte avec ton identifiant Apple</small></div></div>' +
      '<div class="row"><b>Partager mon adresse email</b><small>L’app la reçoit telle quelle</small></div><div class="row"><b>Masquer mon adresse email</b><small>Apple crée une adresse relais</small></div>' +
      '<button class="sys-btn noir" data-act="connecte">Continuer</button>', 'sheet');
  }
  function feuilleGoogle() {
    overlay('<div class="sh-h"><b>Choisir un compte</b><button class="x" data-act="fermer-ov" aria-label="Fermer">' + I.x + '</button></div><div class="row"><b>Ton compte Google</b><small>pour continuer vers Entre nous</small></div><button class="sys-btn" data-act="connecte">Continuer</button>', 'sheet');
  }
  function alerteNotifs() {
    overlay('<div><b>« Entre nous » souhaite vous envoyer des notifications</b><p>Les notifications peuvent inclure des alertes, des sons et des pastilles.</p></div><div class="acts"><button data-act="notif-refus">Refuser</button><button data-act="notif-ok">Autoriser</button></div>', 'alerte');
  }
  function feuilleAchat(offre) {
    var an = S.plan === 'an' || offre, essai = !offre && an && S.essai;
    var ligne = offre ? '39,99 € la première année, puis 59,99 € par an' : essai ? 'Essai gratuit d’une semaine, puis 59,99 € par an' : an ? '59,99 € par an' : '14,99 € par mois';
    overlay('<div class="sh-h"><b>App Store</b><button class="x" data-act="fermer-ov" aria-label="Annuler">' + I.x + '</button></div>' +
      '<div class="appl"><span class="ic">' + signe(34, true) + '</span><div><b>Entre nous Premium</b><small>Abonnement · pour vous deux</small></div></div>' +
      '<div class="row"><b>' + ligne + '</b><small>Renouvellement automatique, annulable dans les Réglages</small></div>' +
      '<div class="fid" id="fid" hidden><span class="ring"></span><span>Face ID</span></div>' +
      '<button class="sys-btn" data-act="payer" data-offre="' + (offre ? 1 : 0) + '">Confirmer avec Face ID</button>', 'sheet');
  }

  /* ================= analyse animée ================= */
  var timers = [];
  function lancerAnalyse() {
    timers.forEach(clearTimeout); timers = [];
    var lis = app.querySelectorAll('#etapes li'), cta = app.querySelector('.scr:last-child [data-cta]');
    if (cta) cta.hidden = true;
    lis.forEach(function (li, i) {
      timers.push(setTimeout(function () { li.classList.add('on'); }, 300 + i * 1000));
      timers.push(setTimeout(function () { li.classList.add('ok'); }, 1100 + i * 1000));
    });
    timers.push(setTimeout(function () {
      var scr = app.querySelector('[data-ecran="analyse"]'); if (!scr) return;
      scr.querySelector('#an-ill').innerHTML = pose('fete', 160, false, 'pop');
      scr.querySelector('.t').textContent = 'Vos 14 premières questions sont prêtes ;';
      scr.querySelector('#etapes').hidden = true;
      var m = scr.querySelector('#mini-q');
      m.innerHTML = troisQuestions().map(function (q, i) { return '<div class="billet donne ' + (i % 2 ? 'autre' : 'toi') + '" style="--d:' + (i * .18) + 's;text-align:left"><span class="mic">Jour ' + (i + 1) + '</span><p style="font-family:var(--font-display);font-weight:400;font-size:18px;line-height:23px">' + esc(q) + '</p></div>'; }).join('');
      m.hidden = false;
      if (cta) cta.hidden = false;
    }, 3500));
  }

  /* ================= actions ================= */
  var ACT = {
    retour: retour,
    'va-suite': function () { var n = suivant(); if (n) aller(n); },
    apple: feuilleApple, google: feuilleGoogle,
    'fermer-ov': fermerOverlays,
    connecte: function () { fermerOverlays(); chargement('Connexion…', 1100, function () { aller('bienvenue'); }); },
    'va-email': function () { aller('email'); },
    'email-ok': function () { aller('email-envoye'); },
    renvoyer: function () { toast('Nouveau lien envoyé à ' + S.email); },
    'mode-principal': function () { S.mode = 'principal'; sauver(); rafraichir(); },
    'mode-partenaire': function () { S.mode = 'partenaire'; S.partenaire = ''; S.pronomP = ''; sauver(); aller('code'); },
    'code-ok': function () {
      var c = S.codeSaisi.toUpperCase().replace(/\s/g, ''), b = app.querySelector('.scr:last-child [data-cta]');
      b.disabled = true; b.textContent = 'Vérification…';
      setTimeout(function () {
        if (/^[A-Z0-9]{6}$/.test(c)) { S.partenaire = 'Léa'; S.pronomP = 'elle'; sauver(); aller('rejoindre'); }
        else { b.disabled = false; b.textContent = 'Valider'; var er = app.querySelector('#code-err'); if (er) er.hidden = false; }
      }, 700);
    },
    consent: function (el) { S.consent = !S.consent; sauver(); el.setAttribute('aria-checked', S.consent); majCta(); },
    choix: function (el) {
      var g = el.getAttribute('data-groupe'), v = el.getAttribute('data-val');
      if (g === 'objectifs') {
        var i = S.objectifs.indexOf(v); if (i >= 0) S.objectifs.splice(i, 1); else S.objectifs.push(v);
        el.setAttribute('aria-checked', i < 0); sauver(); majCta(); compagnon('hop'); return;
      }
      S[g] = v; sauver();
      if (g === 'pronomP') { rafraichir(); compagnon('hop'); return; }
      compagnon('hop');
      el.parentNode.querySelectorAll('[aria-checked]').forEach(function (b) { b.setAttribute('aria-checked', b === el); });
      if (g === 'cohab' && v === 'distance' && S.objectifs.indexOf('distance') < 0) S.objectifs.push('distance');
      if (g === 'situation' && (v === 'pacs' || v === 'maries')) { rafraichir(); return; }
      if (g === 'source' && v === 'createur') { rafraichir(); return; }
      setTimeout(function () { var n = suivant(); if (n) aller(n); }, 260);
    },
    inviter: function () {
      var c = codeInvit(), txt = moi() + ' t’invite sur Entre nous ; une question par jour, rien que pour vous deux. Télécharge l’app et rejoins-moi avec le code ' + c + '.';
      var fini = function (ok) { S.invite = true; sauver(); rafraichir(); toast(ok ? 'Invitation copiée. Colle-la dans WhatsApp ou Messages.' : 'Copie impossible ici. Ton code : ' + c); };
      try { navigator.clipboard.writeText(txt).then(function () { fini(true); }, function () { fini(false); }); } catch (x) { fini(false); }
    },
    'copier-code': function () {
      var c = codeInvit();
      try { navigator.clipboard.writeText(c).then(function () { toast('Code copié : ' + c); }, function () { toast('Ton code : ' + c); }); } catch (x) { toast('Ton code : ' + c); }
    },
    'notifs-oui': alerteNotifs,
    'notif-ok': function () { S.notifs = true; sauver(); fermerOverlays(); ACT['va-suite'](); },
    'notif-refus': function () { S.notifs = false; sauver(); fermerOverlays(); ACT['va-suite'](); },
    'notifs-non': function () { S.notifs = false; sauver(); ACT['va-suite'](); },
    essai: function (el) { if (S.plan !== 'an') return; S.essai = !S.essai; sauver(); rafraichir(); },
    plan: function (el) { S.plan = el.getAttribute('data-val'); if (S.plan !== 'an') S.essai = false; else S.essai = true; sauver(); rafraichir(); },
    acheter: function () { feuilleAchat(false); },
    'acheter-offre': function () { feuilleAchat(true); },
    payer: function (el) {
      var offre = el.getAttribute('data-offre') === '1', fid = phone.querySelector('#fid');
      el.disabled = true; fid.hidden = false;
      setTimeout(function () { fid.innerHTML = '<span class="ok">' + I.okb + '</span><span>Terminé</span>'; }, 1200);
      setTimeout(function () { S.abonne = offre ? 'offre' : (S.plan === 'an' && S.essai ? 'essai' : 'abonne'); sauver(); fermerOverlays(); if (S.retourApp) { S.retourApp = false; var dp = S.pile.pop(); chargement('On débloque tout, pour vous deux…', 1300, function () { aller(dp || 'app-aujourdhui', dp ? 'retour' : 'onglet'); setTimeout(function () { confettis(60); toast('C’est débloqué, pour vous deux' + '\u00a0;', 2000); }, 380); }); } else aller('bravo', 'fondu'); }, 2000);
    },
    'pw-fermer': function () { if (S.retourApp) { S.retourApp = false; sauver(); retour(); return; } if (!S.offreVue) { S.offreVue = true; sauver(); aller('offre', 'fondu'); } else { S.abonne = null; sauver(); aller('bravo', 'fondu'); } },
    refuser: function () { S.abonne = null; sauver(); aller('bravo', 'fondu'); },
    envoyer: function () {
      if (S.reponse.trim().length < 2) return;
      S.envoye = true; sauver();
      A.envoi = true; rafraichir(); A.envoi = false;
      if (S.mode === 'partenaire' || S.partenaireRepondu) setTimeout(ouvrir, 1200);
    },
    simuler: function () {
      var part = S.partenaire || 'Thomas';
      banniere(part + ' a glissé sa réponse. Elle reste scellée jusqu’à la tienne.');
      S.partenaireRepondu = true; sauver(); A.arrive = true; rafraichir(); A.arrive = false;
      setTimeout(ouvrir, 1900);
    },
    recommencer: function () { reset(S.mode); },
    relancer: function () { S.relance = true; sauver(); rafraichir(); toast('Petit rappel envoyé à ' + (S.partenaire || 'Thomas') + '\u00a0;', 2000); },
    reagir: function (el) { S.reaction = el.getAttribute('data-val'); sauver(); rafraichir(); var b = app.querySelector('.scr:last-child .reac [aria-pressed="true"]'); anime(b, 'hop'); toast('Ta réaction est envoyée à ' + (S.mode === 'partenaire' ? 'Léa' : (S.partenaire || 'Thomas')) + '.', 1800); },
    bascule: function (el) { basculeTouchee = true; basculer(el.getAttribute('data-val') === 'avec'); },
    'va': null
  };
  function ouvrir() {
    var c = app.querySelector('#b-autre .cachet-anim'); if (c) c.classList.add('casse');
    setTimeout(function () {
      S.revele = true; sauver(); A.rev = true; rafraichir(); A.rev = false;
      setTimeout(function () { confettis(80); }, 250);
    }, 720);
  }
  function reset(mode) { timers.forEach(clearTimeout); S = etatInitial(mode); sauver(); app.innerHTML = ''; fermerOverlays(); aller(mode === 'partenaire' ? 'accueil' : 'accueil'); }

  app.addEventListener('click', clic); phone.addEventListener('click', function (ev) { if (!app.contains(ev.target)) clic(ev); });
  function clic(ev) {
    var el = ev.target.closest('[data-act]'); if (!el || el.disabled) return;
    var a = el.getAttribute('data-act');
    if (a.indexOf('va:') === 0) { aller(a.slice(3)); return; }
    if (ACT[a]) ACT[a](el);
  }
  app.addEventListener('input', function (ev) {
    var k = ev.target.getAttribute('data-modele'); if (!k) return;
    S[k] = ev.target.value; sauver();
    if (k === 'codeSaisi') { ev.target.value = ev.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6); S.codeSaisi = ev.target.value; var er = app.querySelector('#code-err'); if (er) er.hidden = true; }
    if (k === 'recherche') filtrerExplorer();
    if (k === 'reponse') { var c = app.querySelector('#cpt'); if (c) c.textContent = S.reponse.length + ' / 500'; }
    if (Date.now() - dernierHoche > 650) { dernierHoche = Date.now(); compagnon('hoche'); }
    if (k === 'partenaire') { var l = app.querySelector('.champ .lab'); if (l) l.textContent = 'Pour parler de ' + (S.partenaire || 'cette personne') + ', on dit…'; }
    majCta();
  });
  app.addEventListener('change', function (ev) {
    var k = ev.target.getAttribute('data-modele'); if (!k) return;
    S[k] = ev.target.value; sauver();
    if (k === 'depuisM' || k === 'depuisA') { var d = app.querySelector('#duree'); if (d) d.textContent = dureeTexte(); }
    majCta();
  });
  app.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' && ev.target.tagName === 'INPUT') { var b = app.querySelector('.scr:last-child [data-cta]'); if (b && !b.disabled) { ev.preventDefault(); b.click(); } }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fermerOverlays(); });

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

  /* ================= panneau (bureau) ================= */
  var panneau = $('#panel');
  function majPanneau() {
    if (!panneau) return;
    $('#why-t', panneau).textContent = NOMS[S.ecran] || '';
    $('#why-p', panneau).textContent = POURQUOI[S.ecran] || '';
    var p = parcours(), html = '', ph = '';
    p.forEach(function (id) {
      if (PHASES[id] !== ph) { ph = PHASES[id]; html += '<li class="ph">' + ph + '</li>'; }
      html += '<li><button class="' + (S.vus[id] ? 'vu' : '') + '" data-saut="' + id + '"' + (id === S.ecran ? ' aria-current="step"' : '') + '><i></i>' + NOMS[id] + '</button></li>';
    });
    $('#steps', panneau).innerHTML = html;
    panneau.querySelectorAll('[data-mode]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-mode') === S.mode); });
    panneau.querySelectorAll('[data-version]').forEach(function (b) { b.setAttribute('aria-pressed', String((b.getAttribute('data-version') === 'premium') === !!S.abonne)); });
  }
  if (panneau) panneau.addEventListener('click', function (ev) {
    var s = ev.target.closest('[data-saut]');
    if (s) { var id = s.getAttribute('data-saut'); remplirDemo(id); aller(id, 'fondu'); return; }
    var m = ev.target.closest('[data-mode]'); if (m) { reset(m.getAttribute('data-mode')); return; }
    var v = ev.target.closest('[data-version]'); if (v) { version(v.getAttribute('data-version')); return; }
    if (ev.target.closest('#recommencer')) reset(S.mode);
    if (ev.target.closest('#theme')) { var r = document.documentElement, sombre = r.getAttribute('data-theme') === 'dark' || (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches); r.setAttribute('data-theme', sombre ? 'light' : 'dark'); }
  });
  // bascule le prototype en version gratuite ou Premium, et ouvre l'app si on n'y est pas encore
  function version(v) {
    remplirDemo('app-aujourdhui');
    if (v === 'premium') { S.abonne = 'abonne'; if (!S.envoye) { S.reponse = S.reponse || 'Quand tu chantes faux sous la douche.'; S.envoye = true; S.partenaireRepondu = true; S.revele = true; } }
    else S.abonne = null;
    S.retourApp = false; sauver();
    if (APP.concat(DETAILS).indexOf(S.ecran) < 0) { S.pile = []; aller('app-aujourdhui', 'fondu'); } else { rafraichir(); majPanneau(); }
    toast(v === 'premium' ? 'Version Premium : tout est débloqué, pour vous deux.' : 'Version gratuite : la question du jour, Souvenirs et Pour rire.', 2400);
  }
  function remplirDemo(id) { // un saut direct dans le parcours a besoin de valeurs plausibles
    if (!S.prenom) S.prenom = S.mode === 'partenaire' ? 'Thomas' : 'Léa';
    if (!S.pronom) S.pronom = S.mode === 'partenaire' ? 'il' : 'elle';
    if (!S.partenaire) S.partenaire = S.mode === 'partenaire' ? 'Léa' : 'Thomas';
    if (!S.pronomP) S.pronomP = S.mode === 'partenaire' ? 'elle' : 'il';
    if (!S.email) S.email = 'lea@exemple.fr';
    if (!S.depuisA) { S.depuisA = String(new Date().getFullYear() - 6); S.depuisM = '8'; }
    if (!S.objectifs.length) S.objectifs = ['complicite', 'rire'];
    S.consent = true; sauver();
  }

  /* ================= mise à l'échelle du téléphone ================= */
  var dev = $('.device');
  function echelle() {
    if (innerWidth <= 520) { dev.style.transform = ''; return; }
    var s = Math.min(1, (innerHeight - 40) / 868, (innerWidth - 32) / 414);
    dev.style.transform = s < 1 ? 'scale(' + s.toFixed(3) + ')' : '';
    dev.style.margin = s < 1 ? ((844 * (s - 1)) / 2) + 'px ' + ((390 * (s - 1)) / 2) + 'px' : '';
  }
  addEventListener('resize', echelle); echelle();
  if (location.hash === '#premium' || location.hash === '#gratuit') setTimeout(function () { version(location.hash.slice(1)); }, 300);

  aller(E[S.ecran] ? S.ecran : 'accueil', 'fondu');
})();
