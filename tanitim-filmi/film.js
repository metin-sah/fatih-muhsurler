// Bir Aile Mesleği: tüm plakalar, geçişler, yazılar (Woodcut Print)
import * as WC from './engine/index.js';
import { clamp, lerp, seg, ss, eo, eio, mulberry } from '/core/lib.js';
import { curl, peelState } from './trans.js';

const W = 1920, H = 1080, IMG = { x: 36, y: 36, w: 1848, h: 912 }, PW = 1848, PH = 912;
const COPPER = '#B8622C';
const [M, m] = WC.canvas(W, H), [C, c] = WC.canvas(W, H);
const [BA, ba] = WC.canvas(W, H), [BB, bb] = WC.canvas(W, H), [BD, bd] = WC.canvas(W, H);
let P;

export const DUR = 43;
const CAP = [
  { t0: 4.3, t1: 11.2, text: '1955. Selahattin Mühsürler, karkas eti trenle İstanbul\'a götürüyor.' },
  { t0: 11.8, t1: 17.45, text: '2001. Afyonkarahisar\'da entegre tesis kuruluyor.' },
  { t0: 17.55, t1: 20.8, text: '600 büyükbaş besi kapasitesi' },
  { t0: 20.88, t1: 24.14, text: 'Günde 400 baş kesim kapasitesi' },
  { t0: 24.22, t1: 27.47, text: '120 ton soğuk hava kapasitesi' },
  { t0: 27.55, t1: 31.6, text: 'Sevkiyat, kendi frigorifik araçlarımızla' },
  { t0: 35.2, t1: 43, text: 'Fatih Mühsürler Et Entegre Tesisleri  ·  Afyonkarahisar OSB  ·  0272 246 46 46' },
];
export const EV = [];
export function TEXTS(t) {
  const out = [];
  for (const k of CAP) if (t >= k.t0 && t < k.t1) out.push({ id: 'cap' + k.t0, text: k.text, x0: 80, y0: 960, x1: 1840, y1: 1060 });
  return out;
}

// ---------- sahne çerçevesi: kâğıt kenar sabit, kamera plaka içinde
function begin(cam = {}, { black = true } = {}) {
  m.setTransform(1, 0, 0, 1, 0, 0); c.setTransform(1, 0, 0, 1, 0, 0);
  m.fillStyle = '#fff'; m.fillRect(0, 0, W, H); c.clearRect(0, 0, W, H);
  const z = cam.z ?? 1, x = cam.x ?? PW / 2, y = cam.y ?? PH / 2;
  for (const g of [m, c]) {
    g.save(); g.beginPath(); g.rect(IMG.x, IMG.y, IMG.w, IMG.h); g.clip();
    g.setTransform(z, 0, 0, z, IMG.x + IMG.w / 2 - z * x, IMG.y + IMG.h / 2 - z * y);
  }
  if (black) { m.fillStyle = '#000'; m.fillRect(-4000, -4000, 12000, 12000); }
}
function end() { m.restore(); c.restore(); m.setTransform(1, 0, 0, 1, 0, 0); c.setTransform(1, 0, 0, 1, 0, 0); }
function caption(t) {
  for (const k of CAP) if (t >= k.t0 && t < k.t1) {
    const a = Math.min(seg(t, k.t0, k.t0 + .1), 1 - seg(t, k.t1 - .15, k.t1));
    m.save(); m.font = '400 41px Fraunces'; m.textAlign = 'center'; m.textBaseline = 'middle';
    m.fillStyle = `rgba(0,0,0,${a})`; m.fillText(k.text, W / 2, IMG.y + IMG.h + 66); m.restore();
  }
}

