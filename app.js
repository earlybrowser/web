// SPDX-License-Identifier: MPL-2.0
// Early Official Website — User-Focused Native Browser Interface

(function () {
  "use strict";

  // =========================================================================
  // 1. EXACT FOLDER SVG PATHS (BrowserWindowView.swift)
  // =========================================================================
  const FOLDER_BACK_PATH =
    "M 3.42 17.60 Q 1.14 17.60 1.14 15.20 L 1.14 4.60 Q 1.14 2.20 3.42 2.20 L 6.46 2.20 Q 7.22 2.20 7.79 3.00 L 8.93 4.60 Q 9.50 5.40 10.26 5.40 L 14.44 5.40 Q 16.72 5.40 16.72 7.80 L 16.72 15.20 Q 16.72 17.60 14.44 17.60 Z";

  const FOLDER_COVER_CLOSED_PATH =
    "M 3.42 17.60 Q 1.14 17.60 1.14 15.20 L 1.14 9.20 Q 1.14 6.80 3.42 6.80 L 15.58 6.80 Q 17.86 6.80 17.86 9.20 L 17.86 15.20 Q 17.86 17.60 15.58 17.60 Z";

  const FOLDER_COVER_OPEN_PATH =
    "M 3.42 17.60 Q 1.90 17.60 2.28 16.00 L 5.13 8.60 Q 5.70 7.40 7.03 7.40 L 16.91 7.40 Q 19.00 7.40 18.24 9.20 L 15.96 16.20 Q 15.39 17.60 14.06 17.60 Z";

  // =========================================================================
  // 2. STATE MODEL
  // =========================================================================
  const folders = (window.EARLY_FOLDERS || []).map((f) => ({ ...f }));
  const todayTabs = (window.EARLY_TODAY_TABS || []).map((t) => ({ ...t }));
  const features = (window.EARLY_FEATURES || []).map((f) => ({ ...f }));

  const state = {
    activeTabId: "home",
    history: ["home"],
    historyIndex: 0,

    sidebarWidth: 240,
    sidebarAutoHide: false,
    sidebarHovered: false,

    readmeFilter: "all", // "all" | "implemented" | "partial" | "planned"

    commandBarOpen: false,
    commandBarMode: "newTab",
    commandBarQuery: "",
    commandBarSelectedIndex: 0,
    commandBarItems: []
  };

  // =========================================================================
  // 3. DOM REFERENCES
  // =========================================================================
  const dom = {
    browserWindow: document.getElementById("browser-window"),
    sidebar: document.getElementById("sidebar"),
    sidebarEdgeSensor: document.getElementById("sidebar-edge-sensor"),
    sidebarResizeHandle: document.getElementById("sidebar-resize-handle"),
    sidebarToggleBtn: document.getElementById("sidebar-toggle-btn"),
    navBack: document.getElementById("nav-back"),
    navForward: document.getElementById("nav-forward"),
    navReload: document.getElementById("nav-reload"),
    reloadRotator: document.getElementById("reload-stop-rotator"),
    addressBar: document.getElementById("sidebar-address-bar"),
    addressSearchIcon: document.getElementById("address-search-icon"),
    addressBarLabel: document.getElementById("address-bar-label"),
    addressCopyLinkBtn: document.getElementById("address-copy-link-btn"),
    pinnedContainer: document.getElementById("pinned-items-container"),
    todayContainer: document.getElementById("today-tabs-container"),
    newTabBtn: document.getElementById("new-tab-btn"),
    pageLoadingLine: document.getElementById("page-loading-line"),
    commandBarLayer: document.getElementById("command-bar-layer"),
    commandBarCard: document.getElementById("command-bar-card"),
    commandBarInput: document.getElementById("command-bar-input"),
    commandBarDismiss: document.getElementById("command-bar-dismiss"),
    commandBarSuggestionsWrap: document.getElementById("command-bar-suggestions-wrap"),
    commandBarSuggestions: document.getElementById("command-bar-suggestions"),
    toastHost: document.getElementById("toast-host"),
    contentViewport: document.getElementById("content-viewport")
  };

  // =========================================================================
  // 4. SIDEBAR RENDERING (Feature-Wise Folders + Today Tabs)
  // =========================================================================
  function createFolderSVG(isExpanded) {
    const coverPath = isExpanded ? FOLDER_COVER_OPEN_PATH : FOLDER_COVER_CLOSED_PATH;
    return `
      <span class="folder-icon-cell" aria-hidden="true">
        <svg class="folder-icon-svg" viewBox="0 0 19 20">
          <path class="folder-back-path" d="${FOLDER_BACK_PATH}"></path>
          <path class="folder-cover-path" d="${coverPath}"></path>
        </svg>
      </span>
    `;
  }

  function createFeatureTabRow(feature) {
    const isSelected = state.activeTabId === feature.id;
    const row = document.createElement("div");
    row.className = `tab-item-row is-pinned${isSelected ? " is-selected" : ""}`;
    row.dataset.tabId = feature.id;
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.title = `${feature.name} (${feature.status})`;

    row.innerHTML = `
      <span class="pinned-icon-cell" aria-hidden="true">${feature.icon}</span>
      <span class="tab-title-label">${escapeHTML(feature.name)}</span>
      <span class="tab-state-badge ${feature.statusType}">${feature.status}</span>
    `;

    row.addEventListener("click", () => navigateToTab(feature.id));
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigateToTab(feature.id);
      }
    });

    return row;
  }

  function createTodayTabRow(tab) {
    const isSelected = state.activeTabId === tab.id;
    const row = document.createElement("div");
    row.className = `tab-item-row is-today${isSelected ? " is-selected" : ""}`;
    row.dataset.tabId = tab.id;
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.title = tab.name;

    row.innerHTML = `
      <span class="today-icon-cell" aria-hidden="true">${tab.icon}</span>
      <span class="tab-title-label">${escapeHTML(tab.name)}</span>
    `;

    row.addEventListener("click", () => navigateToTab(tab.id));
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigateToTab(tab.id);
      }
    });

    return row;
  }

  function renderFolderBlock(folder) {
    const blockEl = document.createElement("div");
    blockEl.className = `folder-block${folder.isExpanded ? " is-expanded" : ""}`;
    blockEl.dataset.folderId = folder.id;

    const headerRow = document.createElement("div");
    headerRow.className = "folder-header-row";
    headerRow.setAttribute("role", "button");
    headerRow.setAttribute("tabindex", "0");
    headerRow.setAttribute("aria-expanded", folder.isExpanded ? "true" : "false");

    headerRow.innerHTML = `
      ${createFolderSVG(folder.isExpanded)}
      <span class="folder-name-label">${escapeHTML(folder.name)}</span>
    `;

    headerRow.addEventListener("click", () => {
      folder.isExpanded = !folder.isExpanded;
      renderSidebar();
    });

    headerRow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        folder.isExpanded = !folder.isExpanded;
        renderSidebar();
      }
    });

    blockEl.appendChild(headerRow);

    const childrenWrap = document.createElement("div");
    childrenWrap.className = "folder-children";

    const childTabs = features.filter((t) => t.folderId === folder.id);
    childTabs.forEach((tab) => {
      childrenWrap.appendChild(createFeatureTabRow(tab));
    });

    blockEl.appendChild(childrenWrap);
    return blockEl;
  }

  function renderSidebar() {
    dom.pinnedContainer.innerHTML = "";
    folders.forEach((folder) => {
      dom.pinnedContainer.appendChild(renderFolderBlock(folder));
    });

    dom.todayContainer.innerHTML = "";
    todayTabs.forEach((tab) => {
      dom.todayContainer.appendChild(createTodayTabRow(tab));
    });

    updateAddressBarAndControls();
  }

  function getActiveTabItem() {
    return (
      todayTabs.find((t) => t.id === state.activeTabId) ||
      features.find((f) => f.id === state.activeTabId) ||
      todayTabs[0]
    );
  }

  function updateAddressBarAndControls() {
    dom.navBack.disabled = state.historyIndex <= 0;
    dom.navForward.disabled = state.historyIndex >= state.history.length - 1;

    const current = getActiveTabItem();
    if (!current || current.id === "home") {
      dom.addressSearchIcon.style.display = "block";
      dom.addressBarLabel.textContent = "Search…";
      dom.addressBarLabel.classList.add("is-placeholder");
      dom.addressCopyLinkBtn.style.display = "none";
    } else {
      dom.addressSearchIcon.style.display = "none";
      dom.addressBarLabel.textContent = current.host;
      dom.addressBarLabel.classList.remove("is-placeholder");
      dom.addressCopyLinkBtn.style.display = "flex";
    }
  }

  // =========================================================================
  // 5. NAVIGATION & PAGE RENDERING
  // =========================================================================
  function triggerLoadingLine() {
    dom.pageLoadingLine.classList.remove("is-loading", "is-done");
    void dom.pageLoadingLine.offsetWidth;
    dom.pageLoadingLine.classList.add("is-loading");
    setTimeout(() => {
      dom.pageLoadingLine.classList.remove("is-loading");
      dom.pageLoadingLine.classList.add("is-done");
    }, 240);
  }

  function navigateToTab(tabId, pushHistory = true) {
    const feature = features.find((f) => f.id === tabId);
    if (feature && feature.folderId) {
      const parentFolder = folders.find((f) => f.id === feature.folderId);
      if (parentFolder) parentFolder.isExpanded = true;
    }

    state.activeTabId = tabId;

    if (pushHistory && state.history[state.historyIndex] !== tabId) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(tabId);
      state.historyIndex = state.history.length - 1;
    }

    const targetHash = tabId === "home" ? "" : `#${tabId}`;
    if (window.location.hash !== targetHash) {
      history.replaceState(null, "", targetHash || window.location.pathname);
    }

    triggerLoadingLine();
    renderSidebar();
    renderMainContent();
    dom.contentViewport.scrollTop = 0;
  }

  function renderMainContent() {
    if (state.activeTabId === "home") {
      renderHomePage();
      return;
    }
    if (state.activeTabId === "download") {
      renderDownloadPage();
      return;
    }
    if (state.activeTabId === "roadmap") {
      renderRoadmapPage();
      return;
    }

    const activeFeature = features.find((f) => f.id === state.activeTabId);
    if (activeFeature) {
      renderFeatureDetailPage(activeFeature);
    } else {
      renderHomePage();
    }
  }

  // =========================================================================
  // 6. TODAY PAGES: HOME, DOWNLOAD, ALL FEATURES
  // =========================================================================
  function buildFeatureTableSectionHTML() {
    const counts = {
      all: features.length,
      implemented: features.filter((f) => f.statusType === "implemented").length,
      partial: features.filter((f) => f.statusType === "partial").length,
      planned: features.filter((f) => f.statusType === "planned").length
    };

    const filteredFeatures = features.filter((f) => {
      return state.readmeFilter === "all" || f.statusType === state.readmeFilter;
    });

    return `
      <section aria-label="Features Directory">
        <div class="directory-section-header">
          <div class="directory-title-group">
            <h2 class="directory-title">Features</h2>
            <span class="directory-subtitle">${counts.implemented} Implemented · ${counts.partial} Partial · ${counts.planned} Planned</span>
          </div>

          <div class="filter-pills" role="tablist" aria-label="Filter features by status">
            <button type="button" class="filter-pill ${state.readmeFilter === "all" ? "is-active" : ""}" data-filter="all">
              All (${counts.all})
            </button>
            <button type="button" class="filter-pill ${state.readmeFilter === "implemented" ? "is-active" : ""}" data-filter="implemented">
              Implemented (${counts.implemented})
            </button>
            <button type="button" class="filter-pill ${state.readmeFilter === "partial" ? "is-active" : ""}" data-filter="partial">
              Partial (${counts.partial})
            </button>
            <button type="button" class="filter-pill ${state.readmeFilter === "planned" ? "is-active" : ""}" data-filter="planned">
              Planned (${counts.planned})
            </button>
          </div>
        </div>

        <div class="features-table-card">
          <table class="features-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Description</th>
                <th style="text-align: right;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredFeatures
                .map(
                  (f) => `
                <tr class="feature-table-row" data-open-feature="${f.id}" tabindex="0" role="button" aria-label="Open ${escapeHTML(f.name)}">
                  <td class="td-feature-name">
                    <div class="td-feature-name-inner">
                      ${f.icon}
                      <span>${escapeHTML(f.name)}</span>
                    </div>
                  </td>
                  <td class="td-feature-desc">${escapeHTML(f.readmeDesc)}</td>
                  <td class="td-feature-status">
                    <span class="status-badge ${f.statusType}">${f.status}</span>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function wireFeatureTableInteractions() {
    dom.contentViewport.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        state.readmeFilter = pill.getAttribute("data-filter");
        renderMainContent();
      });
    });

    dom.contentViewport.querySelectorAll(".feature-table-row").forEach((row) => {
      const fid = row.getAttribute("data-open-feature");
      row.addEventListener("click", () => navigateToTab(fid));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToTab(fid);
        }
      });
    });

    dom.contentViewport.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        copyToClipboard(btn.getAttribute("data-copy"));
        const original = btn.textContent;
        btn.textContent = "Copied";
        showToast("Copied to clipboard");
        setTimeout(() => {
          btn.textContent = original;
        }, 1400);
      });
    });
  }

  function renderHomePage() {
    dom.contentViewport.innerHTML = `
      <div class="page-container">
        <section class="overview-hero">
          <div class="overview-brand-header">
            <img src="assets/Early-Default-1024.png" alt="Early App Icon" class="overview-app-icon">
            <div class="overview-title-group">
              <div class="overview-title-row">
                <h1 class="overview-title">Early</h1>
                <span class="overview-meta-pill">macOS</span>
              </div>
              <p class="overview-tagline">
                A fast, lightweight native macOS browser built around vertical tabs, Spaces, and a clean command bar.
              </p>
            </div>
          </div>

          <p class="overview-lead">
            <strong>Early</strong> is designed for calm, focused everyday browsing on your Mac. Open any folder in the sidebar to explore Early's features, or install it right now with Homebrew:
          </p>

          <div class="code-box">
            <code>brew install --cask earlybrowser/tap/early</code>
            <button type="button" class="copy-btn" data-copy="brew install --cask earlybrowser/tap/early">Copy</button>
          </div>
        </section>

        ${buildFeatureTableSectionHTML()}

        <footer class="overview-footer-note">
          <span>Early Browser</span>
          <span>
            <a href="https://github.com/earlybrowser/early-browser" target="_blank" rel="noopener noreferrer">GitHub</a>
            ·
            <a href="mailto:earlybrowser.dev@gmail.com">earlybrowser.dev@gmail.com</a>
            ·
            <a href="https://buymeacoffee.com/earlybrowser" target="_blank" rel="noopener noreferrer">Buy Me a Coffee</a>
          </span>
        </footer>
      </div>
    `;

    wireFeatureTableInteractions();
  }

  function renderDownloadPage() {
    dom.contentViewport.innerHTML = `
      <div class="page-container">
        <div class="page-top-nav">
          <div class="breadcrumb-row">
            <button type="button" class="breadcrumb-btn" id="back-home-btn">Early</button>
            <span>/</span>
            <span>Download & Install</span>
          </div>
        </div>

        <header class="feature-hero-block">
          <h1 class="feature-main-title" style="margin-bottom: 8px;">Download & Install</h1>
          <p class="feature-summary-paragraph">
            Install Early using Homebrew or download the signed macOS disk image directly.
          </p>
        </header>

        <div class="info-stack">
          <div class="info-card">
            <h3>Install with Homebrew</h3>
            <p>Run the following command in Terminal to install Early:</p>
            <div class="code-box">
              <code>brew install --cask earlybrowser/tap/early</code>
              <button type="button" class="copy-btn" data-copy="brew install --cask earlybrowser/tap/early">Copy</button>
            </div>
          </div>

          <div class="info-card">
            <h3>Direct DMG Download</h3>
            <p>
              Download the latest <code>Early.dmg</code> installer from
              <a href="https://github.com/earlybrowser/early-browser/releases/latest" target="_blank" rel="noopener noreferrer" style="color: var(--text-primary);">GitHub Releases</a>,
              open the disk image, and drag <strong>Early</strong> into your <strong>Applications</strong> folder.
            </p>
          </div>
        </div>
      </div>
    `;

    document.getElementById("back-home-btn").addEventListener("click", () => navigateToTab("home"));
    wireFeatureTableInteractions();
  }

  function renderRoadmapPage() {
    dom.contentViewport.innerHTML = `
      <div class="page-container">
        <div class="page-top-nav">
          <div class="breadcrumb-row">
            <button type="button" class="breadcrumb-btn" id="back-home-btn">Early</button>
            <span>/</span>
            <span>All Features</span>
          </div>
        </div>

        <header class="feature-hero-block">
          <h1 class="feature-main-title" style="margin-bottom: 8px;">All Features</h1>
          <p class="feature-summary-paragraph">
            Explore what is available in Early today and what is coming next. Click any feature to learn more.
          </p>
        </header>

        ${buildFeatureTableSectionHTML()}
      </div>
    `;

    document.getElementById("back-home-btn").addEventListener("click", () => navigateToTab("home"));
    wireFeatureTableInteractions();
  }

  // =========================================================================
  // 7. INDIVIDUAL FEATURE DETAIL PAGE (User-Focused, Zero Dev Jargon)
  // =========================================================================
  function renderFeatureDetailPage(feature) {
    const idx = features.findIndex((f) => f.id === feature.id);
    const prevFeature = idx > 0 ? features[idx - 1] : null;
    const nextFeature = idx < features.length - 1 ? features[idx + 1] : null;

    dom.contentViewport.innerHTML = `
      <div class="page-container">
        <!-- Breadcrumb & Status -->
        <div class="page-top-nav">
          <div class="breadcrumb-row">
            <button type="button" class="breadcrumb-btn" id="spec-back-home">Early</button>
            <span>/</span>
            <span>${escapeHTML(feature.category)}</span>
          </div>
          <span class="status-badge ${feature.statusType}">${feature.status}</span>
        </div>

        <!-- Feature Title & Summary -->
        <header class="feature-hero-block">
          <div class="feature-title-line">
            <div class="feature-title-icon">${feature.icon}</div>
            <h1 class="feature-main-title">${escapeHTML(feature.name)}</h1>
          </div>
          <p class="feature-readme-quote">${escapeHTML(feature.readmeDesc)}</p>
          <p class="feature-summary-paragraph">${escapeHTML(feature.summary)}</p>
        </header>

        <!-- Clean Single-Column User Highlights -->
        <section class="feature-highlights-section">
          <div class="detail-card">
            <h2 class="detail-card-heading">How It Works</h2>
            <ul class="behavior-list">
              ${feature.behavior.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
            </ul>
          </div>
        </section>

        <!-- Prev / Next Feature Navigation -->
        <nav class="feature-pagination" aria-label="Feature navigation">
          ${
            prevFeature
              ? `
            <button type="button" class="page-nav-card" data-nav-feature="${prevFeature.id}">
              <span class="page-nav-dir">← Previous (${prevFeature.status})</span>
              <span class="page-nav-name">${escapeHTML(prevFeature.name)}</span>
            </button>
          `
              : `<div></div>`
          }
          ${
            nextFeature
              ? `
            <button type="button" class="page-nav-card is-next" data-nav-feature="${nextFeature.id}">
              <span class="page-nav-dir">Next (${nextFeature.status}) →</span>
              <span class="page-nav-name">${escapeHTML(nextFeature.name)}</span>
            </button>
          `
              : `<div></div>`
          }
        </nav>
      </div>
    `;

    document.getElementById("spec-back-home").addEventListener("click", () => navigateToTab("home"));

    dom.contentViewport.querySelectorAll("[data-nav-feature]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigateToTab(btn.getAttribute("data-nav-feature"));
      });
    });
  }

  // =========================================================================
  // 8. FLOATING COMMAND BAR
  // =========================================================================
  function openCommandBar(mode = "newTab") {
    state.commandBarOpen = true;
    state.commandBarMode = mode;

    const current = getActiveTabItem();
    if (mode === "editCurrentTab" && current && current.id !== "home") {
      state.commandBarQuery = current.url;
    } else {
      state.commandBarQuery = "";
    }

    dom.commandBarLayer.style.display = "flex";
    dom.commandBarInput.value = state.commandBarQuery;
    updateCommandBarSuggestions();

    requestAnimationFrame(() => {
      dom.commandBarInput.focus();
      dom.commandBarInput.select();
    });
  }

  function closeCommandBar() {
    if (!state.commandBarOpen) return;
    state.commandBarOpen = false;
    dom.commandBarLayer.style.display = "none";
  }

  function buildCommandBarSuggestions(rawQuery) {
    const q = rawQuery.trim().toLowerCase();
    const results = [];

    todayTabs.forEach((tab) => {
      if (!q || tab.name.toLowerCase().includes(q) || tab.url.toLowerCase().includes(q)) {
        results.push({
          id: tab.id,
          title: tab.name,
          badge: "Tab",
          statusType: "planned",
          icon: tab.icon
        });
      }
    });

    features.forEach((f) => {
      if (
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.readmeDesc.toLowerCase().includes(q) ||
        f.status.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: f.id,
          title: `${f.name} — ${f.readmeDesc}`,
          badge: f.status,
          statusType: f.statusType,
          icon: f.icon
        });
      }
    });

    return results.slice(0, 8);
  }

  function updateCommandBarSuggestions() {
    state.commandBarItems = buildCommandBarSuggestions(state.commandBarQuery);
    state.commandBarSelectedIndex = 0;
    renderCommandBarSuggestionRows();
  }

  function renderCommandBarSuggestionRows() {
    const items = state.commandBarItems;
    if (!items.length) {
      dom.commandBarSuggestionsWrap.style.display = "none";
      dom.commandBarSuggestions.innerHTML = "";
      return;
    }

    dom.commandBarSuggestionsWrap.style.display = "flex";
    dom.commandBarSuggestions.innerHTML = items
      .map((item, idx) => {
        const isSelected = idx === state.commandBarSelectedIndex;
        return `
          <div class="command-suggestion-row${isSelected ? " is-selected" : ""}" data-cmd-idx="${idx}" role="option" aria-selected="${isSelected}">
            <span class="command-suggestion-icon">${item.icon}</span>
            <span class="command-suggestion-title">${escapeHTML(item.title)}</span>
            <span class="tab-state-badge ${item.statusType}">${escapeHTML(item.badge)}</span>
          </div>
        `;
      })
      .join("");

    dom.commandBarSuggestions.querySelectorAll(".command-suggestion-row").forEach((row) => {
      const idx = Number(row.getAttribute("data-cmd-idx"));
      row.addEventListener("mouseenter", () => {
        state.commandBarSelectedIndex = idx;
        renderCommandBarSuggestionRows();
      });
      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        closeCommandBar();
        navigateToTab(items[idx].id);
      });
    });
  }

  // =========================================================================
  // 9. SIDEBAR RESIZE & AUTO-HIDE
  // =========================================================================
  function setSidebarWidth(width) {
    const clamped = Math.max(220, Math.min(360, width));
    state.sidebarWidth = clamped;
    document.documentElement.style.setProperty("--sidebar-width", `${clamped}px`);
  }

  function toggleSidebarAutoHide() {
    state.sidebarAutoHide = !state.sidebarAutoHide;
    state.sidebarHovered = false;
    dom.browserWindow.classList.toggle("sidebar-autohide", state.sidebarAutoHide);
    dom.browserWindow.classList.remove("sidebar-hovered");
  }

  function initSidebarInteractions() {
    let dragging = false;

    dom.sidebarResizeHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      dragging = true;
      dom.sidebarResizeHandle.classList.add("is-resizing");
      document.body.style.cursor = "ew-resize";
    });

    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const winRect = dom.browserWindow.getBoundingClientRect();
      setSidebarWidth(e.clientX - winRect.left - 6);
    });

    window.addEventListener("mouseup", () => {
      if (!dragging) return;
      dragging = false;
      dom.sidebarResizeHandle.classList.remove("is-resizing");
      document.body.style.cursor = "";
    });

    dom.sidebarEdgeSensor.addEventListener("mouseenter", () => {
      if (state.sidebarAutoHide) {
        state.sidebarHovered = true;
        dom.browserWindow.classList.add("sidebar-hovered");
      }
    });

    dom.sidebar.addEventListener("mouseleave", (e) => {
      if (state.sidebarAutoHide && state.sidebarHovered) {
        const rect = dom.sidebar.getBoundingClientRect();
        if (e.clientX > rect.right) {
          state.sidebarHovered = false;
          dom.browserWindow.classList.remove("sidebar-hovered");
        }
      }
    });
  }

  // =========================================================================
  // 10. UTILITIES & TOAST
  // =========================================================================
  let toastTimer = null;

  function showToast(message) {
    if (!dom.toastHost) return;
    dom.toastHost.innerHTML = `<div class="native-toast">${escapeHTML(message)}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toastHost.innerHTML = "";
    }, 1700);
  }

  function copyCurrentTabURL() {
    const current = getActiveTabItem();
    copyToClipboard(current ? current.url : "https://earlybrowser.dev");
    showToast("Copied Current URL");
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  function escapeHTML(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =========================================================================
  // 11. EVENT LISTENERS & KEYBOARD SHORTCUTS
  // =========================================================================
  function initEventListeners() {
    dom.sidebarToggleBtn.addEventListener("click", () => toggleSidebarAutoHide());

    dom.navBack.addEventListener("click", () => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        navigateToTab(state.history[state.historyIndex], false);
      }
    });

    dom.navForward.addEventListener("click", () => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        navigateToTab(state.history[state.historyIndex], false);
      }
    });

    dom.navReload.addEventListener("click", () => {
      dom.reloadRotator.style.transform = "rotate(360deg)";
      triggerLoadingLine();
      setTimeout(() => {
        dom.reloadRotator.style.transform = "";
      }, 340);
    });

    dom.addressBar.addEventListener("click", (e) => {
      if (e.target.closest("#address-copy-link-btn")) return;
      openCommandBar(state.activeTabId !== "home" ? "editCurrentTab" : "newTab");
    });

    dom.addressBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCommandBar(state.activeTabId !== "home" ? "editCurrentTab" : "newTab");
      }
    });

    dom.addressCopyLinkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      copyCurrentTabURL();
    });

    dom.newTabBtn.addEventListener("click", () => openCommandBar("newTab"));

    dom.commandBarInput.addEventListener("input", (e) => {
      state.commandBarQuery = e.target.value;
      updateCommandBarSuggestions();
    });

    dom.commandBarInput.addEventListener("keydown", (e) => {
      const items = state.commandBarItems;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (items.length) {
          state.commandBarSelectedIndex = (state.commandBarSelectedIndex + 1) % items.length;
          renderCommandBarSuggestionRows();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (items.length) {
          state.commandBarSelectedIndex = (state.commandBarSelectedIndex - 1 + items.length) % items.length;
          renderCommandBarSuggestionRows();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items.length) {
          const chosen = items[state.commandBarSelectedIndex] || items[0];
          closeCommandBar();
          navigateToTab(chosen.id);
        } else {
          closeCommandBar();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeCommandBar();
      }
    });

    dom.commandBarDismiss.addEventListener("click", () => closeCommandBar());

    document.addEventListener("mousedown", (e) => {
      if (
        state.commandBarOpen &&
        !dom.commandBarCard.contains(e.target) &&
        !dom.addressBar.contains(e.target) &&
        !dom.newTabBtn.contains(e.target)
      ) {
        closeCommandBar();
      }
    });

    window.addEventListener("keydown", (e) => {
      const mod = e.metaKey || e.ctrlKey;

      if (e.key === "Escape") {
        if (state.commandBarOpen) closeCommandBar();
        return;
      }

      if (mod && (e.key.toLowerCase() === "k" || e.key.toLowerCase() === "t")) {
        e.preventDefault();
        openCommandBar("newTab");
      } else if (mod && e.key.toLowerCase() === "l") {
        e.preventDefault();
        openCommandBar(state.activeTabId !== "home" ? "editCurrentTab" : "newTab");
      } else if (mod && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        toggleSidebarAutoHide();
      } else if (mod && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        copyCurrentTabURL();
      } else if (mod && e.key === "[") {
        e.preventDefault();
        if (state.historyIndex > 0) {
          state.historyIndex -= 1;
          navigateToTab(state.history[state.historyIndex], false);
        }
      } else if (mod && e.key === "]") {
        e.preventDefault();
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex += 1;
          navigateToTab(state.history[state.historyIndex], false);
        }
      }
    });
  }

  // =========================================================================
  // 12. INITIALIZATION
  // =========================================================================
  function init() {
    setSidebarWidth(state.sidebarWidth);
    initSidebarInteractions();
    initEventListeners();

    const initialHash = window.location.hash.replace(/^#/, "");
    const validTab =
      todayTabs.find((t) => t.id === initialHash) ||
      features.find((f) => f.id === initialHash);

    if (validTab) {
      navigateToTab(validTab.id, false);
    } else {
      renderSidebar();
      renderMainContent();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
