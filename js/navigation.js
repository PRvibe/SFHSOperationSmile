(function () {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const toggle = header.querySelector('[data-menu-toggle]');
  const navigation = header.querySelector('#primary-navigation');
  if (!toggle || !navigation) return;

  const mobile = window.matchMedia('(max-width: 960px)');
  let isOpen = false;
  let previousFocus = null;
  header.dataset.enhanced = 'true';

  function focusableItems() {
    return Array.from(header.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (element) {
      return element.getClientRects().length > 0 && !element.closest('[hidden]');
    });
  }

  function setOpen(open, restoreFocus) {
    isOpen = Boolean(open && mobile.matches);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      previousFocus = document.activeElement;
      const firstLink = navigation.querySelector('a[href]');
      if (firstLink) firstLink.focus();
    } else if (restoreFocus) {
      const destination = previousFocus && previousFocus.isConnected ? previousFocus : toggle;
      destination.focus();
      previousFocus = null;
    }
  }

  toggle.addEventListener('click', function () {
    setOpen(!isOpen, isOpen);
  });

  document.addEventListener('keydown', function (event) {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false, true);
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusableItems();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !header.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !header.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (isOpen && !header.contains(event.target)) setOpen(false, true);
  });

  navigation.addEventListener('click', function (event) {
    if (isOpen && event.target.closest('a[href]')) setOpen(false, true);
  });

  function handleViewportChange() {
    if (!mobile.matches && isOpen) setOpen(false, false);
    if (mobile.matches && !isOpen && navigation.contains(document.activeElement)) toggle.focus();
  }

  if (mobile.addEventListener) mobile.addEventListener('change', handleViewportChange);
  else mobile.addListener(handleViewportChange);
})();
