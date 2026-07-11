(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var EASE = 'power4.out';
  var EASE_SMOOTH = 'power3.out';

  /* ─── MASTER TIMELINE (entrada) ─── */
  var tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.15 });

  // 1 — Nav bar baja
  tl.from('.nav', {
    y: -48,
    opacity: 0,
    duration: 1.0,
  });

  // 2 — Time pill desde la izquierda
  tl.from('.time-pill', {
    x: -12,
    y: -18,
    opacity: 0,
    scale: 0.95,
    duration: 0.9,
    onComplete: function() {
      document.querySelector('.time-pill').classList.add('pill-ready');
    }
  }, '-=0.75');

  // 3 — Elementos internos de la nav aparecen escalonados
  tl.from('.nav-logo, .nav-socials, .nav-actions', {
    y: -10,
    opacity: 0,
    duration: 0.55,
    stagger: 0.06,
  }, '-=0.45');

  // 4 — Logo hero se revela (slide-up + scale suave)
  tl.from('.intro-heading .line-inner', {
    yPercent: 120,
    opacity: 0,
    scale: 0.92,
    duration: 1.3,
  }, '-=0.35');

  // 5 — Subtítulo sube
  tl.from('.intro-sub', {
    y: 24,
    opacity: 0,
    duration: 0.9,
  }, '-=0.55');

  // 6 — Botones escalonan con micro-scale
  tl.from('.intro-actions .btn', {
    y: 24,
    opacity: 0,
    scale: 0.96,
    duration: 0.75,
    stagger: 0.12,
  }, '-=0.4');

  /* ─── WORKFLOW CARDS: REVEAL ON SCROLL ─── */
  gsap.from('.workflow-card', {
    scrollTrigger: {
      trigger: '.workflow-horizontal',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: EASE,
  });

  /* ─── THEME TRANSITION POLISH ─── */
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
    stagger: 0.15,
    ease: EASE,
  });

  gsap.from('.footer-base', {
    scrollTrigger: {
      trigger: '.footer-base',
      start: 'top 92%',
    },
    y: 16,
    opacity: 0,
    duration: 0.6,
    ease: EASE_SMOOTH,
  });
})();
