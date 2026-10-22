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
    button.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
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
