(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var EASE = 'power3.out';
  var EASE_SMOOTH = 'power2.out';

  /* ─── MASTER TIMELINE (entrada) ─── */
  var tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.15 });

  tl.from('.nav', {
    y: -48,
    opacity: 0,
    duration: 1.0,
  });

  tl.from('.intro-heading .line-inner', {
    yPercent: 120,
    opacity: 0,
    duration: 1.1,
    ease: 'power4.out',
  }, '-=0.35');

  tl.from('.intro-sub', {
    y: 20,
    opacity: 0,
    duration: 0.8,
  }, '-=0.5');

  tl.from('.intro-actions .btn', {
    y: 24,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
  }, '-=0.3');

  /* ─── HERO PARALLAX ON SCROLL ─── */
  gsap.to('.intro-sub', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
    y: 20,
    ease: 'none',
  });

  gsap.to('.intro-actions', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
    y: 40,
    ease: 'none',
  });

  /* ─── WORKFLOW CARDS: REVEAL ON SCROLL ─── */
  gsap.from('.workflow-card', {
    scrollTrigger: {
      trigger: '.workflow-horizontal',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: EASE,
  });

  /* ─── THEME TRANSITION POLISH ─── */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;pointer-events:none;background:var(--color-bg);opacity:0;transition:opacity 0.3s ease';
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
      start: 'top 88%',
    },
    y: 24,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: EASE_SMOOTH,
  });

  gsap.from('.footer-base', {
    scrollTrigger: {
      trigger: '.footer-base',
      start: 'top 92%',
    },
    opacity: 0,
    duration: 0.5,
  });
})();
