import { test, expect } from "@playwright/test";

test.describe("Card Accessibility", () => {
  test("Card is present on page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "apple");
    });
    const card = page.locator(".pui-card").first();
    await expect(card).toBeVisible();
  });
});
