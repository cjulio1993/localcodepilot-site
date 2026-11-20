// Apply the preferred theme before styles load, then wire the visible toggle.
(() => {
  const key = 'localcodepilot-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  const labels = {
    pt: { light: 'Ativar tema claro', dark: 'Ativar tema escuro' },
    en: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
    es: { light: 'Activar tema claro', dark: 'Activar tema oscuro' }
  };

  // Inline SVG renders the same in every font, unlike the ☀/☾ glyphs.
  const svg = (body) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">${body}</svg>`;
  const icons = {
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"/>')
  };

  const saved = () => {
    try {
      const value = localStorage.getItem(key);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  };

  const apply = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = theme === 'dark' ? '#11171c' : '#eaf2f2';
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const lang = root.lang.split('-')[0];
    const words = labels[lang] || labels.pt;
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('aria-label', theme === 'dark' ? words.light : words.dark);
    button.title = button.getAttribute('aria-label');
    button.querySelector('.theme-icon').innerHTML = theme === 'dark' ? icons.sun : icons.moon;
  };

  apply(saved() || (media.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, next); } catch { /* Private browsing */ }
      apply(next);
    });
  });
  media.addEventListener('change', () => {
    if (!saved()) apply(media.matches ? 'dark' : 'light');
  });
})();
