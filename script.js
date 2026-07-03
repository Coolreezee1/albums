// ===== Falling leaves (signature ambient element) =====
(function fallingLeaves() {
  const canvas = document.getElementById('leaves');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, leaves, reduced;
  const colors = ['#FF7A59', '#FFB347', '#E85D3D', '#FFC98A'];

  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function leafPath(ctx, size) {
    // simple 4-point maple-ish leaf silhouette
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.quadraticCurveTo(size * 0.9, -size * 0.3, size * 0.15, 0);
    ctx.quadraticCurveTo(size * 0.9, size * 0.3, 0, size);
    ctx.quadraticCurveTo(-size * 0.9, size * 0.3, -size * 0.15, 0);
    ctx.quadraticCurveTo(-size * 0.9, -size * 0.3, 0, -size);
    ctx.closePath();
  }

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = reduced ? 10 : Math.max(14, Math.floor((w * h) / 42000));
    leaves = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 7 + 6,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.01,
      fall: Math.random() * 0.25 + 0.12,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.012 + 0.006,
      swayAmp: Math.random() * 18 + 8,
      alpha: Math.random() * 0.35 + 0.45,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const l of leaves) {
      const sx = l.x + Math.sin(t * l.swaySpeed + l.sway) * l.swayAmp;
      ctx.save();
      ctx.translate(sx, l.y);
      ctx.rotate(l.rot);
      ctx.globalAlpha = l.alpha;
      ctx.fillStyle = l.color;
      leafPath(ctx, l.size);
      ctx.fill();
      ctx.restore();

      if (!reduced) {
        l.y += l.fall;
        l.rot += l.spin;
        if (l.y > h + 20) {
          l.y = -20;
          l.x = Math.random() * w;
        }
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
