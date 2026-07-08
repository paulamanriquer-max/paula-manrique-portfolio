# Paula Manrique Portfolio

Static portfolio website for Paula Manrique, featuring product design case
studies for Instant Human Review, StickerSwap, ShotTracker Pulse, and
ShotTracker Go.

## Preview

Open `index.html` in a browser, or start a tiny local server from this folder:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Update Content

- Edit homepage structure and copy in `index.html`.
- Edit colors, spacing, typography, and responsive behavior in `styles.css`.
- Replace local image files in `assets/`.
- Project detail pages live under `projects/`.
- Shared project image lightbox behavior lives in `case-lightbox.js`.

## Publish

This site has no build step.

For Netlify:

- Build command: leave blank
- Publish directory: `.`

The included `netlify.toml` also defines those settings for connected Git
deploys.
