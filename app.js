// SPDX-License-Identifier: MPL-2.0
(function () {
  "use strict";
  const catalog = window.EarlyCatalog;
  const model = window.EarlySiteModel;
  const pages = [...catalog.tabs, ...catalog.features];
  const byId = new Map(pages.map((page) => [page.id, page]));
  const $ = (id) => document.getElementById(id);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const routeLink = (id, label, className = "") => `<a href="${id === "home" ? "#" : `#${id}`}" data-route="${id}" class="${className}">${label}</a>`;
  const repo = "https://github.com/earlybrowser/early-browser";
  const externalLink = (url, label, className = "") => `<a href="${url}" class="${className}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;
  const narrow = matchMedia("(max-width: 760px)");
  const state = {
    active: model.resolveRoute(location.hash, pages), historyIndex: 0, historyEnd: 0,
    autoHide: narrow.matches, sidebarVisible: false, sidebarPinnedOpen: false,
    open: false, results: [], selected: 0, prefilled: false, returnFocus: null
  };
  const folderNodes = new Map();
  let reloadTimer, toastTimer, reloadPhase = 0;

  // Paths and dimensions follow Early's BrowserWindowView folder artwork.
  const folderBack = "M 3.42 17.60 Q 1.14 17.60 1.14 15.20 L 1.14 4.60 Q 1.14 2.20 3.42 2.20 L 6.46 2.20 Q 7.22 2.20 7.79 3.00 L 8.93 4.60 Q 9.50 5.40 10.26 5.40 L 14.44 5.40 Q 16.72 5.40 16.72 7.80 L 16.72 15.20 Q 16.72 17.60 14.44 17.60 Z";
  const folderClosed = "M 3.42 17.60 Q 1.14 17.60 1.14 15.20 L 1.14 9.20 Q 1.14 6.80 3.42 6.80 L 15.58 6.80 Q 17.86 6.80 17.86 9.20 L 17.86 15.20 Q 17.86 17.60 15.58 17.60 Z";
  const folderOpen = "M 3.42 17.60 Q 1.90 17.60 2.28 16.00 L 5.13 8.60 Q 5.70 7.40 7.03 7.40 L 16.91 7.40 Q 19.00 7.40 18.24 9.20 L 15.96 16.20 Q 15.39 17.60 14.06 17.60 Z";
  function tabMarkup(page, pinned) {
    return routeLink(page.id, `<span class="tab-icon" aria-hidden="true">${page.icon}</span><span class="tab-title-label">${escapeHTML(page.name)}</span>`, `tab-item-row ${pinned ? "is-pinned" : "is-today"}`).replace("data-route=", `data-tab-id="${page.id}" data-route=`);
  }
  function buildSidebar() {
    catalog.folders.forEach((folder) => {
      const block = document.createElement("div");
      block.className = "folder-block";
      block.setAttribute("role", "group");
      block.setAttribute("aria-label", `${folder.name} folder`);
      block.innerHTML = `<button class="folder-header" type="button" aria-expanded="false" aria-controls="children-${folder.id}">
        <span class="folder-icon-cell" aria-hidden="true"><svg viewBox="0 0 19 20"><path class="folder-back-path" d="${folderBack}"/><path class="folder-cover-path" d="${folderClosed}"/></svg></span>
        <span class="tab-title-label">${folder.name}</span></button>
        <div class="folder-children-wrap" id="children-${folder.id}" inert><div class="folder-children">${catalog.features.filter((feature) => feature.folderId === folder.id).map((feature) => tabMarkup(feature, true)).join("")}</div></div>`;
      const button = block.querySelector("button");
      button.addEventListener("click", () => expandFolder(folder.id, button.getAttribute("aria-expanded") !== "true"));
      $("pinned-items-container").append(block);
      folderNodes.set(folder.id, block);
    });
    $("today-tabs-container").innerHTML = catalog.tabs.map((tab) => tabMarkup(tab, false)).join("");
  }
  function expandFolder(id, expanded) {
    const block = folderNodes.get(id);
    if (!block) return;
    block.classList.toggle("is-expanded", expanded);
    block.querySelector("button").setAttribute("aria-expanded", String(expanded));
    block.querySelector(".folder-children-wrap").inert = !expanded;
    block.querySelector(".folder-cover-path").setAttribute("d", expanded ? folderOpen : folderClosed);
  }
  function updateChrome() {
    document.querySelectorAll("[data-tab-id]").forEach((row) => {
      const active = row.dataset.tabId === state.active;
      row.classList.toggle("is-selected", active);
      if (active) row.setAttribute("aria-current", "page");
      else row.removeAttribute("aria-current");
    });
    $("nav-back").disabled = state.historyIndex === 0;
    $("nav-forward").disabled = state.historyIndex >= state.historyEnd;
    $("address-bar-label").textContent = location.host || "Early";
    $("address-bar-label").classList.remove("is-placeholder");
    $("address-search-icon").setAttribute("hidden", "");
    $("address-copy-link-btn").style.display = "";
    $("address-edit-btn").setAttribute("aria-label", `Edit address for ${byId.get(state.active).name}`);
    document.title = state.active === "home" ? "Early: A native macOS browser" : `${byId.get(state.active).name} — Early`;
  }
  function navigate(id, { push = true, focus = true } = {}) {
    if (!byId.has(id)) return;
    closeCommandBar(false);
    const changed = state.active !== id;
    state.active = id;
    if (push && changed) {
      state.historyIndex += 1;
      state.historyEnd = state.historyIndex;
      history.pushState({ earlySite: true, index: state.historyIndex }, "", model.pageURL(id, location.href));
    }
    expandFolder(byId.get(id).folderId, true);
    updateChrome();
    if (changed || !$("page-heading")) {
      renderPage();
      $("content-viewport").scrollTop = 0;
      if (changed) animateReload();
    }
    if (narrow.matches && state.autoHide) hideSidebar();
    if (focus) $("page-heading").focus({ preventScroll: true });
  }
  function syncLocation() {
    const index = history.state?.earlySite ? history.state.index : null;
    if (Number.isInteger(index)) state.historyIndex = index;
    else {
      state.historyIndex += 1;
      state.historyEnd = state.historyIndex;
      history.replaceState({ earlySite: true, index: state.historyIndex }, "", location.href);
    }
    navigate(model.resolveRoute(location.hash, pages), { push: false });
  }
  window.addEventListener("popstate", syncLocation);
  window.addEventListener("hashchange", () => {
    if (model.resolveRoute(location.hash, pages) !== state.active) syncLocation();
  });
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-route]");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(link.dataset.route);
  });

  const footer = () => `<footer class="page-footer"><span>Early · Open source · MPL-2.0</span><nav aria-label="Project links">${externalLink(repo, "GitHub")}<a href="mailto:earlybrowser.dev@gmail.com">Email</a>${externalLink("https://github.com/sponsors/rangaNP", "Sponsor Early")}</nav></footer>`;
  const breadcrumb = (label) => `<nav class="breadcrumb" aria-label="Breadcrumb">${routeLink("home", "Home")}<span aria-hidden="true">/</span><span>${label}</span></nav>`;
  function renderPage() {
    let content;
    if (state.active === "home") {
      content = `<header class="home-header"><img class="app-icon" src="assets/Early-Default-1024.png" width="68" height="68" alt="" fetchpriority="high">
        <p class="eyebrow">Made for macOS</p><h1 id="page-heading" tabindex="-1">Early</h1>
        <p class="home-lede">A native Mac browser.<br>Room for everything you’re working on.</p>
        <p class="intro">Open source and inspired by Arc’s sidebar workflow. Built with Swift and WebKit, with tabs, folders, and Spaces that keep your browsing organized.</p>
        <div class="page-actions">${routeLink("download", "Get Early", "button button-primary")}${externalLink(repo, "View on GitHub", "button")}</div>
        <p class="development-note"><span class="notice-dot" aria-hidden="true"></span>Actively in development. Not production-ready yet.</p></header>
        <section class="home-command-bar" aria-labelledby="command-bar-heading"><h2 id="command-bar-heading">Find your tab. Run a command.</h2>
          <p>Find existing tabs, pins, and Favorites, switch Spaces or profiles, and run browser actions from one command bar. Return to a saved page without opening a duplicate.</p>
          <p>Type naturally: <strong>Pin Tab</strong>, <strong>Duplicate Tab</strong>, <strong>New Space</strong>, or <strong>Open Settings</strong>. Choose the matching result and keep going.</p>
          ${routeLink("command-bar-navigation", "Explore the command bar <span aria-hidden=\"true\">→</span>", "text-link")}</section>
        <section class="home-overview" aria-labelledby="overview-heading"><h2 id="overview-heading">Less clutter. More context.</h2>
          <div class="editorial-row"><h3>${routeLink("vertical-tabs", "A sidebar that makes sense")}</h3><p>Keep Favorites close, group pins into folders, and leave everyday pages in Today tabs.</p></div>
          <div class="editorial-row"><h3>${routeLink("spaces-and-profiles", "A Space for each part of your day")}</h3><p>Separate projects with Spaces. Keep accounts and website data apart with profiles.</p></div>
          <div class="editorial-row"><h3>${routeLink("native-macos-interface", "At home on your Mac")}</h3><p>Native controls, a keyboard-driven command bar, and a quiet interface that follows your appearance.</p></div>
          ${routeLink("roadmap", "Explore all features <span aria-hidden=\"true\">→</span>", "text-link")}</section>
        <section class="contribute-section"><h2>Help shape what comes next.</h2><p>Early is a work in progress. Code, bug reports, testing, and thoughtful design feedback are welcome.</p>${externalLink(`${repo}/blob/main/CONTRIBUTING.md`, "Contribute to Early <span aria-hidden=\"true\">↗</span>", "text-link")}</section>`;
    } else if (state.active === "download") {
      const command = `git clone ${repo}.git\ncd early-browser\nopen Early.xcodeproj`;
      content = `${breadcrumb("Download & Install")}<header class="article-header"><p class="eyebrow">Try the development build</p><h1 id="page-heading" tabindex="-1">Download & Install</h1><p class="intro">Early is still in active development. For now, building from source is the documented way to try it.</p></header>
        <aside class="information-note">Not production-ready. Keep another browser available for important work, and expect features and behavior to change.</aside>
        <section><h2>Build on your Mac</h2><p>You’ll need macOS 14 or later and Xcode with Swift 6 support. Use an Xcode version compatible with your macOS release.</p>
          <div class="code-block"><div class="code-caption"><span>Terminal</span><button type="button" class="copy-code">Copy</button></div><pre><code>${escapeHTML(command)}</code></pre></div>
          <p>In Xcode, select the <strong>Early</strong> scheme and <strong>My Mac</strong>, then build and run. The repository has the full build and test instructions.</p>
          ${externalLink(`${repo}#commands`, "Read the build instructions <span aria-hidden=\"true\">↗</span>", "text-link")}</section>
        <section><h2>Packaged releases</h2><p>Packaged macOS releases and Homebrew installation are planned. Check GitHub for release availability and installation notes as development progresses.</p>${externalLink(`${repo}/releases`, "Check releases on GitHub <span aria-hidden=\"true\">↗</span>", "text-link")}</section>`;
    } else if (state.active === "roadmap") {
      content = `${breadcrumb("All Features")}<header class="article-header"><p class="eyebrow">What’s in Early</p><h1 id="page-heading" tabindex="-1">All Features</h1><p class="intro">The essentials available today, and a clear view of what’s still ahead.</p></header>
        ${catalog.folders.map((folder) => `<section class="feature-group"><h2>${folder.name}</h2><div class="feature-list">${catalog.features.filter((feature) => feature.folderId === folder.id).map((feature) => routeLink(feature.id, `<span class="feature-list-icon">${feature.icon}</span><span><strong>${feature.name}</strong><span class="feature-description">${feature.description}</span></span><span class="list-arrow" aria-hidden="true">↗</span>`, "feature-list-row")).join("")}</div></section>`).join("")}
        <section><p class="eyebrow">Not available yet</p><h2>Looking ahead</h2><p>These are planned areas of work, not release commitments.</p><dl class="planned-list">${catalog.planned.map((item) => `<div><dt>${item.name}</dt><dd>${item.description}</dd></div>`).join("")}</dl>${externalLink(`${repo}#features`, "See the full project status <span aria-hidden=\"true\">↗</span>", "text-link")}</section>`;
    } else {
      const feature = byId.get(state.active);
      const index = catalog.features.indexOf(feature);
      const previous = catalog.features[index - 1];
      const next = catalog.features[index + 1];
      const folder = catalog.folders.find((item) => item.id === feature.folderId);
      content = `${breadcrumb(folder.name)}<header class="article-header"><span class="article-icon">${feature.icon}</span><p class="eyebrow">${folder.name}</p><h1 id="page-heading" tabindex="-1">${feature.name}</h1><p class="feature-lede">${feature.description}</p><p class="intro">${feature.summary}</p></header>
        <section><h2>How it works</h2><ul class="behavior-list">${feature.behavior.map((item) => `<li>${item}</li>`).join("")}</ul>${feature.note ? `<aside class="information-note">${feature.note}</aside>` : ""}</section>
        <nav class="feature-pagination" aria-label="Feature navigation">${routeLink(previous?.id || "roadmap", `<span>Previous</span><strong>← ${previous?.name || "All Features"}</strong>`)}${routeLink(next?.id || "roadmap", `<span>Next</span><strong>${next?.name || "All Features"} →</strong>`)}</nav>`;
    }
    $("content-viewport").innerHTML = `<article class="page-container">${content}${footer()}</article>`;
    const copy = document.querySelector(".copy-code");
    copy?.addEventListener("click", () => copyText(document.querySelector("pre code").textContent, "Copied Build Instructions"));
  }

  function animateReload() {
    clearTimeout(reloadTimer);
    reloadPhase += 180;
    $("reload-stop-rotator").style.transform = `rotate(${reloadPhase}deg)`;
    $("nav-reload").classList.add("is-loading");
    reloadTimer = setTimeout(() => {
      reloadPhase += 180;
      $("reload-stop-rotator").style.transform = `rotate(${reloadPhase}deg)`;
      $("nav-reload").classList.remove("is-loading");
    }, 160);
  }
  $("nav-back").addEventListener("click", () => history.back());
  $("nav-forward").addEventListener("click", () => history.forward());
  $("nav-reload").addEventListener("click", () => { renderPage(); animateReload(); });

  function openCommandBar(edit = false) {
    if (!state.open) state.returnFocus = document.activeElement;
    if (state.autoHide) hideSidebar();
    state.open = true;
    state.prefilled = edit;
    $("command-bar-layer").hidden = false;
    $("command-bar-input").value = edit ? model.pageURL(state.active, location.href) : "";
    updateSuggestions();
    requestAnimationFrame(() => {
      if (!state.open) return;
      $("command-bar-input").focus({ preventScroll: true });
      if (edit) $("command-bar-input").select();
      layoutCommandBar();
    });
  }
  function closeCommandBar(restoreFocus = true) {
    if (!state.open) return;
    state.open = false;
    $("command-bar-layer").hidden = true;
    $("command-bar-input").setAttribute("aria-expanded", "false");
    if (restoreFocus) {
      const previous = state.returnFocus;
      const target = previous?.isConnected && !previous.closest("[inert]") && previous.getClientRects().length ? previous : $(state.autoHide ? "sidebar-reveal" : "page-heading");
      target.focus({ preventScroll: true });
    }
  }
  function updateSuggestions() {
    const query = state.prefilled ? "" : $("command-bar-input").value.trim();
    const matches = state.prefilled ? [] : model.commandBarPages(query, catalog);
    state.results = matches.map((page) => ({ kind: "page", page, label: page.name, detail: "On this site", icon: page.icon }));
    const action = model.classifyInput(state.prefilled ? "" : query);
    if (action.kind === "url") state.results.push({ ...action, label: query, detail: "Opens a new tab", icon: catalog.features.find((feature) => feature.id === "command-bar-navigation").icon });
    state.selected = 0;
    const noMatches = action.kind === "text" && !state.results.length;
    $("command-bar-hint").textContent = action.kind === "invalid" ? "Enter an http or https address without account credentials." : noMatches ? "No matching pages. Try “Spaces”, “Profiles”, or “Home”." : !query ? "Choose a main tab, search Early’s features, or enter a web address. ⌘K / Ctrl K" : "↑ ↓ to select · → to fill · Return to open";
    $("command-bar-hint").classList.toggle("sr-only", action.kind !== "invalid" && !noMatches);
    $("command-bar-suggestions-wrap").hidden = state.results.length === 0;
    $("command-bar-input").setAttribute("aria-expanded", String(state.results.length > 0));
    $("command-bar-suggestions").innerHTML = state.results.map((result, index) => `<div class="command-bar-suggestion" id="suggestion-${index}" role="option" aria-selected="false" data-index="${index}"><span class="suggestion-icon" aria-hidden="true">${result.icon}</span><span class="suggestion-label">${escapeHTML(result.label)}</span><span class="suggestion-detail">${result.detail}</span></div>`).join("");
    $("command-bar-status").textContent = `${state.results.length} ${state.results.length === 1 ? "result" : "results"}`;
    selectSuggestion(0, false);
    layoutCommandBar();
  }
  function selectSuggestion(index, scroll = true) {
    if (!state.results.length) {
      $("command-bar-input").removeAttribute("aria-activedescendant");
      return;
    }
    state.selected = (index + state.results.length) % state.results.length;
    $("command-bar-suggestions").querySelectorAll("[role=option]").forEach((row, rowIndex) => row.setAttribute("aria-selected", String(rowIndex === state.selected)));
    $("command-bar-input").setAttribute("aria-activedescendant", `suggestion-${state.selected}`);
    if (scroll) $(`suggestion-${state.selected}`).scrollIntoView({ block: "nearest" });
  }
  function executeSuggestion(result) {
    if (!result) {
      if (state.prefilled) closeCommandBar();
      return;
    }
    if (result.kind === "page") { navigate(result.page.id); return; }
    const url = new URL(result.url);
    if (url.origin === location.origin && url.pathname === location.pathname) {
      navigate(model.resolveRoute(url.hash, pages));
      return;
    }
    window.open(result.url, "_blank", "noopener,noreferrer");
    closeCommandBar();
  }
  function layoutCommandBar() {
    if (!state.open) return;
    const height = $("content-area").clientHeight;
    const top = Math.max(16, height * 0.40 - 32);
    const maximum = Math.max(64, Math.min(440, height - top - 16));
    const input = $("command-bar-input");
    const hint = $("command-bar-hint");
    const statusHeight = hint.classList.contains("sr-only") || !hint.offsetHeight ? 0 : hint.offsetHeight + 12;
    const reserve = state.results.length ? 61 : 0;
    const inputMaximum = Math.min(120, Math.max(24, maximum - 40 - statusHeight - reserve));
    input.style.height = "24px";
    const inputHeight = Math.min(inputMaximum, input.scrollHeight);
    input.style.height = `${inputHeight}px`;
    input.style.overflowY = input.scrollHeight > inputMaximum ? "auto" : "hidden";
    $("command-bar-card").style.top = `${top}px`;
    $("command-bar-suggestions").style.maxHeight = `${Math.min(220, Math.max(0, maximum - 40 - inputHeight - statusHeight - 25))}px`;
  }
  $("new-tab-btn").addEventListener("click", () => openCommandBar());
  $("address-edit-btn").addEventListener("click", () => openCommandBar(true));
  $("command-bar-dismiss").addEventListener("click", () => closeCommandBar());
  $("command-bar-input").addEventListener("input", () => { state.prefilled = false; updateSuggestions(); });
  $("command-bar-input").addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    const input = event.currentTarget;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!state.results.length) return;
      event.preventDefault();
      selectSuggestion(state.selected + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "ArrowRight" && input.selectionStart === input.value.length && input.selectionEnd === input.value.length && state.results[state.selected]) {
      const result = state.results[state.selected];
      if (result.kind !== "page") return;
      event.preventDefault();
      input.value = result.page.name;
      state.prefilled = false;
      updateSuggestions();
      input.setSelectionRange(input.value.length, input.value.length);
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      executeSuggestion(state.results[state.selected]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeCommandBar();
    }
  });
  $("command-bar-suggestions").addEventListener("pointerdown", (event) => event.preventDefault());
  $("command-bar-suggestions").addEventListener("pointermove", (event) => {
    const row = event.target.closest("[data-index]");
    if (row) selectSuggestion(Number(row.dataset.index), false);
  });
  $("command-bar-suggestions").addEventListener("click", (event) => {
    const row = event.target.closest("[data-index]");
    if (row) executeSuggestion(state.results[Number(row.dataset.index)]);
  });
  document.addEventListener("pointerdown", (event) => {
    if (state.open && !event.target.closest("#command-bar-card, #address-edit-btn, #new-tab-btn")) closeCommandBar(false);
    if (narrow.matches && state.sidebarVisible && !event.target.closest("#sidebar, #sidebar-reveal")) hideSidebar();
  });
  document.addEventListener("focusin", (event) => {
    if (state.open && !event.target.closest("#command-bar-card")) closeCommandBar(false);
  });
  new ResizeObserver(layoutCommandBar).observe($("content-area"));

  function updateSidebar() {
    $("browser-window").classList.toggle("sidebar-autohide", state.autoHide);
    $("browser-window").classList.toggle("sidebar-visible", state.sidebarVisible);
    $("sidebar").inert = state.autoHide && !state.sidebarVisible;
    $("sidebar-reveal").setAttribute("aria-expanded", String(state.sidebarVisible));
  }
  function showSidebar(pinned = false) { state.sidebarVisible = true; state.sidebarPinnedOpen = pinned; updateSidebar(); }
  function hideSidebar() { state.sidebarVisible = false; state.sidebarPinnedOpen = false; updateSidebar(); }
  $("sidebar-reveal").addEventListener("click", () => {
    if (state.sidebarVisible) hideSidebar();
    else { showSidebar(true); $("address-edit-btn").focus(); }
  });
  $("sidebar-edge-sensor").addEventListener("pointerenter", (event) => {
    // Narrow layouts use the explicit reveal button. A pointer already at the
    // viewport edge can otherwise open the drawer as it mounts or resizes.
    if (state.autoHide && !narrow.matches && event.pointerType === "mouse") showSidebar();
  });
  $("sidebar").addEventListener("pointerleave", () => {
    if (state.autoHide && !state.sidebarPinnedOpen && !$("sidebar").contains(document.activeElement)) hideSidebar();
  });
  narrow.addEventListener("change", () => { state.autoHide = narrow.matches; hideSidebar(); });
  const handle = $("sidebar-resize-handle");
  function resizeSidebar(width) {
    const bounded = Math.round(Math.min(360, Math.max(220, width)));
    $("browser-window").style.setProperty("--sidebar-width", `${bounded}px`);
    handle.setAttribute("aria-valuenow", String(bounded));
  }
  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    document.body.classList.add("is-resizing");
  });
  handle.addEventListener("pointermove", (event) => {
    if (handle.hasPointerCapture(event.pointerId)) resizeSidebar(event.clientX - $("sidebar").getBoundingClientRect().left);
  });
  handle.addEventListener("lostpointercapture", () => document.body.classList.remove("is-resizing"));
  handle.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = Number(handle.getAttribute("aria-valuenow"));
    resizeSidebar(event.key === "Home" ? 220 : event.key === "End" ? 360 : current + (event.key === "ArrowRight" ? 10 : -10));
  });
  $("footer-download").addEventListener("click", () => navigate("download"));
  $("footer-spaces").addEventListener("click", () => navigate("spaces-and-profiles"));

  function toast(message) {
    clearTimeout(toastTimer);
    $("toast-host").textContent = message;
    $("toast-host").classList.add("is-visible");
    toastTimer = setTimeout(() => $("toast-host").classList.remove("is-visible"), 2000);
  }
  async function copyText(text, message) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      toast(message);
    } catch { toast("Couldn’t copy. Check your browser’s clipboard permission."); }
  }
  $("address-copy-link-btn").addEventListener("click", () => copyText(model.pageURL(state.active, location.href), "Copied Current URL"));
  document.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) return;
    const modifier = event.metaKey || event.ctrlKey;
    const key = event.key.toLowerCase();
    if (modifier && !event.altKey && !event.shiftKey && ["k", "t", "l"].includes(key)) {
      event.preventDefault(); openCommandBar(key === "l");
    } else if (modifier && event.shiftKey && key === "c") {
      event.preventDefault(); copyText(model.pageURL(state.active, location.href), "Copied Current URL");
    } else if (event.key === "Escape" && state.sidebarVisible && !state.open) {
      hideSidebar(); $("sidebar-reveal").focus();
    }
  });

  buildSidebar();
  updateSidebar();
  history.replaceState({ earlySite: true, index: 0 }, "", model.pageURL(state.active, location.href));
  navigate(state.active, { push: false, focus: false });
})();
