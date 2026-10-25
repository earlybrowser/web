// SPDX-License-Identifier: MPL-2.0
// Keep this catalog limited to major features available in Early today.
// Icons are original Early artwork, drawn on a 24-point grid with a 1.75 stroke.
(function (root) {
  "use strict";
  const icon = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const icons = {
    // A house with a pitched roof and an arched door.
    home: icon('<path d="M3.75 10.5 12 3.75l8.25 6.75"/><path d="M6 9v9.75c0 .41.34.75.75.75h10.5c.41 0 .75-.34.75-.75V9"/><path d="M9.75 19.5v-3.75a2.25 2.25 0 0 1 4.5 0v3.75"/>'),
    // Keep in sync with early-browser's DownloadGlyph and the footer in index.html.
    download: icon('<circle cx="12" cy="12" r="9"/><path d="M12 7.75v7.75"/><path d="M8.5 12 12 15.5 15.5 12"/>'),
    // A checklist: two features done, one still ahead.
    list: icon('<path d="m3.75 6 1.5 1.5 3-3"/><path d="m3.75 12 1.5 1.5 3-3"/><circle cx="6" cy="18" r="1.5"/><path d="M11.25 6h9M11.25 12h9M11.25 18h9"/>'),
    // A window with its sidebar of tabs.
    sidebar: icon('<rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M9.75 4.5v15"/><path d="M5.25 8.25h2.25M5.25 11.25h2.25M5.25 14.25h2.25"/>'),
    // Two page panes with a divider between them.
    split: icon('<rect x="3" y="4.5" width="7.5" height="15" rx="1.5"/><rect x="13.5" y="4.5" width="7.5" height="15" rx="1.5"/>'),
    // A selected preview with neighboring cards on either side.
    previews: icon('<rect x="6.75" y="5.25" width="10.5" height="13.5" rx="1.5"/><path d="M3.75 7.5H2.25v9h1.5M20.25 7.5h1.5v9h-1.5M9.75 14.25h4.5"/>'),
    // A pushpin, tilted as if pressed into the page.
    pin: icon('<path d="M14.39 4.31 19.69 9.61"/><path d="M15.45 5.37 11.73 9.08 6.96 9.61 14.39 17.04 14.92 12.27 18.63 8.55"/><path d="M10.67 13.33 4.31 19.69"/>'),
    // A folder in front of another.
    folder: icon('<path d="M3 9.75c0-.83.67-1.5 1.5-1.5h3.75l1.5 1.5h6.75c.83 0 1.5.67 1.5 1.5v6.75c0 .83-.67 1.5-1.5 1.5H4.5c-.83 0-1.5-.67-1.5-1.5Z"/><path d="M6 8.25v-3c0-.83.67-1.5 1.5-1.5h3l1.5 1.5h7.5c.83 0 1.5.67 1.5 1.5v8.25c0 .83-.67 1.5-1.5 1.5H18"/>'),
    // A stack of cards, one for each Space.
    spaces: icon('<rect x="3" y="9.75" width="18" height="10.5" rx="2.25"/><path d="M5.25 9.75v-1.5c0-.83.67-1.5 1.5-1.5h10.5c.83 0 1.5.67 1.5 1.5v1.5"/><path d="M7.5 6.75v-1.5c0-.83.67-1.5 1.5-1.5h6c.83 0 1.5.67 1.5 1.5v1.5"/>'),
    // The command bar's magnifying glass, as in index.html.
    search: icon('<circle cx="10.5" cy="10.5" r="6.75"/><path d="m15.75 15.75 4.5 4.5"/>'),
    // A Mac's display on its stand.
    mac: icon('<rect x="3" y="3.75" width="18" height="12.75" rx="2.25"/><path d="M3 13.5h18"/><path d="M12 16.5v3.75M8.25 20.25h7.5"/>'),
    // A person in a circle.
    profile: icon('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9.75" r="3"/><path d="M6.75 19.3c1.13-2.62 3.04-4.05 5.25-4.05s4.12 1.43 5.25 4.05"/>'),
    // A clock, with an arrow turning back around it.
    restore: icon('<path d="M8.75 18.93A8 8 0 1 0 4.75 12"/><path d="M2.6 10.25 4.75 12.4l2.15-2.15"/><path d="M12.75 8.25V12l3 1.5"/>'),
    // A domino mask for private browsing.
    mask: icon('<path d="M3 10.6c0-1.9 1.5-3.3 3.4-3.1 1.9.2 3.6 1 5.6 1s3.7-.8 5.6-1c1.9-.2 3.4 1.2 3.4 3.1 0 3.5-2.3 6.4-5.2 6.4-1.7 0-3-.9-3.8-2.3-.8 1.4-2.1 2.3-3.8 2.3C5.3 17 3 14.1 3 10.6z"/><ellipse cx="7.9" cy="11.7" rx="1.9" ry="1.3"/><ellipse cx="16.1" cy="11.7" rx="1.9" ry="1.3"/>'),
    // A shield with a check for site security.
    shield: icon('<path d="M12 3 5.25 5.75v5.5c0 4.25 2.85 7.75 6.75 9.5 3.9-1.75 6.75-5.25 6.75-9.5v-5.5L12 3Z"/><path d="m9 12 2.25 2.25 4.5-4.5"/>'),
    // Angle brackets for developer tools.
    code: icon('<path d="M8.25 6.75 3 12l5.25 5.25"/><path d="m15.75 6.75 5.25 5.25-5.25 5.25"/><path d="m13.5 4.5-3 15"/>'),
    // A round key for passwords.
    key: icon('<path d="M10.12 10.79A5.25 5.25 0 1 1 12.59 13.26L10.44 15.42L12.2 17.19L10.61 18.78L8.84 17.01L7.96 17.9L9.2 19.13L7.61 20.72L3.89 17.01Z"/><circle cx="16.09" cy="7.29" r="1"/>'),
    // A puzzle piece for extensions.
    puzzle: icon('<path d="M5.25 7.5H9a2.25 2.25 0 1 1 4.5 0h3.75v3.75a2.25 2.25 0 1 1 0 4.5v3.75h-12Z"/>'),
    // An open book for reading tools.
    book: icon('<path d="M12 6.75C10.2 5.25 7.8 4.5 4.5 4.5c-.41 0-.75.34-.75.75V16.5c0 .41.34.75.75.75 3.3 0 5.7.75 7.5 2.25 1.8-1.5 4.2-2.25 7.5-2.25.41 0 .75-.34.75-.75V5.25c0-.41-.34-.75-.75-.75-3.3 0-5.7.75-7.5 2.25Z"/><path d="M12 6.75v12.75"/>')
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
        behavior: ["Keep everyday browsing in Today tabs, separate from saved pins and Favorites.", "Resize the sidebar, or hide it and reveal it from the window’s left edge.", "Reorder pages by dragging them where they belong.", "Early keeps recent pages ready and releases older background pages when needed to manage memory. Released pages reload when selected; their live forms and exact back/forward history are not preserved.", "Visible pages, playing media, and pages you’re editing are protected from routine background release."]
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
        aliases: ["folders", "grouping", "organization", "github", "pull requests", "live folder", "live folders"],
        description: "Give a project a home, and put its pages together.",
        summary: "Group your saved pages into folders and subfolders. Collapse a project when you’re done with it, and open it again when you need the context back. A GitHub live folder can keep your open pull requests together and up to date.",
        behavior: ["Organize pinned pages with up to two levels of nested folders.", "Drag tabs and folders to rearrange them, with a preview of where they will land.", "Move a folder and its contents to another Space together.", "Add a GitHub live folder to keep your open pull requests as pinned tabs: ones you opened, ones assigned to you, and ones waiting for your review. Merged and closed ones leave by themselves. It uses the GitHub account you’re already signed in to, and Early keeps no GitHub password or token."]
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
          "Find tabs and pins in your current Space, your profile’s Favorites, and pages from your history, by title or address. Switch to an existing page or reopen a closed pin or Favorite in place, without duplicates. Parent folders expand to reveal the tab.",
          "Type naturally: “Pin Tab”, “Duplicate Tab”, “New Space”, or “Open Settings”. Choose the matching command with the arrow keys and Return, or click it. Commands appear when they can be used.",
          "Switch Spaces or profiles by typing their names. Tab matches and browser actions appear above optional suggestions from your search engine: Google, DuckDuckGo, Bing, Ecosia, Brave Search or Kagi.",
          "Pressing Return without selecting a result opens your typed address or web search. Right Arrow fills a selected suggestion before submitting.",
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
              { name: "Reopen Closed Window", description: "Bring back the most recently closed window and its Today tabs." },
              { name: "Close Other Tabs", description: "Close the Space’s other Today tabs. Pins and Favorites stay." },
              { name: "Close Tabs Below", description: "Close the Today tabs below the current one." },
              { name: "Clear Today Tabs", description: "Close every Today tab in the Space. Closed tabs can be reopened." },
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
            name: "Page tools",
            commands: [
              { name: "Find on Page…", description: "Search the current page’s text, with a match count." },
              { name: "Zoom In", description: "Enlarge the current tab’s page." },
              { name: "Zoom Out", description: "Shrink the current tab’s page." },
              { name: "Actual Size", description: "Return the current tab to 100% zoom." },
              { name: "Show Reader", description: "Read the current article in a clean, distraction-free view." },
              { name: "Translate to [language]", description: "Translate the page into your language on this Mac (macOS 15 and later)." }
            ]
          },
          {
            name: "Downloads and documents",
            commands: [
              { name: "Show Downloads", description: "Open the downloads list in the sidebar footer." },
              { name: "Open File…", description: "Open a local HTML page, PDF, or image in a new tab." },
              { name: "Save Page As…", description: "Save the current page as HTML, or a viewed PDF as itself." },
              { name: "Export as PDF…", description: "Save the current page as a PDF." },
              { name: "Print Page…", description: "Print the current page." }
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
            name: "History and privacy",
            commands: [
              { name: "Show All History", description: "Browse, search, and delete the pages you visited." },
              { name: "Clear History…", description: "Clear history and website data from the last hour, today, or all time." },
              { name: "New Private Window", description: "Browse in a window that keeps no history, cookies, or website data after it closes." }
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
        id: "split-views", folderId: "browsing", name: "Split views", icon: icons.split,
        aliases: ["split", "split view", "side by side", "panes", "compare", "resize"],
        description: "Keep two pages in view, side by side.",
        summary: "Compare, read, or work across two pages in one window. Resize the panes to give each page the room it needs.",
        behavior: [
          "Drag a sidebar tab into the page area, then drop it onto the left or right split card.",
          "Drag the divider to resize the pages. Browser controls follow the pane you’re using.",
          "Swap sides or exit split view from the tab’s context menu.",
          "Leaving split view keeps the tabs open."
        ]
      },
      {
        id: "tab-previews", folderId: "browsing", name: "Tab previews", icon: icons.previews,
        aliases: ["tab switcher", "thumbnails", "preview", "switch tabs", "control tab"],
        description: "See the page before you switch to it.",
        summary: "The thumbnail tab switcher gives your open pages a visual preview, so it’s easier to find the one you want.",
        behavior: [
          "Use the keyboard to browse previews, then confirm the tab you want to open.",
          "Dismiss the switcher to stay on the page you were using.",
          "The preview is available even when only one tab is open; pages without a thumbnail have a clear fallback.",
          "Choose in Settings whether Control-Tab shows the thumbnail switcher."
        ]
      },
      {
        id: "downloads-and-documents", folderId: "browsing", name: "Downloads & documents", icon: icons.download,
        aliases: ["downloads", "files", "uploads", "pdf", "print", "save page", "documents"],
        description: "Keep downloads and documents close to your browsing.",
        summary: "Download files, upload documents, view PDFs, and save or print pages without leaving Early.",
        behavior: [
          "Open Downloads from the sidebar footer to see progress, stop or resume a download, and reveal a file in Finder.",
          "Upload files through websites’ file pickers.",
          "Save pages as HTML, export PDFs, or print. Saved pages and PDFs appear in the downloads list too.",
          "Open local files in tabs. Early remembers access for restoration after a restart; a missing file or lost permission may require opening it again."
        ]
      },
      {
        id: "reading-tools", folderId: "browsing", name: "Reading tools", icon: icons.book,
        aliases: ["find", "zoom", "reader", "reader mode", "translate", "translation"],
        description: "Find, zoom, read, and translate without leaving the page.",
        summary: "Tools for the page in front of you: a find bar with a match count, zoom for each tab, a clean Reader view for articles, and translation that stays on your Mac.",
        behavior: [
          "Press ⌘F to find text. A small bar at the page’s top right, in your Space’s theme, counts the matches; ⌘G and ⇧⌘G step through them.",
          "Zoom a tab with ⌘+, ⌘− and ⌘0. Each tab keeps its own zoom, and trackpad pinch and Smart Zoom still work.",
          "Open Reader with ⇧⌘R or from the address bar’s site controls when a page is an article. Show Original returns to the page.",
          "Translate a page into your language with Apple’s on-device translation on macOS 15 and later.",
          "Hover a link to see its address at the bottom of the page, and right-click the address bar to Paste and Go."
        ]
      },
      {
        id: "native-macos-interface", folderId: "browsing", name: "Native macOS", icon: icons.mac,
        aliases: ["webkit", "swift", "appearance", "macos", "native", "shortcuts", "keyboard", "default browser", "links", "welcome", "picture in picture", "video", "pip"],
        description: "Built for the Mac, from the frame to the page.",
        summary: "Early is built with Swift, SwiftUI, AppKit, and WebKit. A shared sidebar and window frame surround a distinct page surface, keeping the interface quiet and the website in focus.",
        behavior: ["Light and dark appearance, translucent chrome, and Space-aware colors.", "Native trackpad zoom, navigation gestures, and compatible website fullscreen.", "Automatic Picture in Picture keeps a playing video in a floating window when you switch tabs, then returns it when you come back or use the window’s return button. Turn automatic Picture in Picture off in Settings. Availability depends on the website and macOS support.", "Click the speaker beside a tab’s icon to mute or unmute HTML audio/video without switching pages. The muted control stays available after playback stops. Favorite cards have no speaker badge; use their context menu instead.", "Respect for macOS accessibility preferences, including reduced motion and transparency.", "Change or remove the keyboard shortcut of almost any command in Settings › Shortcuts.", "Make Early your default browser from Settings › General or the welcome on first launch. Links from other apps open as new tabs in your frontmost window, never in a private one.", "A short welcome on first launch points out the command bar, Spaces, split view, and the tab switcher, without getting in the way of typing."]
      },
      {
        id: "profiles", folderId: "your-setup", name: "Profiles", icon: icons.profile,
        aliases: ["profile", "accounts", "cookies", "logins", "settings"],
        description: "Keep your different lives separate.",
        summary: "Profiles separate cookies, logins, website data, and Favorites. Assign Spaces to a profile to keep related contexts together without mixing accounts.",
        behavior: ["Create and manage profiles in the native Settings window.", "Give Spaces the profile they should use for browsing.", "Choose a default profile for fresh sessions. Restored sessions keep their last active profile."]
      },
      {
        id: "passwords", folderId: "your-setup", name: "Passwords", icon: icons.key,
        aliases: ["passwords", "password manager", "logins", "autofill", "strong password", "import passwords", "export passwords"],
        description: "Sign in without remembering every password.",
        summary: "Early saves the passwords you sign in with, fills them in when you come back, and suggests strong ones for new accounts. They stay encrypted on your Mac.",
        behavior: [
          "After you sign in, Early offers to save the password, or to update it when it changed. Choose Never for sites you’d rather it forgot.",
          "Click or tab into a sign-in form you’ve saved a password for and Early fills it in, on secure pages only and never over what you’ve typed. It never fills as a page opens, so the page can’t read your password before you reach it. Turn automatic filling off in Settings to pick an account from the list below the field instead.",
          "New-password fields offer a strong password, saved as soon as you use it.",
          "Settings › Passwords opens with Touch ID or your Mac’s password. Search, edit, copy, and delete passwords there.",
          "Import passwords exported from Chrome, Safari, Firefox, 1Password, or Bitwarden, and export them as a CSV file.",
          "Private windows fill saved passwords but never save new ones. Passwords are encrypted with a key in your Keychain and aren’t synced."
        ]
      },
      {
        id: "extensions", folderId: "your-setup", name: "Extensions", icon: icons.puzzle,
        aliases: ["extensions", "add-ons", "plugins", "ad blocker", "content blocker", "safari extensions", "web extensions"],
        description: "Add features with Safari Web Extensions.",
        summary: "Early runs Safari Web Extensions with the same part of macOS that Safari uses. Each profile keeps its own, and you decide which websites each one can use.",
        behavior: [
          "Install a Mac app that comes with a Safari extension, such as a content blocker, then add its extension in Settings › Extensions. You can also install one from a folder or ZIP file.",
          "Let an extension work on every website, or only on a page after you click it, plus the sites you allow.",
          "Use an extension on a page from the site controls in the address bar, or from the Extensions menu, and open its options from either.",
          "Extensions stay out of private windows unless you allow them. Parts of an extension that talk to its Mac app work only in Safari.",
          "Extensions need macOS 15.4 or later."
        ]
      },
      {
        id: "session-restoration", folderId: "your-setup", name: "Session restoration", icon: icons.restore,
        aliases: ["restore", "sessions", "persistence", "saved", "export", "import", "backup", "new mac"],
        description: "A familiar place to return to.",
        summary: "Early saves your browsing organization locally so you can return to your tabs, saved pages, and Spaces after quitting the app.",
        behavior: ["Restore tabs, pins, Favorites, ordering, and selection.", "Keep multiple windows’ Today tabs separate while restoring them together.", "Start with folders collapsed, ready to open the context you need.", "Export your profiles, Spaces, folders, pins, Favorites, windows, tabs, and settings from Settings › Sessions, and import them on another Mac. You see what a file holds before anything changes, a backup of what you had is saved first, and tabs load only when you choose them.", "Passwords, cookies, history, and private windows are never exported, so websites ask you to sign in again after an import."]
      },
      {
        id: "history-and-private-windows", folderId: "browsing", name: "History & privacy", icon: icons.mask,
        aliases: ["history", "private", "private browsing", "incognito", "clear history", "cookies"],
        description: "Find where you’ve been, or leave no trace.",
        summary: "Early remembers the pages you visit in each profile so you can find them again, and opens private windows when you’d rather it didn’t.",
        behavior: [
          "Open History with ⌘Y to browse your visits by day, search them, and delete any of them. The command bar finds history pages too.",
          "Clear history together with cookies and website data from the last hour, today, today and yesterday, or all time.",
          "Press ⌘⇧N for a private window. Its only Space is named Private, it records no history, and its cookies and website data are erased when the last private window closes.",
          "The History menu lists the pages you visited today and your recently closed tabs and windows, ready to reopen.",
          "Right-click or hold Back and Forward to jump through a tab’s pages.",
          "Settings › Privacy shows each profile’s website permissions and the websites that stored data, to change or remove them, and clears its history."
        ]
      },
      {
        id: "site-security", folderId: "browsing", name: "Security & permissions", icon: icons.shield,
        aliases: ["security", "permissions", "camera", "microphone", "location", "certificate", "phishing"],
        description: "Know who you’re connected to, and decide what each site may use.",
        summary: "The site controls in the address bar show how safe a page’s connection is and what the site is allowed to use, and change it in place.",
        behavior: [
          "See whether a page is secure, not secure, or has a certificate problem, and open its certificate.",
          "Websites ask before using your camera, microphone, or location (macOS 27). Allow, block, or ask again for each site, and stop a camera or microphone that’s in use.",
          "Clear one site’s cache and cookies without touching any other site.",
          "Deceptive and malware sites show a warning page, and links for other apps, such as Mail, ask before they open.",
          "Website notifications aren’t supported. Add a compatible content-blocking extension for ad or content filtering."
        ]
      },
      {
        id: "developer-tools", folderId: "browsing", name: "Developer tools", icon: icons.code,
        aliases: ["inspect", "web inspector", "devtools", "console", "view source", "page source"],
        description: "Inspect any page with Web Inspector, docked beside it.",
        summary: "Every page can be inspected right away: there is no developer mode to turn on.",
        behavior: [
          "Right-click a page and choose Inspect, or press ⌥⌘I, to open Web Inspector docked beside the page.",
          "Dock it on the right, at the bottom, or in its own window. It stays with its tab when you switch away and back.",
          "View Page Source (⌥⌘U) opens the page’s current markup in a new tab, without downloading it again."
        ]
      }
    ],
    planned: [
      { name: "Import from other browsers", description: "Bring bookmarks and history into Early, with open tabs and Arc’s Spaces and pins where supported." },
      { name: "Passkeys", description: "Sign in with passkeys through macOS and compatible password managers, once Apple approves Early’s browser-passkey support." },
      { name: "Developer ID signing and notarization", description: "Easier first-time installation and a stable signing identity across updates, addressing the current macOS installation and Keychain prompts. Early will be signed with an Apple-issued certificate and notarized by Apple." }
    ]
  };
  root.EarlyCatalog = catalog;
  if (typeof module === "object" && module.exports) module.exports = catalog;
})(typeof globalThis === "object" ? globalThis : this);
