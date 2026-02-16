// mouse-effects-aesthetic.js
// Ultra-aesthetic trailing orbs + layered click blooms
// - Dual-canvas approach: main canvas (sharp particles) + glow canvas (blurred bloom)
// - Smooth orbital trail, soft glow, radial rings on click, tiny DOM gloss bubbles
// - Respect prefers-reduced-motion (automatically simplifies)
// - Exposes window.QCMouseEffects API: createBurstAt(x,y,opts), enable(), disable(), destroyAll()
//
// Usage: <script src="mouse-effects-aesthetic.js" defer></script>

(function () {
  'use strict';

  // ----- Configuration -----
  const CFG = {
    trail: {
      length: 22,
      baseSize: 10,
      sizeDecay: 0.86,
      followLerp: 0.20,
      hueSpeed: 0.45,
      saturation: 82,
      lightness: 58,
      alpha: 0.95
    },
    spark: {
      count: 18,
      speedMin: 2.8,
      speedMax: 7.6,
      friction: 0.986,
      gravity: 0.028,
      life: 920
    },
    bloom: {
      domCount: 10,         // small DOM glossy mini-bubbles
      domMin: 6,
      domMax: 26,
      domLife: 820,
      ringCount: 2,         // concentric rings on click
      ringLife: 720,
      ringMaxRadius: 160
    },
    glow: {
      blur: 18,             // glow canvas blur applied via shadowBlur/shadowColor
      opacity: 0.92
    },
    zIndex: 2147483000,
    performance: {
      maxFPS: 60
    }
  };

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ----- Utility -----
  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const now = () => performance.now();

  const PALETTE = [
    '#FF6B6B','#FF9A6B','#FFD36B','#9AE66B','#6BD2FF','#6B8CFF','#C86BFF','#FF6BD1'
  ];

  // ----- Styles for DOM bubbles -----
  const style = document.createElement('style');
  style.id = 'qc-mousefx-aesthetic-style';
  style.textContent = `
  .qc-gloss-bubble {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    z-index: ${CFG.zIndex};
    mix-blend-mode: screen;
    will-change: transform, opacity;
    box-shadow: 0 8px 28px rgba(2,6,23,0.28);
    transform-origin: center center;
    isolation: isolate;
    backdrop-filter: blur(0px);
  }
  @keyframes qc-gloss-pop {
    0% { transform: scale(0.08) translateY(0); opacity: 0; }
    40% { transform: scale(1.06) translateY(-6px); opacity: 1; }
    100% { transform: scale(1) translateY(-12px); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .qc-gloss-bubble { animation: none !important; transition: none !important; opacity: 0.9 !important; }
  }
  `;
  document.head.appendChild(style);

  // ----- Create canvases -----
  const canvasMain = document.createElement('canvas');
  const canvasGlow = document.createElement('canvas');

  [canvasGlow, canvasMain].forEach((c) => {
    c.style.position = 'fixed';
    c.style.left = '0';
    c.style.top = '0';
    c.style.width = '100%';
    c.style.height = '100%';
    c.style.pointerEvents = 'none';
    c.style.zIndex = String(CFG.zIndex);
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
  });

  const ctxGlow = canvasGlow.getContext('2d', { alpha: true });
  const ctxMain = canvasMain.getContext('2d', { alpha: true });

  function resize() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    [canvasGlow, canvasMain].forEach(c => {
      c.width = Math.round(innerWidth * dpr);
      c.height = Math.round(innerHeight * dpr);
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      const ctx = c === canvasGlow ? ctxGlow : ctxMain;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // ----- Trail state -----
  const trail = {
    points: Array.from({ length: CFG.trail.length }, () => ({ x: innerWidth / 2, y: innerHeight / 2 })),
    hue: Math.random() * 360
  };

  // ----- Particles and rings -----
  const sparks = new Set();
  const rings = new Set();

  // ----- Pointer state -----
  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let isDown = false;

  // ----- Event handlers -----
  function onMove(e) {
    const p = (e.touches && e.touches[0]) ? e.touches[0] : e;
    mouseX = p.clientX;
    mouseY = p.clientY;
  }

  function onDown(e) {
    isDown = true;
    const p = (e.touches && e.touches[0]) ? e.touches[0] : e;
    createAestheticBurst(p.clientX, p.clientY);
  }

  function onUp() { isDown = false; }

  // ----- Spawn sparks (canvas) -----
  function spawnSparks(x, y, count = CFG.spark.count) {
    if (REDUCED) return;
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(CFG.spark.speedMin, CFG.spark.speedMax);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed * (0.8 + Math.random() * 0.6) - rand(0.8, 2.4);
      const p = {
        x: x + rand(-6, 6),
        y: y + rand(-6, 6),
        vx, vy,
        size: rand(1.6, 5.6),
        hue: (trail.hue + rand(-32, 32)) % 360,
        birth: now(),
        life: CFG.spark.life * (0.9 + Math.random() * 0.6),
        alpha: 1
      };
      sparks.add(p);
    }
  }

  // ----- Spawn rings (canvas) -----
  function spawnRings(x, y, opts = {}) {
    if (REDUCED) return;
    const count = opts.count || CFG.bloom.ringCount;
    for (let i = 0; i < count; i++) {
      const ring = {
        x, y,
        radius: 8 + i * 8,
        maxRadius: CFG.bloom.ringMaxRadius * (0.8 + Math.random() * 0.5),
        width: 2 + i,
        hue: (trail.hue + i * 18 + rand(-8, 8)) % 360,
        birth: now(),
        life: CFG.bloom.ringLife * (0.85 + Math.random() * 0.6)
      };
      rings.add(ring);
    }
  }

  // ----- Small DOM glossy bubbles (short-lived, small) -----
  function createGlossBubbles(x, y, count = CFG.bloom.domCount) {
    if (REDUCED) return [];
    const created = [];
    for (let i = 0; i < count; i++) {
      const size = rand(CFG.bloom.domMin, CFG.bloom.domMax); // small sizes
      const el = document.createElement('div');
      el.className = 'qc-gloss-bubble';
      const color = pick(PALETTE);
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = (x - size / 2 + rand(-18, 18)) + 'px';
      el.style.top = (y - size / 2 + rand(-18, 18)) + 'px';
      el.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.92), ${color})`;
      el.style.opacity = '0';
      const delay = rand(0, 90);
      const dur = CFG.bloom.domLife * (0.9 + Math.random() * 0.5);
      el.style.animation = `qc-gloss-pop ${dur}ms cubic-bezier(.18,.9,.28,1) ${delay}ms both`;
      document.body.appendChild(el);
      created.push(el);
      setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, delay + dur + 120);
    }
    // a couple of slightly bigger hero bubbles but still modest
    if (Math.random() < 0.28) {
      const heroCount = randInt(1, 2);
      for (let h = 0; h < heroCount; h++) {
        const size = rand(CFG.bloom.domMax * 0.9, CFG.bloom.domMax * 1.6);
        const el = document.createElement('div');
        el.className = 'qc-gloss-bubble';
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = (x - size / 2 + rand(-26, 26)) + 'px';
        el.style.top = (y - size / 2 + rand(-26, 26)) + 'px';
        const color = pick(PALETTE);
        el.style.background = `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.95), ${color})`;
        el.style.opacity = '0';
        const delay = rand(20, 120);
        const dur = CFG.bloom.domLife * (0.95 + Math.random() * 0.5);
        el.style.animation = `qc-gloss-pop ${dur}ms cubic-bezier(.18,.9,.28,1) ${delay}ms both`;
        document.body.appendChild(el);
        created.push(el);
        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, delay + dur + 160);
      }
    }
    return created;
  }

  // ----- Aesthetic combined burst -----
  function createAestheticBurst(x, y, opts = {}) {
    // spawn ghost sparks on canvas
    spawnSparks(x, y, opts.sparkCount || CFG.spark.count);
    // spawn expanding rings
    spawnRings(x, y, { count: opts.ringCount || CFG.bloom.ringCount });
    // small DOM gloss bubbles
    createGlossBubbles(x, y, opts.domCount || CFG.bloom.domCount);
  }

  // ----- Draw functions -----
  function drawTrail() {
    // trail hue rotation
    trail.hue = (trail.hue + CFG.trail.hueSpeed * 0.9) % 360;
    const pts = trail.points;
    for (let i = pts.length - 1; i > 0; i--) {
      const prev = pts[i - 1];
      const p = pts[i];
      // eased follow with slight lag
      p.x += (prev.x - p.x) * (0.18 + i * 0.003);
      p.y += (prev.y - p.y) * (0.18 + i * 0.003);
    }

    // draw to glow canvas for bloom
    ctxGlow.clearRect(0, 0, canvasGlow.width, canvasGlow.height);
    ctxGlow.globalCompositeOperation = 'lighter';
    ctxGlow.globalAlpha = CFG.glow.opacity;
    ctxGlow.shadowBlur = CFG.glow.blur;
    ctxGlow.shadowColor = 'rgba(255,255,255,0.12)';

    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      const t = i / (pts.length - 1);
      const size = CFG.trail.baseSize * (0.6 + (1 - t) * 1.6);
      const hue = (trail.hue + i * 6) % 360;
      const grd = ctxGlow.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.2);
      const center = `hsla(${hue}, ${CFG.trail.saturation}%, ${CFG.trail.lightness}%, ${CFG.trail.alpha * (0.9 * (1 - t))})`;
      const edge = `hsla(${(hue + 30) % 360}, ${CFG.trail.saturation - 6}%, ${CFG.trail.lightness - 12}%, 0)`;
      grd.addColorStop(0, center);
      grd.addColorStop(0.35, center);
      grd.addColorStop(1, edge);
      ctxGlow.fillStyle = grd;
      ctxGlow.beginPath();
      ctxGlow.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctxGlow.fill();
    }

    // draw sharp particles on main canvas
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
    ctxMain.globalCompositeOperation = 'lighter';
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      const t = i / (pts.length - 1);
      const size = CFG.trail.baseSize * (0.45 + (1 - t) * 1.1);
      const hue = (trail.hue + i * 6) % 360;
      ctxMain.beginPath();
      ctxMain.fillStyle = `hsla(${hue}, ${CFG.trail.saturation}%, ${CFG.trail.lightness}%, ${0.98 * (1 - t)})`;
      ctxMain.arc(p.x, p.y, size * (0.92 + Math.sin(i + now() / 300) * 0.06), 0, Math.PI * 2);
      ctxMain.fill();
    }
  }

  function drawSparksAndRings(ts) {
    // Sparks
    if (sparks.size) {
      sparks.forEach(p => {
        const age = ts - p.birth;
        const prog = age / p.life;
        if (prog >= 1 || p.alpha <= 0.01) {
          sparks.delete(p);
          return;
        }
        // physics
        p.vx *= CFG.spark.friction;
        p.vy *= CFG.spark.friction;
        p.vy += CFG.spark.gravity * (1); // dt normalized
        p.x += p.vx * (1);
        p.y += p.vy * (1);
        p.alpha = Math.max(0, 1 - prog);
        const size = p.size * (0.8 + (1 - prog) * 0.6);
        ctxMain.beginPath();
        ctxMain.fillStyle = `hsla(${p.hue}, 92%, 62%, ${p.alpha})`;
        ctxMain.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctxMain.fill();
      });
    }

    // Rings
    if (rings.size) {
      ctxMain.save();
      rings.forEach(r => {
        const age = ts - r.birth;
        const prog = Math.min(1, age / r.life);
        if (prog >= 1) { rings.delete(r); return; }
        const radius = r.radius + (r.maxRadius - r.radius) * prog;
        const alpha = Math.max(0, 1 - prog);
        ctxMain.beginPath();
        ctxMain.lineWidth = r.width * (1 - prog * 0.66);
        ctxMain.strokeStyle = `hsla(${r.hue}, 92%, 64%, ${0.78 * alpha})`;
        ctxMain.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctxMain.stroke();
      });
      ctxMain.restore();
    }
  }

  // ----- Animation loop -----
  let rafId = null;
  let last = now();

  function loop(ts) {
    const dt = ts - last;
    last = ts;

    // Move head point toward current mouse
    const head = trail.points[0];
    head.x += (mouseX - head.x) * CFG.trail.followLerp;
    head.y += (mouseY - head.y) * CFG.trail.followLerp;

    // propagate following handled in drawTrail
    drawTrail();
    drawSparksAndRings(ts);

    rafId = requestAnimationFrame(loop);
  }

  // ----- Cursor visibility helper (hide when over interactive elements) -----
  function toggleCanvasVisibility(e) {
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    const interactive = ['a', 'button', 'input', 'textarea', 'select', 'label'].includes(tag) || e.target.isContentEditable;
    const opacity = interactive ? '0.0' : '1.0';
    canvasMain.style.opacity = opacity;
    canvasGlow.style.opacity = opacity;
  }

  // ----- Public API & lifecycle -----
  let enabled = true;

  function enable() {
    if (enabled) return;
    enabled = true;
    attach();
    last = now();
    rafId = requestAnimationFrame(loop);
  }

  function disable() {
    if (!enabled) return;
    enabled = false;
    detach();
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
    ctxGlow.clearRect(0, 0, canvasGlow.width, canvasGlow.height);
    sparks.clear();
    rings.clear();
    document.querySelectorAll('.qc-gloss-bubble').forEach(n => n.parentNode && n.parentNode.removeChild(n));
  }

  function destroyAll() {
    disable();
    [canvasGlow, canvasMain].forEach(c => c.parentNode && c.parentNode.removeChild(c));
    if (style.parentNode) style.parentNode.removeChild(style);
    document.querySelectorAll('.qc-gloss-bubble').forEach(n => n.parentNode && n.parentNode.removeChild(n));
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', toggleCanvasVisibility);
  }

  // ----- Attach/detach listeners -----
  function attach() {
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchend', onUp, { passive: true });
    window.addEventListener('mousemove', toggleCanvasVisibility, { passive: true });
    window.addEventListener('mouseover', toggleCanvasVisibility, { passive: true });

    // seed trail to center for smooth initial visuals
    const cx = innerWidth / 2, cy = innerHeight / 2;
    for (let i = 0; i < trail.points.length; i++) {
      trail.points[i].x = cx;
      trail.points[i].y = cy;
    }
  }

  function detach() {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mousedown', onDown);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchstart', onDown);
    window.removeEventListener('touchend', onUp);
    window.removeEventListener('mousemove', toggleCanvasVisibility);
    window.removeEventListener('mouseover', toggleCanvasVisibility);
  }

  // ----- Expose API -----
  window.QCMouseEffects = {
    createBurstAt: createAestheticBurst,
    enable,
    disable,
    destroyAll,
    isReducedMotion: REDUCED
  };

  // ----- Init -----
  function init() {
    if (REDUCED) {
      // minimal static subtle dot for reduced-motion preference
      attach();
      ctxMain.clearRect(0, 0, canvasMain.width, canvasMain.height);
      ctxMain.beginPath();
      ctxMain.fillStyle = 'rgba(255,255,255,0.02)';
      ctxMain.arc(innerWidth / 2, innerHeight / 2, 2, 0, Math.PI * 2);
      ctxMain.fill();
      return;
    }
    attach();
    last = now();
    rafId = requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();