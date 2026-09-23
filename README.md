# localcodepilot-site
Official website for LocalCodePilot, hosted on GitHub Pages.

Languages: Portuguese at `/`, English at `/en/`, Spanish at `/es/`.

Edit `index.html` for the Portuguese source and `translations.json` for English
and Spanish text. Run `python build_locales.py` and commit the generated
`en/index.html` and `es/index.html` pages. All versions share `styles.css` and
`demo.js`; terminal messages are localized in `demo.js`.

Preview with `python -m http.server 4173 --bind 127.0.0.1`, then open `http://localhost:4173/`.
No build step is needed for hosting; translated pages also work without JavaScript.

## Analytics

`analytics.js` uses the GA4 measurement ID for this site (`G-G4VCYYMVYL`). The
Google tag is loaded only if a visitor accepts the privacy prompt. Declining does
not load the tag; the footer's Privacy button lets visitors change their choice.
The choice is saved locally in the browser. The analytics dashboard is accessible
through the owner's Google Analytics account, not a public page on this site.

Enable Enhanced measurement > Outbound clicks in the GA4 web data stream to
measure visits that click through to GitHub. A click on a release link is not a
confirmed download. When the alpha's binaries are published as GitHub Release
assets, GitHub exposes each asset's `download_count` separately.

To verify the integration, accept analytics and check GA4 Realtime; repeat after
declining and confirm no request to `googletagmanager.com` or
`google-analytics.com` is sent on a fresh visit. Browser privacy tools may block
the tag even if accepted.
Public language links use clean directory URLs. `navigation.js` also removes
`index.html` from HTTP(S) addresses without reloading, preserving queries and anchors.
You can open `index.html` directly: with JavaScript enabled, language links are
adapted to explicit HTML files only for `file://` previews.

Security: see `SECURITY.md` for protections and hosting limitations.
