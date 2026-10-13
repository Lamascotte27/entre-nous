const fs = require('fs'), path = require('path');
const D = path.resolve(__dirname);
const css = fs.readFileSync(path.join(D, 'onb.css'), 'utf8') + '\n' + fs.readFileSync(path.join(D, 'onb-anim.css'), 'utf8') + '\n' + fs.readFileSync(path.join(D, 'onb-app.css'), 'utf8');
const js = fs.readFileSync(path.join(D, 'onb.js'), 'utf8');
const pvData = JSON.parse(fs.readFileSync(path.join(D, '..', 'src', 'pv-data.json'), 'utf8'));
pvData.poses = JSON.parse(fs.readFileSync(path.join(D, '..', 'src', 'pv-anim.json'), 'utf8'));
const pv = JSON.stringify(pvData);
const sig = '<svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg>';
const wifi = '<svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.5l2.2-2.6a3.3 3.3 0 0 0-4.4 0zM3.4 6.9a6.8 6.8 0 0 1 9.2 0l1.6-1.9a9.3 9.3 0 0 0-12.4 0zM.2 3.6a11.4 11.4 0 0 1 15.6 0L16 3.4A12.9 12.9 0 0 0 0 3.4z" fill="currentColor"/></svg>';
const bat = '<svg width="27" height="13" viewBox="0 0 27 13" aria-hidden="true"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.5-1 1.5-2s-.7-1.7-1.5-2z" fill="currentColor" opacity=".45"/></svg>';
const html = `<title>Onboarding Entre nous</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:ital,wght@0,400..800;1,400..800&display=swap">
<style>
${css}
</style>
<div class="stage">
  <div class="device">
    <div class="phone">
      <div class="sbar"><span>9:41</span><span style="display:flex;gap:6px;align-items:center">${sig}${wifi}${bat}</span></div>
      <div class="app" id="app"></div>
      <div class="homebar"></div>
    </div>
  </div>
  <aside class="panel" id="panel" aria-label="Plan du parcours">
    <div class="panel-h"><span class="k">Prototype · onboarding</span><h1>Entre nous</h1><p>Utilise le téléphone comme la vraie app : tout est cliquable. Le plan permet de sauter à n’importe quel écran.</p></div>
    <div class="tabs" role="group" aria-label="Parcours"><button data-mode="principal" aria-pressed="true">Parcours principal</button><button data-mode="partenaire" aria-pressed="false">Partenaire invité</button></div>
    <div class="version"><span class="k">Version de l’app</span><div class="tabs" role="group" aria-label="Version de l’app"><button data-version="gratuit" aria-pressed="true">Gratuite</button><button data-version="premium" aria-pressed="false">Premium</button></div></div>
    <div class="why"><b id="why-t"></b><p id="why-p"></p></div>
    <ol class="steps" id="steps"></ol>
    <div class="panel-f"><button class="pbtn" id="recommencer" type="button">Recommencer</button><button class="pbtn" id="theme" type="button">Jour / Nuit</button></div>
  </aside>
</div>
<script>window.PV = ${pv};</script>
<script>
${js}
</script>
`;
fs.writeFileSync(path.join(D, 'onboarding.html'), html);
fs.writeFileSync(path.join(D, 'preview.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' + html);
// version autonome du prototype, celle du dépôt
fs.writeFileSync(path.join(D, '..', '..', 'prototype', 'index.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' + html);
console.log('ok', html.length);
