# localcodepilot-site
Official website for LocalCodePilot, hosted on GitHub Pages.

Languages: Portuguese at `/`, English at `/en/`, Spanish at `/es/`.

Edit `index.html` for the Portuguese source and `translations.json` for English
and Spanish text. Run `python build_locales.py` and commit the generated
`en/index.html` and `es/index.html` pages. All versions share `styles.css` and
`demo.js`; terminal messages are localized in `demo.js`.

Preview with `python -m http.server 4173 --bind 127.0.0.1`, then open `http://localhost:4173/`.
No build step is needed for hosting; translated pages also work without JavaScript.
Public language links use clean directory URLs. `navigation.js` also removes
`index.html` from HTTP(S) addresses without reloading, preserving queries and anchors.
You can open `index.html` directly: with JavaScript enabled, language links are
adapted to explicit HTML files only for `file://` previews.

Security: see `SECURITY.md` for protections and hosting limitations.
