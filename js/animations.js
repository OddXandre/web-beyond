(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var EASE_UI = 'expo.out';
  var EASE_HERO = 'power4.out';
  var EASE_SOFT = 'power2.out';

  /* ─── MASTER TIMELINE ─── */
  var tl = gsap.timeline({ delay: 0.1 });

  // 1 — Glass elements: solo opacity (backdrop-filter + transform = jank)
  tl.from('.nav', { opacity: 0, duration: 0.7, ease: EASE_UI });

  tl.from('.time-pill', {
    opacity: 0,
    duration: 0.7,
    ease: EASE_UI,
    onComplete: function () {
      var el = document.querySelector('.time-pill');
      if (el) el.classList.add('pill-ready');
    },
  }, '-=0.5');

  tl.from('.theme-toggle', { opacity: 0, duration: 0.5, ease: EASE_UI }, '-=0.45');

  tl.from('.lang-toggle', { opacity: 0, duration: 0.5, ease: EASE_UI }, '-=0.32');

  // 2 — Nav children: estos SÍ pueden moverse (no tienen backdrop-filter)
  tl.from('.nav-logo, .nav-socials, .nav-actions', {
    y: -8,
    opacity: 0,
    duration: 0.4,
    stagger: 0.05,
    ease: EASE_SOFT,
  }, '-=0.55');

  // 3 — Hero reveal (sin backdrop-filter, full transform)
  tl.from('.intro-heading .line-inner', {
    yPercent: 130,
    opacity: 0,
    scale: 0.85,
    duration: 1.4,
    ease: EASE_HERO,
  }, '-=0.15');

  // 4 — Subtítulo
  tl.from('.intro-sub', {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: EASE_SOFT,
  }, '-=0.6');

  // 5 — Botones
  tl.from('.intro-actions .btn', {
    y: 24,
    opacity: 0,
    scale: 0.95,
    duration: 0.75,
    stagger: 0.1,
    ease: EASE_SOFT,
  }, '-=0.4');

  // 6 — Marquee
  tl.from('.marquee-section', {
    y: 24,
    opacity: 0,
    duration: 1.0,
    ease: EASE_UI,
  }, 1.3);

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
