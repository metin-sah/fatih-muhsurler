"""Bir Aile Mesleği: özgün müzik (sentez), efektler, ortam, sessizlikler -> out/mix.wav"""
import os, sys, json
import numpy as np, soundfile as sf
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.environ['LIB'])
from core.audio.sfx import SR, bp, lp, hp, add, limit
rng = np.random.default_rng(55)
TL = json.load(open(f'{D}/timeline.json')); DUR = TL['dur']; N = int(DUR * SR); BEAT = 60 / TL['bpm']
mus = np.zeros((N, 2)); fol = np.zeros((N, 2)); amb = np.zeros((N, 2))
def t_(d): return np.arange(int(d * SR)) / SR
def nz(d): return rng.standard_normal(int(d * SR))
def nrm(x, p=1.): m = np.abs(x).max(); return x * p / m if m else x
def pad(b, s, at_, g=1., pan=0.):
    i = int(at_ * SR); s = s[:max(0, N - i)]
    if i >= N or len(s) == 0: return
    l = g * np.cos((pan + 1) * np.pi / 4); r = g * np.sin((pan + 1) * np.pi / 4)
    b[i:i + len(s), 0] += s * l; b[i:i + len(s), 1] += s * r
# tel: Karplus-Strong, mızrap vuruşu
def pluck(f, d=1.6, v=1., bright=.5):
    n = int(SR / f); buf = rng.uniform(-1, 1, n); buf = lp(buf, 1500 + 4500 * bright); out = np.zeros(int(d * SR)); y = buf.copy(); i = 0; prev = 0.
    dec = .9965 - .0012 * (f / 440)
    for k in range(len(out)):
        s = y[i]; y[i] = dec * .5 * (s + prev); prev = s; out[k] = s; i = (i + 1) % n
    return nrm(hp(out, 90), v) * np.minimum(1, t_(d) / .002)
A = 110.
# uşşak: A, segah (yarım bemol B), C, D, E, F, G
S = {'A': 1, 'S': 1.0800, 'C': 1.2, 'D': 1.3333, 'E': 1.5, 'F': 1.6, 'G': 1.7778}
def nf(n, o=1): return A * o * S[n]
THEME = [('A',2,0,1),('C',2,1,.5),('D',2,1.5,.5),('E',2,2,1),('D',2,3,.5),('C',2,3.5,.5),('S',2,4,1),('A',2,5,1.5),('E',1,6.5,.5),('A',2,7,1)]
def theme(t0, g=1., pan=-.2, oct_=1):
    for n, o, b, l in THEME:
        at_ = t0 + b * BEAT; pad(mus, pluck(nf(n, o * oct_), 1.3 + l, 1, .55), at_, g * .55, pan)
        pad(mus, pluck(nf(n, o * oct_ * 2), .5, .4, .8), at_ + .012, g * .12, pan + .3)
def ost(t0, t1, g=.32, sub=1):
    t = t0; k = 0; pat = [('A',1),('E',1),('A',2),('E',1)]
    while t < t1 - .01:
        n, o = pat[k % 4]; pad(mus, pluck(nf(n, o), 1.1, 1, .35), t, g, .25); t += BEAT / sub; k += 1
def drone(t0, t1, g=.1):
    d = t1 - t0; tt = t_(d); e = np.minimum(1, tt / 1.2) * np.minimum(1, (d - tt) / 1.)
    x = sum(a * np.sin(2 * np.pi * f * tt + .6 * np.sin(2 * np.pi * .13 * tt)) for f, a in [(A, 1), (A * 1.5, .55), (A * 2, .38), (A * 3, .16), (A * 4, .09)])
    x = x + .03 * lp(nz(d), 700)
    pad(mus, x * e, t0, g, -.1); pad(mus, np.roll(x, 900) * e, t0, g, .15)
def drum(at_, v=1., f=74):
    d = .8; tt = t_(d); x = np.sin(2 * np.pi * (f + 50 * np.exp(-tt * 30)) * tt) * np.exp(-tt * 6) + .28 * lp(nz(d), 1500) * np.exp(-tt * 40)
    pad(mus, nrm(x, 1), at_, .55 * v, 0)
