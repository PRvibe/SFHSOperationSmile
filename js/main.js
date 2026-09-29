(function () {
  'use strict';

  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = document.querySelectorAll('.reveal');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  // Content is always readable. An entering element gets a one-time, subtle animation.
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  elements.forEach(function (element) { observer.observe(element); });
})();
