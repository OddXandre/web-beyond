(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var EASE_UI = 'expo.out';
  var EASE_HERO = 'power4.out';
  var EASE_SOFT = 'power2.out';

  /* ─── MASTER TIMELINE ─── */
  var tl = gsap.timeline({ delay: 0.1 });

  // 1 — NAV cae con autoridad
  tl.from('.nav', {
    y: -48,
    opacity: 0,
    duration: 0.9,
    ease: EASE_UI,
  });

  // 2 — Contexto: pill desde izquierda, toggles desde derecha
  tl.from('.time-pill', {
    x: -14,
    y: -12,
    opacity: 0,
    scale: 0.93,
    duration: 0.8,
    ease: EASE_UI,
    onComplete: function () {
      var el = document.querySelector('.time-pill');
      if (el) el.classList.add('pill-ready');
    },
  }, '-=0.68');

  tl.from('.theme-toggle', {
    scale: 0.85,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.1)',
  }, '-=0.62');

  tl.from('.lang-toggle', {
    scale: 0.85,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.1)',
  }, '-=0.48');

  // 3 — Detalles de la nav escalonados
  tl.from('.nav-logo, .nav-socials, .nav-actions', {
    y: -8,
    opacity: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: EASE_SOFT,
  }, '-=0.3');

  // 4 — HERO: el gran momento. Slow, dramatic, desde abajo.
  tl.from('.intro-heading .line-inner', {
    yPercent: 130,
    opacity: 0,
    scale: 0.85,
    duration: 1.4,
    ease: EASE_HERO,
  }, '-=0.15');

  // 5 — Subtítulo entra mientras el hero aún se revela
  tl.from('.intro-sub', {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: EASE_SOFT,
  }, '-=0.6');

  // 6 — Botones con micro-scale, escalonados
  tl.from('.intro-actions .btn', {
    y: 24,
    opacity: 0,
    scale: 0.95,
    duration: 0.75,
    stagger: 0.1,
    ease: EASE_SOFT,
  }, '-=0.4');

  // 7 — Marquee como broche final
  tl.from('.marquee-section', {
    y: 24,
    opacity: 0,
    duration: 1.0,
    ease: EASE_UI,
  }, '-=0.2');

  /* ─── WORKFLOW: reveal en scroll ─── */
  gsap.from('.workflow-card', {
    scrollTrigger: {
      trigger: '.workflow-horizontal',
      start: 'top 78%',
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: EASE_HERO,
  });

  /* ─── THEME TRANSITION ─── */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;pointer-events:none;background:var(--color-bg);opacity:0;transition:opacity 0.45s cubic-bezier(0.16,1,0.3,1)';
      document.body.appendChild(overlay);
      requestAnimationFrame(function () {
        overlay.style.opacity = '0.3';
        setTimeout(function () {
          overlay.style.opacity = '0';
          setTimeout(function () { overlay.remove(); }, 350);
        }, 150);
      });
    });
  }

  /* ─── FOOTER ─── */
  gsap.from('.footer-grid > *', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
    },
    y: 24,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: EASE_HERO,
  });

  gsap.from('.footer-base', {
    scrollTrigger: {
      trigger: '.footer-base',
      start: 'top 92%',
    },
    y: 16,
    opacity: 0,
    duration: 0.6,
    ease: EASE_SOFT,
  });
})();
