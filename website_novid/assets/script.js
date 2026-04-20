// ─── LANGUAGE TOGGLE ──────────────────────────────────────────────────────────

const LANG_KEY = 'telomeres-lang';

let currentLang = localStorage.getItem(LANG_KEY) || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });

  document.querySelectorAll('.lang-toggle, .footer-lang').forEach(btn => {
    const enSpan = btn.querySelector('.lang-en');
    const skSpan = btn.querySelector('.lang-sk');
    if (enSpan && skSpan) {
      if (lang === 'en') {
        enSpan.classList.add('lang-active');
        skSpan.classList.remove('lang-active');
      } else {
        skSpan.classList.add('lang-active');
        enSpan.classList.remove('lang-active');
      }
    }
  });

  document.documentElement.lang = lang;
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'sk' : 'en');
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language on load
  setLanguage(currentLang);

  // Bind toggle buttons
  const navToggle = document.getElementById('langToggleNav');
  const footerToggle = document.getElementById('langToggleFooter');
  if (navToggle) navToggle.addEventListener('click', toggleLanguage);
  if (footerToggle) footerToggle.addEventListener('click', toggleLanguage);

  // ─── FADE-IN ON SCROLL ──────────────────────────────────────────────────────

  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  // Immediately show hero elements
  document.querySelectorAll('#hero .fade-in').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
  });

  // On detail pages, show first elements immediately (already in view on load)
  document.querySelectorAll('.page-top .fade-in').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
  });

  // ─── VIDEO CONTROLS (orlando.html only) ─────────────────────────────────────

  const video = document.getElementById('orlandoVideo');
  if (video) {
    const soundBtn = document.getElementById('videoSoundBtn');
    const replayOverlay = document.getElementById('videoReplayOverlay');
    const replayBtn = document.getElementById('videoReplayBtn');

    soundBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      soundBtn.textContent = video.muted ? 'Sound off' : 'Sound on';
    });

    video.addEventListener('ended', () => {
      replayOverlay.classList.add('visible');
    });

    replayBtn.addEventListener('click', () => {
      replayOverlay.classList.remove('visible');
      video.currentTime = 0;
      video.play();
    });
  }
});
