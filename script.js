








/**
 * script.js — combined original interactions + dark-blue theme enhancements
 * Sidebar (mobile) logic removed per request.
 *
 * - Marquee (JS-driven smooth scroll)
 * - FAQ accordion (ARIA)
 * - Review & Contact AJAX handlers (safe rendering)
 * - Toast helper
 * - MVP small enhancements
 * - Theme runtime enhancements (meta theme color, CTA pulse, marquee glow,
 *   logo animation tuning, hero accent animation, toast theming)
 *
 * Include this file after your page markup and after any CSS has loaded.
 */

(function () {
  'use strict';

  /* ---------- Utilities ---------- */
  function debounce(fn, wait = 120) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }
  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  /* ---------- Toast helper ---------- */
  function createToast(message, opts = {}) {
    const { type = 'info', duration = 3500 } = opts;
    let container = document.getElementById('qc-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'qc-toast-container';
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.className = 'qc-toast qc-toast--' + type;
    el.textContent = message;
    container.appendChild(el);

    // Theme the toast immediately (if theme enhancers exist)
    themeSingleToast(el);

    setTimeout(() => {
      el.style.transition = 'opacity 300ms ease, transform 300ms ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => el.remove(), 320);
    }, duration);
    return el;
  }

  /* ---------- Marquee (JS-driven smooth scroll) ---------- */
  function initMarquee() {
    const marquee = document.querySelector('.logo-marquee');
    if (!marquee) return;
    const track = marquee.querySelector('.marquee-track');
    if (!track) return;

    // Ensure at least two sets (duplicate if only one)
    let sets = Array.from(track.querySelectorAll('.marquee-set'));
    if (sets.length === 0) return;
    if (sets.length === 1) {
      const clone = sets[0].cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
      sets = Array.from(track.querySelectorAll('.marquee-set'));
    }

    // Add logo-img class to images
    track.querySelectorAll('.marquee-item img').forEach(img => {
      if (!img.classList.contains('logo-img')) img.classList.add('logo-img');
    });

    // Animation variables
    let setWidth = sets[0].offsetWidth;
    let pos = 0; // px translated
    let lastTs = null;
    const baseSpeed = 60; // px/sec
    let speed = baseSpeed;
    let running = true;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) running = false;

    function step(ts) {
      if (!lastTs) lastTs = ts;
      const delta = (ts - lastTs) / 1000;
      lastTs = ts;
      if (running) {
        pos += speed * delta;
        if (pos >= setWidth) pos = pos - setWidth;
        track.style.transform = `translateX(${-pos}px)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Pause/resume on hover/focus/touch
    function pause() { running = false; }
    function resume() { if (!reduced) running = true; }

    marquee.addEventListener('mouseenter', pause);
    marquee.addEventListener('mouseleave', resume);
    marquee.addEventListener('touchstart', pause, { passive: true });
    marquee.addEventListener('touchend', resume, { passive: true });
    marquee.addEventListener('focusin', pause);
    marquee.addEventListener('focusout', resume);

    // Recalc width on resize
    window.addEventListener('resize', debounce(() => {
      setWidth = sets[0].offsetWidth || setWidth;
      pos = pos % setWidth;
    }, 150));
  }

  /* ---------- Running symbol micro-interaction ---------- */
  function initRunningSymbol() {
    const logoImg = document.querySelector('.logo img');
    if (!logoImg) return;
    logoImg.addEventListener('mouseenter', () => {
      logoImg.style.transform = 'translateY(-3px) scale(1.04)';
      logoImg.style.boxShadow = '0 12px 28px rgba(78,161,255,0.12)';
    });
    logoImg.addEventListener('mouseleave', () => {
      logoImg.style.transform = '';
      logoImg.style.boxShadow = '';
    });
    logoImg.addEventListener('focus', () => {
      logoImg.style.transform = 'translateY(-3px) scale(1.04)';
    });
    logoImg.addEventListener('blur', () => {
      logoImg.style.transform = '';
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    const qButtons = Array.from(document.querySelectorAll('.faq-question'));
    if (!qButtons.length) return;
    qButtons.forEach(btn => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (panel) panel.hidden = !expanded;

      btn.addEventListener('click', () => {
        const nowExpanded = btn.getAttribute('aria-expanded') === 'true';
        // collapse all
        qButtons.forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(b.getAttribute('aria-controls'));
          if (p) p.hidden = true;
          const che = b.querySelector('.faq-chevron');
          if (che) che.textContent = '▼';
        });
        if (!nowExpanded) {
          btn.setAttribute('aria-expanded', 'true');
          if (panel) panel.hidden = false;
          const che = btn.querySelector('.faq-chevron');
          if (che) che.textContent = '▲';
        }
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  /* ---------- Safe rendering for reviews: prevents XSS ---------- */
  function safeRenderReviews(targetEl, reviews) {
    if (!targetEl) return;
    targetEl.innerHTML = ''; // clear safely; we'll append nodes (not innerHTML)
    const header = document.createElement('h3');
    header.style.fontSize = '1.6rem';
    header.style.marginBottom = '14px';
    header.textContent = 'Recent Reviews';
    targetEl.appendChild(header);

    if (!Array.isArray(reviews) || reviews.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'No reviews yet.';
      targetEl.appendChild(p);
      return;
    }

    reviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.style.marginBottom = '12px';
      card.style.padding = '14px';

      const top = document.createElement('div');
      top.style.display = 'flex';
      top.style.justifyContent = 'space-between';
      top.style.alignItems = 'center';
      top.style.marginBottom = '8px';

      const left = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = r.name || 'Anonymous';
      const email = document.createElement('div');
      email.style.fontSize = '0.9rem';
      email.style.color = 'var(--text)';
      email.textContent = r.email || '';
      left.appendChild(name);
      left.appendChild(email);

      const right = document.createElement('div');
      right.style.color = '#FFD700';
      const rating = Math.max(0, Math.min(5, Number(r.rating) || 0));
      right.textContent = '★'.repeat(rating);

      top.appendChild(left);
      top.appendChild(right);

      const message = document.createElement('p');
      message.style.margin = '0';
      message.style.color = 'var(--text)';
      message.textContent = r.message || '';

      card.appendChild(top);
      card.appendChild(message);
      targetEl.appendChild(card);
    });
  }

  function loadReviews() {
    const target = document.getElementById('reviews-list');
    if (!target) return;
    fetch('get_reviews.php', { credentials: 'same-origin' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then(data => {
        safeRenderReviews(target, data);
      })
      .catch(err => {
        console.error('Error loading reviews:', err);
      });
  }

  /* ---------- Review form handling ---------- */
  function initReviewForm() {
    const form = document.getElementById('review-form');
    if (!form) return;

    const stars = Array.from(form.querySelectorAll('.star-rating span'));
    let selectedRating = 0;
    stars.forEach(s => {
      s.style.cursor = 'pointer';
      s.addEventListener('click', () => {
        selectedRating = Number(s.dataset.value) || 0;
        stars.forEach(ss => {
          ss.style.color = (Number(ss.dataset.value) <= selectedRating) ? '#FFD700' : '#ccc';
        });
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.name && form.name.value || '').trim();
      const email = (form.email && form.email.value || '').trim();
      const message = (form.message && form.message.value || '').trim();
      if (!name || !email || !message || selectedRating === 0) {
        createToast('Please fill out all fields and select a rating!', { type: 'danger' });
        return;
      }
      const body = new URLSearchParams({ name, email, message, rating: String(selectedRating) }).toString();
      fetch('submit_review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          createToast('Review submitted — thank you!', { type: 'info' });
          form.reset();
          stars.forEach(ss => ss.style.color = '#ccc');
          selectedRating = 0;
          loadReviews();
        } else {
          createToast(data.message || 'Failed to submit review.', { type: 'danger' });
        }
      })
      .catch(err => {
        console.error('Error submitting review:', err);
        createToast('Error submitting review.', { type: 'danger' });
      });
    });
  }

  /* ---------- Contact form handling ---------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const msgDiv = document.getElementById('contactMsg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.name && form.name.value || '').trim();
      const email = (form.email && form.email.value || '').trim();
      const phone = (form.phone && form.phone.value || '').trim();
      const subject = (form.subject && form.subject.value || '').trim();
      const message = (form.message && form.message.value || '').trim();
      if (!name || !email || !phone || !subject || !message) {
        if (msgDiv) { msgDiv.textContent = 'Please fill out all fields.'; msgDiv.style.color = 'var(--text)'; }
        else createToast('Please fill out all fields.', { type: 'danger' });
        return;
      }
      const body = new URLSearchParams({ name, email, phone, subject, message }).toString();
      fetch('submit_contact.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          if (msgDiv) { msgDiv.textContent = data.message || 'Message sent!'; msgDiv.style.color = 'var(--success)'; }
          else createToast('Message sent!', { type: 'info' });
          form.reset();
        } else {
          if (msgDiv) { msgDiv.textContent = data.message || 'Failed to send.'; msgDiv.style.color = 'var(--text)'; }
          else createToast(data.message || 'Failed to send contact.', { type: 'danger' });
        }
      })
      .catch(err => {
        console.error('Error submitting contact:', err);
        if (msgDiv) { msgDiv.textContent = 'Error submitting contact. Please try again.'; msgDiv.style.color = 'var(--text)'; }
        else createToast('Error submitting contact.', { type: 'danger' });
      });
    });
  }

  /* ---------- MVP: small enhancement (prevents accidental multi-submits) ---------- */
  function initMVPForm() {
    const form = document.getElementById('mvpForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      // the inline logic on the page will run; disable button briefly to avoid double submits
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        setTimeout(() => btn.disabled = false, 800);
      }
    });
  }

  /* ---------- Theme Runtime Enhancements (merged) ---------- */

  const root = document.documentElement;
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function cssVar(name) {
    try {
      return getComputedStyle(root).getPropertyValue(name).trim() || '';
    } catch (e) {
      return '';
    }
  }

  function safeSetMetaThemeColor(color) {
    try {
      let m = document.querySelector('meta[name="theme-color"]');
      if (!m) {
        m = document.createElement('meta');
        m.name = 'theme-color';
        document.head.appendChild(m);
      }
      m.content = color;
    } catch (e) {
      // ignore best-effort
    }
  }

  function applyMetaThemeColor() {
    const bg = cssVar('--bg') || '#071028';
    safeSetMetaThemeColor(bg);
  }

  function allowMotion() {
    return !mqReduce.matches;
  }

  function tuneLogoAnimations() {
    const imgs = qsa('.logo-img, .symbol-badge img, .logo img');
    const slow = allowMotion() ? '24s' : '0s';
    imgs.forEach(img => {
      if (img.classList && img.classList.contains('logo-img')) {
        img.style.animationDuration = slow;
        img.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms';
      }
      img.addEventListener('focus', () => {
        img.style.transform = 'translateY(-3px) scale(1.03)';
      });
      img.addEventListener('blur', () => {
        img.style.transform = '';
      });
    });
  }

  function initPrimaryPulse() {
    if (!allowMotion()) return;
    const primaries = qsa('.button.primary, .cta, .button.primary.pulse');
    primaries.forEach(btn => {
      // add pulse class so CSS animation takes effect (CSS must include .pulse)
      btn.classList.add('pulse');

      // pause pulse while user interacts
      btn.addEventListener('mouseenter', () => btn.classList.remove('pulse'));
      btn.addEventListener('mouseleave', () => { if (allowMotion()) btn.classList.add('pulse'); });
      btn.addEventListener('focus', () => btn.classList.remove('pulse'));
      btn.addEventListener('blur', () => { if (allowMotion()) btn.classList.add('pulse'); });

      // add subtle neon glow on hover
      btn.addEventListener('mouseenter', () => {
        const accent2 = cssVar('--accent-2') || '#6ce1ff';
        btn.style.boxShadow = `0 12px 36px ${accent2}33, 0 4px 18px rgba(2,6,23,0.55)`;
        btn.style.transform = 'translateY(-2px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
        btn.style.transform = '';
      });
    });
  }

  function initRunningSymbolTheme() {
    const running = qsa('.logo .running-symbol');
    running.forEach(r => {
      const accent = cssVar('--accent') || '#4ea1ff';
      r.style.background = `radial-gradient(circle at 30% 30%, #fff, ${accent})`;
      r.style.boxShadow = `0 8px 28px ${accent}22, 0 0 8px ${cssVar('--accent-2')}12`;
      if (!allowMotion()) r.style.animation = 'none';
    });
  }

  // Theme the existing toast element and future toasts
  function themeSingleToast(t) {
    if (!t) return;
    t.style.border = `1px solid ${cssVar('--glass-border') || 'rgba(78,161,255,0.12)'}`;
    t.style.background = cssVar('--toast-bg') || 'rgba(6,18,36,0.88)';
    t.style.boxShadow = `0 12px 36px rgba(2,6,23,0.6)`;
    t.style.color = cssVar('--text') || '#e7f2ff';
  }
  function themeToasts() {
    const container = document.getElementById('qc-toast-container');
    if (!container) return;
    container.querySelectorAll('.qc-toast').forEach(themeSingleToast);
  }

  function watchToasts() {
    const container = document.getElementById('qc-toast-container');
    if (!container) return;
    const mo = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(n => {
            if (n.nodeType === 1 && n.classList.contains('qc-toast')) {
              themeSingleToast(n);
            }
          });
        }
      });
    });
    mo.observe(container, { childList: true });
  }

  function initMarqueeGlow() {
    const items = qsa('.marquee-item');
    items.forEach(i => {
      i.addEventListener('mouseenter', () => {
        i.style.boxShadow = `0 14px 40px ${cssVar('--accent-2') || '#6ce1ff'}33, 0 4px 18px rgba(2,6,23,0.55)`;
        i.style.transform = 'translateY(-6px) scale(1.04)';
      });
      i.addEventListener('mouseleave', () => {
        i.style.boxShadow = '';
        i.style.transform = '';
      });
      i.addEventListener('focus', () => { i.style.transform = 'translateY(-6px) scale(1.04)'; });
      i.addEventListener('blur', () => { i.style.transform = ''; });
    });
  }

  function animateHeroAccent() {
    if (!allowMotion()) return;
    const badge = document.querySelector('.symbol-badge');
    if (!badge) return;
    let ang = 0;
    function step() {
      ang = (ang + 0.12) % 360;
      root.style.setProperty('--theme-hero-angle', `${ang}deg`);
      badge.style.transform = `translateY(${Math.sin(ang / 20) * 1.6}px) rotate(${Math.sin(ang / 30) * 0.8}deg)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initFocusOutlines() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('user-is-tabbing');
      }
    });
  }

  function tuneFormContrast() {
    qsa('.contact-form input, .contact-form textarea, .contact-form select, input, textarea, select').forEach(el => {
      el.style.background = 'rgba(255,255,255,0.02)';
      el.style.color = cssVar('--text') || '#e7f2ff';
      el.style.border = `1px solid ${cssVar('--glass-border') || 'rgba(78,161,255,0.06)'}`;
    });
  }

  function initThemeEnhancements() {
    applyMetaThemeColor();
    tuneLogoAnimations();
    initPrimaryPulse();
    initRunningSymbolTheme();
    themeToasts();
    watchToasts();
    initMarqueeGlow();
    initFocusOutlines();
    tuneFormContrast();
    if (document.querySelector('.symbol-badge')) animateHeroAccent();
  }

  /* ---------- Bootstrapping ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initMarquee();
    initRunningSymbol();
    initFAQ();
    initReviewForm();
    initContactForm();
    initMVPForm();
    initThemeEnhancements();
    loadReviews();
  });

  /* ---------- Public API for theme refresh ---------- */
  window.QCTheme = {
    refresh: initThemeEnhancements,
    allowMotion: allowMotion
  };

})();