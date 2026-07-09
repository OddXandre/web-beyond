(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var EASE = 'power4.out';
  var EASE_SMOOTH = 'power3.out';

  /* ─── MASTER TIMELINE (entrada) ─── */
  var tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.15 });

  tl.from('.nav', {
    y: -48,
    opacity: 0,
    duration: 1.2,
  });

  tl.from('.intro-heading .line-inner', {
    yPercent: 120,
    opacity: 0,
    duration: 1.3,
    ease: 'power4.out',
  }, '-=0.4');

  tl.from('.intro-sub', {
    y: 20,
    opacity: 0,
    duration: 0.9,
  }, '-=0.55');

  tl.from('.intro-actions .btn', {
    y: 24,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
  }, '-=0.35');

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
