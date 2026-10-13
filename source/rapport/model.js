// Modèle de cohortes mensuel : acquisition payante + organique -> essais -> abonnés
// Les prix sont TTC (App Store France). Net = TTC / 1,2 (TVA) x (1 - commission store).
function simulate(p, months) {
  months = months || 36;
  var TVA = 1.2, store = p.store != null ? p.store : 0.15;
  var rows = [];
  var yearlyCohorts = []; // nouveaux annuels par mois
  var monthlyCohorts = []; // nouveaux mensuels par mois
  var cash = 0, payback = null, couplesTotal = 0;
  for (var t = 0; t < months; t++) {
    var grow = Math.min(t, p.growMonths != null ? p.growMonths : 24);
    var budget = p.budget * Math.pow(1 + p.growth, grow);
    // le CPI monte quand on dépense plus (audiences moins qualifiées)
    var cpi = p.cpi * Math.pow(budget / p.budget, 0.15);
    var paidInstalls = budget / cpi;
    var installs = paidInstalls * (1 + p.organic);
    couplesTotal += installs;
    var payers = installs * p.trial * p.conv;
    var newY = payers * p.mixY, newM = payers * (1 - p.mixY);
    yearlyCohorts.push(newY); monthlyCohorts.push(newM);

    var grossNewY = newY * p.priceY;
    var grossNewM = newM * p.priceM;
    // renouvellements annuels : à t-12 (taux r), à t-24 (r x r2)
    var renY = 0, activeY = 0;
    for (var k = 0; k <= t; k++) {
      var age = t - k, c = yearlyCohorts[k];
      var r1 = p.renewY, r2 = Math.min(0.9, p.renewY + 0.2);
      var surv = age < 12 ? 1 : age < 24 ? r1 : r1 * r2;
      activeY += c * surv;
      if (age === 12) renY += c * r1 * p.priceY;
      if (age === 24) renY += c * r1 * r2 * p.priceY;
    }
    // mensuels : survie géométrique, le 1er paiement compte comme nouveau
    var renM = 0, activeM = 0;
    for (var j = 0; j <= t; j++) {
      var a = t - j, s = monthlyCohorts[j] * Math.pow(1 - p.churnM, a);
      activeM += s;
      if (a > 0) renM += s * p.priceM;
    }
    var grossNew = grossNewY + grossNewM, grossRen = renY + renM;
    var gross = grossNew + grossRen;
    var net = gross / TVA * (1 - store);
    var fixed = p.fixed || 0;
    var profit = net - budget - fixed;
    cash += profit;
    if (payback === null && cash > 0 && t > 0) payback = t + 1;
    // ARR "run-rate" : valeur annualisée des abonnés actifs, TTC
    var arr = activeY * p.priceY + activeM * p.priceM * 12;
    rows.push({ m: t + 1, budget: budget, cpi: cpi, installs: installs, partner: installs * p.invite,
      payers: payers, grossNew: grossNew, grossRen: grossRen, gross: gross, net: net,
      netNew: grossNew / TVA * (1 - store), netRen: grossRen / TVA * (1 - store),
      profit: profit, cash: cash, activeY: activeY, activeM: activeM, active: activeY + activeM, arr: arr });
  }
  return { rows: rows, payback: payback, couplesTotal: couplesTotal };
}
if (typeof module !== 'undefined') module.exports = simulate;
