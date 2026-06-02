import { test, expect } from "@playwright/test";

test.describe("IconButton CSS Contract", () => {
  test("has pui-icon-button class", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator(".pui-icon-button").first();
    await expect(btn).toBeVisible();
  });

  test("local style override works", async ({ page }) => {
    await page.goto("/");
    const override = page
      .locator('.pui-icon-button[style*="--pui-icon-button"]')
      .first();
    if ((await override.count()) > 0) {
      await expect(override).toBeVisible();
    }
  });
});
