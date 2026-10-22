// SPDX-License-Identifier: MPL-2.0
// Keep this catalog limited to major features available in Early today.
// SVG artwork, except the original Early download glyph, adapted from Lucide
// 0.468.0 (ISC); see licenses/lucide.txt.
(function (root) {
  "use strict";
  const icon = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const icons = {
    home: icon('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    // Keep in sync with early-browser's DownloadGlyph and the footer in index.html.
    download: icon('<circle cx="12" cy="12" r="9"/><path d="M12 7.75v7.75"/><path d="M8.5 12 12 15.5 15.5 12"/>'),
    list: icon('<path d="M3 6h.01M3 12h.01M3 18h.01M8 6h13M8 12h13M8 18h13"/>'),
    sidebar: icon('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>'),
    pin: icon('<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>'),
    folder: icon('<path d="M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z"/><path d="M2 8v11a2 2 0 0 0 2 2h14"/>'),
    spaces: icon('<path d="m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12"/><path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z"/>'),
    search: icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    mac: icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01"/>'),
    profile: icon('<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>'),
    restore: icon('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>')
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
        aliases: ["search", "address", "navigation", "suggestions", "commands", "actions"],
        description: "Find your tab. Run a command. Keep moving.",
        summary: "One floating bar for web searches, existing pages, and browser commands. Type what you need, then choose a matching tab, Space, profile, or action without leaving the keyboard.",
        behavior: [
          "Open with ⌘T, or edit the current address with ⌘L. Typing or dismissing the bar doesn’t add a tab.",
          "Find tabs and pins in your current Space, plus your profile’s Favorites, by title or address. Switch to an existing page or reopen a closed pin or Favorite in place, without duplicates. Parent folders expand to reveal the tab.",
          "Type naturally: “Pin Tab”, “Duplicate Tab”, “New Space”, or “Open Settings”. Choose the matching command with the arrow keys and Return, or click it. Commands appear when they can be used.",
          "Switch Spaces or profiles by typing their names. Tab matches and browser actions appear above optional Google suggestions.",
          "Pressing Return without selecting a result opens your typed address or web search. Right Arrow fills a selected Google suggestion before submitting.",
          "Turn command-bar actions or online suggestions on or off in Settings → Search. Escape or an outside click dismisses the bar without creating a tab."
        ],
        commandGroups: [
          {
            name: "Tabs and saved pages",
            commands: [
              { name: "Pin Tab", description: "Save the current tab as a pin in its Space." },
              { name: "Unpin Tab", description: "Return the current pin to Today tabs." },
              { name: "Add to Favorites", description: "Keep the current page in your profile’s Favorites." },
              { name: "Remove from Favorites", description: "Return the current Favorite to the Space’s Today tabs." },
              { name: "Reset Pinned Tab", description: "Return a pin to its saved address." },
              { name: "Rename Tab", description: "Change the current tab’s sidebar name." },
              { name: "Mute Tab", description: "Silence the current tab’s HTML audio/video without pausing playback." },
              { name: "Unmute Tab", description: "Restore the player mute settings from before the tab was muted." },
              { name: "Duplicate Tab", description: "Open a copy of the current page in a new Today tab." },
              { name: "Open Tab in New Window", description: "Open a copy of the current page in another browser window." },
              { name: "Close Tab", description: "Close the current page. Pins and Favorites stay saved." },
              { name: "Reopen Closed Tab", description: "Restore the most recently closed tab." },
              { name: "Move Tab to [Space name]", description: "Move the current tab to another Space and follow it there." }
            ]
          },
          {
            name: "Page navigation",
            commands: [
              { name: "Copy Current URL", description: "Copy the current page’s address." },
              { name: "Back", description: "Go to the previous page in this tab." },
              { name: "Forward", description: "Go forward in this tab’s page history." },
              { name: "Reload Page", description: "Refresh the current page." },
              { name: "Stop Loading", description: "Stop the current page’s load." }
            ]
          },
          {
            name: "Spaces and profiles",
            commands: [
              { name: "New Space", description: "Open the editor to create a Space." },
              { name: "Switch Space", description: "Type a Space’s name and choose its Switch Space result." },
              { name: "Switch Profile", description: "Type a profile’s name and choose its Switch Profile result to open or focus that profile’s window." }
            ]
          },
          {
            name: "Browser controls",
            commands: [
              { name: "Toggle Sidebar", description: "Turn sidebar auto-hide on or off." },
              { name: "Open Settings", description: "Open Early’s native Settings window." }
            ]
          }
        ]
      },
      {
        id: "native-macos-interface", folderId: "browsing", name: "Native macOS", icon: icons.mac,
        aliases: ["webkit", "swift", "appearance", "macos", "native"],
        description: "Built for the Mac, from the frame to the page.",
        summary: "Early is built with Swift, SwiftUI, AppKit, and WebKit. A shared sidebar and window frame surround a distinct page surface, keeping the interface quiet and the website in focus.",
        behavior: ["Light and dark appearance, translucent chrome, and Space-aware colors.", "Native trackpad zoom, navigation gestures, and compatible website fullscreen.", "Click the speaker beside a tab’s icon to mute or unmute HTML audio/video without switching pages. The muted control stays available after playback stops. Favorite cards have no speaker badge; use their context menu instead.", "Respect for macOS accessibility preferences, including reduced motion and transparency."]
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
        behavior: ["Restore tabs, pins, Favorites, ordering, and selection.", "Keep multiple windows’ Today tabs separate while restoring them together.", "Start with folders collapsed, ready to open the context you need."]
      }
    ],
    planned: [
      { name: "History search", description: "Find pages you visited alongside command-bar tab, pin, and Favorite results." },
      { name: "More ways to browse", description: "Split views, tab previews, and improved page lifecycle management." },
      { name: "Everyday browser essentials", description: "Find in page, zoom, history, private windows, site controls, and reading tools." },
      { name: "Distribution & portability", description: "Packaged macOS releases, Homebrew installation, and export/import." }
    ]
  };
  root.EarlyCatalog = catalog;
  if (typeof module === "object" && module.exports) module.exports = catalog;
})(typeof globalThis === "object" ? globalThis : this);
