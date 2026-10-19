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

The command bar searches this site locally and ranks feature names ahead of incidental mentions. Open it with **New Tab** or **⌘K / Ctrl K** to see Home, Download & Install, and All Features; typing filters the site’s pages. Use Up/Down to select, Right Arrow to fill a page name, Return to open, and Escape to dismiss. Shift-Return adds a line. Explicit web addresses open externally, but there is no Google search option or web-search fallback. Typing alone sends no search requests. Host browsers reserve some native shortcuts such as ⌘T and ⌘L, so those are not guaranteed to reach the site.

Pages use hash routes so deep links work on static hosting, including project subdirectories. Toolbar and browser Back/Forward both work. URL copying requires a secure context (HTTPS or localhost) and clipboard permission.

Stylesheet and script URLs include content hashes so previews and published pages request matching assets after an update. After editing CSS or JavaScript, run `npm run assets:stamp` and commit the updated `index.html` with those changes. If a live preview still displays an old layout, restart its server from this repository and reload the page.

Feature-page and tab icons are bundled SVGs adapted from [Lucide 0.468.0](https://github.com/lucide-icons/lucide/tree/0.468.0/icons), with a lighter stroke to suit Early’s chrome. The [ISC notice](licenses/lucide.txt) is included. Browser toolbar and folder-header artwork remain matched to the native app; no icon font or external icon requests are used.

## Checks

With Node.js 22 or later, no package installation is needed:

```sh
npm test
node --check app.js
node --check site-model.js
node --check features-data.js
```

Before publishing, also check the Home link, folder expansion, keyboard search, first-click outside dismissal, Back/Forward, clipboard success and denial, and narrow-screen navigation in a real browser. Check light/dark appearance and reduced motion. The macOS app and its native UI tests are separate from this website.

The full-page browser checks validate the toolbar’s horizontal layout, sidebar/page geometry, visible non-interactive sidebar icon, command-bar suggestions, and mobile navigation in both appearances:

```sh
npm ci
npx playwright install chromium
npm run test:browser
```

The test runner starts and stops its own local preview server when one is not already running. Playwright is a development dependency only; publishing the site still requires no JavaScript build or runtime packages.
