# Security notes

This is a static public website. The terminal is a simulation: it does not execute
commands, access local projects, or call a backend. Do not add credentials or private
files to this repository or its published output.

## Implemented protections

- Terminal messages and button labels use DOM text nodes, not HTML injection.
- External links opened in new tabs use `noopener noreferrer`.
- A `no-referrer` policy avoids sending the page address with outgoing requests.
- A baseline meta Content Security Policy blocks embedded objects, frames,
  form submissions, base URL changes, and scripted network connections.
- The only JavaScript is the shared local `demo.js`. Google Fonts remains an
  external stylesheet/font dependency.
- Preview instructions bind the development server to the loopback interface.
  Python's development server is not a production server and can list directories.

## Hosting checks before publication

Enable **Enforce HTTPS** in GitHub Pages settings and verify it for the custom domain.
This repository change does not configure or verify the live hosting settings.

The baseline CSP does not restrict script or stylesheet sources; it preserves
direct `file://` previews. It is not a complete XSS defense. A production CSP should
also restrict these sources, tested over HTTPS with the real font dependencies.

Response headers such as `X-Content-Type-Options: nosniff`, a suitable
`Permissions-Policy`, and CSP `frame-ancestors 'none'` require hosting or proxy
configuration. `frame-ancestors` cannot be enforced through a CSP meta tag.
Do not represent these response-header protections as enabled by this repository.

References:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
