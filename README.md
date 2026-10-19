# Early Website

Official website for [Early](https://github.com/earlybrowser/early-browser), an open-source native macOS browser. The site recreates Early’s sidebar, folder artwork, Favorites, and floating command bar using static HTML, CSS, and JavaScript. No framework, build step, or runtime dependencies are required.

## Preview

From this repository:

```sh
python3 -m http.server 4177 --bind 127.0.0.1
```

Open [localhost:4177](http://localhost:4177). The sidebar collapses on small screens; its top-left button reveals it. The site follows the system’s light or dark appearance and reduced-motion preference.

## Content and navigation

Keep `features-data.js` limited to major features that are available in the browser. Planned work belongs in the separate roadmap list, not in sidebar feature tabs. Verify availability against the browser repository before updating download or release claims.

The command bar searches this site locally and ranks feature names ahead of incidental mentions. Open it with **New Tab** or **⌘K / Ctrl K**. Use Up/Down to select, Right Arrow to fill a feature name, Return to open, and Escape to dismiss. Shift-Return adds a line. Entered web addresses and explicit Google searches open externally; typing alone sends no search requests. Host browsers reserve some native shortcuts such as ⌘T and ⌘L, so those are not guaranteed to reach the site.

Pages use hash routes so deep links work on static hosting, including project subdirectories. Toolbar and browser Back/Forward both work. URL copying requires a secure context (HTTPS or localhost) and clipboard permission.

## Checks

With Node.js 22 or later, no package installation is needed:

```sh
npm test
node --check app.js
node --check site-model.js
node --check features-data.js
```

Before publishing, also check the Home link, folder expansion, keyboard search, first-click outside dismissal, Back/Forward, clipboard success and denial, and narrow-screen navigation in a real browser. Check light/dark appearance and reduced motion. The macOS app and its native UI tests are separate from this website.
