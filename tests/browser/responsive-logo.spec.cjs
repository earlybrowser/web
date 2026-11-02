// SPDX-License-Identifier: MPL-2.0
const { test, expect } = require("@playwright/test");

for (const width of [390, 820, 1200]) {
  for (const deviceScaleFactor of [1, 2, 3]) {
    test(`homepage logo uses a smaller sharp image without shifting at ${width}px and ${deviceScaleFactor}x`, async ({ browser, baseURL }) => {
      // Fresh contexts prevent a previously downloaded large candidate from
      // concealing the image selection on a new visit at this screen density.
      const context = await browser.newContext({
        baseURL,
        viewport: { width, height: 900 },
        deviceScaleFactor,
        reducedMotion: "reduce"
      });
      const page = await context.newPage();
      const imageRequests = [];
      page.on("request", (request) => {
        if (request.resourceType() === "image") imageRequests.push(new URL(request.url()).pathname);
      });
      let releaseImage;
      const imageGate = new Promise((resolve) => { releaseImage = resolve; });
      await page.route(/\/assets\/Early-Horizon-(?:96|128|192|256|384)\.png$/, async (route) => {
        await imageGate;
        await route.continue();
      });
      try {
        await page.goto("/", { waitUntil: "domcontentloaded" });
        const icon = page.locator(".app-icon");
        await expect(icon).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        const beforeImage = await icon.boundingBox();
        const beforeHeading = await page.locator("h1").boundingBox();
        // Fractional CSS lengths are quantized to layout units by the browser.
        expect(beforeImage.width).toBeCloseTo(Math.min(128, Math.max(76, width * 0.12)), 1);
        expect(beforeImage.height).toBeCloseTo(beforeImage.width, 4);
        releaseImage();
        await expect(icon).toHaveJSProperty("complete", true);
        await expect.poll(() => icon.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
        const selectedURL = await icon.evaluate((image) => image.currentSrc);
        const selectedPixels = Number(new URL(selectedURL).pathname.match(/Early-Horizon-(\d+)\.png$/)[1]);
        expect(selectedPixels).toBeGreaterThanOrEqual(Math.ceil(beforeImage.width * deviceScaleFactor));
        expect(selectedPixels).toBeLessThanOrEqual(384);
        expect(imageRequests).toContain(new URL(selectedURL).pathname);
        expect(imageRequests).not.toContain("/assets/Early-Horizon-1024.png");
        expect(await icon.boundingBox()).toEqual(beforeImage);
        expect(await page.locator("h1").boundingBox()).toEqual(beforeHeading);
      } finally {
        releaseImage();
        await context.close();
      }
    });
  }
}
