/* neon-scroll.js
   Lightweight scroll-driven 3D neon lighting background.
   - Creates or uses .neon-bg container
   - Adds layered elements with depth and updates transforms on scroll
   - Respects prefers-reduced-motion
*/

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layersSpec = [
    { cls: 'neon-layer--a', depth: 0.18, scale: 1.06, pulse: true, gx: '40%', gy: '30%' },
    { cls: 'neon-layer--b', depth: 0.36, scale: 1.12, pulse: true, gx: '70%', gy: '70%' },
    { cls: 'neon-layer--c', depth: 0.66, scale: 1.18, pulse: false, gx: '25%', gy: '70%' },
    { cls: 'neon-layer--d', depth: 1.1,  scale: 1.28, pulse: false, gx: '85%', gy: '30%' },
    // band for subtle vertical overlay
    { cls: 'neon-layer--band', depth: 0.9, scale: 1.02, pulse: false, gx: '50%', gy: '50%' }
  ];

  function createNeonBg() {
    let container = document.querySelector('.neon-bg');
    if (!container) {
      container = document.createElement('div');
      container.className = 'neon-bg neon-bg-behind';
      container.setAttribute('aria-hidden', 'true');
      // insert as first child of body so it sits under content
      document.body.insertBefore(container, document.body.firstChild);
    }
    // Clear any existing children
    container.innerHTML = '';

    layersSpec.forEach((spec, i) => {
      const el = document.createElement('div');
      el.className = `neon-layer ${spec.cls}`;
      el.dataset.depth = String(spec.depth);
      el.dataset.scale = String(spec.scale);
      el.dataset.gx = spec.gx;
      el.dataset.gy = spec.gy;
      if (spec.pulse && !reduced) el.classList.add('pulse');
      // set CSS variables for gradient position
      el.style.setProperty('--gx', spec.gx);
      el.style.setProperty('--gy', spec.gy);
      // set z-depth var for transform origin hint
      el.style.setProperty('--layer-z', String(i * 60));
      container.appendChild(el);
    });

    // mark JS-ready
    container.classList.add('js-ready');
    return container;
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function init() {
    const container = createNeonBg();
    const layers = Array.from(container.querySelectorAll('.neon-layer'));
    if (layers.length === 0) return;

    // store geometry
    let viewportH = window.innerHeight;
    let docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    function refreshSizes() {
      viewportH = window.innerHeight;
      docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    window.addEventListener('resize', refreshSizes, { passive: true });

    // For smoother animation, use RAF loop
    let lastScrollY = window.scrollY || window.pageYOffset;
    let ticking = false;

    function onScroll() {
      lastScrollY = window.scrollY || window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(update);
      }
      ticking = true;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Also update on orientationchange / load
    window.addEventListener('orientationchange', refreshSizes, { passive: true });

    // compute center offset for mild horizontal parallax
    function getScrollProgress() {
      const maxScroll = Math.max(1, docH - viewportH);
      return clamp(lastScrollY / maxScroll, 0, 1);
    }

    // Primary update: update each layer transform based on depth and progress
    function update() {
      const progress = getScrollProgress(); // 0..1
      const centerY = viewportH / 2;
      const midProgress = (progress - 0.5) * 2; // -1 .. 1
      const tilt = midProgress * 6; // degrees tilt range

      layers.forEach((layer, idx) => {
        const depth = parseFloat(layer.dataset.depth || 0.4);
        const scale = parseFloat(layer.dataset.scale || 1.06);
        // vertical movement
        const translateY = (progress * depth * viewportH * 0.6) * -1; // negative so neon rises as you scroll
        // slight horizontal wobble based on sinus
        const translateX = Math.sin(progress * Math.PI * (1 + idx * 0.18)) * (30 * depth);
        // Z translation gives depth feel (not real 3D but with perspective it works)
        const translateZ = -depth * 120;
        // small rotation about X to enhance 3D perception
        const rotateX = tilt * depth * 0.45;
        // apply transform using translate3d (GPU accelerated)
        // Note: we use scale to emphasize depth for farther layers
        const t = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale})`;
        layer.style.transform = t;

        // subtly vary opacity by depth and progress
        const baseOpacity = 0.9 - (depth * 0.18);
        const opacity = clamp(baseOpacity + Math.sin(progress * Math.PI + idx) * 0.08, 0.25, 1.0);
        layer.style.opacity = String(opacity);

        // update gradient focal points for subtle motion (via CSS vars)
        // move the gradient focal slightly based on progress to make glow flow
        const gx = parseFloat(layer.dataset.gx) || 50;
        const gy = parseFloat(layer.dataset.gy) || 50;
        // if dataset.gx is percentage string, parseFloat will return number
        const kx = (gx + (midProgress * depth * 10)) + '%';
        const ky = (gy + (Math.cos(progress * Math.PI * (1 + idx * 0.36)) * depth * 6)) + '%';
        layer.style.setProperty('--gx', kx);
        layer.style.setProperty('--gy', ky);

        // lighten or darken filter slightly to keep contrast
        const blur =  (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--neon-blur')) || 36) * (1 - depth * 0.28);
        layer.style.filter = `saturate(120%) blur(${blur.toFixed(1)}px)`;
      });

      ticking = false;
    }

    // initial update
    refreshSizes();
    update();

    // Make sure we update at least occasionally to handle dynamic content
    let heartbeat = 0;
    setInterval(() => {
      heartbeat++;
      if (heartbeat % 10 === 0) {
        refreshSizes();
        update();
      }
    }, 1000 * 6);

    // expose a small API in case you need programmatic control
    window.QCNeon = {
      refresh: () => { refreshSizes(); update(); },
      destroy: () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', refreshSizes);
        if (container.parentNode) container.parentNode.removeChild(container);
      }
    };
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();