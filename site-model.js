// SPDX-License-Identifier: MPL-2.0
// Pure routing and search helpers, shared by the site and its regression tests.
(function (root) {
  "use strict";
  const normalize = (value) => value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  function resolveRoute(hash, pages) {
    let id;
    try { id = decodeURIComponent(hash.replace(/^#\/?/, "")); } catch { return "home"; }
    const aliases = { overview: "home", features: "roadmap", spaces: "spaces-and-profiles", "favorites-bar": "pinned-and-today-tabs", "search-suggestions": "command-bar-navigation", "settings-and-customization": "profiles" };
    id = aliases[id] || id;
    return pages.some((page) => page.id === id) ? id : "home";
  }
  function rankPages(query, pages) {
    const q = normalize(query);
    if (!q) return [];
    const words = q.split(" ");
    return pages.map((page, index) => {
      const name = normalize(page.name);
      const aliases = (page.aliases || []).map(normalize);
      const title = [name, ...aliases];
      const searchable = normalize(`${page.name} ${(page.aliases || []).join(" ")} ${page.description} ${page.summary || ""}`);
      let score = 0;
      if (title.includes(q)) score = 100;
      else if (title.some((label) => label.startsWith(q))) score = 80;
      else if (words.every((word) => name.split(" ").some((part) => part.startsWith(word)))) score = 70;
      else if (title.some((label) => label.includes(q))) score = 60;
      else if (words.every((word) => searchable.includes(word))) score = 20;
      return { page, score, index };
    }).filter((result) => result.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).map((result) => result.page);
  }
  function classifyInput(input) {
    const value = input.trim();
    if (!value) return { kind: "empty" };
    const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(value);
    const looksLikeHost = /^(?:localhost(?::\d+)?|(?:[\p{L}\d-]+\.)+[\p{L}\d-]+(?::\d+)?)(?:[/?#].*)?$/iu.test(value);
    if (hasScheme || looksLikeHost) {
      try {
        if (hasScheme && !looksLikeHost && !/^https?:\/\//i.test(value)) return { kind: "invalid" };
        const url = new URL(looksLikeHost ? `https://${value}` : value);
        if (!/^https?:$/.test(url.protocol) || !url.hostname || url.username || url.password) return { kind: "invalid" };
        return { kind: "url", url: url.href };
      } catch { return { kind: "invalid" }; }
    }
    return { kind: "search", url: `https://www.google.com/search?q=${encodeURIComponent(value)}` };
  }
  function pageURL(id, base) {
    const url = new URL(base);
    url.hash = id === "home" ? "" : id;
    return url.href;
  }
  const model = { normalize, resolveRoute, rankPages, classifyInput, pageURL };
  root.EarlySiteModel = model;
  if (typeof module === "object" && module.exports) module.exports = model;
})(typeof globalThis === "object" ? globalThis : this);
