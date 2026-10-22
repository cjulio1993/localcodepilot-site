# localcodepilot-site
Official website for LocalCodePilot, hosted on GitHub Pages.

Languages: Portuguese at `/`, English at `/en/`, Spanish at `/es/`.

Edit `index.html` for the Portuguese source and `translations.json` for English
and Spanish text. Run `python build_locales.py` and commit the generated
`en/index.html` and `es/index.html` pages. All versions share `styles.css` and
`demo.js`; terminal messages are localized in `demo.js`.

Preview with `python -m http.server 4173 --bind 127.0.0.1`, then open `http://localhost:4173/`.
No build step is needed for hosting; translated pages also work without JavaScript.

## SEO and practical guides

The landing pages include localized titles, descriptions, social metadata, FAQ,
practical guide links and community contribution calls to action. The visual
direction presents the product as a local development diagnostic console.

Run `python build_locales.py` after changing the Portuguese landing page or its
translation table. Run `python build_content.py` after editing the bilingual
guide content in that script. Commit the generated HTML files and `sitemap.xml`.
The sitemap includes all seven published page paths. `robots.txt` declares it.
Each translated page has its own canonical and reciprocal language alternates.
Spanish guide links explicitly lead to English until Spanish guides exist.

Analytics emits `download_click`, `github_click` and `guide_click` only after
analytics consent, with language, placement and destination (without query
parameters). Download clicks indicate intent, not completed downloads or installs.
Register these event names in GA4 as needed. Verify the production domain in
Search Console and submit `https://localcodepilot.com.br/sitemap.xml` after deploy.

External community posts and backlink outreach must be performed separately;
editing the website does not publish messages or create external backlinks.

## Current release

The download links point to `0.4.0-alpha.7`. This release adds WordPress detection, container status and controls in Processes,
published service URLs, clearer project actions, and project filters in Processes and Containers.

Container commands are shown before confirmation. Docker or Podman must already be
installed and running; the app does not install or start a container engine.

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

## Platform downloads

Windows cards link to the official 0.4.0-alpha.7 portable ZIP. The standalone
EXE is an update asset, not advertised as an installer. The macOS card links to
the experimental universal DMG for Intel and Apple Silicon. Linux remains
informational. Platform icons are local SVG assets shared across all languages.
