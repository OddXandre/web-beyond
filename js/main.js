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
  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sincroniza Lenis con ScrollTrigger de GSAP si está presente
  if (window.ScrollTrigger && window.gsap) {
    window.lenis.on('scroll', window.ScrollTrigger.update);
    window.gsap.ticker.add(function (time) { window.lenis.raf(time * 1000); });
    window.gsap.ticker.lagSmoothing(0);
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
  var set = 8; // nº de tiles por set
  var copies = 2;
  var html = '';
  for (var c = 0; c < copies; c++) {
    for (var i = 0; i < set; i++) {
      html += '<div class="marquee-item" aria-hidden="true"></div>';
    }
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
