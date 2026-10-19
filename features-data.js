// SPDX-License-Identifier: MPL-2.0
// User-facing feature catalog and Today tabs for the Early Browser website

window.EARLY_FOLDERS = [
  {
    id: "folder-interface",
    name: "Interface & Navigation",
    isExpanded: false
  },
  {
    id: "folder-workspace",
    name: "Tabs & Workspace",
    isExpanded: false
  },
  {
    id: "folder-media",
    name: "Media & Page Tools",
    isExpanded: false
  },
  {
    id: "folder-system",
    name: "Privacy & System",
    isExpanded: false
  }
];

window.EARLY_TODAY_TABS = [
  {
    id: "home",
    name: "Early — Overview",
    host: "earlybrowser.dev",
    url: "https://earlybrowser.dev",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.8L8 2.2l5.5 4.6v6.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V6.8z"/><path d="M6.2 14V9.5h3.6V14"/></svg>`
  },
  {
    id: "download",
    name: "Download & Install",
    host: "earlybrowser.dev/download",
    url: "https://earlybrowser.dev/download",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v7.5"/><polyline points="5 7.5 8 10.5 11 7.5"/><line x1="3" y1="13" x2="13" y2="13"/></svg>`
  },
  {
    id: "roadmap",
    name: "All Features",
    host: "earlybrowser.dev/features",
    url: "https://earlybrowser.dev/features",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4.5" x2="12" y2="4.5"/><line x1="4" y1="8" x2="12" y2="8"/><line x1="4" y1="11.5" x2="9" y2="11.5"/></svg>`
  }
];