// ---------- yardımcılar
const poly = pts => pts.map(p => [p[0], p[1]]);
const at = (P, dx, dy, s = 1, flip = false) => P.map(([x, y]) => [dx + (flip ? -x : x) * s, dy + y * s]);
const LT = WC.light(-.55, -.65, .5);
function ridge(x0, x1, base, peaks, seed, rough = 10) {
  const r = mulberry(seed), A = [[x0, base], ...peaks, [x1, base]];
  return WC.resample(A, 18).map(([x, y], i, B) => (i === 0 || i === B.length - 1) ? [x, y] : [x, y + (r() - .5) * rough]);
}
// gökyüzü: yatay kesikler, ufka doğru genişler
function sky(x0, x1, y0, y1, o = {}) {
  const reg = new WC.Region([WC.rect(x0, y0, x1 - x0, y1 - y0)], { res: 4 });
  const low = o.low ?? .2, hi = o.hi ?? .95;
  return WC.hatch(reg, { dir: (x, y) => .03 * Math.sin(x * .004 + y * .01), tone: (x, y) => lerp(low, hi, clamp((y - y0) / (y1 - y0)) ** (o.pow ?? 1.3)), sp: o.sp ?? 15, wmax: o.wmax ?? 13, lo: .05, hi: 1, kind: 'u', seg: o.seg ?? [320, 820], gap: [3, 12], seed: o.seed ?? 4, reveal: o.reveal });
}
function slope(P, seed, o = {}) { return WC.shape([P], { light: o.L ?? LT, sp: o.sp ?? 13, wmax: o.wmax ?? 8, halo: o.halo ?? 3, R: o.R ?? 90, amb: o.amb ?? .04, seed, seg: [60, 180], reveal: o.reveal, a0: o.a0 ?? 0 }); }

// Afyonkarahisar Kalesi: ovadan dik yükselen tek kaya silueti ve tepedeki sur (şematik)
function castlePoly(x, base, s) {
  const pts = [[-430, 0], [-352, -28], [-300, -82], [-262, -96], [-232, -160], [-196, -176], [-170, -246], [-132, -268], [-112, -326], [-82, -344], [-68, -378], [-40, -384], [-34, -400], [-16, -400], [-14, -384], [24, -384], [24, -402], [44, -402], [46, -384], [78, -378], [96, -340], [132, -318], [150, -262], [188, -236], [214, -170], [252, -146], [286, -86], [340, -56], [410, -14], [452, 0]];
  return pts.map(([a, b]) => [x + a * s, base + b * s]);
}
function castle(x, base, s, seed, reveal) {
  const P = castlePoly(x, base, s), cx = x - 10 * s, cy = base - 330 * s;
  return WC.shape([P], { light: WC.light(-.6, -.55, .45), sp: 10 * Math.max(1, s), wmax: 9, halo: 4, R: 150 * s, amb: .03, k: 1.2, seed, seg: [34, 110], gap: [3, 10], dir: (px, py) => Math.atan2(py - cy + 60 * s, px - cx) + Math.sin(px * .011 + py * .013) * .22, reveal });
}

// Lokomotif (sola bakar), sıfır noktası raydaki burun altı
function trainParts() {
  const boiler = [[0, -112], [6, -128], [20, -138], [210, -138], [210, -60], [0, -60]];
  const cab = [[206, -186], [292, -186], [292, -60], [206, -60]];
  const roof = [[196, -198], [302, -198], [298, -184], [200, -184]];
  const funnel = [[38, -138], [34, -196], [24, -212], [78, -212], [66, -196], [62, -138]];
  const dome = [[118, -138], [120, -160], [136, -170], [156, -160], [158, -138]];
  const chassis = [[-18, -60], [300, -60], [300, -38], [-18, -38]];
  const plow = [[-40, -8], [0, -60], [0, -20]];
  const car = dx => [[dx, -174], [dx + 280, -174], [dx + 280, -42], [dx, -42]];
  return { boiler, cab, roof, funnel, dome, chassis, plow, car1: car(330), car2: car(644) };
}

