#!/usr/bin/env python3
"""Turn the 1909 Rider-Waite-Smith scans into pixel cards in the site palette.

Usage: tarot_cards.py <scans dir> [width]
Scans are the public domain RWS1909 files from Wikimedia Commons, saved as
00_Fool.jpg ... Wands_14.jpg. Writes 8-bit pngs to public/tarot/,
plus back.png.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance

OUT = Path(__file__).resolve().parent.parent / 'public/tarot'
WIDTH = 110
HEIGHT_RATIO = 1.74

# site colours from src/layouts/Base.astro, plus a few in-between steps
PALETTE = [
    '#000000', '#15120f', '#2b2520', '#4a4038', '#534b4c',  # blacks & browns
    '#7d7d7d', '#a09697', '#adb0b0', '#b09b83', '#d8cbb4',  # greys, tan, light tan
    '#f2ead8',  # paper
    '#e60012', '#9c0a12',  # red & its shadow
    '#c9a227', '#7a6418',  # yellow & its shadow
    '#8fa3b0', '#55636c',  # blue-grey & its shadow
]

# 4x4 bayer matrix, centred on zero
BAYER = (np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) + 0.5) / 16 - 0.5
DITHER = 40
# the 1909 inks are faded, this pulls them onto the site colours
SATURATION = 1.6


def rgb(hex_):
    return [int(hex_[i:i + 2], 16) for i in (1, 3, 5)]


def lab(a):
    """sRGB 0-255 -> CIE Lab, so nearest colour matches what eyes see."""
    a = a / 255
    a = np.where(a > 0.04045, ((a + 0.055) / 1.055) ** 2.4, a / 12.92)
    xyz = a @ np.array([[0.4124, 0.2126, 0.0193], [0.3576, 0.7152, 0.1192], [0.1805, 0.0722, 0.9505]])
    xyz /= [0.9505, 1.0, 1.089]
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], axis=-1)


def frame_box(img):
    """Find the black printed frame inside the cream border."""
    dark = np.asarray(img.convert('L')) < 120
    h, w = dark.shape

    # outermost line at least 60% as dark as the darkest one in the margin,
    # since some scans print the frame lighter than others.
    # skips the very edge, where some scans have a shadow
    def first_line(fractions, limit):
        skip = len(fractions) // 60
        margin = fractions[skip:limit]
        return skip + int(np.nonzero(margin >= margin.max() * 0.6)[0][0])

    cols, rows = dark.mean(axis=0), dark.mean(axis=1)
    left = first_line(cols, w // 8)
    right = w - first_line(cols[::-1], w // 8)
    top = first_line(rows, h // 10)
    bottom = h - first_line(rows[::-1], h // 10)
    return left, top, right, bottom


def pixelate(path, width):
    img = Image.open(path).convert('RGB')
    img = img.crop(frame_box(img))
    img = ImageEnhance.Color(img).enhance(SATURATION)
    height = round(width * HEIGHT_RATIO)
    small = np.asarray(img.resize((width, height), Image.LANCZOS), dtype=float)

    y, x = np.indices((height, width))
    small = np.clip(small + BAYER[y % 4, x % 4][..., None] * DITHER, 0, 255)

    pal = np.array([rgb(c) for c in PALETTE], dtype=float)
    dist = ((lab(small)[:, :, None, :] - lab(pal)[None, None]) ** 2).sum(axis=-1)
    out = Image.fromarray(dist.argmin(axis=-1).astype(np.uint8), 'P')
    out.putpalette(pal.astype(np.uint8).flatten().tolist())
    return out


def card_back(width):
    """Our own back: dark brown, tan frame, a crescent moon & stars."""
    height = round(width * HEIGHT_RATIO)
    idx = {c: i for i, c in enumerate(PALETTE)}
    grid = np.full((height, width), idx['#15120f'], dtype=np.uint8)
    y, x = np.indices((height, width))

    # faint texture
    grid[(BAYER[y % 4, x % 4] < -0.3)] = idx['#2b2520']

    def frame(inset, thick, colour):
        outer = (x >= inset) & (x < width - inset) & (y >= inset) & (y < height - inset)
        i2 = inset + thick
        inner = (x >= i2) & (x < width - i2) & (y >= i2) & (y < height - i2)
        grid[outer & ~inner] = idx[colour]

    frame(0, 3, '#000000')
    frame(6, 3, '#b09b83')
    frame(14, 1, '#b09b83')

    cx, cy, r = width / 2, height / 2, width * 0.17
    moon = ((x - cx) ** 2 + (y - cy) ** 2 < r ** 2) & ((x - cx - r * 0.45) ** 2 + (y - cy + r * 0.2) ** 2 >= (r * 0.85) ** 2)
    grid[moon] = idx['#c9a227']

    def star(sx, sy, size, colour):
        for d in range(-size, size + 1):
            grid[sy, sx + d] = grid[sy + d, sx] = idx[colour]

    for fx, fy, size in [(0.3, 0.3, 3), (0.72, 0.36, 2), (0.66, 0.64, 3), (0.28, 0.7, 2), (0.5, 0.2, 2), (0.5, 0.8, 2)]:
        star(round(width * fx), round(height * fy), size, '#b09b83')

    for fx, fy in [(0, 0), (1, 0), (0, 1), (1, 1)]:
        dx, dy = round(26 + fx * (width - 53)), round(26 + fy * (height - 53))
        diamond = abs(x - dx) + abs(y - dy) <= 4
        grid[diamond] = idx['#e60012']

    out = Image.fromarray(grid, 'P')
    out.putpalette(np.array([rgb(c) for c in PALETTE], dtype=np.uint8).flatten().tolist())
    return out


def main():
    src = Path(sys.argv[1])
    width = int(sys.argv[2]) if len(sys.argv) > 2 else WIDTH
    OUT.mkdir(parents=True, exist_ok=True)
    scans = sorted(src.glob('*.jpg'))
    for scan in scans:
        pixelate(scan, width).save(OUT / f'{scan.stem.lower()}.png', optimize=True)
    card_back(width).save(OUT / 'back.png', optimize=True)
    print(f'{len(scans)} cards + back -> {OUT}')


if __name__ == '__main__':
    main()
