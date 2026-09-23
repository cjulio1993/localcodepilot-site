// Keep public URLs clean while supporting previews opened directly from disk.
(() => {
  if (window.location.protocol === 'file:') {
    document.querySelectorAll('.language-switch a').forEach(link => {
      const destination = new URL(link.getAttribute('href'), window.location.href);
      if (destination.pathname.endsWith('/')) {
        destination.pathname += 'index.html';
        link.href = destination.href;
      }
    });
    return;
  }

  if (['https:', 'http:'].includes(window.location.protocol) &&
      window.location.pathname.endsWith('/index.html')) {
    const destination = new URL(window.location.href);
    destination.pathname = destination.pathname.slice(0, -'index.html'.length);
    // Preserve query parameters and anchors without a reload or extra history entry.
    window.history.replaceState(window.history.state, '', destination.href);
  }
})();
