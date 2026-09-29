(function () {
  'use strict';

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const tabs = Array.from(carousel.querySelectorAll('[data-slide-to]'));
    const tablist = carousel.querySelector('[role="tablist"]');
    const previous = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    const counter = carousel.querySelector('[data-slide-current]');
    const status = carousel.querySelector('[data-carousel-status]');
    if (!slides.length || slides.length !== tabs.length || !tablist) return;

    let currentIndex = 0;
    let touchStart = null;
    carousel.dataset.enhanced = 'true';

    function showSlide(index, announce) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach(function (slide, position) {
        const active = position === currentIndex;
        slide.hidden = !active;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-labelledby', tabs[position].id || 'highlight-tab-' + position);
        tabs[position].id = tabs[position].id || 'highlight-tab-' + position;
        tabs[position].setAttribute('aria-selected', String(active));
        tabs[position].tabIndex = active ? 0 : -1;
      });
      if (counter) counter.textContent = String(currentIndex + 1).padStart(2, '0');
      if (status && announce) {
        const title = slides[currentIndex].querySelector('h2, h3, h4');
        status.textContent = 'Highlight ' + (currentIndex + 1) + ' of ' + slides.length +
          (title ? ': ' + title.textContent.trim() : '');
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { showSlide(index, true); });
    });

    tablist.addEventListener('keydown', function (event) {
      const targetIndex = tabs.indexOf(event.target);
      if (targetIndex === -1) return;
      let destination;
      if (event.key === 'ArrowRight') destination = targetIndex + 1;
      else if (event.key === 'ArrowLeft') destination = targetIndex - 1;
      else if (event.key === 'Home') destination = 0;
      else if (event.key === 'End') destination = slides.length - 1;
      else return;
      event.preventDefault();
      showSlide(destination, true);
      tabs[currentIndex].focus();
    });

    if (previous) previous.addEventListener('click', function () { showSlide(currentIndex - 1, true); });
    if (next) next.addEventListener('click', function () { showSlide(currentIndex + 1, true); });

    // A horizontal gesture on a slide changes highlights; vertical page scrolling stays native.
    carousel.addEventListener('touchstart', function (event) {
      if (event.touches.length !== 1 || !event.target.closest('[data-slide]') ||
          event.target.closest('a, button, input, select, textarea')) {
        touchStart = null;
        return;
      }
      touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }, { passive: true });

    carousel.addEventListener('touchend', function (event) {
      if (!touchStart || !event.changedTouches.length) return;
      const distanceX = event.changedTouches[0].clientX - touchStart.x;
      const distanceY = event.changedTouches[0].clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(distanceX) >= 48 && Math.abs(distanceX) > Math.abs(distanceY) * 1.5) {
        showSlide(currentIndex + (distanceX < 0 ? 1 : -1), true);
      }
    }, { passive: true });

    carousel.addEventListener('touchcancel', function () { touchStart = null; }, { passive: true });
    showSlide(0, false);
  });
})();
