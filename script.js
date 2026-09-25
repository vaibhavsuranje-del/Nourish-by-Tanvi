/* =========================================================
   NOURISHED BY TANVI — SITE SCRIPT
   ========================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------
     WHATSAPP HELPER
     Central place to manage the number + message variants.
     To add a payment link later: replace WA_NUMBER usage in
     buildWhatsAppUrl() with your payment URL for the
     'consult' variant, or add a new data-wa-msg type.
  ----------------------------------------------------- */
  const WA_NUMBER = '919667221287';

  const WA_MESSAGES = {
    consult: "Hi Tanvi! I'd like to book the ₹99 nutrition consultation. Please share the details and payment process.",
    general: "Hi Tanvi! I came across Nourished by Tanvi and would like to know more about your nutrition consultation and services.",
    contact: "Hi Tanvi! I'd like to know more about your nutrition services and would like to book a consultation."
  };

  function buildWhatsAppUrl(type) {
    const message = WA_MESSAGES[type] || WA_MESSAGES.general;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  document.querySelectorAll('.wa-cta').forEach((link) => {
    const type = link.getAttribute('data-wa-msg') || 'general';
    link.setAttribute('href', buildWhatsAppUrl(type));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  /* -----------------------------------------------------
     NAVBAR: scroll state + mobile menu
  ----------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function onScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
    updateScrollProgress();
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    });
  });

  /* -----------------------------------------------------
     SCROLL PROGRESS BAR
  ----------------------------------------------------- */
  const progressBar = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* -----------------------------------------------------
     ACTIVE NAV LINK ON SCROLL
  ----------------------------------------------------- */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar__links .nav-link'));

  function updateActiveNav() {
    let currentId = sections[0] ? sections[0].id : null;
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const match = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active', match);
    });
  }

  /* -----------------------------------------------------
     SCROLL REVEAL ANIMATIONS
  ----------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = (index % 4) * 90;
            setTimeout(() => entry.target.classList.add('is-visible'), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* -----------------------------------------------------
     FAQ ACCORDION
  ----------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-item__q');
    const answer = item.querySelector('.faq-item__a');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // close all other items
      document.querySelectorAll('.faq-item__q').forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.parentElement.querySelector('.faq-item__a').style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  /* -----------------------------------------------------
     TESTIMONIAL CAROUSEL (native scroll + arrow controls)
  ----------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  function scrollTestimonials(direction) {
    if (!track) return;
    const card = track.querySelector('.t-card');
    const gap = 22;
    const scrollAmount = card ? card.offsetWidth + gap : 320;
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => scrollTestimonials(-1));
    nextBtn.addEventListener('click', () => scrollTestimonials(1));
  }

  /* -----------------------------------------------------
     SMOOTH ANCHOR SCROLL (accounts for sticky navbar)
  ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
})();