let S = {};
function build() {
  const rv = (t0, t1, key) => ({ t0, t1, key, speed: 1200, jit: .12 });
  // --- tren
  const tp = trainParts(), tx = 620, ty = 690;
  const pl = o => at(o, tx, ty);
  S.train = [tp.car2, tp.car1, tp.chassis, tp.boiler, tp.cab, tp.funnel, tp.dome, tp.roof, tp.plow].map((Q, i) => WC.shape([pl(Q)], { light: WC.light(-.3, -.85, .35), sp: 7, wmax: 6, halo: 3, R: 34, amb: .02, seed: 20 + i, seg: [30, 90] }));
  S.ribs = [330, 644].flatMap(dx => Array.from({ length: 9 }, (_, i) => WC.cutAlong([[tx + dx + 16 + i * 31, ty - 168], [tx + dx + 16 + i * 31, ty - 48]], { w: 2, kind: 'k', seg: [50, 120], seed: 90 + i })));
  S.cab = [WC.rect(tx + 226, ty - 168, 50, 48)];
  S.trainSky = sky(-100, PW + 100, 0, 700, { low: .02, hi: .55, pow: 2.4, sp: 17, wmax: 8, seed: 9 });
  const rs = mulberry(5), stars = []; for (let i = 0; i < 120; i++) stars.push([rs() * 3200, rs() * 400, 1.4 + rs() * 2]);
  S.stars = WC.flecks(stars, { seed: 5 });
  S.farHill = slope(ridge(-200, 3400, 760, [[0, 610], [400, 540], [760, 600], [1200, 500], [1700, 590], [2100, 520], [2600, 610], [3100, 530]], 3), 3, { sp: 16, wmax: 5 });
  S.ground = WC.shape([[[-200, 700], [3600, 700], [3600, 960], [-200, 960]]], { fill: true, sp: 14, wmax: 7, dir: 0, seed: 8, seg: [40, 180], tone: () => (x, y) => .12 + .35 * seg(y, 700, 960), halo: 0 });
  // --- tesis (kale + tesis binası)
  const K = (x, y) => clamp(Math.hypot(x - 950, y - 520) / 1000);
  S.tSky = sky(-20, PW + 20, -100, 700, { low: .55, hi: 1, pow: .8, seed: 13, reveal: rv(0, 3.2, (x, y) => 1 - y / 800) });
  S.tCastle = castle(980, 690, 1.28, 31, rv(.5, 3.4, (x, y) => (y - 150) / 600));
  S.tHill = slope(ridge(-300, PW + 300, 760, [[120, 610], [520, 690], [1500, 680], [1900, 610]], 12), 12, { reveal: rv(1, 3, K), sp: 15 });
  const bx = 500, by = 800;
  const hall = [[0, 0], [0, -120], [90, -170], [90, -120], [180, -170], [180, -120], [270, -170], [270, -120], [360, -170], [360, -120], [450, -170], [450, -120], [640, -120], [640, -196], [860, -196], [860, 0]];
  S.tHall = WC.shape([at(hall, bx, by)], { white: true, light: WC.light(-.6, -.6, .55), sp: 9, wmax: 4, halo: 0, R: 30, amb: .3, seed: 40, seg: [40, 120], reveal: rv(2.2, 4, (x, y) => (x - bx) / 860) });
  S.tHallLine = WC.cutAlong(at(hall, bx, by), { closed: true, w: 5, kind: 'v', seg: [80, 220], seed: 41 });
  S.tDoors = [0, 1, 2, 3].flatMap(i => WC.cutAlong(WC.rect(bx + 668 + i * 46, by - 92, 34, 92), { closed: true, w: 2.4, kind: 'k', seg: [40, 90], seed: 50 + i, reveal: { t0: 3.6, t1: 4.2, speed: 600 } }));
  S.tWin = Array.from({ length: 7 }, (_, i) => WC.cutAlong([[bx + 40 + i * 78, by - 74], [bx + 84 + i * 78, by - 74]], { w: 9, kind: 'u', seg: [40, 60], seed: 60 + i, reveal: { t0: 3.4 + i * .05, t1: 3.9, speed: 300 } }));
  S.tRoad = WC.hatch(new WC.Region([WC.rect(-20, 790, PW + 40, 200)], { res: 4 }), { dir: () => .02, tone: (x, y) => .15 + .55 * seg(y, 790, 930), sp: 13, wmax: 9, lo: .05, hi: 1, kind: 'u', seg: [80, 240], gap: [8, 30], seed: 71, reveal: rv(1.6, 3.4, K) });
  // --- besi: tepede hayvanlar
  S.bSky = sky(-20, PW + 20, 0, 480, { low: .08, hi: .7, pow: 1.3, seed: 17 });
  const rg = mulberry(19), gr = []; for (let i = 0; i < 260; i++) { const x = rg() * PW, y = 490 + rg() ** 1.5 * 430; const L = 18 + 46 * seg(y, 490, 900); gr.push(WC.mkStroke([[x, y], [x + L * .5, y - 1], [x + L, y + (rg() - .5) * 3]], [1.5, 3 + 3 * seg(y, 490, 900), 1], { kind: 'v', seed: i, chip: .1 })); }
  S.bGrass = gr;
  S.bLine = ridge(-40, PW + 40, 1000, [[0, 500], [460, 462], [1050, 490], [1500, 450], [1888, 482]], 19, 5);
  const cowCP = [[0, 96], [6, 74], [28, 60], [32, 34], [48, 52], [76, 54], [130, 44], [250, 46], [330, 48], [372, 60], [386, 102], [382, 152], [376, 200], [380, 262], [352, 262], [344, 206], [318, 176], [230, 188], [150, 182], [128, 204], [130, 262], [102, 262], [94, 202], [84, 164], [68, 128], [44, 120], [14, 120]];
  const mkCow = (x, y, s, flip, seed, patches) => {
    const Q = at(cowCP, x, y, s, flip);
    const pr = mulberry(seed + 5); const pt = patches.map(([px, py, rx, ry, a]) => { const cx0 = x + (flip ? -px : px) * s, cy0 = y + py * s, A = [], ph = pr() * 6; for (let i = 0; i < 26; i++) { const th = i / 26 * 6.283, k = 1 + .26 * Math.sin(th * 3 + ph) + .15 * Math.sin(th * 5 + ph * 2); A.push([cx0 + Math.cos(th + a) * rx * s * k, cy0 + Math.sin(th + a) * ry * s * k]); } return A; });
    return { pt, Q };
  };
  S.cows = [
    mkCow(1420, 470, .86, false, 82, [[210, 90, 44, 30, .4]]),
    mkCow(760, 470, 1.1, true, 81, [[140, 96, 50, 30, .3], [300, 86, 30, 30, 0]]),
    mkCow(830, 418, 1.5, false, 80, [[150, 90, 40, 34, .2], [270, 100, 46, 36, .9], [60, 76, 16, 12, 0]]),
  ];
  // --- kesim kapasitesi: 400 çentik (10 sıra × 40)
  const rt = mulberry(44); S.tally = [];
  for (let r = 0; r < 10; r++) for (let k = 0; k < 40; k++) {
    const x = 150 + k * 40 + (rt() - .5) * 5, y = 180 + r * 58 + (rt() - .5) * 5, i = r * 40 + k;
    const s = WC.mkStroke([[x, y], [x + (rt() - .5) * 5, y + 22], [x + (rt() - .5) * 5, y + 42]], [8 + rt() * 3, 7, 3], { kind: 'v', seed: i, chip: .2 });
    const u = i / 400; s.t0 = .15 + 2.4 * (u ** .75); s.dur = .07; S.tally.push(s);
  }
  // --- soğuk hava: kapı ve kırağı
  const dx = 640, dy = 90, dw = 570, dh = 800;
  S.cWall = WC.hatch(new WC.Region([WC.rect(-60, -60, PW + 120, PH + 120)], { res: 4 }), { dir: () => 1.57, tone: (x) => .1 + .12 * Math.abs(Math.sin(x * .007)), sp: 42, wmax: 3, lo: .05, hi: 1, kind: 'k', seg: [200, 500], gap: [8, 30], seed: 91 });
  S.cDoor = WC.shape([WC.rect(dx, dy, dw, dh)], { fill: true, sp: 11, wmax: 8, halo: 6, seed: 92, seg: [80, 260], gap: [10, 30], dir: 1.57, tone: () => (x, y) => .32 + .32 * Math.sin((x - dx) / dw * Math.PI) });
  S.cFrame = WC.cutAlong(WC.rect(dx + 36, dy + 36, dw - 72, dh - 72), { closed: true, w: 5, kind: 'v', seg: [90, 220], seed: 93 });
  S.cHinge = [160, 620].map((y, i) => WC.shape([WC.rect(dx - 34, dy + y, 72, 62)], { white: true, sp: 9, seed: 94 + i, R: 18, halo: 0, light: WC.light(-.5, -.5, .6) }));
  S.cLever = WC.shape([[[dx + dw - 120, dy + 390], [dx + dw - 26, dy + 390], [dx + dw - 26, dy + 442], [dx + dw - 120, dy + 442]]], { white: true, sp: 8, seed: 96, R: 16, halo: 0, light: WC.light(-.5, -.5, .6) });
  const rf = mulberry(61), fr = []; for (let i = 0; i < 1500; i++) { const edge = rf(); const ang = rf() * 6.28, R = 300 + rf() * 620; const x = dx + dw / 2 + Math.cos(ang) * R * 1.1, y = dy + dh / 2 + Math.sin(ang) * R * .7; if (x > dx - 8 && x < dx + dw + 8 && y > dy - 8 && y < dy + dh + 8) continue; fr.push([x, y, 2.5 + edge * 5]); }
  S.frost = WC.flecks(fr, { seed: 61 }); S.frost.forEach((s, i) => { s.t0 = .1 + 2.6 * (i / S.frost.length); s.dur = .12; });
  // --- araç (sağa gider)
  const ax = 760, ay = 700;
  const box = [[-420, -196], [90, -196], [90, -42], [-420, -42]];
  const cabT = [[100, -160], [176, -160], [226, -100], [244, -92], [244, -42], [100, -42]];
  const TS = 1.32; S.truck = [box, cabT].map((Q, i) => WC.shape([at(Q, ax, ay, TS)], { light: WC.light(.45, -.8, .4), sp: 7, wmax: 7, halo: 4, R: 34, amb: .03, seed: 100 + i, seg: [50, 170], dir: 0 }));
  S.tWinS = [WC.rect(ax + 140 * TS, ay - 146 * TS, 52 * TS, 42 * TS)];
  S.tSnow = (() => { const c0 = [ax - 165 * TS, ay - 120 * TS], A = []; for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; A.push(WC.mkStroke([[c0[0] - Math.cos(a) * 62, c0[1] - Math.sin(a) * 62], c0, [c0[0] + Math.cos(a) * 62, c0[1] + Math.sin(a) * 62]], 9, { kind: 'v', seed: i + 3, chip: .1 })); } return A; })();
  S.aSky = sky(-100, PW + 100, 0, 620, { low: .4, hi: 1, pow: .9, seed: 23, sp: 16 });
  S.aFar = slope(ridge(-200, 4200, 700, [[0, 540], [520, 480], [980, 550], [1500, 470], [2100, 560], [2700, 490], [3300, 560], [3900, 500]], 24), 24, { sp: 16, wmax: 6 });
  S.aRoad = WC.shape([[[-300, 690], [5000, 690], [5000, 960], [-300, 960]]], { sp: 13, wmax: 8, dir: 0, seed: 25, seg: [70, 220], gap: [10, 40], halo: 0, tone: () => (x, y) => .12 + .4 * seg(y, 690, 930) });
  // --- son plaka
  S.eHill = slope(ridge(-100, PW + 100, 980, [[0, 770], [420, 830], [1300, 820], [1848, 760]], 33), 33, { sp: 15, wmax: 8 });
  S.eCastle = castle(1040, 820, 1.62, 34);
  S.sun = [1040, 400];
  S.eRays = WC.rays(1040, 400, { n: 96, r0: 150, r1: [560, 1180], w: 15, seed: 35, jit: .5, bend: .04, reveal: { t0: .25, t1: 3.2, jit: .35 } });
  S.eDisc = WC.ellipse(1040, 400, 150, 150, 72);
}

