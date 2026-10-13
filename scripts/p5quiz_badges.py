#!/usr/bin/env python3
"""Draw the p5 quiz result badges (300x120) into public/quiz/p5/. Needs ImageMagick.

Faces come from the user's own P5R files (not in this repo), unpacked to FACES:
BUSTUP/B0xx_000_01.BIN (dialogue portraits) and BATTLE/CUTIN/BCT_P_BC00xx.DDS.
usage: p5quiz_badges.py [cutin|portrait] [outdir]
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'src/assets/fonts'
MENU = str(FONTS / 'Persona5MenuFontPrototype-Regular.ttf')
HATTY = str(FONTS / 'p5hatty-1.ttf')
FACES = Path.home() / '.local/share/p5-game-assets/quiz/png'

# the game's own character numbers. joker has no dialogue portrait.
NUMBER = {'ren': 1, 'ryuji': 2, 'morgana': 3, 'ann': 4, 'yusuke': 5, 'makoto': 6,
          'haru': 7, 'futaba': 8, 'akechi': 9, 'kasumi': 10}

style = sys.argv[1] if len(sys.argv) > 1 else 'cutin'
out = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / 'public/quiz/p5'

source = (ROOT / 'src/data/p5quiz.ts').read_text()
results = re.findall(
    r"id: '(\w+)',\s*name: '([^']+)',\s*codename: '([^']+)',\s*arcana: '([^']+)',\s*color: '(#\w+)'",
    source,
)
if not results:
    raise SystemExit('no results found in src/data/p5quiz.ts')


def cutin(id_):
    return str(FACES / f'BCT_P_BC{NUMBER[id_]:04d}.png')


def portrait(id_):
    found = sorted(FACES.glob(f'B{NUMBER[id_]:03d}_000_0[01]_0.png'))
    return str(found[0]) if found else None


def draw_portrait(id_, name, codename, arcana, color):
    face = portrait(id_)
    if face:
        layer = ['(', face, '-trim', '+repage', '-resize', 'x112', ')',
                 '-gravity', 'southeast', '-geometry', '+4+2', '-composite']
    else:
        # eyes from the battle cut-in, cut to a slanted panel
        layer = ['(', cutin(id_), '-trim', '+repage', '-resize', 'x112', '-background', 'none', '-gravity', 'center',
                 '-extent', '124x112', ')', '-gravity', 'southeast', '-geometry', '+4+2', '-composite']
    return [
        '-size', '300x120', 'xc:black',
        '-fill', color, '-draw', 'polygon 0,80 300,58 300,120 0,120',
        '-fill', 'white', '-draw', 'polygon 0,76 300,54 300,58 0,80',
        *layer, '+gravity',
        '-fill', 'white', '-font', HATTY, '-pointsize', '20', '-annotate', '+10+24', 'I GOT',
        '-font', MENU, '-pointsize', '38', '-annotate', '+8+64', name,
        '-fill', 'black', '-font', HATTY,
        '-pointsize', '16', '-annotate', '+10+100', f'{codename}  /  {arcana}',
        '-pointsize', '12', '-annotate', '+10+114', 'which p5 character are you?',
    ]


def draw_cutin(id_, name, codename, arcana, color):
    width = subprocess.run(['magick', '-font', MENU, '-pointsize', '27', f'label:{name}', '-format', '%w', 'info:'],
                           check=True, capture_output=True, text=True).stdout
    # right edge of the black slab behind the name
    edge = int(width) + 22
    return [
        '-size', '300x120', 'xc:black',
        '(', cutin(id_), '-trim', '+repage', '-resize', '300x92^', '-background', 'none', '-gravity', 'center',
        '-extent', '300x92', ')', '-gravity', 'north', '-composite',
        '-fill', color, '-draw', 'polygon 0,92 300,78 300,120 0,120',
        '-fill', 'white', '-draw', 'polygon 0,89 300,75 300,78 0,92',
        '-fill', 'black', '-draw', 'polygon 0,0 62,0 54,22 0,22',
        '+gravity',
        '-fill', 'white', '-font', HATTY, '-pointsize', '17', '-annotate', '+6+17', 'I GOT',
        '-fill', 'black', '-draw', f'polygon 0,91 {edge},{91 - edge * 14 // 300} {edge - 9},120 0,120',
        '-fill', 'white', '-font', MENU, '-pointsize', '27', '-annotate', '+6+114', name,
        '-fill', 'black',
        '-gravity', 'southeast', '-font', HATTY,
        '-pointsize', '18', '-annotate', '+8+17', f'{codename} / {arcana}',
        '-pointsize', '14', '-annotate', '+8+3', 'which p5 character are you?',
    ]


out.mkdir(parents=True, exist_ok=True)
for result in results:
    draw = draw_portrait if style == 'portrait' else draw_cutin
    target = out / f'{result[0]}.png'
    subprocess.run(['magick', *draw(*result), '+gravity', '-shave', '2x2',
                    '-bordercolor', 'white', '-border', '2', '-strip', str(target)], check=True)
    print(target)
