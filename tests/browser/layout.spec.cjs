// SPDX-License-Identifier: MPL-2.0
const { test, expect } = require("@playwright/test");

for (const colorScheme of ["light", "dark"]) {
  test.describe(colorScheme, () => {
    test.use({ colorScheme });

    test("the complete browser shell stays intact and its sidebar icon is static", async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/");
      await expect(page.locator("h1")).toHaveText("Early");
      const sidebar = page.locator("#sidebar");
      const content = page.locator("#content-area");
      const toolbar = page.locator("#window-drag-region");
      const icon = page.locator("#sidebar-toggle-btn");
      expect(await sidebar.evaluate((el) => el.parentElement.id)).toBe("browser-window");
      expect(await content.evaluate((el) => el.parentElement.id)).toBe("browser-window");
      await expect(toolbar).toHaveCSS("display", "flex");
      await expect(toolbar).toHaveCSS("flex-direction", "row");
      const rows = await toolbar.locator(":scope > :not(.toolbar-spacer)").evaluateAll((nodes) => nodes.map((el) => {
        const rect = el.getBoundingClientRect();
        return { top: rect.top, height: rect.height };
      }));
      expect(rows.every((row) => row.height === 32 && row.top === rows[0].top)).toBe(true);
      const sidebarBox = await sidebar.boundingBox();
      const contentBox = await content.boundingBox();
      expect(sidebarBox.width).toBe(240);
      expect(contentBox.x).toBeGreaterThan(sidebarBox.x + sidebarBox.width);
      expect(contentBox.width).toBeGreaterThan(600);
      await expect(page.locator(".favorite-tile")).toHaveCount(3);
      const sponsors = page.locator("#fav-sponsors");
      await expect(sponsors).toHaveAttribute("href", "https://github.com/sponsors/rangaNP");
      await expect(sponsors.locator("svg")).toHaveAttribute("fill", "#EA4AAA");
      await expect(page.locator(".page-footer").getByRole("link", { name: /Sponsor Early/ })).toHaveAttribute("href", "https://github.com/sponsors/rangaNP");
      await expect(page.locator(".folder-header")).toHaveCount(3);
      await expect(icon).toHaveAttribute("role", "img");
      await expect(icon.locator("svg")).toBeVisible();
      await icon.click();
      await expect(page.locator("#browser-window")).not.toHaveClass(/sidebar-autohide/);
      await expect(icon).toHaveCSS("cursor", "auto");
      expect(errors).toEqual([]);
    });

    test("the footer download icon matches the Download tab artwork", async ({ page }) => {
      await page.goto("/");
      const button = page.getByRole("button", { name: "Download and installation information" });
      const icon = button.locator("svg");
      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      await expect(icon.locator("circle")).toHaveCount(1);
      const paths = (locator) => locator.locator("path").evaluateAll((nodes) => nodes.map((path) => path.getAttribute("d")));
      expect(await paths(icon)).toEqual(await paths(page.locator("[data-tab-id=download] svg")));
      await button.click();
      await expect(page.locator("h1")).toHaveText("Download & Install");
    });

    test("homepage copy keeps sentence case and flows beside the right-aligned app icon", async ({ page }) => {
      await page.goto("/");
      const header = page.locator(".home-header");
      const icon = header.locator(".app-icon");
      const eyebrow = header.locator(".eyebrow");
      await expect(eyebrow).toHaveText("Made for macOS");
      await expect(eyebrow).toHaveCSS("text-transform", "none");
      for (const width of [1200, 1000, 820, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        // The narrow layout is applied by a media-query listener after the
        // resize; measure once it has run.
        await page.waitForFunction((narrow) =>
          document.getElementById("browser-window").classList.contains("sidebar-autohide") === narrow, width <= 760);
        const headerBox = await header.boundingBox();
        const iconBox = await icon.boundingBox();
        const headingBox = await header.locator("h1").boundingBox();
        expect(iconBox.x).toBeGreaterThan(headingBox.x);
        expect(iconBox.x + iconBox.width).toBeCloseTo(headerBox.x + headerBox.width, 0);
        expect(iconBox.y).toBeLessThan(headingBox.y);
        expect(await page.locator("#content-viewport").evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
      }
    });

    test("New Tab shows main pages and filtering never adds a Google fallback", async ({ page }) => {
      await page.goto("/");
      await page.locator("#new-tab-btn").click();
      const input = page.locator("#command-bar-input");
      const labels = page.locator("[role=option] .suggestion-label");
      await expect(labels).toHaveText(["Home", "Download & Install", "All Features"]);
      await input.fill("pr");
      await expect(labels.first()).toHaveText("Profiles");
      await expect(page.getByRole("option").filter({ hasText: "Search Google" })).toHaveCount(0);
      await input.fill("nonexistentword");
      await expect(labels).toHaveCount(0);
      await expect(page.locator("#command-bar-hint")).toContainText("No matching pages");
      await input.fill("spaces");
      await input.press("Enter");
      await expect(page.locator("h1")).toHaveText("Spaces");
    });

    test("mobile navigation remains usable without the desktop toggle", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/");
      // Linux Chromium can deliver an initial mouse-enter at the viewport edge
      // as the responsive sidebar mounts. It must not open the mobile drawer.
      await page.locator("#sidebar-edge-sensor").dispatchEvent("pointerenter", { pointerType: "mouse" });
      await expect(page.locator("#sidebar")).not.toBeVisible();
      expect((await page.locator("#content-area").boundingBox()).width).toBeGreaterThan(370);
      await page.locator("#sidebar-reveal").click();
      await expect(page.locator("#sidebar-toggle-btn svg")).toBeVisible();
      await page.locator("[data-tab-id=download]").click();
      await expect(page.locator("h1")).toHaveText("Download & Install");
      await expect(page.locator(".information-note")).toHaveCSS("border-left-width", "0px");
      await expect(page.locator(".information-note")).toHaveCSS("border-radius", "10px");
    });

    test("Pages project-subdirectory URLs preserve assets and navigation", async ({ page }) => {
      // Serve the same files beneath /web/, as GitHub project Pages does.
      await page.route("**/web/**", async (route) => {
        const url = new URL(route.request().url());
        url.pathname = url.pathname.replace(/^\/web\//, "/");
        const response = await route.fetch({ url: url.href });
        await route.fulfill({ response });
      });
      await page.goto("/web/#profiles");
      await expect(page.locator("h1")).toHaveText("Profiles");
      await expect(page.locator("#window-drag-region")).toHaveCSS("display", "flex");
      await page.locator("#new-tab-btn").click();
      await page.getByRole("option").filter({ hasText: "Download & Install" }).click();
      await expect(page.locator("h1")).toHaveText("Download & Install");
      await expect(page).toHaveURL(/\/web\/#download$/);
      await page.locator("[data-tab-id=home]").click();
      await expect(page.locator("h1")).toHaveText("Early");
      await expect(page).toHaveURL(/\/web\/$/);
      await expect(page.locator(".app-icon")).toHaveJSProperty("naturalWidth", 1024);
    });

    test("site controls open a panel that copies the link and closes with Escape", async ({ page }) => {
      await page.goto("/#reading-tools");
      const button = page.locator("#address-site-controls-btn");
      const panel = page.locator("#site-controls-panel");
      await expect(button).toBeVisible();
      await expect(panel).toBeHidden();
      await button.click();
      await expect(panel).toBeVisible();
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#site-controls-host")).toHaveText("Reading tools");
      await expect(page.locator("#site-controls-copy")).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(button).toBeFocused();
    });

    test("feature pages no longer show the removed explanatory callouts", async ({ page }) => {
      for (const [id, title] of [
        ["command-bar-navigation", "Command bar"],
        ["native-macos-interface", "Native macOS"],
        ["session-restoration", "Session restoration"]
      ]) {
        await page.goto(`/#${id}`);
        await expect(page.locator("h1")).toHaveText(title);
        await expect(page.locator(".information-note")).toHaveCount(0);
      }
    });
  });
}
