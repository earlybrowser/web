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
      await expect(page.locator(".folder-header")).toHaveCount(3);
      await expect(icon).toHaveAttribute("role", "img");
      await expect(icon.locator("svg")).toBeVisible();
      await icon.click();
      await expect(page.locator("#browser-window")).not.toHaveClass(/sidebar-autohide/);
      await expect(icon).toHaveCSS("cursor", "auto");
      expect(errors).toEqual([]);
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
      await expect(page.locator("#sidebar")).not.toBeVisible();
      expect((await page.locator("#content-area").boundingBox()).width).toBeGreaterThan(370);
      await page.locator("#sidebar-reveal").click();
      await expect(page.locator("#sidebar-toggle-btn svg")).toBeVisible();
      await page.locator("[data-tab-id=download]").click();
      await expect(page.locator("h1")).toHaveText("Download & Install");
      await expect(page.locator(".information-note")).toHaveCSS("border-left-width", "0px");
      await expect(page.locator(".information-note")).toHaveCSS("border-radius", "10px");
    });
  });
}