def kaval(t0, notes, g=.17):
    for n, o, b, l in notes:
        d = l * BEAT + .4; tt = t_(d); vib = .006 * np.sin(2 * np.pi * 5 * tt) * np.minimum(1, tt / .7); ph = 2 * np.pi * np.cumsum(nf(n, o) * (1 + vib)) / SR
        e = np.minimum(1, tt / .16) * np.minimum(1, (d - tt) / .3)
        x = (np.sin(ph) + .25 * np.sin(2 * ph) + .1 * np.sin(3 * ph)) * e + .05 * bp(nz(d), 800, 4000) * e
        pad(mus, x, t0 + b * BEAT, g, -.05)
# --- plan
drum(0, .9); drum(2.8, .3)
theme(4.17, .9); ost(4.17, 11.67)
drone(9.2, 17.6, .1); theme(11.67, .75); ost(11.67, 17.5, .25)
for t in TL['cuts']: drum(t, 1.)
ost(17.5, 20.83, .28); ost(20.83, 24.17, .26); ost(24.17, 27.5, .24)
pad(mus, sum(pluck(nf(n, o), 2.6, 1, .5) for n, o in [('A',2),('E',2),('A',3)]), 17.5, .22, -.2)
pad(mus, pluck(nf('C',3), 2.2, 1, .5), 20.83, .22, -.2); pad(mus, pluck(nf('S',3), 2.2, 1, .5), 24.17, .22, -.2)
ost(27.5, 31.6, .3, 2); theme(27.5, .55, .1)
drone(35., DUR, .13); drum(35., .9, 62)
kaval(35., [('E',4,0,2),('D',4,2,1),('C',4,3,1),('A',3,4,2.6)])
theme(36.67, .55, -.25); pad(mus, sum(pluck(nf(n, o), 3.6, 1, .5) for n, o in [('A',1),('E',2),('A',2)]), 39.17, .32, 0)
# --- efekt
def carve(at_, d):
    tt = t_(d); sp = .45 + .55 * np.abs(np.sin(tt * 7.3 + np.sin(tt * 3)))
    x = bp(nz(d), 1300, 5200) * sp * np.minimum(1, tt / .03) * np.minimum(1, (d - tt) / .1); pad(fol, x, at_, .10, -.2)
    for k in range(int(d * 5)): pad(fol, hp(nz(.03), 2500) * np.exp(-t_(.03) * 150), at_ + rng.uniform(0, d), .13, rng.uniform(-.5, .5))
def peel(at_, d):
    tt = t_(d); e = np.sin(np.pi * tt / d) ** .7
    pad(fol, bp(nz(d), 700, 5000) * e, at_, .17, .25); pad(fol, bp(nz(.07), 300, 1500) * np.exp(-t_(.07) * 40), at_ + d - .07, .35, .35)
def brayer(at_, d=.6):
    tt = t_(d); pad(fol, bp(nz(d), 300, 1800) * (1 + .7 * np.sin(2 * np.pi * 26 * tt)) * np.sin(np.pi * tt / d), at_, .14, -.1)
def wood(at_, g=.42):
    d = .15; x = sum(a * np.sin(2 * np.pi * f * t_(d)) * np.exp(-t_(d) / ta) for f, a, ta in [(190, 1, .05), (720, .5, .025), (1650, .25, .012)]) + .4 * hp(nz(d), 1500) * np.exp(-t_(d) * 90)
    pad(fol, x, at_, g, .15)
carve(.4, 2.2); brayer(2.8); peel(3.33, .84); peel(11, .67); carve(11.8, 3.9); peel(34.16, .84); carve(31.8, 1.85)
for t in TL['cuts']: wood(t)
for i in range(400):                                  # 400 çentik sesi, seyrek duyulur
    if i % 4 == 0:
        u = i / 400; pad(fol, hp(nz(.012), 3000) * np.exp(-t_(.012) * 300), 20.83 + .15 + 2.4 * u ** .75, .12, rng.uniform(-.4, .4))
