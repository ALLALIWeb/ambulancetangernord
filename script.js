(function () {
  var root = document.documentElement;
  var switcher = document.getElementById('language-switcher');
  var scrollMilestones = { 50: false, 90: false };
  var LANGUAGE_KEY = 'ambulance-tanger-language';
  var switcherText = document.getElementById('language-switcher-text');
  var switcherFlag = document.getElementById('language-switcher-flag');
  var switcherStatus = document.getElementById('language-status');

  function pushEvent(eventName, payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload || {}));

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload || {});
    }
  }

  function readStoredLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function writeStoredLanguage(language) {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      // Ignore storage failures and keep the page functional.
    }
  }

  function updateSwitcherLabel(language) {
    if (!switcher) return;

    if (switcherText) {
      switcherText.textContent = language === 'ar' ? 'العربية | Français' : 'Français | العربية';
    }

    if (switcherFlag) {
      switcherFlag.textContent = language === 'ar' ? '🇲🇦' : '🇫🇷';
    }

    if (switcherStatus) {
      switcherStatus.textContent = language === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Langue changée : français';
    }

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
    writeStoredLanguage(nextLanguage);

    if (shouldTrack) {
      pushEvent('language_switch', { language: nextLanguage });
    }
  }

  function detectInitialLanguage() {
    var savedLanguage = readStoredLanguage();
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

  document.addEventListener('click', function (event) {
    var trackedElement = event.target.closest('[data-track]');

    if (!trackedElement) {
      return;
    }

    var payload = {
      language: root.dataset.language || 'fr'
    };

    if (trackedElement.hasAttribute('href')) {
      payload.href = trackedElement.getAttribute('href');
    }

    pushEvent(trackedElement.dataset.track, payload);
  });

  window.addEventListener('scroll', handleScrollTracking, { passive: true });
})();