// ---------- oyma yazı (ayna seçeneği, soldan sağa açılır)
function carvedText(g, txt, font, x, y, u, mirror) {
  g.save(); g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff';
  const w = g.measureText(txt).width;
  g.beginPath(); const dir = mirror ? -1 : 1;
  g.rect(mirror ? x + w / 2 - (w + 40) * u : x - w / 2 - 20, y - 300, (w + 40) * u, 600); g.clip();
  g.translate(x, y); if (mirror) g.scale(-1, 1);
  g.fillText(txt, 0, 0); g.restore();
}

// ---------- plakalar: her biri (t yerel) çizer ve baskı seçeneklerini döndürür
const shots = {
  blok(t) {
    begin({ z: 1.0 + .04 * ss(seg(t, 0, 4.17)) });
    carvedText(m, '1955', '400 330px Fraunces', PW / 2, PH / 2, seg(t, .4, 2.6), false);
    end();
    return { mode: 'block', seed: 3, sheen: .22, wetX: t > 2.8 ? lerp(-.1, 1.1, seg(t, 2.8, 3.4)) : -1 };
  },
  tren(t) {
    begin();
    const v = 165, off = t * v;
    WC.drawStrokes(m, S.trainSky, { t: 1e9 });
    m.save(); m.translate(-((off * .08) % 1600), 0); WC.drawStrokes(m, S.stars); m.restore();
    m.save(); m.translate(-((off * .22) % 1400), 0); S.farHill.draw(m); m.restore();
    m.save(); m.translate(-(off % 600) * 0, 0); S.ground.draw(m); m.restore();
    // ray ve traversler
    m.fillStyle = '#fff'; m.fillRect(-20, 690, PW + 40, 5);
    for (let i = -1; i < 50; i++) { const x = i * 44 + (off % 44); m.fillRect(x, 700, 22, 7); }
    const sway = Math.sin(Math.floor(t * 12) * 1.7) * 1.2, TK = 1.38, cx0 = 1040;
    m.save(); m.translate(cx0, 690 + sway); m.scale(TK, TK); m.translate(-cx0, -690);
    // duman: fenerin ters yönünde, trenin üstünden geriye süzülür
    const tk0 = Math.floor(t * 12) / 12; m.strokeStyle = '#fff'; m.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const u = ((tk0 * .34 + i / 9) % 1), px = 670 + u * 760, py = 470 - 90 * Math.sqrt(u) + Math.sin(i * 2.1 + u * 4) * 10, rr = 14 + 44 * u; m.lineWidth = 5 - 3 * u; m.beginPath(); m.arc(px, py, rr, 2.6 + i, 5.6 + i); m.stroke(); m.beginPath(); m.arc(px + rr * .7, py + 6, rr * .6, 3.4 + i, 6.2 + i); m.stroke(); }
    for (const sh of S.train) sh.draw(m);
    for (const r of S.ribs) WC.drawStrokes(m, r);
    WC.fillPoly(m, S.cab, '#fff');
    m.fillStyle = '#000'; m.fillRect(620 + 226 + 24, 690 - 168, 3, 48);
    const tk = Math.floor(t * 12) / 12;
    for (const cx of [662, 732, 802, 892, 1000, 1180, 1314, 1494]) wheel(cx, 690 - 26, 26, tk * v / 26);
    m.restore();
    // fener: tek renk, tek ışık
    const lx = cx0 + (626 - cx0) * TK, ly = 690 + sway - 100 * TK;
    WC.drawStrokes(m, lampRays(lx, Math.round(ly)));
    c.fillStyle = '#000'; c.globalAlpha = 1; c.beginPath(); c.moveTo(lx + 30, ly - 30); c.lineTo(-40, ly - 170); c.lineTo(-40, ly + 150); c.lineTo(lx + 30, ly + 30); c.closePath(); c.fill();
    m.fillStyle = '#fff'; m.beginPath(); m.arc(lx, ly, 16, 0, 6.3); m.fill();
    end(); caption(tGlobal);
    return { seed: 7, inkSeed: 7, plate: COPPER };
  },
  tesis(t) {
    begin({ x: PW / 2, y: PH / 2 + 80 * (1 - ss(seg(t, 0, 4.4))), z: lerp(1.42, 1, eio(seg(t, 0, 4.6))) });
    WC.drawStrokes(m, S.tSky, { t });
    S.tCastle.draw(m, t); S.tHill.draw(m, t); 
    WC.drawStrokes(m, S.tRoad, { t });
    S.tHall.draw(m, t);
    WC.drawStrokes(m, S.tHallLine, { t, color: t > 2.6 ? '#000' : '#000' });
    WC.drawStrokes(m, S.tDoors, { t, color: '#000' });
    for (const d of S.tWin) WC.drawStrokes(m, d, { t, color: '#000' });
    end(); caption(tGlobal);
    return { seed: 11, inkSeed: 11 };
  },
  besi(t) {
    begin(); WC.drawStrokes(m, S.bSky);
    WC.fillPoly(m, [S.bLine], '#fff'); WC.drawStrokes(m, S.bGrass, { color: '#000' });
    for (const k of S.cows) {
      WC.fillPoly(m, [k.Q], '#000');
      for (const p of k.pt) { m.fillStyle = '#fff'; m.save(); m.beginPath(); WC.pathOf(m, k.Q); m.clip(); m.beginPath(); WC.pathOf(m, p); m.fill(); m.restore(); }
    }
    end(); caption(tGlobal); return { seed: 13, inkSeed: 13, reg: jolt(t) };
  },
  kesim(t) {
    const zz = lerp(1.5, 1, eo(seg(t, 0, .22)));
    begin({ z: zz }); WC.drawStrokes(m, S.tally, { t }); end(); caption(tGlobal);
    return { seed: 17, inkSeed: 17, reg: jolt(t) };
  },
  soguk(t) {
    begin({ z: 1 + .05 * seg(t, 0, 3.33), y: PH / 2 + 8 });
    WC.drawStrokes(m, S.cWall); WC.drawStrokes(m, S.frost, { t });
    S.cDoor.draw(m); WC.drawStrokes(m, S.cFrame);
    for (const h of S.cHinge) h.draw(m); S.cLever.draw(m);
    end(); caption(tGlobal); return { seed: 19, inkSeed: 19, reg: jolt(t) };
  },
  arac(t) {
    begin();
    const v = 230, off = t * v;
    WC.drawStrokes(m, S.aSky);
    m.save(); m.translate(-off * .2, 0); S.aFar.draw(m); m.restore();
    S.aRoad.draw(m);
    m.fillStyle = '#fff'; for (let i = -2; i < 16; i++) { const x = i * 170 - (off % 170); m.fillRect(x, 782, 96, 7); }
    m.fillStyle = '#fff'; m.fillRect(-20, 690, PW + 40, 3);
    const b = Math.sin(Math.floor(t * 12) * 2.1) * 1.4;
    m.save(); m.translate(0, b); for (const s of S.truck) s.draw(m);
    WC.fillPoly(m, S.tWinS, '#fff'); WC.drawStrokes(m, S.tSnow); m.restore();
    const tk = Math.floor(t * 12) / 12; for (const cx of [760 - 310 * 1.32, 760 - 215 * 1.32, 760 + 170 * 1.32]) wheel(cx, 700 - 30, 42, -tk * v / 42);
    end(); caption(tGlobal); return { seed: 23, inkSeed: 23, reg: jolt(t) };
  },
  isim(t) {
    begin();
    carvedText(m, 'Fatih Mühsürler', '400 188px Fraunces', PW / 2, PH / 2, seg(t, .1, 2.0), false);
    end();
    return { mode: 'block', seed: 29, sheen: .22, wetX: t > 2.5 ? lerp(-.1, 1.1, seg(t, 2.5, 2.9)) : -1 };
  },
  son(t) {
    begin();
    WC.drawStrokes(m, S.eRays, { t });
    m.fillStyle = '#fff'; m.beginPath(); WC.pathOf(m, S.eDisc); m.fill();
    const a = ss(seg(t, .2, 3.2));
    c.fillStyle = '#000'; c.globalAlpha = 1;
    c.beginPath(); c.arc(1040, 400, 150 + a * 1240, 0, 6.3); c.fill();
    S.eCastle.draw(m); S.eHill.draw(m);
    m.fillStyle = '#000'; m.fillRect(0, 0, 900, 276); m.fillStyle = '#fff'; m.fillRect(0, 270, 900, 5); m.fillRect(895, 0, 5, 275); c.clearRect(0, 0, 900, 276);
    carvedText(m, 'Fatih Mühsürler', '400 104px Fraunces', 450, 104, 1, false);
    m.font = 'italic 400 54px Fraunces'; m.fillStyle = '#fff'; m.textAlign = 'center'; m.textBaseline = 'middle'; m.fillText('Et Entegre Tesisleri', 450, 196);
    end(); caption(tGlobal);
    return { seed: 31, inkSeed: 31, plate: COPPER };
  },
};
function jolt(t) { return t < 1 / 24 ? [8, -4] : t < 2 / 24 ? [-3, 2] : [3, 2]; }
function wheel(cx, cy, r, a) {
  m.save(); m.strokeStyle = '#fff'; m.fillStyle = '#000'; m.lineWidth = 4;
  m.beginPath(); m.arc(cx, cy, r + 3, 0, 6.3); m.fill(); m.stroke();
  m.lineWidth = 3.2; for (let i = 0; i < 4; i++) { const b = a + i * Math.PI / 4; m.beginPath(); m.moveTo(cx - Math.cos(b) * r, cy - Math.sin(b) * r); m.lineTo(cx + Math.cos(b) * r, cy + Math.sin(b) * r); m.stroke(); }
  m.restore();
}
let _lamp = null;
function lampRays(lx, ly) { return _lamp || (_lamp = WC.rays(lx, ly, { n: 26, r0: 26, r1: [240, 600], w: 12, seed: 3, jit: .5, a0: Math.PI - .25, a1: Math.PI + .25 })); }

