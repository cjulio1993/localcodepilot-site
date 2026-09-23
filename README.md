# localcodepilot-site
Official website for LocalCodePilot, hosted on GitHub Pages.

Languages: Portuguese at `/`, English at `/en/`, Spanish at `/es/`.

Edit `index.html` for the Portuguese source and `translations.json` for English
and Spanish text. Run `python build_locales.py` and commit the generated
`en/index.html` and `es/index.html` pages. All versions share `styles.css` and
`demo.js`; terminal messages are localized in `demo.js`.

Preview with `python -m http.server 4173 --bind 127.0.0.1`, then open `http://localhost:4173/`.
No build step is needed for hosting; translated pages also work without JavaScript.
You can also open `index.html` directly: all language links point to explicit HTML files.

Security: see `SECURITY.md` for protections and hosting limitations.
