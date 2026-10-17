// Comprehensive data for all 28 Early browser features from README.md
window.EARLY_FEATURES = [
  // --- Category: Core Experience & Interface ---
  {
    id: "native-interface",
    category: "core",
    categoryName: "Core Interface",
    name: "Native macOS Interface",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="6" r="1" fill="currentColor"/></svg>`,
    shortDesc: "Light/dark translucent chrome, native window controls, and opaque website content. Respects Reduce Transparency and contrast.",
    details: {
      headline: "Built specifically for macOS. Zero Electron, zero Chromium bloat.",
      summary: "Early leverages native AppKit and SwiftUI windows, drawing real platform chrome with fluid vibrancy and concentric corner geometry. Web content renders inside dedicated opaque WKWebView layers, preventing unwanted transparency bleed.",
      highlights: [
        "Concentric window and content borders matching macOS system corner radiuses exactly.",
        "Automatic system appearance support with seamless Light and Dark vibrancy.",
        "Deep accessibility support respecting 'Reduce Transparency' and 'Increase Contrast' settings.",
        "Native window dragging, fluid resizing, and hardware-accelerated rendering."
      ],
      techSpecs: [
        { label: "Framework", value: "SwiftUI + AppKit (NSWindow)" },
        { label: "Rendering", value: "Hardware Metal & WKWebView" },
        { label: "Corner Radius", value: "16pt window / 10pt inner canvas" },
        { label: "Accessibility", value: "Reduce Transparency & High Contrast" }
      ],
      interactiveType: "native-interface"
    }
  },
  {
    id: "vertical-tabs",
    category: "core",
    categoryName: "Core Interface",
    name: "Vertical Tabs",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`,
    shortDesc: "Organize pages in a resizable sidebar with an address bar, auto-hide, and edge-hover reveal.",
    details: {
      headline: "Reclaim horizontal widescreen space with vertical tab flow.",
      summary: "Modern widescreen displays have abundant horizontal width but limited vertical height. Early moves tabs into a fluid, collapsible vertical sidebar that supports fluid drag-to-resize, auto-hiding (⌘⇧S), and instantaneous edge-hover reveal.",
      highlights: [
        "Clamped sidebar width (180pt to 380pt) that can be adjusted with smooth pointer dragging.",
        "Auto-hide mode with instantaneous reveal when hovering the left window edge.",
        "Unified scroll container ensuring pins and Today tabs never get pushed off-screen.",
        "Clean, legible tab titles without horizontal ellipsis cramping."
      ],
      techSpecs: [
        { label: "Shortcut", value: "⌘⇧S (Toggle Auto-Hide)" },
        { label: "Width Range", value: "180pt – 380pt (Clamped)" },
        { label: "Reveal Sensor", value: "Continuous pointer tracking on window edge" },
        { label: "Layout", value: "Single-domain LazyVStack with zero lazy row flicker" }
      ],
      interactiveType: "vertical-tabs"
    }
  },
  {
    id: "command-bar",
    category: "core",
    categoryName: "Core Interface",
    name: "Command-Bar Navigation",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"/><path d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"/><path d="M6 9h12"/><path d="M6 15h12"/></svg>`,
    shortDesc: "Open URLs or Google searches with ⌘T; edit the current address with ⌘L. A tab is created when you submit.",
    details: {
      headline: "Keystroke-driven browsing with zero friction.",
      summary: "Forget hunting for URL bars. The floating Command Bar summons instantly with ⌘T to open new tabs or Google searches, and ⌘L to edit the current location. Submitting an inquiry creates or redirects your active tab.",
      highlights: [
        "Instant popup overlay centered over content with gentle backdrop dimming.",
        "Automatic URL detection vs search query parsing.",
        "Fast keyboard selection with Up/Down arrows and Enter.",
        "Clean escape dismiss with Escape key without losing state."
      ],
      techSpecs: [
        { label: "New Tab Shortcut", value: "⌘T" },
        { label: "Edit Address Shortcut", value: "⌘L" },
        { label: "Dismiss Shortcut", value: "Escape" },
        { label: "Resolution", value: "Direct URL navigation or Google Query fallback" }
      ],
      interactiveType: "command-bar"
    }
  },
  {
    id: "search-suggestions",
    category: "core",
    categoryName: "Core Interface",
    name: "Search Suggestions",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>`,
    shortDesc: "Google suggestions while typing, with keyboard and mouse selection. Enabled by default with privacy controls planned.",
    details: {
      headline: "Instant query autocomplete as you type.",
      summary: "As you compose queries in the command bar, Early asynchronously fetches relevant search suggestions with debounced network calls, presenting an interactive list navigable via keyboard arrows or mouse hover.",
      highlights: [
        "Debounced network requests preventing unnecessary keystroke traffic.",
        "Smooth scroll navigation through suggestions using Arrow keys.",
        "Graceful offline fallback when suggestions are unavailable.",
        "Future privacy settings toggle planned to disable network queries."
      ],
      techSpecs: [
        { label: "Provider", value: "Google Suggestions API" },
        { label: "Debounce", value: "150ms keystroke buffer" },
        { label: "Navigation", value: "Arrow keys (Up/Down) + Enter" },
        { label: "Status", value: "Fully operational in Phase 1" }
      ],
      interactiveType: "search-suggestions"
    }
  },
  {
    id: "browser-navigation",
    category: "core",
    categoryName: "Core Interface",
    name: "Browser Navigation",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 18-6-6 6-6"/><path d="M9 12h12"/></svg>`,
    shortDesc: "Back, Forward, Reload, Stop, tab shortcuts, and native website alerts, confirmations, and prompts.",
    details: {
      headline: "Fluid navigation controls with tactile button feedback.",
      summary: "Back and Forward buttons feature custom dynamic chevron shapes that open slightly on hover and spring forward on click. Reload seamlessly transitions into a Stop button while pages load, and native macOS sheet dialogs handle JS alert(), confirm(), and prompt().",
      highlights: [
        "Animated morphing Reload / Stop icon with rotational feedback.",
        "Dynamic chevron geometry that physically responds to pointer hover and clicks.",
        "Full support for native AppKit sheets for JavaScript alert dialogs.",
        "Accurate canGoBack / canGoForward state tracking."
      ],
      techSpecs: [
        { label: "Back / Forward", value: "⌘[ and ⌘] or toolbar chevrons" },
        { label: "Reload / Stop", value: "⌘R or toolbar action" },
        { label: "Dialogs", value: "WKUIDelegate native AppKit modal sheets" },
        { label: "Feedback", value: "120ms spring click animation" }
      ],
      interactiveType: "browser-navigation"
    }
  },
  {
    id: "trackpad-zoom",
    category: "core",
    categoryName: "Core Interface",
    name: "Trackpad Zoom",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>`,
    shortDesc: "Native pinch-to-zoom and two-finger double-tap Smart Zoom for effortless reading.",
    details: {
      headline: "Apple trackpad gestures built directly into the WebKit viewport.",
      summary: "Fluid pinch gestures scale web content smoothly with subpixel typography rendering. Double-tapping with two fingers triggers Smart Zoom, automatically centering and enlarging the target column or media block.",
      highlights: [
        "Native trackpad magnification without lag or choppy redraws.",
        "Smart Zoom column detection matching Safari's renowned UX.",
        "Smooth reset to 100% scale with ⌘0.",
        "Maintains crisp font vector rendering at any magnification level."
      ],
      techSpecs: [
        { label: "Gestures", value: "Pinch-to-zoom & two-finger double tap" },
        { label: "Shortcuts", value: "⌘+ (Zoom In), ⌘- (Zoom Out), ⌘0 (Reset)" },
        { label: "Backend", value: "WebKit Page Zoom & View Magnification" }
      ],
      interactiveType: "trackpad-zoom"
    }
  },
  {
    id: "website-fullscreen",
    category: "core",
    categoryName: "Core Interface",
    name: "Website Fullscreen",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
    shortDesc: "Let compatible website players (YouTube, Vimeo, Netflix) enter and exit seamless fullscreen.",
    details: {
      headline: "Immersive media viewing with proper macOS window handling.",
      summary: "Compatible web players take over the window or dedicated display smoothly. Early swizzles and coordinates macOS titlebar background views to eliminate ugly grey borders in fullscreen video mode.",
      highlights: [
        "Native HTML5 video fullscreen support via standard WebKit delegate callbacks.",
        "Clean slide-down titlebar behavior without visual grey clipping.",
        "Smooth exit via Escape or video player controls."
      ],
      techSpecs: [
        { label: "Standard", value: "HTML5 Fullscreen API" },
        { label: "Titlebar Fix", value: "NSTitlebarBackgroundView layer masking" },
        { label: "Status", value: "Fully operational" }
      ],
      interactiveType: "website-fullscreen"
    }
  },

  // --- Category: Tab & Workspace Management ---
  {
    id: "favorites-and-pins",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Favorites and Pins",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    shortDesc: "Keep frequently visited sites as compact Favorites or named pins. Reopen closed pins and return to saved URLs on demand.",
    details: {
      headline: "The cornerstone of calm, organized workflows.",
      summary: "Keep your daily essentials pinned in the sidebar. Favorites sit in an elegant top grid, while Named Pins live in folders or top-level slots. When you navigate away from a pinned site, a subtle return arrow lets you jump back to the saved address in one click.",
      highlights: [
        "Compact 4-column Favorite tiles with automatic site favicon extraction.",
        "One-click 'Reset to Pinned URL' button when browsing away from the pin.",
        "Persisted across browser restarts; closed pins reopen on demand without allocating idle memory.",
        "Option-click directly on any pin to rename without opening it."
      ],
      techSpecs: [
        { label: "Grid Stride", value: "4 tiles per row, 44pt height" },
        { label: "Reset Action", value: "Reverts tab.currentURL to tab.pinnedURL" },
        { label: "Memory State", value: "WKWebView allocated only upon tab activation" },
        { label: "Shortcuts", value: "⌥-Click (Rename), ⌘-Click (Open in background)" }
      ],
      interactiveType: "favorites-pins"
    }
  },
  {
    id: "nested-folders",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Nested Folders",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    shortDesc: "Group and reorder tabs with up to two nesting levels. Folder drop previews reserve space smoothly.",
    details: {
      headline: "Hierarchical organization that stays tidy.",
      summary: "Organize projects, research, and daily tabs into folders with up to two levels of nesting. Custom vector folder icons smoothly open their front cover on expansion, and spring animations provide instant spatial awareness.",
      highlights: [
        "Up to 2 nesting levels (Root → Folder → Subfolder).",
        "Two-part custom folder vector artwork with animated unfolding cover.",
        "Drop target previews that intelligently reserve a single slot without visual jumpiness.",
        "Context menu with 'New Subfolder', 'Rename', and 'Delete Folder'."
      ],
      techSpecs: [
        { label: "Max Nesting", value: "2 levels (depth <= 32 guard)" },
        { label: "Artwork", value: "Custom FolderBack + FolderCover shapes" },
        { label: "Animation", value: "Spring duration 0.16s, bounce 0.26" },
        { label: "Persistence", value: "Hierarchical parentID relation in SQLite/JSON" }
      ],
      interactiveType: "nested-folders"
    }
  },
  {
    id: "session-restoration",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Session Restoration",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>`,
    shortDesc: "Restore tabs, saved pages, ordering, and selection after quitting. Folders start collapsed; empty sessions open command bar.",
    details: {
      headline: "Pick up exactly where you left off, every single time.",
      summary: "Quit with confidence. Early continuously writes tab metadata, active selection, folder hierarchies, and scroll indices to an atomic local session store. When reopened, the exact window geometry and state restore instantly.",
      highlights: [
        "Atomic disk persistence preventing corruption during unexpected shutdowns.",
        "Lazy page restoration: tabs stay asleep until clicked, saving gigabytes of RAM.",
        "Folders start collapsed to maintain a clean, organized initial view.",
        "Empty sessions automatically summon the command bar for instant browsing."
      ],
      techSpecs: [
        { label: "Storage", value: "Atomic local JSON session repository" },
        { label: "Lazy Load", value: "Zero web views created for unselected tabs" },
        { label: "Recovery", value: "Self-healing schema validation on startup" }
      ],
      interactiveType: "session-restoration"
    }
  },
  {
    id: "links-and-windows",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Links and Windows",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    shortDesc: "Command-click links to open background tabs; open links or tab copies in separate windows.",
    details: {
      headline: "Flexible multi-window support that shares persistent assets.",
      summary: "Command-click any link on the web to open it in a quiet background tab. Drag a tab out or choose 'Open Tab in New Window' to launch a secondary window. Multiple windows share saved Pins and Favorites while maintaining separate Today tabs.",
      highlights: [
        "Command-click (⌘-Click) opens links seamlessly in background tabs.",
        "Right-click context menu options: 'Open Tab in New Window', 'Copy Link', 'Share Link'.",
        "Shared state coordination: updates to Favorites and Pins sync across all open windows.",
        "Independent Today tab sessions per window."
      ],
      techSpecs: [
        { label: "Shared State", value: "BrowserCoordinator centralized tab store" },
        { label: "Window Protocol", value: "NSWindowController + SwiftUI focused scene values" }
      ],
      interactiveType: "links-windows"
    }
  },
  {
    id: "quick-renaming",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Quick Renaming",
    status: "Implemented",
    statusType: "implemented",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    shortDesc: "Option-click a tab, Favorite, or folder to rename without opening it. Standard clicks open immediately.",
    details: {
      headline: "Rename items instantly without disrupting your flow.",
      summary: "Tired of click-delay timers? In Early, a normal click selects or toggles immediately. Hold Option (⌥) and click any tab, favorite tile, or folder to invoke the rename sheet instantly without accidentally loading the page.",
      highlights: [
        "Zero-latency clicking: no double-click delay timer on ordinary clicks.",
        "⌥-Click gesture recognized exclusively before standard click activation.",
        "Modal rename sheet with one-click 'Use Page Title' reset button.",
        "Renaming updates the local session store immediately."
      ],
      techSpecs: [
        { label: "Gesture", value: "TapGesture().modifiers(.option)" },
        { label: "Safety", value: "Drag gesture takes priority to prevent accidental rename" },
        { label: "Sheet", value: "RenameTabSheet with auto-focus text field" }
      ],
      interactiveType: "quick-renaming"
    }
  },
  {
    id: "spaces-and-profiles",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Spaces and Profiles",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    shortDesc: "Separate workspaces with colored space dots and isolated browsing profiles (Personal, Work, Side-projects).",
    details: {
      headline: "Contextual boundaries for your distinct digital lives.",
      summary: "Switch between Personal, Work, and Client environments with one swipe. Each space maintains distinct pinned tabs, folders, cookies, and browsing profiles, completely isolating logins and credentials.",
      highlights: [
        "Colored space dots at the bottom of the sidebar for instant workspace switching.",
        "Isolated WKWebsiteDataStore profiles: log into multiple Google or GitHub accounts simultaneously.",
        "Custom space themes and accent tinting.",
        "Keyboard shortcut for fast switching between spaces."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 3 Engineering Specification" },
        { label: "Profile Engine", value: "Non-persistent or custom named WKWebsiteDataStore" },
        { label: "Indicator", value: "Sidebar bottom Personal footer element" }
      ],
      interactiveType: "spaces-profiles"
    }
  },
  {
    id: "split-views",
    category: "tabs",
    categoryName: "Tab Management",
    name: "Split Views & Tab Previews",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`,
    shortDesc: "Side-by-side pages with shared controls following the focused pane; visual thumbnail tab switcher.",
    details: {
      headline: "Multi-task side-by-side without juggling separate windows.",
      summary: "View documentation alongside code, or compare two articles simultaneously. Split view embeds two live WebKit views in the content area with an adjustable divider, while tab hover previews provide quick visual confirmation.",
      highlights: [
        "Horizontal and vertical split ratios with smooth drag divider.",
        "Active address bar and navigation controls dynamically track focused pane.",
        "Live thumbnail tab peek on hover.",
        "Swap or close split panes with a single shortcut."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 4 Master Build Plan" },
        { label: "Architecture", value: "Dual NSViewRepresentable with shared coordinator" }
      ],
      interactiveType: "split-views"
    }
  },

  // --- Category: Productivity & Performance ---
  {
    id: "media-controls",
    category: "productivity",
    categoryName: "Productivity",
    name: "Media Controls & Tab Muting",
    status: "Partial",
    statusType: "partial",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    shortDesc: "Identify playing HTML audio or video. Speaker-click tab muting and per-site muting are planned.",
    details: {
      headline: "Instantly spot where that mystery sound is coming from.",
      summary: "Early monitors audio playback across all open tabs. A speaker icon (`speaker.wave.2.fill`) appears directly in the sidebar row next to any tab producing sound, with direct click-to-mute and per-origin muting rules in progress.",
      highlights: [
        "Real-time WKWebView media playback observation.",
        "Speaker indicator visible in sidebar row next to the tab title.",
        "Phase 2 implementation tracks audio; Phase 5 completes direct speaker click-to-mute."
      ],
      techSpecs: [
        { label: "Status", value: "Partial (Audio detection live, click-to-mute in Phase 5)" },
        { label: "Observer", value: "MediaActivityObserver on WKWebView media state" }
      ],
      interactiveType: "media-controls"
    }
  },
  {
    id: "page-lifecycle",
    category: "productivity",
    categoryName: "Productivity",
    name: "Page Lifecycle & Suspension",
    status: "Partial",
    statusType: "partial",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    shortDesc: "Create pages on demand and release them when closed. Automatic suspension and memory recovery are planned.",
    details: {
      headline: "Run hundreds of tabs using a fraction of the memory.",
      summary: "Unlike Chrome or Edge which hoard gigabytes of memory across inactive tabs, Early only creates live WebKit views for active tabs. Unloaded tabs remain lightweight Swift structs, consuming virtually 0 MB of RAM.",
      highlights: [
        "Lazy instantiation: Web views are only initialized when a tab is selected.",
        "Immediate view teardown upon tab closure.",
        "Automatic background tab suspension for idle pages planned in Phase 5.",
        "Seamless session rehydration preserving scroll state."
      ],
      techSpecs: [
        { label: "Status", value: "Partial (On-demand allocation live; suspension planned)" },
        { label: "Memory Footprint", value: "~15MB base vs 800MB+ Chromium browsers" }
      ],
      interactiveType: "page-lifecycle"
    }
  },
  {
    id: "universal-search",
    category: "productivity",
    categoryName: "Productivity",
    name: "Universal Search & Commands",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    shortDesc: "Find open tabs, history, and bookmarks, and run browser actions directly from the command bar.",
    details: {
      headline: "Your browser's Spotlight, Raycast, and Alfred in one.",
      summary: "The command bar expands into a universal launcher. Type `>dark mode`, `>clear cache`, or search through thousands of history items and open tabs with fuzzy matching.",
      highlights: [
        "Fuzzy search across open tabs, bookmarks, and browsing history.",
        "Action prefixes (e.g. `>` or `/`) to execute browser settings directly.",
        "Quick tab switcher: jump between 50+ open tabs in milliseconds."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 4 Architecture Spec" },
        { label: "Search Engine", value: "Fast local in-memory SQLite FTS5 index" }
      ],
      interactiveType: "universal-search"
    }
  },
  {
    id: "downloads-and-tools",
    category: "productivity",
    categoryName: "Productivity",
    name: "Downloads & Page Tools",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    shortDesc: "Manage downloads, upload files, print, view PDFs natively, find text on page, and adjust zoom.",
    details: {
      headline: "Every utility you need, rendered with native macOS precision.",
      summary: "Clean downloads manager in the sidebar, seamless native PDF viewing with PDFKit, inline Find on Page (⌘F) with highlight count, and full print preview dialogs.",
      highlights: [
        "Downloads dock with progress percentage and Finder reveal.",
        "Integrated PDF reading powered by Apple PDFKit.",
        "Smooth in-page find bar (⌘F) with match navigation."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 5 Development" },
        { label: "Frameworks", value: "WebKit WKDownloadDelegate + Apple PDFKit" }
      ],
      interactiveType: "downloads-tools"
    }
  },
  {
    id: "reading-tools",
    category: "productivity",
    categoryName: "Productivity",
    name: "Reading Tools & Reader Mode",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    shortDesc: "Distraction-free Reader Mode for articles, custom typography, and instant page translation.",
    details: {
      headline: "Read without ads, popups, or cluttered layouts.",
      summary: "Stripping clutter with one click, Reader Mode extracts article content into an elegant, typography-focused layout with customizable font sizes, serif/sans-serif toggles, and warm sepia themes.",
      highlights: [
        "Content readability algorithm stripping banners, cookies, and ads.",
        "Custom typography choices (San Francisco, New York Serif, Mono).",
        "Estimated reading time indicator and text-to-speech."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 6 Feature Plan" },
        { label: "Engine", value: "Native Readability DOM parser" }
      ],
      interactiveType: "reading-tools"
    }
  },
  {
    id: "picture-in-picture",
    category: "productivity",
    categoryName: "Productivity",
    name: "Picture in Picture",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><rect x="12" y="10" width="8" height="8" rx="1"/></svg>`,
    shortDesc: "Watch videos in a floating window pinned over other applications with resize controls.",
    details: {
      headline: "Keep video streams in view while coding, reading, or writing.",
      summary: "Pop video players into a system-level floating window that remains pinned above all other desktop applications. Controls include play/pause, skip 15s, and edge snapping.",
      highlights: [
        "Floating PIP window stays on top of all macOS applications.",
        "Auto-pip option when switching tabs while video is actively playing.",
        "Smooth corner snapping and trackpad resizing."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 7 Feature Plan" },
        { label: "API", value: "Apple AVKit AVPictureInPictureController" }
      ],
      interactiveType: "picture-in-picture"
    }
  },
  {
    id: "github-live-folders",
    category: "productivity",
    categoryName: "Productivity",
    name: "GitHub Live Folders",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    shortDesc: "Automatically collect pull requests and review requests in a smart folder linked to your GitHub account.",
    details: {
      headline: "A browser tailored for software engineers and makers.",
      summary: "Connect your GitHub account to generate dynamic smart folders in the sidebar. Automatically stream PRs awaiting your review, CI build statuses, and assigned issues with live unread count badges.",
      highlights: [
        "Live syncing with GitHub GraphQL API.",
        "Badges for failing CI, merge conflicts, and review approvals.",
        "Zero tab clutter: automatically removes merged PR tabs."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 8 Developer Integration" },
        { label: "Protocol", value: "GitHub OAuth / Personal Access Token" }
      ],
      interactiveType: "github-live-folders"
    }
  },

  // --- Category: System, Privacy & Ecosystem ---
  {
    id: "credentials-autofill",
    category: "system",
    categoryName: "System & Privacy",
    name: "Credentials and Autofill",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    shortDesc: "Integrate supported password managers, system autofill, and passkeys through platform facilities.",
    details: {
      headline: "Seamless sign-in with Touch ID and native password managers.",
      summary: "Full integration with Apple Keychain, 1Password, Bitwarden, and FIDO2 Passkeys. Use Touch ID or Apple Watch to authenticate logins securely without copying and pasting passwords.",
      highlights: [
        "Native iCloud Keychain autofill support.",
        "Passkeys and WebAuthn via Touch ID / Secure Enclave.",
        "1Password and Bitwarden extension compatibility."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 6 Integration" },
        { label: "Framework", value: "Apple AuthenticationServices & LocalAuthentication" }
      ],
      interactiveType: "credentials-autofill"
    }
  },
  {
    id: "default-browser",
    category: "system",
    categoryName: "System & Privacy",
    name: "Default Browser Integration",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m4.93 19.07 4.24-4.24"/></svg>`,
    shortDesc: "Set Early as your default macOS browser and handle externally clicked links seamlessly.",
    details: {
      headline: "Make Early the primary gateway to your web experience.",
      summary: "Register Early as your system-wide default handler for `http://` and `https://` URLs. Links clicked in Slack, Mail, Messages, or Terminal open immediately in your active Space.",
      highlights: [
        "One-click 'Set as Default Browser' prompt.",
        "Space-aware link routing: open work links directly into your Work Space.",
        "Fast launch from cold boot when an external link is triggered."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 7 Release Integration" },
        { label: "Mechanism", value: "NSWorkspace.setDefaultApplicationURL + CFBundleURLTypes" }
      ],
      interactiveType: "default-browser"
    }
  },
  {
    id: "state-portability",
    category: "system",
    categoryName: "System & Privacy",
    name: "State Portability & Sync",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    shortDesc: "Export/import settings, windows, tabs, folders, and pins; exclude credentials and private data.",
    details: {
      headline: "Your data belongs to you. Plain JSON export and backup.",
      summary: "Easily backup your entire browser configuration or transfer it to a new Mac. Early outputs clean, human-readable JSON files that preserve tabs, nested folders, pins, and custom names.",
      highlights: [
        "Export entire workspace state with one click.",
        "Privacy guarantee: Zero passwords, credentials, or session cookies are included in exports.",
        "Instant import and merge without restarting the browser."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 8 Development" },
        { label: "Format", value: "Standard UTF-8 JSON Schema v1.0" }
      ],
      interactiveType: "state-portability"
    }
  },
  {
    id: "developer-tools",
    category: "system",
    categoryName: "System & Privacy",
    name: "WebKit Developer Tools",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    shortDesc: "Inspect pages, debug JavaScript, analyze network requests, and audit performance via WebKit inspector.",
    details: {
      headline: "The full power of Apple Web Inspector built right in.",
      summary: "Right-click and select 'Inspect Element' (⌥⌘I) to summon the comprehensive WebKit Web Inspector. Inspect DOM trees, modify CSS styles live, debug JavaScript with breakpoints, and inspect network waterfalls.",
      highlights: [
        "Native Web Inspector window or docked bottom/side pane.",
        "Console, Network, Sources, Timelines, Storage, and Audit tabs.",
        "Modern CSS grid and flexbox visualization tools."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 8 Developer Features" },
        { label: "Shortcut", value: "⌥⌘I (Inspect Element), ⌥⌘C (Inspect Console)" },
        { label: "Backend", value: "WKPreferences._developerExtrasEnabled" }
      ],
      interactiveType: "developer-tools"
    }
  },
  {
    id: "history-and-privacy",
    category: "system",
    categoryName: "System & Privacy",
    name: "History, Bookmarks & Privacy",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    shortDesc: "Search history, organize bookmarks, use Private Browsing sessions, manage permissions, and clear site data.",
    details: {
      headline: "Privacy is not a feature; it is our foundation.",
      summary: "Early has zero telemetry, zero analytics tracking, and zero advertising partnerships. Browse freely in Private Windows that discard all cookies and cache the instant the window closes.",
      highlights: [
        "100% private: no tracking pixels, telemetry, or user analytics.",
        "Dedicated Private Windows (⌘⇧N) with isolated memory stores.",
        "Granular per-site permission manager (Camera, Microphone, Location)."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 9 Security & Privacy" },
        { label: "Private Mode", value: "WKWebsiteDataStore.nonPersistent()" }
      ],
      interactiveType: "history-privacy"
    }
  },
  {
    id: "settings-customization",
    category: "system",
    categoryName: "System & Privacy",
    name: "Settings and Customization",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    shortDesc: "Choose search and startup preferences, appearance themes, keyboard shortcuts, and privacy toggles.",
    details: {
      headline: "Tailor the browser to your personal preferences.",
      summary: "Configure your default search engine (Google, DuckDuckGo, Kagi, Ecosia), customize keyboard shortcuts, tweak sidebar behavior, and manage font rendering options.",
      highlights: [
        "Select default search provider or add custom search templates.",
        "Customizable keyboard shortcut map.",
        "Toggle search suggestions, auto-hide sidebar behavior, and sound effects."
      ],
      techSpecs: [
        { label: "Roadmap", value: "Phase 9 Preferences Architecture" },
        { label: "UI", value: "Native macOS Settings window (⌘,)" }
      ],
      interactiveType: "settings-customization"
    }
  },
  {
    id: "macos-distribution",
    category: "system",
    categoryName: "System & Privacy",
    name: "macOS Distribution & Homebrew",
    status: "Planned",
    statusType: "planned",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16.5A2.5 2.5 0 0 1 18.5 19H5.5A2.5 2.5 0 0 1 3 16.5V7.5A2.5 2.5 0 0 1 5.5 5h13a2.5 2.5 0 0 1 2.5 2.5v9z"/><path d="M7 15h10"/><path d="M7 11h6"/></svg>`,
    shortDesc: "Install packaged releases or use Homebrew Cask, with optional code signing and Apple notarization.",
    details: {
      headline: "Install in seconds via Homebrew or standalone DMG.",
      summary: "Early ships as a zero-dependency macOS application. Install in one line via our official Homebrew tap: `brew tap earlybrowser/tap && brew install --cask early-browser` or download universal Apple Silicon & Intel binaries from GitHub Releases.",
      highlights: [
        "Official Homebrew tap (`earlybrowser/tap`).",
        "Universal binary supporting Apple Silicon (M1/M2/M3/M4) & Intel Macs.",
        "Automated GitHub Actions CI/CD release pipeline.",
        "Automated notarization for effortless Gatekeeper verification."
      ],
      techSpecs: [
        { label: "Homebrew Cask", value: "earlybrowser/tap/early-browser" },
        { label: "Architecture", value: "Universal arm64 + x86_64" },
        { label: "Min OS", value: "macOS 14.0 (Sonoma) or newer" }
      ],
      interactiveType: "macos-distribution"
    }
  }
];

// Special Today Pages
window.EARLY_SPECIAL_TABS = [
  {
    id: "home",
    name: "Welcome to Early",
    url: "early://welcome",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    badge: "Home"
  },
  {
    id: "download",
    name: "Download & Install",
    url: "early://download",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    badge: "Install"
  },
  {
    id: "architecture",
    name: "Native Architecture",
    url: "early://architecture",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    badge: "Swift 6"
  },
  {
    id: "roadmap",
    name: "Roadmap & Master Plan",
    url: "early://roadmap",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    badge: "Phases 0-10"
  }
];
