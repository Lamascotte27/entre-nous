const fs = require('fs'), path = require('path');
const opentype = require('opentype.js');
const P = require('./pv-anim.js');
const font = opentype.loadSync(process.argv[2]);
const p0 = font.getPath('?', 0, 0, 100), bb = p0.getBoundingBox();
const glyphe = (ch) => { const b = font.getPath(ch, 0, 0, 100).getBoundingBox(); return { d: font.getPath(ch, -b.x1, -b.y1, 100).toPathData(2), w: b.x2 - b.x1, h: b.y2 - b.y1 }; };
P.setGlyphs({ d: font.getPath('?', -bb.x1, -bb.y1, 100).toPathData(2), w: bb.x2 - bb.x1, h: bb.y2 - bb.y1 }, { '!': glyphe('!'), '€': glyphe('€') });
fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'pv-anim.json'), JSON.stringify(P.poses()));
console.log('ok');
