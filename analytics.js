// The Google tag is loaded only after the visitor opts in.
(() => {
  const measurementId = 'G-G4VCYYMVYL';
  const preferenceKey = 'localcodepilot-analytics-consent';
  const banner = document.getElementById('privacy-banner');
  const settings = document.getElementById('privacy-settings');
  const accept = document.getElementById('privacy-accept');
  const decline = document.getElementById('privacy-decline');
  if (!banner || !settings || !accept || !decline) return;

  const readPreference = () => {
    try { return localStorage.getItem(preferenceKey); } catch { return null; }
  };
  const savePreference = (value) => {
    try { localStorage.setItem(preferenceKey, value); } catch { /* private browsing */ }
  };
  const clearAnalyticsCookies = () => {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of [undefined, location.hostname, `.${location.hostname}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
      }
    }
  };

  const startAnalytics = () => {
    if (document.getElementById('google-analytics-tag')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const script = document.createElement('script');
    script.id = 'google-analytics-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  };

  banner.hidden = readPreference() === 'accepted' || readPreference() === 'declined';
  if (readPreference() === 'accepted') startAnalytics();
  settings.addEventListener('click', () => {
    banner.hidden = false;
    accept.focus();
  });
  accept.addEventListener('click', () => {
    savePreference('accepted');
    banner.hidden = true;
    startAnalytics();
  });
  decline.addEventListener('click', () => {
    savePreference('declined');
    // Disable collection immediately, then unload the existing tag (if any).
    window[`ga-disable-${measurementId}`] = true;
    clearAnalyticsCookies();
    banner.hidden = true;
    if (document.getElementById('google-analytics-tag')) location.reload();
  });
})();
