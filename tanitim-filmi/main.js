// Bir Aile Mesleği: giriş
const cv = document.getElementById('cv'), g = cv.getContext('2d');
await Promise.all(['400 40px Fraunces', 'italic 400 40px Fraunces'].map(f => document.fonts.load(f, 'Fatih Mühsürler ğışİ')));
const m = await import('./film.js');
await m.init();
window.DUR = m.DUR; window.EV = m.EV; window.TEXTS = m.TEXTS;
window.render = t => m.render(g, t);
window.READY = true;
