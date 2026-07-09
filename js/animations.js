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
    x: -24,
    opacity: 0,
    duration: 0.9,
  }, '-=0.55');

  tl.from('.intro-actions .btn', {
    x: 24,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
  }, '-=0.3');

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

  /* ─── SMART NAVBAR ─── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var lastScroll = 0;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var currentScroll = window.scrollY;
          if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('nav-hidden');
          } else {
            nav.classList.remove('nav-hidden');
          }
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ─── MAGNETIC BUTTONS ─── */
  var btns = document.querySelectorAll('.intro-actions .btn');
  btns.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = (e.clientX - rect.left - rect.width / 2) * 0.12;
      var y = (e.clientY - rect.top - rect.height / 2) * 0.12;
      gsap.to(btn, {
        x: x,
        y: y,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    });
  });
})();
