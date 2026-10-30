# Gemrift inverse website

A static, responsive website for **Gemrift inverse — Underwater Puzzle Adventure**. The project is in development; game details and artwork may change before release.

## Local preview

Open `index.html` directly, or serve this folder with any static file server. There is no build step or runtime dependency.

## GitHub Pages

The single workflow in `.github/workflows/static.yml` deploys the site when changes are pushed to `main` and when manually run.

1. Open [repository Settings → Pages](https://github.com/bulentozkir/gemrift-inverse-site/settings/pages) and select **GitHub Actions** as the build and deployment source if it is not already selected. Pages must be enabled before the workflow can deploy.
2. Push to `main`, or run **Deploy static content to Pages** from the **Actions** tab.

Published URL: **https://bulentozkir.github.io/gemrift-inverse-site/** (note the hyphen between `gemrift` and `inverse`).

Like the original Gemrift site, the workflow stages the public files in `_site` and uploads that single directory. No build tool is needed.

The site uses only local assets and does not require a backend.

## Pages and support

- `index.html`: the game, campaign, characters, and current controls.
- `support.html`: development FAQ and a support email draft generator with an optional attachment up to 5 MB.
- `privacy.html`: website privacy, current development-build information, hosting, and voluntary support contact.
- `copyright.html`: ownership and artwork credits without borrowing the original game's Store identity.
- `404.html`: a custom not-found page with project-root asset links.
- `sitemap.xml`: the public page URLs.

The support form creates a local `.eml` draft. It does not upload data or send email; the player reviews and sends it in their own mail app. The site has no analytics, tracking scripts, cookies, or browser storage. Theme selection travels in the `scoutTheme` URL parameter rather than being stored.

All root HTML pages and the sitemap are included automatically in the Pages artifact. Pricing, Store links, and a release date must only be added once confirmed for Gemrift inverse.

## Artwork

The images in `static/images/` are presentation artwork from the local Gemrift inverse game project. There is currently no gameplay footage on the site.

The shared visual theme uses the official underwater key art, cave-strata and tile-grid textures, rising-rock motion, drifting bubbles, and original line icons for the four sea enemies.
