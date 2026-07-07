/* ─────────────────────────────────────────────
   THEME TOGGLE
   El tema inicial ya lo aplicó el snippet anti-flash
   del <head>. Aquí solo gestionamos el toggle.
───────────────────────────────────────────── */
(function initThemeToggle() {
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  function current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('beyond-theme', next); } catch (e) {}
  });
})();

/* ─────────────────────────────────────────────
   TRADUCCIÓN ES/EN
───────────────────────────────────────────── */
(function initLang() {
  var i18n = {
    es: {
      'title': 'Beyond — Estudio de diseño',
      'desc': 'Estudio de diseño especializado en identidad visual, diseño de indumentaria y branding.',
      'nav-book': 'Agendar llamada',
      'nav-book-short': 'Agenda',
      'hero-sub': 'Las cosas bonitas también cambian el mundo.',
      'btn-contact': 'Contacto',
      'wf-1-title': 'Descubrimiento',
      'wf-1-text': 'Comprensión profunda de tu negocio, construyendo la base para una estrategia impactante.',
      'wf-2-title': 'Diseño',
      'wf-2-text': 'Conceptos innovadores y diseños centrados en tu audiencia para comunicar con efectividad.',
      'wf-3-title': 'Desarrollo',
      'wf-3-text': 'Convertimos ideas en proyectos reales, construidos con precisión y entregados a tiempo.',
      'wf-4-title': 'Lanzamiento',
      'wf-4-text': 'Desplegamos tu proyecto, monitoreamos resultados y refinamos la estrategia para el éxito.',
      'footer-start': 'Inicia un proyecto',
      'footer-location-label': '/UBICACIÓN',
      'footer-social-label': '/SOCIAL',
      'footer-tagline': 'Las cosas bonitas también cambian el mundo.',
    },
    en: {
      'title': 'Beyond — Design Studio',
      'desc': 'Design studio specialized in visual identity, fashion design, and branding.',
      'nav-book': 'Book a call',
      'nav-book-short': 'Book',
      'hero-sub': 'Beautiful things also change the world.',
      'btn-contact': 'Contact',
      'wf-1-title': 'Discovery',
      'wf-1-text': 'Deep understanding of your business, building the foundation for an impactful strategy.',
      'wf-2-title': 'Design',
      'wf-2-text': 'Innovative concepts and designs focused on your audience to communicate effectively.',
      'wf-3-title': 'Development',
      'wf-3-text': 'We turn ideas into real projects, built with precision and delivered on time.',
      'wf-4-title': 'Launch',
      'wf-4-text': 'We deploy your project, monitor results, and refine the strategy for success.',
      'footer-start': 'Start a project',
      'footer-location-label': '/LOCATION',
      'footer-social-label': '/SOCIAL',
      'footer-tagline': 'Beautiful things also change the world.',
    },
  };

  var lang = 'es';
  var btn = document.getElementById('langToggle');
  if (!btn) return;

  // restore saved
  try {
    var saved = localStorage.getItem('beyond-lang');
    if (saved === 'en' || saved === 'es') lang = saved;
  } catch (e) {}

  function swap(l) {
    lang = l;
    var t = i18n[l];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    document.title = t.title || 'Beyond';
    var meta = document.querySelector('meta[name="description"]');
    if (meta && t.desc) meta.setAttribute('content', t.desc);
    var og = document.querySelector('meta[property="og:description"]');
    if (og && t.desc) og.setAttribute('content', t.desc);
    document.documentElement.setAttribute('lang', l);
    btn.textContent = l === 'es' ? 'EN' : 'ES';
    try { localStorage.setItem('beyond-lang', l); } catch (e) {}
  }

  function apply(l) {
    document.body.classList.add('is-translating');
    setTimeout(function () {
      swap(l);
      document.body.classList.remove('is-translating');
    }, 200);
  }

  apply(lang);

  btn.addEventListener('click', function () {
    apply(lang === 'es' ? 'en' : 'es');
  });
})();

/* ─────────────────────────────────────────────
   AÑO DINÁMICO EN EL FOOTER
───────────────────────────────────────────── */
(function initYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ─────────────────────────────────────────────
   SMOOTH SCROLL (Lenis)
───────────────────────────────────────────── */
var lenisScript = document.createElement('script');
lenisScript.src = 'https://unpkg.com/lenis@1.3.8/dist/lenis.min.js';
lenisScript.onload = function () {
  if (!window.Lenis) return;
  window.lenis = new Lenis({
    duration: 1.15,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Sincroniza Lenis con GSAP ticker (único rAF)
  if (window.ScrollTrigger && window.gsap) {
    window.gsap.ticker.add(function (time) {
      window.lenis.raf(time * 1000);
    });
    window.gsap.ticker.lagSmoothing(0);
    window.lenis.on('scroll', window.ScrollTrigger.update);
  } else {
    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
};
document.head.appendChild(lenisScript);

/* ─────────────────────────────────────────────
   MARQUEE — tiles abstractos
   Duplicamos el set para un bucle infinito sin saltos.
───────────────────────────────────────────── */
(function initMarquee() {
  var track = document.getElementById('marqueeTrack');
  if (!track) return;
  var set = 16;
  var html = '';
  for (var i = 0; i < set; i++) {
    html += '<div class="marquee-item" aria-hidden="true"></div>';
  }
  track.innerHTML = html;
})();

/* ─────────────────────────────────────────────
   MODAL — agendar llamada
───────────────────────────────────────────── */
function openBooking() {
  var modal = document.getElementById('bookingModal');
  if (!modal) return;
  modal.classList.add('active');
  var scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + scrollY + 'px';
  document.body.style.width = '100%';
}

function closeBooking() {
  var modal = document.getElementById('bookingModal');
  if (!modal) return;
  modal.classList.remove('active');
  var scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
}

// Cerrar con tecla Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeBooking();
});
