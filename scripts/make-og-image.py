"""Builds public/og.jpg (1200x630): homepage hero, soft dark gradient, white logo.

Re-run if the hero or logo changes: python3 scripts/make-og-image.py
"""
from PIL import Image

W, H = 1200, 630
hero = Image.open("public/images/home/hero.jpg").convert("RGB")
scale = max(W / hero.width, H / hero.height)
hero = hero.resize((round(hero.width * scale), round(hero.height * scale)), Image.LANCZOS)
left, top = (hero.width - W) // 2, (hero.height - H) // 2
canvas = hero.crop((left, top, left + W, top + H))

# Ink gradient from the left so the logo reads on any part of the photo.
ink = (28, 27, 27)
shade = Image.new("L", (W, H))
for x in range(W):
    alpha = int(235 * max(0.0, 1 - x / (W * 0.75)) ** 1.1)
    for y in range(H):
        shade.putpixel((x, y), alpha)
canvas = Image.composite(Image.new("RGB", (W, H), ink), canvas, shade)

logo = Image.open("public/logo-white.png").convert("RGBA")
logo_h = 190
logo = logo.resize((round(logo.width * logo_h / logo.height), logo_h), Image.LANCZOS)
canvas.paste(logo, (84, (H - logo_h) // 2), logo)

canvas.save("public/og.jpg", quality=86, optimize=True, progressive=True)
print("public/og.jpg", canvas.size)
