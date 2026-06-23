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

    tl.from('.intro-eyebrow', {
      y: 14,
      opacity: 0,
      duration: 0.5,
    }, '-=0.3');

    // Mask reveal del heading: el .line-inner sube desde dentro de su máscara
    tl.from('.intro-heading .line-inner', {
      yPercent: 110,
      duration: 0.9,
      ease: 'power4.out',
    }, '-=0.2');

    tl.from('.intro-sub', {
      y: 14,
      opacity: 0,
      duration: 0.6,
    }, '-=0.45');

    tl.from('.intro-actions .btn', {
      y: 12,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      clearProps: 'transform',
    }, '-=0.3');
  } else {
    // Sin animación: dejamos todo visible
    gsap.set(['.nav', '.intro-eyebrow', '.intro-heading .line-inner', '.intro-sub', '.intro-actions .btn'], { clearProps: 'all' });
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

  /* ─── PARALLAX SUTIL EN EL MARQUEE ─── */
  if (!reduceMotion) {
    gsap.to('.marquee-section', {
      scrollTrigger: {
        trigger: '.marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -40,
      ease: 'none',
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