for k in range(150): pad(fol, bp(nz(.02), 4000, 11000) * np.exp(-t_(.02) * 200), 24.3 + rng.uniform(0, 3.1), .06, rng.uniform(-.8, .8))
# ray tıkırtısı: tren plakasıyla, soymadan önce başlar (J-kesim), sonraki plakaya taşar (L-kesim)
t = 3.5
while t < 12.2:
    g = .10 * min(1, (t - 3.3) / .9) * min(1, (12.3 - t) / .7)
    for dt in (0, .13): pad(fol, bp(nz(.05), 500, 2600) * np.exp(-t_(.05) * 70), t + dt, g, -.25)
    t += BEAT
# --- ortam
def bed(t0, t1, lo, hi, g, flut=.15, pan=0.):
    d = t1 - t0; tt = t_(d); e = np.minimum(1, tt / .5) * np.minimum(1, (d - tt) / .7)
    x = bp(nz(d), lo, hi) * e * (1 + flut * np.sin(2 * np.pi * .23 * tt)); pad(amb, x, t0, g, pan)
bed(0, 4.2, 180, 1500, .012)                          # oda
bed(3.5, 12.5, 180, 1800, .05)                        # rüzgâr
bed(11.67, 21, 200, 2400, .045)                       # mera
bed(20.83, 24.3, 150, 900, .02)                       # oda
bed(24.17, 27.8, 60, 400, .07, .03)                   # soğuk oda uğultusu
bed(27.2, 31.7, 50, 340, .11, .08)                    # motor
bed(31.67, 33.75, 180, 1300, .0045)                   # sessizlik 1: yalnız oda
bed(35, DUR, 240, 2600, .04)                          # sabah
# --- seslendirme: tok erkek sesi, müzik ve efekt altına çekilir
from core.audio.sfx import compress
from scipy.signal import resample_poly
VO = {'L1': 4.28, 'L2': 11.9, 'L3': 17.68, 'L4': 21.0, 'L5': 24.32, 'L6': 27.7, 'L7': 35.5}
vox = np.zeros((N, 2)); gate = np.zeros(N)
for k, at_ in VO.items():
    x, sr = sf.read(f'{D}/voices/{k}.wav'); x = resample_poly(x, SR, sr)
    x = x + .22 * lp(x, 200)                                          # gövde: yalnızca alt frekansa hafif destek
    x = compress(x, thr=.3, ratio=2.)
    x = x / (np.sqrt(np.mean(x ** 2)) + 1e-9) * .21
    i = int(at_ * SR); e = min(N, i + len(x)); vox[i:e, 0] += x[:e - i]; vox[i:e, 1] += x[:e - i]; gate[i:e] = 1
    ref = np.zeros(int(.25 * SR)); ref[int(.031 * SR)] = .08; ref[int(.073 * SR)] = .04   # küçük oda yankısı
    wet = np.convolve(x, ref)[:len(x)]; vox[i:e, 0] += wet[:e - i]; vox[i:e, 1] += np.roll(wet, 40)[:e - i]
    print(k, 'ends', round(at_ + len(x) / SR, 2))
kn = int(.18 * SR); gs = np.convolve(gate, np.hanning(kn) / np.hanning(kn).sum(), 'same')[:, None]
mix = mus * .8 * (1 - .8 * gs) + fol * (1 - .7 * gs) + amb * (1 - .55 * gs) + vox
win = gs[:, 0] > .9; print('ses/fon dB', round(20 * np.log10(np.sqrt((vox[win] ** 2).mean()) / np.sqrt(((mus * .8 * (1 - .8 * gs) + fol * (1 - .7 * gs) + amb * (1 - .55 * gs))[win] ** 2).mean())), 1))
# sessizlik: 31.67 sonrası müzik zaten yok; 33.75-34.16 tam sessizlik
a, b = int(33.75 * SR), int(34.16 * SR); mix[a:b] = 0
mix = limit(mix, .82) if mix.ndim == 1 else np.stack([limit(mix[:, 0], .82), limit(mix[:, 1], .82)], 1)
fade = int(.9 * SR); mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
os.makedirs(f'{D}/out', exist_ok=True); sf.write(f'{D}/out/mix.wav', mix, SR, subtype='PCM_24')
print('mix', round(len(mix) / SR, 2), 'peak', round(float(np.abs(mix).max()), 3))
