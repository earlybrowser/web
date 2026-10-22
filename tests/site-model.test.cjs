// SPDX-License-Identifier: MPL-2.0
const { test } = require("node:test");
const assert = require("node:assert/strict");
const catalog = require("../features-data.js");
const { resolveRoute, rankPages, classifyInput, commandBarPages, pageURL } = require("../site-model.js");
const pages = [...catalog.tabs, ...catalog.features];

test("catalog has distinct, valid routes and only major feature tabs", () => {
  assert.equal(new Set(pages.map((page) => page.id)).size, pages.length);
  assert.equal(catalog.tabs[0].id, "home");
  assert.equal(catalog.tabs[0].name, "Home");
  assert.equal(catalog.features.length, 10);
  for (const feature of catalog.features) {
    assert.ok(catalog.folders.some((folder) => folder.id === feature.folderId));
    assert.ok(feature.description && feature.summary && feature.behavior.length);
    assert.match(feature.id, /^[a-z\d-]+$/);
  }
  for (const folder of catalog.folders) assert.ok(catalog.features.some((feature) => feature.folderId === folder.id));
});

test("feature and tab icons share a scalable grid and restrained stroke", () => {
  for (const page of pages) {
    assert.match(page.icon, /viewBox="0 0 24 24"/);
    assert.match(page.icon, /stroke-width="1\.75"/);
    assert.match(page.icon, /stroke="currentColor"/);
    assert.match(page.icon, /aria-hidden="true"/);
    assert.doesNotMatch(page.icon, /<image|<script|https?:/);
  }
});

test("feature pages omit the removed explanatory callouts", () => {
  for (const id of ["command-bar-navigation", "native-macos-interface", "session-restoration"]) {
    assert.equal(catalog.features.find((feature) => feature.id === id).note, undefined);
  }
});

test("Home and every feature support direct links", () => {
  for (const page of pages) {
    assert.equal(resolveRoute(`#${page.id}`, pages), page.id);
    assert.equal(resolveRoute(`#/${page.id}`, pages), page.id);
  }
  for (const hash of ["", "#", "#unknown", "#%ZZ", "#__proto__"]) assert.equal(resolveRoute(hash, pages), "home");
});

test("legacy routes resolve without producing missing pages", () => {
  assert.equal(resolveRoute("#overview", pages), "home");
  assert.equal(resolveRoute("#features", pages), "roadmap");
  assert.equal(resolveRoute("#spaces", pages), "spaces-and-profiles");
  assert.equal(resolveRoute("#search-suggestions", pages), "command-bar-navigation");
});

for (const [query, id] of [
  ["spaces", "spaces-and-profiles"], ["spa", "spaces-and-profiles"],
  ["PROFILES", "profiles"], ["profile", "profiles"], ["favourites", "pinned-and-today-tabs"],
  ["folders", "sidebar-folders"], ["vertical tabs", "vertical-tabs"],
  ["command bar", "command-bar-navigation"], ["search", "command-bar-navigation"],
  ["home", "home"], ["install", "download"], ["all features", "roadmap"],
  ["  native   macOS  ", "native-macos-interface"], ["sessions", "session-restoration"]
]) {
  test(`search ranks “${query}” by title or alias before incidental mentions`, () => {
    assert.equal(rankPages(query, pages)[0]?.id, id);
  });
}

test("empty queries do not display arbitrary results", () => {
  assert.deepEqual(rankPages("", pages), []);
  assert.deepEqual(rankPages("   ", pages), []);
  assert.deepEqual(rankPages("nonexistentword", pages), []);
});

test("New Tab shows the three main tabs in sidebar order", () => {
  for (const query of ["", " ", "\n"]) {
    assert.deepEqual(commandBarPages(query, catalog).map((page) => page.id), ["home", "download", "roadmap"]);
  }
});

test("typing filters main tabs and features, clearing restores main tabs", () => {
  assert.equal(commandBarPages("pr", catalog)[0].id, "profiles");
  assert.equal(commandBarPages("spaces", catalog)[0].id, "spaces-and-profiles");
  assert.deepEqual(commandBarPages("nonexistentword", catalog), []);
  assert.deepEqual(commandBarPages("", catalog), catalog.tabs);
});

test("safe web addresses are recognized, including ports and paths", () => {
  for (const input of ["https://github.com/earlybrowser", "http://localhost:4177/#profiles", "github.com", "example.com:8080/docs?q=spaces", "localhost:4177"]) {
    const result = classifyInput(input);
    assert.equal(result.kind, "url", input);
    assert.match(result.url, /^https?:\/\//);
  }
});

test("unsupported schemes, malformed URLs, and credentials cannot be opened", () => {
  for (const input of ["javascript:alert(1)", "data:text/html,test", "file:///etc/hosts", "mailto:test@example.com", "https://user:password@example.com", "https://", "http:example.com", "https://bad host"]) {
    assert.equal(classifyInput(input).kind, "invalid", input);
  }
});

test("plain text stays local and never becomes a Google search action", () => {
  assert.equal(classifyInput(" ").kind, "empty");
  for (const input of ["pr", "mac browser & privacy", "work\npersonal", "nonexistentword"]) {
    assert.deepEqual(classifyInput(input), { kind: "text" });
  }
});

test("copyable URLs use the actual deployment path, not invented routes", () => {
  assert.equal(pageURL("profiles", "https://example.org/early/#home"), "https://example.org/early/#profiles");
  assert.equal(pageURL("home", "http://localhost:4177/#profiles"), "http://localhost:4177/");
  assert.equal(resolveRoute(new URL(pageURL("spaces-and-profiles", "https://example.org/")).hash, pages), "spaces-and-profiles");
});
