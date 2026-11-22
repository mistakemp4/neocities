#!/usr/bin/env python3
"""Draw quiz result badges with headless brave: card (200x280), userbox (238x45), button (88x31).

data is a json list of results: id, name, color, tag, plus hp & moves [[name, dmg], ...] for cards.
photos are <photos>/<id>.jpg. images come out at 2x, embed them at the size above.
uses ~/.local/bin/cdp_client.py and google fonts, so it needs the network.
usage: quiz_badges.py card|userbox|button data.json photos/ outdir/ "which seal are you?"
"""
import base64
import html
import json
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

sys.path.insert(0, str(Path.home() / '.local/bin'))
from cdp_client import CDP, get_ws_url  # noqa: E402

PORT = 9444
SIZE = {'card': (200, 280), 'userbox': (238, 45), 'button': (88, 31)}
FAMILY = {'card': 'Rubik', 'button': 'Silkscreen'}
FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
         'family=Rubik:ital,wght@0,400;0,600;0,700;1,400&family=Silkscreen&display=swap">')

CSS = '''
body{margin:0;background:transparent}
.card{width:200px;height:280px;box-sizing:border-box;border:8px solid #f2d14b;border-radius:10px;background:linear-gradient(var(--c),#fff 70%);padding:6px 8px;font-family:Rubik,sans-serif;color:#1c1c1c;display:flex;flex-direction:column;gap:4px}
.card .top{display:flex;justify-content:space-between;align-items:baseline}
.card .nm{font-weight:700;font-size:15px;white-space:nowrap}
.card .hp{font-weight:700;color:#c0141b;font-size:15px}.card .hp small{font-size:8px;margin-right:1px}
.card .pic{height:104px;border:3px solid #c9a537;box-shadow:inset 0 0 0 1px #8a6d1d;overflow:hidden;background:#ddd}
.card img,.userbox img,.button img{display:block;width:100%;height:100%;object-fit:cover}
.card .kind{font-size:8px;text-align:center;background:#e8d68c;font-style:italic;padding:1px}
.card .mv{display:flex;justify-content:space-between;font-size:12px;font-weight:600;border-bottom:1px solid #0002;padding:3px 0}
.card .mv b{font-size:14px}
.card .bot{display:flex;justify-content:space-between;font-size:8px;margin-top:auto}
.card .flav{font-size:8px;font-style:italic;text-align:right;color:#444}
.userbox{width:238px;height:45px;box-sizing:border-box;display:flex;border:1px solid var(--c);font:11px/1.25 Arial,sans-serif;color:#000}
.userbox .pic{width:45px;height:43px;flex:none;background:var(--c)}
.userbox .txt{padding:0 6px;display:flex;align-items:center;flex:1;background:color-mix(in srgb,var(--c) 18%,white)}
.button{width:88px;height:31px;box-sizing:border-box;display:flex;align-items:center;gap:3px;background:#111;border:1px solid var(--c);overflow:hidden;font:8px/1 Silkscreen,monospace;color:#fff}
.button .pic{width:29px;height:29px;flex:none}
.button .txt{display:flex;flex-direction:column;gap:2px;white-space:nowrap}.button span{color:var(--c);font-size:7px}
'''


def card(r, photo, title):
    e = html.escape
    moves = ''.join(f'<div class="mv"><span>{e(n)}</span><b>{d}</b></div>' for n, d in r['moves'])
    return f'''<div class="card" style="--c:{r['color']}">
  <div class="top"><span class="nm">{e(r['name'])}</span><span class="hp"><small>HP</small>{r['hp']}</span></div>
  <div class="pic"><img src="{photo}" alt=""></div>
  <div class="kind">{e(r['tag'])}</div>{moves}
  <div class="bot"><span>weakness: {e(r.get('weakness', 'cement'))}</span><span>retreat: {e(r.get('retreat', 'jump'))}</span></div>
  <div class="flav">{e(title)}</div></div>'''


def userbox(r, photo, title):
    e = html.escape
    return f'''<div class="userbox" style="--c:{r['color']}"><div class="pic"><img src="{photo}" alt=""></div>
  <div class="txt"><span>This user is <b>{e(r['name'])}</b>: {e(r['tag'])}</span></div></div>'''


def button(r, photo, title):
    word = html.escape(r.get('short', r['name'].split(' ')[0]).upper())
    return f'''<div class="button" style="--c:{r['color']}"><div class="pic"><img src="{photo}" alt=""></div>
  <div class="txt"><span>I GOT</span>{word}</div></div>'''


def main():
    style, data, photos, out, title = sys.argv[1:6]
    draw = {'card': card, 'userbox': userbox, 'button': button}[style]
    w, h = SIZE[style]
    results = json.loads(Path(data).read_text())
    photos, out = Path(photos).resolve(), Path(out)
    out.mkdir(parents=True, exist_ok=True)

    profile = tempfile.mkdtemp(prefix='quiz-badges-')
    brave = subprocess.Popen([shutil.which('brave'), '--headless=new', f'--user-data-dir={profile}',
                              f'--remote-debugging-port={PORT}', '--hide-scrollbars', '--allow-file-access-from-files',
                              'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(50):
            try:
                c = CDP(get_ws_url(PORT))
                break
            except OSError:
                time.sleep(0.2)
        else:
            raise SystemExit('brave did not start')
        c.call('Emulation.setDeviceMetricsOverride', {'width': w, 'height': h, 'deviceScaleFactor': 2, 'mobile': False})
        c.call('Emulation.setDefaultBackgroundColorOverride', {'color': {'r': 0, 'g': 0, 'b': 0, 'a': 0}})
        page = Path(profile) / 'badge.html'
        for r in results:
            body = draw(r, (photos / f"{r['id']}.jpg").as_uri(), title)
            page.write_text(f'<!doctype html><meta charset="utf-8">{FONTS}<style>{CSS}</style>{body}')
            c.call('Page.navigate', {'url': page.as_uri()})
            # wait for the web fonts, the first page loads them
            for _ in range(50):
                time.sleep(0.2)
                if style not in FAMILY or c.evaluate(
                        "document.fonts.status === 'loaded' && [...document.fonts].some("
                        f"f => f.family.replaceAll('\"', '') === '{FAMILY[style]}' && f.status === 'loaded')"):
                    break
            time.sleep(0.3)
            shot = c.call('Page.captureScreenshot', {'format': 'png', 'clip': {'x': 0, 'y': 0, 'width': w, 'height': h, 'scale': 1}})
            target = out / f"{r['id']}.png"
            target.write_bytes(base64.b64decode(shot['result']['data']))
            print(target)
        c.close()
    finally:
        brave.terminate()
        brave.wait()
        shutil.rmtree(profile, ignore_errors=True)


main()
