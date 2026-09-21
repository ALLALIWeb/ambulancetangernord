(function () {
  var root = document.documentElement;
  var switcher = document.getElementById('language-switcher');
  var trackedElements = document.querySelectorAll('[data-track]');
  var scrollMilestones = { 50: false, 90: false };
  var LANGUAGE_KEY = 'ambulance-tanger-language';

  function pushEvent(eventName, payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload || {}));

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload || {});
    }
  }

  function updateSwitcherLabel(language) {
    if (!switcher) return;
    switcher.setAttribute('aria-label', language === 'ar' ? 'Changer la langue vers le français' : 'تغيير اللغة إلى العربية');
  }

  function setLanguage(language, shouldTrack) {
    var nextLanguage = language === 'ar' ? 'ar' : 'fr';
    var direction = nextLanguage === 'ar' ? 'rtl' : 'ltr';

    root.lang = nextLanguage;
    root.dir = direction;
    root.dataset.language = nextLanguage;
    document.body.setAttribute('data-dir', direction);
    updateSwitcherLabel(nextLanguage);
    localStorage.setItem(LANGUAGE_KEY, nextLanguage);

    if (shouldTrack) {
      pushEvent('language_switch', { language: nextLanguage });
    }
  }

  function detectInitialLanguage() {
    var savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage === 'fr' || savedLanguage === 'ar') {
      return savedLanguage;
    }

    return navigator.language && navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'fr';
  }

  function handleScrollTracking() {
    var scrollTop = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    var percent = (scrollTop / docHeight) * 100;

    [50, 90].forEach(function (milestone) {
      if (!scrollMilestones[milestone] && percent >= milestone) {
        scrollMilestones[milestone] = true;
        pushEvent('scroll_' + milestone, { percent_scrolled: milestone });
      }
    });
  }

  setLanguage(detectInitialLanguage(), false);

  if (switcher) {
    switcher.addEventListener('click', function () {
      var nextLanguage = root.dataset.language === 'fr' ? 'ar' : 'fr';
      setLanguage(nextLanguage, true);
    });
  }

  trackedElements.forEach(function (element) {
    element.addEventListener('click', function () {
      pushEvent(element.dataset.track, {
        language: root.dataset.language || 'fr',
        href: element.getAttribute('href') || ''
      });
    });
  });

  window.addEventListener('scroll', handleScrollTracking, { passive: true });
})();
