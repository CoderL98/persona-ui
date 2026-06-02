import { test, expect } from "@playwright/test";
test.describe("Dialog A11y", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
      document.documentElement.setAttribute("data-mode", "light");
    });
  });

  test("dialog visible when open", async ({ page }) => {
    const dialog = page.locator('[role="dialog"]');
    // Open dialog by clicking its trigger button
    const openBtn = page.locator('section[id="dialog"] button').first();
    if (await openBtn.isVisible()) {
      await openBtn.click();
      await page.waitForTimeout(300);
      await expect(dialog).toBeVisible();
    }
  });

  test("dialog passes axe accessibility scan when open", async ({ page }) => {
    const openBtn = page.locator('section[id="dialog"] button').first();
    if (await openBtn.isVisible()) {
      await openBtn.click();
      await page.waitForTimeout(300);
      const { injectAxe, checkA11y } = await import("axe-playwright");
      await injectAxe(page);
      await checkA11y(page, '[role="dialog"]', undefined, false);
    }
  });
});