window.EARLY_FEATURES = [
  // =========================================================================
  // 1. INTERFACE & NAVIGATION (8 features)
  // =========================================================================
  {
    id: "native-macos-interface",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Native macOS interface",
    url: "https://earlybrowser.dev/features/native-macos-interface",
    host: "earlybrowser.dev/features/native-macos-interface",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2.5"/><line x1="5.5" y1="2.5" x2="5.5" y2="13.5"/></svg>`,
    readmeDesc: "Light/dark translucent chrome, native window controls, and opaque website content. Solid surfaces respect Reduce Transparency and increased contrast.",
    summary: "Built specifically for macOS, Early feels right at home on your desktop. The window frame and sidebar blend naturally with your system appearance while keeping websites crisp and easy to read.",
    behavior: [
      "Follows your Mac's Light or Dark appearance automatically, or lets you choose your preferred theme.",
      "Window controls stay understated while you browse and show standard macOS colors when you hover over them.",
      "Web pages always display on a solid surface so colors and text stay sharp.",
      "Respects macOS Reduce Transparency and Increase Contrast accessibility settings."
    ]
  },
  {
    id: "vertical-tabs",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Vertical tabs",
    url: "https://earlybrowser.dev/features/vertical-tabs",
    host: "earlybrowser.dev/features/vertical-tabs",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2"/><line x1="6" y1="2.5" x2="6" y2="13.5"/><line x1="3" y1="5.5" x2="4.5" y2="5.5"/><line x1="3" y1="8" x2="4.5" y2="8"/></svg>`,
    readmeDesc: "Organize pages in a resizable sidebar with an address bar, auto-hide, and edge-hover reveal.",
    summary: "Keep your tabs readable and organized in a clean vertical sidebar. When you want to focus on a page, hide the sidebar completely and reveal it just by moving your pointer to the left edge.",
    behavior: [
      "Drag the sidebar divider to make your tab list narrower or wider.",
      "Press ⌘⇧S or click the sidebar button in the toolbar to hide or show the sidebar.",
      "When hidden, move your pointer to the left edge of the window to slide the sidebar out over the page.",
      "Tab titles remain easy to read even when you have many pages open."
    ]
  },
  {
    id: "command-bar-navigation",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Command-bar navigation",
    url: "https://earlybrowser.dev/features/command-bar-navigation",
    host: "earlybrowser.dev/features/command-bar-navigation",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>`,
    readmeDesc: "Open URLs or Google searches with ⌘T; edit the current address with ⌘L. A tab is created when you submit.",
    summary: "Open a new site, search the web, or edit your current address from a clean floating command bar right in the center of your window.",
    behavior: [
      "Press ⌘T or click New Tab to open a new page or search.",
      "Press ⌘L or click the address bar to edit the address of the page you are currently viewing.",
      "New tabs are only created once you press Return, so canceling never leaves blank tabs behind.",
      "Press Escape or click outside the command bar to dismiss it."
    ]
  },
  {
    id: "search-suggestions",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Search suggestions",
    url: "https://earlybrowser.dev/features/search-suggestions",
    host: "earlybrowser.dev/features/search-suggestions",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h10"/><path d="M3 8h7"/><path d="M3 11h5"/></svg>`,
    readmeDesc: "Command bar shows direct URL actions, matching tabs, browsing history, and optional Google search suggestions.",
    summary: "As you type in the command bar, Early helps you jump straight to what you need — whether it's an already open tab, a page from your history, or a web search.",
    behavior: [
      "Shows matching open tabs, history items, and Google search suggestions in one list.",
      "Use the Up and Down arrow keys to pick a suggestion and press Return to go.",
      "Search engine suggestions can be turned off anytime in Settings if you prefer only local results."
    ]
  },
  {
    id: "copy-current-url",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Copy current URL",
    url: "https://earlybrowser.dev/features/copy-current-url",
    host: "earlybrowser.dev/features/copy-current-url",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6.8 9.2a3.2 3.2 0 0 0 4.5 0l2-2a3.2 3.2 0 0 0-4.5-4.5L7.7 3.8"/><path d="M9.2 6.8a3.2 3.2 0 0 0-4.5 0l-2 2a3.2 3.2 0 0 0 4.5 4.5l1.1-1.1"/></svg>`,
    readmeDesc: "Copy the active tab's address from the address bar or with ⌘⇧C, with a confirmation toast.",
    summary: "Grab the link to the page you're viewing with a single click or keyboard shortcut — without having to select text in the address bar first.",
    behavior: [
      "Press ⌘⇧C or click the link icon inside the address bar to copy the full page URL.",
      "Shows a subtle confirmation message in the corner so you know the link is on your clipboard."
    ]
  },
  {
    id: "trackpad-zoom",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Trackpad zoom",
    url: "https://earlybrowser.dev/features/trackpad-zoom",
    host: "earlybrowser.dev/features/trackpad-zoom",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/><line x1="7" y1="5" x2="7" y2="9"/><line x1="5" y1="7" x2="9" y2="7"/></svg>`,
    readmeDesc: "Native pinch-to-zoom and two-finger double-tap Smart Zoom.",
    summary: "Zoom in on photos, articles, and fine print with smooth macOS trackpad gestures.",
    behavior: [
      "Pinch with two fingers on your trackpad to zoom smoothly in and out.",
      "Double-tap with two fingers to Smart Zoom into a column of text and double-tap again to zoom back out."
    ]
  },
  {
    id: "two-finger-history-swipe",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Two-finger history swipe",
    url: "https://earlybrowser.dev/features/two-finger-history-swipe",
    host: "earlybrowser.dev/features/two-finger-history-swipe",
    status: "Partial",
    statusType: "partial",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 4 2 8 6 12"/><polyline points="10 4 14 8 10 12"/></svg>`,
    readmeDesc: "Swipe back and forward on a trackpad, with edge-arrow feedback in progress.",
    summary: "Move back and forward through the pages you've visited using a natural two-finger swipe on your trackpad.",
    behavior: [
      "Swipe left or right with two fingers on the page to go back or forward.",
      "Also supports ⌘[ and ⌘] keyboard shortcuts and the Back/Forward toolbar buttons.",
      "Visual edge-arrow swipe indicators are currently in progress."
    ]
  },
  {
    id: "haptic-feedback",
    folderId: "folder-interface",
    category: "Interface & Navigation",
    name: "Haptic feedback",
    url: "https://earlybrowser.dev/features/haptic-feedback",
    host: "earlybrowser.dev/features/haptic-feedback",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4.5a5 5 0 0 0 0 7"/><path d="M10.5 4.5a5 5 0 0 1 0 7"/><path d="M3 2.5a8 8 0 0 0 0 11"/><path d="M13 2.5a8 8 0 0 1 0 11"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>`,
    readmeDesc: "Subtle Force Touch trackpad haptics for sidebar drag, drop, reorder, and Space switching, with a Settings toggle.",
    summary: "Feel a gentle tactile tap on your trackpad when organizing tabs, dropping items into folders, or switching Spaces.",
    behavior: [
      "Provides subtle trackpad feedback as you reorder tabs or drop them into Favorites and folders.",
      "Gives a light tap when you swipe between Spaces.",
      "Can be turned on or off anytime in Settings."
    ]
  },

  // =========================================================================
  // 2. TABS & WORKSPACE (10 features)
  // =========================================================================
  {
    id: "pinned-and-today-tabs",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Pinned and Today tabs",
    url: "https://earlybrowser.dev/features/pinned-and-today-tabs",
    host: "earlybrowser.dev/features/pinned-and-today-tabs",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l4 4-1.5 1.5-2-1-2.5 2.5.5 2.5-1.2 1.2-2.4-2.4L2 13.2l2.4-2.4-2.4-2.4L3.2 7.2l2.5.5L8.2 5.2l-1-2L9.5 2.5z"/></svg>`,
    readmeDesc: "Keep persistent pinned tabs above the divider and temporary working tabs in Today.",
    summary: "Separate the pages you come back to every day from the pages you only need right now.",
    behavior: [
      "Pinned tabs stay above the divider so your core docs, tools, and references are always in the same spot.",
      "Today tabs appear below the New Tab button for quick research and everyday browsing.",
      "Drag tabs across the divider or right-click any tab to pin or unpin it."
    ]
  },
  {
    id: "sidebar-folders",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Sidebar folders",
    url: "https://earlybrowser.dev/features/sidebar-folders",
    host: "earlybrowser.dev/features/sidebar-folders",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.8l1.4 1.8h4.8A1.5 1.5 0 0 1 14 6.3v5.2a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5v-7z"/></svg>`,
    readmeDesc: "Group pinned tabs into collapsible folders with up to two folder levels, drag-in/out organization, and Space-aware colors.",
    summary: "Keep your pinned tabs tidy by grouping related pages into collapsible folders and subfolders.",
    behavior: [
      "Click any folder in the sidebar to expand or collapse its tabs.",
      "Supports nested subfolders so you can organize larger projects without clutter.",
      "Drag tabs in and out of folders, and folder icons automatically match your Space's theme color."
    ]
  },
  {
    id: "quick-rename",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Quick rename",
    url: "https://earlybrowser.dev/features/quick-rename",
    host: "earlybrowser.dev/features/quick-rename",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z"/></svg>`,
    readmeDesc: "Option-click a tab or folder to rename it, or use the context menu.",
    summary: "Replace long, messy webpage titles with short, clear names that make sense to you.",
    behavior: [
      "Hold Option (⌥) and click any tab or folder — or right-click and choose Rename — to give it a custom name.",
      "Your custom name stays in place even as you navigate within that tab.",
      "Switch back to the website's original title anytime with a single click."
    ]
  },
  {
    id: "favorites-bar",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Favorites bar",
    url: "https://earlybrowser.dev/features/favorites-bar",
    host: "earlybrowser.dev/features/favorites-bar",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="3" width="3.8" height="10" rx="1"/><rect x="6.1" y="3" width="3.8" height="10" rx="1"/><rect x="10.7" y="3" width="3.8" height="10" rx="1"/></svg>`,
    readmeDesc: "Pin high-frequency sites as compact icon tiles above the tab list.",
    summary: "Keep your most-used sites — like mail, calendar, or GitHub — right at the top of the sidebar as compact icon tiles.",
    behavior: [
      "Sits right below the address bar so your top sites are always visible even when you scroll your tab list.",
      "Drag any tab up into the Favorites area to turn it into an icon tile, or drag it back down to the tab list."
    ]
  },
  {
    id: "drag-and-drop-tab-reordering",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Drag-and-drop tab reordering",
    url: "https://earlybrowser.dev/features/drag-and-drop-tab-reordering",
    host: "earlybrowser.dev/features/drag-and-drop-tab-reordering",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="5" x2="12" y2="5"/><line x1="4" y1="8" x2="12" y2="8"/><line x1="4" y1="11" x2="12" y2="11"/></svg>`,
    readmeDesc: "Move tabs between Favorites, Pinned, folders, and Today.",
    summary: "Arrange your sidebar however you like by dragging tabs smoothly between Favorites, Pinned folders, and Today.",
    behavior: [
      "Reorder tabs within any section or move them between Favorites, Pinned, folders, and Today.",
      "Hover over a closed folder while dragging a tab to drop it right inside.",
      "Surrounding tabs glide smoothly out of the way to show exactly where your tab will land."
    ]
  },
  {
    id: "spaces-and-profiles",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Spaces and profiles",
    url: "https://earlybrowser.dev/features/spaces-and-profiles",
    host: "earlybrowser.dev/features/spaces-and-profiles",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="8" r="2.2"/><circle cx="11" cy="8" r="2.2"/></svg>`,
    readmeDesc: "Separate contexts with per-Space tabs, folders, icons, theme colors, swipe switching, and profile-isolated website data.",
    summary: "Keep work, personal browsing, and side projects neatly separated with dedicated Spaces and isolated Profiles.",
    behavior: [
      "Each Space has its own pinned folders, Today tabs, custom icon, and theme color.",
      "Switch between Spaces with a two-finger horizontal swipe on the sidebar or from the bottom bar.",
      "Assign Spaces to different Profiles (such as Work and Personal) so cookies, logins, and site data stay completely separate."
    ]
  },
  {
    id: "tab-search-and-switcher",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Tab search and switcher",
    url: "https://earlybrowser.dev/features/tab-search-and-switcher",
    host: "earlybrowser.dev/features/tab-search-and-switcher",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M5 7h6"/><path d="M5 9.5h4"/></svg>`,
    readmeDesc: "Search open tabs and switch recent tabs from the keyboard.",
    summary: "Jump between your most recently used tabs and search across all open tabs from the keyboard.",
    behavior: [
      "Cycle through recently viewed tabs with ⌃Tab and ⌃⇧Tab.",
      "Quickly filter open tabs across folders and Spaces by title or website address."
    ]
  },
  {
    id: "split-view",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Split view",
    url: "https://earlybrowser.dev/features/split-view",
    host: "earlybrowser.dev/features/split-view",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2"/><line x1="8" y1="2.5" x2="8" y2="13.5"/></svg>`,
    readmeDesc: "View two tabs side by side in one window.",
    summary: "Open two pages side by side inside a single window to take notes, compare products, or reference documentation without juggling multiple windows.",
    behavior: [
      "View two tabs side by side with a resizable divider in the middle.",
      "Scroll and interact with each page independently."
    ]
  },
  {
    id: "peek-preview",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Peek preview",
    url: "https://earlybrowser.dev/features/peek-preview",
    host: "earlybrowser.dev/features/peek-preview",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2"/><rect x="4" y="4.5" width="8" height="7" rx="1.2"/></svg>`,
    readmeDesc: "Preview a link in a lightweight overlay before promoting it to a full tab.",
    summary: "Glance at a link in a quick pop-up preview without losing your place or cluttering your sidebar with extra tabs.",
    behavior: [
      "Shift-click a link to preview the page over your current tab.",
      "Press Escape to close the preview and keep reading, or expand it into a full tab if you want to keep it."
    ]
  },
  {
    id: "auto-archive-inactive-tabs",
    folderId: "folder-workspace",
    category: "Tabs & Workspace",
    name: "Auto-archive inactive tabs",
    url: "https://earlybrowser.dev/features/auto-archive-inactive-tabs",
    host: "earlybrowser.dev/features/auto-archive-inactive-tabs",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><polyline points="8 4.5 8 8 10.5 9.5"/></svg>`,
    readmeDesc: "Automatically clean up old Today tabs after a configurable period.",
    summary: "Let Early automatically clear out old Today tabs you haven't used in a while, while keeping your Pinned tabs, folders, and Favorites untouched.",
    behavior: [
      "Choose how long Today tabs stay open before being archived.",
      "Pinned tabs, folders, and Favorites are never archived.",
      "Archived tabs can always be found and reopened from your history."
    ]
  },

  // =========================================================================
  // 3. MEDIA & PAGE TOOLS (5 features)
  // =========================================================================
  {
    id: "media-indicator-and-mute-control",
    folderId: "folder-media",
    category: "Media & Page Tools",
    name: "Media indicator and mute control",
    url: "https://earlybrowser.dev/features/media-indicator-and-mute-control",
    host: "earlybrowser.dev/features/media-indicator-and-mute-control",
    status: "Partial",
    statusType: "partial",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 6.5 6 10 3 10 13 6.5 10 3 10 3 6"/><path d="M12.2 5.5a3.5 3.5 0 0 1 0 5"/></svg>`,
    readmeDesc: "Show a speaker indicator on tabs playing media; mute/unmute controls are planned.",
    summary: "Instantly spot which tab is playing music or video with a speaker icon right in the sidebar.",
    behavior: [
      "Displays a speaker indicator next to any Pinned or Today tab playing audio.",
      "One-click mute and unmute controls on the tab row are planned."
    ]
  },
  {
    id: "website-fullscreen",
    folderId: "folder-media",
    category: "Media & Page Tools",
    name: "Website fullscreen",
    url: "https://earlybrowser.dev/features/website-fullscreen",
    host: "earlybrowser.dev/features/website-fullscreen",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="10 2 14 2 14 6"/><polyline points="6 14 2 14 2 10"/><line x1="14" y1="2" x2="9.5" y2="6.5"/><line x1="2" y1="14" x2="6.5" y2="9.5"/></svg>`,
    readmeDesc: "Let compatible website players enter and exit fullscreen.",
    summary: "Watch videos and use fullscreen web apps seamlessly with native macOS fullscreen support.",
    behavior: [
      "Click the fullscreen button on YouTube, Vimeo, and other video players to expand across your whole display.",
      "Press Escape anytime to return smoothly to your browser window."
    ]
  },
  {
    id: "picture-in-picture",
    folderId: "folder-media",
    category: "Media & Page Tools",
    name: "Picture in Picture",
    url: "https://earlybrowser.dev/features/picture-in-picture",
    host: "earlybrowser.dev/features/picture-in-picture",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2"/><rect x="8" y="7.5" width="5" height="4.5" rx="1" fill="currentColor" fill-opacity="0.25"/></svg>`,
    readmeDesc: "Watch compatible videos in a floating window, with an on/off preference.",
    summary: "Keep watching a video in a floating corner window while you switch tabs or work in other apps.",
    behavior: [
      "Pop compatible videos into a floating Picture in Picture window.",
      "Includes a setting to turn automatic Picture in Picture on or off when switching tabs."
    ]
  },
  {
    id: "downloads-and-page-tools",
    folderId: "folder-media",
    category: "Media & Page Tools",
    name: "Downloads and page tools",
    url: "https://earlybrowser.dev/features/downloads-and-page-tools",
    host: "earlybrowser.dev/features/downloads-and-page-tools",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><polyline points="5.5 8.5 8 11 10.5 8.5"/><line x1="8" y1="5" x2="8" y2="11"/></svg>`,
    readmeDesc: "Manage downloads, upload files, print, view PDFs, find text, and adjust zoom.",
    summary: "Everyday page tools built right in — including downloads in the sidebar footer, find on page, printing, PDF viewing, and keyboard zoom.",
    behavior: [
      "Quick access to your downloads from the bottom-left corner of the sidebar.",
      "Find text on any page with ⌘F, print with ⌘P, and adjust page zoom with ⌘+ and ⌘-."
    ]
  },
  {
    id: "reading-tools",
    folderId: "folder-media",
    category: "Media & Page Tools",
    name: "Reading tools",
    url: "https://earlybrowser.dev/features/reading-tools",
    host: "earlybrowser.dev/features/reading-tools",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h4.5a1.5 1.5 0 0 1 1.5 1.5v8.5a1 1 0 0 0-1-1H2V3z"/><path d="M14 3H9.5A1.5 1.5 0 0 0 8 4.5v8.5a1 1 0 0 1 1-1H14V3z"/></svg>`,
    readmeDesc: "Reader Mode for supported articles and page translation.",
    summary: "Read articles in a calm, distraction-free view and translate foreign-language pages with a click.",
    behavior: [
      "Reader Mode removes clutter, ads, and pop-ups on supported articles so you can focus on the text.",
      "Built-in page translation for reading websites in other languages."
    ]
  },

  // =========================================================================
  // 4. PRIVACY & SYSTEM (6 features)
  // =========================================================================
  {
    id: "session-restoration",
    folderId: "folder-system",
    category: "Privacy & System",
    name: "Session restoration",
    url: "https://earlybrowser.dev/features/session-restoration",
    host: "earlybrowser.dev/features/session-restoration",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8a5.5 5.5 0 1 1 1.1 3.3"/><polyline points="2.5 14 2.5 11 5.5 11"/></svg>`,
    readmeDesc: "Persist tabs, folders, Favorites, and navigation history locally on disk.",
    summary: "Pick up right where you left off. Early saves your Spaces, folders, pinned tabs, Today tabs, and tab history locally on your Mac.",
    behavior: [
      "Automatically restores your open tabs and folders when you relaunch Early.",
      "Background tabs stay asleep on launch until you click them, keeping startup fast and memory usage low.",
      "You can turn session restoration on or off anytime in Settings."
    ]
  },
  {
    id: "history-and-bookmarks",
    folderId: "folder-system",
    category: "Privacy & System",
    name: "History and bookmarks",
    url: "https://earlybrowser.dev/features/history-and-bookmarks",
    host: "earlybrowser.dev/features/history-and-bookmarks",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2.5h8a1 1 0 0 1 1 1v10l-5-3-5 3v-10a1 1 0 0 1 1-1z"/></svg>`,
    readmeDesc: "Search browsing history, reopen closed tabs, and manage saved bookmarks.",
    summary: "Easily find pages you visited earlier, reopen accidentally closed tabs, and organize saved bookmarks.",
    behavior: [
      "Press ⌘⇧T to reopen recently closed tabs.",
      "Search and clear your browsing history, or manage saved bookmarks."
    ]
  },
  {
    id: "privacy-and-site-controls",
    folderId: "folder-system",
    category: "Privacy & System",
    name: "Privacy and site controls",
    url: "https://earlybrowser.dev/features/privacy-and-site-controls",
    host: "earlybrowser.dev/features/privacy-and-site-controls",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L3 4.2v3.6c0 3.3 2.1 5.6 5 6.4 2.9-.8 5-3.1 5-6.4V4.2L8 2z"/></svg>`,
    readmeDesc: "Private windows, site data clearing, permissions, and content blocking.",
    summary: "Browse privately when you need to, control website permissions, clear site data, and block unwanted trackers.",
    behavior: [
      "Open Private Windows (⌘⇧N) that never save history, cookies, or site data after you close them.",
      "Manage camera, microphone, location, and notification permissions for each site.",
      "Built-in content blocking to keep pages fast and clean."
    ]
  },
  {
    id: "settings-and-customization",
    folderId: "folder-system",
    category: "Privacy & System",
    name: "Settings and customization",
    url: "https://earlybrowser.dev/features/settings-and-customization",
    host: "earlybrowser.dev/features/settings-and-customization",
    status: "Partial",
    statusType: "partial",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="2.2"/><path d="M13.5 8a5.5 5.5 0 0 0-.1-1l1.3-1-1.2-2.1-1.5.6a5.5 5.5 0 0 0-1.7-1L10 2H7.6l-.3 1.5a5.5 5.5 0 0 0-1.7 1l-1.5-.6-1.2 2.1 1.3 1a5.5 5.5 0 0 0 0 2l-1.3 1 1.2 2.1 1.5-.6a5.5 5.5 0 0 0 1.7 1L7.6 14H10l.3-1.5a5.5 5.5 0 0 0 1.7-1l1.5.6 1.2-2.1-1.3-1c.1-.3.1-.7.1-1z"/></svg>`,
    readmeDesc: "Native Settings for profiles, Space assignment, appearance, sidebar behavior, search suggestions, and local session restoration. More customization is planned.",
    summary: "Customize Early to fit your workflow from a clean macOS Settings window (⌘,).",
    behavior: [
      "Choose Light, Dark, or System appearance and toggle Space theme colors.",
      "Manage your Profiles and Spaces, sidebar width, auto-hide, and trackpad gestures.",
      "Control search suggestions and session restoration preferences."
    ]
  },
  {
    id: "developer-tools",
    folderId: "folder-system",
    category: "Privacy & System",
    name: "Developer tools",
    url: "https://earlybrowser.dev/features/developer-tools",
    host: "earlybrowser.dev/features/developer-tools",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 5 2 8 5 11"/><polyline points="11 5 14 8 11 11"/><line x1="9" y1="3.5" x2="7" y2="12.5"/></svg>`,
    readmeDesc: "Web Inspector, page source, JavaScript console, and localhost workflows.",
    summary: "Inspect elements, debug scripts, view page source, and open local development servers right from the command bar.",
    behavior: [
      "Open the Web Inspector (⌥⌘I) and JavaScript console to debug web pages.",
      "Type localhost addresses directly into the command bar without triggering a web search."
    ]
  },
  {
    id: "macos-distribution-and-updates",
    folderId: "folder-system",
    category: "Privacy & System",
    name: "macOS distribution and updates",
    url: "https://earlybrowser.dev/features/macos-distribution-and-updates",
    host: "earlybrowser.dev/features/macos-distribution-and-updates",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v7.5"/><polyline points="5 7.5 8 10.5 11 7.5"/><path d="M2.5 11.5v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1"/></svg>`,
    readmeDesc: "Release DMG packaging, Developer ID signing, Apple notarization, Homebrew Cask support, and Sparkle in-app updates.",
    summary: "Install Early in seconds via Homebrew or a signed DMG installer, and stay up to date automatically with built-in updates.",
    behavior: [
      "Signed and notarized by Apple so it opens smoothly on macOS without Gatekeeper warnings.",
      "Install with a single command via Homebrew (`brew install --cask earlybrowser/tap/early`) or download `Early.dmg`.",
      "Check for and install new updates right from the Early menu."
    ]
  }
];