// ---------- akış
const TL = { order: ['blok', 'tren', 'tesis', 'besi', 'kesim', 'soguk', 'arac', 'isim', 'son'], t: [0, 4.17, 11.67, 17.5, 20.83, 24.17, 27.5, 31.67, 35, 43] };
const PEEL = [{ at: 4.17, d: .84 }, { at: 11.67, d: .67 }, { at: 35, d: .84 }];
let tGlobal = 0;
function draw(i, t, tg) { tGlobal = tg; const o = shots[TL.order[i]](t); return P.render(M, C, o); }

export async function init() {
  P = WC.makePrinter(W, H); build();
  const ev = (t, type, x = {}) => EV.push({ t, type, ...x });
  ev(0, 'drum'); ev(.4, 'carve', { d: 2.2 }); ev(2.8, 'brayer'); ev(3.33, 'peel', { d: .84 });
  ev(10.83, 'peel', { d: .84 }); ev(11.8, 'carve', { d: 4 });
  for (const t of [17.5, 20.83, 24.17, 27.5]) ev(t, 'cut');
  ev(21, 'tally', { d: 2.5 }); ev(24.3, 'frost', { d: 2.8 });
  ev(31.8, 'carve', { d: 1.9 }); ev(34.16, 'peel', { d: .84 }); ev(35, 'sun');
}

export function render(g, t) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  let i = TL.t.findIndex((a, k) => t >= a && t < TL.t[k + 1]); if (i < 0) i = TL.order.length - 1;
  const p = PEEL.find(p => t >= p.at - p.d && t < p.at);
  if (p) {
    const cur = TL.t.findIndex(a => Math.abs(a - p.at) < .001) - 1, nx = cur + 1;
    ba.drawImage(draw(nx, 0.0001, p.at + .01), 0, 0);
    bb.drawImage(draw(cur, t - TL.t[cur], t), 0, 0);
    bd.fillStyle = '#EFE8D8'; bd.fillRect(0, 0, W, H);
    g.drawImage(BA, 0, 0);
    const { xf, r } = peelState((t - (p.at - p.d)) / p.d);
    curl(g, BB, BD, xf, r);
    return;
  }
  g.drawImage(draw(i, t - TL.t[i], t), 0, 0);
}
