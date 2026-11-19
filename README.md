# Gemrift inverse website

Official static GitHub Pages website for **Gemrift inverse — Underwater Puzzle Adventure**.

## Local preview

Open `index.html` directly, or serve this folder with any static file server (for example `python -m http.server 8080`). There is no build step, bundler, or runtime dependency.

## GitHub Pages deployment

The single workflow in `.github/workflows/static.yml` deploys the site automatically when changes are pushed to `main` or when manually triggered from **Actions**.

- Published URL: **https://bulentozkir.github.io/gemrift-inverse-site/**
- Store CTA link: points to the Microsoft Store purchase page (`https://apps.microsoft.com/detail/9P50M5F8CHBM?hl=en-us&gl=US&ocid=pdpshare`) in `index.html`, `support.html`, `privacy.html`, and `copyright.html`.

## Pages and structure

- `index.html`: hero showcase, animated gameplay trailer GIF (`static/images/gemrift-inverse-trailer.gif`), live inverse-physics schematic, native screenshot gallery with lightbox (1920×1111 gameplay/interface and a 1440×900 opening capture), 8-creature bestiary (with Standard vs Remixed toggle), interactive 1–5 diamond difficulty selector, Milo Coppercap showcase, and controls/accessibility guide.
- `support.html`: player FAQ and local `.eml` support email draft generator (with optional attachment up to 5 MB; nothing is uploaded).
- `privacy.html`: tracker-free static site privacy, GitHub Pages hosting, voluntary support contact, and offline local game save behavior.
- `copyright.html`: ownership, original 215-cave campaign & Milo Coppercap credits, `Baloo 2` SIL Open Font License 1.1 credit, and engine acknowledgements.
- `404.html`: custom not-found page using project-root `/gemrift-inverse-site/` paths for GitHub Pages.
- `sitemap.xml`: canonical public page URLs.
- `robots.txt`: crawler access policy and sitemap location.

## Game content sync

The site reflects **v0.0.8**, rebuilt November 18, 2026, from the sibling `C:\GitHub\gemrift-inverse` game repository. Check its `releases/README.md`, `docs/underwater-caves.md`, and runtime code before changing gameplay claims.

- Solution Bulb: caves 1–20 are available immediately; caves 21–215 require 19 failed attempts in that same cave. The 430 bundled routes run locally with pause, backward/forward steps, and 1×/2×/4× playback. Sprint rooms have no solution and do not add cave failures; remix playback shows the standard proved cave.
- Opening screen: 30-language selector with the default `L` shortcut and RTL-mirrored placement. `07-opening-page.webp` is a fresh, uncropped capture from the packaged v0.0.8 player.
- Audio: filtered music, smoother peak handling, improved creature synthesis, and nearby-creature cue filtering. The existing website trailer soundtrack is unchanged.
- Difficulty: the published campaign's 180 ms base tick is rounded by `LevelDifficulty.ScaleTick` to 230/180/170/150/140 ms. Clocks and air scale with pace; the top three tiers use the all-gems goal and clock.

## Privacy & static assets

All fonts (`static/fonts/Baloo2.ttf`), artwork, WebP screenshots, trailer audio (`static/audio/gemrift-inverse-trailer.mp3`), and the optimized animated trailer GIF are self-hosted in `static/`. No third-party scripts, analytics, cookies, or browser storage APIs are used; theme and 30-language UI switching use optional `scoutTheme` and `lang` URL query parameters.
