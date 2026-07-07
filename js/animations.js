(function () {
  if (!window.gsap) return;

  /* ─── DITHER CANVAS ─── */
  try {
    (function dither() {
      var c = document.getElementById('dither-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      if (!ctx) return;
      var resize = function () { c.width = window.innerWidth; c.height = window.innerHeight; };
      resize();
      window.addEventListener('resize', resize);
      var imgData = ctx.createImageData(c.width, c.height);
      var d = imgData.data;
      for (var i = 0; i < d.length; i += 4) {
        var v = Math.random() * 255;
        d[i] = d[i+1] = d[i+2] = v;
        d[i+3] = Math.random() < 0.4 ? 30 : 0;
      }
      ctx.putImageData(imgData, 0, 0);
    })();
  } catch (e) {}

  /* ─── WORD REVEAL (tagline) ─── */
  try {
    (function wordReveal() {
      var el = document.querySelector('[data-word-reveal]');
      if (!el) return;
      var words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(function (w, i) {
        return '<span class="word-reveal__word" style="--word-index:' + i + '">' + w + '</span>';
      }).join(' ');
    })();
  } catch (e) {}

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── REGISTER PLUGINS ─── */
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}

  var EASE = 'power3.out';
  var EASE_SMOOTH = 'power2.out';

  /* ─── MARQUEE HOVER PAUSE ─── */
  (function marqueeHover() {
    var track = document.getElementById('marqueeTrack');
    if (!track) return;
    track.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
  })();

  /* ─── MASTER TIMELINE (entrada) ─── */
  if (!reduceMotion) {
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

  } else {
    gsap.set(['.nav', '.intro-heading .line-inner', '.intro-sub', '.intro-actions .btn'], { clearProps: 'all' });
  }

  /* ─── WORKFLOW CARDS: REVEAL ON SCROLL ─── */
  if (!reduceMotion) {
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
  }

  /* ─── MARQUEE TILES: SUBTLE FLOAT ─── */
  if (!reduceMotion) {
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
  }

  /* ─── THEME TRANSITION POLISH ─── */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (reduceMotion) return;
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
