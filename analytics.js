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
  // Click intent only: this does not claim an installation or completed download.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link || readPreference() !== 'accepted' || typeof window.gtag !== 'function') return;
    const url = new URL(link.href, location.href);
    let eventName;
    if (url.hostname === 'github.com' && url.pathname.includes('/releases/download/')) eventName = 'download_click';
    else if (url.hostname === 'github.com') eventName = 'github_click';
    else if (url.origin === location.origin && /\/(docs|blog)\//.test(url.pathname)) eventName = 'guide_click';
    if (!eventName) return;
    window.gtag('event', eventName, {
      language: document.documentElement.lang,
      placement: link.closest('section')?.id || (link.closest('header') ? 'header' : 'footer'),
      link_url: url.origin + url.pathname,
      transport_type: 'beacon'
    });
  });
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
