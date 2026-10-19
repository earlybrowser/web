// SPDX-License-Identifier: MPL-2.0
// Authoritative feature catalog and Today tabs for the Early Browser website
// Grounded directly in early-browser/README.md (all 29 features)

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
    id: "architecture",
    name: "Native Architecture",
    host: "earlybrowser.dev/architecture",
    url: "https://earlybrowser.dev/architecture",
    icon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polygon points="8 2 1.8 5.2 8 8.4 14.2 5.2 8 2"/><polyline points="1.8 10.8 8 14 14.2 10.8"/><polyline points="1.8 8 8 11.2 14.2 8"/></svg>`
  },
  {
    id: "roadmap",
    name: "Feature Status (29)",
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
    summary: "Early is written natively in Swift 6 using SwiftUI, AppKit, and WebKit. The outer window frame and sidebar share a single translucent surface, while web pages render inside an inset, opaque WKWebView container.",
    behavior: [
      "Concentric window geometry: a 16 pt macOS window corner radius paired with a 6 pt frame inset yields a 10 pt inner content corner radius.",
      "Native traffic light controls stay neutral monochrome at rest and reveal standard macOS colors and glyphs when hovering the control group.",
      "Web content renders on an opaque surface so website backgrounds and typography are never washed out by desktop wallpaper bleed-through.",
      "Respects macOS Reduce Transparency and Increase Contrast accessibility preferences with solid fills and higher border contrast."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView · WebContentView · SpaceAppearance" },
      { label: "Frameworks", value: "SwiftUI · AppKit · WebKit" },
      { label: "Appearances", value: "System, Light, and Dark" }
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
    summary: "Tabs live in a vertical sidebar alongside the address bar and Favorites grid. The sidebar resizes between 220 pt and 360 pt (240 pt default) and can auto-hide so web content uses the full window width.",
    behavior: [
      "Drag the sidebar's right border to resize width between 220 pt and 360 pt.",
      "Toggle sidebar auto-hide at any time with ⌘⇧S or the sidebar toolbar button.",
      "When auto-hidden, hovering within 2 pt of the left window edge reveals the floating sidebar over the page.",
      "Pinned folders, top-level pins, New Tab, and Today tabs scroll together in a single unified container."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView · SidebarWidth" },
      { label: "Shortcut", value: "⌘⇧S (Toggle Auto-Hide)" },
      { label: "Width Range", value: "220 pt – 360 pt (240 pt default)" }
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
    summary: "A floating command bar centered over the active web view handles both new tab creation (⌘T) and editing the current page's address (⌘L). Empty tabs are never created prematurely — a tab is created only when you submit.",
    behavior: [
      "Press ⌘T or click New Tab to open the command bar for a new tab; press ⌘L or click the sidebar address bar to edit the active tab's URL.",
      "Automatically distinguishes direct URLs, localhost ports, and domains from search queries.",
      "Positioned at 40% vertical height without a full-screen dimming backdrop.",
      "Dismisses cleanly on Escape or clicking outside the card."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "CommandBarView · CommandBarInput · CommandBarLayout" },
      { label: "Shortcuts", value: "⌘T (New Tab) · ⌘L (Edit Address) · Esc" },
      { label: "Card Width", value: "min(680 pt, 68% of content area)" }
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
    summary: "As you type in the command bar, Early ranks and displays up to 8 unified suggestions combining direct URL navigation, open tabs, local browsing history, and live Google search completions.",
    behavior: [
      "Deduplicates candidates across open tabs, history entries, and remote search completions.",
      "Navigate suggestions with Up/Down arrow keys and confirm with Return.",
      "Online search engine suggestions can be toggled on or off in Settings → Search."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "CommandBarView · SearchSuggestionProvider" },
      { label: "Max Results", value: "Up to 8 ranked rows" },
      { label: "Privacy", value: "Remote suggestions optional in Settings" }
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
    summary: "Copy the active tab's full URL with a single click on the link icon in the sidebar address bar or from the keyboard with ⌘⇧C.",
    behavior: [
      "When a tab is active, the address bar displays the concise host name on the left and a quick-copy link button on the right.",
      "Pressing ⌘⇧C or clicking the link icon writes the canonical URL to NSPasteboard.",
      "Displays a brief confirmation toast in the top-right corner of the content area."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView · BrowserWindowModel" },
      { label: "Shortcut", value: "⌘⇧C" },
      { label: "Feedback", value: "Top-trailing native toast" }
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
    summary: "Early enables native AppKit and WebKit magnification gestures directly on the hosted WKWebView, supporting smooth trackpad pinch-to-zoom and two-finger double-tap Smart Zoom.",
    behavior: [
      "Continuous two-finger pinch gestures scale the page smoothly with hardware-accelerated WebKit compositing.",
      "Two-finger double-tap triggers macOS Smart Zoom on the target column or element.",
      "Maintains sharp vector text rendering across zoom levels."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWebView · WebViewManager" },
      { label: "Gestures", value: "Two-finger Pinch · Two-finger Double-Tap" },
      { label: "Engine", value: "WKWebView allowsMagnification" }
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
    summary: "Navigate back and forward through tab history using standard two-finger horizontal trackpad swipes over web content, or keyboard shortcuts ⌘[ and ⌘].",
    behavior: [
      "Enables WebKit back/forward swipe navigation gestures on the active web view.",
      "Toolbar Back and Forward chevrons subtly open their interior angle on hover and compress on click.",
      "Visual edge-arrow swipe feedback overlay is currently in progress."
    ],
    specs: [
      { label: "Status", value: "Partial" },
      { label: "Modules", value: "BrowserWebView · HistoryGestureFeedback" },
      { label: "Shortcuts", value: "⌘[ (Back) · ⌘] (Forward)" },
      { label: "In Progress", value: "Edge-arrow gesture feedback overlay" }
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
    summary: "Early uses NSHapticFeedbackManager to deliver subtle alignment haptics on Force Touch trackpads during drag-and-drop reordering and Space transitions.",
    behavior: [
      "Triggers tactile feedback when a dragged tab crosses slot boundaries or drops into a folder, Favorites grid, or Today section.",
      "Provides alignment haptics when switching Spaces via trackpad swipe.",
      "Can be disabled at any time in Settings → Sidebar → Haptic feedback."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView · BrowserPreferences" },
      { label: "API", value: "AppKit NSHapticFeedbackManager" },
      { label: "Preference", value: "Toggleable in Settings → Sidebar" }
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
    summary: "The sidebar separates persistent Pinned tabs and folders above the divider from ephemeral Today tabs below the New Tab button.",
    behavior: [
      "Pinned tabs render as 34 pt rounded islands (10 pt corner radius) above the horizontal divider.",
      "Today tabs sit below the New Tab (⌘T) button for daily browsing sessions.",
      "Tabs can be pinned or unpinned via drag-and-drop across the divider or from the context menu."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView · TabStore" },
      { label: "Shortcut", value: "⌘W (Close Tab)" },
      { label: "Geometry", value: "34 pt Pinned island / 10 pt radius" }
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
    summary: "Organize pinned tabs into collapsible folders supporting up to two levels of nesting. Custom two-layer vector folder artwork (FolderBack and FolderCover) unfolds smoothly when expanded and adapts to the active Space's theme color.",
    behavior: [
      "Two-part FolderBack + FolderCover Bezier vector icon tilts its front cover open when expanded.",
      "Supports up to 2 levels of folder nesting with 12 pt leading indentation per level.",
      "Hovering anywhere over an open folder highlights a unified rounded island background covering the header and its children."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "SidebarFolderPreview · SidebarFolderBounce · SpaceAppearance" },
      { label: "Nesting Depth", value: "Up to 2 levels (SidebarFolderTree.maxDepth = 2)" },
      { label: "Rename", value: "Option-click folder or Context Menu" }
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
    summary: "Give any pinned tab, Today tab, or sidebar folder a custom title by Option-clicking it or choosing Rename from its context menu. There is no double-click timer delay on regular tab clicks.",
    behavior: [
      "Option-click any tab or folder row to open the native rename sheet immediately.",
      "Custom tab titles persist across page navigations and session restarts.",
      "Includes a 'Use Page Title' button to revert a renamed tab back to the live website title."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView (RenameTabSheet) · TabStore" },
      { label: "Trigger", value: "Option-Click (⌥-Click) or Context Menu" },
      { label: "Reset", value: "Use Page Title action" }
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
    summary: "A responsive multi-column grid of compact icon tiles (43.2 pt height, 9 pt corner radius) directly below the address bar keeps your most visited sites one click away.",
    behavior: [
      "Automatically adapts column count (up to 4 columns per row) based on how many Favorites are pinned.",
      "Drag any tab into the Favorites grid to convert it into a compact icon tile, or drag a Favorite back to the tab list.",
      "Displays the website's favicon or symbol centered inside a bordered surface tile."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserWindowView · SidebarReorderLayout" },
      { label: "Tile Geometry", value: "43.2 pt height · 9 pt corner radius · 6 pt gap" },
      { label: "Grid Layout", value: "1 to 4 adaptive columns" }
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
    summary: "A unified drag-and-drop layout engine lets you reorder items within or across Favorites, Pinned tabs, nested folders, and Today tabs with live slot displacement previews.",
    behavior: [
      "Dragging a tab into the Favorites grid morphs the floating preview from a full row into a compact tile.",
      "Hovering over a closed folder during a drag highlights and opens the folder drop target.",
      "Sibling rows animate smoothly out of the way using live geometry frames."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "SidebarReorderLayout · SidebarFolderPreview" },
      { label: "Zones", value: "Favorites ↔ Pinned ↔ Folders ↔ Today" },
      { label: "Feedback", value: "Live slot displacement + Force Touch haptics" }
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
    summary: "Organize work, personal, and project contexts into distinct Spaces. Each Space maintains its own Pinned folders and Today tabs, custom SF Symbol icon, and theme color, backed by Profile-level website data isolation.",
    behavior: [
      "Switch Spaces from the bottom footer strip, keyboard shortcuts, or a two-finger horizontal trackpad swipe over the sidebar.",
      "Each Space can be assigned one of 8 curated theme colors and 56 SF Symbols.",
      "Each Profile uses its own isolated WKWebsiteDataStore so cookies, logins, and storage never leak across profiles."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "SpaceControls · SpaceAppearance · SpaceNavigation" },
      { label: "Isolation", value: "Per-Profile WKWebsiteDataStore" },
      { label: "Customization", value: "8 Theme Swatches · 56 SF Symbols" }
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
    summary: "Dedicated keyboard tab switching (⌃Tab MRU cycling) and instant filtering across all open tabs and Spaces.",
    behavior: [
      "Cycle through most-recently-used tabs with ⌃Tab and ⌃⇧Tab.",
      "Quickly filter open tabs across Pinned folders and Today sections by title or domain."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "CommandBarView · BrowserWindowModel" },
      { label: "Shortcuts", value: "⌃Tab · ⌃⇧Tab" },
      { label: "Note", value: "Command bar already surfaces matching open tabs" }
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
    summary: "Pair two tabs side-by-side inside a single browser window with an adjustable divider for reference reading, comparisons, and development.",
    behavior: [
      "Drag a tab onto the content edge or use the context menu to create a split pair.",
      "Independent focus and scrolling for each pane with a draggable center divider."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "BrowserWindowView · WebContentView" },
      { label: "Layout", value: "Dual-pane WebKit container" },
      { label: "Roadmap", value: "Planned workspace multitasking feature" }
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
    summary: "Open external links or Shift-clicked anchors in a lightweight modal sheet over the current page without cluttering your sidebar tab list.",
    behavior: [
      "Shift-click any link to preview the destination in a floating overlay card.",
      "Dismiss with Escape to return immediately to your reading position, or promote to a full tab."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "WebContentView · EarlyWeb" },
      { label: "Triggers", value: "Shift-Click · Force Click" },
      { label: "Dismiss", value: "Escape or click outside" }
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
    summary: "Keep the Today section tidy by automatically archiving unvisited Today tabs after a configurable idle threshold while leaving Pinned tabs, folders, and Favorites untouched.",
    behavior: [
      "Configurable archive threshold (e.g., 12 hours, 24 hours, 7 days).",
      "Pinned tabs, folders, and Favorites are never auto-archived.",
      "Archived tabs remain searchable and restorable from History."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "TabStore · BrowserPreferences" },
      { label: "Scope", value: "Today tabs only (Pins preserved)" },
      { label: "Recovery", value: "Restorable from History" }
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
    summary: "Tabs playing audio or video automatically display a speaker indicator (`speaker.wave.2.fill`) in the sidebar so you can spot noisy tabs immediately.",
    behavior: [
      "Observes WebKit media playback state per tab and surfaces a speaker badge in both Pinned and Today rows.",
      "Direct click-to-mute and per-tab audio controls are planned."
    ],
    specs: [
      { label: "Status", value: "Partial" },
      { label: "Modules", value: "BrowserWindowView · WebViewManager" },
      { label: "Implemented", value: "Live speaker indicator on playing tabs" },
      { label: "Planned", value: "Per-tab click-to-mute control" }
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
    summary: "Compatible HTML5 video players and web applications can enter and exit native macOS fullscreen seamlessly.",
    behavior: [
      "Enables WebKit element fullscreen APIs so web video players expand to full display.",
      "Safely coordinates focus and view hierarchy while a web view is temporarily reparented during fullscreen playback.",
      "Prevents opaque grey titlebar boxes when revealing the macOS menu bar in fullscreen."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "WebContentView · BrowserWebView" },
      { label: "Shortcuts", value: "Esc (Exit Fullscreen) · fn F" },
      { label: "Engine", value: "WKPreferences isElementFullscreenEnabled" }
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
    summary: "Pop playing HTML5 videos into a native macOS floating Picture in Picture window that stays visible across Spaces and applications.",
    behavior: [
      "Supports standard WebKit Picture in Picture controls on compatible video elements.",
      "Includes a preference in Settings to enable or disable automatic Picture in Picture when switching away from a video tab."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "EarlyWeb · BrowserPreferences" },
      { label: "Integration", value: "macOS native PiP window controller" },
      { label: "Preference", value: "On/off toggle in Settings" }
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
    summary: "Integrated download management anchored in the sidebar footer (`arrow.down.circle`), file upload open panels, in-page find (⌘F), page zoom controls, printing, and native PDF viewing.",
    behavior: [
      "The sidebar footer reserves the bottom-left `arrow.down.circle` slot for quick access to active and recent downloads.",
      "In-page find bar (⌘F) to highlight and step through text matches.",
      "Keyboard zoom controls (⌘+, ⌘-, ⌘0), native macOS print sheets (⌘P), and file upload panels."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "SpaceControls (Footer Slot) · EarlyWeb" },
      { label: "Shortcuts", value: "⌘F (Find) · ⌘P (Print) · ⌘+ / ⌘- (Zoom)" },
      { label: "Footer UI", value: "Reserved arrow.down.circle slot in SpaceFooter" }
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
    summary: "Strip away page clutter with a clean, typography-focused Reader Mode for supported articles, paired with integrated page translation.",
    behavior: [
      "Extracts article body text and images into a calm, distraction-free reading layout.",
      "Adjustable typeface, font size, and reading theme options.",
      "Integrated page translation for foreign-language articles."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "EarlyWeb · Reading View" },
      { label: "Shortcut", value: "⌘⇧R (Toggle Reader Mode)" },
      { label: "Features", value: "Article extraction & translation" }
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
    summary: "Early automatically persists your Spaces, profiles, Favorites, nested folders, Pinned and Today tabs, custom titles, and per-tab back/forward history stacks to a local JSON store on disk.",
    behavior: [
      "Debounced atomic writes to `~/Library/Application Support/Early/browser-session.json` keep disk I/O minimal.",
      "Restored tabs use lazy WebKit loading — only the selected tab instantiates a live WKWebView on launch.",
      "Settings → Sessions lets you toggle automatic session restoration, inspect the last save timestamp, or trigger 'Save Now'."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "BrowserSessionStore · BrowserCoordinator" },
      { label: "Storage", value: "~/Library/Application Support/Early/browser-session.json" },
      { label: "Memory", value: "Lazy WKWebView instantiation on selection" }
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
    summary: "Full-text search across chronological browsing history, ⌘⇧T to reopen recently closed tabs, and structured bookmark management.",
    behavior: [
      "Reopen recently closed tabs in order with ⌘⇧T.",
      "Search and clear chronological browsing history entries.",
      "Import and export standard HTML bookmark collections."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "EarlyCore · HistoryStore" },
      { label: "Shortcuts", value: "⌘Y (History) · ⌘⇧T (Reopen Closed Tab)" },
      { label: "Note", value: "Basic history matching is already active in Command Bar" }
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
    summary: "Ephemeral private browsing windows (⌘⇧N) backed by non-persistent WebKit data stores, granular per-site permissions, website data clearing, and native WKContentRuleList content blocking.",
    behavior: [
      "Private windows use `WKWebsiteDataStore.nonPersistent()` so no cookies, cache, or history are written to disk.",
      "Manage camera, microphone, location, and notification permissions per domain.",
      "Compile content-blocking filter lists into native WebKit bytecode."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "EarlyWeb · WKContentRuleList" },
      { label: "Shortcut", value: "⌘⇧N (New Private Window)" },
      { label: "Isolation", value: "Non-persistent WKWebsiteDataStore" }
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
    summary: "A native macOS Settings window (⌘,) organized into five sections: General, Profiles, Sidebar, Search, and Sessions.",
    behavior: [
      "General: Switch between System, Light, and Dark appearance, toggle Space theme colors, and control Translucent chrome.",
      "Profiles: Create, rename, color-code, open, and delete isolated profiles, and move Spaces between profiles.",
      "Sidebar: Adjust exact sidebar width (220–360 pt), toggle Auto-hide sidebar, enable/disable two-finger Space swipes, and toggle Haptic feedback.",
      "Search & Sessions: Control online Google search suggestions, toggle 'Restore previous session', or trigger 'Save Now'."
    ],
    specs: [
      { label: "Status", value: "Partial" },
      { label: "Modules", value: "BrowserSettingsView · BrowserPreferences" },
      { label: "Shortcut", value: "⌘, (Settings)" },
      { label: "Planned", value: "Custom search engines & shortcut remapping" }
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
    summary: "First-class WebKit Web Inspector integration (⌥⌘I), Inspect Element context menu actions, View Page Source (⌥⌘U), and ergonomics for localhost development.",
    behavior: [
      "Enables WebKit developer extras for full Element, Network, Console, and Timelines inspection.",
      "Command bar already recognizes `localhost:<port>` and loopback addresses as direct URLs rather than search queries."
    ],
    specs: [
      { label: "Status", value: "Planned" },
      { label: "Modules", value: "EarlyWeb · WKPreferences" },
      { label: "Shortcuts", value: "⌥⌘I (Web Inspector) · ⌥⌘U (Page Source)" },
      { label: "Localhost", value: "Direct localhost:<port> routing in Command Bar" }
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
    summary: "Early ships as a Developer ID signed, Apple-notarized macOS `.app` and `.dmg`, installable via Homebrew Cask (`earlybrowser/tap/early`), with integrated Sparkle 2 in-app updates.",
    behavior: [
      "Install via Homebrew with `brew install --cask earlybrowser/tap/early` or download `Early.dmg` from GitHub Releases.",
      "Integrates Sparkle (`SPUStandardUpdaterController`) for signed delta updates via `Early → Check for Updates…`.",
      "Automated packaging, code signing, notarization, and appcast generation scripts in `Scripts/`."
    ],
    specs: [
      { label: "Status", value: "Implemented" },
      { label: "Modules", value: "EarlyUpdateController · Sparkle 2" },
      { label: "Homebrew", value: "brew install --cask earlybrowser/tap/early" },
      { label: "Security", value: "Developer ID signed & Apple notarized" }
    ]
  }
];
