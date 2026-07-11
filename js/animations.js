(function () {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var EASE_HERO = 'power4.out';
  var EASE_SOFT = 'power2.out';
  var EASE_EXP  = 'expo.out';

  /* ═══════════════════════════════════════════
     1 — ENTRADA CINEMÁTICA
  ═══════════════════════════════════════════ */
  var master = gsap.timeline({ delay: 0.15 });

  // Nav: fade + slide down
  master.from('.nav', {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: EASE_SOFT,
  }, 0);

  // Theme & lang toggles: scale in
  master.from('.theme-toggle, .lang-toggle', {
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: EASE_EXP,
  }, 0.1);

  // Time pill: slide from left
  master.from('.time-pill', {
    x: -30,
    opacity: 0,
    duration: 0.5,
    ease: EASE_SOFT,
  }, 0.15);

  // Hero logo: clip-path reveal (inset bottom→full)
  master.fromTo('.intro-heading .line-inner', {
    clipPath: 'inset(100% 0% 0% 0%)',
    yPercent: 20,
  }, {
    clipPath: 'inset(0% 0% 0% 0%)',
    yPercent: 0,
    duration: 1.2,
    ease: EASE_EXP,
  }, 0.2);

  // Subtítulo: word-by-word stagger
  (function () {
    var sub = document.querySelector('.intro-sub');
    if (!sub) return;
    var text = sub.textContent.trim();
    var words = text.split(/\s+/);
    sub.innerHTML = words.map(function (w) {
      return '<span class="sub-word"><span class="sub-word-inner">' + w + '</span></span>';
    }).join(' ');
    sub.style.opacity = '1';
    var wordEls = sub.querySelectorAll('.sub-word-inner');
    master.from(wordEls, {
      yPercent: 100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: EASE_EXP,
    }, '-=0.5');
  })();

  // Botones: scale up + fade
  master.from('.intro-actions .btn', {
    y: 20,
    opacity: 0,
    scale: 0.92,
    duration: 0.6,
    stagger: 0.1,
    ease: EASE_SOFT,
  }, '-=0.3');

  /* ═══════════════════════════════════════════
     2 — MARQUEE PARALLAX
  ═══════════════════════════════════════════ */
  gsap.to('.marquee-track', {
    scrollTrigger: {
      trigger: '.marquee-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
    x: -80,
    ease: 'none',
  });

  /* ═══════════════════════════════════════════
     3 — WORKFLOW CARDS: clip-path reveal + stagger
  ═══════════════════════════════════════════ */
  document.querySelectorAll('.workflow-card').forEach(function (card) {
    // Clip-path reveal
    gsap.fromTo(card, {
      clipPath: 'inset(100% 0% 0% 0%)',
      y: 40,
    }, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      duration: 0.9,
      ease: EASE_EXP,
    });

    // Number count-up
    var numEl = card.querySelector('.wf-number');
    if (numEl) {
      var target = parseInt(numEl.textContent, 10);
      var obj = { val: 0 };
      gsap.to(obj, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        val: target,
        duration: 1,
        ease: EASE_SOFT,
        onUpdate: function () {
          numEl.textContent = String(Math.round(obj.val)).padStart(2, '0');
        },
      });
    }
  });

  // Stagger between cards
  ScrollTrigger.batch('.workflow-card', {
    onEnter: function (batch) {
      gsap.to(batch, {
        opacity: 1,
        stagger: 0.12,
      });
    },
    start: 'top 85%',
  });

  /* ═══════════════════════════════════════════
     4 — FOOTER: column-staggered entrance
  ═══════════════════════════════════════════ */
  var footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 80%',
    },
  });

  footerTl.from('.footer-label', {
    y: 16,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: EASE_SOFT,
  });

  footerTl.from('.footer-email', {
    y: 20,
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0%)',
    duration: 0.8,
    ease: EASE_EXP,
  }, '-=0.4');

  footerTl.from('.footer-location p:not(.footer-label), .footer-socials a', {
    y: 12,
    opacity: 0,
    duration: 0.5,
    stagger: 0.06,
    ease: EASE_SOFT,
  }, '-=0.4');

  footerTl.from('.footer-base', {
    y: 12,
    opacity: 0,
    duration: 0.5,
    ease: EASE_SOFT,
  }, '-=0.2');

  /* ═══════════════════════════════════════════
     5 — MAGNETIC HOVER (CTAs)
  ═══════════════════════════════════════════ */
  document.querySelectorAll('.btn, .theme-toggle, .lang-toggle').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    el.addEventListener('mouseleave', function () {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });

  /* ═══════════════════════════════════════════
     6 — THEME TRANSITION (overlay)
  ═══════════════════════════════════════════ */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;pointer-events:none;background:var(--color-bg);opacity:0;transition:opacity 0.5s cubic-bezier(0.16,1,0.3,1)';
      document.body.appendChild(overlay);
      requestAnimationFrame(function () {
        overlay.style.opacity = '0.25';
        setTimeout(function () {
          overlay.style.opacity = '0';
          setTimeout(function () { overlay.remove(); }, 400);
        }, 180);
      });
    });
  }

  /* ═══════════════════════════════════════════
     7 — HERO PARALLAX (subtle depth)
  ═══════════════════════════════════════════ */
  gsap.to('.hero-logo-img', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
    y: 60,
    ease: 'none',
  });

  gsap.to('.intro-sub', {
    scrollTrigger: {
      trigger: '.intro',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
    y: 30,
    ease: 'none',
  });

})();
