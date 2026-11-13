"""Tesis fotoğraflarını sitenin tonuna göre işler ve WebP olarak yazar.

    python tools/grade_photos.py [ad ...]   (ad verilmezse hepsi)

Kaynaklar proje kökündeki WhatsApp fotoğraflarıdır. Her görsel aynı ton
ayarından geçer: sıcak beyaz dengesi, hafif S eğrisi, biraz düşük doygunluk,
koyulaştırılmış gökyüzü ve kenar karartması. Telefon fotoğrafları böylece
sitenin kömür, krem ve bakır paletiyle aynı aileye girer.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src/assets/img"
SRC = "WhatsApp Image 2026-11-02 at {}.jpeg"
SRC_FULL = "WhatsApp Image {}.jpeg"

# ad: (kaynak, en/boy, dikey merkez, boyutlar, gökyüzü koyulaştırma, sıcaklık)
JOBS = {
    # yapay zekâ ile düzenlenmiş kaynaklar (kaynak/): tırların önü yazısız, yanda logo; tırsız tesis dış görünüşü
    "tir-yan": ("kaynak/ai-tr1.png", 3 / 2, .5, [1024, 800], .25, 1.0),
    "tir-dok": ("kaynak/ai-tr3.png", 3 / 2, .5, [1024, 800], .25, 1.0),
    "tesis-dis": ("kaynak/ai-ext1.png", 3 / 2, .45, [1536, 800], .3, 1.0),
    "tesis-avlu": ("kaynak/ai-ext2.png", 3 / 2, .5, [1536, 800], .3, 1.0),
    "besi-acilis": ("kaynak/ai-hero.png", 3 / 2, .5, [1536, 800], .1, .5),
    "sucuk-tahta": ("kaynak/ai-sucuk.png", 3 / 2, .5, [1536, 800], 0, .3),
    # 2 Kasım: tesis girişi ve soğuk oda karkasları
    "tabela": ("17.52.43", 3 / 4, .42, [738, 400], .15, .8),
    "giris-yol": ("17.52.43 (1)", 3 / 4, .5, [738, 400], .15, .8),
    "soguk-oda": ("17.52.40 (2)", 3 / 2, .36, [1600, 800], 0, .35),
    "karkas-kesim": ("17.52.39 (1)", 3 / 4, .45, [1200, 600], 0, .35),
    "karkas-ceyrek": ("17.52.40 (3)", 3 / 4, .45, [1200, 600], 0, .35),
    "karkas-oda": ("17.52.40 (1)", 3 / 2, .4, [1600, 800], 0, .35),
    "karkas-sira": ("17.52.39", 16 / 9, .42, [1600, 800], 0, .35),
    "ceyrek-sira": ("17.52.41", 3 / 2, .45, [1600, 800], 0, .35),
    # 3 Kasım: kendi besi ahırımız
    "besi-ahir": ("2026-11-03 at 22.31.37 (3)", 3 / 2, .6, [1600, 800], .22, .8),
    "besi-boga": ("2026-11-03 at 22.31.37 (1)", 3 / 4, .55, [1200, 600], .22, .8),
    "besi-ikili": ("2026-11-03 at 22.31.37 (5)", 3 / 2, .62, [1500, 800], .22, .8),
    "besi-agac": ("2026-11-03 at 22.31.36", 4 / 5, .5, [1500, 800], .22, .8),
    "besi-gokyuzu": ("2026-11-03 at 22.31.37", 16 / 9, .5, [1500, 800], .2, .8),
    "besi-avlu": ("2026-11-03 at 22.31.37 (2)", 4 / 3, .55, [1500, 800], .22, .8),
    "besi-genis": ("2026-11-03 at 22.31.36 (1)", 16 / 9, .66, [1500, 800], .2, .8),
    # 9 Eylül: kendi sucuğumuz (Usta Kasap kâğıdı üzerinde)
    "sucuk-kagit": ("2026-09-09 at 16.55.51 (2)", 4 / 5, .42, [947, 600], 0, .3),
    "sucuk-halka": ("2026-09-09 at 16.55.51 (3)", 1, .33, [947, 600], 0, .3),
}


def crop(im, ar, cy):
    w, h = im.size
    if w / h > ar:
        nw = int(h * ar)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = int(w / ar)
    y = int(max(0, min(h - nh, cy * h - nh / 2)))
    return im.crop((0, y, w, y + nh))


def grade(im, sky, warm):
    a = np.asarray(im).astype(np.float32) / 255
    h, w, _ = a.shape
    # sıcak beyaz dengesi
    a *= np.array([1 + .045 * warm, 1 + .012 * warm, 1 - .06 * warm])
    # doygunluğu biraz düşür
    lum = (a * [.299, .587, .114]).sum(2, keepdims=True)
    a = lum + (a - lum) * .86
    # yumuşak S eğrisi, siyahları hafif kaldır
    a = np.clip(a, 0, 1)
    a = a + .22 * (a - .5) * (1 - np.abs(2 * a - 1))
    a = .025 + a * .965
    # üstten inen degrade: bulutlu, patlak gökyüzünü toparlar
    if sky:
        g = np.clip(1 - np.linspace(0, 1, h) / .45, 0, 1)[:, None, None] ** 1.6
        a *= 1 - sky * g
    # kenar karartması
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2)
    a *= (1 - .16 * np.clip(r - .55, 0, 1) ** 1.4)[:, :, None]
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def main():
    only = set(sys.argv[1:])
    for name, (src, ar, cy, sizes, sky, warm) in JOBS.items():
        if only and name not in only:
            continue
        name_src = src if src.startswith("kaynak/") else SRC_FULL.format(src) if src.startswith("2026") else SRC.format(src)
        im = ImageOps.exif_transpose(Image.open(ROOT / name_src)).convert("RGB")
        im = grade(crop(im, ar, cy), sky, warm)
        for i, s in enumerate(sizes):
            fn = OUT / (name + ("" if i == 0 else f"-{s}") + ".webp")
            im.resize((s, round(s / ar)), Image.LANCZOS).save(fn, "WEBP", quality=80, method=6)
            print(fn.name)


if __name__ == "__main__":
    main()
