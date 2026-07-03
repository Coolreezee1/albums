// ===== Starfield (signature ambient element) =====
(function starfield() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars, reduced;

  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0015 + 0.0005,
      drift: (Math.random() - 0.5) * 0.02,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const twinkle = reduced ? 1 : Math.sin(t * s.speed + s.phase) * 0.4 + 0.6;
      ctx.beginPath();
      ctx.fillStyle = `rgba(210, 220, 255, ${(s.baseAlpha * twinkle).toFixed(3)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reduced) {
        s.y += s.drift;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

// ===== Feature tabs =====
(function tabs() {
  const buttons = document.querySelectorAll('.tab-list button');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
})();

// ===== Mobile nav =====
(function mobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav.primary');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open-mobile');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// ===== Commands search/filter (commands.html only) =====
(function commandFilter() {
  const input = document.getElementById('cmd-search');
  if (!input) return;
  const chips = document.querySelectorAll('.chip');
  const categories = document.querySelectorAll('.cmd-category');
  const noResults = document.querySelector('.no-results');
  let activeChip = 'all';

  function applyFilter() {
    const q = input.value.trim().toLowerCase();
    let anyVisible = false;

    categories.forEach((cat) => {
      const catName = cat.dataset.category;
      const items = cat.querySelectorAll('.cmd-item');
      let catHasVisible = false;

      items.forEach((item) => {
        const name = item.querySelector('.name').textContent.toLowerCase();
        const desc = item.querySelector('.desc').textContent.toLowerCase();
        const matchesQuery = !q || name.includes(q) || desc.includes(q);
        const matchesChip = activeChip === 'all' || activeChip === catName;
        const show = matchesQuery && matchesChip;
        item.style.display = show ? '' : 'none';
        if (show) catHasVisible = true;
      });

      cat.style.display = catHasVisible ? '' : 'none';
      if (catHasVisible) anyVisible = true;
    });

    noResults.classList.toggle('show', !anyVisible);
  }

  input.addEventListener('input', applyFilter);
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeChip = chip.dataset.filter;
      applyFilter();
    });
  });
})();
