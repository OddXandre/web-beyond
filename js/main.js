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
   NAV TIME — hora local del usuario
───────────────────────────────────────────── */
(function initNavTime() {
  var el = document.getElementById('navTimeText');
  if (!el) return;

  function countryFromTz(tz) {
    var map = {
      'Europe/Madrid':'ES','Europe/Paris':'FR','Europe/Berlin':'DE',
      'Europe/Rome':'IT','Europe/London':'GB','Europe/Lisbon':'PT',
      'Europe/Amsterdam':'NL','Europe/Brussels':'BE','Europe/Vienna':'AT',
      'Europe/Warsaw':'PL','Europe/Prague':'CZ','Europe/Budapest':'HU',
      'Europe/Athens':'GR','Europe/Stockholm':'SE','Europe/Copenhagen':'DK',
      'Europe/Helsinki':'FI','Europe/Oslo':'NO','Europe/Dublin':'IE',
      'Europe/Zurich':'CH','Europe/Moscow':'RU','Europe/Istanbul':'TR',
      'America/New_York':'US','America/Chicago':'US','America/Denver':'US',
      'America/Los_Angeles':'US','America/Toronto':'CA','America/Vancouver':'CA',
      'America/Mexico_City':'MX','America/Sao_Paulo':'BR',
      'America/Argentina/Buenos_Aires':'AR','America/Santiago':'CL',
      'America/Bogota':'CO','America/Lima':'PE',
      'Asia/Tokyo':'JP','Asia/Shanghai':'CN','Asia/Hong_Kong':'HK',
      'Asia/Seoul':'KR','Asia/Singapore':'SG','Asia/Dubai':'AE',
      'Asia/Kolkata':'IN','Asia/Bangkok':'TH','Asia/Ho_Chi_Minh':'VN',
      'Asia/Jakarta':'ID','Asia/Manila':'PH','Asia/Taipei':'TW',
      'Australia/Sydney':'AU','Australia/Melbourne':'AU','Australia/Perth':'AU',
      'Pacific/Auckland':'NZ',
      'Africa/Cairo':'EG','Africa/Johannesburg':'ZA','Africa/Lagos':'NG','Africa/Nairobi':'KE'
    };
    if (map[tz]) return map[tz];
    var c = tz.split('/').pop();
    var cm = {Madrid:'ES',Paris:'FR',Berlin:'DE',Rome:'IT',London:'GB',
      Lisbon:'PT',Tokyo:'JP',Seoul:'KR',Beijing:'CN',Shanghai:'CN',
      Singapore:'SG',Sydney:'AU',Auckland:'NZ',Mumbai:'IN',Delhi:'IN',
      Dubai:'AE',Moscow:'RU',Istanbul:'TR',Sao_Paulo:'BR',Buenos_Aires:'AR'};
    return cm[c] || '';
  }

  var langMap = {ES:'es',FR:'fr',DE:'de',IT:'it',GB:'en',PT:'pt',NL:'nl',
    BE:'nl',AT:'de',PL:'pl',CZ:'cs',HU:'hu',GR:'el',SE:'sv',DK:'da',
    FI:'fi',NO:'nb',IE:'en',CH:'de',RU:'ru',TR:'tr',US:'en',CA:'en',
    MX:'es',BR:'pt',AR:'es',CL:'es',CO:'es',PE:'es',JP:'ja',CN:'zh',
    HK:'zh',KR:'ko',SG:'en',AE:'ar',IN:'hi',TH:'th',VN:'vi',ID:'id',
    PH:'tl',TW:'zh',AU:'en',NZ:'en',EG:'ar',ZA:'en',NG:'en',KE:'sw'};

  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var cc = countryFromTz(tz);
  var suffix = document.createElement('span');
  suffix.style.cssText = 'opacity:0.55;';
  if (cc) {
    var lang = langMap[cc] || 'en';
    suffix.textContent = new Intl.DisplayNames(lang, {type:'region'}).of(cc);
  }
  el.after(suffix);

  var use24h = true;
  var pill = document.getElementById('navTime');
  pill.style.cursor = 'pointer';

  function formatTime(now, is24h) {
    var h = now.getHours();
    var m = now.getMinutes().toString().padStart(2, '0');
    var s = now.getSeconds().toString().padStart(2, '0');
    if (is24h) return h.toString().padStart(2, '0') + ':' + m + ':' + s + ',';
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = (h % 12 || 12).toString().padStart(2, '0');
    return h12 + ':' + m + ':' + s + ' ' + ampm + ',';
  }

  function setTime(text, anim) {
    el.innerHTML = '';
    var s = document.createElement('span');
    s.className = 'ti' + (anim ? ' new' : '');
    s.textContent = text;
    el.appendChild(s);
  }

  pill.addEventListener('click', function() {
    use24h = !use24h;
    ticking = false;

    pill.style.width = pill.offsetWidth + 'px';
    void pill.offsetWidth;

    var cur = el.querySelector('.ti');
    if (cur) cur.className = 'ti old';
    var nextText = formatTime(new Date(), use24h);
    setTimeout(function() {
      setTime(nextText, true);
      pill.style.width = pill.scrollWidth + 'px';
      ticking = true;
    }, 350);
  });

  var ticking = true;
  function tick() {
    if (!ticking) return;
    setTime(formatTime(new Date(), use24h), false);
  }
  tick();
  var tickId = setInterval(tick, 1000);
  setInterval(tick, 1000);
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
