// SPDX-License-Identifier: MPL-2.0
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { assets, stampAssets } = require("../scripts/stamp-assets.cjs");
const root = resolve(__dirname, "..");

test("HTML requests the current version of every stylesheet and script", () => {
  const html = readFileSync(resolve(root, "index.html"), "utf8");
  assert.ok(html === stampAssets(html, root), "Run npm run assets:stamp after editing CSS or JavaScript.");
  for (const asset of assets) {
    assert.ok(html.includes(`${asset}?v=`), `${asset} must have a cache version`);
  }
});

test("asset stamping is deterministic and preserves project-relative paths", () => {
  const html = assets.map((asset) => `<script src="${asset}?v=old"></script>`).join("\n");
  const stamped = stampAssets(html, root);
  assert.equal(stampAssets(stamped, root), stamped);
  assert.doesNotMatch(stamped, /src="\//);
});
