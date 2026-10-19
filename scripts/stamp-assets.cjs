// SPDX-License-Identifier: MPL-2.0
const { createHash } = require("node:crypto");
const { readFileSync, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");

const assets = ["styles.css", "features-data.js", "site-model.js", "app.js"];
function stampAssets(html, root) {
  for (const asset of assets) {
    const hash = createHash("sha256").update(readFileSync(resolve(root, asset))).digest("hex").slice(0, 12);
    const pattern = new RegExp(`((?:href|src)=")${asset.replaceAll(".", "\\.")}(?:\\?[^"\\s]*)?(")`, "g");
    html = html.replace(pattern, `$1${asset}?v=${hash}$2`);
  }
  return html;
}

if (require.main === module) {
  const root = resolve(__dirname, "..");
  const target = resolve(root, "index.html");
  const html = readFileSync(target, "utf8");
  const stamped = stampAssets(html, root);
  if (html !== stamped) writeFileSync(target, stamped);
  console.log("Static asset versions are up to date.");
}

module.exports = { assets, stampAssets };
