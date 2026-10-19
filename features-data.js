// SPDX-License-Identifier: MPL-2.0
// Keep this catalog limited to major features available in Early today.
(function (root) {
  "use strict";
  const icon = (paths) => `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const icons = {
    home: icon('<path d="m2 7 6-5 6 5v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z"/><path d="M6 14V9h4v5"/>'),
    download: icon('<path d="M8 2v8m-3-3 3 3 3-3M3 13h10"/>'),
    list: icon('<path d="M5 4h8M5 8h8M5 12h8M2 4h.01M2 8h.01M2 12h.01"/>'),
    sidebar: icon('<rect x="1.5" y="2" width="13" height="12" rx="2"/><path d="M6 2v12M3.5 5h.5m-.5 3h.5m-.5 3h.5"/>'),
    pin: icon('<path d="m5 2 6 0-1 4 2 3H4l2-3ZM8 9v5"/>'),
    folder: icon('<path d="M2 13h12V5H8L6 3H2Zm0-6h12"/>'),
    spaces: icon('<rect x="2" y="2" width="9" height="9" rx="2"/><path d="M5 14h7a2 2 0 0 0 2-2V5"/>'),
    search: icon('<circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/>'),
    mac: icon('<rect x="1.5" y="2.5" width="13" height="10" rx="2"/><path d="M5 15h6M8 12.5V15M1.5 5.5h13"/>'),
    profile: icon('<circle cx="8" cy="5" r="2.5"/><path d="M2.5 14v-1a5.5 5.5 0 0 1 11 0v1"/>'),
    restore: icon('<path d="M2 6a6 6 0 1 1 .5 6M2 2v4h4m2-2v4l2 1.5"/>')
  };
  const catalog = {
    folders: [
      { id: "organization", name: "Organization" },
      { id: "browsing", name: "Browsing" },
      { id: "your-setup", name: "Your setup" }
    ],
    tabs: [
      { id: "home", name: "Home", description: "Meet Early, an open-source native macOS browser.", icon: icons.home, aliases: ["overview", "early"] },
      { id: "download", name: "Download & Install", description: "Build Early from source and find release information.", icon: icons.download, aliases: ["install", "build", "requirements"] },
      { id: "roadmap", name: "All Features", description: "What works today, and what is still ahead.", icon: icons.list, aliases: ["features", "roadmap", "planned"] }
    ],
    features: [
      {
        id: "vertical-tabs", folderId: "organization", name: "Vertical tabs", icon: icons.sidebar,
        aliases: ["sidebar", "tabs"],
        description: "A place for your tabs, not a row of tiny titles.",
        summary: "Early puts your pages in a resizable sidebar. Titles stay readable, your saved pages stay close, and the website gets the rest of the window.",
        behavior: ["Keep everyday browsing in Today tabs, separate from saved pins and Favorites.", "Resize the sidebar, or hide it and reveal it from the window’s left edge.", "Reorder pages by dragging them where they belong."]
      },
      {
        id: "pinned-and-today-tabs", folderId: "organization", name: "Favorites & pins", icon: icons.pin,
        aliases: ["favorites", "favourites", "pinned tabs", "saved pages"],
        description: "Keep the sites you come back to within reach.",
        summary: "Favorites are compact cards at the top of the sidebar. Pins give frequently used pages a permanent place below them, without mixing them into your temporary tabs.",
        behavior: ["Keep frequently visited sites as Favorites or named pins.", "Return a pin to its saved address after browsing elsewhere.", "Close a saved page without removing it, then reopen it when needed.", "Favorites belong to their profile; pins belong to their Space."]
      },
      {
        id: "sidebar-folders", folderId: "organization", name: "Nested folders", icon: icons.folder,
        aliases: ["folders", "grouping", "organization"],
        description: "Give a project a home, and put its pages together.",
        summary: "Group your saved pages into folders and subfolders. Collapse a project when you’re done with it, and open it again when you need the context back.",
        behavior: ["Organize pinned pages with up to two levels of nested folders.", "Drag tabs and folders to rearrange them, with a preview of where they will land.", "Move a folder and its contents to another Space together."]
      },
      {
        id: "spaces-and-profiles", folderId: "organization", name: "Spaces", icon: icons.spaces,
        aliases: ["spaces", "themes", "workspaces"],
        description: "Different contexts. The same familiar browser.",
        summary: "Separate work, personal browsing, and individual projects into named Spaces. Each has its own tabs, pins, and folders, with an icon and an adaptive color theme.",
        behavior: ["Switch Spaces from the sidebar or with a horizontal trackpad swipe.", "Choose an icon and a theme that adapts to light and dark appearance.", "Reorder Space icons by dragging them along the sidebar.", "Move a tab or folder to another Space and follow it there."]
      },
      {
        id: "command-bar-navigation", folderId: "browsing", name: "Command bar", icon: icons.search,
        aliases: ["search", "address", "navigation", "suggestions"],
        description: "Start with an address, or just a thought.",
        summary: "Open a URL or search Google from a floating command bar. It stays out of the way until you need it, then puts navigation right under your fingers.",
        behavior: ["Open the command bar with ⌘T, or edit the current address with ⌘L.", "Choose optional Google suggestions with the keyboard or pointer. Suggestions can be turned off in Settings.", "Fill the selected suggestion with the Right Arrow key before submitting.", "Dismiss with Escape or click outside. The page remains scrollable while the bar is open."],
        note: "The command bar on this website searches these feature pages. Searching your browser’s tabs, history, and bookmarks, and running browser commands, are planned for Early."
      },
      {
        id: "native-macos-interface", folderId: "browsing", name: "Native macOS", icon: icons.mac,
        aliases: ["webkit", "swift", "appearance", "macos", "native"],
        description: "Built for the Mac, from the frame to the page.",
        summary: "Early is built with Swift, SwiftUI, AppKit, and WebKit. A shared sidebar and window frame surround a distinct page surface, keeping the interface quiet and the website in focus.",
        behavior: ["Light and dark appearance, translucent chrome, and Space-aware colors.", "Native trackpad zoom, navigation gestures, and compatible website fullscreen.", "Respect for macOS accessibility preferences, including reduced motion and transparency."],
        note: "This website recreates Early’s interface in the browser. It is not the macOS app."
      },
      {
        id: "profiles", folderId: "your-setup", name: "Profiles", icon: icons.profile,
        aliases: ["profile", "accounts", "cookies", "logins", "settings"],
        description: "Keep your different lives separate.",
        summary: "Profiles separate cookies, logins, website data, and Favorites. Assign Spaces to a profile to keep related contexts together without mixing accounts.",
        behavior: ["Create and manage profiles in the native Settings window.", "Give Spaces the profile they should use for browsing.", "Choose a default profile for fresh sessions. Restored sessions keep their last active profile."]
      },
      {
        id: "session-restoration", folderId: "your-setup", name: "Session restoration", icon: icons.restore,
        aliases: ["restore", "sessions", "persistence", "saved"],
        description: "A familiar place to return to.",
        summary: "Early saves your browsing organization locally so you can return to your tabs, saved pages, and Spaces after quitting the app.",
        behavior: ["Restore tabs, pins, Favorites, ordering, and selection.", "Keep multiple windows’ Today tabs separate while restoring them together.", "Start with folders collapsed, ready to open the context you need."],
        note: "Session restoration saves browser organization and page addresses, not a website’s live form state or a complete page snapshot. Cross-device sync is not available yet."
      }
    ],
    planned: [
      { name: "Universal search & commands", description: "Find tabs, history, and bookmarks, and run browser actions from the command bar." },
      { name: "More ways to browse", description: "Split views, tab previews, and improved page lifecycle management." },
      { name: "Everyday browser essentials", description: "Downloads, history, bookmarks, site controls, and reading tools." },
      { name: "Distribution & portability", description: "Packaged macOS releases, Homebrew installation, and export/import." }
    ]
  };
  root.EarlyCatalog = catalog;
  if (typeof module === "object" && module.exports) module.exports = catalog;
})(typeof globalThis === "object" ? globalThis : this);
