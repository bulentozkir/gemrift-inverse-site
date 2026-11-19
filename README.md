# Gemrift inverse website

Official static GitHub Pages website for **Gemrift inverse — Underwater Puzzle Adventure**.

## Local preview

Open `index.html` directly, or serve this folder with any static file server (for example `python -m http.server 8080`). There is no build step, bundler, or runtime dependency.

## GitHub Pages deployment

The single workflow in `.github/workflows/static.yml` deploys the site automatically when changes are pushed to `main` or when manually triggered from **Actions**.

- Published URL: **https://bulentozkir.github.io/gemrift-inverse-site/**
- Store CTA link: points to the Microsoft Store purchase page (`https://apps.microsoft.com/detail/9P50M5F8CHBM?hl=en-us&gl=US&ocid=pdpshare`) in `index.html`, `support.html`, `privacy.html`, and `copyright.html`.

## Pages and structure

- `index.html`: hero showcase, animated gameplay trailer GIF (`static/images/gemrift-inverse-trailer.gif`), live inverse-physics schematic, native 1920×1111 screenshot gallery with lightbox, 8-creature bestiary (with Standard vs Remixed toggle), interactive 1–5 diamond difficulty selector, Milo Coppercap showcase, and controls/accessibility guide.
- `support.html`: player FAQ and local `.eml` support email draft generator (with optional attachment up to 5 MB; nothing is uploaded).
- `privacy.html`: tracker-free static site privacy, GitHub Pages hosting, voluntary support contact, and offline local game save behavior.
- `copyright.html`: ownership, original 215-cave campaign & Milo Coppercap credits, `Baloo 2` SIL Open Font License 1.1 credit, and engine acknowledgements.
- `404.html`: custom not-found page using project-root `/gemrift-inverse-site/` paths for GitHub Pages.
- `sitemap.xml`: canonical public page URLs.
- `robots.txt`: crawler access policy and sitemap location.

## Privacy & static assets

All fonts (`static/fonts/Baloo2.ttf`), artwork, WebP screenshots, trailer audio (`static/audio/gemrift-inverse-trailer.mp3`), and the optimized animated trailer GIF are self-hosted in `static/`. No third-party scripts, analytics, cookies, or browser storage APIs are used; theme and 30-language UI switching use optional `scoutTheme` and `lang` URL query parameters.
