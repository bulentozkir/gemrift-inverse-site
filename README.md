# Gemrift inverse website

Official static GitHub Pages website for **Gemrift inverse — Underwater Puzzle Adventure**.

## Local preview

Open `index.html` directly, or serve this folder with any static file server (for example `python -m http.server 8080 --bind 127.0.0.1`). There is no build step, bundler, or runtime dependency.

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
- `sitemap.xml`: canonical public page URLs and original content images.
- `robots.txt`: crawler policy template and sitemap location; see the GitHub Pages limitation below.

## SEO and performance

- All four public pages have distinct, descriptive titles and summaries, matching Open Graph and Twitter cards, accurate social-image dimensions, large-image preview permission, and absolute HTTPS canonicals. The homepage heading includes the game name. The not-found page remains `noindex`.
- Static JSON-LD connects the website, homepage, Windows game, publisher, and key art. Supporting pages identify their purpose and include visible breadcrumbs matching their `BreadcrumbList` data. Prices, ratings, reviews, and release dates are not invented, and the GIF is not misrepresented as a video rich result.
- English is the canonical content language. `lang` and `scoutTheme` are optional interface preferences, not separate indexable landing pages. Do not add `hreflang` alternates until there are independently addressable, substantially translated pages with matching canonicals and reciprocal language links.
- Crawlable screenshot links work without JavaScript and open native-resolution captures. Responsive WebP previews reduce downloads without replacing those originals. The hero remains high priority, while the gallery and closed lightbox are lazy-loaded.
- The trailer starts with a lightweight poster. JavaScript loads the animated GIF only near the viewport, suspends it offscreen or in a hidden tab, respects reduced motion, and fetches audio only after interaction. A direct GIF link remains available without JavaScript.
- The self-hosted WOFF2 font retains the complete original character coverage, with the original TTF as a fallback. Small header/favicon artwork and an Apple touch icon are derived from the existing game icon.

### Search engine setup after publishing

1. Verify the URL-prefix property `https://bulentozkir.github.io/gemrift-inverse-site/` in Google Search Console and the site in Bing Webmaster Tools using their supported ownership-verification methods.
2. Submit `https://bulentozkir.github.io/gemrift-inverse-site/sitemap.xml` directly in both tools. Inspect the homepage and support page after deployment, and request indexing if appropriate.
3. **GitHub project Pages limitation:** crawlers look for `https://bulentozkir.github.io/robots.txt`, not this project's `/gemrift-inverse-site/robots.txt`. This repository cannot configure that origin-root file. If you also control the user-site repository, add this project's `Sitemap:` directive there without removing policies for other projects. The sitemap and page-level indexing directives here remain useful independently.
4. Monitor indexing and real-user Core Web Vitals after recrawling. Target LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1 at the 75th percentile. Local checks cannot guarantee search rankings, rich results, or field performance.

### Validation

Run the dependency-free regression checks with Python 3:

```text
python -B -m unittest discover -s tests -v
```

These checks cover canonical/sitemap consistency, social previews, linked structured data, content-image discovery, responsive asset references, crawlable gallery fallbacks, and initial media/font delivery. The Pages workflow runs them before deployment; test files are not included in the published site.

## Game content sync

The site reflects **v0.0.8**, rebuilt November 18, 2026, from the sibling `C:\GitHub\gemrift-inverse` game repository. Check its `releases/README.md`, `docs/underwater-caves.md`, and runtime code before changing gameplay claims.

- Solution Bulb: caves 1–20 are available immediately; caves 21–215 require 19 failed attempts in that same cave. The 430 bundled routes run locally with pause, backward/forward steps, and 1×/2×/4× playback. Sprint rooms have no solution and do not add cave failures; remix playback shows the standard proved cave.
- Opening screen: 30-language selector with the default `L` shortcut and RTL-mirrored placement. `07-opening-page.webp` is a fresh, uncropped capture from the packaged v0.0.8 player.
- Audio: filtered music, smoother peak handling, improved creature synthesis, and nearby-creature cue filtering. The existing website trailer soundtrack is unchanged.
- Difficulty: the published campaign's 180 ms base tick is rounded by `LevelDifficulty.ScaleTick` to 230/180/170/150/140 ms. Clocks and air scale with pace; the top three tiers use the all-gems goal and clock.

## Privacy & static assets

All fonts (`static/fonts/Baloo2.woff2`, with the original TTF fallback), artwork, responsive WebP screenshots, trailer audio (`static/audio/gemrift-inverse-trailer.mp3`), and the animated trailer GIF are self-hosted in `static/`. The original Baloo 2 font license remains alongside both font formats. No third-party scripts, analytics, cookies, or browser storage APIs are used; theme and 30-language UI switching use optional `scoutTheme` and `lang` URL query parameters.
