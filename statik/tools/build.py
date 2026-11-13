#!/usr/bin/env python3
"""Statik site üreticisi.

src/layout.html  ortak iskelet (header, footer)
src/pages/*.html her sayfanın içeriği; ilk satırda JSON ayarları
src/assets/      CSS, JS, font ve görseller

Çıktı: dist/  (Vercel bu klasörü yayınlar)
Kullanım: python3 tools/build.py
"""
import json, re, shutil, time
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC, DIST = ROOT / "src", ROOT / "dist"
# Alan adı (fatihmuhsurler.com) kaydedilip Vercel'e bağlanınca burayı değiştirip yeniden üretin.
SITE = "https://fatih-muhsurler.vercel.app"

MENU = [
    ("/hakkimizda", "Hakkımızda"),
    ("/tesis", "Tesis"),
    ("/fason-kesim", "Fason Kesim"),
    ("/sucuk", "Sucuk"),
    ("/kalite", "Kalite"),
    ("/iletisim", "İletişim"),
]


def menu_html(path, tag="a"):
    out = []
    for href, label in MENU:
        cur = ' aria-current="page"' if path == href else ""
        link = f'<a href="{href}"{cur}>{label}</a>'
        out.append(f"<li>{link}</li>" if tag == "li" else link)
    return "\n      ".join(out)


def minify_css(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{};,>])\s*", r"\1", css)
    return css.replace(";}", "}").strip()


def expand_includes(html):
    """{{include:ad}} yerine src/partials/ad.html koyar; iç içe kullanıma ve
    aynı parçanın tekrarına izin verir ({{uid}} her kullanımda benzersizdir)."""
    counter = iter(range(1, 1000))
    pattern = re.compile(r"\{\{include:(\w+)\}\}")
    while pattern.search(html):
        html = pattern.sub(
            lambda m: (SRC / "partials" / f"{m.group(1)}.html").read_text(encoding="utf-8").replace("{{uid}}", str(next(counter))),
            html,
        )
    return html


def breadcrumb_ld(path):
    """Menüdeki iç sayfalar için BreadcrumbList üretir."""
    label = dict(MENU).get(path)
    if not label:
        return ""
    data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": label, "item": SITE + path},
        ],
    }
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False) + "</script>"


def read_page(f):
    text = f.read_text(encoding="utf-8")
    m = re.match(r"\s*<!--(.*?)-->\s*", text, re.S)
    meta = json.loads(m.group(1))
    return meta, text[m.end():]


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    shutil.copytree(SRC / "assets", DIST / "assets", ignore=shutil.ignore_patterns("fonts.css", "style.css"))
    css = (SRC / "assets/css/fonts.css").read_text() + (SRC / "assets/css/style.css").read_text()
    css = minify_css(css).replace("../fonts/", "/assets/fonts/")

    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    version = str(int(time.time()))
    urls = []
    for f in sorted((SRC / "pages").glob("*.html")):
        meta, body = read_page(f)
        body = expand_includes(body)
        path = meta["path"]
        canonical = SITE + ("" if path == "/" else path)
        preload = "".join(
            f'<link rel="preload" as="image" fetchpriority="high" href="/assets/img/{img}-800.webp" '
            f'imagesrcset="/assets/img/{img}-800.webp 800w, /assets/img/{img}.webp 1600w" imagesizes="100vw">'
            for img in meta.get("preload", [])
        )
        html = layout
        for key, val in {
            "title": meta["title"],
            "description": meta["description"],
            "canonical": canonical,
            "site": SITE,
            "preload": preload,
            "head_extra": (meta.get("head_extra", "") + breadcrumb_ld(path)).replace("{{site}}", SITE),
            "body_class": meta.get("body_class", ""),
            "menu": menu_html(path),
            "menu_list": menu_html(path, "li"),
            "version": version,
            "css": css,
            "body": body.replace("{{site}}", SITE),
        }.items():
            html = html.replace("{{" + key + "}}", val)
        if "{{" in html:
            raise SystemExit(f"{f.name}: doldurulmamış alan kaldı")
        out = DIST / ("index.html" if path == "/" else path.strip("/") + "/index.html")
        if path == "/404":
            out = DIST / "404.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html, encoding="utf-8")
        if meta.get("sitemap", True):
            urls.append(canonical)

    today = date.today().isoformat()
    (DIST / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(f"  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>\n" for u in urls)
        + "</urlset>\n",
        encoding="utf-8",
    )
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
    print(f"{len(urls)} sayfa üretildi → dist/")


if __name__ == "__main__":
    main()
