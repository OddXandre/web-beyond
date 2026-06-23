(function () {
  if (!window.gsap) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  var EASE = 'power3.out';
  var EASE_SMOOTH = 'power2.out';

  /* ─── MASTER TIMELINE (entrada) ─── */
  if (!reduceMotion) {
    var tl = gsap.timeline({ defaults: { ease: EASE } });

    tl.from('.nav', {
      y: -32,
      opacity: 0,
      duration: 0.7,
    });

    // Mask reveal del heading: el .line-inner sube desde dentro de su máscara
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

  } else {
    gsap.set(['.nav', '.intro-heading .line-inner', '.intro-sub', '.intro-actions .btn'], { clearProps: 'all' });
  }

  /* ─── WORKFLOW CARDS ─── */
  if (!reduceMotion) {
    gsap.from('.workflow-card', {
      scrollTrigger: {
        trigger: '.workflow-horizontal',
        start: 'top 82%',
      },
      y: 36,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: EASE,
    });
  }

  /* ─── FOOTER ─── */
  if (!reduceMotion) {
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
  }
})();
