(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  var EASE = 'power3.out';
  var EASE_SMOOTH = 'power2.out';

  /* ─── MASTER TIMELINE (entrada) ─── */
  var tl = gsap.timeline({ defaults: { ease: EASE } });

  tl.from('.nav', {
    y: -32,
    opacity: 0,
    duration: 0.7,
  });

  tl.from('.intro-heading .line-inner', {
    yPercent: 110,
    duration: 0.9,
    ease: 'power4.out',
  }, '-=0.3');

  tl.from('.intro-sub', {
    y: 14,
    opacity: 0,
    duration: 0.6,
  }, '-=0.45');

  tl.from('.intro-actions .btn', {
    y: 18,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
  }, '-=0.25');

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

  /* ─── MARQUEE TILES: SUBTLE FLOAT ─── */
  var items = document.querySelectorAll('.marquee-item');
  items.forEach(function (el, i) {
    var direction = i % 2 === 0 ? 1 : -1;
    gsap.to(el, {
      y: direction * 4,
      duration: 2 + (i % 3) * 0.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
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
