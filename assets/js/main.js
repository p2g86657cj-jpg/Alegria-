// Alégria, Éveil Sacré — comportements du site

document.addEventListener('DOMContentLoaded', () => {
  /* Navigation mobile */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-lock', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-lock');
      });
    });
  }

  /* Lien de navigation actif */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]:not(.main-nav__cta)').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  /* Révélation au défilement */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Pré-sélection du soin depuis l'URL (?soin=...) sur la page de rendez-vous */
  const serviceSelect = document.getElementById('soin');
  if (serviceSelect) {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('soin');
    if (requested) {
      const match = Array.from(serviceSelect.options).find(
        (opt) => opt.value.toLowerCase() === requested.toLowerCase()
      );
      if (match) serviceSelect.value = match.value;
    }
  }

  /* Soumission des formulaires (démo statique, sans backend) */
  document.querySelectorAll('form[data-static-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const success = form.parentElement.querySelector('.form-success');
      form.classList.add('is-hidden');
      if (success) success.classList.add('is-visible');
      form.reset();
    });
  });
});
