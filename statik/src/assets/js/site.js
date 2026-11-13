/* Fatih Mühsürler — site davranışları */
(() => {
  const EMAIL = 'fatihmuhsurler@hotmail.com';   // [DOĞRULA] form alıcısı
  const PHONE = '0272 246 46 46';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header: kaydırınca koyulaşır, aşağı inerken gizlenir, yukarı çıkınca görünür */
  const header = document.querySelector('.site-header');
  let lastY = 0, ticking = false;
  const update = () => {
    const y = scrollY;
    header.classList.toggle('solid', y > 30);
    header.classList.toggle('hide', y > 500 && y > lastY && !document.body.classList.contains('menu-open'));
    lastY = y;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  requestAnimationFrame(update);

  /* mobil çubuk: ilk ekran geçilince görünür, footer'a gelince çekilir */
  const mbar = document.querySelector('.mbar');
  if (mbar && 'IntersectionObserver' in window) {
    let pastHero = false, atFoot = false;
    const first = document.querySelector('main > section');
    const foot = document.querySelector('.site-footer');
    const bar = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.target === first) pastHero = !e.isIntersecting;
        if (e.target === foot) atFoot = e.isIntersecting;
      });
      mbar.classList.toggle('show', pastHero && !atFoot);
    });
    bar.observe(first);
    bar.observe(foot);
  }

  /* ekran dışındaki sürekli hareketleri durdur */
  if ('IntersectionObserver' in window) {
    const idle = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('paused', !e.isIntersecting)));
    document.querySelectorAll('.marquee, .seal').forEach(el => idle.observe(el));
  }

  /* mobil menü */
  const burger = document.querySelector('.burger');
  const drawer = document.getElementById('mobil-menu');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    drawer.hidden = !open;
    document.querySelectorAll('main, .site-footer, .mbar').forEach(el => { el.inert = open; });
    header.classList.remove('hide');
  };
  burger.addEventListener('click', () => setMenu(drawer.hidden));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) { setMenu(false); burger.focus(); } });

  /* sayaç: rakamlar görünür olunca sayarak yükselir */
  const countUp = el => {
    const end = +el.dataset.count;
    if (reduce || !end) return;
    const start = 0;
    const t0 = performance.now(), dur = 1600;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = start;
    requestAnimationFrame(tick);
  };

  /* görünür olunca beliren öğeler */
  const items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -10% 0px' });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add('in'));

  /* tesis sayfası: yan menüde geçerli adımı işaretle */
  const navLinks = document.querySelectorAll('.step-nav a, .legal-toc a');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const byId = id => [...navLinks].find(a => a.hash === '#' + id);
    const so = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { navLinks.forEach(a => a.classList.remove('on')); byId(e.target.id)?.classList.add('on'); }
    }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.step[id], .legal h2[id]').forEach(s => so.observe(s));
  }

  /* süreç gezgini: sekmeler, ok tuşlarıyla da gezilir */
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = [...root.querySelectorAll('[role=tab]')];
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const select = (i, focus) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select((next + tabs.length) % tabs.length, true);
      });
    });
    panels.forEach((p, j) => { p.hidden = j !== 0; });
  });

  /* fason planlayıcı: baş sayısına göre karkas parçası hesaplar */
  document.querySelectorAll('[data-planner]').forEach(box => {
    const range = box.querySelector('input[type=range]');
    const out = box.querySelector('output');
    const q = box.querySelector('#pl-q');
    const paint = () => {
      const n = +range.value;
      out.textContent = n;
      q.textContent = n * 4;
      range.style.setProperty('--p', `${(n - 1) / 399 * 100}%`);
      range.setAttribute('aria-valuetext', `${n} baş, ${n * 4} parça karkas`);
    };
    range.addEventListener('input', paint);
    box.querySelector('#pl-go').addEventListener('click', () => {
      const f = document.getElementById('f-bas');
      if (f) f.value = range.value;
    });
    paint();
  });

  /* film: yalnızca tıklanınca yüklenir */
  document.querySelectorAll('[data-film]').forEach(box => {
    const video = box.querySelector('video');
    video.controls = false;
    box.querySelector('.film-play').addEventListener('click', () => { video.controls = true; video.play(); video.focus(); });
    video.addEventListener('play', () => box.classList.add('playing'));
    video.addEventListener('ended', () => { box.classList.remove('playing'); video.controls = false; video.load(); });
  });

  /* yıl */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* harita: tıklayınca yükle (Google çerezleri izinsiz yüklenmesin) */
  document.querySelectorAll('[data-map]').forEach(btn => btn.addEventListener('click', () => {
    const box = btn.closest('.map');
    const frame = document.createElement('iframe');
    frame.src = box.dataset.src;
    frame.title = 'Fatih Mühsürler Et Entegre Tesisleri konumu';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    box.querySelector('.map-facade').replaceWith(frame);
  }));

  /* teklif formu: e-posta uygulamasını hazır metinle açar */
  document.querySelectorAll('form[data-quote]').forEach(form => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let first = null;
      form.querySelectorAll('.field-err').forEach(el => el.remove());
      form.querySelectorAll('[aria-invalid]').forEach(f => f.removeAttribute('aria-invalid'));
      form.querySelectorAll('[required]').forEach(f => {
        const v = f.value.trim();
        let msg = '';
        if (!v) msg = f.type === 'tel' ? 'Telefon numaranızı yazın.' : 'Adınızı ve soyadınızı yazın.';
        else if (f.type === 'tel' && v.replace(/\D/g, '').length < 10) msg = 'Telefon numarası eksik görünüyor.';
        if (!msg) return;
        const err = document.createElement('small');
        err.className = 'field-err';
        err.id = `${f.id}-err`;
        err.textContent = msg;
        f.after(err);
        f.setAttribute('aria-invalid', 'true');
        f.setAttribute('aria-describedby', err.id);
        if (!first) first = f;
      });
      if (first) {
        status.textContent = 'Formda düzeltilecek alanlar var.';
        first.focus();
        return;
      }
      const val = n => (form.elements[n]?.value || '').trim();
      const lines = [
        ['Ad soyad', val('ad')], ['Firma', val('firma')], ['Telefon', val('telefon')],
        ['Tahmini baş sayısı', val('bas')], ['Mesaj', val('mesaj')]
      ].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
      const subject = `Teklif talebi${val('firma') ? ' – ' + val('firma') : ''}`;
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      status.textContent = `E-posta uygulamanız açılıyor. Açılmazsa metni kopyalayıp ${EMAIL} adresine gönderebilir ya da ${PHONE} numarasını arayabilirsiniz.`;
      if (navigator.clipboard && !form.querySelector('.form-copy')) {
        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'form-copy';
        copy.textContent = 'Metni kopyala';
        copy.addEventListener('click', async () => {
          await navigator.clipboard.writeText(`${subject}\n\n${lines.join('\n')}`);
          copy.textContent = 'Kopyalandı';
        });
        status.after(copy);
      }
    });
    form.querySelectorAll('[required]').forEach(f => f.addEventListener('input', () => {
      f.removeAttribute('aria-invalid');
      f.removeAttribute('aria-describedby');
      document.getElementById(`${f.id}-err`)?.remove();
    }));
  });

})();
