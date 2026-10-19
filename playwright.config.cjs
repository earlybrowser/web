// SPDX-License-Identifier: MPL-2.0
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/browser",
  timeout: 15000,
  use: {
    baseURL: "http://127.0.0.1:4177",
    browserName: "chromium",
    viewport: { width: 1200, height: 900 },
    reducedMotion: "reduce",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "python3 -m http.server 4177 --bind 127.0.0.1",
    url: "http://127.0.0.1:4177",
    reuseExistingServer: !process.env.CI,
    timeout: 10000
  }
});
