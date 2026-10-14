#!/usr/bin/env python3
"""Draw the library room icons as pixel-art svgs into src/assets/site/rooms/.

Each icon is a 20x18 grid of letters, one letter per pixel. Change a grid and
run this again.
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'src/assets/site/rooms'

# same values as the colour variables in src/layouts/Base.astro
COLORS = {
    'k': '#000000', 's': '#15120f', 'd': '#2b2520', 'b': '#4a4038',  # blacks and tv browns
    't': '#b09b83', 'g': '#a09697', 'l': '#adb0b0', 'w': '#ffffff',  # the site's tan and greys
    'r': '#e60012', 'm': '#9c0a12',  # accent red and its shadow
    'y': '#c9a227', 'u': '#8fa3b0',  # the yellow and blue-grey from the status colours
}

ICONS = {
    'favs': '''
....................
....................
....mmmm....mmmm....
...mrrrrm..mrrrrm...
..mrwwrrrmmrrrrrrm..
..mrwrrrrrrrrrrrrm..
..mrrrrrrrrrrrrrrm..
..mrrrrrrrrrrrrrrm..
...mrrrrrrrrrrrrm...
....mrrrrrrrrrrm....
.....mrrrrrrrrm.....
......mrrrrrrm......
.......mrrrrm.......
........mrrm........
.........mm.........
....................
....................
....................
''',
    'media': '''
.....g........g.....
......g......g......
.......g....g.......
........g..g........
.bbbbbbbbbbbbbbbbbb.
.bddddddddddddddddb.
.bdkkkkkkkkkkkdttdb.
.bdkllyyuurrrkdttdb.
.bdkllyyuurrrkddddb.
.bdkllyyuurrrkdttdb.
.bdkllyyuurrrkdttdb.
.bdkllyyuurrrkddddb.
.bdktttttttttkdssdb.
.bdkkkkkkkkkkkddddb.
.bdddddddddddddssdb.
.bbbbbbbbbbbbbbbbbb.
...bb..........bb...
...bb..........bb...
''',
    'quizzes': '''
.......tttttt.......
....bbbttttttbbb....
....bddddddddddb....
....bdrrdgggggdb....
....bdrrdddddddb....
....bddddddddddb....
....bdttdggggddb....
....bdttdddddddb....
....bddddddddddb....
....bdyydgggggdb....
....bdyydddddddb....
....bddddddddddb....
....bduudgggdddb....
....bduudddddddb....
....bddddddddddb....
....bbbbbbbbbbbb....
....................
....................
''',
    'graphics': '''
....................
....................
..bbbbbbbbbbbbbbbb..
..buuuuuuuuuuuuuub..
..buuuuuuuuuurruub..
..buuuuuuuuuurruub..
..buuuuuduuuuuuuub..
..buuuuddduuuuuuub..
..buuuddddduuduuub..
..buudddddddddduub..
..buddddddddddddub..
..bddddddddddddddb..
..bbbbbbbbbbbbbbbb..
....................
....................
....................
....................
....................
''',
    'projects': '''
....................
....................
..bbbbbbbbbbbbbbbb..
..bttttttttttrtytb..
..bbbbbbbbbbbbbbbb..
..bkkkkkkkkkkkkkkb..
..bkkkkkkkkkkrrkkb..
..bkkkkkkkkkkrrkkb..
..bkkkkuukkkkrrkkb..
..bkkkkuukkkkrrkkb..
..bkkkkuukyykrrkkb..
..bkrrkuukyykrrkkb..
..bkrrkuukyykrrkkb..
..bkrrkuukyykrrkkb..
..bbbbbbbbbbbbbbbb..
....................
....................
....................
''',
}


def pentacle():
    """A five-pointed star in a ring: too fiddly to type by hand, so it is plotted."""
    import math
    grid = [['.'] * 20 for _ in range(18)]
    cx, cy, radius = 9.5, 8.5, 8.4

    def dot(x, y, letter):
        x, y = round(x), round(y)
        if 0 <= x < 20 and 0 <= y < 18:
            grid[y][x] = letter

    for step in range(720):
        angle = math.radians(step / 2)
        dot(cx + radius * math.cos(angle), cy + radius * math.sin(angle), 'm')
    points = [(cx + radius * math.cos(math.radians(-90 + 72 * k)),
               cy + radius * math.sin(math.radians(-90 + 72 * k))) for k in range(5)]
    for k in range(5):
        (x0, y0), (x1, y1) = points[k], points[(k + 2) % 5]
        for step in range(101):
            dot(x0 + (x1 - x0) * step / 100, y0 + (y1 - y0) * step / 100, 'r')
    return '\n'.join(''.join(row) for row in grid)


ICONS['shrines'] = pentacle()

def svg(grid):
    rows = grid.strip('\n').split('\n')
    assert len(rows) == 18 and all(len(row) == 20 for row in rows), [len(row) for row in rows]
    rects = []
    for y, row in enumerate(rows):
        x = 0
        while x < 20:
            letter = row[x]
            end = x
            while end < 20 and row[end] == letter:
                end += 1
            if letter != '.':
                rects.append(f'\t<rect x="{x}" y="{y}" width="{end - x}" height="1" fill="{COLORS[letter]}" />')
            x = end
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" width="200" height="180" '
            'shape-rendering="crispEdges">\n' + '\n'.join(rects) + '\n</svg>\n')


OUT.mkdir(parents=True, exist_ok=True)
for name, grid in ICONS.items():
    (OUT / f'{name}.svg').write_text(svg(grid))
    print(OUT / f'{name}.svg')
