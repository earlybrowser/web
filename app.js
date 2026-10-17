/* ==========================================================================
   EARLY BROWSER — OFFICIAL WEBSITE INTERACTION ENGINE
   Professional, Calm, High-Craft macOS Fidelity
   ========================================================================== */

(function () {
  'use strict';

  // State
  const state = {
    activeTab: 'home',
    history: ['home'],
    historyIndex: 0,
    sidebarWidth: 260,
    isFullscreen: false,
    commandBarOpen: false,
    selectedSuggestionIndex: -1,
    sidebarFilter: '',
    openFolders: new Set()
  };

  // Folder Icon SVG
  const folderSvg = `
    <svg viewBox="0 0 20 18" fill="none" width="16" height="15">
      <path d="M2 3.5C2 2.67 2.67 2 3.5 2H7.2L8.8 4H16.5C17.33 4 18 4.67 18 5.5V14.5C18 15.33 17.33 16 16.5 16H3.5C2.67 16 2 15.33 2 14.5V3.5Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M1.5 6.5C1.5 5.67 2.17 5 3 5H17C17.83 5 18.5 5.67 18.5 6.5L17.5 15C17.5 15.83 16.83 16.5 16 16.5H4C3.17 16.5 2.5 15.83 2.5 15L1.5 6.5Z" fill="#1b1b1e" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" stroke-linejoin="round"/>
    </svg>
  `;

  const chevronSvg = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `;

  // DOM Elements
  const elements = {
    window: document.getElementById('browser-window'),
    sidebar: document.getElementById('sidebar'),
    foldersContainer: document.getElementById('folders-container'),
    todayTabsContainer: document.getElementById('today-tabs-container'),
    sidebarToggleBtn: document.getElementById('sidebar-toggle-btn'),
    edgeHoverSensor: document.getElementById('edge-hover-sensor'),
    sidebarResizeHandle: document.getElementById('sidebar-resize-handle'),
    sidebarSearchInput: document.getElementById('sidebar-search-input'),
    sidebarSearchClear: document.getElementById('sidebar-search-clear'),
    newTabBtn: document.getElementById('new-tab-btn'),
    trafficClose: document.getElementById('traffic-close'),
    trafficMin: document.getElementById('traffic-min'),
    trafficMax: document.getElementById('traffic-max'),
    navBack: document.getElementById('nav-back'),
    navForward: document.getElementById('nav-forward'),
    navReload: document.getElementById('nav-reload'),
    pageLoadingLine: document.getElementById('page-loading-line'),
    commandBarOverlay: document.getElementById('command-bar-overlay'),
    commandBarBackdrop: document.getElementById('command-bar-backdrop'),
    commandBarInput: document.getElementById('command-bar-input'),
    commandBarDismiss: document.getElementById('command-bar-dismiss'),
    commandBarSuggestions: document.getElementById('command-bar-suggestions'),
    heroOmniboxTrigger: document.getElementById('hero-omnibox-trigger'),
    toastContainer: document.getElementById('toast-container'),
    copyBrewBtn: document.getElementById('copy-brew-btn'),
    favMail: document.getElementById('fav-mail'),
    favBmac: document.getElementById('fav-bmac')
  };

  // Initialize
  function init() {
    renderFoldersAndTabs();
    renderTodayTabs();
    setupEventListeners();
    setupKeyboardShortcuts();
    selectTab('home', false);
  }

  // Feature Grouping
  function getGroupedFeatures() {
    const groups = [
      { id: 'core', name: 'Core Interface', items: [] },
      { id: 'tabs', name: 'Tab Management', items: [] },
      { id: 'productivity', name: 'Productivity', items: [] },
      { id: 'system', name: 'System & Privacy', items: [] }
    ];

    const filter = state.sidebarFilter.toLowerCase().trim();

    window.EARLY_FEATURES.forEach(feature => {
      if (filter) {
        const matchesName = feature.name.toLowerCase().includes(filter);
        const matchesDesc = feature.shortDesc.toLowerCase().includes(filter);
        const matchesStatus = feature.status.toLowerCase().includes(filter);
        if (!matchesName && !matchesDesc && !matchesStatus) return;
      }
      const g = groups.find(x => x.id === feature.category) || groups[0];
      g.items.push(feature);
    });

    return groups;
  }

  // Render Folders & Tabs
  function renderFoldersAndTabs() {
    if (!elements.foldersContainer) return;
    elements.foldersContainer.innerHTML = '';

    const groups = getGroupedFeatures();

    groups.forEach(group => {
      if (group.items.length === 0 && state.sidebarFilter) return;

      const groupEl = document.createElement('div');
      const isOpen = state.sidebarFilter ? true : state.openFolders.has(group.id);
      groupEl.className = `folder-group ${isOpen ? 'open' : ''}`;
      groupEl.dataset.folderId = group.id;

      // Folder header row
      const rowEl = document.createElement('div');
      rowEl.className = 'folder-row';
      rowEl.innerHTML = `
        <div class="folder-icon">${folderSvg}</div>
        <span class="folder-title">${group.name}</span>
        <div class="folder-chevron">${chevronSvg}</div>
      `;

      rowEl.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFolder(group.id, groupEl);
      });

      // Tab list
      const childrenEl = document.createElement('div');
      childrenEl.className = 'folder-children';

      group.items.forEach(feature => {
        const tabEl = document.createElement('div');
        const isActive = state.activeTab === feature.id;
        tabEl.className = `tab-row ${isActive ? 'active' : ''}`;
        tabEl.dataset.tabId = feature.id;

        const statusClass = `status-${feature.statusType}`;
        const statusLabel = feature.status;

        tabEl.innerHTML = `
          <div class="tab-icon">${feature.icon}</div>
          <span class="tab-title" title="${feature.name}">${feature.name}</span>
          <span class="status-pill ${statusClass}">${statusLabel}</span>
        `;

        tabEl.addEventListener('click', () => {
          selectTab(feature.id);
        });

        childrenEl.appendChild(tabEl);
      });

      groupEl.appendChild(rowEl);
      groupEl.appendChild(childrenEl);
      elements.foldersContainer.appendChild(groupEl);
    });
  }

  // Render Today Tabs
  function renderTodayTabs() {
    if (!elements.todayTabsContainer) return;
    elements.todayTabsContainer.innerHTML = '';

    window.EARLY_SPECIAL_TABS.forEach(tab => {
      const tabEl = document.createElement('div');
      const isActive = state.activeTab === tab.id;
      tabEl.className = `tab-row ${isActive ? 'active' : ''}`;
      tabEl.dataset.tabId = tab.id;

      tabEl.innerHTML = `
        <div class="tab-icon">${tab.icon}</div>
        <span class="tab-title">${tab.name}</span>
      `;

      tabEl.addEventListener('click', () => {
        selectTab(tab.id);
      });

      elements.todayTabsContainer.appendChild(tabEl);
    });
  }

  // Toggle Folder
  function toggleFolder(folderId, groupEl) {
    if (state.openFolders.has(folderId)) {
      state.openFolders.delete(folderId);
      groupEl.classList.remove('open');
    } else {
      state.openFolders.add(folderId);
      groupEl.classList.add('open');
    }
  }

  // Select Tab
  function selectTab(tabId, pushHistory = true) {
    if (pushHistory && state.activeTab !== tabId) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(tabId);
      state.historyIndex = state.history.length - 1;
    }
    state.activeTab = tabId;

    // Loading line feedback
    if (elements.pageLoadingLine) {
      elements.pageLoadingLine.classList.remove('loading', 'done');
      void elements.pageLoadingLine.offsetWidth;
      elements.pageLoadingLine.classList.add('loading');
      setTimeout(() => {
        elements.pageLoadingLine.classList.add('done');
      }, 200);
    }

    // Active row highlight
    document.querySelectorAll('.tab-row').forEach(row => {
      row.classList.toggle('active', row.dataset.tabId === tabId);
    });

    updateNavButtons();
    renderActiveView(tabId);
  }

  function updateNavButtons() {
    if (elements.navBack) {
      elements.navBack.classList.toggle('disabled', state.historyIndex <= 0);
    }
    if (elements.navForward) {
      elements.navForward.classList.toggle('disabled', state.historyIndex >= state.history.length - 1);
    }
  }

  // Render View
  function renderActiveView(tabId) {
    document.querySelectorAll('.page-view').forEach(view => {
      view.style.display = 'none';
    });

    if (tabId === 'home') {
      const homeView = document.getElementById('view-home');
      if (homeView) homeView.style.display = 'flex';
      return;
    }

    if (tabId === 'download' || tabId === 'architecture' || tabId === 'roadmap') {
      const specialView = document.getElementById(`view-${tabId}`);
      if (specialView) {
        specialView.style.display = 'block';
        specialView.scrollTop = 0;
      }
      return;
    }

    // Feature Detail
    const feature = window.EARLY_FEATURES.find(f => f.id === tabId);
    if (!feature) {
      selectTab('home');
      return;
    }

    const featureView = document.getElementById('view-feature');
    if (!featureView) return;

    featureView.innerHTML = buildFeatureDetailHtml(feature);
    featureView.style.display = 'block';
    featureView.scrollTop = 0;
  }

  // Build Clean, Professional Feature Detail HTML
  function buildFeatureDetailHtml(feature) {
    const statusClass = feature.statusType;
    const statusLabel = feature.status;

    const currentIndex = window.EARLY_FEATURES.findIndex(f => f.id === feature.id);
    const prevFeature = currentIndex > 0 ? window.EARLY_FEATURES[currentIndex - 1] : null;
    const nextFeature = currentIndex < window.EARLY_FEATURES.length - 1 ? window.EARLY_FEATURES[currentIndex + 1] : null;

    const highlightsHtml = feature.details.highlights.map(h => `<li>${h}</li>`).join('');
    const techSpecsHtml = feature.details.techSpecs.map(s => `
      <div class="spec-tile">
        <div class="spec-tile-label">${s.label}</div>
        <div class="spec-tile-value">${s.value}</div>
      </div>
    `).join('');

    return `
      <div class="page-content-wrapper">
        <div class="feature-breadcrumb">
          <span class="breadcrumb-link" onclick="window.EarlyApp.selectTab('home')">Early</span>
          <span>/</span>
          <span>${feature.categoryName}</span>
        </div>

        <div class="feature-header-row">
          <div class="feature-title-area">
            <div class="feature-icon-box">${feature.icon}</div>
            <h1 class="feature-title">${feature.name}</h1>
          </div>
          <span class="feature-status-tag ${statusClass}">${statusLabel}</span>
        </div>

        <h2 class="feature-headline">${feature.details.headline}</h2>
        <p class="feature-summary-text">${feature.details.summary}</p>

        <div class="section-label">Architecture &amp; Specifications</div>
        <div class="specs-grid">${techSpecsHtml}</div>

        <div class="section-label">Implementation Highlights</div>
        <ul class="highlights-list">${highlightsHtml}</ul>

        <div class="feature-nav-footer">
          ${prevFeature ? `
            <button class="nav-feat-btn" onclick="window.EarlyApp.selectTab('${prevFeature.id}')">
              ← ${prevFeature.name}
            </button>
          ` : '<div></div>'}
          ${nextFeature ? `
            <button class="nav-feat-btn" onclick="window.EarlyApp.selectTab('${nextFeature.id}')">
              ${nextFeature.name} →
            </button>
          ` : '<div></div>'}
        </div>
      </div>
    `;
  }

  // Sidebar Resize
  function setupSidebarResize() {
    let isResizing = false;

    elements.sidebarResizeHandle?.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const windowRect = elements.window.getBoundingClientRect();
      const newWidth = e.clientX - windowRect.left;
      const clamped = Math.min(Math.max(newWidth, 180), 380);
      state.sidebarWidth = clamped;
      elements.sidebar.style.width = `${clamped}px`;
    });

    window.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = '';
      }
    });
  }

  // Command Bar
  function openCommandBar(query = '') {
    state.commandBarOpen = true;
    state.selectedSuggestionIndex = -1;
    if (elements.commandBarOverlay) elements.commandBarOverlay.style.display = 'flex';
    if (elements.commandBarInput) {
      elements.commandBarInput.value = query;
      elements.commandBarInput.focus();
      updateCommandBarSuggestions(query);
    }
  }

  function closeCommandBar() {
    state.commandBarOpen = false;
    if (elements.commandBarOverlay) elements.commandBarOverlay.style.display = 'none';
  }

  function updateCommandBarSuggestions(query = '') {
    if (!elements.commandBarSuggestions) return;
    elements.commandBarSuggestions.innerHTML = '';

    const q = query.toLowerCase().trim();
    let suggestions = [];

    window.EARLY_FEATURES.forEach(feature => {
      if (!q || feature.name.toLowerCase().includes(q) || feature.shortDesc.toLowerCase().includes(q)) {
        suggestions.push({
          type: 'feature',
          id: feature.id,
          title: feature.name,
          badge: feature.status,
          icon: feature.icon
        });
      }
    });

    const pages = [
      { type: 'page', id: 'home', title: 'Welcome to Early', badge: 'Home' },
      { type: 'page', id: 'download', title: 'Download & Install', badge: 'Distribution' },
      { type: 'page', id: 'architecture', title: 'Native Architecture', badge: 'Tech Spec' },
      { type: 'page', id: 'roadmap', title: 'Master Build Plan', badge: 'Roadmap' }
    ];

    pages.forEach(p => {
      if (!q || p.title.toLowerCase().includes(q)) suggestions.push(p);
    });

    suggestions = suggestions.slice(0, 6);

    suggestions.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `suggestion-item ${index === state.selectedSuggestionIndex ? 'selected' : ''}`;
      row.innerHTML = `
        <div class="suggestion-icon">
          ${item.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`}
        </div>
        <span class="suggestion-title">${item.title}</span>
        <span class="suggestion-badge">${item.badge}</span>
      `;

      row.addEventListener('click', () => {
        closeCommandBar();
        selectTab(item.id);
      });

      elements.commandBarSuggestions.appendChild(row);
    });
  }

  // Copy Homebrew
  function copyBrewCommand() {
    const cmd = 'brew tap earlybrowser/tap && brew install --cask early-browser';
    navigator.clipboard.writeText(cmd).then(() => {
      showToast('Copied: ' + cmd);
    });
  }

  // Toast
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2200);
  }

  // Event Listeners
  function setupEventListeners() {
    setupSidebarResize();

    // Traffic Lights
    elements.trafficClose?.addEventListener('click', () => selectTab('home'));
    elements.trafficMax?.addEventListener('click', () => {
      state.isFullscreen = !state.isFullscreen;
      elements.window?.classList.toggle('fullscreen', state.isFullscreen);
    });

    // Nav chevrons

    elements.navBack?.addEventListener('click', () => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        selectTab(state.history[state.historyIndex], false);
      }
    });

    elements.navForward?.addEventListener('click', () => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        selectTab(state.history[state.historyIndex], false);
      }
    });

    elements.navReload?.addEventListener('click', () => {
      const reloadIcon = elements.navReload.querySelector('.reload-icon');
      reloadIcon?.classList.add('spinning');
      setTimeout(() => reloadIcon?.classList.remove('spinning'), 600);
      selectTab(state.activeTab, false);
    });

    // New Tab & Omnibox
    elements.newTabBtn?.addEventListener('click', () => openCommandBar());
    elements.heroOmniboxTrigger?.addEventListener('click', () => openCommandBar());

    // Search input
    elements.sidebarSearchInput?.addEventListener('input', (e) => {
      state.sidebarFilter = e.target.value;
      if (elements.sidebarSearchClear) {
        elements.sidebarSearchClear.style.display = state.sidebarFilter ? 'block' : 'none';
      }
      renderFoldersAndTabs();
    });

    elements.sidebarSearchClear?.addEventListener('click', () => {
      state.sidebarFilter = '';
      if (elements.sidebarSearchInput) elements.sidebarSearchInput.value = '';
      elements.sidebarSearchClear.style.display = 'none';
      renderFoldersAndTabs();
    });

    // Command Bar
    elements.commandBarBackdrop?.addEventListener('click', closeCommandBar);
    elements.commandBarDismiss?.addEventListener('click', closeCommandBar);
    elements.commandBarInput?.addEventListener('input', (e) => {
      updateCommandBarSuggestions(e.target.value);
    });

    elements.copyBrewBtn?.addEventListener('click', copyBrewCommand);

    elements.favMail?.addEventListener('click', () => {
      navigator.clipboard.writeText('earlybrowser.dev@gmail.com');
      showToast('Copied email: earlybrowser.dev@gmail.com');
    });

    // Inline copy buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('inline-copy-btn') && e.target.dataset.copy) {
        navigator.clipboard.writeText(e.target.dataset.copy);
        showToast('Copied code to clipboard');
      }
    });
  }

  // Keyboard Shortcuts
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      const isCmd = e.metaKey || e.ctrlKey;

      if (e.key === 'Escape' && state.commandBarOpen) {
        closeCommandBar();
        e.preventDefault();
        return;
      }

      if (isCmd && !e.shiftKey && (e.key.toLowerCase() === 't' || e.key.toLowerCase() === 'l')) {
        e.preventDefault();
        openCommandBar();
        return;
      }

      if (isCmd && !e.shiftKey && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        if (state.activeTab !== 'home') selectTab('home');
        return;
      }

      // Arrow keys in command bar
      if (state.commandBarOpen) {
        const items = elements.commandBarSuggestions?.querySelectorAll('.suggestion-item') || [];
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          state.selectedSuggestionIndex = (state.selectedSuggestionIndex + 1) % items.length;
          items.forEach((item, idx) => item.classList.toggle('selected', idx === state.selectedSuggestionIndex));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          state.selectedSuggestionIndex = (state.selectedSuggestionIndex - 1 + items.length) % items.length;
          items.forEach((item, idx) => item.classList.toggle('selected', idx === state.selectedSuggestionIndex));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (state.selectedSuggestionIndex >= 0 && state.selectedSuggestionIndex < items.length) {
            items[state.selectedSuggestionIndex].click();
          } else if (elements.commandBarInput?.value) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(elements.commandBarInput.value.trim())}`, '_blank');
            closeCommandBar();
          }
        }
      }
    });
  }

  // Global Controller
  window.EarlyApp = {
    selectTab,
    openCommandBar,
    copyBrewCommand
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
