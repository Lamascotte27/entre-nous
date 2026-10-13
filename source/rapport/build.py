import json, re, sys, os
D = os.path.dirname(os.path.abspath(__file__))
r = lambda f: open(os.path.join(D, f), encoding="utf-8").read()
sys.path.insert(0, D)
from content import C, DATA_JS

body = r("body.html").replace("[[LOOP_SVG]]", r("loop.svg"))
for k, v in C.items():
    body = body.replace("[[" + k + "]]", v)
left = re.findall(r"\[\[[A-Z_]+\]\]", body)
if left:
    print("placeholders restants:", left)

head = """<title>Paired, version française</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Schibsted+Grotesk:ital,wght@0,400..800;1,400..800&display=swap">
<style>
""" + r("style.css") + "\n</style>\n"

scripts = "<script>\n" + DATA_JS + "\n" + r("onboarding.js") + "\n" + r("model.js").replace("if (typeof module !== 'undefined') module.exports = simulate;", "window.simulate = simulate;") + "\n" + r("app.js") + "\n</script>\n"
out = head + body + scripts
open(os.path.join(D, "paired-france.html"), "w", encoding="utf-8").write(out)
print("ok", len(out))
open(os.path.join(D, "preview.html"), "w", encoding="utf-8").write('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' + out)
